<template>
  <div class="page">
      <div class="backg"></div>
      <div class="goback" @click="goback">
          <img src="@/assets/img/backlist.png"/>
      </div>
      <div class="clickinput" @click="toshare" v-if="shareMember">
          查看返现
      </div>
      <div class="clickinput" @click="tobind" v-else>
          绑定省钱熊账号享奖励
      </div>
      <!-- <p class="clickp" @click="toshare">查看返现</p> -->
  </div>
</template>

<script>
import {back} from '@utils'
  export default {
    data () {
      return {
        shareMember:''
      }
    },
    components: {

    },
    methods: {
        goback(){
            this.$router.go(-1)
        },
        toshare(){
          if (window._czc) {
               window._czc.push(['_trackEvent', '收款返现', '去收款返现页','' ,'' , '']);//其中灰色的为选填项
      
         }
            this.$router.push({
                 path: '/share',
                  query: { id: this.$route.query.id, phone: this.$route.query.phone }
        
            })
        },
         tobind () {
           if (window._czc) {
               window._czc.push(['_trackEvent', '收款返现', '绑定','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({
        path: '/bind',
        query: {          id: sessionStorage.getItem('storeId'),
          phone: this.$route.query.phone
        }
      })
    },
    },
    computed: {

    },
    mounted(){
      back('#FD364D')
      this.shareMember=this.$route.query.shareMember
    }, 
      beforeRouteEnter (to,form,next){
        if(form.path=='/bind'||form.path=='/share'||form.path=='/ApplyResult'){
            next(vm=>{
              vm.$router.go(-1)
            }
            )
        }else{
          next(
          )
             
        }
       
}
  }
</script>

<style scoped lang="scss" type="text/scss">
.backg{
    width: 100%;
    height: 100vh;
     background: url('~@/assets/img/public.png')  no-repeat;
     background-size: 100% auto;
     background-color: #FD364D; 
}
 .goback{
     position: absolute;
     left: 10px;
     top: 10px;
     width: 50px;
     height: 50px;
     img{
         width: 60%;
         height: 60%;
     }
 }
 .clickinput{
     width: 247px;
     height: 97px;

     position: absolute;
     left: 50%;
     bottom: 55px;
     text-align: center;
     transform: translateX(-50%);
     background: url('~@/assets/img/public-input.png')  no-repeat;
     background-size: 100% auto;
     font-size: 18px;
     line-height: 97px;
     font-weight:600;
        color:rgba(171,78,0,1);
 }
 .clickp{
     width: 100%;
     font-size:15px;
     color: #fff;
     position: absolute;
     text-align: center;
     bottom: 35px;

 }
</style>
