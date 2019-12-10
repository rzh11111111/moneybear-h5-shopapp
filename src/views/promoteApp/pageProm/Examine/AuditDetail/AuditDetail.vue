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
        <van-cell title="审核类型" :value="returnServiceType(shop.serviceType)" ></van-cell>
        <van-cell title="申请时间" :value="shop.createTime" ></van-cell>
        <van-cell title="审核状态" :value="returnDelFlag(shop.delFlag)" ></van-cell>
        <!-- <van-field type="textarea" label="备注" :value="shop.remarks" readonly/> -->
        <van-cell-group>
          <van-cell title="拒绝理由" :value="shop.remarks" v-if="shop.delFlag==3"></van-cell>
          <van-cell title="备注" :value="shop.remarks"  v-else></van-cell>
          <!--<van-field label="拒绝理由" type="textarea" :value="shop.remarks" rows="1" autosize readonly v-if="shop.delFlag==3"/>-->
          <!--<van-field label="备注" type="textarea" :value="shop.remarks" rows="1" autosize readonly v-else/>-->
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="1" title="商户老板账号信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">商户老板账号信息</div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="编码"
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.code"
          readonly
        />
        <van-field
          type="text"
          label="入驻时间"
          :value="approvalContent.storeAccount==null?'':format(approvalContent.storeAccount.approvalTime, 'yyyy-MM-dd hh:mm:ss')"
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
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.userName"
          readonly
        />
        <van-field
          type="text"
          label="手机号"
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.phone"
          readonly
        />
        <van-field
          type="text"
          label="邮箱"
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.email"
          readonly
        />
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
          label="店铺启用"
          :value="approvalContent.store==null?'':approvalContent.store.isEnable==0?'启用':'停用'"
          readonly
        />
        <van-field
          type="text"
          label="店铺状态"
          :value="returnStatus(approvalContent.store==null?'':approvalContent.store.platformStatus)"
          readonly
        />
        <van-field type="text" label="推广人" :value="approvalContent.spreadName" readonly/>
        <van-field
          type="text"
          label="商户老板"
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.name"
          readonly
        />
        <!--<van-cell title="证明资料" value-class="teadd">-->
          <!--<one-not-cut class="notclickadd" :one-not-cut="src" v-for="src in approvalContent.store==null?'':approvalContent.store.runProvePic.split(',')"></one-not-cut>-->
        <!--</van-cell>-->
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="3" title="商户老板状态信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">商户老板状态信息</div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="帐号启用"
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.isEnable==0?'启用':'停用'"
          readonly
        />
        <van-field
          type="text"
          label="帐号状态"
          :value="returnAccountStatus(approvalContent.storeAccount==null?'':approvalContent.storeAccount.status)"
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
      <van-collapse-item name="4" title="商户老板证照信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">商户老板证照信息</div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="姓名"
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.name"
          readonly
        />
        <van-field
          type="text"
          label="身份证号"
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.idCard"
          readonly
        />
        <van-cell title="身份证照" value-class="teadd">
          <one-not-cut :one-not-cut="approvalContent.store==null?'':approvalContent.storeAccount.idCardJustUrl" class="notclickadd"></one-not-cut>
          <one-not-cut :one-not-cut="approvalContent.store==null?'':approvalContent.storeAccount.idCardBackUrl" class="notclickadd"></one-not-cut>
        </van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item title="基本信息" name="5" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff2"></van-icon>
        </div>
        <van-field
          type="text"
          label="店铺编码"
          :value="approvalContent.store==null?'':approvalContent.store.code"
          readonly
        ></van-field>
        <van-field
          type="text"
          label="入驻时间"
          :value="approvalContent.storeAccount==null?'':format(approvalContent.storeAccount.approvalTime, 'yyyy-MM-dd hh:mm:ss')"
          readonly
        ></van-field>
        <van-field
          type="text"
          label="店铺角色"
          :value="approvalContent.store==null?'':approvalContent.store.type==1?'种子商户':'特色商户'"
          readonly
        ></van-field>
        <van-cell title="店招名称" :value="approvalContent.store==null?'':approvalContent.store.nickName" ></van-cell>
        <van-cell title="店铺头像" value-class="teadd">
          <one-not-cut :one-not-cut="approvalContent.store==null?'':approvalContent.store.logo"  class="notclickadd"></one-not-cut>
        </van-cell>
        <van-cell title="店铺地址" :value="shop.province+shop.city+shop.region"></van-cell>
        <van-cell title=" " :value="approvalContent.store==null?'':approvalContent.store.address"></van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="6" title="证照信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="营业执照号"
          :value="approvalContent.store==null?'':approvalContent.store.bcCode"
          readonly
        />
        <van-cell title="名称"  :value="approvalContent.store==null?'':approvalContent.store.name" ></van-cell>
        <van-field
          type="text"
          label="类型"
          :value="returnBcRegisterType(approvalContent.store==null?'':approvalContent.store.bcRegisterType)"
          readonly
        />
        <van-field
          type="text"
          label="有效截至日期"
          :value="approvalContent.store==null?'':approvalContent.store.bcEndtime"
          readonly
        />
        <van-cell title="证照"  value-class="teadd">
          <one-not-cut :one-not-cut="approvalContent.store==null?'':approvalContent.store.bcPicUrl"  class="notclickadd"></one-not-cut>
        </van-cell>
        <van-field
          type="text"
          label="法人姓名"
          :value="approvalContent.store==null?'':approvalContent.store.bcUserName"
          readonly
        />
        <van-field
          type="text"
          label="身份证号"
          :value="approvalContent.store==null?'':approvalContent.store.bcUserIdCard"
          readonly
        />
        <van-cell title="法人身份证"  value-class="teadd">
          <one-not-cut :one-not-cut="approvalContent.store==null?'':approvalContent.store.idCardJustUrl"  class="notclickadd"></one-not-cut>
          <one-not-cut :one-not-cut="approvalContent.store==null?'':approvalContent.store.idCardBackUrl"  class="notclickadd"></one-not-cut>
        </van-cell>
        <van-cell title="其他证件"  value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="src" :key="index" v-for="(src,index) in approvalContent.store==null?'':approvalContent.store.idOthrCerUrl.split(',')"></one-not-cut>
        </van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="7" title="经营信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="店铺分类"
          :value="approvalContent.store==null?'':approvalContent.store.businessRanges"
          readonly
        />
        <!-- <van-field
          type="text"
          label="店铺折扣"
          v-if="!!approvalContent.store"
          :value="approvalContent.store.rateConfig ? accMul(approvalContent.store.rateConfig.storeRateBase,10)  : '无折扣'"
          readonly
        /> -->
        <!-- <van-field
          type="text"
          label="营业时间"
          :value="((approvalContent.store==null?'':approvalContent.store.startTime)+'-'+(approvalContent.store==null?'':approvalContent.store.endTime))"
          readonly
        /> -->
        <van-field
          type="text"
          label="店铺电话"
          :value="approvalContent.store==null?'':approvalContent.store.phone"
          readonly
        />
        <van-cell title="店铺环境"  value-class="teadd">
          <one-not-cut :one-not-cut="src" :key="keys" v-for="(src,keys) in approvalContent.store==null?'':approvalContent.store.albums.split(',')"  class="notclickadd"></one-not-cut>
        </van-cell>
        <van-cell title="店铺简介"   :value="approvalContent.store==null?'':approvalContent.store.info"></van-cell>
      </van-collapse-item>
    </van-collapse>
    
     <van-collapse v-model="activeNames" class="margintop" >
      <van-collapse-item title="费率和合同" name="8" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff3"/>
        </div>
        <div class="floatBox" >
           <h3></h3>
          <div class="border">
           
            <p
                    class="fb-left"
            >合同类型</p>
            <p  class="fb-right">
              {{approvalContent.store==null?'':approvalContent.store.contractPicUrls?'纸质合同':'电子合同'}}
            </p>
          </div>
        </div>
        <!-- 纸质合同种子店折扣 -->
        <div class="floatBox" v-if="shop.serviceType==1">
          
          <div class="border">
            <p class="fb-left">店铺折扣</p>
            <p
              class="fb-right"
            >10折</p>
          </div>
        </div>
        <!-- 纸质合同特色店折扣 -->
        <div class="floatBox" v-else-if="shop.serviceType==2&&approvalContent.store.contractPicUrls">
          
          <div class="border">
            <p class="fb-left">店铺折扣</p>
            <p
              class="fb-right"
            >{{approvalContent.store==null?'':accMul(approvalContent.store.rateConfig.storeRateBase,10)}}折</p>
          </div>
        </div>
        <!-- 电子合同特色店折扣 -->
        <div class="floatBox" v-else>
          
          <div class="border">
            <p class="fb-left">结算给店铺</p>
            <p
              class="fb-right"
            >{{approvalContent.contractApproval==null?'':accMul(approvalContent.contractApproval.storeSettlement,100)}}%</p>
          </div>
        </div>
        <!-- 种子店费率 -->
        <div class="floatBox" v-if="shop.serviceType==1">
          <h3>费率</h3>
          <div class="border">
            <p class="fb-left">平台收取服务费，收取该种子商户平台销售额的</p>
            <p
              class="fb-right"
            >{{approvalContent.store==null?'':accMul(approvalContent.store.rateConfig.storeRatePlatform,100)}}%</p>
          </div>
          <div class="border">
            <p class="fb-left">平台补贴种子商户，补贴该种子商户平台销售额的</p>
            <p class="fb-right">0.15%</p>
          </div>
          <div class="border">
            <p class="fb-left">配送平台商品，获得该商品订单价格的</p>
            <p class="fb-right">10%</p>
          </div>注：配送费由商品所属企业承担。
        </div>
         <!-- 纸质合同特色店费率 -->
        <div class="floatBox" v-else-if="shop.serviceType==2&&approvalContent.store.contractPicUrls">
          
          <div class="border">
            <p class="fb-left">平台收取服务费，收取该特色商户平台销售额的</p>
            <p
              class="fb-right"
            >{{approvalContent.store==null?'':accMul(approvalContent.store.rateConfig.storeRatePlatform,100)}}%</p>
          </div>
        </div>
        <!-- 电子合同特色店费率 -->
        <!-- <div class="floatBox" v-else>
         
          <div class="border">
            <p class="fb-left">平台收取服务费，收取该特色商户平台销售额的</p>
            <p
              class="fb-right"
            >{{approvalContent.contractApproval==null?'':accMul(approvalContent.contractApproval.ratePlatform,100)}}%</p>
          </div>
        </div> -->


      <!-- 电子合同法人 -->
        <div class="floatBox" v-if="!approvalContent.store.contractPicUrls" >
          <!-- <h3>合同签署人是否法人</h3> -->
          <div class="border">
            <!--<p class="fb-left">平台收取服务费，收取该特色商户平台销售额的</p>-->
            <p
                    class="fb-left"
            >合同签署人是否法人</p>
            <p   class="fb-right">
                {{approvalContent.store==null?'':approvalContent.contractApproval.operatorType==1?'是':'否'}}
            </p>
           </div>
        </div>


        <!-- 电子合同时间 -->
        <div class="floatBox"  v-if="!approvalContent.store.contractPicUrls" >
          <!-- <h3></h3> -->
          <div class="border">
            <!--<p class="fb-left">平台收取服务费，收取该特色商户平台销售额的</p>-->
            <p
                    class="fb-left"
            >合同时间</p>
            <p  class="fb-right">
                店铺签合同起1年整
            </p>
          </div>
        </div>
        <!-- 纸质合同时间 -->
        <div class="floatBox" v-else >
          <div class="border">
            <p class="fb-left">合同时间</p>
            <p
                    class="fb-right"
            >{{approvalContent.store==null?'':approvalContent.store.contractStartTime }}至<br>{{approvalContent.store==null?'':approvalContent.store.contractEndTime }}</p>
          </div>
        </div>

        <!-- 纸质合同照片 -->
        <div class="floatBox"   v-if="approvalContent.store.contractPicUrls">
          <h3>合同照片</h3>注：必须包含首页、费率页、合作期限页、签章页。
          
          <van-cell value-class="teadd" class="imgBox-cell">
            <one-not-cut :one-not-cut="src" class="notclickadd"  :key="keys" v-for="(src,keys) in approvalContent.store==null?'':(approvalContent.store.contractPicUrls==null?'':approvalContent.store.contractPicUrls.split(','))"></one-not-cut>
          </van-cell>
        </div>
        <!-- 电子合同约定 -->
        <div class="floatBox"  v-if="!approvalContent.store.contractPicUrls">
          
          <div class="border">
            <p class="fb-left">其他约定</p>
            <p  class="fb-right">{{approvalContent?approvalContent.contractApproval.otherAppointment:''}}</p>
          </div>
        </div>
        <!-- 电子合同审核 -->
        <div class="floatBox" v-show="shop.delFlag == 2 && type == 3 && $route.query.record != 1&&!approvalContent.store.contractPicUrls">
          
          <van-field type="textarea" label="原因/备注" placeholder="审批拒绝时，必须填写原因" v-model="remarks" class="textarea"></van-field>
          <p class="newfont">{{remarks.length}}/60</p>
          <div class="btnBox">
            <van-button type="danger" class="btn" @click="refuse">审核拒绝</van-button>
            <van-button type="primary" class="btn" @click="pass">审核通过</van-button>
          </div>
        </div>
        <!-- 纸质合同审核 -->
       <div class="floatBox" v-show="shop.delFlag == 2 && type == 3 && $route.query.record != 1&&approvalContent.store.contractPicUrls">
          <van-field type="textarea" label="原因/备注" placeholder="审批拒绝时，必须填写原因" v-model="remarks" class="textarea"></van-field>
          <p class="newfont">{{remarks.length}}/60</p>
          <div class="btnBox">
            <van-button type="danger" class="btn" @click="refuse">审核拒绝</van-button>
            <van-button type="primary" class="btn" @click="pass">审核通过</van-button>
          </div>
        </div> 
        <div class="floatBox" v-if="shop.delFlag == 3 && $route.query.record != 1&&approvalContent.store.contractPicUrls">
          <div class="btnBox" >
            <van-button type="primary" class="fullbtn" @click="todetail">重新提交</van-button>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>

    <div class="bott" v-if="shop.delFlag == 3 && $route.query.record != 1&&!approvalContent.store.contractPicUrls"></div>
    <div class="botto" v-if="shop.delFlag == 3 && $route.query.record != 1&&!approvalContent.store.contractPicUrls">
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
  </div>
