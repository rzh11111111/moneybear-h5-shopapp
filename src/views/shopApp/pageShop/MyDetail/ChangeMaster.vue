<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <p class="changes" @click="toChangeListId" v-if="right9">变更记录</p>
    <div class="anzhuotop">
      <van-collapse v-model="activeNames" v-show="change">
        <div>
          <van-collapse-item title="状态信息" name="0" value=" " value-class="collapsewarn">
            <div slot="icon" class="vant-collapse-icon"></div>

            <van-cell title="店铺启用" value-class="colorC0C0C0">
              <template slot="title">
                <span class="custom-text">账号启用</span>
                <van-icon name="question-o" class="righticon" @click="question(1)" />
              </template>
              <p v-if="shop.isEnable==0">启用</p>
              <p v-if="shop.isEnable==1">停用</p>
            </van-cell>
            <van-cell title="店铺状态" value-class="colorC0C0C0">
              <template slot="title">
                <span class="custom-text">账号状态</span>
                <van-icon name="question-o" class="righticon" @click="question(2)" />
              </template>
              <p v-if="shop.status==1">正常</p>
              <p v-if="shop.status==2">关闭</p>
              <p v-if="shop.status==3">冻结</p>
            </van-cell>
            <van-cell
              title="可推广区域"
              placeholder="查看可推广区域"
              value="查看可推广区域"
              is-link
              @click="area.onoff=!area.onoff;topheader.name='选择管辖区域';right9=false"
            ></van-cell>
          </van-collapse-item>
          <van-collapse-item
            title="证照信息"
            name="2"
            value=" "
            value-class="collapsewarn"
            v-if="!this.list"
          >
            <div slot="icon" class="vant-collapse-icon"></div>

            <van-field
              type="text"
              label="姓名"
              v-model="shop.name"
              placeholder="请输入姓名"
              required
              @blur="emojiName"
            ></van-field>
            <van-field
              type="text"
              label="身份证号"
              v-model="shop.idCard"
              placeholder="请输入身份证号"
              maxlength="18"
              required
              name="bcUserIdcard"
              v-validate="'required|idcard'"
              :error-message="errors.first('bcUserIdcard')"
            ></van-field>
            <van-cell title="身份证照" required>
              <one-not-cut
                @onenotcut="addidCardJustUrl"
                class="idjust"
                :one-not-cut="shop.idCardJustUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
              <one-not-cut
                @onenotcut="addidCardBackUrl"
                class="idback"
                :one-not-cut="shop.idCardBackUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
            </van-cell>
          </van-collapse-item>
          <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn" v-else>
            <div slot="icon" class="vant-collapse-icon"></div>

            <van-field
              type="text"
              label="姓名"
              v-model="shop.name"
              placeholder="请输入姓名"
              required
              disabled
            ></van-field>

            <van-field
              type="text"
              label="身份证号"
              v-model="shop.idCard"
              placeholder="请输入身份证号"
              required
              disabled
            ></van-field>
            <van-cell title="身份证照" required>
              <!--<one-not-cut @onenotcut="addbcPicUrl" :one-not-cut="shop.bcPicUrl" ></one-not-cut>-->
              <one-not-cut
                class="idjust notclickadd"
                :one-not-cut="shop.idCardJustUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
              <one-not-cut
                class="idback notclickadd"
                :one-not-cut="shop.idCardBackUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
            </van-cell>
          </van-collapse-item>
          <van-button type="primary" size="large" @click="inputblur" class="submitbtn">提交</van-button>
        </div>
        <!--<div v-show="steps=='2'">-->
        <!--&lt;!&ndash;<p class="changemaster-header">以下店铺的营业执照类型为个体商户，且商户老板与法人身份证不一致。请上传商户老板证明资料:转让协议或授权书(盖公章)。</p>&ndash;&gt;-->
        <!--<ul class="changemaster-ul">-->
        <!--<li class="changemaster-li" v-for="(item,index) in storeList" v-show="(item.bcUserIdCard!==shop.idCard)&&(item.bcRegisterType==='1'||item.bcRegisterType===1)">-->
        <!--<div class="changemaster-class">-->
        <!--<p class="changemaster-name">{{item.nickName}}</p>-->
        <!--<div><img src="@/assets/img/rightlcon.png"></div>-->
        <!--</div>-->
        <!--<div class="changemaster-content">-->
        <!--<some-multiple @somemultiple="addidOthrCerUrl"  number="3" :some-multiple="item.runProvePic" :index="index" filecode="FILE19011225489456"></some-multiple>-->
        <!--</div>-->
        <!--</li>-->

        <!--</ul>-->
        <!--<van-button type="primary" size="large" @click="inputblur" class="submitbtn">完成</van-button>-->
        <!--</div>-->
      </van-collapse>

      <van-collapse v-model="activeNames" v-show="!change">
        <van-collapse-item title="状态信息" name="0" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>

          <van-cell title="店铺启用" value-class="colorC0C0C0">
            <template slot="title">
              <span class="custom-text">账号启用</span>
              <van-icon name="question-o" class="righticon" @click="question(1)" />
            </template>
            <p v-if="shop.isEnable==0">启用</p>
            <p v-if="shop.isEnable==1">停用</p>
          </van-cell>
          <van-cell title="店铺状态" value-class="colorC0C0C0">
            <template slot="title">
              <span class="custom-text">账号状态</span>
              <van-icon name="question-o" class="righticon" @click="question(2)" />
            </template>
            <p v-if="shop.status==1">正常</p>
            <p v-if="shop.status==2">关闭</p>
            <p v-if="shop.status==3">冻结</p>
          </van-cell>
          <van-cell
            title="可推广区域"
            placeholder="查看可推广区域"
            value="查看可推广区域"
            is-link
            @click="area.onoff=!area.onoff;topheader.name='查看可推广区域';right9=false"
          ></van-cell>
        </van-collapse-item>

        <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>

          <van-field type="text" label="姓名" v-model="shop.name" disabled></van-field>

          <van-field type="text" label="身份证号" v-model="shop.idCard" disabled></van-field>
          <van-cell title="身份证照" disabled value-class="teadd">
            <!--<one-not-cut @onenotcut="addbcPicUrl" :one-not-cut="shop.bcPicUrl" ></one-not-cut>-->
            <one-not-cut class="idjust notclickadd" :one-not-cut="shop.idCardJustUrl"></one-not-cut>
            <one-not-cut class="idback notclickadd" :one-not-cut="shop.idCardBackUrl"></one-not-cut>
          </van-cell>
        </van-collapse-item>
        <div class="changebtn" @click="changedata" v-if="bcRegisterType" >
          <div>
            <img src="@assets/img/change.png" />
          </div>

          <p>修改</p>
        </div>
      </van-collapse>
    </div>
    <van-popup v-model="area.onoff" position="right" :overlay="false">
      <div class="rightmap" style="margin-top: 44px;background-color:#fff;">
        <choose-area :area="area" emptyText="空" @callback="areas"></choose-area>
      </div>
    </van-popup>
  </div>
