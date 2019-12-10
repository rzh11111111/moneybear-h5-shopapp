<template>
  <div class="login-all" id="login-box">
    <top-column :top-header="topheader"></top-column>
    <div class="height80"></div>
    <div class="anzhuotop">
      <div class="logoindex">
        <div class="loginindex-img">
          <img src="@/assets/img/LOGO2.png" alt="logo" />
        </div>
      </div>
      <div class="login-content">
        <div class="login-warn" v-if="warn" style="margin-bottom:5px">
          <div class="login-warn-img">
            <svg-icon icon-class="login-warn" />
            <!-- <img src="@/assets/img/index/login-warn.png"> -->
          </div>
          {{loginwarn}}
        </div>
        <div class="login-input" :class="userfocus">
          <!-- <div class="login-input-img"> -->
          <svg-icon icon-class="login-username" />
          <!-- <img src="@/assets/img/index/login-username.png"> -->
          <!-- </div> -->
          <input
            type="text"
            placeholder="请输入账号"
            v-model="username"
            class="username"
            @focus="getfocus(1)"
            @blur="losefocus(1)"
          />
        </div>
        <!--<div class="login-g"></div>-->
        <div class="login-input" :class="passfocus">
          <!-- <div class="login-input-img"> -->
          <svg-icon icon-class="login-password" />
          <!-- <img src="@/assets/img/index/login-password.png"> -->
          <!-- </div> -->
          <input
            :type="eyeinput"
            placeholder="请输入密码"
            v-model="password"
            :maxlength="32"
            class="password"
            @focus="getfocus(2)"
            @blur="losefocus(2)"
          />
          <div class="login-eye" @click="eyeclick()">
            <svg-icon :icon-class="eyes" />
            <!-- <img :src="eyes" @click="eyeclick()"> -->
          </div>
        </div>
        <div class="login-forget" @click="toforget">忘记密码</div>
        <!-- <div v-else class="login-forget" @click="toforget">忘记密码</div> -->

        <van-button
          type="primary"
          size="large"
          :disabled="!disabled"
          :loading="loginLoading"
          loading-text="登录中"
          @click="tologin"
        >登录</van-button>
      </div>
      <div class="login-content2"></div>
      <div class="login-content3"></div>
    </div>
    <p v-if="envir==='development'" class="envirclass">本地环境</p>
    <p v-if="envir==='test'" class="envirclass">测试环境</p>
    <p v-if="envir==='sit'" class="envirclass">预发布</p>
    <p  class="login-bottom" @click="toPromote">推广入口</p>
    <div class="homelogo">
      <img src="@/assets/img/index/homelogo.png" />
    </div>
    <!--<div @click="$router.push('/lianxi')">去lianxi</div>-->
  </div>
</template>

