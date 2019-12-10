<template>
  <div>
    <!--<div>{{createFirst.name}}</div>-->
    <!--//同城-->
    <div v-if="createFirst.charactar==3">
    <van-cell-group style="margin-top: 10px;">
      <van-field
        type="text"
        label="角色"
        :value="typename"
        required
        disabled

      />
    </van-cell-group>
    <van-cell-group style="margin-top: 10px;">
      <van-field
        type="text"
        label="账号"
        placeholder="请输入账号"
        v-model="createFirst.userName"
        required

        :error-message="usererror"
        @blur="localuser"
      />
      <div class="createnote"><p>6-16位字符，可以使用字母和数字，需要以字母开头</p></div>
      <van-field
        type="tel"
        label="手机号"
        v-model="createFirst.phone"
        placeholder="请输入手机号"
        required
        name="phone"
        v-validate="'required|length:11'"
        :error-message="errors.first('phone')"
      />
      <van-field
              center
              clearable
              label="验证码"
              v-if="createFirst.phone==createFirst.oldphone"
              value="该手机号已验证"
              required
              readonly
      >
      </van-field>
      <van-field
        center
        clearable
        label="验证码"
        v-else
        v-model="createFirst.verifyCode"
        placeholder="请输入短信验证码"
        required
        name="verifyCode"
        v-validate="'required|length:6'"
        :error-message="errors.first('verifyCode')"
      >
        <van-button slot="button" v-show="sendAuthCode" size="small" type="primary" :loading="codeLoading" loading-text="发送中..." @click="getnote">发送验证码</van-button>
        <van-button slot="button" v-show="!sendAuthCode" size="small" type="primary" class="noteclick">{{auth_time}}s</van-button>
      </van-field>
    </van-cell-group>
    <van-cell-group style="margin-top: 10px;">
      <van-field
        type="text"
        label="邮箱"
        placeholder="请输入邮箱"
        v-model="createFirst.shopInfo.invoiceEmail"


      />
      <!--<van-field-->
        <!--type="textarea"-->
        <!--label="备注"-->
        <!--placeholder="请填写备注"-->
        <!--v-model="createFirst.remarks"-->
      <!--/>-->
      <!--<p class="newfont">{{newfont}}/200</p>-->
    </van-cell-group>
    </div>
    <!--//种子特色-->
    <div v-if="createFirst.charactar==2">
      <van-cell-group style="margin-top: 10px;">
        <van-field
          type="text"
          label="角色"
          :value="typename"
          required
          disabled
        />
      </van-cell-group>
      <van-cell-group style="margin-top: 10px;">
        <van-field
          type="text"
          label="账号"
          placeholder="请输入账号"
          v-model="createFirst.userName"
          required
          :error-message="usererror"
          @blur="storeuser"
        />
        <div class="createnote"><p>6-16位字符，可以使用字母和数字，需要以字母开头</p></div>
        <van-field
          type="tel"
          label="手机号"
          v-model="createFirst.phone"
          placeholder="请输入手机号"
          required
          @blur="storephone"
          :error-message="phoneerror"
        />
        <van-field
                center
                clearable
                label="验证码"
                v-if="createFirst.phone==createFirst.oldphone"

                value="该手机号已验证"
                required
                readonly
        >
        </van-field>
        <van-field
          center
          clearable
          label="验证码"
          v-else
          v-model="createFirst.verifyCode"
          placeholder="请输入短信验证码"
          required
        >
          <van-button slot="button" v-show="sendAuthCode" size="small" type="primary" @click="getnote">发送验证码</van-button>
          <van-button slot="button" v-show="!sendAuthCode" size="small" type="primary" class="noteclick">{{auth_time}}s</van-button>
        </van-field>
      </van-cell-group>
      <van-cell-group style="margin-top: 10px;">
        <van-field
          type="text"
          label="邮箱"
          placeholder="请输入邮箱"
          v-model="createFirst.email"

        />
        <!--<van-field-->
          <!--type="textarea"-->
          <!--label="备注"-->
          <!--placeholder="请填写备注"-->
          <!--v-model="createFirst.remarks"-->
        <!--/>-->
        <!--<p class="newfont">{{newfont}}/200</p>-->
      </van-cell-group>
    </div>
    <!--//推广员合作商-->
    <div v-if="createFirst.charactar==1">
      <van-cell-group style="margin-top: 10px;">
        <van-field
          type="text"
          label="角色"
          :value="typename"
          required
          disabled
        />
      </van-cell-group>
      <van-cell-group style="margin-top: 10px;">
        <van-field
          type="text"
          label="账号"
          placeholder="请输入账号"
          v-model="createFirst.username"
          required
          :error-message="usererror"
          @blur="togetheruser"
        />
        <div class="createnote"><p>6-16位字符，可以使用字母和数字，需要以字母开头</p></div>
        <van-field
          type="tel"
          label="手机号"
          v-model="createFirst.phone"
          placeholder="请输入手机号"
          required
          name="phone"
          v-validate="'required|emoji:11'"
          :error-message="errors.first('phone')"
        />
        <van-field
                center
                clearable
                label="验证码"
                v-if="createFirst.phone==createFirst.oldphone"

                value="该手机号已验证"
                required
                readonly
        >
        </van-field>
        <van-field
          center
          clearable
          label="验证码"
          v-else
          v-model="createFirst.verifyCode"
          placeholder="请输入短信验证码"
          required
        >
          <van-button slot="button" v-show="sendAuthCode" size="small" type="primary" :loading="codeLoading" loading-text="发送中..." @click="getnote">发送验证码</van-button>
          <van-button slot="button" v-show="!sendAuthCode" size="small" type="primary" class="noteclick">{{auth_time}}s</van-button>
          <!--<span  slot="button" v-show="!sendAuthCode" class="note noteclick"> <span class="auth_text_blue">{{auth_time}} </span>s</span>-->
        </van-field>

      </van-cell-group>
      <van-cell-group style="margin-top: 10px;">
        <van-field
          type="text"
          label="邮箱"
          placeholder="请输入邮箱"
          v-model="createFirst.email"

        />
        <!--name="email"-->
        <!--v-validate="'emoji|required|email'"-->
        <!--:error-message="errors.first('email')"-->

        <!--<van-field-->
          <!--type="textarea"-->
          <!--label="备注"-->
          <!--placeholder="请填写备注"-->
          <!--v-model="createFirst.remarks"-->
        <!--/>-->
        <!--<p class="newfont">{{newfont}}/200</p>-->
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import {emojiDelete} from "@utils";
  export default {
    props: [
      'createFirst'
    ],
    data () {
      return {
        type:'',
        typename:'',
        newfont: 0,
        beizhu: '',
        usererror:'',
        phoneerror:'',
        sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 0, /* 倒计时 计数器 */
        timer: null,
        codeLoading: false
      }
    },
    methods: {
      getnote () {
        if (this.createFirst.phone.length !== 11) {
        this.$toast('请输入正确的手机号')
        } else {
          if(this.phoneerror!=''){  //如果手机号已存在
            this.$toast('请输入正确的手机号')
          }else{

            this.auth_time = 60
            let para={
              phone:this.createFirst.phone
            }
            this.codeLoading = true;
            if(this.createFirst.charactar==3){
              this.Api.localMsg(para).then(res => {
                if (res.data && res.data.status === 1) {
                  this.timeInterval()
                }
                this.codeLoading = false
              }).catch(error => {
                console.log(error)
                this.codeLoading = false
              })
            }else if(this.createFirst.charactar==2){

              this.Api.loginByStoreMsg(para).then(res => {
                if (res.data && res.data.status === 1) {
                  this.timeInterval()
                }
                this.codeLoading = false
              }).catch(error => {
                console.log(error)
                this.codeLoading = false
              })
            }else{
              this.Api.localMsg(para).then(res => {
                if (res.data && res.data.status === 1) {
                  this.timeInterval()
                }
                this.codeLoading = false
              }).catch(error => {
                console.log(error)
                this.codeLoading = false
              })
            }

          }


        }
      },
      timeInterval(){
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
      storeuser(){
        this.createFirst.userName=emojiDelete(this.createFirst.userName)
        var reg = new RegExp(/^[a-zA-Z][a-zA-Z0-9]{5,15}$/)
        // this.createFirst.userName.length<12
        if(reg.test(this.createFirst.userName) == true){
          this.usererror=''
          let para={
            userName:this.createFirst.userName
          }
          this.Api.storeUser(para).then(res => {
            if(res.data.status==10603){
              this.usererror=''
            }else if(res.data.status==1){
              this.usererror='账号已存在'
            }
          }).catch(error => {
            console.log(error)
          })
        }else{
          this.usererror='格式错误'
        }

      },
      storephone(){
        if(this.createFirst.phone.length==11){
          this.phoneerror=''
        /*  let para={
            phone:this.createFirst.phone
          }
          this.Api.storeIdcard(para).then(res => {
            if(res.data.data.length>0){
              this.phoneerror='手机号已存在'
            }else{
              this.phoneerror=''
            }
          }).catch(error => {
            console.log(error)
          })*/
        }else{
          this.phoneerror='手机号格式不正确'
        }
      },
      togetheruser(){
        var reg = new RegExp(/^[a-zA-Z][a-zA-Z0-9]{5,15}$/)
        if(reg.test(this.createFirst.username) == true){
          this.usererror=''
          let para={
            username:this.createFirst.username
          }
          this.Api.togetherUser(para).then(res => {
            if(res.data.data==0){
              this.usererror=''
            }else if(res.data.data==1){
              this.usererror='账号已存在'
            }
          }).catch(error => {
            console.log(error)
          })
        }else{
          this.usererror='格式错误'
        }

      },
      localuser(){
        var reg = new RegExp(/^[a-zA-Z][a-zA-Z0-9]{5,15}$/)
        // this.createFirst.userName.length<12
        if(reg.test(this.createFirst.userName) == true){
        let para={
          userName:this.createFirst.userName
        }
        this.Api.localUser(para).then(res => {
          // if(res.data.status=='10603'){
          //   this.usererror=''
          // }else if
          if(res.data.status=='1'){
            this.usererror=''
          }else{
            this.usererror='账号已存在'
          }
        }).catch(error => {
          console.log(error)
        })
        }else{
          this.usererror='格式错误'
        }
      }
    },

    watch: {

    },
    mounted(){
      if(this.$route.name=="AddTogether"){
        this.type=2
        this.typename='合作商'
      }else if(this.$route.name=="AddPopularize"){
        this.type=3
        this.typename='推广员'

        // this.createFirst.id?this.oldphone=this.createFirst.phone:''
      }else if(this.$route.name=="AddSeed"&&this.$route.query.list=='4'){
        this.type=4
        this.typename='种子店'
      }else if(this.$route.name=="AddSeed"&&this.$route.query.list=='5'){
        this.type=5
        this.typename='特色店'
      }else if(this.$route.name=="AddLocal"){
        this.type=6
        this.typename='同城企业'
      }
    },
  }
</script>

<style scoped>
  .van-button--small{
    background: none;
    /*color: #009AFC;*/
    border: none;
  }
  .van-button--large{
    width: 339px;
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    margin: 15px 0 15px 18px;
    background: #0088FD;
    background: -webkit-linear-gradient(to right,#00A7FC, #0088FD);
    background: -moz-linear-gradient(to right,#00A7FC, #0088FD);
    background: linear-gradient(to right,#00A7FC, #0088FD);
    border:none
  }
  .note{
    height: 30px;
    border: 1px solid #0088FD;
    font-size: 14px;
    line-height: 30px;
    background: #0088FD;
    color: #FFFFFF;
    padding: 0 5px;
    position: absolute;
    right: 5px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  .noteclick{
    color: #999;
    background: none !important;
    border: none !important;
  }
  .createnote{
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #f5f5f9;

    float: right;
  }
  .createnote /deep/ p{
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    float: right;
    margin-right: 20px;
    color: #666666;
  }
</style>
