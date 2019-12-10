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
        <div slot="title" style="width: 35vw">账号信息</div>
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
        <van-field
          type="text"
          label="角色"
          :value="returnAccountType(approvalContent.accountType)"
          readonly
        />
        <van-cell title="登录名" :value="approvalContent.username"></van-cell>
        <van-field type="text" label="手机号" :value="approvalContent.phone" readonly/>
        <van-field type="text" label="邮箱" :value="approvalContent.email" readonly/>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="2" title="状态信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="帐号启用"
          :value="approvalContent.isEnable==0?'启用':'停用'"
          readonly
        />
        <van-field type="text" label="帐号状态" :value="returnStatus(approvalContent.status)" readonly/>

        <van-cell title="上级省区总"  :value="approvalContent.managerSpread==null?'':(approvalContent.managerSpread.merManagerBoss==null?'':approvalContent.managerSpread.merManagerBoss.name)"></van-cell>
        <van-cell title="所属合作商"  :value="approvalContent.managerSpread==null?'':(approvalContent.managerSpread.merManager==null?'':approvalContent.managerSpread.merManager.name)"></van-cell>

        <van-cell
          title="可推广区域"
          placeholder="查看可推广区域"
          value="查看可推广区域"
          is-link
          @click="area.onoff=!area.onoff;topheader.name='查看可推广区域'"
        ></van-cell>
        <van-field
          type="text"
          label="性质"
          :value="approvalContent.managerSpread==null?'':approvalContent.managerSpread.type == 1 ? '兼职' : '专职'"
          readonly
        />
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="3" title="基本信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">基本信息</div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-cell
          title="现居住地"
          :value="approvalContent.managerSpread==null?'':approvalContent.managerSpread.address"
        ></van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="4" title="证照信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field type="text" label="姓名" :value="approvalContent.name" readonly/>
        <van-field
          type="text"
          label="身份证号"
          :value="approvalContent.managerSpread==null?'':approvalContent.managerSpread.idCard"
          readonly
        />
        <van-cell title="身份证" value-class="teadd">
          <one-not-cut
            class="notclickadd"
            :one-not-cut="approvalContent.managerSpread==null?'':approvalContent.managerSpread.idCardJustUrl"
          ></one-not-cut>
          <one-not-cut
            class="notclickadd"
            :one-not-cut="approvalContent.managerSpread==null?'':approvalContent.managerSpread.idCardBackUrl"
          ></one-not-cut>
        </van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item title="费率和合同" name="5" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff3"/>
        </div>
        <div class="floatBox">
          <h3>费率</h3>
          <div class="border">
            <p class="fb-left">推广种子商户，获得种子商户平台销售额的</p>
            <p class="fb-right">0.15％</p>
          </div>注：省区总获得推广员提成的 10%
          <div class="border">
            <p class="fb-left">推广特色商户，获得特色商户平台销售额的</p>
            <p class="fb-right">0.3％</p>
          </div>注：省区总获得推广员提成的 10%
          <div class="border">
            <p class="fb-left">推广同城企业，获得同城企业平台销售额的</p>
            <p class="fb-right">0.3％</p>
          </div>
        </div>

        <!--<div class="floatBox">-->
          <!--<div class="btnBox">-->
            <!--<van-button type="primary" class="btn" @click="pass" v-if="shop.delFlag == 3">重新提交</van-button>-->
          <!--</div>-->
        <!--</div>-->
      </van-collapse-item>
    </van-collapse>
    <div class="bott" v-if="shop.delFlag == 3"></div>
    <div class="botto" v-if="shop.delFlag == 3">
      <van-button type="primary" size="large" @click="pass" class="submitbtn" >重新编辑</van-button>
    </div>
    <van-popup v-model="area.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <!--<choose-area :area="area"></choose-area>-->
          <el-tree
                  :default-expanded-keys="expandKeys"
                  :data="dutyAreaList"
                  node-key="code"
                  empty-text="辖区为空"
          ></el-tree>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import oneArea from "@/components/chooseArea/oneArea";
