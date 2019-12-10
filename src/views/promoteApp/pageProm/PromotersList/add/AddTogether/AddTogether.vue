<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div v-show="steps==1" class="anzhuotop">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="状态信息" name="0" value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff0" />
          </div>
          <van-cell title="账号启用" required>
            <template slot="title">
              <span class="custom-text">账号启用</span>
              <van-icon name="question-o" class="righticon" @click="question(1)" />
            </template>
            <van-radio-group value="1" disabled style="display: flex;">
              <van-radio name="1" style="margin-right: 20px;">启用</van-radio>
              <van-radio name="2">停用</van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell title="账号状态" required disabled>
            <template slot="title">
              <span class="custom-text">账号状态</span>
              <van-icon name="question-o" class="righticon" @click="question(2)" />
            </template>
            <van-radio-group value="1" disabled style="display: flex;">
              <van-radio name="1" style="margin-right: 20px;">正常</van-radio>
              <van-radio name="2" style="margin-right: 20px;">关闭</van-radio>
              <van-radio name="3">冻结</van-radio>
            </van-radio-group>
          </van-cell>

          <van-field
            type="text"
            label="上级用户"
            :value="'省区总  '+shop.managerCooperation.spreadName"
            required
            readonly
          ></van-field>
          <van-cell
            title="管辖区域"
            placeholder="请选择管辖区域"
            value="请选择管辖区域"
            is-link
            required
            value-class="colorC0C0C0"
            v-if="shop.managerDutyAreaConfigs.length==0"
            @click="area.onoff=!area.onoff;topheader.name='选择管辖区域';topheader.right11=false"
          ></van-cell>
          <van-cell
            title="管辖区域"
            placeholder="请选择管辖区域"
            :value="'已选择'+shop.managerDutyAreaConfigs.length + '个区域'"
            is-link
            required
            v-else
            @click="area.onoff=!area.onoff;topheader.name='选择管辖区域';topheader.right11=false"
          ></van-cell>
        </van-collapse-item>
        <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff1" />
          </div>
          <van-cell
            title="办公地址"
            placeholder="请选择办公地址"
            value="请选择办公地址"
            value-class="colorC0C0C0"
            v-if="!shop.managerCooperation.officeName"
            is-link
            required
            @click="address.onoff1=!address.onoff1"
          ></van-cell>
          <van-cell
            title="办公地址"
            placeholder="请选择办公地址"
            :value="shop.managerCooperation.officeName"
            v-else
            is-link
            required
            @click="address.onoff1=!address.onoff1"
          ></van-cell>
          <van-field
            label
            type="text"
            class="tetitle"
            placeholder="请选择详细地址，如道路.门牌号等信息"
            v-model="shop.managerCooperation.officeAddress"
            name="address"
            v-validate="'required|emoji:3,50'"
            :error-message="errors.first('address')"
          ></van-field>

          <van-cell
            title="仓库地址"
            value-class="colorC0C0C0"
            v-if="!shop.managerCooperation.warehouseName"
            value="请选择仓库地址"
            is-link
            required
            @click="address.onoff2=!address.onoff2"
          ></van-cell>
          <van-cell
            title="仓库地址"
            placeholder="请选择仓库地址"
            v-else
            :value="shop.managerCooperation.warehouseName"
            is-link
            required
            @click="address.onoff2=!address.onoff2"
          ></van-cell>
          <van-field
            label
            type="text"
            class="tetitle"
            placeholder="请选择详细地址，如道路.门牌号等信息"
            v-model="shop.managerCooperation.warehouseAddress"
            name="address2"
            v-validate="'required|emoji:3,50'"
            :error-message="errors.first('address2')"
          ></van-field>
        </van-collapse-item>
        <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn">
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
            name="bccode"
            v-validate="'bccode'"
            :error-message="errors.first('bccode')"
          ></van-field>
          <van-field
            type="text"
            label="名称"
            v-model="shop.name"
            placeholder="请输入名称"
            required
            name="name"
            v-validate="'required|emoji:1,30'"
            :error-message="errors.first('name')"
          ></van-field>
          <van-cell title="类型" required>
            <van-radio-group
              v-model="shop.managerCooperation.bcRegisterType"
              style="display: flex;"
            >
              <van-radio name="1" style="margin-right: 20px;">个体商户</van-radio>
              <van-radio name="2">企业</van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell
            title="有效截止日期"
            value="请选择截止日期"
            v-if="!shop.managerCooperation.bcEndtime&&!longtime"
            value-class="colorC0C0C0"
            is-link
            required
            @click="beendtime.onoff=!beendtime.onoff"
          >
            <div slot="right-icon">
              <van-checkbox
                v-model="longtime"
                @click.native.stop="longtimeclick"
                @change="longtimeclick"
              >长期</van-checkbox>
            </div>
          </van-cell>
          <van-cell
            title="有效截止日期"
            placeholder="请选择截止日期"
            :value="shop.managerCooperation.bcEndtime"
            v-else-if="shop.managerCooperation.bcEndtime&&!longtime"
            is-link
            required
            @click="beendtime.onoff=!beendtime.onoff"
          >
            <div slot="right-icon">
              <van-checkbox
                v-model="longtime"
                @click.native.stop="longtimeclick"
                @change="longtimeclick"
              >长期</van-checkbox>
            </div>
          </van-cell>
          <van-cell title="有效截止日期" placeholder="请选择截止日期" value="长期" v-else required>
            <div slot="right-icon">
              <van-checkbox
                v-model="longtime"
                @click.native.stop="longtimeclick"
                @change="longtimeclick"
              >长期</van-checkbox>
            </div>
          </van-cell>
          <van-cell title="证照">
            <div slot="title" class="requireds">证照</div>
            <div slot="label" class="bluecolor" @click="$refs.example.changes(2)">查看示例</div>
            <one-not-cut
              @onenotcut="addbcPicUrl"
              :one-not-cut="shop.managerCooperation.bcPicUrl"
              filecode="FILE19011295718743"
            ></one-not-cut>
          </van-cell>

          <div v-if="shop.managerCooperation.bcRegisterType==1">
            <van-field
              type="text"
              label="法人姓名"
              v-model="shop.managerCooperation.bcUserName"
              placeholder="请输入名称"
              required
              name="bcUserName"
              v-validate="'required|emoji:1,15'"
              :error-message="errors.first('bcUserName')"
            ></van-field>
            <van-field
              type="text"
              label="身份证号"
              v-model="shop.managerCooperation.bcUserIdcard"
              placeholder="请输入身份证号"
              required
              maxlength="18"
              name="bcUserIdcard"
              v-validate="'required|idcard'"
              :error-message="errors.first('bcUserIdcard')"
            ></van-field>
            <van-cell title="身份证照">
              <div slot="title" class="requireds">身份证照</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(3)">查看示例</div>
              <one-not-cut
                @onenotcut="addidCardJustUrl"
                class="idjust"
                :one-not-cut="shop.managerCooperation.idCardJustUrl"
                filecode="FILE19011295718743"
              ></one-not-cut>
              <one-not-cut
                @onenotcut="addidCardBackUrl"
                class="idback"
                :one-not-cut="shop.managerCooperation.idCardBackUrl"
                filecode="FILE19011295718743"
              ></one-not-cut>
            </van-cell>
            <van-cell title="其他证件">
              <div slot="title">其他证件</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(4)">查看示例</div>
              <some-multiple
                @somemultiple="addidOthrCerUrl"
                number="8"
                :some-multiple="shop.managerCooperation.idOthrCerUrl"
                filecode="FILE19011295718743"
              ></some-multiple>
            </van-cell>
          </div>
          <div v-if="shop.managerCooperation.bcRegisterType==2">
            <van-field
              type="text"
              label="法人姓名"
              v-model="shop.managerCooperation.bcUserName"
              placeholder="请输入名称"
            ></van-field>
            <van-field
              type="text"
              label="身份证号"
              v-model="shop.managerCooperation.bcUserIdcard"
              placeholder="请输入身份证号"
              maxlength="18"
              @blur="bluridcard"
              :error-message="idcards"
            ></van-field>
            <van-cell title="身份证照">
              <div slot="title">身份证照</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(3)">查看示例</div>
              <one-not-cut
                @onenotcut="addidCardJustUrl"
                class="idjust"
                :one-not-cut="shop.managerCooperation.idCardJustUrl"
                filecode="FILE19011295718743"
              ></one-not-cut>
              <one-not-cut
                @onenotcut="addidCardBackUrl"
                class="idback"
                :one-not-cut="shop.managerCooperation.idCardBackUrl"
                filecode="FILE19011295718743"
              ></one-not-cut>
            </van-cell>
            <van-cell title="其他证件">
              <div slot="title">其他证件</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(4)">查看示例</div>
              <some-multiple
                @somemultiple="addidOthrCerUrl"
                number="8"
                :some-multiple="shop.managerCooperation.idOthrCerUrl"
                filecode="FILE19011295718743"
              ></some-multiple>
            </van-cell>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div v-show="steps==2" class="steps2">
      <van-cell-group>
        <van-cell title="费率">
          <div slot="icon" class="vant-collapse-icon"></div>
        </van-cell>
        <van-cell
          title="管辖区域内种子商户,特色商户平台销售额的"
          value="0.3%"
          title-class="leftcolor"
          value-class="rightcolor"
        />
        <van-cell
          title="管辖区域内同城企业平台销售额的"
          label="注：自己开发的不重复提成，最多就0.3%提成"
          value="0.3%"
          title-class="leftcolor"
          value-class="rightcolor"
        />
        <van-cell
          title="配送平台商品，获得该商品订单价格的"
          label="注：配送费由商品所属企业承担"
          value="3%"
          title-class="leftcolor"
          value-class="rightcolor"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          title="合同起止时间"
          placeholder="请选择合同起止时间"
          :value="startendtime1.starttime+'至'+startendtime1.endtime"
          is-link
          v-if="shop.managerCooperation.activeTime"
          @click="startendtime1.onoff=!startendtime1.onoff"
        >
          <div slot="icon" class="vant-collapse-icon"></div>
        </van-cell>
        <van-cell
          title="合同起止时间"
          placeholder="请选择合同起止时间"
          value="请选择合同时间"
          value-class="colorC0C0C0"
          is-link
          v-else
          @click="startendtime1.onoff=!startendtime1.onoff"
        >
          <div slot="icon" class="vant-collapse-icon"></div>
        </van-cell>
        <van-cell title="合同照片">
          <div slot="icon" class="vant-collapse-icon"></div>
        </van-cell>
        <div class="hetongnote">注：必须包含首页,费率页,合作期限页,签章页。</div>
        <van-cell title class="hetong">
          <some-multiple
            @somemultiple="addcontractPicUrls"
            number="8"
            :some-multiple="shop.managerCooperation.contractPicUrls"
            filecode="FILE19011295718743"
          ></some-multiple>

          <!--<contract @somemultiple="addcontractPicUrls" number="8" ref="contractPicUrls" :some-multiple="shop.managerCooperation.contractPicUrls"  filecode="FILE19011295718743"></contract>-->
        </van-cell>
      </van-cell-group>
    </div>
    <div v-show="steps==3">
      <create-first :create-first="shop" ref="createf"></create-first>
    </div>
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
          <choose-area :area="area" @callback="areas" ref="area"></choose-area>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="beendtime.onoff" position="bottom">
      <van-datetime-picker
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="beendtime.onoff = false"
        @confirm="beendtimes"
      ></van-datetime-picker>
    </van-popup>
    <goback-save ref="gobackSave"></goback-save>
    <example ref="example"></example>

    <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
    <footer class="botto" v-show="area.onoff&&area.chooseno&&area.list">
      <van-button size="large" type="primary" class="submitbtn" @click="getCheckedKeys">确认</van-button>
    </footer>
    <van-button
      type="primary"
      size="large"
      @click="inputblur"
      class="submitbtn"
      v-if="steps==allsteps"
    >提交审核</van-button>

    <van-button
      type="primary"
      size="large"
      @click="inputblur"
      class="submitbtn"
      v-else
    >下一步({{steps}}/{{allsteps}})</van-button>
  </div>
