<template>
  <div class="app-init">
   <top-column :top-header="topheader" @clickcallback="clicks" @search="search"></top-column>
   
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="min-height: 100%;">
    
      <!-- <van-tabs
        v-model="active"
        sticky
         type="card"
        @click="onClick"
        color="#FFFFFF"
        title-active-color="#00A7FC"
        title-inactive-color="#FFFFFF"
        background="#00A7FC"
      >
        <van-tab v-for="(item,index) in dataList" :title="item.name" :key="index">
          <div slot="title">
            {{item.name}}
             
          </div> -->
        
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div
              class="order-box"
              v-for="(v ,index) in orderList"
              :key="index"
              @click="orderDetail(v)"
            >
           
              <div class="order-list">
                 <div  class="order-pic"><img :src="v.memberPic?v.memberPic:btimg"/></div>
                <div class="order-time">
                  
                  <p>{{v.payType===1?'微信收款':v.payType===2?'支付宝收款':v.payType===3?'云闪付收款':'红包全抵'}}</p>
                </div>
                <!-- <p class="bank-deal">{{''}}</p> -->
                <div class="order-price">
                  <p>{{v.createTime|formNow}}</p>
                  
                </div>
                <p  class="p-right">
                    ¥{{(v.moneyOrderPay/100).toFixed(2)||'0.00'}}
                    
                  </p>
                <p class="icon-right">
                  <van-icon name="arrow" />
                </p>
              </div>
            </div>
            <div v-if="orderList.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
          </van-list>
        <!-- </van-tab>
      </van-tabs> -->
    </van-pull-refresh>
    <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
  </div>
</template>

<script>
import startEndTime from '@/components/startEndTime/startEndTime'
import { format, phonestar,formNow } from '@/utils'

export default {
  data () {
    return {
      formNow,
      phonestar,
      active: 0,
      btimg:require('@/assets/img/Bitmap.png'),
      isLoading: false,
      loading: false,
      finished: false,
      kaiguan: true,
      count: '',   //总共数据
      dataList: [{
        name: '全部收款'
      }, {
        name: '微信收款'
      }, {
        name: '支付宝收款'
      }],
      topheader: {
        name: '查单',
        left: '2',
        right1: '1',
        right2:'1',
        heade: 'header1',
        key:''
      },
      pageSize:10,
      page:1,
      pagination: {
        page: 1,
        count: 10
      },
      total: 0,
      startendtime1: {
        title: '选择时间',
        type: 'date',
        onoff: false,
        starttime: '',
        endtime: ''
      },
      orderList: []
    }
  },
  filters:{
    formNow
  },
  components: {
    startEndTime
  },
  methods: {
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
            this.orderPageList()

            // 加载状态结束
            this.loading = false
          }
        }, 500)
      } else {
        this.loading = false
      }
    }, 
    // onLoad () {
    //   // 异步更新数据
    //   if (this.kaiguan == true) {
    //     this.finished = false
    //     setTimeout(() => {


         
    //       if (this.pagination.page * this.pagination.count >= (this.total + this.pagination.count)) {
    //         this.finished = true
    //         this.loading = false
    //       } else {
    //         this.orderPageList()

    //         // 加载状态结束
    //         this.loading = false
    //       }
    //     }, 500)
    //   } else {
    //     this.loading = false
    //   }
     
    // },
    orderPageList () {
      if (this.kaiguan == true) {
        this.kaiguan = false
        let para = {
          storeId: this.$route.query.id,
          page: {
            // pageNo: this.pagination.page,
            // pageSize: this.pagination.count,
            pageSize:this.pageSize,
            pageNo:this.page,
          },
          searchParameter: {
            starTime: this.startendtime1.starttime,
            endTime: this.startendtime1.endtime,
            keyWord: this.topheader.key,
          }
        }
        this.shopApi.orderPageList(para).then(res => {
          // if (res.data.data) {
          //     this.total = res.data.data.count;
          //     this.orderList = this.orderList.concat(res.data.data.list)
          //     this.pagination.page++;
          // }
          if (res.data.data.list) {

            this.orderList = this.orderList.concat(res.data.data.list)

          }

          this.count = res.data.data.count
          this.page++;
          this.kaiguan = true
        })
      }
    },
    clicks () {
       if (window._czc) {
                        window._czc.push(['_trackEvent', '查单', '时间筛选','' ,'' , '']);//其中灰色的为选填项
         }
      this.startendtime1.onoff = !this.startendtime1.onoff
    },
    times (msg) { // 时间插件的事件
      console.log('msg', msg)
      if (msg.oldtime) {
        this.startendtime1.starttime = format(msg.olddate, 'yyyy-MM-dd hh:mm:ss')
        this.startendtime1.endtime = format(msg.newdate, 'yyyy-MM-dd hh:mm:ss')
        this.initialize()
        this.orderPageList()
      } else {
        console.log('取消')
        this.startendtime1.starttime = ''
        this.startendtime1.endtime = ''
        this.initialize()
        this.orderPageList()
      }
      this.startendtime1.onoff = msg.onoff
    },
    searchTime () {
      
      this.startendtime1.onoff = !this.startendtime1.onoff
    },
    // initialize () {  //初始化
    //   this.pagination.page = 1
    //   this.orderList = []
    //   this.isLoading = false
    //   this.kaiguan = true
    //   this.finished = false
    // },
      initialize (key) {  //初始化
      this.page = 1
      this.orderList = []
      if(!key){
      this.topheader.key=''
      }
      this.isLoading = false
      this.loading = false
      this.kaiguan = true
      this.finished = false
      this.orderPageList()
    },
    orderDetail (item) {
       if (window._czc) {
               window._czc.push(['_trackEvent', '查单', '订单详情','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({ path: '/OrderDetails', query: { orderId: item.id } })
    },
    onClick () {

      this.initialize()
      this.orderPageList()
    },
    searchgetList () {
      this.initialize()
      this.orderPageList()
    },
    // search () {
    //   this.topheader = {
    //     search: true,
    //     heade: 'header1',
    //   }
    // },
     search(key){
        if (window._czc) {
                        window._czc.push(['_trackEvent', '查单', '搜索','' ,'' , '']);//其中灰色的为选填项
         }
      this.topheader.key=key
      this.initialize(key)
    },
    notsearch () {
      this.topheader = {
        name: '查单',
        left: '2',
        heade: 'header1',
        right1: true,
        right2: true,
        right3: false,
      }
      this.initialize()
      this.orderPageList()


    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.initialize()
        this.orderPageList()
      }, 500);
    }
  },
  created () {
    this.orderPageList()
  }

}
</script>

