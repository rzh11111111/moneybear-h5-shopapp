<template>
  <div class="app-init" style="background:#fff;">
    <!-- <top-column :top-header="topheader"></top-column> -->
    <allApplyResult
    :result="result"
    :redresult='redresult' 
    :truebutton='truebutton'
    :falsebutton='falsebutton'
    @clickFalse='clickFalse'
    @clickTrue='clickTrue'
    ></allApplyResult>
    <!-- <div class="result">
      <div  class="result-img"><img src="@/assets/img/applyresult-true.png"  /></div>
     
      <p class="content1" v-if="type==0&&win==true">入驻申请提交成功</p>
      <p class="content2" v-if="type==0&&win==true">预计3个工作日内完成审核，审核结果以短信通知为准！</p>
      <p class="content1" v-if="type==0&&win==false">提交申请失败</p>
      <p class="content2" v-if="type==0&&win==false">{{result}}</p>

      <p class="content1" v-if="type==1&&win==true">提交申请成功，正在审核中</p>
      <p class="content2" v-if="type==1&&win==true">审核结果，将消息通知申请者</p>
      <p class="content1" v-if="type==1&&win==false">提交申请失败</p>
      <p class="content2" v-if="type==1&&win==false">{{result}}</p>

      <p class="content1" v-if="type==2&&win==true">绑定成功</p>
      <p class="content1" v-if="type==2&&win==false">绑定失败</p>
      <p class="content2" v-if="type==2&&win==false">{{result}}</p>

      <p class="content1" v-if="type==3&&win==true">解绑成功</p>
      <p class="content1" v-if="type==3&&win==false">解绑失败</p>
      <p class="content2" v-if="type==3&&win==false">{{result}}</p>

      <p class="content1" v-if="type==4&&win==true">提现成功</p>
      <p class="content1" v-if="type==4&&win==false">提现失败</p>
      <p class="content2" v-if="type==4&&win==false">{{result}}</p>

      <p class="content1" v-if="type==5&&win==true">申请成功，省区总处理中</p>
      <p class="content2" v-if="type==5&&win==true">处理结果，将消息通知申请者</p>
      <p class="content1" v-if="type==5&&win==false">申请失败</p>
      <p class="content2" v-if="type==5&&win==false">{{result}}</p>

      <p class="content1" v-if="type==6&&win==true">已提交</p>

      <van-button class="content3" type="default" @click="goback" :round="true">返回</van-button>
    </div>
    <div v-if="type==2&&win==false">
      <van-icon slot="right-icon" name="info" class="custom-icon" />失败原因为身份/证件信息有误时，请前往“详情-资料信息”页核对证照信息
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
      // type: 0,  //从哪来  0添加资料  1修改资料 2绑卡 3取消绑卡 4提现 5预推广 6修改合同
      // win: '',   // 成功失败  成功true
      // result: '',   //失败理由
    }
  },
  components: {
    allApplyResult
  },
  methods: {
    clickFalse(){

    },
    clickTrue(){

    },
    // goback () {
     
    //   this.$router.go(-2)
    
    // },
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
  
}
</script>

<style scoped>

</style>
