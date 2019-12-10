<template>
  <div class="app-init">
    <top-column :top-header="topheader" @clickcallback="clicks"></top-column>
    <van-pull-refresh
      v-show="store.length"
      v-model="isLoading"
      @refresh="onRefresh"
      style="min-height: 100%;"
      :success-duration="1500"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list" v-for="item in store" :key="item.id" @click="todetail(item)">
          <header class="listtitle2">
            <!--:value="card.bankName+'('+fourbankno+')'"-->
            {{item.bankCardBankName}}
            ({{item.bankCardBankNo.substr(item.bankCardBankNo.length-4)}})
            <!--<van-cell title="提现" is-link  :value="fourbankno(item)" ></van-cell>-->
            <!--{{item.store.name}}-->
          </header>

          <p class="listbottom">{{item.createTime}}</p>
          <p class="listaside" v-if="item.status==3">-{{item.extractMoney}}</p>
          <p class="listaside" v-else>{{item.extractMoney}}</p>
          <span class="listaside2 bluecolor" v-if="item.status==1||item.status==2">平台审核中</span>
          <span class="listaside2 greencolor" v-if="item.status==3">提现成功</span>
          <span
            class="listaside2 redcolor"
            v-if="item.status==4||item.status==5||item.status==6||item.status==7"
          >审核拒绝</span>
        </div>
      </van-list>
    </van-pull-refresh>
    <div v-if="!store.length&&!loading&&!finished" class="no-data">暂无数据</div>
    <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
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
        name: '提现记录',
        left: '2',
        right1: '1',
        heade: 'header1',
      },
      startendtime1: {
        title: '',
        type: 'date',
        onoff: false,
        starttime: '',
        endtime: ''
      },
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
      this.page = 1
      this.store = []
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
      // this.newdata.store.startTime=msg.oldtime
      // this.newdata.store.endTime=msg.newtime
      this.startendtime1.onoff = msg.onoff
      // console.log('msg.oldtime',msg.oldtime);
      // this.startendtime1.starttime=format(new Date(msg.oldtime), 'yyyy-MM-dd hh:mm:ss')
      // this.startendtime1.endtime=format(new Date(msg.newtime), 'yyyy-MM-dd hh:mm:ss')

      // this.shop.managerCooperation.invalidTime=format(value, 'yyyy-MM-dd hh:mm:ss')
    },
    clicks () {
      this.startendtime1.onoff = !this.startendtime1.onoff
    },
    todetail (msg) {
      this.$store.commit('SET_RECORD', msg)
      this.$router.push('/GetMoneyDetail')
    },
    getList () {
      if (this.kaiguan == true) {
        this.kaiguan = false
        let datejson2 = {
          page: {
            pageNo: this.page,
            pageSize: this.pageSize
          },

          // createStartTime:this.startendtime1.starttime,
          // createEndTime:this.startendtime1.endtime,

        }
        this.startendtime1.starttime ? datejson2.createStartTime = this.startendtime1.starttime : ''
        this.startendtime1.endtime ? datejson2.createEndTime = this.startendtime1.endtime : ''
        this.Api.getMoneyList(datejson2).then(res => {
          if (res.data.data.list) {
            this.store = this.store.concat(res.data.data.list)
            res.data.data.list.forEach(ress => {
              ress.extractMoney = currency(ress.extractMoney / 100)
            });
          }

          console.log(res.data.data)
          this.count = res.data.data.count
          this.page++
          this.kaiguan = true
        }).catch(error => {
          this.kaiguan = true
          console.log(error)
        })
      }
    }
  },
  mounted () {
     back('#00A7FC')
    this.getList()
  }
}
</script>

<style scoped>
.list {
  width: 100%;
  height: 72px;
  background: #fff;
  margin-bottom: 10px;
  border: 1px solid #fff;
  position: relative;
  margin-top: 10px;
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

/*.listcontent{*/
/*font-size: 12px;*/
/*color: #999;*/
/*position: absolute;*/
/*left: 6px;*/
/*top: 46px;*/
/*display: flex;*/
/*flex-direction: column;*/
/*}*/
/*.listcontent /deep/ li{*/
/*margin-left:12px;*/
/*white-space: nowrap;*/
/*color: #666;*/
/*}*/
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