</template>

<script>
import chooseArea from '@/components/chooseArea/chooseArea'
import oneNotCut from '@/components/addimg/oneNotCut'
import someMultiple from '@components/addimg/someMultiple'
import { inputup, inputup2 } from '@/utils'
import { Dialog } from 'vant'

export default {
  data () {
    return {
      storeAccountId: '',
      right9: true,
      topheader: {
        name: '资料信息',
        left: '3',
        heade: 'header1'
      },
      steps: 1, // 第几步
      allsteps: 3,
      type: '',
      list: '',
      kaiguan: true,
      change: false, // 能否编辑
      activeNames: ['2', '1', '0'], // 开哪个折叠
      address: { // 选择地址
        onoff1: false,
        onoff2: false,
        list: {},
        areaList: {}
      },
      bcRegisterType:true, //绑卡后就不能改了
      area: {
        onoff: false,
        chooseno: true,
        arealist: [],
        userlist: []
      },

      disabled: true, // 后退能否
      olddata: '',
      shop: {
      },
      oldstoreList: [],
      storeList: [],
      imggg: ''

    }
  },
  components: {
     oneNotCut, chooseArea, someMultiple
  },
  watch: {

  },
  methods: {
    emojiName () {
      let param = this.shop.name;
      // eslint-disable-next-line no-useless-escape
      let regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\-+*/|\r\n\s,.?!，。: '";%￥#@（）_<>？！…—&$=(){}[\]]|\s/g;
      this.shop.name = param.replace(regRule, "");
    },
    areas (msg) {
      this.shop.managerDutyAreaConfigs = msg
      this.area.onoff = false
      this.topheader.name = '资料信息'
    },
    addidCardJustUrl (msg) {
      this.shop.idCardJustUrl = msg
    },
    addidCardBackUrl (msg) {
      this.shop.idCardBackUrl = msg
    },
    // addidOthrCerUrl(msg,index) {
    //     console.log(index)
    //     this.storeList[index].runProvePic = msg
    //     // this.imggg = msg
    // },
    question (msg) {
      if (msg == 1) {
        this.$dialog.alert({
          message: `启用：账号能登录系统<br>停用：账号不能登录系统。名下店铺不能营业`
        })
      } else {
        this.$dialog.alert({
          message: `正常：能提现收益，能推广<br>冻结：不能提现收益，能推广<br>关闭：能提现收益，不能推广`
        })
      }

    },
    changedata () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '我的', '编辑','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.Api.changeFirstStore({}).then(res => {

        if (res.data.data) {
          this.$dialog.alert({
            message: '商户老板或名下店铺的资料变更正在审核中，不能编辑'
          }).then(() => {
            // on close
          })
        } else {
          this.change = true;
          this.topheader.name = '修改资料信息'
        }
      }).catch(error => {
        console.log(error)
      })
    },
    goback () {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '资料信息'
        this.right9 = true
      }
      // else if(this.steps=='2'){
      //     this.steps='1'
      //     this.topheader.name = '资料信息'
      //     this.right9 = true
      // }
      else if (this.change) {
        Dialog.confirm({
          title: '',
          message: '您有未提交审批的修改',
          confirmButtonText: '继续编辑',
          cancelButtonText: '放弃修改'
        }).then(() => {
          // on confirm
        }).catch(() => {
          this.change = false
          this.topheader.name = '资料信息'
          this.shop = JSON.parse(JSON.stringify(this.olddata))
          this.storeList = JSON.parse(JSON.stringify(this.oldstoreList))
        })
      } else {
        this.$router.go(-1)
      }
    },
    inputblur () { // 点击提交
      // if(this.steps=='1'&&this.storeList.some(item=>{
      //     return this.shop.idCard !== item.bcUserIdCard&&item.bcRegisterType==='1'
      // })){
      //         this.steps='2'
      //     this.topheader.name='上传店铺老板证明资料'
      //     this.right9 = false
      // }else
      //     {
        if (window._czc) {
               window._czc.push(['_trackEvent', '我的', '提交审核','' ,'' , '']);//其中灰色的为选填项
      
         }
      if (!this.shop.name) {
        this.$toast('请输入名称')
      } else if (!(this.shop.idCard.length === 15 || this.shop.idCard.length === 18)) {
        this.$toast('请输入正确的身份证')
      } else if (!(this.shop.idCardJustUrl && this.shop.idCardBackUrl)) {
        this.$toast('请选择身份证照')
      } else if (this.$validator.errors.items.length > 0) {
        this.$toast('请填写正确')
      } else {

        let para = {
          name: this.shop.name,
          idCard: this.shop.idCard,
          idCardJustUrl: this.shop.idCardJustUrl,
          idCardBackUrl: this.shop.idCardBackUrl,
          storeList: this.storeList
        }
        if (this.kaiguan) {
          this.kaiguan = false
          this.Api.changeMaster(para).then(res => {
            this.kaiguan = true
            console.log(res)
            if (res.data.status == 1) {
              // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 1, result: res.data.stateMessage } })
              this.$router.push({ path: '/ApplyResult', query: { result: '提交申请成功 正在审核中',redresult:'审核结果将消息通知申请者' } })
            } else {
              // this.$router.push({ path: '/ApplyResult', query: { win: false, type: 1, result: res.data.stateMessage } })
            }
          }).catch(error => {
            this.kaiguan = true
            console.log(error)
          })
        }

      }

      // }

    },
    toChangeListId () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '我的', '变更记录','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({ path: "/ChangeMasterList", query: { storeAccountId: this.storeAccountId } })
    }


  },

  mounted () {
    this.type = sessionStorage.getItem('accountType')
    this.list = this.$route.query.list
    // let para = this.$route.query.id, // 0,挂靠合作商id
    this.name = sessionStorage.getItem('accountName')
    if(this.$route.query.bcRegisterType=='1'){
      this.bcRegisterType=false
    }
    /*let formdata=new FormData();
    formdata.set("storeAccountId",this.$route.query.id);*/
    let para = {
      storeAccountId: this.$route.query.id
    }
    this.Api.masterDetail(para).then(res => {
      this.olddata = res.data.data.storeAccount
      this.shop = JSON.parse(JSON.stringify(res.data.data.storeAccount))
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    })
    this.Api.storeList2(para).then(res => {
      // this.olddata = res.data.data.storeAccount
      // this.shop=JSON.parse(JSON.stringify(res.data.data.storeAccount))

      if (res.data.data.list) {


        res.data.data.list.map(value => {
          // // console.loglog(this.store, this.store.length, value)
          this.$set(this.oldstoreList, this.storeList.length, { id: value.id, nickName: value.nickName, bcUserIdCard: value.bcUserIdCard, bcRegisterType: value.bcRegisterType })
          this.$set(this.storeList, this.storeList.length, { id: value.id, nickName: value.nickName, bcUserIdCard: value.bcUserIdCard, bcRegisterType: value.bcRegisterType })
        })
      }
      console.log(res.data)

      this.storeAccountId = res.data.data.list[0].storeAccountId;
      console.log('res.data.data.storeAccountId', res.data.data.list[0].storeAccountId)
    }).catch(error => {
      console.log(error)
    })
    inputup('.anzhuotop', '.app-init')
  },
  beforeDestroy () {
    inputup2('.anzhuotop', '.app-init')
  },
}
</script>

