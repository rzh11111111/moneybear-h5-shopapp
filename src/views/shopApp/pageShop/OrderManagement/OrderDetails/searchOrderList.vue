<template>
  <div class="app-init">
    <top-bars :top-header="topheader" ref="topdata" @searchOrderList="searchOrderList"></top-bars>
    <div class="search-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="order-box" v-for="(v ,index) in orderList" :key="index" @click="orderDetail(v)">
          <div class="order-list">
            <div class="order-time">
              <p>{{v.createTime}}</p>
              <p>交易成功</p>
            </div>
            <p class="bank-deal">{{''}}</p>
            <div class="order-price">
              <p>{{v.memberName||phonestar(v.memberPhone?memberPhone:'')}}</p>
              <p>
                实付: ¥{{(v.moneyOrderPay/100).toFixed(2)||'0.00'}}
                实收: ¥
                <span
                  class="price"
                >{{(v.receivablesMoney/100)||'0.00'}}</span>
              </p>
            </div>
            <p class="subsidies">(含平台补贴：¥{{(v.platformSubsidy/100)||'0.00'}})</p>
            <p class="icon-right">
              <van-icon name="arrow" />
            </p>
          </div>
        </div>
        <div v-if="orderList.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
      </van-list>
    </div>
  </div>
</template>

<script>
import topBars from '@/components/topBars'

export default {
  data () {
    return {
      active: 0,
      isLoading: false,
      loading: false,
      finished: false,
      dataList: [{
        name: '全部'
      }, {
        name: '待评价'
      }, {
        name: '银行处理中'
      }],
      topheader: {
        name: '',
        left: '2',
        serarch: true,
        right3: true,
        heade: 'header1'
      },
      pagination: {
        page: 1,
        count: 10,
        total: 0
      },
      orderList: [
        {
          time: '2018-12-28 22:58:20',
          name: '花花2036',
          status: '银行处理中',
          status1: '交易成功',
          price: '100',
          price1: '96.15',
          price2: '0.15'
        }, {
          time: '2018-12-28 22:58:20',
          name: '花花2036',
          status: '银行处理中',
          status1: '交易成功',
          price: '100',
          price1: '96.15',
          price2: '0.15'
        },
      ]
    }
  },
  components: {
    topBars
  },
  methods: {
    orderDetail (item) {
      this.$router.push({ path: '/OrderDetails', query: { orderId: item.id } })
    },
    onClick (index) {
      console.log('aaa', index)
    },
    searchOrderList (val) {
      let para = {
        storeId: this.$route.query.storeId,
        // page: {
        //     pageNo: this.pagination.page,
        //     pageSize: this.pagination.count,
        // }
      }
      this.shopApi.orderPageList(para).then(res => {
        if (res.data.data) {
          this.orderList = res.data.data.list
        }
      })
      console.log('search', val)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //     this.list.push(this.list.length + 1);
        // }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.orderList.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }

}
</script>

<style scoped type="text/scss" lang="scss">
.search-list {
  margin-top: 10px;
  .order-box {
    margin-bottom: 10px;
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
        p:nth-child(1) {
          color: #a6a6a6;
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
        display: flex;
        justify-content: space-between;
        height: 25px;
        line-height: 25px;
        p:nth-child(1) {
          font-size: 15px;
          color: #353535;
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
        font-size: 20px;
      }
    }
  }
}
</style>
