<template>
  <div class="app-init">
    <top-column :top-header="topheader" ref="topdata" @clickcallback="clicks" @search="initialize"></top-column>
    <van-tabs v-model="active" swipeable color="#0095FD" @click="initialize">
      <van-tab title="全部"></van-tab>

      <van-tab title="收入"></van-tab>

      <van-tab title="支出"></van-tab>
    </van-tabs>
    <van-pull-refresh
      v-show="store.length"
      v-model="isLoading"
      @refresh="onRefresh"
      style="min-height: 100%;"
      :success-duration="1500"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list" v-for="item in store" :key="item.id" @click="todetail(item)">
          <header class="listtitle" v-if="type==0">
            <span v-if="item.serviceType==2">收益入账</span>
           
            <span v-else-if="item.serviceType==7">提现</span>
            <span v-else-if="item.serviceType==10">提现失败</span>
            <span v-else-if="item.serviceType==15">推店奖励</span>
          </header>
          <header class="listtitle" v-else>
            <span v-if="item.serviceType<10">收益入账</span>
           
            <span v-else-if="item.serviceType==11">提现</span>
            <span v-else-if="item.serviceType==14">提现失败</span>
           <span v-else-if="item.serviceType==15">推店奖励</span>
          </header>


          <p class="listbottom">{{item.createTime}}</p>
          <div v-if="type==0">
            <p class="listaside" v-if="item.serviceType==7">-{{item.money}}</p>
            <p class="listaside" v-else>{{item.money}}</p>
          </div>
          <div v-else>
            <p class="listaside" v-if="item.serviceType==11">-{{item.money}}</p>
            <p class="listaside" v-else>{{item.money}}</p>
          </div>
          <p class="listaside2">余额：￥{{item.moneyAfter}}</p>
        </div>
        <div v-if="store.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
      </van-list>
    </van-pull-refresh>
    <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
  </div>
</template>

<script>
import startEndTime from '@/components/startEndTime/startEndTime'
import { format, currency, accDiv ,back} from "@/utils";

export default {
  name: "MoneyRecord",
  data () {
    return {
      topheader: {
        name: '余额明细',
        left: '2',
        right1: '1',
        right2: '1',
        heade: 'header1',
        key: '',
        search: ''
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
      type: '',
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
      return accDiv(msg, 100)
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
        this.startendtime1.starttime = format(msg.olddate, 'yyyy-MM-dd hh:mm:ss')
        this.startendtime1.endtime = format(msg.newdate, 'yyyy-MM-dd hh:mm:ss')
        this.initialize()
      } else {
        this.startendtime1.starttime = ''
        this.startendtime1.endtime = ''
        this.initialize()
      }
      this.startendtime1.onoff = msg.onoff
    },
    clicks () {
      this.startendtime1.onoff = !this.startendtime1.onoff
    },
    todetail (msg) {
      if(msg.shopId){
        this.$toast('推店成功收益')
      }else if(msg.serviceType == 15){
        return
      }else if (this.type == 0) {
        if (msg.serviceType == 7 || msg.serviceType == 10) {
          this.$router.push({ path: '/GetMoneyDetail', query: { orderId: msg.serviceId } })
        } else {

          this.$router.push({ path: '/MoneyDetail', query: { orderId: msg.serviceId, spreadId: msg.storeAccountId } })
        }

      } else {
        if (msg.serviceType == 11 || msg.serviceType == 14) {
          this.$router.push({ path: '/GetMoneyDetail', query: { orderId: msg.serviceId } })
        } else {
          this.$router.push({ path: '/MoneyDetail', query: { orderId: msg.serviceId, spreadId: msg.merManager.id } })

        }
      }


    },
    getList () {
      if (this.kaiguan == true) {
        this.kaiguan = false
        let datejson2
        if (sessionStorage.getItem('accountType') == 0) {
          datejson2 = {
            page: {
              pageNo: this.page,
              pageSize: this.pageSize
            },
            storeAccountId: sessionStorage.getItem('id'),
            accountType: 1,
            type: this.active == 0 ? '' : this.active,
            createStartTime: this.startendtime1.starttime,
            createEndTime: this.startendtime1.endtime,
            orderNo: this.$refs.topdata.key

          }
          this.Api.moneyThin2(datejson2).then(res => {
            if (res.data.data.list) {
              this.store = this.store.concat(res.data.data.list)
              res.data.data.list.forEach(res => {
                res.money = currency(accDiv(res.money, 100))
                res.moneyAfter = currency(accDiv(res.moneyAfter, 100))

              });
            }

            this.count = res.data.data.count
            this.page++
            this.kaiguan = true
          }).catch(() => {
            this.kaiguan = true
          })
        } else {
          datejson2 = {
            page: {
              pageNo: this.page,
              pageSize: this.pageSize,

            },
            searchParameter: {
              starTime: this.startendtime1.starttime,
              endTime: this.startendtime1.endtime,
              keyWord: this.$refs.topdata.key
            },
            accountType: 1,
            type: this.active == 0 ? '' : this.active,

          }
          this.Api.moneyThin(datejson2).then(res => {
            if (res.data.data.list) {
              this.store = this.store.concat(res.data.data.list)
              res.data.data.list.forEach(res => {
                res.money = currency(accDiv(res.money, 100))
                res.moneyAfter = currency(accDiv(res.moneyAfter, 100))

              });
            }

            this.count = res.data.data.count
            this.page++
            this.kaiguan = true
          }).catch(() => {
            this.kaiguan = true
          })
        }

      }
    }
  },
  mounted () {
    back('#00A7FC')
    this.type = sessionStorage.getItem('accountType')
    this.getList()
  }
}
</script>

<style scoped>
.list {
  width: 100%;
  height: 70px;
  background: #fff;
  margin-bottom: 10px;
  border: 1px solid #fff;
  position: relative;
  margin-top: 10px;
}
.listtitle {
  color: #333;
  font-size: 14px;
  font-weight: 800;
  position: absolute;
  left: 6px;
  top: 16px;
}

.listtitle /deep/ span {
  height: 16px;
  font-weight: 300;
  border-radius: 2px;
  padding: 0 3px;
  margin-bottom: 14px;
  border: none;
  color: #000;
  opacity: 0.9;
  font-size: 18px;
  line-height: 14px;
}

.listcontent {
  font-size: 12px;
  color: #999;
  position: absolute;
  left: 6px;
  top: 46px;
  display: flex;
  flex-direction: column;
}
.listcontent /deep/ li {
  margin-left: 12px;
  white-space: nowrap;
  color: #666;
}
.listbottom {
  position: absolute;
  left: 18px;
  top: 45px;
  font-size: 10px;
  color: #a6a6a6;
}
.listaside {
  position: absolute;
  right: 19px;
  top: 12px;
}
.listaside2 {
  position: absolute;
  right: 19px;
  top: 45px;
  font-size: 10px;
  color: #a6a6a6;
}
</style>
