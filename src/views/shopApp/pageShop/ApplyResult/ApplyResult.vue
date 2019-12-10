<template>
  <div class="app-init">
    <allApplyResult
    :result="result"
    :redresult='redresult' 
    :truebutton='truebutton'
    :falsebutton='falsebutton'
    @clickFalse='clickFalse'
    @clickTrue='clickTrue'
    ></allApplyResult>
    <!-- <top-column :top-header="topheader"></top-column>
    <div class="result">
      <div  class="result-img"><img src="@/assets/img/applyresult-true.png"  /></div>
      
      <p class="content1" v-if="type==1&&win==true">提交申请成功 正在审核中</p>
      <p class="content2" v-if="type==1&&win==true">审核结果将消息通知申请者</p>
      <p class="content1" v-if="type==1&&win==false">提交申请失败</p>
      <p class="content2" v-if="type==1&&win==false">{{result}}</p>

      <p class="content1" v-if="type==2&&win==true">绑定成功</p>
      <p class="content1" v-if="type==2&&win==false">绑定失败</p>
      <p class="content2" v-if="type==2&&win==false">{{result}}</p>

      <p class="content1" v-if="type==3&&win==true">解绑成功</p>
      <p class="content1" v-if="type==3&&win==false">解绑失败</p>
      <p class="content2" v-if="type==3&&win==false">{{result}}</p>

      <p class="content1" v-if="type==4&&win==true">提现成功</p>
      <p class="content1" v-if="type==4&&win==true">平台审批通过后，将于1-3个工作日到账</p>
      <p class="content1" v-if="type==4&&win==false">提现失败</p>
      <p class="content2" v-if="type==4&&win==false">{{result}}</p>

      <p class="content1" v-if="type==5&&win==true">绑定成功</p>

      <p class="content1" v-if="type==6&&win==true">签合同申请已提交</p>
      
      <van-button class="content3" type="default" @click="goback" :round="true">返回</van-button>
    </div> -->
  </div>
</template>

<script>
import allApplyResult from '@/components/allApplyResult'
import {back} from '@/utils'
export default {

  name: "ApplyResult",
  data () {
    return {
      // topheader: {
      //   name: '申请结果',
      //   left: '0',
      //   heade: 'header',

      // },
       result:'', //理由
      redresult:'', //红字小理由
      truebutton:'', //正确按钮文案
      falsebutton:'', //取消按钮文案
      // fromrouter: '',
      // fromtype: '',
      // type: 0,  //从哪来  1修改资料 2绑卡 3取消绑卡 4提现  5绑定会员 6签合同
      // win: '',   // 成功失败  成功true
      // result: '',   //失败理由
    }
  },
  components: {
    allApplyResult
  },
  methods: {
    // goback () {
    //   // if(this.type==5){
    //   //     this.$toast.loading({
    //   //         duration: 0,       // 持续展示 toast
    //   //         mask: true,
    //   //         message: '加载中...'
    //   //     });
    //   //     location.reload()
    //   // }else{
    //   this.$router.go(-2)
    //   // }


    // },
    clickFalse(){

    },
    clickTrue(){

    },
  },
  mounted () {
    back('#FFFFFF')
    // this.win = this.$route.query.win
    // this.type = this.$route.query.type
    // this.result = this.$route.query.result
    console.log(this.$route.query)
    this.result=this.$route.query.result
    this.redresult=this.$route.query.redresult
    this.truebutton=this.$route.query.truebutton
    this.falsebutton=this.$route.query.falsebutton
  },
  // beforeRouteEnter (to, from, next) {  // 判断是从哪里来
  //   console.log(to, from)
  //   if (from.name == 'BindCard') {
  //     next(vm => {
  //       vm.fromtype = '1';
  //       vm.fromrouter = from.name
  //     })
  //   } else if (from.name == 'ChangeMaster') {
  //     next(vm => {
  //       vm.fromrouter = '2';
  //     })
  //   } else {
  //     next(() => {
  //     })
  //   }

  // },
  // beforeRouteLeave (to, from, next) {
  //   console.log(to, from)
  //   if (to.name == 'AddSeed' || to.name == 'AddTogether' || to.name == 'AddPopularize' || to.name == 'AddLocal' || to.name == 'AddLocalFirst') {
  //     // this.$router.replace('/prohome');
  //     next()
  //   } else {
  //     next();
  //   }
  // },
}
</script>

<style scoped>
.result {
  width: 100%;
  background: #fff;
  text-align: center;
  margin-top: 10px;
  padding: 30px 0 30px 0;
}
.result-img{
  width: 250px;
  height: 180px;
  margin: 94px 0 10px 50%;
  transform: translateX(-50%);
}
.result-img img{
  width: 100%;
  height: 100%;
}
.content1 {
  margin-top: 17px;
  font-size: 14px;
  color: #4a4a4a;
}
.content2 {
  font-size: 12px;
  line-height: 17px;
  margin-top: 5px;
  color: #999;
}
.content3 {
  margin-top: 23px;
}
</style>
