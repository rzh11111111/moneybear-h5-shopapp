<template>
<div class="rightmap">
  <top-column :top-header="topheader"></top-column>
  <van-cell-group>
    <!--<van-cell title="账号信息" is-link @click="account.onoff=!account.onoff;topheader.name='账号信息'" />-->
    <!--<van-cell title="资料信息" is-link value="内容" />-->
    <!--<van-cell title="费率和合同" is-link @click="rate.onoff=!rate.onoff;topheader.name='费率和合同'"/>-->
    <van-cell title="账号与安全" is-link value=" " @click="account.onoff=!account.onoff;topheader.name='账号与安全'" />
  </van-cell-group>

  <van-cell-group>
    <!--<van-cell title="账号信息" is-link @click="account.onoff=!account.onoff;topheader.name='账号信息'" />-->
    <!--<van-cell title="资料信息" is-link value="内容" />-->
    <!--<van-cell title="费率和合同" is-link @click="rate.onoff=!rate.onoff;topheader.name='费率和合同'"/>-->
    <van-cell title="版本号" is-link value="V1.0.6" @click="clickrank" />
    <van-cell title="联系我们" is-link value=" " @click="touch.onoff=!touch.onoff;topheader.name='联系我们'" />
  </van-cell-group>
  <van-button size="large"  @click="exit">退出登录</van-button>
  <van-popup
    v-model="account.onoff"
    position="right"
    :overlay=false
  >
    <div class="rightmap">
      <header class="heade">

      </header>
      <van-cell-group>
        <!--<van-cell title="账号信息" is-link @click="account.onoff=!account.onoff;topheader.name='账号信息'" />-->
        <!--<van-cell title="资料信息" is-link value="内容" />-->
        <!--<van-cell title="费率和合同" is-link @click="rate.onoff=!rate.onoff;topheader.name='费率和合同'"/>-->
        <van-cell title="修改密码" is-link value=" " @click="change.password.onoff=!change.password.onoff;topheader.name='修改密码'" />
        <van-cell title="换绑手机号" is-link :value="change.password.phone?change.password.phone:' '" @click="change.phone.onoff=!change.phone.onoff;topheader.name='换绑手机号'" />
        <van-cell title="修改邮箱" is-link :value="store.email?store.email:' '" @click="change.email.onoff=!change.email.onoff;topheader.name='修改邮箱'" />
      </van-cell-group>


    </div>
  </van-popup>

  <van-popup
    v-model="change.password.onoff"
    position="right"
    :overlay=false
  >
    <div class="rightmap">
      <header class="heade">

      </header>
      <form @submit.prevent="changepassword('changePassword')" data-vv-scope="changePassword">
        <van-cell-group>
          <van-field
            :value="store.username"
            clearable
            label="登录名"
            disabled
            class="emailtitle"
          />
        </van-cell-group>
        <div class="note">验证码将发送至手机号{{change.password.phone}}</div>
        <van-cell-group>
          <van-field
            type="number"
            label="验证码"
            v-model="change.password.code"
            data-vv-name="pwdcode"
            v-validate="'required:验证码'"
            placeholder="请输入短信验证码"
          >
            <van-button slot="button" v-show="pwdcodeBtn.sendAuthCode" :loading="pwdcodeBtn.loading" size="small" type="primary" @click="getnote('1')" :disabled="!change.password.phone">发送验证码</van-button>
            <van-button slot="button" v-show="!pwdcodeBtn.sendAuthCode" size="small" type="primary" class="noteclick">{{pwdcodeBtn.auth_time}}s</van-button>
          </van-field>
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="change.password.newpassword"
            clearable
            label="新密码"
            type="password"
            placeholder="请输入新密码"
            :maxlength="32"
            data-vv-name="newpassword"
            v-validate="'required:新密码|password'"
            ref="confirmation"
            class="emailtitle"
          />
          <van-field
            center
            clearable
            label="确认密码"
            type="password"
            v-model="change.password.secondpassword"
            data-vv-name="renewpassword"
            v-validate="'required:确认密码|confirmed:confirmation,新密码,确认密码'"
            placeholder="请确认密码"
          >
          </van-field>
        </van-cell-group>
        <div :class="'note' + (errors.has('changePassword.newpassword') ? ' error-tips' : '')">密码格式：6~32个字符，数字、字母、特殊符号( . _ - @ )至少两种组合</div>
        <div v-if="errors.has('changePassword.pwdcode') || errors.has('changePassword.renewpassword')" class="error-tips" style="padding: 0 15px;">{{errors.first('changePassword.pwdcode') || errors.first('changePassword.renewpassword')}}</div>
          <van-button size="large" type="submit">确认修改</van-button>
      </form>
    </div>
  </van-popup>
  <van-popup
    v-model="change.phone.onoff"
    position="right"
    :overlay=false
  >
    <div class="rightmap">
      <header class="heade">

      </header>
      <form @submit.prevent="changephone('changePhone')" data-vv-scope="changePhone">

        <van-cell-group>
          <van-field
            v-model="change.phone.password"
            clearable
            type="password"
            label="密码"
            placeholder="请输入登录密码"
            data-vv-name="ppassword"
            v-validate="'required:登录密码|password'"
            class="emailtitle"
          />
        </van-cell-group>
        <van-cell-group>

          <van-field
            v-model="change.phone.phone"
            clearable
            label="新手机号"
            placeholder="请输入新手机号"
            class="emailtitle"
            data-vv-name="pphone"
            v-validate="'required:手机号|mobile'"
          />
          <van-field
            type="number"
            label="验证码"
            v-model="change.phone.code"
            data-vv-name="pcode"
            v-validate="'required:短信验证码'"
            placeholder="请输入短信验证码"
          >
            <van-button slot="button" v-show="codeBtn.sendAuthCode" size="small" :loading="codeBtn.loading" type="primary" @click.prevent="getnote('2')" :disabled="!change.phone.phone || change.phone.phone.length != 11">发送验证码</van-button>
            <van-button slot="button" v-show="!codeBtn.sendAuthCode" size="small" type="primary" class="noteclick">{{codeBtn.auth_time}}s</van-button>
            <!--<span  slot="button" v-show="!sendAuthCode" class="note noteclick"> <span class="auth_text_blue">{{auth_time}} </span>s</span>-->
          </van-field>
        </van-cell-group>
        <div v-if="errors.has('changePhone.ppassword') || errors.has('changePhone.pphone') || errors.has('changePhone.pcode')" class="error-tips" style="padding: 10px 15px 0;">{{errors.first('changePhone.ppassword') || errors.first('changePhone.pphone') || errors.first('changePhone.pcode')}}</div>
        <van-button size="large" type="submit">确认修改</van-button>
      </form>


    </div>
  </van-popup>
  <van-popup
    v-model="change.email.onoff"
    position="right"
    :overlay=false
  >
    <div class="rightmap" data-vv-scope="changeEmail">
      <header class="heade">

      </header>
      <form @submit.prevent="changeemail('changeEmail')" data-vv-scope="changeEmail">

        <van-cell-group>

          <van-field
            v-model="change.email.email"
            clearable
            label="邮箱"
            placeholder="请输入邮箱"
            data-vv-name="eemail"
            v-validate="'required:邮箱|email'"
            class="emailtitle"
          />
        </van-cell-group>
        <div v-if="errors.has('changeEmail.eemail')" class="error-tips" style="padding: 10px 15px 0;">{{errors.first('changeEmail.eemail')}}</div>
        <van-button size="large"  v-if="change.email.email" type="submit">确认修改</van-button>
        <van-button size="large" disabled v-if="!change.email.email">确认修改</van-button>
      </form>

    </div>
  </van-popup>
  <van-popup
    v-model="touch.onoff"
    position="right"
    :overlay=false
  >
    <div class="rightmap">
      <header class="heade">

      </header>

      <div>
        <div  class="touchlogo">
        <img src="@/assets/img/LOGO.png">
        </div>
        <div class="touchcontent">
          <p class="touchtitle">
            公司名称
            <span class="touchvalue">浙江钱兔网络科技有限公司</span>
          </p>
          <p class="touchtitle">
            联系电话
            <span class="touchvalue">400-520-186</span>
          </p>
          <p class="touchtitle">
            办公地址
            <span class="touchvalue">浙江杭州市萧山区望京商务中心3幢3单元2502室</span>
          </p>
        </div>
      </div>

    </div>
  </van-popup>
