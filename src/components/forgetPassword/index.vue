<template>
  <div  class="forgett" style="background: #fff;height: calc(100vh - 44px);border-top:1px solid #fff;">
  <div class="login-all" v-show="choosetype === '1'">
    <h4 class="logo-bottom">{{titles}}</h4>

    <div class="login-warn" >
      <div v-show='warn' style="display: flex">
        <div  class="login-warn-img">
          <!-- <img src="@/assets/img/index/login-warn.png"> -->
        </div>
      {{warn}}
      </div>
      <div v-show='!warn'></div>
    </div>
    <div v-show="steps===1">

    
    <div class="login-input" :class="userfocus" >
      <div  class="login-input-img">
        <svg-icon icon-class="login-username"/>
       
      </div>
      <input type="text" placeholder="请输入账号" v-model="username" class="username" @focus="getfocus(0)" @blur="losefocus(0)">
    </div>
    <!-- <div class="login-input" :class="phonefocus">
      <div  class="login-input-img">
       
      </div>
    </div> -->
    <div class="login-input" :class="notefocus">
      <div  class="login-input-img">
        <svg-icon icon-class="login-note"/>
      
      </div>
      <input type="number" placeholder="请输入短信验证码" v-model="code" class="username" @focus="getfocus(2)" @blur="losefocus(2)">
      
    <van-button type="primary" v-show="sendAuthCode" class="note"   @click="getnote" >获取验证码</van-button>
      <span v-show="!sendAuthCode" class="note noteclick"> <span class="auth_text_blue">{{auth_time}} </span>s</span>
    </div>
    <van-button type="primary" size="large"  :loading="submitLoading" @click="nextpwd" >下一步</van-button>
</div>
<div v-show="steps===2">
 <!--<div class="login-g"></div>-->
    <div class="login-input" :class="passfocus" >
      <div  class="login-input-img">
        <img src="@/assets/img/index/login-password.png">
      </div>
      <input type="password" placeholder="请设置新密码" v-model="password" class="password" @focus="getfocus(3)" @blur="losefocus(3)">

    </div>
    <div class="login-input" :class="confirmfocus" >
      <div  class="login-input-img">
        <img src="@/assets/img/index/login-password.png">
      </div>
      <input type="password" placeholder="确认密码" v-model="confirm" class="password" @focus="getfocus(4)" @blur="losefocus(4)">

    </div>
    <div class="login-forget">密码格式：6~32个字符，数字、字母、特殊符号( . _ - @ )至少两种组合</div>
    <van-button type="primary" size="large"  :loading="submitLoading" @click="getpwd" >确认修改</van-button>
  </div>
</div>
   <div  class="login-all"  v-show="choosetype === '2'">
      <div  class="logo">
    <!-- <img src="@/assets/img/LOGO.png" alt="logo"> -->
    </div>
    <h4 class="logo-bottom">下载省钱熊 省钱近一半</h4>

    <div class="login-warn" >
      <div v-show='warn' style="display: flex">
        <div  class="login-warn-img">
          <!-- <img src="@/assets/img/index/login-warn.png"> -->
        </div>
      {{warn}}
      </div>
      <div v-show='!warn'></div>
    </div>
    <div class="login-input" :class="userfocus" >
      <div  class="login-input-img">
        <!-- <van-icon name="user-o" color="#d0d0d0" /> -->
        <!-- <img src="@/assets/img/index/login-username.png"> -->
         <svg-icon icon-class="login-username"/>
      </div>
      <input type="text" placeholder="请输入账号" v-model="username" class="username" @focus="getfocus(0)" @blur="losefocus(0)">
    </div>
    <div class="login-input" :class="phonefocus">
      <div  class="login-input-img">
        <svg-icon icon-class="login-username"/>
        <!-- <img src="@/assets/img/index/login-username.png"> -->
      </div>
      <input type="number" placeholder="请输入手机号" v-model="phone" class="username" @focus="getfocus(1)" @blur="losefocus(1)">
    </div>
    <div class="login-input" :class="notefocus">
      <div  class="login-input-img">
        <svg-icon icon-class="login-note"/>
        <!-- <img src="@/assets/img/index/notelcon.png"> -->
      </div>
      <input type="number" placeholder="请输入短信验证码" v-model="code" class="username" @focus="getfocus(2)" @blur="losefocus(2)">
      
    <van-button type="primary" v-show="sendAuthCode" class="note" :disabled="!phone || phone.length != 11"  @click="getnote" >获取验证码</van-button>
      <span v-show="!sendAuthCode" class="note noteclick"> <span class="auth_text_blue">{{auth_time}} </span>s</span>
    </div>

   
    <div class="login-input" :class="passfocus" >
      <div  class="login-input-img">
        <img src="@/assets/img/index/login-password.png">
      </div>
      <input type="password" placeholder="请设置新密码" v-model="password" class="password" @focus="getfocus(3)" @blur="losefocus(3)">

    </div>
    <div class="login-input" :class="confirmfocus" >
      <div  class="login-input-img">
        <img src="@/assets/img/index/login-password.png">
      </div>
      <input type="password" placeholder="确认密码" v-model="confirm" class="password" @focus="getfocus(4)" @blur="losefocus(4)">

    </div>
    <div class="login-forget">密码格式：6~32个字符，数字、字母、特殊符号( . _ - @ )至少两种组合</div>
    <van-button type="primary" size="large" :disabled="!disabled" :loading="submitLoading" @click="getpwd" >确认修改</van-button>

   </div>
  <div class="homelogo"  v-if="choosetype === '2'">
            
            <img src="@/assets/img/index/homelogo.png">
        </div>
  </div>
