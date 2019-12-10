<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>

    <van-collapse v-model="activeNames" v-if="change">
      <van-collapse-item title="状态信息" name="0" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0" />
        </div>
        <van-cell title="账号启用" disabled value-class="colorC0C0C0">
          <!--<van-radio-group :value="shop.managerCooperation.merManager.isEnable" style="display: flex;" >-->
          <!--<van-radio name='1' style="margin-right: 20px;" >启用</van-radio>-->
          <!--<van-radio name='2' >停用</van-radio>-->
          <!--</van-radio-group>-->
          启用
        </van-cell>
        <van-cell title="账号状态" disabled value-class="colorC0C0C0">
          <!--<van-radio-group :value="shop.managerCooperation.merManager.status" style="display: flex;">-->
          <!--<van-radio name="1" style="margin-right: 20px;">正常</van-radio>-->
          <!--<van-radio name="2" style="margin-right: 20px;">关闭</van-radio>-->
          <!--<van-radio name="3" >冻结</van-radio>-->
          <!--</van-radio-group>-->
          正常
        </van-cell>

        <van-field
          type="text"
          label="上级用户"
          :value="'省区总  '+(shop.managerCooperation.merManager.name || '')"
          disabled
        ></van-field>
        <van-cell title="管辖区域" placeholder="请选择管辖区域" value=" " required v-if="!list"></van-cell>
        <!--:value="shop.managerDutyAreaConfigs[0].id"-->
        <van-cell
          title="管辖区域1"
          placeholder="请选择管辖区域"
          value=" "
          is-link
          required
          @click="area.onoff=!area.onoff;topheader.name='选择管辖区域'"
          v-else
        ></van-cell>
      </van-collapse-item>
      <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn" v-if="!list">
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
          :value="shop.managerCooperation.officeName?shop.managerCooperation.officeName:' '"
          is-link
          disabled
        ></van-cell>
        <van-field
          label
          type="textarea"
          v-model="shop.managerCooperation.officeAddress"
          name="address"
          disabled
          v-validate="'required|length:3,50'"
          :error-message="errors.first('address')"
        ></van-field>
        <van-cell
          title="仓库地址"
          :value="shop.managerCooperation.warehouseName?shop.managerCooperation.warehouseName:' '"
          is-link
          disabled
        ></van-cell>
        <van-field
          label
          type="textarea"
          v-model="shop.managerCooperation.warehouseAddress"
          name="address2"
          disabled
          v-validate="'required|length:3,50'"
          :error-message="errors.first('address2')"
        ></van-field>
      </van-collapse-item>
      <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn" v-if="!list">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff2" />
        </div>
        <van-field
          type="number"
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
          <one-not-cut @onenotcut="addbcPicUrl" :one-not-cut="shop.managerCooperation.bcPicUrl"></one-not-cut>
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
          type="number"
          label="营业执照号"
          v-model="shop.managerCooperation.bcCode"
          name="bcCode"
          disabled
          v-validate="'required|length:18'"
          :error-message="errors.first('bcCode')"
        ></van-field>
        <van-field
          type="text"
          label="名称"
          v-model="shop.name"
          name="name"
          disabled
          v-validate="'required|length:1,15'"
          :error-message="errors.first('name')"
        ></van-field>
        <van-cell title="类型">
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
          :value="shop.managerCooperation.bcEndtime?shop.managerCooperation.bcEndtime:' '"
          @change="console.log('222')"
          is-link
          disabled
        ></van-cell>
        <van-cell title="证照" disabled>
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
            maxlength="18"
            required
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
        <van-cell title="账号启用" value-class="colorC0C0C0">
          <template slot="title">
            <span class="custom-text">账号启用</span>
            <van-icon name="question-o" class="righticon" @click="question2(1)" />
          </template>
          <p v-if="shop.isEnable==0">启用</p>
          <p v-if="shop.isEnable==1">停用</p>
        </van-cell>
        <van-cell title="账号状态" value-class="colorC0C0C0">
          <template slot="title">
            <span class="custom-text">账号状态</span>
            <van-icon name="question-o" class="righticon" @click="question2(2)" />
          </template>
          <p v-if="shop.status==1">正常</p>
          <p v-if="shop.status==2">关闭</p>
          <p v-if="shop.status==3">冻结</p>
        </van-cell>
        <van-field
          type="text"
          label="推广人"
          :value="'推广员  '+shop.spreadUsername"
          v-if="shop.spreadType==1"
          disabled
        ></van-field>
        <van-field
          type="text"
          label="推广人"
          :value="'合作商  '+shop.spreadUsername"
          v-if="shop.spreadType==2"
          disabled
        ></van-field>
        <van-field
          type="text"
          label="推广人"
          :value="'省区总  '+shop.spreadUsername"
          v-if="shop.spreadType==3"
          disabled
        ></van-field>
        <van-field
          type="text"
          label="推广人"
          :value="'店主  '+shop.spreadUsername"
          v-if="shop.spreadType==4"
          disabled
        ></van-field>
        <van-cell
          title="结算方式"
          value="售后期关闭后结算(可提现)"
          v-if="shop.settleType==1"
          value-class="colorC0C0C0"
          disabled
        ></van-cell>
        <van-cell title="结算方式" value="发货后次日结算(可提现)" value-class="colorC0C0C0" v-else disabled></van-cell>
        <!--:value="shop.managerDutyAreaConfigs[0].id"-->
      </van-collapse-item>
      <van-collapse-item title="经营信息" name="1" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff1" />
        </div>
        <van-cell
          title="类别"
          value="企业"
          v-if="shop.shopInfo.companyType==1"
          value-class="colorC0C0C0"
        ></van-cell>
        <van-cell
          title="类别"
          value="代理商"
          v-if="shop.shopInfo.companyType==2"
          value-class="colorC0C0C0"
        ></van-cell>
        <van-cell
          title="经营品牌"
          :value="shop.brandIdList && shop.brandIdList[0] ? shop.brandIdList[0].name : ''"
          value-class="colorC0C0C0"
        ></van-cell>
      </van-collapse-item>
      <van-collapse-item title="基本信息" name="2" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff1" />
        </div>
        <van-cell title="店铺编码" :value="shop.code" value-class="colorC0C0C0"></van-cell>
        <van-cell title="入驻时间" :value="shop.approvalTime" value-class="colorC0C0C0"></van-cell>
        <van-field type="text" label="店铺角色" value="同城企业" disabled></van-field>
        <van-field type="text" label="店铺名称" v-model="shop.nickName" disabled></van-field>
        <van-cell title="店铺头像" disabled value-class="teadd">
          <one-cut class="notclickadd" :one-cut="shop.logoUrl"></one-cut>
        </van-cell>
        <van-cell
          title="企业地址"
          :value="(shop.province || '')+(shop.city || '')+(shop.region || '')"
          value-class="colorC0C0C0"
        ></van-cell>
        <van-field label type="text" class="tetitle" v-model="shop.shopInfo.address" disabled></van-field>

        <div v-if="shop.city" class="provincete">同城商品将面向(定位为{{shop.city}})的用户投放</div>
        <div v-else class="provincete">同城商品将面向(定位为 )的用户投放</div>
      </van-collapse-item>

      <van-collapse-item title="证照信息" name="3" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff2" />
        </div>
        <van-field type="text" label="营业执照号" v-model="shop.shopInfo.bcCode" disabled></van-field>
        <van-field type="text" label="名称" v-model="shop.shopInfo.name" disabled></van-field>
        <van-cell title="类型" value-class="colorC0C0C0">
          <div v-if="shop.shopInfo.bcRegisterType==1">个体商户</div>
          <div v-if="shop.shopInfo.bcRegisterType==2">企业</div>
        </van-cell>
        <van-cell
          title="有效截止日期"
          :value="shop.shopInfo.bcEndtime"
          value-class="colorC0C0C0"
          disabled
        ></van-cell>
        <van-cell title="证照" value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="shop.shopInfo.bcPicUrl"></one-not-cut>
        </van-cell>
        <van-field type="text" label="法人姓名" v-model="shop.shopInfo.bcUserName" disabled></van-field>
        <van-field type="text" label="身份证号" v-model="shop.shopInfo.bcUserIdcard" disabled></van-field>
        <van-cell title="身份证照" value-class="teadd">
          <one-not-cut class="notclickadd" :one-not-cut="shop.shopInfo.idCardJustUrl"></one-not-cut>
          <one-not-cut class="notclickadd" :one-not-cut="shop.shopInfo.idCardBackUrl"></one-not-cut>
        </van-cell>
        <van-cell title="其他证件" value-class="teadd">
          <some-multiple class="notclickadd" number="8" :some-multiple="shop.shopInfo.bcPicUrls"></some-multiple>
        </van-cell>
      </van-collapse-item>
      <van-collapse-item title="通讯录" name="4" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff3" />
        </div>
        <div v-for="(c, inx) in communicationList" :key="inx">
          
            <div v-for="(item) in shop.shopCommunicationBookList" :key="item.role" >
              <template  v-if="item.role === c">
              <div v-if="item.must" class="te">{{item.role}}</div>
              <div v-if="!item.must" class="local-list-title">{{item.role}}</div>
              <van-field type="text" label="姓名" v-model="item.name" disabled></van-field>
              <van-field type="tel" label="手机号" v-model="item.phone" disabled></van-field>
              <van-field type="text" label="微信" v-model="item.wechat" disabled></van-field>
              <van-field
                type="text"
                label="邮箱"
                v-if="item.email==''||item.email"
                v-model="item.email"
                disabled
              ></van-field>
               </template>
            </div>
         
        </div>
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
        :max-date="beendtime.maxDate"
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
// import address from '@/utils/sys_area_config'
import { format } from '@/utils'
import { Dialog } from 'vant'

