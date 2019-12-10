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
        <van-cell title="审核编码"    :value="shop.code"></van-cell>
        <van-cell title="审核名称"    :value="shop.name"></van-cell>
        <van-cell title="审核类型"    :value="returnServiceType(shop.serviceType)"></van-cell>
        <van-cell title="申请时间"    :value="shop.createTime"></van-cell>
        <van-cell title="审核状态"    :value="returnDelFlag(shop.delFlag)"></van-cell>
        <van-cell-group>
          <van-cell title="拒绝理由"     :value="shop.remarks"  v-if="shop.delFlag==3"></van-cell>
          <van-cell title="备注"    :value="shop.remarks" v-else></van-cell>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="1" title="商户老板帐号信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">商户老板帐号信息</div>
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
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.approvalTime==null?'':approvalContent.storeAccount.approvalTime"
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
      <van-collapse-item name="2" title="商户老板状态信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="title" style="width: 35vw">商户老板状态信息</div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
        <van-field
          type="text"
          label="帐号启用"
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.isEnable==0?'启用':'启用'"
          readonly
        />
        <van-field
          type="text"
          label="帐号状态"
          :value="returnStoreAccountStatus(approvalContent.storeAccount==null?'':approvalContent.storeAccount.status)"
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
      <van-collapse-item name="3" title="商户老板证照信息" value-class="collapsewarn">
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
        <van-cell title="证照" value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="approvalContent.storeAccount==null?'':approvalContent.storeAccount.idCardBackUrl"></one-not-cut>
          <one-not-cut class="notclickadd" :one-not-cut="approvalContent.storeAccount==null?'':approvalContent.storeAccount.idCardJustUrl"></one-not-cut>
        </van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="4" title="状态信息" value-class="collapsewarn">
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
        <van-field type="text" label="推广人" :value="approvalContent.store==null?'':approvalContent.store.spreadUsername" readonly/>
        <van-field
          type="text"
          label="商户老板"
          :value="approvalContent.storeAccount==null?'':approvalContent.storeAccount.name"
          readonly
        />
        <!-- <van-field
          type="text"
          label=""
          v-if="approvalContentSuccess!=null && change(approvalContent.storeAccount==null?'':approvalContent.storeAccount.name,approvalContentSuccess.storeAccount==null?'':approvalContentSuccess.storeAccount.name)"
          :value="'变更前：'+(approvalContentSuccess.storeAccount==null?'':approvalContentSuccess.storeAccount.name)"
          readonly
          error
        /> -->
        <!--<van-cell title="证明资料" value-class="teadd">-->
          <!--<one-not-cut class="notclickadd" :one-not-cut="src" v-for="src in approvalContent.store==null?'':approvalContent.store.runProvePic.split(',')"></one-not-cut>-->
        <!--</van-cell>-->
        <!-- <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && approvalContentSuccess.store!=null && approvalContent.store!=null && change(approvalContent.store.runProvePic,approvalContentSuccess.store.runProvePic)">
          <p style="color:#f44">变更前：</p>
          <one-not-cut :one-not-cut="approvalContentSuccess.store==null?'':approvalContentSuccess.store.runProvePic" class="notclickadd"></one-not-cut>
        </van-cell> -->
        <!--<p class="hint" v-if="showHint">当前店铺的营业执照类型为个体商户，且商户老板与法人身份证不一致，请检查商户老板证明资料：转让协议或授权书（盖公章）。</p>-->
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
          :value="format(approvalContent.store==null?'':approvalContent.store.approvalTime, 'yyyy-MM-dd hh:mm:ss')"
          readonly
        ></van-field>
        <van-field
          type="text"
          label="店铺角色"
          :value="approvalContent.store==null?'':approvalContent.store.type==1?'种子商户':'特色商户'"
          readonly
        ></van-field>
        <van-cell title="店招名称"     :value="approvalContent.store==null?'':approvalContent.store.nickName"></van-cell>
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.nickName,approvalContentSuccess.store==null?'':approvalContentSuccess.store.nickName)"
          :value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.nickName)"
          readonly
          error
        />
        <van-cell title="店铺头像" value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="approvalContent.store==null?'':approvalContent.store.logo"></one-not-cut>
        </van-cell>
        <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && approvalContentSuccess.store!=null && approvalContent.store!=null && change(approvalContent.store.logo,approvalContentSuccess.store.logo)">
          <p style="color:#f44">变更前：</p>
          <one-not-cut :one-not-cut="approvalContentSuccess.store==null?'':approvalContentSuccess.store.logo" class="notclickadd"></one-not-cut>
        </van-cell>
        <van-cell title="店铺地址" :value="approvalContent.store==null?'':(approvalContent.store.province+approvalContent.store.city+approvalContent.store.region)"></van-cell>
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.region,approvalContentSuccess.store==null?'':approvalContentSuccess.store.region)"
          :value="'变更前：'+(approvalContentSuccess.store==null?'':(approvalContentSuccess.store.province+approvalContentSuccess.store.city+approvalContentSuccess.store.region))"
          readonly
          error
        />
        <van-cell title=" " :value="approvalContent.store==null?'':approvalContent.store.address"></van-cell>
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.address,approvalContentSuccess.store==null?'':approvalContentSuccess.store.address)"
          :value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.address)"
          readonly
          error
        />
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
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.bcCode,approvalContentSuccess.store==null?'':approvalContentSuccess.store.bcCode)"
          :value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.bcCode)"
          readonly
          error
        />
        <van-cell title="名称"     :value="approvalContent.store==null?'':approvalContent.store.name"></van-cell>
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.name,approvalContentSuccess.store==null?'':approvalContentSuccess.store.name)"
          :value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.name)"
          readonly
          error
        />
        <van-field
          type="text"
          label="类型"
          :value="returnRegisterType(approvalContent.store==null?'':approvalContent.store.bcRegisterType)"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.bcRegisterType,approvalContentSuccess.store==null?'':approvalContentSuccess.store.bcRegisterType)"
          :value="'变更前：'+returnRegisterType(approvalContentSuccess.store==null?'':approvalContentSuccess.store.bcRegisterType)"
          readonly
          error
        />
        <van-field
          type="text"
          label="有效截至日期"
          :value="approvalContent.store==null?'':approvalContent.store.bcEndtime"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.bcEndtime,approvalContentSuccess.store==null?'':approvalContent.store.bcEndtime)"
          :value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.bcEndtime)"
          readonly
          error
        />
        <van-cell title="证照" value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="approvalContent.store==null?'':approvalContent.store.bcPicUrl"></one-not-cut>
        </van-cell>
        <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && approvalContentSuccess.store!=null && approvalContent.store!=null && change(approvalContent.store.bcPicUrl,approvalContentSuccess.store.bcPicUrl)">
          <p style="color:#f44">变更前：</p>
          <one-not-cut :one-not-cut="approvalContentSuccess.store==null?'':approvalContentSuccess.store.bcPicUrl" class="notclickadd"></one-not-cut>
        </van-cell>
        <van-field
          type="text"
          label="法人姓名"
          :value="approvalContent.store==null?'':approvalContent.store.bcUserName"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.bcUserName,approvalContentSuccess.store==null?'':approvalContentSuccess.store.bcUserName)"
          :value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.bcUserName)"
          readonly
          error
        />
        <van-field
          type="text"
          label="身份证号"
          :value="approvalContent.store==null?'':approvalContent.store.bcUserIdCard"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.bcUserIdCard,approvalContentSuccess.store==null?'':approvalContentSuccess.store.bcUserIdCard)"
          :value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.bcUserIdCard)"
          readonly
          error
        />
        <van-cell title="法人身份证" value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="approvalContent.store==null?'':approvalContent.store.idCardBackUrl"></one-not-cut>
          <one-not-cut class="notclickadd" :one-not-cut="approvalContent.store==null?'':approvalContent.store.idCardJustUrl"></one-not-cut>
        </van-cell>
        <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && (approvalContentSuccess.store!=null && approvalContent.store!=null && change(approvalContent.store.idCardBackUrl,approvalContentSuccess.store.idCardBackUrl) || change(approvalContent.store==null?'':approvalContent.store.idCardJustUrl,approvalContentSuccess.store==null?'':approvalContentSuccess.store.idCardJustUrl))">
          <p style="color:#f44">变更前：</p>
          <one-not-cut :one-not-cut="approvalContentSuccess.store==null?'':approvalContentSuccess.store.idCardBackUrl" class="notclickadd"></one-not-cut>
          <one-not-cut :one-not-cut="approvalContentSuccess.store==null?'':approvalContentSuccess.store.idCardJustUrl" class="notclickadd"></one-not-cut>
        </van-cell>
        <van-cell title="其他证件" value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="src" v-for="src in approvalContent.store==null?'':approvalContent.store.idOthrCerUrl.split(',')"></one-not-cut>
        </van-cell>
        <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && approvalContentSuccess.store!=null && approvalContent.store!=null && change(approvalContent.store.idOthrCerUrl,approvalContentSuccess.store.idOthrCerUrl)">
          <p style="color:#f44">变更前：</p>
          <one-not-cut class="notclickadd" :one-not-cut="src" v-for="src in approvalContentSuccess.store==null?'':approvalContentSuccess.store.idOthrCerUrl.split(',')"></one-not-cut>
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
        <van-cell  style="margin-left:12px;"   v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.businessRanges,approvalContentSuccess.store==null?'':approvalContentSuccess.store.businessRanges)"
                  :value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.businessRanges)"
        value-class="redcolor"
        ></van-cell>
        <!--<van-field-->
          <!--type="text"-->
          <!--style="margin-left:12px;"-->
          <!--v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.businessRanges,approvalContentSuccess.store==null?'':approvalContentSuccess.store.businessRanges)"-->
          <!--:value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.businessRanges)"-->
          <!--readonly-->
          <!--error-->
        <!--/>-->
        <!-- <van-field
          type="text"
          label="店铺折扣"
          v-if="!!approvalContent.store"
          :value="approvalContent.store.rateConfig ? accMul(approvalContent.store.rateConfig.storeRateBase,10) : '无折扣'"
          readonly
        /> -->
        <!-- <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && approvalContentSuccess.store != null && !!approvalContentSuccess.store.rateConfig != null && change(approvalContent.store.rateConfig.storeRateBase,approvalContentSuccess.store.rateConfig.storeRateBase)"
          :value="'变更前：'+(approvalContentSuccess.store.rateConfig ? accMul(approvalContentSuccess.store.rateConfig.storeRateBase,10) : '无折扣')"
          readonly
          error
        /> -->
        <!-- <van-field
          type="text"
          label="营业时间"
          :value="((approvalContent.store==null?'':approvalContent.store.startTime)+'-'+(approvalContent.store==null?'':approvalContent.store.endTime))"
          readonly
        /> -->
        <van-field
          type="text"
          style="margin-left:12px;"
          v-if="approvalContentSuccess!=null && (change(approvalContent.store==null?'':approvalContent.store.startTime,approvalContentSuccess.store==null?'':approvalContentSuccess.store.startTime) || change(approvalContent.store==null?'':approvalContent.store.endTime,approvalContentSuccess.store==null?'':approvalContentSuccess.store.endTime))"
          :value="'变更前：'+(((approvalContent.store==null?'':approvalContentSuccess.store.startTime)+'-'+(approvalContent.store==null?'':approvalContentSuccess.store.endTime)))"
          readonly
          error
        />
        <van-field
          type="text"
          label="店铺电话"
          :value="approvalContent.store==null?'':approvalContent.store.phone"
          readonly
        />
        <van-field
          type="text"
          style="margin-left:12px;"
          :value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.phone)"
          readonly
          error
          v-if="approvalContentSuccess!=null && approvalContent.store!=null && change(approvalContent.store.phone,approvalContentSuccess.store.phone)"
        />
        <van-cell title="店铺环境" value-class="teadd">
          <one-not-cut class="notclickadd" :key="keys" v-for="(src,keys) in approvalContent.store==null?'':(approvalContent.store.albums==null?'':approvalContent.store.albums.split(','))" :one-not-cut="src"></one-not-cut>
        </van-cell>
        <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && change(approvalContent.store==null?'':approvalContent.store.albums,approvalContentSuccess.store==null?'':approvalContentSuccess.store.albums)">
          <p style="color:#f44">变更前：</p>
          <one-not-cut :key="keys" v-for="(src,keys) in approvalContentSuccess.store==null?'':(approvalContentSuccess.store.albums==null?'':approvalContentSuccess.store.albums.split(','))" :one-not-cut="src" class="notclickadd"></one-not-cut>
        </van-cell>
        <van-cell title="店铺简介"       :value="approvalContent.store==null?'':approvalContent.store.info"></van-cell>
        <van-field
          type="text"
          style="margin-left:12px;"
          :value="'变更前：'+(approvalContentSuccess.store==null?'':approvalContentSuccess.store.info)"
          readonly
          error
          v-if="approvalContentSuccess!=null && approvalContent.store!=null && change(approvalContent.store.info,approvalContentSuccess.store.info)"
        />
        <div class="floatBox" v-show="$route.query.record != 1">
          <!-- <div>
            <van-cell-group style="border:1px solid #eee">
              <van-field
                v-model="remarks"
                label="原因/备注:"
                type="textarea"
                placeholder="审核拒绝时，必须填写原因"
                rows="4"
                autosize
                required
              />
            </van-cell-group>
          </div> -->
          <van-field type="textarea" label="原因/备注" placeholder="审批拒绝时，必须填写原因" v-model="remarks" class="textarea"></van-field>
          <p class="newfont">{{remarks.length}}/200</p>
          <div class="btnBox">
            <van-button type="danger" class="btn" @click="refuse">审核拒绝</van-button>
            <van-button type="primary" class="btn" @click="pass">审核通过</van-button>
          </div>
        </div>
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
  </div>
