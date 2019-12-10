<template>
  <div class="app-init">
    <top-column :top-header="topheader" @clickcallback="clicks" @search="search"></top-column>
    <div class="collect-top">
        <div  class="collect-topitem">
          时间
        </div>
         <div  class="collect-topitem">
          收款
        </div>
         <div  class="collect-topitem">
          结算
          <van-icon name="question-o" @click="toquestion" v-if="type==='1'"/>
        </div>
         <div  class="collect-topitem">
          状态
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
        <div  v-for="(item,index) in store" :key="item.id"  :class="index%2==0?'list':'list listte'">
          <div class="list-item list-createTime">
            {{item.createTime|formNow}}
          </div>
          <div  class="list-item list-moneyPayable">
            {{item.moneyPayable}}
          </div>
          <div  class="list-item list-moneyPay">
             {{item.money}}
          </div>
          <div class="list-item list-status greencolor" v-if="item.status===1">
            待结算
          </div>
          <div class="list-item list-status bluecolor" v-if="item.status===2">
            已结算
          </div>
        </div>
   
      </van-list>
    </van-pull-refresh>
         <div v-if="store.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
    <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
  </div>
</template>

<script>
import startEndTime from '@/components/startEndTime/startEndTime'
import { format, currency,accAdd,back,formNow } from "@/utils";

export default {
  name: "MoneyRecord",
  data () {
    return {
      formNow,
      topheader: {
        name: '收款结算',
        left: '2',
        right1: '1',
        right2:'1',
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
  filters:{
    formNow
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
               window._czc.push(['_trackEvent', '店铺资产', '收款结算？','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$toast('每笔收款补贴1.5‰')
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
    initialize (key) {  //初始化
      this.page = 1
      this.store = []
      if(!key){
this.topheader.key=''
      }
      
      this.loading = false
      this.kaiguan = true
      this.finished = false
      this.getList()
    },
    times (msg) { // 时间插件的事件
    console.log(msg)
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
          if (window._czc) {
               window._czc.push(['_trackEvent', '收款结算', '收款结算时间筛选','' ,'' , '']);//其中灰色的为选填项
         }
      this.startendtime1.onoff = !this.startendtime1.onoff
    },
    search(key){
       if (window._czc) {
               window._czc.push(['_trackEvent', '收款结算', '收款结算搜索','' ,'' , '']);//其中灰色的为选填项
         }
      this.topheader.key=key
      this.initialize(key)
    },
    todetail (msg) {
      this.$store.commit('SET_RECORD', msg)
      this.$router.push('/GetMoneyDetail')
    },
    getList () {
      if (this.kaiguan == true) {
        this.kaiguan = false
        let datejson2 = {
          data:{
           
            page: {
            pageNo: this.page,
            pageSize: this.pageSize
          },
          searchParameter:{

          }
          },
          
          
          storeId: this.$route.query.id
   

        }
        this.topheader.key ? datejson2.data.searchParameter.keyWord=this.topheader.key:''
        this.startendtime1.starttime ? datejson2.data.searchParameter.starTime = this.startendtime1.starttime : ''
        this.startendtime1.endtime ? datejson2.data.searchParameter.endTime = this.startendtime1.endtime : ''
        this.shopApi.collection(datejson2).then(res => {
          if (res.data.data.list) {
            res.data.data.list.forEach(ress => {
              ress.moneyPayable = currency(ress.moneyPayable / 100)
              if( this.type==='1'){
                ress.money = currency(accAdd(ress.money,ress.moneySubsidy)/ 100)
                  
              }else{
              ress.money = currency(ress.money/ 100)
              }
              
              // ress.moneySubsidy=currency(ress.moneySubsidy/ 100)
              
            });
            this.store = this.store.concat(res.data.data.list.filter(v=>v.status===1||v.status===2))
            
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
  width: 25%;
  text-align: center;
  line-height: 50px;
  font-size: 12px;
}
.list-createTime{
  color: #999;
  overflow: hidden;
}
.list-moneyPayable{
  color: #212C68;
}
.list-moneyPay{
  color: #096DE3;
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
  width: 25%;
  text-align: center;
  line-height: 40px;
  color: #666;
  font-size: 12px;
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
</style>
