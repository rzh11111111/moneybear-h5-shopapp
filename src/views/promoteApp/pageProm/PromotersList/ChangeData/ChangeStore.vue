<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <!--店铺不在这改，这里没做-->
    <van-collapse v-model="activeNames" v-if="change">
      <van-collapse-item title="状态信息" name="0" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0" />
        </div>
        <van-cell title="店铺启用" required disabled value-class="colorC0C0C0" />

        <van-cell title="店铺状态" value="正常" required disabled value-class="colorC0C0C0" />

        <van-field
          type="text"
          label="上级用户"
          :value="'省区总  '+(shop.managerCooperation.merManager.name || '')"
          required
          disabled
        ></van-field>
        <van-cell title="管辖区域" placeholder="请选择管辖区域" value=" " required v-if="!this.list"></van-cell>
        <!--:value="shop.managerDutyAreaConfigs[0].id"-->
        <van-cell
          title="管辖区域1"
          placeholder="请选择管辖区域"
          value=" "
          is-link
          required
          @click="area.onoff=!area.onoff;topheader.name='选择管辖区域';topheader.right9=false"
          v-else
        ></van-cell>
      </van-collapse-item>
      <van-collapse-item
        title="基本信息"
        name="1"
        value=" "
        value-class="collapsewarn"
        v-if="!this.list"
      >
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff1" />
        </div>
        <van-cell
          title="办公地址"
          placeholder="请选择办公地址"
          :value="shop.managerCooperation.officeName?shop.managerCooperation.officeName:' '"
          is-link
          required
          @click="address.onoff1=!address.onoff1"
        ></van-cell>
        <van-field
          label
          type="textarea"
          placeholder="请选择详细地址，门牌号......"
          v-model="shop.managerCooperation.officeAddress"
          name="address"
          v-validate="'required|length:3,50'"
          :error-message="errors.first('address')"
        ></van-field>
        <van-cell
          title="仓库地址"
          placeholder="请选择仓库地址"
          :value="shop.managerCooperation.warehouseName?shop.managerCooperation.warehouseName:' '"
          is-link
          required
          @click="address.onoff2=!address.onoff2"
        ></van-cell>
        <van-field
          label
          type="textarea"
          placeholder="请选择详细地址，门牌号......"
          v-model="shop.managerCooperation.warehouseAddress"
          name="address2"
          v-validate="'required|length:3,50'"
          :error-message="errors.first('address2')"
        ></van-field>
      </van-collapse-item>
      <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn" v-else>
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff1" />
        </div>
        <van-cell
          title="办公地址"
          placeholder="请选择办公地址"
          :value="shop.managerCooperation.officeName?shop.managerCooperation.officeName:' '"
          is-link
          required
          disabled
        ></van-cell>
        <van-field
          label
          type="textarea"
          placeholder="请选择详细地址，门牌号......"
          v-model="shop.managerCooperation.officeAddress"
          name="address"
          disabled
          v-validate="'required|length:3,50'"
          :error-message="errors.first('address')"
        ></van-field>
        <van-cell
          title="仓库地址"
          placeholder="请选择仓库地址"
          :value="shop.managerCooperation.warehouseName?shop.managerCooperation.warehouseName:' '"
          is-link
          required
          disabled
        ></van-cell>
        <van-field
          label
          type="textarea"
          placeholder="请选择详细地址，门牌号......"
          v-model="shop.managerCooperation.warehouseAddress"
          name="address2"
          disabled
          v-validate="'required|length:3,50'"
          :error-message="errors.first('address2')"
        ></van-field>
      </van-collapse-item>
      <van-collapse-item
        title="证照信息"
        name="2"
        value=" "
        value-class="collapsewarn"
        v-if="!this.list"
      >
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff2" />
        </div>
        <van-field
          type="text"
          label="营业执照号"
          v-model="shop.managerCooperation.bcCode"
          placeholder="请输入营业执照号"
          required
          name="bcCode"
          v-validate="'required|length:18'"
          :error-message="errors.first('bcCode')"
        ></van-field>
        <van-field
          type="text"
          label="名称"
          v-model="shop.name"
          placeholder="请输入名称"
          required
          name="name"
          v-validate="'required|length:1,15'"
          :error-message="errors.first('name')"
        ></van-field>
        <van-cell title="类型" required>
          <van-radio-group v-model="shop.managerCooperation.bcRegisterType" style="display: flex;">
            <van-radio name="1" style="margin-right: 20px;">个体商户</van-radio>
            <van-radio name="2">企业</van-radio>
          </van-radio-group>
        </van-cell>
        <van-cell
          title="有效截止日期"
          placeholder="请选择截止日期"
          :value="shop.managerCooperation.bcEndtime?shop.managerCooperation.bcEndtime:' '"
          @change="console.log('222')"
          is-link
          required
          @click="beendtime.onoff=!beendtime.onoff"
        ></van-cell>
        <van-cell title="证照" required>
          <one-not-cut
            class="notclickadd"
            @onenotcut="addbcPicUrl"
            :one-not-cut="shop.managerCooperation.bcPicUrl"
          ></one-not-cut>
        </van-cell>

        <div v-if="shop.managerCooperation.bcRegisterType==1" style="margin-top: 60px;">
          <van-field
            type="text"
            label="法人姓名"
            v-model="shop.managerCooperation.bcUserName"
            placeholder="请输入名称"
            required
            name="bcUserName"
            v-validate="'required|length:1,15'"
            :error-message="errors.first('bcUserName')"
          ></van-field>
          <van-field
            type="text"
            label="身份证号"
            v-model="shop.managerCooperation.bcUserIdCard"
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
              :one-not-cut="shop.managerCooperation.idCardJustUrl"
            ></one-not-cut>
            <one-not-cut
              @onenotcut="addidCardBackUrl"
              class="idback"
              :one-not-cut="shop.managerCooperation.idCardBackUrl"
            ></one-not-cut>
          </van-cell>
          <van-cell title="其他证件">
            <some-multiple
              @somemultiple="addidOthrCerUrl"
              number="8"
              :some-multiple="shop.managerCooperation.idOthrCerUrl"
            ></some-multiple>
          </van-cell>
        </div>
        <div v-if="shop.managerCooperation.bcRegisterType==2" style="margin-top: 60px;">
          <van-field
            type="text"
            label="法人姓名"
            v-model="shop.managerCooperation.bcUserName"
            placeholder="请输入名称"
          ></van-field>
          <van-field
            type="text"
            label="身份证号"
            maxlength="18"
            v-model="shop.managerCooperation.bcUserIdCard"
            placeholder="请输入身份证号"
          ></van-field>
          <van-cell title="身份证照">
            <one-not-cut
              @onenotcut="addidCardJustUrl"
              class="idjust"
              :one-not-cut="shop.managerCooperation.idCardJustUrl"
            ></one-not-cut>
            <one-not-cut
              @onenotcut="addidCardBackUrl"
              class="idback"
              :one-not-cut="shop.managerCooperation.idCardBackUrl"
            ></one-not-cut>
          </van-cell>
          <van-cell title="其他证件">
            <some-multiple
              @somemultiple="addidOthrCerUrl"
              number="8"
              :some-multiple="shop.managerCooperation.idOthrCerUrl"
            ></some-multiple>
          </van-cell>
        </div>
      </van-collapse-item>
      <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn" v-else>
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff2" />
        </div>
        <van-field
          type="text"
          label="营业执照号"
          v-model="shop.managerCooperation.bcCode"
          placeholder="请输入营业执照号"
          required
          name="bcCode"
          disabled
          v-validate="'required|length:18'"
          :error-message="errors.first('bcCode')"
        ></van-field>
        <van-field
          type="text"
          label="名称"
          v-model="shop.name"
          placeholder="请输入名称"
          required
          name="name"
          disabled
          v-validate="'required|length:1,15'"
          :error-message="errors.first('name')"
        ></van-field>
        <van-cell title="类型" required>
          <van-radio-group
            v-model="shop.managerCooperation.bcRegisterType"
            style="display: flex;"
            disabled
          >
            <van-radio name="1" style="margin-right: 20px;">个体商户</van-radio>
            <van-radio name="2">企业</van-radio>
          </van-radio-group>
        </van-cell>
        <van-cell
          title="有效截止日期"
          placeholder="请选择截止日期"
          :value="shop.managerCooperation.bcEndtime?shop.managerCooperation.bcEndtime:' '"
          @change="console.log('222')"
          is-link
          required
          disabled
        ></van-cell>
        <van-cell title="证照" required disabled>
          <!--<img  :src="shop.managerCooperation.bcPicUrl" v-if="shop.managerCooperation.bcPicUrl" @click="addbcPicUrl"/>-->
          <one-not-cut class="notclickadd" :one-not-cut="shop.managerCooperation.bcPicUrl"></one-not-cut>
        </van-cell>

        <div v-if="shop.managerCooperation.bcRegisterType==1" style="margin-top: 60px;">
          <van-field
            type="text"
            label="法人姓名"
            v-model="shop.managerCooperation.bcUserName"
            placeholder="请输入名称"
            required
            name="bcUserName"
            v-validate="'required|length:1,15'"
            :error-message="errors.first('bcUserName')"
          ></van-field>
          <van-field
            type="text"
            label="身份证号"
            v-model="shop.managerCooperation.bcUserIdCard"
            placeholder="请输入身份证号"
            required
            maxlength="18"
            name="bcUserIdcard"
            v-validate="'required|idcard'"
            :error-message="errors.first('bcUserIdcard')"
          ></van-field>
          <van-cell title="身份证照" required>
            <!--<one-not-cut @onenotcut="addbcPicUrl" :one-not-cut="shop.managerCooperation.bcPicUrl" ></one-not-cut>-->
            <one-not-cut
              class="idjust notclickadd"
              :one-not-cut="shop.managerCooperation.idCardJustUrl"
            ></one-not-cut>
            <one-not-cut
              class="idback notclickadd"
              :one-not-cut="shop.managerCooperation.idCardBackUrl"
            ></one-not-cut>
          </van-cell>
          <van-cell title="其他证件">
            <some-multiple
              class="notclickadd"
              number="8"
              :some-multiple="shop.managerCooperation.idOthrCerUrl"
            ></some-multiple>
          </van-cell>
        </div>
        <div v-if="shop.managerCooperation.bcRegisterType==2" style="margin-top: 60px;">
          <van-field
            type="text"
            label="法人姓名"
            v-model="shop.managerCooperation.bcUserName"
            placeholder="请输入名称"
          ></van-field>
          <van-field
            type="text"
            label="身份证号"
            maxlength="18"
            v-model="shop.managerCooperation.bcUserIdCard"
            placeholder="请输入身份证号"
          ></van-field>
          <van-cell title="身份证照">
            <one-not-cut
              class="idjust notclickadd"
              :one-not-cut="shop.managerCooperation.idCardJustUrl"
            ></one-not-cut>
            <one-not-cut
              class="idback notclickadd"
              :one-not-cut="shop.managerCooperation.idCardBackUrl"
            ></one-not-cut>
          </van-cell>
          <van-cell title="其他证件">
            <some-multiple
              class="notclickadd"
              number="8"
              :some-multiple="shop.managerCooperation.idOthrCerUrl"
            ></some-multiple>
          </van-cell>
        </div>
      </van-collapse-item>
      <van-button type="primary" size="large" @click="inputblur" class="submitbtn">提交审核</van-button>
    </van-collapse>
    <van-collapse v-model="activeNames" v-else>
      <van-collapse-item title="状态信息" name="0" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0" />
        </div>
        <van-cell title="店铺启用" disabled value-class="colorC0C0C0">
          <template slot="title">
            <span class="custom-text">店铺启用</span>
            <van-icon name="question-o" class="righticon" @click="question2(1)" />
          </template>
          <p v-if="shop.store.isEnable==0">启用</p>
          <p v-if="shop.store.isEnable==1">停用</p>
        </van-cell>
        <van-cell title="店铺状态" disabled value-class="colorC0C0C0">
          <template slot="title">
            <span class="custom-text">店铺状态</span>
            <van-icon name="question-o" class="righticon" @click="question2(2)" />
          </template>
          <p v-if="shop.store.platformStatus==1">正常</p>
          <p v-if="shop.store.platformStatus==2">关闭</p>
          <p v-if="shop.store.platformStatus==3">冻结</p>
        </van-cell>
        <van-field type="text" label="推广人" :value="shop.spreadRole+ '  ' +shop.spreadName" disabled></van-field>
        <van-cell title="商户老板" :value="shop.storeAccount.name" disabled value-class="colorC0C0C0"></van-cell>
      </van-collapse-item>
      <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff1" />
        </div>
        <van-cell title="店铺编码" :value="shop.store.code" value-class="colorC0C0C0" />
        <van-cell title="入驻时间" :value="shop.store.createTime" value-class="colorC0C0C0" />
        <van-cell title="店铺角色" :value="shop.store.type=='1'?'种子店':'特色店'" value-class="colorC0C0C0" />
        <van-cell title="店招名称" :value="shop.store.nickName" value-class="colorC0C0C0" />
        <van-cell title="店铺头像" disabled value-class="teadd">
          <one-cut :one-cut="shop.store.logo"></one-cut>
        </van-cell>
        <van-cell
          title="店铺地址"
          :value="shop.store.province+shop.store.city+shop.store.region"
          disabled
          value-class="colorC0C0C0"
        ></van-cell>
        <van-field label type="textarea" :value="shop.store.address" disabled></van-field>
      </van-collapse-item>
      <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff2" />
        </div>
        <van-field type="text" label="营业执照号" v-model="shop.store.bcCode" disabled></van-field>
        <van-field type="text" label="名称" v-model="shop.store.name" disabled></van-field>
        <van-cell title="类型" disabled value-class="colorC0C0C0">
          <div v-if="shop.store.bcRegisterType==1">个体商户</div>
          <div v-if="shop.store.bcRegisterType==2">企业</div>
        </van-cell>
        <van-cell title="有效截止日期" :value="shop.store.bcEndtime" disabled value-class="colorC0C0C0"></van-cell>
        <van-cell title="证照" disabled value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="shop.store.bcPicUrl"></one-not-cut>
        </van-cell>

        <div>
          <van-field type="text" label="法人姓名" :value="shop.store.bcUserName" disabled></van-field>
          <van-field type="text" label="身份证号" :value="shop.store.bcUserIdCard" disabled></van-field>
          <van-cell title="身份证照" disabled value-class="teadd">
            <one-not-cut class="idjust notclickadd" :one-not-cut="shop.store.idCardJustUrl"></one-not-cut>
            <one-not-cut class="idback notclickadd" :one-not-cut="shop.store.idCardBackUrl"></one-not-cut>
          </van-cell>
          <van-cell title="其他证件" value-class="teadd">
            <some-multiple class="notclickadd" number="8" :some-multiple="shop.store.idOthrCerUrl"></some-multiple>
          </van-cell>
        </div>
      </van-collapse-item>
      <van-collapse-item title="经营信息" name="3" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff3" />
        </div>
        <van-cell
          title="店铺分类"
          :value="shop.store.businessRanges"
          disabled
          value-class="colorC0C0C0"
        ></van-cell>
        <!-- <van-field type="tel" label="店铺折扣" :value="shop.store.rateConfig.storeRateBase" disabled>
          <div slot="button" v-if="shop.store.rateConfig.storeRateBase">折</div>
         
        </!--> 
        <!-- <van-cell
          title="营业时间"
          :value="shop.store.startTime+' - '+shop.store.endTime"
          disabled
          value-class="colorC0C0C0"
        ></van-cell> -->
        <van-field type="tel" label="店铺电话" v-model="shop.store.phone" disabled></van-field>
        <van-cell title="店铺环境" disabled value-class="teadd">
          <!--<some-cut class="notclickadd" :some-cut="shop.store.albums"></some-cut>-->
          <some-multiple class="notclickadd" :some-multiple="shop.store.albums"></some-multiple>
        </van-cell>
        <van-field type="textarea" label="店铺简介" v-model="shop.store.info" disabled></van-field>
      </van-collapse-item>
    </van-collapse>
    <van-popup v-model="address.onoff1" position="bottom">
      <van-area
        :area-list="address.areaList"
        @confirm="chooseaddress1"
        @cancel="address.onoff1=!address.onoff1"
      />
    </van-popup>
    <van-popup v-model="address.onoff2" position="bottom">
      <van-area
        :area-list="address.areaList"
        @confirm="chooseaddress2"
        @cancel="address.onoff2=!address.onoff2"
      />
    </van-popup>
    <van-popup v-model="area.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <choose-area :area="area" @callback="areas"></choose-area>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="beendtime.onoff" position="bottom">
      <van-datetime-picker
        type="date"
        :min-date="beendtime.minDate"
        @cancel="beendtime.onoff = false"
        @confirm="beendtimes"
      ></van-datetime-picker>
    </van-popup>
    <!--<start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>-->
  </div>