</template>

<script>
import oneArea from "@/components/chooseArea/oneArea";
import oneNotCut from '@components/addimg/oneNotCut'
import chooseArea from '@/components/chooseArea/chooseArea'
import { format,inputup,inputup2,accMul  } from "@utils";
export default {
  data() {
    return {
      accMul,
      approvalContentSuccess: {},
      showHint: false,
      remarks: "",
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
    refuse() {
      if (this.remarks) {
        let para = {
          isRelease: '1',
          id: this.shop.id,
          serviceType: this.shop.serviceType==21?'21':'22',
          remarks: this.remarks
        };
        this.Api.approveornot(para)
          .then(res => {
            if(res){
              this.$router.go(-1);
            }
            console.log("res",res);
            // this.$router.go(-1);
          });
      } else {
        this.$toast("请填写原因/备注");
      }
    },
    pass() {
      // if (this.remarks) {
        let para = {
          isRelease: '0',
          id: this.shop.id,
          serviceType: '1',
          remarks: this.remarks
        };
        this.Api.approveornot(para)
          .then(res => {
            if(res){
              this.$router.go(-1);
            }
            console.log("res",res);
            // this.$router.go(-1);
          });
      // } else {
      //   this.$toast("请填写原因/备注");
      // }
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
        console.log(this.approvalContent);
        console.log(this.approvalContentSuccess);
        if(this.approvalContent.storeAccount.idCard != this.approvalContent.store.bcUserIdCard && this.approvalContent.store.bcRegisterType==1){
          this.showHint = true
        }

        let businessRange=''

          for(let i=0;i<this.approvalContent.storeCategoryInside.parents.length;i++){
              businessRange=businessRange+'-'+this.approvalContent.storeCategoryInside.parents[i].name
          }
          businessRange=businessRange+'-'+this.approvalContent.storeCategoryInside.name
          this.approvalContent.store.businessRanges = businessRange.substr(1)

          let businessRangeSuccess=''
          for(let i=0;i<this.approvalContentSuccess.storeCategoryInside.parents.length;i++){
              businessRangeSuccess=businessRangeSuccess+'-'+this.approvalContentSuccess.storeCategoryInside.parents[i].name
          }
          businessRangeSuccess=businessRangeSuccess+'-'+this.approvalContentSuccess.storeCategoryInside.name
          this.approvalContentSuccess.store.businessRanges = businessRangeSuccess.substr(1)
        // this.approvalContent.store.businessRanges
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
  padding: 10px 15px;
  color: #f00;
}
.botto{
  z-index: 2000;
}
</style>
