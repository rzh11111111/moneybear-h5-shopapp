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
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field type="text" label="编码" :value="approvalContent.code" readonly/>
        <van-field
          type="text"
          label="入驻时间"
          :value="shop.delFlag==0?shop.updateTime:''"
          readonly
        />
        <van-field type="text" label="角色" value="同城企业" readonly/>
        <van-field type="text" label="登录名" :value="approvalContent.userName" readonly/>
        <van-field type="text" label="手机号" :value="approvalContent.phone" readonly/>
        <van-field type="text" label="邮箱" :value="approvalContent.email" readonly/>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="2" title="状态信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field type="text" label="帐号启用" :value="approvalContent.isEnable==0?'启用':'停用'" readonly/>
        <van-field type="text" label="帐号状态" :value="returnStatus(approvalContent.status)" readonly/>
        <van-field type="text" label="店铺启用" :value="approvalContent.isEnable==0?'启用':'停用'" readonly/>
        <van-field type="text" label="店铺状态" :value="returnStatus(approvalContent.status)" readonly/>
        <van-cell title="推广人" value-class="teadd">
          <span v-if="!!shop.createBy">
            <template  v-for="(c,inx) in shop.createBy.split('/')">
              <span  v-if="inx == 1">{{c}} </span>
            </template>
          </span>
        </van-cell>
        <van-field type="text" label="结算方式" :value="approvalContent.settleType==1?'发货后次日结算(可提现)':'售后期关闭后结算(可提现)'" readonly/>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item title="经营信息" name="3" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff2"></van-icon>
        </div>
        <van-field type="text" label="类别" :value="approvalContent.shopInfo==null?'':(approvalContent.shopInfo.companyType==1?'企业':'代理商')" readonly></van-field>
        <van-cell title="经营品牌" value="" v-if="!!approvalContent.brandIdList">
          <p :key="keys" v-for="(brand,keys) in approvalContent.brandIdList">
            <span v-for="b in brandList" :key="b.id" v-if="b.id === brand.id" color="#fff" style="margin: 5px 5px 5px 0;">{{b.name}}</span>
          </p>
        </van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item title="基本信息" name="4" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff2"></van-icon>
        </div>
        <van-field type="text" label="店铺编码" :value="approvalContent.code" readonly/>
        <van-field type="text" label="入驻时间" :value="approvalContent.shopInfo==null?'':(approvalContent.shopInfo.delFlag==0?format(approvalContent.shopInfo.updateTime, 'yyyy-MM-dd hh:mm:ss'):'')" readonly/>
        <van-field type="text" label="店铺角色" :value="approvalContent.role!=null?approvalContent.role.name:''" readonly/>
        <!-- <van-field type="text" label="店铺名称" :value="approvalContent.nickName" readonly/> -->
        <van-cell title="店铺名称" :value="approvalContent.nickName"></van-cell>
        <van-cell title="店铺头像" value-class="teadd">
          <one-not-cut :one-not-cut="approvalContent.shopInfo!=null?approvalContent.shopInfo.bcPicUrl:''" class="notclickadd"></one-not-cut>
        </van-cell>
        <van-cell title="企业地址" :value="shop.province+shop.city+shop.region"></van-cell>
        <van-cell title=" " :value="approvalContent.shopInfo==null?'':approvalContent.shopInfo.address"></van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="5" title="证照信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="营业执照号"
          :value="approvalContent.shopInfo==null?'无':approvalContent.shopInfo.bcCode"
          readonly
        />
        <van-cell title="名称" :value="approvalContent.shopInfo==null?'无':approvalContent.shopInfo.name"></van-cell>
        <van-field type="text" label="类型" :value="approvalContent.shopInfo==null?'无':(approvalContent.shopInfo.bcRegisterType==1?'个体商户':'企业')" readonly/>
        <van-field type="text" label="有效截至日期" :value="approvalContent.shopInfo==null?'无':approvalContent.shopInfo.bcEndtime" readonly/>
        <van-cell title="证照" value-class="teadd">
          <!--<one-not-cut :one-not-cut="approvalContent.shopInfo==null?'':approvalContent.shopInfo.bcPicUrl" class="notclickadd"></one-not-cut>-->
          <some-multiple class="notclickadd" number="8"  :some-multiple="approvalContent.shopInfo==null?'':approvalContent.shopInfo.bcPicUrl"  filecode="FILE19011225489456"></some-multiple>

        </van-cell>
        <van-field type="text" label="法人姓名" :value="approvalContent.shopInfo==null?'无':approvalContent.shopInfo.bcUserName" readonly/>
        <van-field type="text" label="身份证号" :value="approvalContent.shopInfo==null?'无':approvalContent.shopInfo.bcUserIdCard" readonly/>
        <van-cell title="法人证照" value-class="teadd">
          <one-not-cut :one-not-cut="approvalContent.shopInfo==null?'':approvalContent.shopInfo.idCardJustUrl" class="notclickadd"></one-not-cut>
          <one-not-cut :one-not-cut="approvalContent.shopInfo==null?'':approvalContent.shopInfo.idCardBackUrl" class="notclickadd"></one-not-cut>
        </van-cell>
        <van-cell title="其他证件" value-class="teadd">
          <some-multiple class="notclickadd" number="8"  :some-multiple="approvalContent.shopInfo==null?'':approvalContent.shopInfo.bcPicUrls"  filecode="FILE19011225489456"></some-multiple>

          <!--<one-not-cut class="notclickadd" :one-not-cut="src" :key="keys" v-for="(src,keys) in approvalContent.shopInfo==null?'':approvalContent.shopInfo.bcPicUrls.split(',')"></one-not-cut>-->
        </van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="6" title="通讯录" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <!-- <ul>
          <li v-for="(item,index) in approvalContent.shopCommunicationBookList" v-if="approvalContent.shopCommunicationBookList != null">
            <h3 style="padding: 10px 15px;">{{item.role}}</h3>
            <p class="bookList"><span>姓名</span>{{item.name}}</p>
            <p class="bookList"><span>手机号</span>{{item.phone}}</p>
            <p class="bookList"><span>微信</span>{{item.wechat}}</p>
            <p class="bookList" v-if="index<3"><span>邮箱</span>{{item.email}}</p>
          </li>
        </ul> -->
        <div class="floatBox" style="padding:0">
          <van-row gutter="20"  v-if="approvalContent.shopCommunicationBookList != null">
            <van-col :key="index" v-for="(item,index) in approvalContent.shopCommunicationBookList">
              <h3 class="titleText">{{item.role}}</h3>
              <p class="bookList"><span>姓名</span>{{item.name}}</p>
              <p class="bookList"><span>手机号</span>{{item.phone}}</p>
              <p class="bookList"><span>微信</span>{{item.wechat}}</p>
              <p class="bookList" v-if="index<3"><span>邮箱</span>{{item.email}}</p>
            </van-col>
          </van-row>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item title="费率和合同" name="7" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff3"/>
        </div>
        <div class="floatBox">
          <h3>费率</h3>
          <div class="border">
            <p class="fb-left">平台收取服务费，收取该同城企业平台销售额的</p>
            <p
              class="fb-right"
            >{{approvalContent.rateConfig==null?'':accMul(approvalContent.rateConfig.storeRatePlatform,100)}}%</p>
          </div>
        </div>
        <div class="floatBox" >
          <h3>合同时间</h3>
          <div class="border">
            <!--<p class="fb-left">平台收取服务费，收取该特色商户平台销售额的</p>-->
            <p
                    class="fb-left"
            >{{approvalContent.shopInfo==null?'':format(approvalContent.shopInfo.contractStartTime, 'yyyy-MM-dd hh:mm:ss') }}至<br>{{approvalContent.shopInfo==null?'':format(approvalContent.shopInfo.contractEndTime, 'yyyy-MM-dd hh:mm:ss') }}</p>
          </div>
        </div>
        <div class="floatBox">
          <h3>合同照片</h3>注：必须包含首页、费率页、合作期限页、签章页。
          <van-cell v-if="shop.serviceType==5" value-class="teadd" class="imgBox-cell">
            <template v-if="approvalContent.shopInfo">
              <!--<one-not-cut :one-not-cut="src" class="notclickadd" :key="keys" v-for="(src,keys) in approvalContent.shopInfo==null?'':approvalContent.shopInfo.contractPicUrls.split(',')"></one-not-cut>-->
            <some-multiple class="notclickadd" number="8"  :some-multiple="approvalContent.shopInfo.contractPicUrls"  filecode="FILE19011225489456"></some-multiple>
            </template>
          </van-cell>
          <van-cell v-else value-class="teadd" class="imgBox-cell">
            <template v-if="approvalContent.store">
              <!--<one-not-cut :one-not-cut="src" class="notclickadd" :key="keys" v-for="(src,keys) in approvalContent.store==null?'':approvalContent.store.contractPicUrls.split(',')"></one-not-cut>-->
            <some-multiple class="notclickadd" number="8"  :some-multiple="approvalContent.store.contractPicUrls"  filecode="FILE19011225489456"></some-multiple>
            </template>
          </van-cell>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div class="bott" v-if="shop.delFlag == 3"></div>
    <div class="botto" v-if="shop.delFlag == 3">
    <van-button type="info" size="large" @click="submitBasic" class="submitbtn">重新编辑</van-button>
    </div>
  </div>
