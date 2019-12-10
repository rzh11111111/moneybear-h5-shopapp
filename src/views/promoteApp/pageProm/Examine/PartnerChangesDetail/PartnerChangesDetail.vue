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
        <van-cell title="审核类型" :value="returnServiceType(shop.serviceType)" ></van-cell>
        <van-cell title="申请时间" :value="shop.createTime" ></van-cell>
        <van-cell title="审核状态" :value="returnDelFlag(shop.delFlag)" ></van-cell>
        <van-cell-group>
          <van-cell title="拒绝理由" :value="shop.remarks" v-if="shop.delFlag==3"></van-cell>
          <van-cell title="备注" :value="shop.remarks"  v-else></van-cell>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff2"></van-icon>
        </div>
        <van-field
          type="text"
          label="编码"
          :value="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.code"
          readonly
        ></van-field>
        <van-field
          type="text"
          label="入驻时间"
          :value="format(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.updateTime, 'yyyy-MM-dd hh:mm:ss')"
          readonly
        ></van-field>
        <van-field
          type="text"
          label="角色"
          :value="returnAccountType(approvalContent.accountType)"
          readonly
        ></van-field>
        <van-field type="text" label="登录名" :value="approvalContent.username" readonly></van-field>
        <van-field type="text" label="手机号" :value="approvalContent.phone" readonly></van-field>
        <van-field type="text" label="邮箱" :value="approvalContent.email" readonly></van-field>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="2" title="状态信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
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
        <van-cell title="上级用户"  v-if="!!approvalContent.managerCooperation && !!approvalContent.managerCooperation.merManager"
                  :value="approvalContent.managerCooperation.merManager.name"></van-cell>
        <van-cell
          title="管辖区域"
          placeholder="查看可推广区域"
          value="查看可推广区域"
          is-link
          @click="area.onoff=!area.onoff;topheader.name='查看可推广区域'"
        ></van-cell>
        <van-cell
                title=""
                placeholder="查看变更前可推广区域"
                value="查看变更前可推广区域"
                is-link
                v-if="approvalContentSuccess!=null && approvalContentSuccess.managerDutyAreaConfigs != null && change(approvalContent.managerDutyAreaConfigs.toString(),approvalContentSuccess.managerDutyAreaConfigs.toString())"
                value-class="redcolor"
                @click="area2.onoff=!area2.onoff;topheader.name='查看变更前可推广区域'"
        ></van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="3" title="基本信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-cell
          title="办公地址"
          value-class="colorC0C0C0"
          :value="approvalContent.managerCooperation==null?'':(approvalContent.managerCooperation.areaOfficeProvince+approvalContent.managerCooperation.areaOfficeCity+approvalContent.managerCooperation.areaOfficeRegion)"
          disabled
        ></van-cell>
         <van-field
          type="text"
          label=""
          v-if="approvalContentSuccess!=null && approvalContentSuccess.managerCooperation != null && approvalContentSuccess.managerCooperation.areaOfficeRegion !=null && change(approvalContent.managerCooperation.areaOfficeRegion,approvalContentSuccess.managerCooperation.areaOfficeRegion)"
          :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':(approvalContentSuccess.managerCooperation.areaOfficeProvince+approvalContentSuccess.managerCooperation.areaOfficeCity+approvalContentSuccess.managerCooperation.areaOfficeRegion))"
          readonly
          error
        />
        <van-field
          label=""
          type="textarea"
          class="tetitle"
          :value="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.officeAddress"
          disabled
        ></van-field>
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && approvalContentSuccess.managerCooperation != null && change(approvalContent.managerCooperation.officeAddress,approvalContentSuccess.managerCooperation.officeAddress)"
          :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':(approvalContentSuccess.managerCooperation.officeAddress))"
          readonly
          error
        />
        <van-cell
          title="仓库地址"
          value-class="colorC0C0C0"
          :value="approvalContent.managerCooperation==null?'':(approvalContent.managerCooperation.areaWarehouseProvince+approvalContent.managerCooperation.areaWarehouseCity+approvalContent.managerCooperation.areaWarehouseRegion)"
          disabled
        ></van-cell>
         <van-field
          type="text"
          label=""
          v-if="approvalContentSuccess!=null && approvalContentSuccess.managerCooperation != null && approvalContentSuccess.managerCooperation.areaWarehouseRegion != null && change(approvalContent.managerCooperation.areaWarehouseRegion,approvalContentSuccess.managerCooperation.areaWarehouseRegion)"
          :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':(approvalContentSuccess.managerCooperation.areaWarehouseProvince+approvalContentSuccess.managerCooperation.areaWarehouseCity+approvalContentSuccess.managerCooperation.areaWarehouseRegion))"
          readonly
          error
        />
        <van-field
          label=""
          type="textarea"
          class="tetitle"
          :value="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.warehouseAddress"
          disabled
        ></van-field>
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && approvalContentSuccess.managerCooperation != null && change(approvalContent.managerCooperation.warehouseAddress,approvalContentSuccess.managerCooperation.warehouseAddress)"
          :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':(approvalContentSuccess.managerCooperation.warehouseAddress))"
          readonly
          error
        />
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="4" title="证照信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="营业执照号"
          :value="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcCode"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcCode,approvalContentSuccess.managerCooperation==null?'':approvalContent.managerCooperation.bcCode)"
          :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcCode)"
          readonly
          error
        />
        <van-cell title="名称" :value="approvalContent.name"></van-cell>
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.name,approvalContentSuccess.name)"
          :value="'变更前：'+approvalContentSuccess.name"
          readonly
          error
        />
        <van-field
          type="text"
          label="类型"
          :value="returnRegisterType(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcRegisterType)"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcRegisterType,approvalContentSuccess.managerCooperation==null?'':approvalContent.managerCooperation.bcRegisterType)"
          :value="'变更前：'+returnRegisterType(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcRegisterType)"
          readonly
          error
        />
        <van-field
          type="text"
          label="有效截至日期"
          :value="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcEndtime"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcEndtime,approvalContentSuccess.managerCooperation==null?'':approvalContent.managerCooperation.bcEndtime)"
          :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcEndtime)"
          readonly
          error
        />
        <van-cell title="证照" value-class="teadd">
          <one-not-cut
            class="notclickadd"
            :one-not-cut="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcPicUrl"
          ></one-not-cut>
        </van-cell>
        <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && approvalContentSuccess.managerCooperation!=null && approvalContent.managerCooperation!=null && change(approvalContent.managerCooperation.bcPicUrl,approvalContentSuccess.managerCooperation.bcPicUrl)">
          <p style="color:#f44">变更前：</p>
          <one-not-cut :one-not-cut="approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcPicUrl" class="notclickadd"></one-not-cut>
        </van-cell>
        <van-field
          type="text"
          label="法人姓名"
          :value="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcUserName"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcUserName,approvalContentSuccess.managerCooperation==null?'':approvalContent.managerCooperation.bcUserName)"
          :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcUserName)"
          readonly
          error
        />
        <van-field
          type="text"
          label="身份证号"
          :value="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcUserIdcard"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcUserIdcard,approvalContentSuccess.managerCooperation==null?'':approvalContent.managerCooperation.bcUserIdcard)"
          :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcUserIdcard)"
          readonly
          error
        />
        <van-cell title="法人身份证" value-class="teadd">
          <one-not-cut
            class="notclickadd"
            :one-not-cut="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idCardBackUrl"
          ></one-not-cut>
          <one-not-cut
            class="notclickadd"
            :one-not-cut="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idCardJustUrl"
          ></one-not-cut>
        </van-cell>
        <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && approvalContentSuccess.managerCooperation!=null && approvalContent.managerCooperation!=null && (change(approvalContent.managerCooperation.idCardBackUrl,approvalContentSuccess.managerCooperation.idCardBackUrl) || change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idCardJustUrl,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.idCardJustUrl))">
          <p style="color:#f44">变更前：</p>
          <one-not-cut :one-not-cut="approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.idCardBackUrl" class="notclickadd"></one-not-cut>
          <one-not-cut :one-not-cut="approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.idCardJustUrl" class="notclickadd"></one-not-cut>
        </van-cell>
        <van-cell title="其他证件" value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="src" v-for="src in approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idOthrCerUrl.split(',')"></one-not-cut>
        </van-cell>
        <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && approvalContentSuccess.managerCooperation!=null && approvalContent.managerCooperation!=null && change(approvalContent.managerCooperation.idOthrCerUrl,approvalContentSuccess.managerCooperation.idOthrCerUrl)">
          <p style="color:#f44">变更前：</p>
          <one-not-cut class="notclickadd" :one-not-cut="src" v-for="src in approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.idOthrCerUrl.split(',')"></one-not-cut>
        </van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-popup v-model="area.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <el-tree
            :default-expanded-keys="expandKeys"
            :data="dutyAreaList"
            node-key="code"
            empty-text="辖区为空"
          ></el-tree>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="area2.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <el-tree
                  :default-expanded-keys="expandKeys2"
                  :data="dutyAreaList2"
                  node-key="code"
                  ref="tree"
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
      approvalContentSuccess: {},
      expandKeys: [],
      dutyAreaList: [],
      expandKeys2: [],
      dutyAreaList2: [],
      remarks: "",
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
        list: false,
        onoff: false,
        chooseno: false,
        arealist: [],
        userlist: []
      },
      area2: {
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
    change(msg1,msg2) {
      if(msg1 === msg2){
        return false;
      }else{
        return true;
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
    getDutyArea2() {
      console.log("this.approvalContentSuccess.", this.approvalContentSuccess);
      let arr = [];
      this.approvalContentSuccess.managerDutyAreaConfigs.map(item => {
        // console.log(item,item.areaConfig)
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
      this.dutyAreaList2 = arr;
      if (arr.length > 0) {
        this.expandKeys2 = [arr[0].code];
      } else {
        this.expandKeys2 = [];
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
    goback() {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff;
        this.topheader.name = "详情";
      } else if(this.area2.onoff){
        this.area2.onoff = !this.area2.onoff;
        this.topheader.name = "详情";
      }else {
        this.$router.go(-1);
      }
    },
    areas(msg) {
      console.log(msg);
      this.shop.managerDutyAreaConfigs = msg;
      this.area.onoff = false;
      this.topheader.name = "详情";
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
    returnRegisterType(type) {
      switch (type) {
        case 1:
          return "个体店铺";
        case 2:
          return "企业";
        default:
          return "无";
      }
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
        case 21:
          return "种子商户资料变更审核";
        case 22:
          return "特色商户资料变更审核";
        case 27:
          return "合作商资料变更审核";
        case 28:
          return "推广员资料变更审核";
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
    //window.addEventListener("scroll", this.handleScroll);
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
        this.approvalContentSuccess = JSON.parse(res.data.data.approvalContentSuccess);

        this.getDutyArea();
        this.getDutyArea2();
        console.log(this.approvalContent);
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
  width: 100%;
  margin: 10px 0;
}
.botto{
  z-index: 2000;
}
</style>