</template>

<script>
import chooseArea from '@/components/chooseArea/chooseArea'
import startEndTime from '@/components/startEndTime/startEndTime'
import oneCut from '@/components/addimg/oneCut'
import oneNotCut from '@/components/addimg/oneNotCut'
import someMultiple from '@/components/addimg/someMultiple'
import { format, arrToString, accMul, getAllAreas } from '@/utils'
import { Dialog } from 'vant'

export default {
  data () {
    return {
      topheader: {
        name: '资料信息',
        left: '3',
        heade: 'header1',
        right9: '1'
      },
      startendtime1: {
        title: '选择时间',
        type: 'time',
        onoff: false,
        starttime: '',
        endtime: ''
      },
      type: '',
      list: '',
      change: false, // 能否编辑
      activeNames: ['2', '1', '0', '3'], // 开哪个折叠
      activewarn: { // 哪个折叠的错误
        onoff0: false,
        onoff1: false,
        onoff2: false
      },
      address: { // 选择地址
        onoff1: false,
        onoff2: false,
        list: {},
        areaList: {}
      },
      area: {
        onoff: false,
        chooseno: true,
        arealist: [],
        userlist: []
      },
      beendtime: {
        onoff: false,
        minDate: new Date()
      },
      map: {
        onoff: false,
        location: '北京',
        keyword: '百度'
      },
      disabled: true, // 后退能否
      olddata: '',
      shop: { // 先写的同城，数据格式不一样，直接拿来当store
        spreadName: '',
        spreadRole: '',
        managerDutyAreaConfigs: [{ id: '840,860' }, { id: '830' }], // 0,辖区
        store: {
          isEnable: '', // 0,店铺启用不变
          status: '',
          platformStatus: '1', // 0,店铺状态不变
          spreadType: '', // 0,推广人类型
          spreadId: '', // 0,推广人id
          spreadName: '',
          type: '1', // 1,种子特色
          nickName: '', // 1,店铺名称
          logo: '', // 1,店铺头像
          province: '', // 1,省
          city: '', // 1,市
          region: '', // 1,区
          sysAreaConfigId: '',  //1,,区的id
          address: '', // 1,店铺详细地址
          longitude: '', // 1,经度
          latitude: '', // 1,纬度
          bcCode: '', // 2,营业执照号
          name: '', // 2,营业执照名字
          bcRegisterType: '2', // 2,工商类型
          bcEndtime: '', // 2,有效截止日期
          bcPicUrl: '', // 2,证照

          bcUserName: '', // 2,法人姓名
          bcUserIdCard: '', // 2,法人身份证号
          idCardJustUrl: '', // 2,法人身份证正面
          idCardBackUrl: '', // 2,法人身份证反面
          idOthrCerUrl: '', // 2,其他证件
          businessRange: '', // 3,店铺分类
          storeCategoryInsideId: '',  //3,店铺分类id
          stStoreCategoryIds: '333',  //瞎传
          rateConfig: {
            storeRatePlatform: '4', // 3,店铺平台服务费
            storeRateBase: '' // 3,店铺基准折扣
          },
          startTime: '', // 3,营业开始时间
          endTime: '', // 3,营业结束时间
          phone: '', // 3,店铺电话
          albums: '', // 3,店铺环境相册
          info: '', // 3,店铺简介
          newfont: '0', // 简介字数

        },
        storeAccount: {
          name: '', // 店铺账号归属人姓名
        },
        newfont: '0', // 简介字数
        areaConfig: {
          id: ''
        },

      }
    }
  },
  components: {
     startEndTime, oneCut, oneNotCut, someMultiple, chooseArea
  },
  watch: {
    // 'shop.info' () {
    //   if (this.shop.info !== undefined && this.shop.info !== null && this.shop.info.length > 200) {
    //     this.shop.info = this.shop.info.substr(0, this.shop.info.length - 1)
    //   } else if (this.shop.info !== undefined && this.shop.info !== null && this.shop.info.length > 0) {
    //     this.shop.newfont = this.shop.info !== undefined && this.shop.info !== null && this.shop.info.length
    //   }
    // }
  },
  methods: {
    getStoreCategory (obj) {
      if (!obj) {
        return;
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
    areas (msg) {
      this.shop.managerDutyAreaConfigs = msg
      this.area.onoff = false
      this.topheader.name = '资料信息'
    },
    addbcPicUrl (msg) {
      this.shop.managerCooperation.bcPicUrl = msg
    },
    addidCardJustUrl (msg) {
      this.shop.managerCooperation.idCardJustUrl = msg
    },
    addidCardBackUrl (msg) {
      this.shop.managerCooperation.idCardBackUrl = msg
    },
    addidOthrCerUrl (msg) {
      this.shop.managerCooperation.idOthrCerUrl = msg
    },
    question2 (msg) {
      if (msg == 1) {
        this.$dialog.alert({
          message: `启用：店铺正常营业<br>停用：店铺不能营业`
        })
      } else {
        this.$dialog.alert({
          message: `正常：订单收入能提现，店铺正常营业<br>冻结：订单收入不能提现，店铺正常营业<br>关闭：订单收入能提现，店铺不能营业`
        })
      }

    },
    chooseaddress1 (msg) {
      const filtered = this.address.list.filter(element => element.code == msg[2].code)
      this.shop.managerCooperation.areaOfficeId = filtered[0].id
      this.shop.managerCooperation.officeName = msg[0].name + msg[1].name + msg[2].name
      this.address.onoff1 = false
    },
    chooseaddress2 (msg) {
      const filtered = this.address.list.filter(element => element.code == msg[2].code)
      this.shop.managerCooperation.areaWarehouseId = filtered[0].id
      this.shop.managerCooperation.warehouseName = msg[0].name + msg[1].name + msg[2].name
      this.address.onoff2 = false
    },
    goback () {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '资料信息'
        this.topheader.right9 = true
      } else if (this.change) {
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
        })
      } else {
        this.$router.go(-1)
      }
    },
    /*   handleScroll () { // 自动收缩插件
         var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
         // var offsetTop = document.getElementsByClassName("van-collapse-item")[1].getBoundingClientRect().top
         let offsetTop = document.getElementsByClassName('van-collapse-item')
         for (let i = 1; i < offsetTop.length; i++) {
           if (offsetTop[i].getBoundingClientRect().top < 0) {
             this.removeByValue(this.activeNames, i - 1)
           }
           // console.log(offsetTop[1].getBoundingClientRect().top)
         }
         if (scrollTop > 600) {
           console.log('11')
         }
         // console.log(offsetTop,scrollTop)
         // if (scrollTop > offsetTop) {
         //   this.searchBarFixed = true
         // } else {
         //   this.searchBarFixed = false
         // }
       },*/
    removeByValue (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (Number(arr[i]) === Number(val)) {
          arr.splice(i, 1)
          break
        }
      }
    },
    inputblur () { // 点击提交
      let para = {
        id: this.shop.id,
        managerDutyAreaConfigs: this.shop.managerDutyAreaConfigs,
        // managerDutyAreaConfigs:[],
        managerCooperation: {
          areaOfficeId: this.shop.managerCooperation.areaOfficeId == this.olddata.managerCooperation.areaOfficeId ? '' : this.shop.managerCooperation.areaOfficeId,
          officeAddress: this.shop.managerCooperation.officeAddress == this.olddata.managerCooperation.officeAddress ? '' : this.shop.managerCooperation.officeAddress,
          areaWarehouseId: this.shop.managerCooperation.areaWarehouseId == this.olddata.managerCooperation.areaWarehouseId ? '' : this.shop.managerCooperation.areaWarehouseId,
          warehouseAddress: this.shop.managerCooperation.warehouseAddress == this.olddata.managerCooperation.warehouseAddress ? '' : this.shop.managerCooperation.warehouseAddress,
          bcCode: this.shop.managerCooperation.bcCode == this.olddata.managerCooperation.bcCode ? '' : this.shop.managerCooperation.bcCode,
          bcPicUrl: this.shop.managerCooperation.bcPicUrl == this.olddata.managerCooperation.bcPicUrl ? '' : this.shop.managerCooperation.bcPicUrl,
          bcRegisterType: this.shop.managerCooperation.bcRegisterType == this.olddata.managerCooperation.bcRegisterType ? '' : Number(this.shop.managerCooperation.bcRegisterType),
          bcEndtime: this.shop.managerCooperation.bcEndtime == this.olddata.managerCooperation.bcEndtime ? '' : this.shop.managerCooperation.bcEndtime,
          nameCooperation: this.shop.managerCooperation.nameCooperation == this.olddata.managerCooperation.nameCooperation ? '' : this.shop.managerCooperation.nameCooperation,
          bcUserIdCard: this.shop.managerCooperation.bcUserIdCard == this.olddata.managerCooperation.bcUserIdCard ? '' : this.shop.managerCooperation.bcUserIdCard,
          idCardJustUrl: this.shop.managerCooperation.idCardJustUrl == this.olddata.managerCooperation.idCardJustUrl ? '' : this.shop.managerCooperation.idCardJustUrl,
          idCardBackUrl: this.shop.managerCooperation.idCardBackUrl == this.olddata.managerCooperation.idCardBackUrl ? '' : this.shop.managerCooperation.idCardBackUrl,
          idOthrCerUrl: this.shop.managerCooperation.idOthrCerUrl == this.olddata.managerCooperation.idOthrCerUrl ? '' : this.shop.managerCooperation.idOthrCerUrl
        }
      }
      this.Api.changeTogether(para).then(res => {
        console.log(res.data)
        if (res.data.status == 1) {  //去结果页
          // this.$router.replace('/ApplyResult')
          this.$router.push({ path: '/ApplyResult', query: { result: '提交申请成功，正在审核中',redresult:'审核结果，将消息通知申请者' } })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    beendtimes (value) {
      this.shop.managerCooperation.bcEndtime = this.$options['filters'].format(value, 'yyyy.MM.dd')
      this.beendtime.onoff = false
      console.log(this.$options['filters'].format(value, 'yyyy.MM.dd'))
      // this.shop.managerCooperation.activeTime = format(value, 'yyyy-MM-dd hh:mm:ss')
      // this.shop.managerCooperation.invalidTime = format(value, 'yyyy-MM-dd hh:mm:ss')
      console.log(format(value, 'yyyy-MM-dd hh:mm:ss'))
    },
    times (msg) { // 时间插件的事件
      if (msg.oldtime) {
        console.log('确定')
      } else {
        console.log('取消')
      }
      // this.newdata.store.startTime=msg.oldtime
      // this.newdata.store.endTime=msg.newtime
      this.startendtime1.onoff = msg.onoff
      this.shop.startTime = msg.oldtime
      this.shop.endTime = msg.newtime
      console.log(msg.oldtime, msg.newtime, msg.onoff)
    }

  },
  // watch: {
  //   "shop.managerCooperation.bcRegisterType" () {
  //      console.log(typeof parseInt(this.shop.managerCooperation.bcRegisterType),parseInt(this.shop.managerCooperation.bcRegisterType))
  //   }
  // },
  mounted () {

    this.Api.allArea({}).then(res => {
      if (res.data.data) {
        this.address.list = res.data.data.list

        this.address.areaList = getAllAreas(res.data.data)
      } else {
        return false
      }
    })


    this.type = sessionStorage.getItem('accountType')
    if (this.type == 3 || this.$route.query.list != null) {
      this.topheader.right9 = false;
    }
    this.list = this.$route.query.list
    // let para = this.$route.query.id, // 0,挂靠合作商id
    this.name = sessionStorage.getItem('accountName')
    /*let formdata = new FormData()
    formdata.set('storeId', this.$route.query.id)*/
    let para = {
      storeId: this.$route.query.id
    }
    this.Api.storeDetail(para).then(res => {
      // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
      // setToken(res.data.phone)
      // this.shop.logo = res.data.url
      // res.data.data.managerCooperation.bcRegisterType=res.data.data.managerCooperation.bcRegisterType.toString()//数字转字符串
      console.log(res.data.data)
      this.olddata = res.data.data
      this.shop = JSON.parse(JSON.stringify(res.data.data)),
        this.olddata.store.rateConfig.storeRateBase = accMul(this.olddata.store.rateConfig.storeRateBase, 10)
      this.shop.store.rateConfig.storeRateBase = accMul(this.shop.store.rateConfig.storeRateBase, 10)
      //   for (let o = 0, len = this.shop.managerDutyAreaConfigs; o < len.length; o++) {
      //     this.area.userlist.push(len[o].areaConfig.id)
      //
      //
      //   }
      //
      // this.shop.managerCooperation.officeName = '1'
      let businessRange = ''
      if (this.shop.storeCategoryInside) {
        for (let i = 0; i < this.shop.storeCategoryInside.parents.length; i++) {
          businessRange = businessRange + '-' + this.shop.storeCategoryInside.parents[i].name
        }
        businessRange = businessRange + '-' + this.shop.storeCategoryInside.name
        this.shop.store.businessRanges = businessRange.substr(1)
      }
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    })
    // window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
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
}
.changebtn /deep/ img {
  width: 15px;
  height: 15px;
}
</style>
