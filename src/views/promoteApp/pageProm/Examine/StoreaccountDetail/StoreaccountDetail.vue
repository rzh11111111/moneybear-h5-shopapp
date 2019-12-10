<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="anzhuotop">
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="0" title="审核信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field type="text" label="审核编码" :value="shop.code" readonly></van-field>
        <van-cell title="审核名称" :value="shop.name" ></van-cell>
        <van-field type="text" label="审核类型" :value="returnServiceType(shop.serviceType)" readonly/>
        <van-field type="text" label="申请时间" :value="shop.createTime" readonly/>
        <van-field type="text" label="审核状态" :value="returnDelFlag(shop.delFlag)" readonly/>
        <van-cell-group>
          <van-cell title="拒绝理由" :value="shop.remarks" v-if="shop.delFlag==3"></van-cell>
          <van-cell title="备注" :value="shop.remarks"  v-else></van-cell>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="1" title="账号信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">账号信息</div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="编码"
          :value="approvalContent.code"
          readonly
        />
        <van-field
          type="text"
          label="入驻时间"
          :value="approvalContent.approvalTime"
          readonly
        />
        <van-field
          type="text"
          label="角色"
          value="商户老板"
          readonly
        />
        <van-field
          type="text"
          label="登录名"
          :value="approvalContent.userName"
          readonly
        />
        <van-field
          type="text"
          label="手机号"
          :value="approvalContent.phone"
          readonly
        />
        <van-field
          type="text"
          label="邮箱"
          :value="approvalContent.email"
          readonly
        />
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="2" title="状态信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">状态信息</div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="帐号启用"
          :value="approvalContent.isEnable==0?'启用':'停用'"
          readonly
        />
        <van-field
          type="text"
          label="帐号状态"
          :value="returnStatus(approvalContent.status)"
          readonly
        />
        <!-- <van-field type="text" label="可推广区域" :value="approvalContent.areaConfig==null?'':approvalContent.areaConfig.name" readonly/> -->
        <van-cell
            title="可推广区域"
            placeholder="查看可推广区域"
            value="查看可推广区域"
            is-link
            @click="area.onoff=!area.onoff;topheader.name='查看可推广区域'"
          ></van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="3" title="证照信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">证照信息</div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="姓名"
          :value="approvalContent.name"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          :value="'变更前：'+approvalContentSuccess.name"
          readonly
          error
          v-if="approvalContentSuccess!=null && change(approvalContent.name,approvalContentSuccess.name)"
        />
        <van-field
          type="text"
          label="身份证号"
          :value="approvalContent.idCard"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          :value="'变更前：'+approvalContentSuccess.idCard"
          readonly
          error
          v-if="approvalContentSuccess!=null && change(approvalContent.idCard,approvalContentSuccess.idCard)"
        />
        <van-cell title="身份证照" value-class="teadd">
          <one-not-cut :one-not-cut="approvalContent.idCardJustUrl" class="notclickadd"></one-not-cut>
          <one-not-cut :one-not-cut="approvalContent.idCardBackUrl" class="notclickadd"></one-not-cut>
        </van-cell>
        <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && (change(approvalContent.idCardJustUrl,approvalContentSuccess.idCardJustUrl) || change(approvalContent.idCardBackUrl,approvalContentSuccess.idCardBackUrl))">
          <p style="color:#f44">变更前：</p>
          <one-not-cut :one-not-cut="approvalContentSuccess.idCardJustUrl" class="notclickadd"></one-not-cut>
          <one-not-cut :one-not-cut="approvalContentSuccess.idCardBackUrl" class="notclickadd"></one-not-cut>
        </van-cell>
        <!--<p class="hint" v-if="showHint">当前店铺的营业执照类型为个体商户，且商户老板与法人身份证不一致，请检查商户老板证明资料：转让协议或授权书（盖公章）。</p>-->
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item :name="(index+4)" title="证照信息" value-class="collapsewarn" :key="index" v-for="(item,index) in storeList" v-if="approvalContent.storeList[index].bcUserIdCard != approvalContent.idCard && approvalContent.storeList[index].bcRegisterType==1">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 55vw">{{approvalContent.storeList[index].name}}</div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="营业执照号"
          :value="approvalContent.storeList==null?'':approvalContent.storeList[index].bcCode"
          readonly
        />
        <van-cell title="名称"  :value="approvalContent.storeList==null?'':approvalContent.storeList[index].name" ></van-cell>
        <van-field
          type="text"
          label="类型"
          :value="returnBcRegisterType(approvalContent.storeList==null?'':approvalContent.storeList[index].bcRegisterType)"
          readonly
        />
        <van-field
          type="text"
          label="有效截至日期"
          :value="approvalContent.storeList==null?'':approvalContent.storeList[index].bcEndtime"
          readonly
        />
        <van-cell title="证照"  value-class="teadd">
          <one-not-cut :one-not-cut="approvalContent.storeList==null?'':approvalContent.storeList[index].bcPicUrl"  class="notclickadd"></one-not-cut>
        </van-cell>
        <van-field
          type="text"
          label="法人姓名"
          :value="approvalContent.storeList==null?'':approvalContent.storeList[index].bcUserName"
          readonly
        />
        <van-field
          type="text"
          label="身份证号"
          :value="approvalContent.storeList==null?'':approvalContent.storeList[index].bcUserIdCard"
          readonly
        />
        <van-cell title="法人身份证"  value-class="teadd">
          <one-not-cut :one-not-cut="approvalContent.storeList==null?'':approvalContent.storeList[index].idCardJustUrl"  class="notclickadd"></one-not-cut>
          <one-not-cut :one-not-cut="approvalContent.storeList==null?'':approvalContent.storeList[index].idCardBackUrl"  class="notclickadd"></one-not-cut>
        </van-cell>
        <!--<van-cell title="老板证明资料"  value-class="teadd">-->
          <!--<one-not-cut class="notclickadd" :one-not-cut="src" :key="keys" v-for="(src,keys) in approvalContent.storeList==null?'':approvalContent.storeList[index].runProvePic.split(',')"></one-not-cut>-->
        <!--</van-cell>-->
        <!--<van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && showHint">-->
          <!--<p style="color:#f44">变更前：</p>-->
          <!--<one-not-cut class="notclickadd" :one-not-cut="src" :key="keys" v-for="(src,keys) in approvalContentSuccess.storeList==null?'':approvalContentSuccess.storeList[index].runProvePic.split(',')"></one-not-cut>-->
        <!--</van-cell>-->
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop box-bottom">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff3"/>
        </div>
        <div class="floatBox" v-show="shop.delFlag == 2 && type == 3 && $route.query.record != 1">
          <van-field type="textarea" label="原因/备注" placeholder="审批拒绝时，必须填写原因" v-model="remarks" class="textarea"></van-field>
          <p class="newfont">{{remarks.length}}/60</p>
          <div class="btnBox">
            <van-button type="danger" class="btn" @click="refuse">审核拒绝</van-button>
            <van-button type="primary" class="btn" @click="pass">审核通过</van-button>
          </div>
        </div>
    </van-collapse>
    <div class="bott" v-if="shop.delFlag == 3 && $route.query.record != 1"></div>
    <div class="botto" v-if="shop.delFlag == 3 && $route.query.record != 1">
      <van-button type="primary" size="large" @click="todetail" class="submitbtn">重新编辑</van-button>
    </div>
    <van-popup
      v-model="area.onoff"
      position="right"
      :overlay="false"
    >
      <div class="rightmap">
        <header class="heade">
        </header>
        <div>
          <choose-area :area="area" @callback="areas"></choose-area>
        </div>
      </div>
    </van-popup>
    </div>
  </div>