</template>
<script>

import {inputup,back,inputup2} from "@utils";
export default {
  data () {
    return {
      submitLoading: false,
      steps:1,
      titles:'找回密码',
      timer: null,
      choosetype: '', // 商户推广
      warn: '', // 错误信息
      username: '',
      phone:'',
      code: '',
      password: '',
      confirm: '',
      sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /* 倒计时 计数器 */
      opacity: 'opacity',
      passtype: '1',
      white1: 'white',
      white2: '',
      userfocus: '',
      phonefocus: '',
      notefocus: '',
      passfocus: '',
      confirmfocus: ''
    }
  },
  methods: {
    handleLogin () {
      console.log(this.Api)
      // this.loading = true
      // let ip = returnCitySN["cip"]
      // let postData = {
      //   username: this.username,
      //   password: this.password
      //   // ip: ip,
      // }
      // this.Api.loginByUsername(postData).then(res => {
      this.$router.push({
        path: '/Home'
      })
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    getfocus (el) {
      switch (el) {
        case 0:
          this.userfocus = 'blue'
          break
        case 1:
          this.phonefocus = 'blue'
          break
        case 2:
          this.notefocus = 'blue'
          break
        case 3:
          this.passfocus = 'blue'
          break
        case 4:
          this.confirmfocus = 'blue'
          break
      }
    },
    losefocus (el) {
      switch (el) {
        case 0:
          if (!this.username) {
            this.warn = '账号不能为空'
            this.userfocus = 'error-bottom';
            return false
          } else {
            this.warn = ''
            
          }
          this.userfocus = ''
          break
        case 1:
          if (!this.phone) {
            this.warn = '手机号不能为空'
            this.phonefocus = 'error-bottom';
            return false
          } else if(/^\d{11}$/.test(this.phone)){
            this.warn = ''
          } else {
            this.warn = '手机号格式不正确'
            this.phonefocus = 'error-bottom';
            return false
          }
          this.phonefocus = ''
          break
        case 2:
          if (!this.code) {
            this.warn = '短信验证码不能为空'
            this.notefocus = 'error-bottom';
            return false
          } else {
            this.warn = ''
          }
          this.notefocus = ''
          break
        case 3:
          if (!this.password) {
            this.warn = '新密码不能为空'
            this.passfocus = 'error-bottom';
            return false
          } else if(this.password.length < 6 || this.password.length > 32) {
            this.warn = '密码必须为6~32个字符'
          } else if(/(?!^\d+$)(?!^[A-Za-z]+$)(?!^[_|\-|\.|@]$)^[\w|\-|\.|@]{6,32}$/.test(this.password)) {
            this.warn = ''
          } else {
            this.warn = '密码必须为数字、字母、特殊符号( . _ - @ )至少两种组合'
          }
          this.passfocus = ''
          break
        case 4:
          if (!this.confirm) {
            this.warn = '确认密码不能为空'
            this.confirmfocus = 'error-bottom';
            return false
          } else if (this.password !== this.confirm) {
            this.warn = '两次输入密码不一致'
            this.confirmfocus = 'error-bottom';
            return false
          } else {
            this.warn = ''
          }
          this.confirmfocus = ''
          break
      }
      if (!el && el !== 0) {
          if (!this.username) {
            this.warn = '账号不能为空'
            this.userfocus = 'error-bottom';
            return false
          }
          this.userfocus = ''

          // if (!this.phone) {
          //   this.warn = '手机号不能为空'
          //   this.phonefocus = 'error-bottom';
          //   return false
          // } else if(!(/^\d{11}$/.test(this.phone))){
          //   this.warn = '手机号格式不正确'
          //   this.phonefocus = 'error-bottom';
          //   return false
          // }
          // this.phonefocus = ''

          if (!this.code) {
            this.warn = '短信验证码不能为空'
            this.notefocus = 'error-bottom';
            return false
          }
          this.notefocus = ''

          if (!this.password) {
            this.warn = '新密码不能为空'
            this.passfocus = 'error-bottom';
            return false
          }
          this.passfocus = ''

          if (!this.confirm) {
            this.warn = '确认密码不能为空'
            this.confirmfocus = 'error-bottom';
            return false
          } else if (this.password !== this.confirm) {
            this.warn = '两次输入密码不一致'
            this.confirmfocus = 'error-bottom';
            return false
          }
          this.warn = ''
          this.confirmfocus = ''
          return true
      }
    },
    eyeclick (el) {
      this.passtype = el
    },
    getnote () {
        this.warn = ''
        

        if (this.choosetype === '1') {
          let para={
            username:this.username
          }
          this.Api.getMsg(para).then(res => {
            switch (res.data.status) {
              case 1:
                this.warn = ''
                this.sendAuthCode = false
        this.auth_time = 60
                this.timerInterval()
                break
              case 17:
                this.warn = '请填写手机号'
                break
              case 10603:
                this.warn = '手机号未注册'
                break
              case 11901:
                this.warn = '手机号不存在'
                break
            }
          }).catch(error => {
            this.timerInterval()
            console.log(error)
          })
        } else if (this.choosetype === '2') {
          let para={
            username:this.phone
          }
          this.Api.loginByMerchantMsg(para).then(res => {
            switch (res.data.status) {
              case 1:
                this.warn = ''
                this.sendAuthCode = false
        this.auth_time = 60
                this.timerInterval()
                break
              case 17:
                this.warn = '请填写手机号'
                break
              case 10603:
                this.warn = '手机号未注册'
                break
              case 11901:
                this.warn = '手机号不存在'
                break
            }
          }).catch(error => {
            this.timerInterval()
            console.log(error)
          })
        }



      
    },
    timerInterval () { // 获取验证码
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendAuthCode = true
          clearInterval(this.timer)
        }
      }, 1000)


    },
    nextpwd(){
      console.log('111')
        if(this.username&&this.code&&!this.warn){
            let para={
                username:this.username,
                verifyCode:this.code
            }
            console.log('111')
            this.Api.examineCode(para).then(res=>{
                if(res.data.status===1){
                    this.steps=2
                    this.titles='设置新密码'
                }else{
                    this.$toast('验证码错误，请重新输入')
                }
            })
        }
    },
    getpwd () { // 修改密码
      let para = {
        username: this.username,
        phone:this.phone,
        newPwd: this.password,
        verifyCode: this.code
      }
      if (!this.losefocus()) {
        return false;
      }
      
      this.submitLoading = true
      if (this.choosetype === '1') {
        para={
          username: this.username,
          newPwd: this.password,
          checkNewPwd:this.confirm
        }
        this.Api.examineChange(para).then(res => {
          console.log(res)
          this.submitLoading = false
          if (!res.data) {
            return this.$toast('请求失败');
          }
          switch (res.data.status) {
            case 1:
              this.warn = ''
              this.$toast('修改成功')
              this.local.$setLocalStorageByName('choosetype','1')
              this.local.$setLocalStorageByName('username', this.username)
              this.local.$setLocalStorageByName('password', this.password)
              this.$router.replace('/')
              break
            case 17:
              this.warn = '请填写全部信息'
              return false;
            case 21:
              this.warn = '验证码不存在'
              return false;
            case 22:
              this.warn = '验证码错误或已过期'
              return false;
            case 40000:
              this.warn = '会员账号未注册'
              return false;
            case 80001:
              this.warn = '密码格式不正确'
              return false;
            case 60017:
              this.warn = '新密码与旧密码不能相同'
              return false;
          }
          if (res.data.message) {
              this.$toast(res.data.message)
          } else {
              this.$toast(res.data.stateMessage)
          }
        }).catch(() => {
          this.submitLoading = false;
        })
      } else if (this.choosetype === '2') {
        this.Api.loginBymMerchantPwd(para).then(res => {
          this.submitLoading = false
          if (!res.data) {
            return this.$toast('请求失败');
          }
          switch (res.data.status) {
            case 1:
              this.warn = ''
              this.$toast('修改成功')
              this.local.$setLocalStorageByName('choosetype','2')
              this.local.$setLocalStorageByName('username', this.username)
              this.local.$setLocalStorageByName('password', this.password)
              this.$router.replace('/')
              return false
            case 17:
              this.warn = '请填写全部信息'
              return false
            case 21:
              this.warn = '验证码不存在'
              return false
            case 22:
              this.warn = '验证码错误或已过期'
              return false
            case 40000:
              this.warn = '会员账号未注册'
              return false
            case 80001:
              this.warn = '密码格式不正确'
              return false
            case 40099:
              this.warn = '新密码与旧密码不能相同'
              return false
          }
          if (res.data.message) {
              this.$toast(res.data.message)
          } else {
              this.$toast(res.data.stateMessage)
          }
        }).catch(() => {
          this.submitLoading = false;
        })
      }
    },
    toback() {
      back('#ffffff')
      // window.location.href = `qtkjshop://background?color=#ffffff`
    },
  },
  computed: {
    disabled: function () {
      if (this.username && this.password && this.phone) {
        return true
      } else {
        return false
      }
    }

  },
  created () {

    this.toback()
    this.choosetype = this.$route.query.choosetype
    if(this.$route.query.userName){
      this.username=this.$route.query.userName
    }
    // if (this.choosetype === '1') {
    //   this.topheader.name = '商户找回密码'
    // } else if (this.choosetype === '2') {
    //   this.topheader.name = '推广找回密码'
    // }
  },
  mounted(){
    inputup('.login-all','.forgett')
  },
  beforeDestroy(){
    inputup2('.login-all','.forgett')
  }

}
</script>
<style scoped lang="scss">
  .forgett{
    position: relative;
  }
  .login-all{
    width: 300px;
    margin-left: 37.5px;
    margin-top: 35px;
    position: relative;
  }
  
  .logo-bottom{
    margin-top: 55px;
    font-size: 22px;
    letter-spacing:1px;
    color: #333;
    text-align: left;
  }
  .login-choose{
    width: 255px;
    height: 36px;
    margin-top: 70px;
    background: white;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 22px;
    border: 1px solid #0088FD;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
  }
  .loginbtn{
    font-size: 16px;
    line-height: 34px;
    color: #999;
    z-index: 100;
  }
  .white{
    color: white;
  }
  .login-onoff{
    width: 127.5px;
    height: 35px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 21px;
    background: #0088FD;
    background: -webkit-linear-gradient(to right,#00A7FC, #0088FD);
    background: -moz-linear-gradient(to right,#00A7FC, #0088FD);
    background: linear-gradient(to right,#00A7FC, #0088FD);
    border:none;
    position: absolute;

  }
  .login-on{
    left: 0;
  }
  .login-off{
    left: 50%;
  }
  .login-warn{
    font-size: 12px;
    margin-top: 40px;
    color: #E9372F;
    letter-spacing:1px;
  }
  .login-warn-img{
    width: 16px;
    height: 16px;
    margin-right: 5px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  input{
    border: none;
    color: #333333;
  }
  input::-webkit-input-placeholder{
    color: #CCC;
  }
  .username,.password{
    font-size: 14px;
    line-height: 30px;
    padding-left: 11px;
  }
  .login-input{
    width: 100%;
    margin-top: 2px;
    margin-bottom:15px;
    border-bottom: 1px solid #f6f6f6;
    padding-bottom: 15px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .blue{
    border-bottom: 1px solid #0088FD;
  }
  .error-bottom{
    border-bottom: 1px solid red;
  }
  .login-pass{
    width: 100%;
    margin-top: 19px;
    border-bottom: 1px solid #0088FD;
    padding-bottom: 15px;
  }
  .login-input-img{
    width: 18px;
    height: 18px;
    svg{
      width: 100%;
      height: 100%;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
  .login-eye{
    width: 18px;
    height: 18px;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
  .van-button{
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin-top: 15px;
    background: #0088FD;
    background: -webkit-linear-gradient(to right,#00A7FC, #0088FD);
    background: -moz-linear-gradient(to right,#00A7FC, #0088FD);
    background: linear-gradient(to right,#00A7FC, #0088FD);
    border:none
  }

  .login-forget{
    text-align: center;
    color: #ccc;
    font-size: 12px;
    margin-top: 15px;
  }
  .note{
    width: auto !important;
    margin-top: 0;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    padding: 0 5px;
    position: absolute;
    right: 5px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;

  }
  .noteclick{
    color: #999;
    background: none;
    border: none;
    right: 27.5px;
  }
.homelogo {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    img{
      width:100%;
    }
}
</style>