<script>
import { inputup, back, inputup2, loginFirst, appUpdate } from "@utils";
// import { loginn } from '@/Api/mock.js'
export default {
  data () {
    return {
      topheader: {
        name: '',
        // left: false,
      },
      username: '',
      password: '',
      loginwarn: '',
      choosetype: 1, // 选择去商户还是推广，1商户，2推广
      userfocus: '',
      passfocus: '',
      eyes: 'login-eyeoff',
      warn: false,
      eyeinput: 'password',
      loginLoading: false,
      envir: '',  //当前环境
    }
  },
  created () {
    let username = this.local.$getLocalStorageByName('username')
    let password = this.local.$getLocalStorageByName('password')
    if (username && password) {
      this.username = username
      this.password = password
    }
    let choosetype = this.local.$getLocalStorageByName('choosetype')
    if (choosetype) {
      this.choosetype = choosetype
      this.local.$setLocalStorageByName('choosetype', this.choosetype)
    } else {
      this.local.$setLocalStorageByName('choosetype', this.choosetype)
    }
    this.session.$removeSessionStorageByName('storeId')
  },
  components: {
  },
  methods: {
    // logincut(event) {
    //     if (this.choosetype !== event) {
    //         this.choosetype = event
    //         console.log(this.choosetype)
    //     }
    //     this.local.$setLocalStorageByName('choosetype', this.choosetype)
    // },
    toPromote () {
      // this.choosetype=2;
      // this.topheader.name='返回商户登录'
      // this.topheader.left='1'
      if (window._czc) {
        // eslint-disable-next-line no-sparse-arrays
        window._czc.push(['_trackEvent', '登录', '推广入口','' ,'' , '']);//其中灰色的为选填项
      }
      this.$router.push({ path: "/loginPromote" })
    },
    tologin () {
      this.losefocus(1);
      if (this.warn) {
        return;
      }
      this.losefocus(2);
      if (this.warn) {
        return;
      }

      let para = {
        username: this.username,
        password: this.password
      }

      this.local.$setLocalStorageByName('username', this.username)
      this.local.$setLocalStorageByName('password', this.password)
      this.loginLoading = true
      let push = {
        '17': '账号或密码为空',
        '80000': '账号未注册',
        '80001': '密码错误，请重新输入',
        '80002': '账号已停用',
        '80003': '未获取到系统角色'
      }
      // if (this.choosetype === 1) { // 商户登录
        this.$store.dispatch('loginByStore', para).then((res) => {
          this.local.$setLocalStorageByName('choosetype', 1)
          // this.loginLoading = false
          if (res.data.status === 1) {
            this.warn = false
            // 友盟埋点
            if (window._czc) {
              // eslint-disable-next-line no-sparse-arrays
              window._czc.push(['_trackEvent', '登录', '登录商户按钮','' ,'' , '']);//其中灰色的为选填项
            }
            window.location.href = this.HTTPLOCAT + '/shopApp.html?time=' + ((new Date()).getTime());

            // window.location.href = this.HTTPLOCAT + '/shopApp.html'
          } else if (push[res.data.status]) {
            this.loginLoading = false
            this.loginwarn = push[res.data.status]
            this.warn = true
          } else {
            this.loginLoading = false
            this.loginwarn = "未知的错误，请联系管理员"
            this.warn = true
          }

        }).catch((res) => {
          this.loginLoading = false
          console.log(res)
        })
      // }
      //  else if (this.choosetype === 2) { // 推广登录
      
      //   this.$store.dispatch('loginByMerchant', para).then((res) => {
          
      //     if (res.data.status === 1) {
      //       if (window._czc) {
              
      //         window._czc.push(['_trackEvent', '登录', '登录推广按钮','' ,'' , '']);//其中灰色的为选填项
      //       }
      //       this.warn = false
      //       window.location.href = this.HTTPLOCAT + '/promoteApp.html'
      //     } else if (push[res.data.status]) {
      //       this.loginLoading = false
      //       this.loginwarn = push[res.data.status]
      //       this.warn = true
      //     } else {
      //       this.loginLoading = false
      //       this.loginwarn = "未知的错误，请联系管理员"
      //       this.warn = true
      //     }


      //   }).catch((res) => {
      //     this.loginLoading = false
      //     console.log(res)
      //   })
      // }
    },
    IsEquipment () {
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        //安卓手机
        return 'Android'
      } else if (u.indexOf('iPhone') > -1) {
        //苹果手机
        return 'Ios'
      } else {
        //winphone手机
        return 'PC'
      }
    },

    getfocus (el) {
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;//android终端
      // alert('android'+isAndroid)
      if (!isAndroid) { // android统一处理，不影响ios的自身处理
        // 兼容Android 键盘弹起时，把确认订单弹窗顶上去影响布局
        const h = document.getElementById('login-box').scrollHeight  // 用onresize事件监控窗口或框架被调整大小，先把一开始的高度记录下来
        window.onresize = function () { // 如果当前窗口小于一开始记录的窗口高度，那就让当前窗口等于一开始窗口的高度
          if (document.body.scrollHeight < h) {
            document.body.style.height = h
          }
        }
      }
      if (el === 1) {
        this.userfocus = 'blue'



      } else if (el === 2) {
        this.passfocus = 'blue'

      }
    },
    losefocus (el) {

      if (el === 1) {
        var reg = new RegExp(/^[a-zA-Z][a-zA-Z0-9]{3,15}$/)
        if (reg.test(this.username) || this.username === '') {
          this.loginwarn = ""
          this.warn = false
        } else {
          this.loginwarn = "用户名格式不正确"
          this.warn = true
        }
        this.userfocus = ''
      } else if (el === 2) {
        if ((this.password.length < 6 && this.password.length !== 0) || this.password.length > 32) {
          this.loginwarn = "密码格式不正确"
          this.warn = true;
        } else {
          this.loginwarn = ""
          this.warn = false
        }
        this.passfocus = ''
      }
    },
    eyeclick () {

      if (this.eyeinput === 'password') {
        this.eyeinput = 'text'
        this.eyes = 'login-eyeon'
      } else {
        this.eyeinput = 'password'
        this.eyes = 'login-eyeoff'
      }
    },
    toback () {
      back('#ffffff')
      // window.location.href = `qtkjshop://background?color=#09b9fe`
    },
    // toback2() {
    //     window.location.href = `qtkjshop://background?color=#00A7FC`
    // },

    toforget () {

      // if (this.choosetype === 1) {
        if (window._czc) {
          window._czc.push(['_trackEvent', '登录', '忘记商户密码','' ,'' , '']);//其中灰色的为选填项
        }
        this.$router.push({ path: '/forgetpassword', query: { choosetype: '1' } })
      // } else if (this.choosetype === 2) {
      //   if (window._czc) {
      //     // eslint-disable-next-line no-sparse-arrays
      //     window._czc.push(['_trackEvent', '登录', '忘记推广密码','' ,'' , '']);//其中灰色的为选填项
      //   }
      //   this.$router.push({ path: '/forgetpassword', query: { choosetype: '2' } })
      // }

    },
    updateApp (an, ping, updata, content) {
      console.log(content)
      let myDate = new Date();
      if (updata === 1) { //强更
        if (process.env.VUE_APP_FLAG === 'pro') {
          //production 生产环境
          appUpdate(an, ping, updata, 'http://download.shengqianxiong8.com/app2-release.apk', content, false)
        } else {
          if (this.local.$getLocalStorageByName('appUpdate') != myDate.getDate()) {
            if (process.env.NODE_ENV == 'development') { // 本地
              // host = Config.devhost
              appUpdate(an, ping, 0, 'http://download.shengqianxiong8.com/app2-release.apk', content, false)
            } else if (process.env.VUE_APP_FLAG === 'sit') {
              //test 预发布
              appUpdate(an, ping, 0, 'http://download.shengqianxiong8.com/app2-release.apk', content, false)

            } else if (process.env.VUE_APP_FLAG === 'test') {
              //test 测试
              appUpdate(an, ping, 0, 'http://download.shengqianxiong8.com/app2-release.apk', content, false)

            }

          }
          this.local.$setLocalStorageByName('appUpdate', myDate.getDate())
        }
      } else {
        if (this.local.$getLocalStorageByName('appUpdate') != myDate.getDate()) {

          if (process.env.NODE_ENV == 'development') { // 本地
            // host = Config.devhost
            appUpdate(an, ping, updata, 'http://download.shengqianxiong8.com/app2-release.apk', content, false)
          } else if (process.env.NODE_ENV == 'production') {
            if (process.env.VUE_APP_FLAG === 'pro') {
              //production 生产环境
              appUpdate(an, ping, updata, 'http://download.shengqianxiong8.com/app2-release.apk', content, false)
            } else if (process.env.VUE_APP_FLAG === 'sit') {
              //test 预发布
              appUpdate(an, ping, updata, 'http://download.shengqianxiong8.com/app2-release.apk', content, false)

            } else if (process.env.VUE_APP_FLAG === 'test') {
              //test 测试
              appUpdate(an, ping, updata, 'http://download.shengqianxiong8.com/app2-release.apk', content, false)

            }
          }
        }
        this.local.$setLocalStorageByName('appUpdate', myDate.getDate())
      }

    }
  },

  computed: {
    disabled: function () { // 账号密码都不为空时可以点击登录
      if (this.username && this.password) {
        return true
      } else {
        return false
      }
    },


  },
  mounted () {

    console.log("%c  蔡 蔡 蔡", "color:red;font-size:30px;font-weight:bolder;padding:50px 420px;line-height:10px;background:url('http://img.zcool.cn/community/0127c0577e00620000012e7e12da0e.gif') repeat-x;background-size:contain;")
    const loading = document.getElementById('preloadingAnimation')
    if (loading != null) {
      document.body.removeChild(loading)

    }
    inputup('.anzhuotop', '.login-all')
    this.toback()
    let an = '1.0.6'
    let ping = '1.0.6'
    let updata = 0
    let content = '1、新增电子合同功能。\n'
    //  +
      // '2、语音播报优化\n' +
      // '3、营业时间可按月份、星期、时段设置'
    let token = this.local.$getLocalStorageByName('token')
    if (token) { // 确定是否有Token
      /* 有Token */
      this.updateApp(an, ping, updata, content)
      let choosetype = this.local.$getLocalStorageByName('choosetype')
      if (choosetype == 1) {
        window.location.href = this.HTTPLOCAT + '/shopApp.html'
      } else if (choosetype == 2) {
        window.location.href = this.HTTPLOCAT + '/promoteApp.html'
      }
    } else {
      loginFirst()
      this.updateApp(an, ping, updata, content, false)
      /* has no token */
      // 如果是免登陆的页面则直接进入，否则跳转到登录页面
      console.log('请重新登录')
      // window.location.reload()
    }


    if (process.env.NODE_ENV == 'development') { // 本地
      // host = Config.devhost
      this.envir = 'development'
      // host = "http://192.168.0.116:8080/"
    } else if (process.env.NODE_ENV == 'production') {
      if (process.env.VUE_APP_FLAG === 'pro') {
        //production 生产环境
        this.envir = 'pro'
        // host = Config.prohost
      } else if (process.env.VUE_APP_FLAG === 'sit') {
        //test 预发布
        this.envir = 'sit'
        // host = Config.sithost

      } else if (process.env.VUE_APP_FLAG === 'test') {
        //test 测试
        this.envir = 'test'
        // host = Config.testhost

      }
    }






  },
  beforeDestroy () {
    inputup2('.anzhuotop', '.login-all')
  }

}
</script>
<style scoped lang="scss">
.login-all {
  width: 100%;
  height: 100%;
  max-height: 100%;
  background: #fff;
  // background: rgba(9, 185, 254, 1);
  /*background: linear-gradient(123deg, rgba(9, 185, 254, 1) 0%, rgba(9, 109, 227, 1) 100%);*/
  // background: linear-gradient(to bottom, rgba(9, 185, 254, 1) 0%, rgba(9, 109, 227, 1) 100%);
  padding: 0 38px;
  position: relative;
  .logoindex {
    width: 190px;
    margin: 0 22px;
    display: inherit;
    position: relative;
    .loginindex-img {
      width: 114px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.logo-bottom {
  margin-top: 15px;
  font-size: 16px;
  letter-spacing: 1px;
  color: #999;
  text-align: center;
}

.login-choose {
  width: 100%;
  height: 60px;
  margin-top: 45px;
  position: relative;
  color: #fff;

  .btn1 {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 8px 0px 0px 0px;
    z-index: 100;
  }

  .btn2 {
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0px 8px 0px 0px;
    z-index: 100;
  }

  .btn1.white {
    width: 52%;
    color: #333;
    background: #fff;
    /*width: 100%; //待删*/
    /*background:rgba(242,248,252,1); // 待删*/

    border-radius: 8px 8px 0px 0px;
    z-index: 101;
  }

  .btn2.white {
    width: 52%;
    color: #333;
    background: #fff;
    border-radius: 8px 8px 0px 0px;
    z-index: 101;
  }

  p {
    margin-bottom: 5px;
  }
}

.loginbtn {
  width: 50%;
  height: 60px;
  font-size: 16px;
  line-height: 33px;
  background: #2a58cc;

  text-align: center;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  /*padding-left: 22px; // 待删*/
  div {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    margin-bottom: 5px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    margin-bottom: 5px;
  }
}

/*   .login-onoff {
       width: 127.5px;
       height: 36px;
       -webkit-border-radius: 20px;
       -moz-border-radius: 20px;
       border-radius: 21px;
       background: #0088FD;
       background: -webkit-linear-gradient(to right, #00A7FC, #0088FD);
       background: -moz-linear-gradient(to right, #00A7FC, #0088FD);
       background: linear-gradient(to right, #00A7FC, #0088FD);
       border: none;
       position: absolute;

   }

   .login-on {
       left: 0;
   }

   .login-off {
       left: 50%;
   }*/

.login-warn {
  font-size: 12px;
  color: #e9372f;
  letter-spacing: 1px;
  display: flex;
}

.login-warn-img {
  width: 18px;
  height: 18px;
  margin-right: 10px;

  svg {
    width: 100%;
    height: 100%;
  }
}

input {
  border: none;
}

.login-content {
  background: #fff;
  border-radius: 8px;
  position: relative;

  z-index: 102;
  border: 1px solid #ffffff;
  padding: 50px 20px;
}
.login-content2 {
  width: 92%;
  height: 100px;
  background: rgba(255, 255, 255, 0.25);
  position: absolute;
  bottom: 0px;
  left: 4%;
  z-index: 101;
  border-radius: 8px;
}
.login-content3 {
  width: 84%;
  height: 100px;
  background: rgba(255, 255, 255, 0.1);
  position: absolute;
  bottom: -9px;
  left: 8%;
  z-index: 100;
  border-radius: 8px;
}

input::-webkit-input-placeholder {
  color: #ccc;
}

.username,
.password {
  width: 80%;
  font-size: 13px;
  line-height: 30px;
  padding-left: 11px;
  padding-top: 3px;
}

.login-input {
  width: 100%;
  margin-bottom: 15px;
  border-bottom: 1px solid #f6f6f6;
  position: relative;
  display: flex;
  align-items: center;
  svg {
    width: 18px;
    height: 18px;
  }
}

.blue {
  border-bottom: 1px solid #0088fd;
}

.login-pass {
  width: 100%;
  margin-top: 19px;
  border-bottom: 1px solid #0088fd;
  padding-bottom: 15px;
}

.login-input-img {
  width: 18px;
  height: 18px;

  img {
    width: 100%;
    height: 100%;
  }
}

.login-eye {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);

  img {
    width: 100%;
    height: 100%;
  }
}

.van-button {
  height: 44px;
  font-size: 14px;
  line-height: 44px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  margin-top: 15px;
  background: #0088fd;
  background: -webkit-linear-gradient(to right, #00a7fc, #0088fd);
  background: -moz-linear-gradient(to right, #00a7fc, #0088fd);
  background: linear-gradient(to right, #00a7fc, #0088fd);
  border: none;
}

.login-forget {
  text-align: right;
  color: #999;
  font-size: 12px;
  margin-top: 20px;
}

.homelogo {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  img {
    width: 100%;
  }
}
.envirclass {
  margin-left: 65%;
  font-size: 12px;
  color: #2a58cc;
}
.login-bottom {
  font-size: 13px;
  color: #999;
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}
</style>
