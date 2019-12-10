<template>
  <div>
    <top-column :top-header="topheader"></top-column>
    <main>
      合同正文
      <aside class="contract-img">
        <img src="@/assets/img/backlcon.png" />
      </aside>
    </main>
    
     <van-field center clearable label="验证码" v-model="verifyCode" placeholder="请输入短信验证码">
      <van-button
        slot="button"
        v-show="sendAuthCode"
        size="small"
        type="primary"
        :loading="codeLoading"
        loading-text="发送中..."
        @click="getnote"
      >发送验证码</van-button>
      <van-button
        slot="button"
        v-show="!sendAuthCode"
        size="small"
        type="primary"
        class="noteclick"
      >{{auth_time}}s</van-button>
      <!--<span  slot="button" v-show="!sendAuthCode" class="note noteclick"> <span class="auth_text_blue">{{auth_time}} </span>s</span>-->
    </van-field>
    <p>验证码会发送到xxx登录手机号</p>
     <van-button type="primary" size="large" @click="inputblur" class="submitbtn">我已认真阅读合同，确认签署</van-button>
  </div>
</template>

<script>
import {getStorage} from "@/utils";
export default {
  data() {
    return {
      topheader: {
        name: "签署合同",
        left: "2",
        right1: "",
        heade: "header1"
      },
      phone:'18957728466',
      verifyCode:'',
      sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /* 倒计时 计数器 */
      timer: null,
      codeLoading: false,
      rank:{  //银行卡数据
        card:[],
        havecard:false
      }
    };
  },
  components: {
  },
  methods: {
    timeInterval () {
      this.sendAuthCode = false
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendAuthCode = true
          clearInterval(this.timer)
        }
      }, 1000)
    },
     getnote () {
      if (this.phone.length !== 11) {
        this.$toast('请输入正确的手机号')
      } else {
          this.auth_time = 60
          this.codeLoading = true;
          let para = {
            phone: this.phone,
            storeId: this.$route.query.id,
          }
          console.log(para)
          this.shopApi.shareCode(para).then(res => {
            if (res.data && res.data.status === 1) {
              this.timeInterval()
            }
            this.codeLoading = false
          }).catch(error => {
            console.log(error)
            this.codeLoading = false
          })

      }
    },
    inputblur () {//签合同
      if (!this.phone || !this.verifyCode) {
        this.$toast('请填写完整')
      }  else {
        let para = {
          storeId: this.$route.query.id,
          phone: this.phone,
          password: this.password,
          verifyCode: this.verifyCode
        }
        this.shopApi.shareRegister(para).then(res => {
          console.log(res)
          if (res.data && res.data.status === 1) {
            // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 5 } })
            this.$router.push({ path: '/ApplyResult', query: { result: '绑定成功'} })
          }
        })
      }
    },
  },
  computed: {},
  mounted() {
  
    let para2={
        storeId:this.$route.query.id
      }
      this.Api.getCardstore(para2).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        if(res.data.data.list.length>0){
          this.rank.havecard=true
          this.rank.card=res.data.data.list[0]
        }else{
          this.rank.havecard=false
          this.$dialog.confirm({
            message: '需先绑卡，然后签署合同',
            confirmButtonText:'绑定银行卡'
          }).then(() => {
            // on close
            if(getStorage(this.$route.query.id,24)){
          this.$router.push({path: '/BindCard', query: {id:this.$route.query.id,wait:true}})
        }else{
          this.$router.push({path: '/BindCard', query: {id:this.$route.query.id,bcRegisterType: this.$route.query.bcRegisterType}})
        }
          }).catch(()=>{
            this.$router.go(-1)
          });
        }
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
  }
};
</script>

<style scoped lang="scss" type="text/scss">
main {
  width: 100%;
  height: 500px;
  position: relative;
  background: #666;
  .contract-img{
      width: 50px;
      height: 50px;
      position: absolute;
      right: 10px;
      bottom: 10px;
  }
}
.noteclick{
      color: #999;
      background: none !important;
      border: none !important;
  }
</style>