</template>

<script>
import oneArea from "@/components/chooseArea/oneArea";
import oneNotCut from '@components/addimg/oneNotCut'
import chooseArea from '@/components/chooseArea/chooseArea'
import { format,inputup,inputup2 } from "@utils";
export default {
  data() {
    return {
      showHint: false,
      storeList: 0,
      newfont: 0,
      remarks: "",
      format,
      topheader: {
        name: "详情",
        left: "3",
        heade: "header1"
      },
      type: "",
      list: "",
      activeNames: ["2", "1", "0", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], // 开哪个折叠
      activewarn: {
        onoff0: false,
        onoff1: false,
        onoff2: false,
        onoff3: false,
        onoff4: false
      },
      inputwarn: {
        warn1: ""
      },
      areaConfig: {
        //选择地址
        onoff: false
      },
      area: {
        list:false,
        onoff: false,
        chooseno: false,
        arealist: [],
        userlist:[]
      },
      jingying: {
        // 经营品牌
        onoff: false
      },
      disabled: true, // 后退能否
      shop: {},
      approvalContent: {},
      approvalContentSuccess: {}
    };
  },
  components: {
    oneNotCut,
    oneArea,
    chooseArea
  },
  methods: {
    change(msg1,msg2) {
      if(msg1 === msg2){
        return false;
      }else{
        return true;
      }
    },
    goback () {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '详情'
      }else {
        this.$router.go(-1)
      }
    },
    areas (msg) {
      console.log(msg)
      this.shop.managerDutyAreaConfigs = msg
      this.area.onoff = false
      this.topheader.name = '详情'
    },
    addbcPicUrl (msg) {
      this.approvalContent.store.logo = msg
    },
    returnServiceType(type) {
      switch (type) {
        case 29:
          return "商户老板资料变更审核";
        default:
          return "无";
      }
    },
    returnDelFlag(type) {
      switch (type) {
        case 0:
          return "审核通过";
        case 1:
          return "已删除";
        case 2:
          return "审核中";
        case 3:
          return "审核拒绝";
        default:
          return "无";
      }
    },
    returnBcRegisterType(type) {
      switch (type) {
        case "1":
          return "个体店铺";
        case "2":
          return "企业";
        default:
          return "无";
      }
    },
    returnStatus(type) {
      switch (type) {
        case 1:
          return "正常";
        case 2:
          return "关闭";
        case 3:
          return "冻结";
        default:
          return "无";
      }
    },
    returnAccountStatus(type) {
      switch (type) {
        case 1:
          return "正常";
        case 2:
          return "冻结";
        default:
          return "无";
      }
    },
    refuse() {
      if (this.remarks) {
        let para = {
          isRelease: '1',
          id: this.shop.id,
          serviceType: '29',
          remarks: this.remarks
        };
        this.Api.approveornot(para)
          .then(res => {
            if(res){
              if(res.status == 1){
                this.$toast("操作成功，审核拒绝");
              }else{
                this.$toast(res.data.stateMessage);
              }
              this.$router.go(-1);
            }
          });
      } else {
        this.$toast("请填写原因/备注");
      }
    },
    pass() {
      this.$dialog.confirm({
        message: '是否通过审核'
      }).then(() => {
        let para = {
          isRelease: '0',
          id: this.shop.id,
          serviceType: '29',
          remarks: this.remarks
        };
        this.Api.approveornot(para)
                .then(res => {
                  if(res){
                    if(res.status == 1){
                      this.$toast("操作成功，审核通过");
                    }else{
                      this.$toast(res.data.stateMessage);
                    }
                    this.$router.go(-1);
                  }
                });
      }).catch(() => {
        // on cancel
      });
      // if (this.remarks) {

      // } else {
      //   this.$toast("请填写原因/备注");
      // }
    },
    oneAreas(msg) {
      if (msg == "") {
      } else {
        this.shop.province = msg[0].name;
        this.shop.city = msg[1].name;
        this.shop.region = msg[2].name;
        this.shop.areaConfig.id = msg[3].id;
      }
      this.areaConfig.onoff = false;
    },
    getimg() {
      this.$refs.imageCropper.checkPhoto();
    },
    loadImage(data) {
      this.upload(data);
    },
    deletelicense() {
      this.shop.logoUrl = "";
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let offsetTop = document.getElementsByClassName("van-collapse-item");
      for (let i = 1; i < offsetTop.length; i++) {
        if (offsetTop[i].getBoundingClientRect().top < 0) {
          this.removeByValue(this.activeNames, i - 1);
        }
      }
      if (scrollTop > 600) {
        console.log("11");
      }
    },
    removeByValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    inputblur(type) {
      // 错误显示折叠上的感叹号
      this.$validator.validateAll().then(result => {
        if (result) {
          // ...
          console.log(result);
        } else {
          switch (type) {
            case 0:
              this.activewarn.onoff0 = true;
              break;
            case 1:
              this.activewarn.onoff1 = true;
              break;
            case 2:
              this.activewarn.onoff2 = true;
              break;
            case 3:
              this.activewarn.onoff3 = true;
              break;
            case 4:
              this.activewarn.onoff4 = true;
              break;
          }
        }
      });
    },
    todetail(){
      if(this.shop.serviceType==1){
        this.$router.push({
          path: '/AddSeed',
          query: {id: this.shop.id, list:4,}
        })
      }else if(this.shop.serviceType==2){
        this.$router.push({
          path: '/AddSeed',
          query: {id: this.shop.id, list:5,}
        })
      }else if(this.shop.serviceType==7){
        this.$router.push({
          path: '/AddTogether',
          query: {id: this.shop.id, list:2,}
        })
      }else if(this.shop.serviceType==8){
        this.$router.push({
          path: '/AddPoplarize',
          query: {id: this.shop.id, list:3,}
        })
      }

    }
  },
  watch: {
    "remarks"() {
      if (
        this.remarks !== undefined &&
        this.remarks !== null &&
        this.remarks.length > 60
      ) {
        this.remarks = this.remarks.substr(
          0,
          this.remarks.length - 1
        );
      } else if (
        this.remarks !== undefined &&
        this.remarks !== null &&
        this.remarks.length > 0
      ) {
        this.newfont =
          this.remarks !== undefined &&
          this.remarks !== null &&
          this.remarks.length;
        console.log("this.remarks.length",this.remarks.length)
      }
    }
  },
  beforeDestroy(){
    inputup2('.anzhuotop','.app-init')
  },
  mounted() {
    inputup('.anzhuotop','.app-init')
    //window.addEventListener("scroll", this.handleScroll);
    this.type = sessionStorage.getItem("accountType");
    this.list = this.$route.query.list;
    // let para = this.$route.query.id, // 0,挂靠合作商id
    // this.name=sessionStorage.getItem('accountName')
    let para = {
      id: this.$route.query.id
    }

    // let formdata = new FormData();
    // formdata.set("id", this.$route.query.id);

    this.Api.getApprovalDetail(para)
      .then(res => {
        this.shop = res.data.data;
        this.approvalContent = JSON.parse(res.data.data.approvalContent);
        this.approvalContentSuccess = JSON.parse(res.data.data.approvalContentSuccess);
        this.storeList = this.approvalContent.storeList.length;

        for(let n=0;n<this.storeList;n++){
          if(this.approvalContent.storeList[n].bcUserIdCard != this.approvalContent.idCard && this.approvalContent.storeList[n].bcRegisterType==1){
            this.showHint = true
          }
        }
        console.log(this.approvalContent);
        console.log(this.approvalContentSuccess);
        for(let n=0;n<this.storeList;n++){
          this.activeNames.push(4+n)
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  destroyed() {
    //window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
.heade {
  width: 375px;
  height: 44px;
  position: relative;
  background: #0088fd;
  background: -webkit-linear-gradient(to right, #00a7fc, #0088fd);
  background: -moz-linear-gradient(to right, #00a7fc, #0088fd);
  background: linear-gradient(to right, #00a7fc, #0088fd);
  color: #ffffff;
}
.backlcon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 18px;
  top: 12px;
}

.headline {
  position: absolute;
  left: 50%;
  font-size: 18px;
  line-height: 44px;
  transform: translateX(-50%);
}

.rightmap {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.margintop {
  margin-top: 10px;
}
.newfont {
  color: #c5c5c5;
  font-size: 10px;
  margin-bottom: 9px;
  text-align: right;
  margin-right: 30px;
}
.van-button--normal {
  margin: 18px 0 18px 18px;
}
.floatBox {
  padding: 10px 15px;
  overflow: hidden;
}
.floatBox h3 {
  color: #333;
  font-size: 16px;
}
.floatBox .border {
  overflow: hidden;
  padding: 10px 0;
  font-size: 14px;
  color: #333;
}
.floatBox .imgBox {
  width: 100%;
  height: 120px;
}
.floatBox .imgBox img {
  width: 100%;
  height: 100%;
}
.floatBox .border:not(:last-child),
.floatBox:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.fb-left {
  width: 85%;
  float: left;
}
.fb-right {
  width: 15%;
  float: right;
  text-align: right;
}
.btnBox {
  overflow: hidden;
}
.btnBox .btn {
  margin: 10px 0;
}
.btnBox .btn:last-child {
  float: right;
}
.btnBox .fullbtn {
  width: 100%;
  margin: 0;
}
.textarea {
  padding: 0
}
.box-bottom {
    background: #fff;
    padding: 15px 0;
}
.hint {
  padding: 10px 15px;
  color: #f00;
}
.botto{
  z-index: 2000;
}
</style>