</template>

<script>
import createFirst from '@components/createFirst/createFirst'
import chooseArea from '@components/chooseArea/chooseArea'
import startEndTime from '@components/startEndTime/startEndTime'
import oneCut from '@components/addimg/oneCut'
import oneNotCut from '@components/addimg/oneNotCut'
import someMultiple from '@components/addimg/someMultiple'
import contract from '@components/addimg/contract'
import example from '@/components/example/example'
import gobackSave from '@/components/gobackSave/gobackSave'
import { format, inputup, inputup2, emojiDelete, getAllAreas } from "@utils";

export default {
  data () {
    return {
      minDate: new Date(),
      maxDate: new Date(2070, 1, 1),
      topheader: {
        name: '填写资料',
        left: '3',
        right11: true,
        heade: 'header1'
      },
      createfirst: {
        name: '添加合作商',
        left: '3',
        right3: false,
        right3content: '',
        heade: 'header1'
      },
      startendtime1: {
        title: '选择时间',
        type: 'date',
        onoff: false,
        starttime: '',
        endtime: ''
      },
      idcards: '',
      kaiguan: true,//避免暴力点击
      draftid: '',   //是否有草稿箱
      activeNames: ['2', '1', '0'], // 开哪个折叠
      steps: 1, // 第几步
      allsteps: 3,
      longtime: false,
      clickbtn: true,   //禁止暴力点击
      codeerror: '',
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
        list: false,
        onoff: false,
        chooseno: true,
        arealist: []
      },
      beendtime: {
        onoff: false,
        minDate: new Date()
      },
      disabled: true, // 后退能否
      shop: { // 先写的同城，数据格式不一样，直接拿来当store
        managerDutyAreaConfigs: [], // 0,辖区
        managerCooperation: {
          merManager: {
            isEnable: '1', // 0,店铺启用不变
            status: '1' // 0,店铺状态不变
          },
          type1: '', // 0,上级类型
          id1: '', // 0,上级ID
          spreadName: '', // 上级名字
          areaOfficeId: '', // 1,办公区域
          officeName: '',
          officeAddress: '', // 1,办公地址
          areaWarehouseId: '', // 1,仓库区域
          warehouseName: '',
          warehouseAddress: '', // 1,仓库地址
          bcCode: '', // 2,营业执照号

          bcRegisterType: '1', // 2,工商类型
          bcEndtime: '', // 2,有效截止日期
          bcPicUrl: '', // 2,证照

          bcUserName: '', // 2,法人姓名
          bcUserIdcard: '', // 2,法人身份证号
          idCardJustUrl: '', // 2,法人身份证正面
          idCardBackUrl: '', // 2,法人身份证反面
          idOthrCerUrl: '', // 2,其他证件
          activeTime: "", // 合同时间
          invalidTime: "",
          contractPicUrls: '',
        },
        rateConfig: {
          storeRatePlatform: '', // 3,店铺平台服务费
          storeRateBase: '' // 3,店铺基准折扣
        },
        newfont: '0', // 简介字数
        areaConfig: {
          id: ''//3787
        },
        charactar: '1',
        username: '',
        name: '', // 2,营业执照名字
        phone: '',
        verifyCode: '',
        email: '',
        remarks: ''
      },
      approvalContent: {}
    }
  },
  components: {
     createFirst, startEndTime, oneCut, oneNotCut, someMultiple, chooseArea, contract, example, gobackSave
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
      this.shop.managerDutyAreaConfigs = msg
      this.area.onoff = false
      this.topheader.name = '填写资料'
      this.topheader.right11 = true
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
    addcontractPicUrls (msg) {
      this.shop.managerCooperation.contractPicUrls = msg
    },
    chooseaddress1 (msg) {
      const filtered = this.address.list.filter(element => element.code == msg[2].code);
      this.shop.managerCooperation.areaOfficeId = filtered[0].id
      this.shop.managerCooperation.officeName = msg[0].name + msg[1].name + msg[2].name
      this.address.onoff1 = false
      this.topheader.right11 = true
    },
    question (msg) {
      if (msg == 1) {
        this.$dialog.alert({
          message: `启用：账号能登录系统<br>停用：账号不能登录系统`
        })
      } else {
        this.$dialog.alert({
          message: `正常：能提现收益，能推广<br>冻结：不能提现收益，能推广<br>关闭：能提现收益，不能推广`
        })
      }

    },
    // toSave(){
    //     this.$toast('已存为草稿')
    // },
    getCheckedKeys () {
      this.$refs.area.getCheckedKeys("嘿嘿嘿");
    },
    longtimeclick () {  //长期
      if (this.longtime) {
        let d = new Date();
        d.setFullYear(d.getFullYear() + 99);
        this.shop.managerCooperation.bcEndtime = format(d, 'yyyy.MM.dd')
      } else {
        this.shop.managerCooperation.bcEndtime = ''
      }
    },
    chooseaddress2 (msg) {
      const filtered = this.address.list.filter(element => element.code == msg[2].code);
      this.shop.managerCooperation.areaWarehouseId = filtered[0].id
      this.shop.managerCooperation.warehouseName = msg[0].name + msg[1].name + msg[2].name
      this.address.onoff2 = false
      this.topheader.right11 = true
    },
    bluridcard () {
      if (this.shop.managerCooperation.bcUserIdcard == '') {
        this.idcards = ''
      } else if (!/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)/.test(this.shop.managerCooperation.bcUserIdcard)) {
        this.idcards = '身份证格式不正确(如果有X则必须为大写)'

      } else {
        this.idcards = ''
      }
    },
    goback () {
      if (this.area.onoff1) {
        this.area.onoff1 = !this.area.onoff1
        this.topheader.name = '填写资料'
        this.topheader.right11 = true
      } else if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '填写资料'
        this.topheader.right11 = true
      } else if (this.area.onoff2) {
        this.area.onoff2 = !this.area.onoff2
        this.topheader.name = '填写资料'
        this.topheader.right11 = true
      } else if (this.steps == 2) {
        this.steps = 1
        this.topheader.name = '填写资料'
        this.topheader.right11 = true
      } else if (this.steps == 3) {
        this.steps = 2
        this.topheader.name = '上传合同照片'
      } else if (this.disabled) {
        this.$refs.gobackSave.onoff = true
        // this.$dialog.confirm({
        //     title: '',
        //     message: '您有未提交审批的修改',
        //     confirmButtonText: '保存为草稿',
        //     cancelButtonText: '放弃修改'
        // }).then(() => {
        //     // on confirm
        //     this.savedraft()
        //     this.$router.go(-1)
        // }).catch(() => {
        //     this.$router.go(-1)
        // })
      } else {
        this.$router.go(-1)
      }
    },
    removeByValue (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (Number(arr[i]) === Number(val)) {
          arr.splice(i, 1)
          break
        }
      }
    },
    inputblur () { // 点击下一步错误显示折叠上的感叹号
      this.$validator.validateAll().then(ress => {
        let items = this.$validator.errors.items
        this.activeNames = []
        const activeTwo = [this.shop.managerCooperation.areaOfficeId, this.shop.managerCooperation.officeAddress, this.shop.managerCooperation.areaWarehouseId, this.shop.managerCooperation.warehouseAddress]
        const activeThree2 = [this.shop.managerCooperation.bcCode, this.shop.name, this.shop.managerCooperation.bcRegisterType, this.shop.managerCooperation.bcEndtime, this.shop.managerCooperation.bcPicUrl]
        const activeThree1 = [this.shop.managerCooperation.bcCode, this.shop.name, this.shop.managerCooperation.bcRegisterType, this.shop.managerCooperation.bcEndtime, this.shop.managerCooperation.bcPicUrl, this.shop.managerCooperation.bcUserName, this.shop.managerCooperation.bcUserIdcard, this.shop.managerCooperation.idCardJustUrl, this.shop.managerCooperation.idCardBackUrl]
        this.activewarn.onoff0 = !this.shop.managerDutyAreaConfigs.length;

        if (items.some(value => value.field === 'address' || value.field === 'address2')) {
          this.activewarn.onoff1 = true
        } else this.activewarn.onoff1 = activeTwo.indexOf('') !== -1;

        if (this.shop.managerCooperation.bcRegisterType === '2') { // 第三个折叠有2种状态
          if (items.some(value => value.field === 'bccode' || value.field === 'name')) {
            this.activewarn.onoff2 = true
          } else if (activeThree2.indexOf('') === -1) {
            this.activewarn.onoff2 = this.codeerror;

          } else {
            this.activewarn.onoff2 = true
          }
        } else if (this.shop.managerCooperation.bcRegisterType === '1') {
          if (items.some(value => value.field === 'bccode' || value.field === 'bcUserName' || value.field === 'name' || value.field === 'bcUserIdcard')) {
            this.activewarn.onoff2 = true
          } else if (activeThree1.indexOf('') === -1) {
            this.activewarn.onoff2 = this.codeerror;
          } else {
            this.activewarn.onoff2 = true
          }
        }

        return ress
      }).then(() => {
        let items = this.$validator.errors.items
        if (items.length > 0) {
          return false
        } else {
          if (this.steps == 1) {
            if (this.shop.managerCooperation.bcRegisterType === '2') {
              if (!(this.activewarn.onoff0 || this.activewarn.onoff1 || this.activewarn.onoff2 || this.activewarn.onoff3 || this.idcards)) {
                this.steps = 2
                this.topheader.name = '上传合同照片'
              }
            } else {
              if (!(this.activewarn.onoff0 || this.activewarn.onoff1 || this.activewarn.onoff2 || this.activewarn.onoff3)) {
                this.steps = 2
                this.topheader.name = '上传合同照片'
              }
            }

          } else if (this.steps == 2) {

            if (!this.shop.managerCooperation.activeTime) {
              this.$toast('请选择合同时间')
              return
            } else if (!this.shop.managerCooperation.contractPicUrls) {
              this.$toast('请上传合同照片')
              return
            } else {
              this.steps = 3
              this.topheader.name = '创建账号'
            }
          } else if (this.steps == 3) {
            if (!this.shop.username || !this.shop.phone || !this.shop.verifyCode) {
              if (this.shop.phone != this.shop.oldphone) {
                console.log('retrun')
                return
              }
            }
            if (!this.$refs.createf.usererror && this.kaiguan) {
              this.shop.managerCooperation.nameCooperation = this.shop.managerCooperation.bcUserName
              let para = JSON.parse(emojiDelete(this.shop))
              this.kaiguan = false
              this.Api.addTogether(para).then(res => {
                // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
                // setToken(res.data.phone)
                // this.shop.logo = res.data.url
                this.kaiguan = true
                this.clickbtn = true
                if (res.data.status == 1) {
                  this.deletedraft(this.draftid)
                  // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 0 } })
                  this.$router.push({ path: '/ApplyResult', query: { result: '入驻申请提交成功', redresult: '预计3个工作日内完成审核，审核结果以短信通知为准！' } })
                } else {
                  this.$toast(res.data.stateMessage)
                }
                /* else {
                     this.$router.push({
                         path: '/ApplyResult',
                         query: {win: false, type: 0, result: res.data.stateMessage}
                     })
                 }*/
              }).catch(() => {
                this.kaiguan = true
              })
            }

            // }

          }
        }
      })

    },
    beendtimes (value) {
      this.shop.managerCooperation.bcEndtime = format(value, 'yyyy.MM.dd')
      this.beendtime.onoff = false
      // this.shop.managerCooperation.activeTime = format(value, 'yyyy.MM.dd hh:mm:ss')
      // this.shop.managerCooperation.invalidTime = format(value, 'yyyy.MM.dd hh:mm:ss')
    },
    times (msg) { // 时间插件的事件
      this.startendtime1.onoff = msg.onoff

      if (msg.oldtime) {
        this.startendtime1.starttime = msg.oldtime
        this.startendtime1.endtime = msg.newtime
        this.shop.managerCooperation.activeTime = format(msg.olddate, 'yyyy-MM-dd hh:mm:ss')
        this.shop.managerCooperation.invalidTime = format(msg.newdate, 'yyyy-MM-dd hh:mm:ss')

      }
    },
    savedraft () {  //保存草稿，修改草稿
      let para
      if (this.draftid) {
        para = {
          id: this.draftid,
          approvalContent: emojiDelete(this.shop),
          title: emojiDelete(this.shop.name) ? emojiDelete(this.shop.name) : '暂无名称'
        }
        this.Api.changeDraft(para).then(res => {
          if (res.data.status == 1) {
            this.$toast('已存为草稿并删除非法字符')
          }
        })
      } else {
        para = {
          serviceType: 4,
          approvalContent: emojiDelete(this.shop),
          title: emojiDelete(this.shop.name) ? emojiDelete(this.shop.name) : '暂无名称'
        }
        this.Api.addDraft(para).then(res => {
          if (res.data.status == 1) {
            this.$toast('已存为草稿并删除非法字符')
            this.draftid = res.data.data.id
          }
        })
      }
    },
    deletedraft (para) {
      let par = {
        id: para
      }
      if (para) {
        this.Api.deleteDraft(par).then(() => {

        })
      }

    }

  },
  beforeDestroy () {
    inputup2('.anzhuotop', '.app-init')
  },
  mounted () {
    inputup('.anzhuotop', '.app-init')
    this.shop.managerCooperation.type1 = sessionStorage.getItem('accountType')
    this.shop.managerCooperation.id1 = sessionStorage.getItem('id')
    this.shop.managerCooperation.spreadName = sessionStorage.getItem('accountName')

    this.area.list = this.$route.query.list

    this.Api.allArea({}).then(res => {
      if (res.data.data) {
        this.address.list = res.data.data.list

        this.address.areaList = getAllAreas(res.data.data)
      } else {
        return false
      }
    }).then(() => {
      if (this.$route.query.id) {
        /*let formdata = new FormData();
        formdata.set("id", this.$route.query.id);*/
        let para = {
          id: this.$route.query.id
        }
        this.Api.getApprovalDetail(para)
          .then(res => {
            // this.shop = res.data.data;
            this.approvalContent = JSON.parse(res.data.data.approvalContent);
            // storeAccount: {
            //   charactar:2,
            this.approvalContent.charactar = this.shop.charactar
            this.shop = this.approvalContent
            this.shop.managerCooperation.type1 = sessionStorage.getItem('accountType')
            this.shop.managerCooperation.id1 = sessionStorage.getItem('id')
            this.shop.managerCooperation.spreadName = sessionStorage.getItem('accountName')
            this.shop.oldphone = this.shop.phone   //老手机号
            this.shop.verifyCode = ''
            this.shop.managerCooperation.bcRegisterType = this.shop.managerCooperation.bcRegisterType.toString()
            // this.shop.managerCooperation.invalidTime=format(new Date(this.shop.managerCooperation.invalidTime),'yyyy.MM.dd')
            this.startendtime1.starttime = format(this.shop.managerCooperation.activeTime, 'yyyy.MM.dd')
            this.startendtime1.endtime = format(this.shop.managerCooperation.invalidTime, 'yyyy.MM.dd')

            const filtered = this.address.list.filter(element => element.id == this.shop.managerCooperation.areaOfficeId);
            let province = filtered[0].code.substring(0, 2).concat('0000')
            let city = filtered[0].code.substring(0, 4).concat('00')
            const provinceName = this.address.areaList.province_list[province];
            const cityName = this.address.areaList.city_list[city];
            this.shop.managerCooperation.officeName = provinceName + cityName + filtered[0].name  //审核拿到省市区

            const filtered2 = this.address.list.filter(element => element.id == this.shop.managerCooperation.areaWarehouseId);
            let province2 = filtered2[0].code.substring(0, 2).concat('0000')
            let city2 = filtered2[0].code.substring(0, 4).concat('00')
            const provinceName2 = this.address.areaList.province_list[province2];
            const cityName2 = this.address.areaList.city_list[city2];
            this.shop.managerCooperation.warehouseName = provinceName2 + cityName2 + filtered2[0].name  //审核拿到省市区

            this.area.arealist = this.shop.managerDutyAreaConfigs.map(value => value.areaConfig.id)  //选择上辖区
            // this.shop.managerCooperation.officeName  warehouseName

            // activeTime
            console.log(this.approvalContent);
          })
          .catch(error => {
            console.log(error);
          });
      }
    })








    if (this.$route.query.draft) {
      let para = {
        id: this.$route.query.draft
      }
      this.Api.detailDraft(para).then(res => {
        this.shop = JSON.parse(res.data.data.approvalContent)
        this.draftid = this.$route.query.draft
        this.startendtime1.starttime = format(this.shop.managerCooperation.activeTime, 'yyyy.MM.dd')
        this.startendtime1.endtime = format(this.shop.managerCooperation.invalidTime, 'yyyy.MM.dd')
        this.area.arealist = this.shop.managerDutyAreaConfigs.map(value => value.areaConfig.id)  //选择上辖区
      })
    }
    // window.addEventListener('scroll', this.handleScroll)
    // console.log(window)
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped lang="scss" type="text/scss">
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

.van-cell__title.leftcolor {
  max-width: 60% !important;
}

.rightcolor {
  text-align: right;
  display: block;
  span {
    display: block;

    float: right;
    /*margin-left: 30%;*/
  }
}
</style>
