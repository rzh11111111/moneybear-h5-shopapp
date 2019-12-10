<template>
  <div class="app-init">
    <top-column :top-header="topheader" @clickcallback="clicks" @search="search"></top-column>
          <van-tabs 
          v-model="active"  
          type="card" 
          swipeable 
          background="#00A7FC"
          color="#fff" 
          class="tablist"
          title-active-color="#00A7FC" 
          title-inactive-color="#fff"
          @click="initialize">
          
          <van-tab title="日"></van-tab>
          <van-tab title="月"></van-tab>
          <van-tab title="年"></van-tab>


      </van-tabs>
    <div class="collect-top">
        <div  class="collect-topitem">
          日期
        </div>
         <div  class="collect-topitem">
          收款
        </div>
         <div  class="collect-topitem">
          笔数
          <!-- <van-icon name="question-o" @click="toquestion" v-if="type==='1'"/> -->
        </div>
         <div  class="collect-topitem">
          服务费
        </div>
        <div  class="collect-topitem collect-topitemte">
          结算
          <van-icon name="question-o" @click="toquestion" />
        </div>
    </div>
    <van-pull-refresh
      v-show="store.length"
      v-model="isLoading"
      @refresh="onRefresh"
      style="min-height: 100%;"
      :success-duration="1500"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div  v-for="(item,index) in store" :key="item.id" :class="index%2==0?'list':'list listte'">
          <div class="list-item list-createTime">
            {{item.date}}
          </div>
          <div  class="list-item list-moneyPayable">
            {{item.receivables}}
          </div>
          <div  class="list-item list-moneyPayable">
             {{item.count}}
          </div>
          <div class="list-item list-moneyPayable">
            {{item.servicecharge}}
          </div>
          <div class="list-item list-moneyPayable">
            {{item.settlement}}
          </div>
        </div>
    <div v-if="store.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
      </van-list>
    </van-pull-refresh>
         <div v-if="store.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
    <start-end-time ref="startendtime" :start-end-time="startendtime1" @timecallback="times"></start-end-time>
  </div>
</template>

<script>
import startEndTime from '@/components/startEndTime/startEndTime'
import { format, currency,back } from "@/utils";

