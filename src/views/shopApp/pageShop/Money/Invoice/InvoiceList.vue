<template>
  <div class="app-init">
    <top-column :top-header="topheader" @toinvoice="toinvoice" ></top-column>
    <Lists 
      ref="lists"
      :value="store"
      @initialize="getList"
      @getlist="getList"
    >
    <div slot="detailList">
      <div
              class="order-box"
              v-for="(v ,index) in store"
              :key="index"
              @click="toDetail(v)"
            >
           
              <div class="order-list">
                
                <div class="order-time">
                  
                  <p>平台服务费3123213</p>
                </div>
                
                <div class="order-price">
                  <p>2018-12-12</p>
                  
                </div>
                <p  class="p-right">
                    代开票
                    
                  </p>
                <p class="icon-right">
                  <van-icon name="arrow" />
                </p>
              </div>
            </div>
    </div>
    </Lists>
  </div>
</template>

<script>
import Lists from '@/components/likeLists/likeLists';
import {  currency } from "@/utils";
  export default {
    data () {
      return {
        topheader: {
        name: '开票记录',
        left: '2',
        heade: 'header1',
        right16:'1'
      },
      store: [

      ]
      }
    },
    components: {
      Lists
    },
    methods: {
      toinvoice(){
         this.$router.push({ path: '/InvoiceInfo', query: { orderId: '' } })
      },
          toDetail (item) {
       
      this.$router.push({ path: '/InvoiceDetail', query: { orderId: item.id } })
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
          serviceId: this.$route.query.id,
          
        }
        this.Api.invoiceRecord(datejson2).then(res => {
          if(res.data.status===1){
            if (res.data.data.list) {
            this.store = res.data.data.list
            // res.data.data.list.forEach(res => {
            //   res.money = currency(res.money / 100)
            // });
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
    computed: {

    },
    mounted(){
       this.getList()
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
.order-box {
  margin-bottom: 10px;
  // width: 90%;
  // margin-left: 5%;
  margin-top: 10px;
  border-radius:5px;
  .order-list {
    font-size: 11px;
    padding: 16px 39px 16px 18px;
    background-color: #ffffff;
    position: relative;

    .order-time {
      display: flex;
      justify-content: space-between;
      // height: 39px;
      // line-height: 39px;
      // margin-left: 60px;
      font-size: 15px;
      font-weight: 600;
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
      // margin-left: 60px;
      display: flex;
      justify-content: space-between;
      // height: 25px;
      // line-height: 25px;
      margin-top: 16px;
      p:nth-child(1) {
        font-size: 12px;
        color: #A6A6A6;
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
 
</style>
