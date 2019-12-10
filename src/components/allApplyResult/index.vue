<template>
  <div class="page">
      <div class="app-init" style="background:#fff;">
    <top-column :top-header="topheader"></top-column>
    <div class="result">
      <div  class="result-img"><img src="@/assets/img/applyresult-true.png"  /></div>
      
      <p class="content1">{{result}}</p>
      
      <p class="content1"><slot name="content1"></slot></p>
      <p class="content2">{{redresult}}</p>

     <div>
      <van-button :class="truebutton?'content3 marginr':'content3'" type="default" @click="clickfalse" :round="true">{{falsebutton?falsebutton:'返回'}}</van-button>
      <van-button class="content3 marginl" v-if="truebutton" type="default" @click="clicktrue" :round="true">{{truebutton}}</van-button>
     </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
      name:'allApplyResult',
      props: {
        result:{  
            type:String,
        },
       
        redresult:{
          type:String,
        },
        truebutton:{
            type:String,
        },
        falsebutton:{
            type:String,
        }
    },
    data () {
      return {
         topheader: {
        name: '结果',
        left: '0',
        heade: 'header',

      },
      }
    },
    components: {

    },
    methods: {
        clickfalse () {
      if(this.falsebutton){ //如果有拒绝的文案，就调，平时就是返回，要是想改也传个‘返回’
          this.$emit('clickFalse', 'click')
      }else{
          this.$router.go(-2)
      }
      
      


    },
    clicktrue(){
        this.$emit('clickTrue', 'click')
    },
    goback(){
      this.$router.go(-2)
    }
    },
    computed: {

    },
    mounted(){

    },
  }
</script>

<style scoped lang="scss" type="text/scss">
.result {
  width: 100%;
  background: #fff;
  text-align: center;
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
 .marginr{
   margin-right: 20px;
 }
 .marginl{
   margin-left: 20px;
   background: linear-gradient(to bottom, #00A7FC 0%, #0088fd 100%);
   color: #fff;
 }
</style>