export default {
  name: "MoneyRecord",
  data () {
    return {
      topheader: {
        name: '收支汇总',
        left: '2',
        // right1: '1',
        heade: 'header1',
        key:''
      },
      startendtime1: {
        title: '',
        type: 'date',
        onoff: false,
        starttime: '',
        endtime: ''
      },
      type:'',  //1种子店2特色店
      loading: false, // 分页加载
      kaiguan: true, // 避免多次请求
      finished: false,
      isLoading: false, //下拉刷新
      active: 0,
      page: 1,
      pageSize: 10,
      count: '',   //总共数据
      store: [

      ]
    }
  },
  components: {
     startEndTime
  },
  computed: {
    moneys (msg) {
      return msg / 100
    },
    fourbankno (msg) {
      console.log(msg)
      msg = Number(msg)
      let par
      // let par=msg.substr(msg.length-4)
      return par ? par : ''
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {

        this.isLoading = false;
        this.initialize()
        this.$toast("刷新成功");
      }, 500);
    },
    toquestion(){
      if (window._czc) {
               window._czc.push(['_trackEvent', '店铺资产', '收支已结算？','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.type=='1'?this.$toast('本期结算金额,含平台补贴1.5‰'):this.$toast('本期结算金额')
      
    },
    onLoad () { 
      console.log(this.page)
      // 异步更新数据
      if (this.kaiguan == true) {
        this.finished = false
        setTimeout(() => {

          if (this.page * this.pageSize >= (this.count + this.pageSize)) {
            this.finished = true
            this.loading = false
          } else {
            this.getList()

            // 加载状态结束
            this.loading = false
          }
        }, 500)
      } else {
        this.loading = false
      }
    },
    initialize () {  //初始化
    if (window._czc) {
               window._czc.push(['_trackEvent', '店铺资产', '切换和筛选','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.page = 1
      this.store = []
      this.topheader.key=''
      this.loading = false
      this.kaiguan = true
      this.finished = false
      this.getList()
    },
    times (msg) { // 时间插件的事件
      if (msg.oldtime) {
        console.log('确定')
        this.startendtime1.starttime = format(msg.olddate, 'yyyy-MM-dd hh:mm:ss')
        this.startendtime1.endtime = format(msg.newdate, 'yyyy-MM-dd hh:mm:ss')
        this.initialize()
      } else {
        console.log('取消')
        this.startendtime1.starttime = ''
        this.startendtime1.endtime = ''
        this.initialize()
      }
      this.startendtime1.onoff = msg.onoff
 },
    clicks () {
      this.startendtime1.onoff = !this.startendtime1.onoff
    },
    search(key){
      this.topheader.key=key
    },
    todetail (msg) {
      this.$store.commit('SET_RECORD', msg)
      this.$router.push('/GetMoneyDetail')
    },
    getList () {
      if (this.kaiguan == true) {
        this.kaiguan = false
        let datejson2 = {
          storeId: sessionStorage.getItem('storeId'),
          tab:this.active===0?'day':this.active===1?'month':'year',
          pageSize:this.pageSize,
          pageNo:this.page,
          // startTime:'',
          // endTime:''
        }
        if(this.startendtime1.starttime){
          datejson2.startTime=this.startendtime1.starttime
          datejson2.startTime=this.startendtime1.endtime
        }else{
          // datejson2.startTime=this.$refs.startendtime.dateold
          // datejson2.endTime=new Date()
        }
        // this.startendtime1.starttime ? datejson2.data.searchParameter.starTime = this.startendtime1.starttime : ''
        // this.startendtime1.endtime ? datejson2.data.searchParameter.endTime = this.startendtime1.endtime : ''
        this.shopApi.collect(datejson2).then(res => {
          console.log(res)
          if (res.data.data.list) {
            res.data.data.list.forEach(ress => {
              ress.receivables = currency(ress.receivables / 100)
              ress.servicecharge = currency(ress.servicecharge / 100)
              ress.settlement = currency(ress.settlement / 100)
            });
            this.store = this.store.concat(res.data.data.list)
            
          }

          console.log(res.data.data)
          this.count = res.data.data.count
          this.page++
          this.kaiguan = true
        }).catch(() => {
          this.kaiguan = true
        })
      }
    }
  },
  mounted () {
      back('#00A7FC')
    this.type=sessionStorage.getItem('type')
    this.getList()
  }
}
</script>

<style scoped>
.van-tabs--card{
  padding-top: 10px;
  background: #00A7FC;
  padding-bottom: 10px;
}

/* .van-tabs--card>.van-tabs__wrap{ */
  /* height: 50px; */
/* } */
.list {
  width: 100%;
  height: 50px;
  background: #fff;
  position: relative;
  display: flex;
}
.listte{
  background:rgba(242,243,246,1);
}
.list-item{
  width: 19%;
  text-align: center;
  line-height: 50px;
  font-size: 12px;
  overflow: hidden;
}
.list-createTime{
  color: #999;
  overflow: hidden;
}
.list-moneyPayable{
  color: #212C68;
}
.list-moneyPay{
  color: #212C68;
}

.listtitle2 {
  color: #333;
  font-size: 14px;
  font-weight: 800;
  position: absolute;
  left: 16px;
  top: 16px;
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.collect-top{
  width: 100%;
  display: flex;
  height:40px;
background:rgba(255,255,255,1);
box-shadow:0px 1px 0px 0px rgba(0,0,0,0.09);

}
.collect-topitem{
  width: 19%;
  text-align: center;
  line-height: 40px;
  color: #666;
  font-size: 12px;
}
.collect-topitemte{
  width: 24%;
  text-align: center;
  line-height: 40px;
  color: #666;
  font-size: 12px;
  overflow: hidden;
}
.listtitle2 /deep/ span {
  height: 16px;
  font-weight: 300;
  border-radius: 2px;
  padding: 0 3px;
  margin-bottom: 14px;
  color: #999;
  opacity: 0.9;
  font-size: 14px;
  line-height: 14px;
}


.listbottom {
  position: absolute;
  left: 18px;
  top: 46px;
  font-size: 10px;
  color: #a6a6a6;
}
.listaside {
  position: absolute;
  right: 19px;
  top: 14px;
}
.listaside2 {
  position: absolute;
  right: 19px;
  top: 44px;
  height: 16px;
  font-weight: 300;
  border-radius: 2px;
  padding: 0 3px;
  margin-bottom: 14px;
  opacity: 0.9;
  font-size: 14px;
  line-height: 14px;
}
.tablist /deep/ .van-tabs__wrap{
  width: 60%;
  margin-left: 20%;
}
</style>
