<template>
  <div class="page"  style="background:#fff;height:100vh;">
      <top-column :top-header="topheader"></top-column>
      <p class="text1">每邀请一个<span class="yellocolors">店铺入驻省钱熊</span></p>
      <p  class="text1">可按推荐店铺的收入获得平台奖励哦</p>
      <p  class="text1 yellocolors">额外收入再翻番</p>
      <div class="hello-img">
          <img src="@/assets/img/promotehello.png"/>
      </div>
      <div class="hello-input" @click="topromote">进入我的推广</div>
  </div>
</template>

<script>
import {back} from '@/utils'
  export default {
    data () {
      return {
             topheader: {
        name: '',
        left: '1',
        heade: 'header'
      },
      }
    },
    components: {
    },
    methods: {
        topromote(){
            if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '进入我的推广','' ,'' , '']);//其中灰色的为选填项
      
         }
            window.location.href = this.HTTPLOCAT + '/promoteApp.html'
        }
    },
    computed: {

    },
    mounted(){
        back('#ffffff')
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
.text1{
    color: #333;
    font-size: 20px;
    margin-left: 28px;
    margin-top: 10px;
    font-family:PingFang SC;
}
.yellocolors{
    color:#FF8247
}
 .hello-img{
     width: 100%;
     height: 462.5px;
     img{
         width: 100%;
         height: 100%;
     }
 }
 .hello-input{
     user-select: none;
     width:345px;
height:45px;
background:linear-gradient(90deg,rgba(79,158,255,1),rgba(12,116,213,1));
border-radius:45px;
color: #fff;
text-align: center;
line-height: 45px;
font-size: 15px;
position: absolute;
left: 15px;
bottom:53px;
 }
 .hello-input:active{
     bottom:52px;
     background:linear-gradient(90deg,rgb(60, 148, 255),rgb(9, 92, 170));
 }
</style>
