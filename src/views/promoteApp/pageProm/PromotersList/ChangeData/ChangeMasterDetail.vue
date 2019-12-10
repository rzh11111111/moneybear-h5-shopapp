<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="0" title="审核信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field type="text" label="审核编码" :value="shop.code" readonly></van-field>
        <van-field type="text" label="审核名称" :value="shop.name" readonly/>
        <van-field type="text" label="审核类型" value="商户老板资料变更审核" readonly/>
        <van-field type="text" label="申请时间" :value="shop.createTime" readonly/>
        <van-field type="text" label="审核状态" :value="returnDelFlag(shop.delFlag)" readonly/>
        <van-cell-group>
          <van-field label="拒绝理由" type="textarea" :value="shop.remarks" rows="1" autosize readonly v-if="shop.delFlag==3"/>
          <van-field label="备注" type="textarea" :value="shop.remarks" rows="1" autosize readonly v-else/>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="1" title="商户老板状态信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">商户老板状态信息</div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="帐号启用"
          :value="approvalContent.isEnable==0?'启用':'启用'"
          readonly
        />
        <van-field
          type="text"
          label="帐号状态"
          :value="returnStatus(approvalContent.status)"
          readonly
        />
        <van-cell
          title="管辖区域"
          placeholder="查看可推广区域"
          value="查看可推广区域"
          is-link
          @click="area.onoff=!area.onoff;topheader.name='查看可推广区域'"
        ></van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="2" title="商户老板证照信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">商户老板证照信息</div>
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
        <van-cell title="证照" value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="approvalContent.idCardBackUrl"></one-not-cut>
          <one-not-cut class="notclickadd" :one-not-cut="approvalContent.idCardJustUrl"></one-not-cut>
        </van-cell>
        <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && (change(approvalContent.idCardJustUrl,approvalContentSuccess.idCardJustUrl) || change(approvalContent.idCardBackUrl,approvalContentSuccess.idCardBackUrl))">
          <p style="color:#f44">变更前：</p>
          <one-not-cut :one-not-cut="approvalContentSuccess.idCardBackUrl" class="notclickadd"></one-not-cut>
          <one-not-cut :one-not-cut="approvalContentSuccess.idCardJustUrl" class="notclickadd"></one-not-cut>
        </van-cell>
        <!--<p class="hint" v-if="showHint">当前店铺的营业执照类型为个体商户，且商户老板与法人身份证不一致，请检查商户老板证明资料：转让协议或授权书（盖公章）。</p>-->
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item :name="(index+3)" title="证照信息" value-class="collapsewarn" :key="index" v-for="(item,index) in storeList" v-if="approvalContent.storeList[index].bcUserIdCard != approvalContent.idCard && approvalContent.storeList[index].bcRegisterType==1">
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
        <van-field
          type="text"
          label="名称"
          :value="approvalContent.storeList==null?'':approvalContent.storeList[index].name"
          readonly
        />
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
        <van-popup
      v-model="area.onoff"
      position="right"
      :overlay="false"
    >
      <div class="rightmap">
        <header class="heade">

        </header>
        <div>
          <choose-area :area="area"></choose-area>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import oneArea from "@/components/chooseArea/oneArea";
import oneNotCut from '@components/addimg/oneNotCut'
import chooseArea from '@/components/chooseArea/chooseArea'
import { format, arrToString } from "@/utils";
export default {
  data() {
    return {
      showHint: false,
      remarks: "",
      storeList: 0,
      format,
      topheader: {
        name: "详情",
        left: "3",
        heade: "header1"
      },
      type: "",
      list: "",
      activeNames: ["2", "1", "0", "3", "4", "5", "6"], // 开哪个折叠
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
    getStoreCategory(obj) {
      if (!obj) {
        return ;
      }
      let str = '';
      if (obj.parents && obj.parents.length) {
        str = arrToString(obj.parents, obj.parentId);
      }
      if (str && obj.name) {
        str += '>'
      }
      return str + obj.name
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
    returnRegisterType(type) {
      switch (type) {
        case '1':
          return "个体店铺";
        case '2':
          return "企业";
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
    returnStoreAccountStatus(type) {
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
    oneAreas(msg) {
      console.log(msg);
      if (msg != "") {
    
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
      // console.log(data.get('fileCategoryCode'),data.get('filename'))
      this.upload(data);
      // this.shop.logoUrl=data
    },
    deletelicense() {
      this.shop.logoUrl = "";
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // var offsetTop = document.getElementsByClassName("van-collapse-item")[1].getBoundingClientRect().top
      let offsetTop = document.getElementsByClassName("van-collapse-item");
      for (let i = 1; i < offsetTop.length; i++) {
        if (offsetTop[i].getBoundingClientRect().top < 0) {
          this.removeByValue(this.activeNames, i - 1);
        }
        // console.log(offsetTop[1].getBoundingClientRect().top)
      }
      if (scrollTop > 600) {
        console.log("11");
      }
      // console.log(offsetTop,scrollTop)
      // if (scrollTop > offsetTop) {
      //   this.searchBarFixed = true
      // } else {
      //   this.searchBarFixed = false
      // }
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
    }
  },
  watch: {
    "remarks"() {
      if (
        this.remarks !== undefined &&
        this.remarks !== null &&
        this.remarks.length > 200
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
        this.shop.newfont =
          this.remarks !== undefined &&
          this.remarks !== null &&
          this.remarks.length;
      }
    }
  },
  mounted() {
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
          this.activeNames.push(3+n)
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
.floatBox img {
  height: 150px;
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
.textarea {
  padding: 0
}
.hint {
  color: #f44
}
</style>