</div>
</template>

<script>
  import {phonestar,exitvoice} from '@/utils'
  let changeObj = {
        password:{
          onoff:false,
          phone:'',
          code:'',
          newpassword:'',
          secondpassword:''
        },
        phone:{
          onoff:false,

          password:'',
          phone:'',
          code:''
        },
        email:{
          onoff:false,
          email:''
        }
      };
export default {
  name: 'set',
  data () {
    return {
      topheader: {
        name: '设置',
        left: '3',
        heade: 'header1'
      },
      store:'',
      type:'',
      pwdcodeBtn: {
        sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 0, /* 倒计时 计数器 */
        timer: null,
        loading: false,
      },
      codeBtn: {
        sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 0, /* 倒计时 计数器 */
        timer: null,
        loading: false,
      },
      touch:{
        onoff:false
      },
      account:{
        onoff:false
      },
      change: Object.assign({}, changeObj)
    }
  },
  components:{
  },
  methods:{

    goback () {
      if (this.touch.onoff) {
        this.touch.onoff = !this.touch.onoff
        this.topheader.name = '设置'
      } else if (this.change.email.onoff) {
        this.change.email.onoff = !this.change.email.onoff
        this.topheader.name = '账号与安全'
      } else if (this.change.password.onoff) {
        this.change.password.onoff = !this.change.password.onoff
        this.topheader.name = '账号与安全'
      }else if (this.change.phone.onoff) {
        this.change.phone.onoff = !this.change.phone.onoff
        this.topheader.name = '账号与安全'
      } else if (this.account.onoff) {
        this.account.onoff = !this.account.onoff
        this.topheader.name = '设置'
      } else if (this.steps == 2) {
        this.steps = 1
        this.topheader.name = '设置'
      } else if (this.steps == 3) {
        this.steps = 2
        this.topheader.name = '上传合同照片'
      }else {
        this.$router.go(-1)
      }
    },
    getnote (msg) {  //获取验证码
      if(msg=='1'){
        let para={
          phone:this.store.phone
        } 
        this.Api.loginShopByStoreMsg(para).then(res => {
          if (res.data.status == 1) {
            this.timeInterval(this.pwdcodeBtn);
          }
          this.pwdcodeBtn.loading = false
        }).catch(() => {
          this.pwdcodeBtn.loading = false
        })
      }else{
        let para={
          phone:this.change.phone.phone
        }
        this.Api.sendCodePhone(para).then(res => {
          if (res.data.status == 1) {
            this.timeInterval(this.codeBtn);
          }
          this.codeBtn.loading = false
        }).catch(() => {
          this.codeBtn.loading = false
        })
      }

    },
    timeInterval(obj){
      obj.loading = false;
      obj.sendAuthCode = false
      obj.auth_time = 60
      clearInterval(obj.timer);
      obj.timer = setInterval(() => {
        obj.auth_time--
        if (obj.auth_time <= 0) {
          obj.sendAuthCode = true
          clearInterval(obj.timer)
        }
      }, 1000)

    },
    changepassword(scope){
      let para={
          phone:this.store.phone,
          username: this.store.username,
          password: this.change.password.newpassword,
          verifyCode: this.change.password.code

      }
      this.$validator.validateAll(scope).then(valid => {
        if (valid) {
          this.Api.changeTogetherPassword(para).then(res => {
            switch (res.data.status) {
              case 1:
                this.$toast('修改成功');
                this.getdata()
                this.goback()
                break
              default:
            }

          })
        }else{
          this.$toast('请填写正确');
        }
      });
      // if(this.change.password.newpassword!=this.change.password.secondpassword){
      //   console.log('2次不一致')
      // }else if(this.change.password.code==''){
      //   console.log('请输入验证码')
      // }else if(this.change.password.newpassword==''){
      //   console.log('请输入密码')
      // }else{
      //   this.Api.changeTogetherPassword(para).then(res => {
      //     console.log(res.data)
      //     switch (res.data.status) {
      //       case 1:
      //         this.$toast('修改成功');
      //         this.getdata()
      //         this.goback()
      //         break
      //       default:

      //     }


      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }

    },
    changephone(scope){
      let para={

        username: this.store.username,
          password: this.change.phone.password,
          phone:this.change.phone.phone,
          verifyCode: this.change.phone.code

      }
      if(!this.change.phone.code){
        return
      }
      this.$validator.validateAll(scope).then(valid => {
        console.log(valid)
        if (valid) {
          console.log(scope)
          this.Api.changeTogetherPhone(para).then(res => {
            console.log(res)
            if (res.data.status === 1) {
              this.$toast('修改成功');
              this.getdata()
              this.goback()
            }
          })
        }else{
          this.$toast('请填写正确');
        }
      });
      // if(this.change.phone.username == '') {
      //   console.log('请输入用户名')
      // }else if(this.change.phone.password==''){
      //   console.log('请输入密码')
      // }else if(this.change.phone.code==''){
      //   console.log('请输入验证码')
      // }else if(this.change.phone.phone==''){
      //   console.log('请输入手机')
      // }else{
      //   this.Api.changeTogetherPhone(para).then(res => {
      //     console.log(res.data)
      //   }).then(res=>{
      //     this.getdata()
      //     this.goback()
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }

    },
    clickrank(){
      this.$toast('已是最新版本');
    },
    changeemail(scope){
      let para={

          username: this.store.username,
          email:this.change.email.email

      }
      this.$validator.validateAll(scope).then(valid => {

        if (valid) {
          this.Api.changeTogetherEmail(para).then(res => {
            if (res.data.status === 1) {
              this.$toast('修改成功');
              this.getdata()
              this.goback()
            }
          })
        }else{
          this.$toast('请填写正确');
        }
      });
      // if(this.change.email.email==''){
      //   console.log('请输入邮箱')
      // }else {
      //   this.Api.changeTogetherEmail(para).then(res => {

      //     console.log(res.data)
      //   }).then(res=>{
      //     this.getdata()
      //     this.goback()
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }
    },
    exit(){
      this.$dialog.confirm({
        title: '是否退出登录'
      }).then(() => {
        let para={

        }
        this.Api.loginExit(para).then(() => {
         // this.local.$removeLocalStorageByName('token')
         //  this.local.$removeLocalStorageByName('accountType')
         //  this.local.$removeLocalStorageByName('accountName')
         //  this.local.$removeLocalStorageByName('code')
         //  this.local.$removeLocalStorageByName('id')
          exitvoice(sessionStorage.getItem('id'))
          localStorage.removeItem('token')
          localStorage.removeItem('accountType')
          localStorage.removeItem('accountName')
          localStorage.removeItem('code')
          localStorage.removeItem('id')
          sessionStorage.removeItem('accountType')
          sessionStorage.removeItem('accountName')
          sessionStorage.removeItem('code')
          sessionStorage.removeItem('id')
          window.location.href = this.HTTPLOCAT+'/index.html#/'
        })
      })
    },
    getdata(){
      this.change = Object.assign({}, changeObj);

      let para={}
    if(this.type==3){
      para.id=this.session.$getSessionStorageByName('id')
      this.Api.bossDetail(para).then(res => {
        this.store=res.data.data.merManager
        this.change.password.phone=phonestar(this.store.phone)
      })
    }else if(this.type==2){
      para.id=this.session.$getSessionStorageByName('id')
      this.Api.togetherDetail(para).then(res => {
        this.store = res.data.data
        this.change.password.phone=phonestar(this.store.phone)
      })
      }else if(this.type==1){
      para.id=this.session.$getSessionStorageByName('id')
      this.Api.popularizeDetail(para).then(res => {
        this.store=res.data.data
        this.change.password.phone=phonestar(this.store.phone)
      })
      }else if(this.type==0){
      let para2={
        storeAccountId:this.session.$getSessionStorageByName('id')
      }
      this.Api.masterDetail(para2).then(res => {
        this.store=res.data.data.storeAccount
      })
      }


    }
  },
  mounted () {
    this.type=this.session.$getSessionStorageByName('accountType')
    this.getdata()
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .emailtitle /deep/ .van-cell__title{
    /*max-width: none;*/
  }
  .van-cell /deep/ .van-cell__title{
    /*max-width: none;*/
  }
  .van-cell /deep/ .van-cell__value{
    text-align: right;
    display: block;

  }
  .van-cell /deep/ .rightvalue{
    color: #0095fd !important;
  }
  .van-cell /deep/ .rightcolor{
    color: #FF3232 ;
    font-weight: 800;
    font-size: 16px;
  }
  .van-cell /deep/ .leftcolor{
    color: #666;
    font-size: 14px;
  }
.touchlogo{
  width: 75px;
  height: 75px;
  margin-top: 94px;
  margin-left: 150px;
  img{
    width: 100%;
    height:100%;
  }
}
.touchcontent{
  margin-top: 141px;
  margin-left: 55px;
  margin-right: 55px;
  width: 265px;

}
  .touchtitle{
    font-size: 14px;
    color: #353535;
    font-weight: 700;
    display: flex;
    margin-top: 16px;
  }
  .touchvalue{
    width: 70%;
    display: block;
    color: #666;
    margin-left: 20px;
    font-weight: 400;
  }
  .van-button--large{
    width: 80%;
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin-top: 15px;
    background: #0088FD;
    color: #fff;
    margin-left: 10%;
    background: -webkit-linear-gradient(to right,#00A7FC, #0088FD);
    background: -moz-linear-gradient(to right,#00A7FC, #0088FD);
    background: linear-gradient(to right,#00A7FC, #0088FD);
    border:none
  }
  .noteclick{
    color: #999;
    background: none !important;
    border: none !important;
  }
  .note{
    color: #666;
    margin: 10px 15px;
    font-size: 12px;
  }
</style>
