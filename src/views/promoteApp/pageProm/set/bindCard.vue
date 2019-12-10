<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div>
      <van-cell-group>
        <van-cell title="账号信息">
          <van-radio-group
            v-model="myrank.type"
            style="display: flex;"
            v-if="myrank.bcRegisterType==2"
          >
            <van-radio name="1">对公账户</van-radio>
          </van-radio-group>
          <van-radio-group
            v-model="myrank.type"
            @change="choosetype"
            style="display: flex;"
            v-else-if="myrank.bcRegisterType==1"
          >
            <van-radio name="1">对公账户</van-radio>
            <van-radio name="2">个人账户</van-radio>
          </van-radio-group>
          <van-radio-group :value="myrank.type" style="display: flex;" v-else>
            <van-radio name="2">个人账户</van-radio>
          </van-radio-group>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="开户名称" :value="myrank.accountName">
          <van-icon slot="right-icon" name="info" class="custom-icon" @click="hint" />
        </van-cell>
        <van-field label="银行账号" v-model="myrank.bankNo" placeholder="请输入银行卡号" />
        <van-cell
          title="开户银行"
          :value="myrank.bankName"
          @click="bank.onoff1=!bank.onoff1;topheader.name='选择开户银行'"
          is-link
          placeholder="请选择开户银行"
        />

        <!--<van-field  label="开户银行" v-model="myrank.bankType" v-if="myrank.type=='1'"  placeholder="请输入开户银行" />-->

        <van-field
          label="开户支行"
          v-model="myrank.bankBranch"
          v-if="myrank.type=='1'"
          placeholder="请输入开户支行"
        />
      </van-cell-group>

      <van-cell-group>
        <van-field label="银行预留手机号" v-model="myrank.bankPhone" placeholder="请输入手机号" />
      </van-cell-group>
      <!--开户银行-->
      <van-popup v-model="bank.onoff1" position="right" :overlay="false">
        <div class="rightmap">
          <header class="heade"></header>
          <div>
            <ul class="banklist">
              <li
                class="banklist-li"
                :key="item.id"
                v-for="item in allbank"
                @click="choosebank(item.name)"
              >
                <div class="bankdiv">
                  <img v-if="item.id==0" src="@/assets/img/bank/gs.png" />
                  <img v-if="item.id==1" src="@/assets/img/bank/gd.png" />
                  <img v-if="item.id==2" src="@/assets/img/bank/gf.png" />
                  <img v-if="item.id==3" src="@/assets/img/bank/hz.png" />
                  <img v-if="item.id==4" src="@/assets/img/bank/hx.png" />
                  <img v-if="item.id==5" src="@/assets/img/bank/js.png" />
                  <img v-if="item.id==6" src="@/assets/img/bank/jt.png" />
                  <img v-if="item.id==7" src="@/assets/img/bank/ms.png" />
                  <img v-if="item.id==8" src="@/assets/img/bank/nb.png" />
                  <img v-if="item.id==9" src="@/assets/img/bank/ny.png" />
                  <img v-if="item.id==10" src="@/assets/img/bank/pa.png" />
                  <img v-if="item.id==11" src="@/assets/img/bank/pf.png" />
                  <img v-if="item.id==12" src="@/assets/img/bank/xy.png" />
                  <img v-if="item.id==13" src="@/assets/img/bank/yc.png" />
                  <img v-if="item.id==14" src="@/assets/img/bank/zs2.png" />
                  <img v-if="item.id==15" src="@/assets/img/bank/zs.png" />
                  <img v-if="item.id==16" src="@/assets/img/bank/zg.png" />
                </div>
                {{item.name}}
              </li>
            </ul>
          </div>
        </div>
      </van-popup>
      <van-popup v-model="myrank.onoff" position="right" :overlay="false">
        <div class="rightmap">
          <header class="heade"></header>
          <div>
            <p class="phonest">验证码将发送至手机号{{phones}}</p>
            <van-field
              center
              clearable
              label="验证码"
              v-model="myrank.verifyCode"
              placeholder="请输入短信验证码"
            >
              <van-button
                slot="button"
                v-show="sendAuthCode"
                size="small"
                type="primary"
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
            <van-button
              type="primary"
              size="large"
              @click="inputblur"
              class="submitbtn"
              v-if="steps==2"
            >确定</van-button>
          </div>
        </div>
      </van-popup>

      <van-popup v-model="result.win" position="right" :overlay="false">
        <div class="rightmap">
          <header class="heade"></header>
          <div class="result">
            <van-icon name="checked" color="#00A7FC" size="50px" />绑定成功
          </div>
        </div>
      </van-popup>
      <van-popup v-model="result.lose" position="right" :overlay="false">
        <div class="rightmap">
          <header class="heade"></header>
          <div class="result">
            <van-icon name="clear" color="#FF3232" size="50px" />失败
            <br />
            剩余{{result.chance}}次
          </div>
          <van-icon slot="right-icon" name="info" class="custom-icon" />失败原因为身份/证件信息有误时，请前往“详情-资料信息”页核对证照信息
        </div>
      </van-popup>
      <van-button
        type="primary"
        size="large"
        @click="inputblur"
        class="submitbtn"
        v-if="steps==1"
      >下一步</van-button>
    </div>
  </div>