import oneNotCut from "@components/addimg/oneNotCut";
import chooseArea from "@/components/chooseArea/chooseArea";
import { format } from "../../../../../utils";
export default {
  data() {
    return {
      remarks: "",
      format,
      topheader: {
        name: "详情",
        left: "3",
        heade: "header1"
      },
      type: "",
      list: "",
      expandKeys: [],
      dutyAreaList: [],
      activeNames: ["2", "1", "0", "3", "4", "5", "6", "7", "8"], // 开哪个折叠
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
        list: false,
        onoff: false,
        chooseno: false,
        arealist: [],
        userlist: []
      },
      jingying: {
        // 经营品牌
        onoff: false
      },
      disabled: true, // 后退能否
      shop: {},
      approvalContent: {}
    };
  },
  components: {
    oneNotCut,
    oneArea,
    chooseArea
  },
  methods: {
    goback() {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff;
        this.topheader.name = "详情";
      } else {
        this.$router.go(-1);
      }
    },
    areas(msg) {
      console.log(msg);
      this.shop.managerDutyAreaConfigs = msg;
      this.area.onoff = false;
      this.topheader.name = "详情";
    },
    addbcPicUrl(msg) {
      this.approvalContent.store.logo = msg;
    },
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
          return "营业中";
        case 2:
          return "歇业中";
        default:
          return "无";
      }
    },
    returnAccountType(type) {
      switch (type) {
        case 1:
          return "推广员";
        case 2:
          return "合作商";
        case 3:
          return "省区总";
        default:
          return "无";
      }
    },
    getDutyArea() {
      console.log("this.approvalContent.", this.approvalContent);
      let arr = [];
      this.approvalContent.managerDutyAreaConfigs.map(item => {
        if (item.areaConfig) {
          this.formatDutyAreaApproval(
                  arr,
                  item.areaConfig,
                  [],
                  ["province", "city", "region"],
                  1
          );
        }
      });
      console.log(arr)
      this.dutyAreaList = arr;
      if (arr.length > 0) {
        this.expandKeys = [arr[0].code];
      } else {
        this.expandKeys = [];
      }
    },
    formatDutyAreaApproval(arr, area, inxList, levelArea, level) {
      let parents = area.parents;
      if (!parents) {
        return;
      }
      let hasArea = false;
      let arry = arr;
      for (let j = 0; j < inxList.length; j++) {
        arry = arry[inxList[j]].children;
      }

      for (let i = 0; i < arry.length; i++) {
        for (let k = 0; k < parents.length; k++) {
          if (arry[i].label === parents[k].name) {
            hasArea = true;
            if (level < levelArea.length) {
              if (!arry[i].children) {
                arry[i].children = [];
              }
              inxList.push(i);
              this.formatDutyAreaApproval(
                      arr,
                      area,
                      inxList,
                      levelArea,
                      level + 1
              );
            }
            break;
          }
        }
      }
      if (!hasArea) {
        if (level === levelArea.length) {
          arry.push({
            label: area.name,
            code: area.code
          });
        } else if (level < levelArea.length) {
          for (let i = 0; i < parents.length; i++) {
            if (parents[i].areaLevel === level) {
              arry.push({
                label: parents[i].name,
                code: parents[i].code,
                children: []
              });
              inxList.push(arry.length - 1);
              this.formatDutyAreaApproval(
                      arr,
                      area,
                      inxList,
                      levelArea,
                      level + 1
              );
              break;
            }
          }
        }
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
    /*  handleScroll() {
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
    },*/
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
    pass() {
      this.$router.push({
        path: "/AddPopularize",
        query: { id: this.shop.id, list: 3 }
      });
    }
  },
  watch: {
    "shop.remarks"() {
      if (
        this.shop.remarks !== undefined &&
        this.shop.remarks !== null &&
        this.shop.remarks.length > 200
      ) {
        this.shop.remarks = this.shop.remarks.substr(
          0,
          this.shop.remarks.length - 1
        );
      } else if (
        this.shop.remarks !== undefined &&
        this.shop.remarks !== null &&
        this.shop.remarks.length > 0
      ) {
        this.shop.newfont =
          this.shop.remarks !== undefined &&
          this.shop.remarks !== null &&
          this.shop.remarks.length;
      }
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
    };
    // let formdata = new FormData();
    // formdata.set("id", this.$route.query.id);
    this.Api.getApprovalDetail(para)
      .then(res => {
        this.shop = res.data.data;
        this.approvalContent = JSON.parse(res.data.data.approvalContent);
        this.getDutyArea();
        console.log(this.approvalContent);
      })
      .catch(error => {
        console.log(error);
      });
  },
  destroyed() {
    // window.removeEventListener("scroll", this.handleScroll);
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
  width: 100%;
  height: 120px;
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
  width: 100%;
  margin: 10px 0;
}
.btnBox .btn:last-child {
  float: right;
}
.botto{
  z-index: 2000;
}
</style>