</template>

<script>
import oneArea from "@/components/chooseArea/oneArea";
import oneNotCut from '@components/addimg/oneNotCut'
import chooseArea from '@/components/chooseArea/chooseArea'
import { format,inputup,inputup2,accMul } from "@utils";
export default {
  data() {
    return {
      accMul,
      expandKeys: [],
      dutyAreaList: [],
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
      approvalContent: {
      }
    };
  },
  components: {
    oneNotCut,
    oneArea,
    chooseArea
  },
  methods: {
    getDutyArea() {
      
      let arr = [];
      // this.approvalContent.areaConfig.map(item => {
        // if (item.areaConfig) {
          this.formatDutyAreaApproval(
            arr,
            this.approvalContent.areaConfig,
            [],
            ["province", "city", "region"],
            1
          );
        // }
      // });
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
    goback () {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '详情'
      }else {
        this.$router.go(-1)
      }
    },
    areas (msg) {
      // console.log(msg)
      this.shop.managerDutyAreaConfigs = msg
      this.area.onoff = false
      this.topheader.name = '详情'
    },
    addbcPicUrl (msg) {
      this.approvalContent.store.logo = msg
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
          serviceType: this.shop.serviceType==1?'1':'2',
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
          serviceType: '1',
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
      // console.log(msg);
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
    // case 1:
    //   return "种子商户入驻";
    // case 2:
    //   return "特色商户入驻";
    // case 3:
    //   return "商品审核";
    // case 4:
    //   return "生产企业审核";
    // case 5:
    //   return "同城企业审批";
    // case 6:
    //   return "省区总审批";
    // case 7:
    //   return "合作商审批";
    // case 8:
    //   return "推广员审批";
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
        // console.log("this.remarks.length",this.remarks.length)
      }
    }
  },
  beforeDestroy(){
    inputup2('.anzhuotop','.app-init')
  },
  mounted() {
    inputup('.anzhuotop','.app-init')
   
    this.type = sessionStorage.getItem("accountType");
    this.list = this.$route.query.list;
   if(this.$route.query.id){  //正常流程进来
      let para = {
      id: this.$route.query.id
    }

    // let formdata = new FormData();
    // formdata.set("id", this.$route.query.id);

    this.Api.getApprovalDetail(para)
      .then(res => {
        this.shop = res.data.data;
        this.approvalContent = JSON.parse(res.data.data.approvalContent);
        this.getDutyArea();
        let businessRange=''
        if(this.approvalContent.storeCategoryInside){
          for(let i=0;i<this.approvalContent.storeCategoryInside.parents.length;i++){
            businessRange=businessRange+'-'+this.approvalContent.storeCategoryInside.parents[i].name
          }
          businessRange=businessRange+'-'+this.approvalContent.storeCategoryInside.name
          this.approvalContent.store.businessRanges = businessRange.substr(1)
        }

      })
      .catch(error => {
        console.log(error);
      });
   }else if(this.$route.query.storeid){
     let para = {
      storeId: this.$route.query.storeid
    }

    // let formdata = new FormData();
    // formdata.set("id", this.$route.query.id);

    this.Api.approvalstoreid(para)
      .then(res => {
        this.shop = res.data.data;
        this.approvalContent = JSON.parse(res.data.data.approvalContent);
        this.getDutyArea();
        let businessRange=''
        if(this.approvalContent.storeCategoryInside){
          for(let i=0;i<this.approvalContent.storeCategoryInside.parents.length;i++){
            businessRange=businessRange+'-'+this.approvalContent.storeCategoryInside.parents[i].name
          }
          businessRange=businessRange+'-'+this.approvalContent.storeCategoryInside.name
          this.approvalContent.store.businessRanges = businessRange.substr(1)
        }

      })
      .catch(error => {
        console.log(error);
      });
   }
   

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
  width: 16vw;
  float: left;
}
.fb-right {
  margin-left: 30px;
  /* width: 40%; */
   float: left;
  /* text-align: right;  */
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
  padding: 0;
}
.imgBox-cell {
  padding: 0;
}
  .botto{
    z-index: 2000;
  }
</style>