</template>

<script>
import { phonestar } from '@/utils/'
export default {
  name: 'bindCard',
  data () {
    return {
      topheader: {
        name: '绑定银行账户',
        left: '3',
        right1: '',
        right4: '',
        heade: 'header1'
      },
      rankname: '',
      store: '',
      type: '',
      sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /* 倒计时 计数器 */
      steps: 1,
      result: {
        win: false,
        lose: false,
        chance: 0,
      },
      bank: {
        onoff1: false, //开户银行
      },
      allbank: [
        {
          name: '工商银行',
          id: 0
        }, {
          name: '光大银行',
          id: 1
        }, {
          name: '广发银行',
          id: 2
        }, {
          name: '杭州银行',
          id: 3
        }, {
          name: '华夏银行',
          id: 4
        }, {
          name: '建设银行',
          id: 5
        }, {
          name: '交通银行',
          id: 6
        }, {
          name: '民生银行',
          id: 7
        }, {
          name: '宁波银行',
          id: 8
        }, {
          name: '农业银行',
          id: 9
        }, {
          name: '平安银行',
          id: 10
        }, {
          name: '浦发银行',
          id: 11
        }, {
          name: '兴业银行',
          id: 12
        }, {
          name: '邮储银行',
          id: 13
        }, {
          name: '招商银行',
          id: 14
        }, {
          name: '浙商银行',
          id: 15
        }, {
          name: '中国银行',
          id: 16
        }
      ],
      myrank: {
        onoff: false,
        bcRegisterType: '',  //营业执照号类型
        type: "1",  //对公对私
        bankNo: '',  //银行卡号
        accountName: '',
        bankName: '',  //开户银行
        bankPermissopnCode: '',  //开户许可证
        idCard: '',
        bankBranch: '', //支行
        bankPhone: '',
        verifyCode: ''
      }
    }
  },
  components: {
  },
  methods: {
    goback () {
      if (this.result.win) {
        this.$router.go(-1)
      } else if (this.result.lose) {
        this.$router.go(-1)
      } else if (this.bank.onoff1) {  //开户银行
        this.bank.onoff1 = false
        this.topheader.name = '绑定银行账户'
      } else if (this.myrank.onoff) {
        this.myrank.onoff = !this.myrank.onoff
        this.topheader.name = '绑定银行账户'
        this.steps = 1
      } else {
        this.$router.go(-1)
      }
    },
    choosebank (msg) {
      this.myrank.bankName = msg
      this.bank.onoff1 = false
      this.topheader.name = '绑定银行账户'
    },
    inputblur () {
      if (this.steps == 1) {
        // const steps1=[this.myrank.bankNo,this.myrank.bankPhone]
        if (this.myrank.bankNo.length < 14 || this.myrank.bankNo.length > 22) {
          this.$toast('银行卡号不正确');
        } else if (this.myrank.bankPhone.length !== 11) {
          this.$toast('手机号不正确');
        } else if (!this.myrank.bankName) {
          this.$toast('请选择银行');
        } else {
          this.myrank.onoff = true
          this.steps = 2;
        }
      } else if (this.steps == 2) {
        if (this.myrank.verifyCode.length == 6) {
          console.log('请求')
          // this.result.win=true
          // this.topheader.name='绑定成功'
          // this.result.lose=true
          // this.topheader.name='绑定失败'
          let para
          // 对公对私
          if (this.myrank.type == 1) {
            para = {

              accountName: this.myrank.accountName,
              bankBranch: this.myrank.bankBranch,
              bankNo: this.myrank.bankNo,
              bankName: this.myrank.bankName,
              bankPhone: this.myrank.bankPhone,
              bankPermissopnCode: this.myrank.bankPermissopnCode,
            }
          } else {
            para = {
              accountName: this.myrank.accountName,
              bankNo: this.myrank.bankNo,
              bankName: this.myrank.bankName,
              bankPhone: this.myrank.bankPhone,
              idCard: this.myrank.idCard,
            }
          }
          // 是否店主
          if (this.type == 0) {
            para.shortMessage = this.myrank.verifyCode
            // if(this.$route.query.havecard){
            this.Api.saveStoreCard(para).then(res => {
              console.log(res)
              if (res.data.status == 1) {
                // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 2 } })
                this.$router.push({ path: '/ApplyResult', query: { result: '绑定成功' } })

              } else {
                // this.$toast(res.data.stateMessage)
                // this.$router.push({path: '/ApplyResult', query: {win:false,type:2,result:res.data.stateMessage}})
              }
            }).catch(error => {
              console.log(error)
            })
            // }
            /*    else{
                  this.Api.changeStoreCard(para).then(res => {
                    console.log(res)
                    if(res.data.status==17){
                      this.result.lose=true
                      this.topheader.name='绑定失败'
                    }else if (res.data.status==1){
                      this.result.win=true
                      this.topheader.name='绑定成功'
                    }else{
                      this.result.lose=true
                      this.topheader.name='绑定失败'
                    }
                  }).catch(error => {
                    console.log(error)
                  })
                }*/

          } else {
            para.verifyCode = this.myrank.verifyCode
            para.type = this.myrank.type
            // if(this.$route.query.havecard){
            this.Api.saveCard(para).then(res => {
              console.log(res)
              if (res.data.status == 1) {
                // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 2 } })
                this.$router.push({ path: '/ApplyResult', query: { result: '绑定成功' } })

              } else {
                this.$toast(res.data.stateMessage)
                // this.$router.push({path: '/ApplyResult', query: {win:false,type:2,result:res.data.stateMessage}})
              }
            }).catch(error => {
              console.log(error)
            })
            // }
            /*  else{
                this.Api.changeCard(para).then(res => {
                  console.log(res)
                  if(res.data.status==17){
                    this.result.lose=true
                    this.topheader.name='绑定失败'
                  }else if (res.data.status==1){
                    this.result.win=true
                    this.topheader.name='绑定成功'
                  }else{
                    this.result.lose=true
                    this.topheader.name='绑定失败'
                  }
                }).catch(error => {
                  console.log(error)
                })
              }*/

          }

        } else {
          this.$toast('验证码不正确');
        }
      }
    },
    hint () {
      if (this.type == 3 || this.type == 1 || this.type == 0) {
        this.$toast('开户名称为本人姓名');
      } else if (this.type == 2) {
        if (this.myrank.type == '1') {
          this.$toast('开户名称为营业执照名称');
        } else {
          this.$toast('开户名称为法人姓名');
        }
      }

    },

    getnote () {

      this.sendAuthCode = false
      this.auth_time = 60
      let auth_timetimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendAuthCode = true
          clearInterval(auth_timetimer)
        }
      }, 1000)
      this.getmsg()

    },
    getmsg () {
      // let para={
      //   phone:this.myrank.bankPhone
      // }
      /*let formdata=new FormData();
      formdata.set("phone",this.myrank.bankPhone);*/
      let para = {
        phone: this.myrank.bankPhone
      }
      if (this.type == 0) {
        this.Api.saveStoreCardmsg(para).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.Api.saveCardmsg(para).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      }

    },
    choosetype (msg) {
      if (msg == 1) {
        this.myrank.accountName = this.$route.query.store
        this.myrank.bankPermissopnCode = this.$route.query.code
      } else if (msg == '2') {
        this.myrank.accountName = this.$route.query.name
        this.myrank.idCard = this.$route.query.card
      }
    }


  },
  computed: {
    phones () {

      return phonestar(this.myrank.bankPhone)
    }

  },
  mounted () {
    this.type = sessionStorage.getItem('accountType')
    if (this.type == 3) {
      this.myrank.type = '2'
      this.myrank.accountName = this.$route.query.name
      this.myrank.idCard = this.$route.query.card
    } else if (this.type == 2) {
      this.myrank.bcRegisterType = this.$route.query.type
      // if(this.$route.query.type==1){
      this.myrank.type == '1'
      this.myrank.accountName = this.$route.query.store
      this.myrank.bankPermissopnCode = this.$route.query.code
      // }else{
      //   this.myrank.type==1
      //   this.myrank.accountName=this.$route.query.store
      //   this.myrank.bankPermissopnCode=this.$route.query.code
      // }
    } else if (this.type == 1) {
      this.myrank.type = '2'
      this.myrank.accountName = this.$route.query.name
      this.myrank.idCard = this.$route.query.card
    } else if (this.type == 0) {
      this.myrank.type = '2'
      this.myrank.accountName = this.$route.query.name
      this.myrank.idCard = this.$route.query.card
    }


    this.myrank.idCard = this.$route.query.card
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.phonest {
  color: #999;
  font-size: 14px;
  margin: 18px;
}
.result {
  width: 100%;
  background: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 30px 0 60px 0;
}
.noteclick {
  color: #999;
  background: none !important;
  border: none !important;
}
.banklist {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .banklist-li:last-of-type {
    width: 100%;
  }
  .banklist-li {
    display: flex;
    font-size: 14px;
    line-height: 50px;

    border-bottom: 1px solid rgba(197, 197, 197, 0.5);
    width: 50%;
    height: 50px;
    .bankdiv {
      width: 30px;
      height: 30px;
      margin: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