export default {
  data () {
    return {
      topheader: {
        name: '资料信息',
        left: '3',
        heade: 'header1'
      },
      startendtime1: {
        title: '编辑营业时间',
        type: 'time',
        onoff: false,
        starttime: '',
        endtime: ''
      },
      type: '',
      list: '',
      change: false, // 能否编辑
      activeNames: ['2', '1', '0', '3', '4'], // 开哪个折叠
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
        minDate: new Date(),
        maxDate: new Date(2070, 1, 1),
      },
      map: {
        onoff: false,
        location: '北京',
        keyword: '百度'
      },
      disabled: true, // 后退能否
      olddata: '',
      communicationList: ['项目负责人', '省钱熊平台对接人', '物流对接人', '财务对接人', '售后专员1', '售后专员2'],
      shop: {
        spreadUsername: '',
        charactar: 3, // 给createfirst组件区分是创建谁 1.合作商推广员 2.种子特色 3.同城
        isEnable: '1',
        status: '1',
        spreadType: '', // 0,推广人类型
        spreadId: '', // 0,推广人id
        type: '2',
        province: '',
        city: '',
        region: '',
        phone: '',
        jingyingpp: '',
        nickName: '',
        logoUrl: '', // 店铺头像
        areaConfig: {},
        rateConfig: {
          storeRatePlatform: '0.8' //平台服务费
        },
        shopInfo: {
          bcRegisterType: '2', // 工商类型
          address: '',
          bcCode: '',
          name: '',
          companyType: '',
          bcEndtime: '',
          bcPicUrl: '',
          bcUserName: '',
          bcUserIdCard: '',
          idCardJustUrl: '',
          idCardBackUrl: '',
          bcPicUrls: '',
          invoiceEmail: '',
          phone: '18202485874'
        },
        shopBankrollAccount: {
          status: 1 //店铺资金账号状态
        },
        shopCommunicationBookList: [
          {
            role: '项目负责人',
            name: '',
            phone: '',
            wechat: '',
            email: '',
            must: true
          },
          {
            role: '省钱熊平台对接人',
            name: '',
            phone: '',
            wechat: '',
            email: '',
            must: true
          },
          {
            role: '物流对接人',
            name: '',
            phone: '',
            wechat: '',
            email: '',
            must: true
          },
          {
            role: '财务对接人',
            name: '',
            phone: '',
            wechat: '',
            must: true
          },
          {
            role: '售后专员1',
            name: '',
            phone: '',
            wechat: '',
            must: true
          },
          {
            role: '售后专员2',
            name: '',
            phone: '',
            wechat: '',
            must: false
          }
        ],
        brandIdList: [],
        verifyCode: '',
        remarks: ''
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
    areas (msg) {
      console.log(msg)
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
    chooseaddress1 (msg) {
      const filtered = this.address.list.RECORDS.filter(element => element.code == msg[2].code)
      this.shop.managerCooperation.areaOfficeId = filtered[0].id
      this.shop.managerCooperation.officeName = msg[0].name + msg[1].name + msg[2].name
      this.address.onoff1 = false
    },
    chooseaddress2 (msg) {
      const filtered = this.address.list.RECORDS.filter(element => element.code == msg[2].code)
      this.shop.managerCooperation.areaWarehouseId = filtered[0].id
      this.shop.managerCooperation.warehouseName = msg[0].name + msg[1].name + msg[2].name
      this.address.onoff2 = false
    },
    goback () {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '资料信息'
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
    question2 (msg) {
      if (msg == 1) {
        this.$dialog.alert({
          message: `启用：账号能登录系统<br>停用：账号不能登录系统。名下店铺不能营业`
        })
      } else {
        this.$dialog.alert({
          message: `正常：订单收入能提现，店铺正常营业<br>冻结：订单收入不能提现，店铺正常营业<br>关闭：订单收入能提现，店铺不能营业`
        })
      }

    },
    /* handleScroll () { // 自动收缩插件
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
          this.$router.push({ path: '/ApplyResult', query: { result: '修改申请提交成功' } })
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
    /* this.address.list = address
     let areaObj = {
       province_list: {},
       city_list: {},
       county_list: {}
     }
     address.RECORDS.map(i => {
       if (i.area_level == 1) {
         areaObj.province_list[i.code] = i.name
       }
       if (i.area_level == 2) {
         areaObj.city_list[i.code] = i.name
       }
       if (i.area_level == 3) {
         areaObj.county_list[i.code] = i.name
       }
     })
     console.log('areaObj', areaObj)
     this.address.areaList = areaObj*/

    this.type = sessionStorage.getItem('accountType')
    this.list = this.$route.query.list
    // let para = this.$route.query.id, // 0,挂靠合作商id
    this.name = sessionStorage.getItem('accountName')

    // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
    // setToken(res.data.phone)
    // this.shop.logo = res.data.url
    // res.data.data.managerCooperation.bcRegisterType=res.data.data.managerCooperation.bcRegisterType.toString()//数字转字符串
    /*let formdata=new FormData();
    formdata.set("id",this.$route.query.id);*/
    let para = {
      id: this.$route.query.id
    }
    this.Api.localDetail(para).then(res => {
      // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
      // setToken(res.data.phone)
      // this.shop.logo = res.data.url
      this.olddata = res.data.data
      this.shop = JSON.parse(JSON.stringify(res.data.data)),
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
.provincete {
  font-size: 12px;
  text-align: center;
}
.typete {
  font-size: 12px;
  margin: 4px 8px;
}
.local-list-title {
  font-size: 16px;
  margin-left: 15px;
  font-weight: 800;
  color: #999;
}
</style>
