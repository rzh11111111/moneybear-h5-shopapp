<template>
  <div class="app-init">
    <top-column :top-header="topheader" ref="topdata" @clickcallback="clicks" @search="initialize"></top-column>
    <van-tabs v-model="active" swipeable color="#0095FD" @change="tabschange">
      <van-tab title="全部"></van-tab>

      <van-tab title="待入账"></van-tab>

      <van-tab title="已入账"></van-tab>

      <van-tab title="已退回"></van-tab>
    </van-tabs>
    <Lists 
      ref="lists"
      :value="store"
      @initialize="getList"
      @getlist="getList"
    >
    <div slot="detailList">
        <div class="list" v-for="item in store" :key="item.id" @click="todetail(item)">
          <header class="listtitle2" v-if="item.orderType=='1'">
            {{item.store?item.store.nickName:item.shop.nickName}}
            
          </header>
          <header class="listtitle2" v-if="item.orderType=='2'">
            {{item.store?item.store.nickName:''}}
          </header>
          <p class="listbottom">{{item.createTime}}</p>
          <p class="listaside" v-if="item.status==3">{{item.money}}</p>
          <p class="listaside" v-if="item.status==1">{{item.money}}</p>
          <p class="listaside" v-if="item.status==2">+{{item.money}}</p>
          <span class="listaside2" v-if="item.status==1">待入账</span>
          <span class="listaside2 greencolor" v-if="item.status==2">已入账</span>
          <span class="listaside2 redcolor" v-if="item.status==3">已退回</span>
        </div>
    </div>
    </Lists>
    <!-- <van-pull-refresh
      v-show="store.length"
      v-model="isLoading"
      @refresh="onRefresh"
      style="min-height: 100%;"
      :success-duration="1500"
    >
      <van-list 
        v-model="loading" 
        :finished="finished" 
        finished-text="没有更多了" 
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <div class="list" v-for="item in store" :key="item.id" @click="todetail(item)">
          <header class="listtitle2" v-if="item.orderType=='1'">
            {{item.store?item.store.nickName:item.shop.nickName}}
            
          </header>
          <header class="listtitle2" v-if="item.orderType=='2'">
            {{item.store?item.store.nickName:''}}
          </header>
          <p class="listbottom">{{item.createTime}}</p>
          <p class="listaside" v-if="item.status==3">{{item.money}}</p>
          <p class="listaside" v-if="item.status==1">{{item.money}}</p>
          <p class="listaside" v-if="item.status==2">+{{item.money}}</p>
          <span class="listaside2" v-if="item.status==1">待入账</span>
          <span class="listaside2 greencolor" v-if="item.status==2">已入账</span>
          <span class="listaside2 redcolor" v-if="item.status==3">已退回</span>
        </div>
      </van-list>
    </van-pull-refresh>
    <div v-if="!store.length&&!loading&&!finished" class="no-data">暂无数据</div> -->
    <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
  </div>
</template>

<script>
import startEndTime from '@/components/startEndTime/startEndTime';
import Lists from '@/components/likeLists/likeLists';
import { format, currency } from "@/utils";

export default {
  name: "MoneyRecord",
  data () {
    return {
      topheader: {
        name: '收益分账单',
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
      
      active: 0,
      page: 1,
      pageSize: 10,
      count: '',   //总共数据
      store: [

      ]
    }
  },
  components: {
     startEndTime,Lists
  },
  computed: {
    
  },
  methods: {
    initialize(){
      this.$refs.lists.initialize()
    } ,
  
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
    todetail (msg) {
      // this.$router.push({path: '/MoneyDetail', query: {orderId: msg.orderId,spreadId:msg.spreadId}})
      this.$router.push({ path: '/MoneyDetail', query: { id: msg.id } })
    },
    tabschange (index, title) {
      if (this.$refs.lists.kaiguan == true) {
        this.initialize()
        console.log('321321')
      }

      console.log(index, title)

    },
    getList (value) { 
      if(!value){
        this.store = []
        
      }
     
       
        let datejson2 = { 
          page: {
            pageNo: this.$refs.lists.page,
            pageSize: this.$refs.lists.pageSize
          },
          status: this.active == 0 ? '' : this.active,
          searchParameter: {
            starTime: this.startendtime1.starttime,
            endTime: this.startendtime1.endtime,
            keyWord: this.$refs.topdata.key
          },
        }
        this.Api.moneyList(datejson2).then(res => {
          if(res.data.status===1){
            if (res.data.data.list) {
            this.store = this.store.concat(res.data.data.list)
            res.data.data.list.forEach(res => {
              res.money = currency(res.money / 100)
            });
          }

          }
          //调组件里的获取列表最后通用的是些事件
          console.log('请求结束')
          this.$refs.lists.getlistlast(res.data.data.count,res.data.status)
          
        }).catch(() => {
          this.$refs.lists.error=true
          this.$refs.lists.loading=false
        })
      
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
