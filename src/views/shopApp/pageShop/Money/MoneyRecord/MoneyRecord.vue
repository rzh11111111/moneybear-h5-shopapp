<template>
  <div class="app-init">
    <top-column
      :top-header="topheader"
      ref="topdata"
      @clickcallback="clicks"
      @search="searchgetList"
    ></top-column>
    <van-tabs v-model="active" swipeable color="#0095FD" @click="clicktabs">
      <van-tab title="全部"></van-tab>

      <van-tab title="待入账"></van-tab>

      <van-tab title="已入账"></van-tab>

      <van-tab title="已退回"></van-tab>
    </van-tabs>
    <van-pull-refresh
      v-show="store.length"
      v-model="isLoading"
      @refresh="onRefresh"
      style="min-height: 100%;"
      :success-duration="1500"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="list" v-for="item in store" :key="item.id" @click="todetail(item.id)">
          <header class="listtitle" v-if="item.orderType=='1'">
            <span v-if="item.status==1">待入账</span>
            <span v-if="item.status==2">已入账</span>
            <span v-if="item.status==3">已退回</span>
            {{item.store.name}}
          </header>
          <header class="listtitle" v-if="item.orderType=='2'">
            <span v-if="item.status==1">待入账</span>
            <span v-if="item.status==2">已入账</span>
            <span v-if="item.status==3">已退回</span>
            {{item.store.name}}
          </header>
          <ul class="listcontent">
            <li>
              订单号：
              <span>{{item.onlineOfflineOrderNo}}</span>
              复制
            </li>
            <li>
              服务单号：
              <span>333333333</span>
            </li>
          </ul>

          <p class="listbottom">{{item.createTime}}</p>
          <p class="listaside redcolor" v-if="item.status==3">-{{item.money}}</p>
          <p class="listaside" v-else>{{item.money}}</p>
        </div>
        <div v-if="store.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
      </van-list>
    </van-pull-refresh>
    <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
  </div>
</template>

<script>
import startEndTime from '@/components/startEndTime/startEndTime'
import { format, currency } from "@/utils";

export default {
  name: "MoneyRecord",
  data () {
    return {
      topheader: {
        name: '入账记录',
        left: '2',
        right1: '1',
        right2: '1',
        heade: 'header1',
        key: '',
        search: ''
      },
      startendtime1: {
        title: '选择时间',
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
        // let length4 = this.store.length
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
    times (msg) { // 时间插件的事件
      if (msg.oldtime) {
        console.log('确定')
        // this.startendtime1.starttime=format(new Date(msg.oldtime), 'yyyy-MM-dd hh:mm:ss')
        // this.startendtime1.endtime=format(new Date(msg.newtime), 'yyyy-MM-dd hh:mm:ss')
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
    initialize () {  //初始化
      this.page = 1
      this.store = []
      this.loading = false
      this.kaiguan = true
      this.finished = false
      this.getList()
    },
    clicks () {
      this.startendtime1.onoff = !this.startendtime1.onoff
    },
    search () {
      this.topheader = {
        search: true
      }
    },
    notsearch () {
      this.topheader = {
        left: '2',
        heade: 'header1'
      }
      this.topheader.name = '入账记录'
      this.topheader.right1 = '1'
      this.topheader.right2 = '2'

      this.initialize()
    },
    clicktabs () {

      this.initialize()
    },
    searchgetList () {
      this.initialize()
    },
    todetail (msg) {
      this.$router.push({ path: '/MoneyDetail', query: { id: msg } })
    },
    getList () {
      if (this.kaiguan == true) {
        this.kaiguan = false
        let datejson2 = {
          page: {
            pageNo: this.page,
            pageSize: this.pageSize
          },
          status: this.active + 1,
          searchParameter: {
            starTime: this.startendtime1.starttime,
            endTime: this.startendtime1.endtime,
            keyWord: this.$refs.topdata.key
          },
        }
        this.Api.moneyList(datejson2).then(res => {
          if (res.data.data.list) {

            this.store = this.store.concat(res.data.data.list)
            res.data.data.list.forEach(res => {
              res.money = currency(res.money / 100)
            });
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
    this.getList()
  }
}
</script>

<style scoped>
.list {
  width: 100%;
  height: 126px;
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
  border: none;
  left: 16px;
  top: 16px;
}

.listtitle /deep/ span {
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
  top: 90px;
  font-size: 10px;
  color: #a6a6a6;
}
.listaside {
  position: absolute;
  right: 19px;
  top: 57px;
}
</style>