<style scoped lang="scss" type="text/scss">
.changes {
  position: fixed;
  top: 0;
  right: 4.8vw;
  z-index: 199999;
  color: #fff;
  line-height: 11.733vw;
}
.te::before {
  content: '*';
  position: absolute;
  left: 0.18667rem;
  font-size: 0.37333rem;
  color: #f44;
}

.newfont {
  color: #c5c5c5;
  font-size: 10px;
  margin-bottom: 9px;
  text-align: right;
  margin-right: 30px;
}
.changebtn {
  width: 44px;
  height: 44px;
  background: linear-gradient(
    137deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  border: 1px solid rgba(223, 223, 223, 1);
  border-radius: 50%;
  font-size: 9px;
  color: rgba(0, 136, 253, 1);
  line-height: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 20px;
  bottom: 200px;
  div {
    width: 15px;
    height: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.changemaster-header {
  font-size: 12px;
  line-height: 20px;
  color: #ff3232;
  margin: 18px;
}
.changemaster-ul {
  width: 100%;
  .changemaster-li {
    width: 100%;
    height: 116px;
    border: 1px solid #ffffff;
    background: #ffffff;
    margin-bottom: 10px;
    .changemaster-class {
      height: 16px;
      margin: 16px 18px;
      display: flex;
      justify-content: space-between;

      .changemaster-name {
        font-size: 16px;
        line-height: 16px;
        max-width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      div {
        height: 100%;
        img {
          height: 100%;
        }
      }
    }
    .changemaster-content {
      margin: 18px;
    }
  }
}
</style>