</template>

<script>
// import oneArea from "@/components/chooseArea/oneArea";
import oneNotCut from '@components/addimg/oneNotCut'
import someMultiple from '@components/addimg/someMultiple'
import { format,accMul } from "@utils";
export default {
  data() {
    return {
      accMul,
      format,
      topheader: {
        name: "详情",
        left: "3",
        heade: "header1"
      },
      type: "",
      list: "",
      activeNames: ["2", "1", "0", "3", "4", "5", "6", "7"], // 开哪个折叠
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
      jingying: {
        // 经营品牌
        onoff: false
      },
      disabled: true, // 后退能否
      shop: {
      },
      approvalContent: {},
	    brandList: []
    };
  },
  components: {
    someMultiple,
    // oneArea,
    oneNotCut
  },
  methods: {
    returnServiceType(type) {
      switch (type) {
        case 1:
          return "种子商户入驻";
        case 2:
          return "特色商户入驻";
        case 3:
          return "商品审核";
        case 4:
          return "生产企业审核";
        case 5:
          return "同城企业审批";
        case 6:
          return "省区总审批";
        case 7:
          return "合作商审批";
        case 8:
          return "推广员审批";
        case 10:
          return "红包提现审批";
        case 11:
          return "推广员收益提现审批";
        case 12:
          return "合作商收益提现审批";
        case 13:
          return "省区总收益提现审批";
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
    goback() {
      if (this.jingying.onoff) {
        this.jingying.onoff = !this.jingying.onoff;
        this.topheader.name = "填写资料";
      } else {
        this.$router.go(-1);
      }
    },
    oneAreas(msg) {
      console.log(msg);
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
      // console.log(data.get('fileCategoryCode'),data.get('filename'))
      this.upload(data);
      // this.shop.logoUrl=data
    },
    deletelicense() {
      this.shop.logoUrl = "";
    },
    refuse() {
      if (this.shop.remarks) {
        let para = {
          id: this.shop.id,
          status: 3,
          remarks: this.shop.remarks
        };
        this.Api.changeLocal2(para)
          .then(res => {
            console.log(res);
            this.$router.go(-1);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$toast("提示内容");
      }
    },
    toaddlocal() {
      this.$router.push({ path: "/AddLocal", query: { id: this.shop.id } });
    },
    submitBasic() {
      // 获取全局数据
      this.$router.push({
        path: "/AddLocal",
        query: { id2: this.shop.id,list:6 }
      });
    },
    // handleScroll() {
    //   var scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   // var offsetTop = document.getElementsByClassName("van-collapse-item")[1].getBoundingClientRect().top
    //   let offsetTop = document.getElementsByClassName("van-collapse-item");

    //     console.log("offsetTop.length",offsetTop.length);
    //   for (let i = 1; i < offsetTop.length; i++) {
    //     if (offsetTop[i].getBoundingClientRect().top < 0) {
    //       this.removeByValue(this.activeNames, i - 1);
    //     }
    //     // console.log(offsetTop[1].getBoundingClientRect().top)
    //   }
    //   if (scrollTop > 600) {
    //     console.log("11");
    //   }
    //   // console.log(offsetTop,scrollTop)
    //   // if (scrollTop > offsetTop) {
    //   //   this.searchBarFixed = true
    //   // } else {
    //   //   this.searchBarFixed = false
    //   // }
    // },
    // removeByValue(arr, val) {
    //
    //     console.log("arr.length",arr.length);
    //   for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] == val) {
    //       arr.splice(i, 1);
    //       break;
    //     }
    //   }
    // },
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
    getBrands() {
      this.Api.localInside({}).then(res => {

        this.brandList = res.data.data.list || [];
      })
    }
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll);
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
      })
      .catch(error => {
        console.log(error);
      });

    this.getBrands();
  },
  // destroyed() {
    // window.removeEventListener("scroll", this.handleScroll);
  // }
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
.bookList {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  padding: 10px 15px;
}
.bookList span {
  width: 90px;
}
.floatBox .titleText {
  padding: 10px 15px;
  font-size: 100%;
  font-family: inherit;
  color: #969799;
}
.imgBox-cell {
  padding: 0;
}
.botto{
  z-index: 2000;
}
</style>
