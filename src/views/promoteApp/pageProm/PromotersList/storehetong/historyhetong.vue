<template>
  <div class="page">
      <top-column :top-header="topheader"></top-column>
        <div>
          <div class="history-li" v-for="(item,index) in store" :key="item.id" @click="todetali(item)">
            <div  class="history-l" v-if="item.status==0">生效中</div>
            <div  class="history-l history-l1" v-if="item.status==1">已临期</div>
            <div  class="history-l history-l2" v-if="item.status==2">已过期</div>
            <div  class="history-r">
              <p class="history-rt">合同期限  {{format(item.startTime, "yyyy/MM/dd")}}~{{format(item.endTime, "yyyy/MM/dd")}}</p>
              <p class="history-rb">签订时间  {{item.createTime}}</p>
            </div>
            <div class="history-icon">
            <div class="history-te"  v-if="item.status==0">

            </div>
            <div class="history-te history-te1"  v-if="item.status==1">

            </div>
            <div class="history-te history-te2"  v-if="item.status==2">

            </div>
            </div>
          </div>
        </div>
        <div v-show="store.length===0" class="no-data">暂无数据</div>
  </div>
</template>

<script>
import {back,format} from '@/utils'
  export default {
    data () {
      return {
        format,
           topheader: {
          name: '历史合同',
          left: '1',
          right1: '',
          heade: 'header',
        },
        store:[]
      }
    },
    components: {

    },
    methods: {
      todetali(value){
         this.$router.push({path:'/storehetong',query:{id:value.storeId,img:value.signFile,status:value.status,list:5,contractId:value.id,operatorType:value.operatorType,ratePlatform:value.ratePlatform,rateBase:value.rateBase,otherAppointment:value.otherAppointment,fromhistory:true}})
     
      }
    },
    computed: {

    },
    mounted(){
      back('#ffffff')
      let para={
        storeId:this.$route.query.id
      }
      this.Api.listContract(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        console.log(res.data.data)
        this.store=this.store.concat(res.data.data)
    }).catch(error => {
        console.log(error)
      })
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
.history-li{
  width: 90%;
  height: 92px;
  background: #fff;
  display: flex;
  position: relative;
  border-radius:5px;
  margin: 10px 5%;
  .history-l{
    width: 24px;
    height: 100%;
    background: #65D13E;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    padding-top: 22px;
    border-radius:5px 0 0 5px;
    color: #fff;
  }
  .history-l1{
    background: #FE5502;
  }
  .history-l2{
    background: #BFBFBF;
  }
  .history-r{
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    justify-content: space-around;
    font-weight: 600;
    .history-rt{
      color: #333;
      font-size: 14px;
      margin-top: 10px;
    }
    .history-rb{
      color: #999;
      font-size: 14px;
      margin-bottom: 10px;
    }
  }
}
 .history-icon{
   position: absolute;
   bottom: 0;
   right: 0;
 }
 .history-te{
   width: 0;
    height: 0;
    transform: rotate(0deg);
    border-width: 10px;
    border-color: #65D13E #f5f5f5 #f5f5f5 #65D13E;
    border-style: solid;
    border-top-left-radius: 5px;
 }
.history-te1{
  border-color: #FE5502 #f5f5f5 #f5f5f5 #FE5502;
    
}
.history-te2{
  border-color: #BFBFBF #f5f5f5 #f5f5f5 #BFBFBF;
    
}
 .history-bottomp{
   font-size:12px;
   color:rgba(153,153,153,1);
   text-align: center;
   margin-top: 17px;
 }
</style>