<style scoped type="text/scss" lang="scss">
.van-tabs--card{
  padding-top: 0px;
}
.van-tabs--card /deep/ .van-tabs__wrap{
  height: 50px;
  padding-top: 10px;
  background: #00A7FC;
}
.month-statistical {
  display: flex;
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  color: #a6a6a6;
  padding: 0 18px;

  p:nth-child(2) {
    padding-left: 10px;
  }

  p:nth-child(3) {
    padding-left: 10px;
  }
}

.order-box {
  margin-bottom: 10px;
  width: 90%;
  margin-left: 5%;
  margin-top: 10px;
  border-radius:5px;
  .order-list {
    font-size: 11px;
    padding: 0 39px 15px 18px;
    background-color: #ffffff;
    position: relative;

    .order-time {
      display: flex;
      justify-content: space-between;
      height: 39px;
      line-height: 39px;
      margin-left: 60px;

      p:nth-child(1) {
        color: #333;
      }

      p:nth-child(2) {
        color: rgba(0, 136, 253, 1);
      }
    }

    .bank-deal {
      text-align: right;
      color: #818181;
    }

    .order-price {
      margin-left: 60px;
      display: flex;
      justify-content: space-between;
      height: 25px;
      line-height: 25px;

      p:nth-child(1) {
        font-size: 15px;
        color: #999;
      }

      p:nth-child(2) {
        color: #666666;

        .price {
          font-size: 15px;
          color: #353535;
        }
      }
    }

    .subsidies {
      text-align: right;
      color: #818181;
    }

    .icon-right {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translate(0, -50%);
      color: #cbcbcb;
      font-size: 16px;
    }
    .p-right{
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translate(0, -50%);
      font-size: 14px;
      line-height: 16px;
    }
  }
}
.order-pic{
  width: 40px;
  height: 40px;
  position: absolute;
  left: 12px;
  top: 17px;
  border-radius: 50%;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
