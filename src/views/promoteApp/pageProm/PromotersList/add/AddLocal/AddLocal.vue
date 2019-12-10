<template>
  <div class="app-init">
    <top-column :top-header="topheader" ref="topdata" @search="searchgetList"></top-column>
    <div>
      <div v-show="steps==1" class="anzhuotop">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="状态信息" name="0" value-class="collapsewarn">
            <div slot="icon" class="vant-collapse-icon"></div>
            <div slot="value">
              <van-icon name="info-o" v-show="activewarn.onoff0" />
            </div>
            <van-cell title="账号启用" required readonly>
              <template slot="title">
                <span class="custom-text">账号启用</span>
                <van-icon name="question-o" class="righticon" @click="question2(1)" />
              </template>
              <van-radio-group value="1" style="display: flex;">
                <van-radio name="1" style="margin-right: 20px;" disabled>启用</van-radio>
                <van-radio name="2" disabled>停用</van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell title="账号状态" required readonly>
              <template slot="title">
                <span class="custom-text">账号状态</span>
                <van-icon name="question-o" class="righticon" @click="question2(2)" />
              </template>
              <van-radio-group value="1" style="display: flex;">
                <van-radio name="1" style="margin-right: 20px;" disabled>正常</van-radio>
                <van-radio name="2" style="margin-right: 20px;" disabled>关闭</van-radio>
                <van-radio name="3" disabled>冻结</van-radio>
              </van-radio-group>
            </van-cell>
            <van-field
              type="text"
              label="推广人"
              v-if="shop.spreadType=='3'"
              :value="'省区总  '+shop.spreadName"
              required
              readonly
            ></van-field>
            <van-cell title="结算方式" required readonly value-class="telabel">
              <van-radio-group v-model="shop.settleType" style="display: flex;">
                <van-radio name="2" style="margin-right: 20px;">售后期关闭后结算(可提现)</van-radio>
                <van-radio name="1" style="margin-right: 20px;">发货后次日结算(可提现)</van-radio>
              </van-radio-group>
            </van-cell>
          </van-collapse-item>
          <van-collapse-item title="经营信息" name="1" value=" " value-class="collapsewarn">
            <div slot="icon" class="vant-collapse-icon"></div>
            <div slot="value">
              <van-icon name="info-o" v-show="activewarn.onoff1" />
            </div>
            <van-cell title="类别" required>
              <van-radio-group v-model="shop.shopInfo.companyType" style="display: flex;">
                <van-radio name="1" style="margin-right: 20px;">企业</van-radio>
                <van-radio name="2">代理商</van-radio>
              </van-radio-group>
            </van-cell>
            <div class="typete">类型为企业时，以下内容输入企业的相关信息;类型为代理商时,以下内容输入代理商的相关信息</div>
            <van-cell
              title="经营品牌"
              placeholder="请选择经营品牌"
              value="请选择经营品牌"
              v-if="shop.brandIdList.length==0"
              value-class="colorC0C0C0"
              is-link
              required
              @click="jingying.onoff=!jingying.onoff;topheader.name='选择品牌';topheader.right2='1';topheader.right11=false"
            ></van-cell>
            <van-cell
              title="经营品牌"
              placeholder="请选择经营品牌"
              :value="'已选择'+shop.brandIdList.length +'个品牌'"
              v-else
              is-link
              required
              @click="jingying.onoff=!jingying.onoff;topheader.name='选择品牌';topheader.right2='1';finished=false;topheader.right11=false"
            ></van-cell>
          </van-collapse-item>
          <van-collapse-item title="基本信息" name="2" value=" " value-class="collapsewarn">
            <div slot="icon" class="vant-collapse-icon"></div>
            <div slot="value">
              <van-icon name="info-o" v-show="activewarn.onoff2" />
            </div>
            <van-field type="text" label="店铺角色" value="同城企业" required disabled></van-field>
            <van-field
              type="text"
              label="店铺名称"
              v-model="shop.nickName"
              required
              :error-message="localnickNames"
              @blur="localnickName"
            ></van-field>
            <van-cell title="店铺头像" required>
              <one-cut @onecut="addlogoUrl" :one-cut="shop.logoUrl" filecode="FILE19011215580409"></one-cut>
            </van-cell>
            <van-cell
              title="企业地址"
              placeholder="请选择企业地址"
              value="请选择企业地址"
              value-class="colorC0C0C0"
              v-if="!shop.region"
              is-link
              required
              @click="areaConfigs"
            ></van-cell>
            <van-cell
              title="企业地址"
              placeholder="请选择企业地址"
              :value="shop.province+shop.city+shop.region"
              v-else
              is-link
              required
              @click="areaConfigs"
            ></van-cell>
            <van-field
              label
              type="text"
              class="tetitle"
              placeholder="请选择详细地址，如道路.门牌号等信息"
              v-model="shop.shopInfo.address"
              name="address"
              v-validate="'required|emoji:3,50'"
              :error-message="errors.first('address')"
            ></van-field>

            <div v-if="shop.province" class="provincete">同城商品将面向(定位为{{shop.city}})的用户投放</div>
            <div v-else class="provincete">同城商品将面向(定位为) 的用户投放</div>
          </van-collapse-item>
          <van-collapse-item title="证照信息" name="3" value=" " value-class="collapsewarn">
            <div slot="icon" class="vant-collapse-icon"></div>
            <div slot="value">
              <van-icon name="info-o" v-show="activewarn.onoff3" />
            </div>
            <van-field
              type="text"
              label="营业执照号"
              v-model="shop.shopInfo.bcCode"
              placeholder="请输入营业执照号"
              required
              name="bccode"
              v-validate="'bccode'"
              :error-message="errors.first('bccode')"
            ></van-field>
            <van-field
              type="text"
              label="名称"
              v-model="shop.shopInfo.name"
              placeholder="请输入名称"
              required
              name="name"
              v-validate="'required|emoji:1,30'"
              :error-message="errors.first('name')"
            ></van-field>
            <van-cell title="类型" required>
              <van-radio-group v-model="shop.shopInfo.bcRegisterType" style="display: flex;">
                <van-radio name="1" style="margin-right: 20px;">个体商户</van-radio>
                <van-radio name="2">企业</van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell
              title="有效截止日期"
              value="请选择截止日期"
              v-if="!shop.shopInfo.bcEndtime&&!longtime"
              value-class="colorC0C0C0"
              is-link
              required
              @click="beendtime.onoff=!beendtime.onoff"
            >
              <div slot="right-icon">
                <van-checkbox v-model="longtime" @click.native.stop="longtimeclick">长期</van-checkbox>
              </div>
            </van-cell>
            <van-cell
              title="有效截止日期"
              placeholder="请选择截止日期"
              :value="shop.shopInfo.bcEndtime"
              v-else-if="shop.shopInfo.bcEndtime&&!longtime"
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
                :one-not-cut="shop.shopInfo.bcPicUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
            </van-cell>

            <div v-if="shop.shopInfo.bcRegisterType==1">
              <van-field
                type="text"
                label="法人姓名"
                v-model="shop.shopInfo.bcUserName"
                placeholder="请输入名称"
                required
                name="bcUserName"
                v-validate="'required|emoji:1,15'"
                :error-message="errors.first('bcUserName')"
              ></van-field>
              <van-field
                type="text"
                label="身份证号"
                maxlength="18"
                v-model="shop.shopInfo.bcUserIdcard"
                placeholder="请输入身份证号"
                required
                @blur="bluridcard"
                :error-message="idcards"
                name="bcUserIdcard"
              ></van-field>
              <van-cell title="身份证照">
                <div slot="title" class="requireds">身份证照</div>
                <div slot="label" class="bluecolor" @click="$refs.example.changes(3)">查看示例</div>
                <one-not-cut
                  @onenotcut="addidCardJustUrl"
                  class="idjust"
                  :one-not-cut="shop.shopInfo.idCardJustUrl"
                  filecode="FILE19011225489456"
                ></one-not-cut>
                <one-not-cut
                  @onenotcut="addidCardBackUrl"
                  class="idback"
                  :one-not-cut="shop.shopInfo.idCardBackUrl"
                  filecode="FILE19011225489456"
                ></one-not-cut>
              </van-cell>
              <van-cell title="其他证件">
                <div slot="title">其他证件</div>
                <div slot="label" class="bluecolor" @click="$refs.example.changes(4)">查看示例</div>
                <some-multiple
                  @somemultiple="addbcPicUrls"
                  number="8"
                  :some-multiple="shop.shopInfo.bcPicUrls"
                  filecode="FILE19011225489456"
                ></some-multiple>
              </van-cell>
            </div>
            <div v-if="shop.shopInfo.bcRegisterType==2">
              <van-field
                type="text"
                label="法人姓名"
                v-model="shop.shopInfo.bcUserName"
                placeholder="请输入名称"
              ></van-field>
              <van-field
                type="text"
                label="身份证号"
                maxlength="18"
                v-model="shop.shopInfo.bcUserIdcard"
                @blur="bluridcard"
                :error-message="idcards"
                placeholder="请输入身份证号"
              ></van-field>
              <van-cell title="身份证照">
                <div slot="title">身份证照</div>
                <div slot="label" class="bluecolor" @click="$refs.example.changes(3)">查看示例</div>
                <one-not-cut
                  @onenotcut="addidCardJustUrl"
                  class="idjust"
                  :one-not-cut="shop.shopInfo.idCardJustUrl"
                  filecode="FILE19011225489456"
                ></one-not-cut>
                <one-not-cut
                  @onenotcut="addidCardBackUrl"
                  class="idback"
                  :one-not-cut="shop.shopInfo.idCardBackUrl"
                  filecode="FILE19011225489456"
                ></one-not-cut>
              </van-cell>
              <van-cell title="其他证件">
                <div slot="title">其他证件</div>
                <div slot="label" class="bluecolor" @click="$refs.example.changes(4)">查看示例</div>
                <some-multiple
                  @somemultiple="addbcPicUrls"
                  number="8"
                  :some-multiple="shop.shopInfo.bcPicUrls"
                  filecode="FILE19011225489456"
                ></some-multiple>
              </van-cell>
            </div>
          </van-collapse-item>
          <van-collapse-item title="通讯录" name="4" value=" " value-class="collapsewarn">
            <div slot="icon" class="vant-collapse-icon"></div>
            <div slot="value">
              <van-icon name="info-o" v-show="activewarn.onoff4" />
            </div>
            <div v-for="(item,key) in shop.shopCommunicationBookList" :key="key">
              <div v-if="item.must" class="te bottomte">{{item.role}}</div>
              <div v-if="!item.must" class="bottomte">{{item.role}}</div>
              <van-field type="text" label="姓名" v-model="item.name" placeholder="请输入姓名"></van-field>
              <van-field
                type="tel"
                label="手机号"
                v-model="item.phone"
                v-if="item.must"
                :name="key+'contactPhone'"
                v-validate="'txlphone'"
                :error-message="errors.first(key+'contactPhone')"
                placeholder="请输入手机号"
              ></van-field>
              <van-field
                type="tel"
                label="手机号"
                v-model="item.phone"
                v-if="!item.must"
                placeholder="请输入手机号"
              ></van-field>
              <van-field type="text" label="微信" v-model="item.wechat" placeholder="请输入微信"></van-field>
              <van-field
                type="text"
                label="邮箱"
                v-if="item.email==''||item.email"
                v-model="item.email"
                placeholder="请输入邮箱"
                :name="key+'contactEmail'"
                v-validate="'email'"
                :error-message="errors.first(key+'contactEmail')"
              ></van-field>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div v-show="steps==2">
        <van-cell-group class="rate">
          <van-cell title="费率">
            <div slot="icon" class="vant-collapse-icon"></div>
          </van-cell>
          <p class="rate-content">平台收取服务费,收取该同城企业平台销售额的</p>
          <van-radio-group v-model="shop.rateConfig.storeRatePlatform" class="rate-bottom">
            <van-radio name="6">6%</van-radio>
            <van-radio name="5" style="margin-right: 20px;">5%</van-radio>
            <van-radio name="4" style="margin-right: 20px;">4%</van-radio>
          </van-radio-group>
        </van-cell-group>
        <van-cell-group>
          <van-cell
            title="合同起止时间"
            placeholder="请选择合同起止时间"
            :value="startendtime1.starttime+'至'+startendtime1.endtime"
            is-link
            v-if="shop.shopInfo.contractStartTime"
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
              :some-multiple="shop.shopInfo.contractPicUrls"
              filecode="FILE19011225489456"
            ></some-multiple>

            <!--<contract @somemultiple="addcontractPicUrls" number="8" :some-multiple="shop.shopInfo.contractPicUrls" ref="contractPicUrls"  filecode="FILE19011225489456"></contract>-->
          </van-cell>
        </van-cell-group>
      </div>
      <div v-show="steps==3">
        <create-first :create-first="shop" ref="createf"></create-first>
      </div>

      <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>

      <footer class="botto" v-show="jingying.onoff">
        <van-button size="large" type="primary" class="submitbtn" @click="getCheckedKeys">确认</van-button>
      </footer>
      <van-button
        type="primary"
        size="large"
        @click="inputblur"
        class="submitbtn"
      >下一步({{steps}}/{{allsteps}})</van-button>
    </div>
    <van-popup v-model="jingying.onoff" position="right" :overlay="false" v-if="jingying.onoff">
      <div class="rightmap" style="margin-top: 44px;height: 90vh;">
        <van-list
          v-model="loading"
          :finished="finished"
          loading-text="加载中..."
          :error.sync="loadingError"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div>
            <van-checkbox-group v-model="jingying.content">
              <van-cell-group>
                <van-cell v-for="(item) in jingying.list" clickable :key="item.id">
                  <van-checkbox :name="item.id" label-position="left" ref="checkboxes">
                    {{item.name}}
                    <div class="chooseimg" slot="icon" slot-scope="props">
                      <img :src="props.checked ?icon.choose:icon.notchoose" />
                    </div>
                  </van-checkbox>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>
            <!--<el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
            <!--<el-button @click="getCheckedKeys">通过 key 获取</el-button>-->
            <div v-if="jingying.list.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
          </div>
        </van-list>
        <footer class="bott"></footer>
      </div>
    </van-popup>
    <van-popup v-model="areaConfig.onoff" position="bottom">
      <one-area
        :one-area="shop"
        @oneAreascallback="oneAreas"
        emptyText="您的可推广区域为空"
        ref="areaConfigs"
      ></one-area>
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
    <goback-save ref="gobackSave"></goback-save>
    <example ref="example"></example>
  </div>
</template>

<script>
import createFirst from '@/components/createFirst/createFirst'
import oneCut from '@/components/addimg/oneCut'
import oneArea from '@/components/chooseArea/oneArea'
import oneNotCut from '@/components/addimg/oneNotCut'
import startEndTime from '@components/startEndTime/startEndTime'
import someMultiple from '@/components/addimg/someMultiple'
import contract from '@/components/addimg/contract'
import { format, inputup, inputup2, accMul, accDiv, emojiDelete } from "@utils";
import choose from '@assets/img/checkbox_check.png'
import notchoose from '@assets/img/checkbox_round.png'
import example from '@/components/example/example'
import gobackSave from '@/components/gobackSave/gobackSave'
export default {
  data () {
    return {
      topheader: {
        name: '填写资料',
        left: '3',
        right2: '',
        heade: 'header1',
        keyWord: '',
        right11: true
      },
      createfirst: {
        name: '添加合作商',
        left: '3',
        heade: 'header1',
        right11: true
      },
      draftid: '',
      imgsrc: '',
      cropperConfig: {
        width: 1, // 裁剪宽度（比例）
        height: 1, // 裁剪高度（比例）
        quality: 0.7, // 图片质量（0~1之间）
        maxWidth: 750, // 导出的图片的最大宽度
        fileCategoryCode: 'FILE19011208395727'
      },
      icon: {
        choose: choose,
        notchoose: notchoose
      },
      activeNames: ['2', '1', '0', '3', '4'], // 开哪个折叠
      enter: false,
      steps: 1, // 第几步
      allsteps: 3,
      activewarn: { // 哪个折叠的错误
        onoff0: false,
        onoff1: false,
        onoff2: false,
        onoff3: false,
        onoff4: false
      },
      jingying: { // 经营品牌
        onoff: false,
        list: [],
        content: []
      },
      areaConfig: {  //选择地址
        onoff: false,
      },
      beendtime: {
        onoff: false,
        minDate: new Date(),
        maxDate: new Date(2070, 1, 1),
      },
      startendtime1: {
        title: '编辑合同起止时间',
        type: 'date',
        onoff: false,
        starttime: '',
        endtime: ''
      },
      disabled: true, // 后退能否
      loading: false, // 分页加载
      kaiguan: true, // 避免多次请求
      finished: false,
      count: 0,
      longtime: false,
      localnickNames: '',
      page: 1,
      pageSize: 10,
      loadingError: false,
      codeerror: '', //营业执照错误提示
      idcards: '',
      shop: {
        charactar: 3, // 给createfirst组件区分是创建谁 1.合作商推广员 2.种子特色 3.同城
        isEnable: '1',
        status: '1',
        settleType: '2', //0,,结算方式
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
        areaConfig: {
          id: ''
        },
        rateConfig: {
          storeRatePlatform: '4' //平台服务费
        },
        shopInfo: {
          bcRegisterType: '2', // 工商类型
          address: '',
          bcCode: '',
          name: '',
          companyType: '1',
          bcEndtime: '',
          bcPicUrl: '',
          bcUserName: '',
          bcUserIdcard: '',
          idCardJustUrl: '',
          idCardBackUrl: '',
          bcPicUrls: '',
          invoiceEmail: '',
          phone: '',
          contractPicUrls: '', //合同照片
          contractStartTime: '', //合同开始时间
          contractEndTime: '', //合同结束时间
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
        brandIdList: [
        ],
        verifyCode: '',
        remarks: ''
      }
    }
  },
  components: {
     createFirst, oneCut, oneNotCut, someMultiple, oneArea, startEndTime, contract, example, gobackSave
  },
  watch: {
    'shop.phone' () {
      this.shop.shopInfo.phone = this.shop.phone
    }
  },
  methods: {
    oneAreas (msg) { //选择地区
      if (msg != '') {
        this.shop.province = msg[0].name
        this.shop.city = msg[1].name
        this.shop.region = msg[2].name
        this.shop.areaConfig.id = msg[3].id
      }
      this.areaConfig.onoff = false
    },
    localnickName () {
      let param = this.shop.nickName;
      let regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\-+*/|\r\n\s,.?!，。: '";%￥#@（）_<>？！…—&$=(){}[\]]|\s/g;
      this.shop.nickName = param.replace(regRule, "");
      let para = {
        nickName: this.shop.nickName
      }
      if (this.shop.nickName.length < 4 || this.shop.nickName.length > 40) {
        this.localnickNames = '店铺名称请在4-40字之间'
      } else {
        this.Api.localNickName(para).then(res => {
          if (res.data.status == 1) {
            this.localnickNames = ''
          } else {
            this.localnickNames = '店铺名称重复'
          }
        })
      }

    },
    addlogoUrl (msg) {
      this.shop.logoUrl = msg
    },
    addbcPicUrl (msg) {
      this.shop.shopInfo.bcPicUrl = msg
    },
    addidCardJustUrl (msg) {
      this.shop.shopInfo.idCardJustUrl = msg
    },
    addidCardBackUrl (msg) {
      this.shop.shopInfo.idCardBackUrl = msg
    },
    addbcPicUrls (msg) {
      this.shop.shopInfo.bcPicUrls = msg
    },
    addcontractPicUrls (msg) {
      this.shop.shopInfo.contractPicUrls = msg
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
    areaConfigs () {
      // if(this.$refs.areaConfigs.columns.province_list){
      //
      // }
      // console.log( (JSON.stringify(this.$refs.areaConfigs.columns.province_list) == "{}"))
      this.areaConfig.onoff = !this.areaConfig.onoff
    },
    longtimeclick () {
      if (this.longtime) {
        let d = new Date();
        d.setFullYear(d.getFullYear() + 99);
        this.shop.shopInfo.bcEndtime = format(d, 'yyyy.MM.dd')
      } else {
        this.shop.shopInfo.bcEndtime = ''
      }
    },
    goback () {
      if (this.jingying.onoff) {
        this.jingying.onoff = !this.jingying.onoff
        this.topheader = {
          heade: "header1",
          keyWord: "",
          left: "3",
          name: "填写资料",
          right2: "",
          right11: true
        }
        this.$refs.topdata.onCancel()

      } else if (this.steps == 2) {
        this.activeNames = ['2', '1', '0', '3', '4']
        this.steps = 1
        this.topheader.name = '填写资料'
      } else if (this.steps == 3) {
        this.steps = 2
        this.topheader.name = '上传合同照片'
      } else if (this.disabled) {
        this.$refs.gobackSave.onoff = true
        /*this.$dialog.confirm({
          title: '',
          message: '您有未提交审批的修改',
          confirmButtonText: '保存为草稿',
          cancelButtonText: '放弃修改'
        }).then(() => {
          // on confirm
          this.savedraft()
          this.$router.go(-1)
        }).catch(() => {
          this.$router.go(-1)
        })*/
      } else {
        this.$router.go(-1)
      }
    },
    onLoad () {
      // 异步更新数据
      if (this.kaiguan == true) {
        this.finished = false
        this.loadingError = false
        setTimeout(() => {
          this.getjingying().then(() => {
            // 加载状态结束
            this.loading = false


          })
        }, 500);
      } else {
        this.loading = false
      }
    },
    getCheckedKeys () {
      this.shop.brandIdList = this.jingying.content
      this.$refs.topdata.onCancel()
      this.jingying.onoff = false
      this.topheader.name = '填写资料'
      this.topheader.right2 = ''
      this.topheader.right11 = true
    },
    savedraft () {  //保存草稿，修改草稿
      let para
      if (this.draftid) {
        para = {
          id: this.draftid,
          approvalContent: emojiDelete(this.shop),
          title: emojiDelete(this.shop.shopInfo.name) ? emojiDelete(this.shop.shopInfo.name) : '暂无名称'
        }
        this.Api.changeDraft(para).then(res => {
          if (res.data.status == 1) {
            this.$toast('已存为草稿并删除非法字符')
          }
        })
      } else {
        para = {
          serviceType: 5,
          approvalContent: emojiDelete(this.shop),
          title: emojiDelete(this.shop.shopInfo.name) ? emojiDelete(this.shop.shopInfo.name) : '暂无名称'
        }
        this.Api.addDraft(para).then(res => {
          if (res.data.status == 1) {
            this.$toast('已存为草稿并删除非法字符')
            this.draftid = res.data.data.id
          }
        })
      }
    },
    removeByValue (arr, val) {
      for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i]) === Number(val)) {
          arr.splice(i, 1)
        }
      }
    },
    searchgetList () {
      this.page = 1
      this.jingying.list = []
      this.loading = false
      this.kaiguan = true
      this.finished = false
      this.getjingying()
    },
    getjingying () { //获取经营品牌
      if (this.kaiguan == true) {
        this.kaiguan = false
        let para = {
          page: {
            pageNo: this.page,
            pageSize: this.pageSize
          },
          searchParameter: {
            keyWord: this.$refs.topdata.key
          }
        }
        return this.Api.localInside(para).then(res => {
          if (res.data.data) {
            this.count = res.data.data.count
            this.jingying.list = this.jingying.list.concat(res.data.data.list)
            this.page++
            this.kaiguan = true

            // 数据全部加载完成
            if ((this.page - 1) * this.pageSize >= this.count) {
              this.finished = true
            } else if (this.page === 2 && res.data.data.list.length === this.pageSize) {
              this.getjingying()
            }
            return res.data;
          } else {
            this.kaiguan = true
          }
          if (res.data || res.data.status !== 1) {
            this.loadingError = true;
          }
        }).catch(() => {
          this.kaiguan = true
          this.loadingError = true;
        })
      }

    },
    toggle (msg, index) { //点击选择经营品牌
      this.$refs.checkboxes[index].toggle();
      if (this.jingying.content.indexOf(msg) > -1) {
        this.jingying.content.splice(this.jingying.content.indexOf(msg), 1);
      } else {
        this.jingying.content.push(msg)
      }
    },
    bluridcard () {
      if (this.shop.shopInfo.bcUserIdcard == '') {
        this.idcards = ''
      } else if (!/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)/.test(this.shop.shopInfo.bcUserIdcard)) {
        this.idcards = '身份证格式不正确(如果有X则必须为大写)'

      } else {
        this.idcards = ''
      }
    },
    inputblur () { // 点击下一步错误显示折叠上的感叹号
      this.$validator.validateAll().then(ress => {
        let items = this.$validator.errors.items

        this.activeNames = []
        // const activeTwo = [this.shop.shopInfo.companyType, this.shop.brandIdList[0]];
        const activeThree = [this.shop.nickName, this.shop.logoUrl, this.shop.areaConfig.id, this.shop.shopInfo.address];
        const activeFour2 = [this.shop.shopInfo.bcCode, this.shop.shopInfo.name, this.shop.shopInfo.bcRegisterType, this.shop.shopInfo.bcEndtime, this.shop.shopInfo.bcPicUrl];
        const activeFour1 = [this.shop.shopInfo.bcCode, this.shop.shopInfo.name, this.shop.shopInfo.bcRegisterType, this.shop.shopInfo.bcEndtime, this.shop.shopInfo.bcPicUrl, this.shop.shopInfo.bcUserName, this.shop.shopInfo.bcUserIdcard, this.shop.shopInfo.idCardBackUrl, this.shop.shopInfo.idCardJustUrl];
        this.activewarn.onoff1 = !this.shop.shopInfo.companyType || !this.shop.brandIdList[0]; //第二个折叠



        if (items.some(value => value.field === 'address')) {  //第三个折叠
          this.activewarn.onoff2 = true
        } else this.activewarn.onoff2 = activeThree.indexOf('') !== -1;

        if (this.shop.shopInfo.bcRegisterType === '2') { // 第四个折叠有2种状态

          if (items.some(value => value.field === 'bccode' || value.field === 'name')) {  //第四个折叠
            this.activewarn.onoff3 = true
          } else this.activewarn.onoff3 = activeFour2.indexOf('') !== -1;


        } else if (this.shop.shopInfo.bcRegisterType === '1') {

          if (items.some(value => value.field === 'bccode' || value.field === 'name' || value.field === 'bcUserName' || value.field === 'bcUserIdcard')) {  //第四个折叠
            this.activewarn.onoff3 = true
          } else this.activewarn.onoff3 = activeFour1.indexOf('') !== -1;
        }
        // shop.shopCommunicationBookList
        let five = this.shop.shopCommunicationBookList.map((value) => {
          if (value.name && value.phone && value.wechat) {
            return true
          }
        })

        if (five[0] && five[1] && five[2] && five[3] && five[4]) {
          if (this.shop.shopCommunicationBookList[5].phone === '' || this.shop.shopCommunicationBookList[5].phone.length === 11) {
            if (items.some(value => value.field === '0contactEmail' || value.field === '1contactEmail' || value.field === '2contactEmail')) {
              this.activewarn.onoff4 = true
            } else {
              this.activewarn.onoff4 = false
            }
          } else {
            this.$toast('售后专员2手机号不正确')
            this.activewarn.onoff4 = true
          }
        } else {
          this.activewarn.onoff4 = true
        }

        return ress
      }).then(() => {
        let items = this.$validator.errors.items
        if (items.length > 0) {
          return false
        } else {
          if (!(this.activewarn.onoff0 || this.activewarn.onoff1 || this.activewarn.onoff2 || this.activewarn.onoff3 || this.activewarn.onoff4)) {
            if (this.steps == 1) {

              this.steps = 2
              this.topheader.name = '上传合同照片'




            } else if (this.steps == 2) {
              // if(this.shop.shopInfo.contractPicUrls&&this.shop.shopInfo.contractStartTime&&this.shop.shopInfo.contractEndTime){
              //   this.steps = 3
              //   this.topheader.name = '创建账号'
              // }else{
              //   if(!this.shop.shopInfo.contractStartTime){
              //     this.$toast('请选择合同时间')
              //   }else if(!this.shop.shopInfo.contractPicUrls){
              //     this.$toast('请上传合同照片')
              //   }
              // }

              if (!this.shop.shopInfo.contractStartTime) {
                this.$toast('请选择合同时间')
                return
              } else if (!this.shop.shopInfo.contractPicUrls) {
                this.$toast('请上传合同照片')
                return
              } else {
                this.steps = 3
                this.topheader.name = '创建账号'
              }
            } else if (this.steps == 3) {
              if (!this.shop.userName || !this.shop.phone || !this.shop.verifyCode) {
                if (this.shop.phone != this.shop.oldphone) {
                  console.log('retrun')
                  return
                }
              }
              if (!this.$refs.createf.usererror && this.kaiguan) {
                let para = JSON.parse(emojiDelete(this.shop))
                if (!para.shopCommunicationBookList[5].name || !para.shopCommunicationBookList[5].phone) {
                  para.shopCommunicationBookList.pop()
                }
                para.rateConfig.storeRatePlatform = accDiv(para.rateConfig.storeRatePlatform, 100)
                this.kaiguan = false
                this.Api.addLocal(para).then(res => {
                  // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
                  // setToken(res.data.phone)
                  // this.shop.logoUrl = res.data.url
                  this.kaiguan = true
                  if (res.data.status == 1) {  //去结果页
                    if (this.$route.query.id) {
                      let para = {
                        id: this.$route.query.id,
                        status: 2
                      }
                      this.Api.changeLocal2(para).then(() => {

                      })
                    } else if (this.shop.shopCityClue) {
                      let para = {
                        id: this.shop.shopCityClue.id,
                        status: 2
                      }
                      this.Api.changeLocal2(para).then(() => {

                      })
                    }
                    this.deletedraft(this.draftid)
                    this.$router.push({ path: '/ApplyResult', query: { result: '入驻申请提交成功', redresult: '预计3个工作日内完成审核，审核结果以短信通知为准！' } })
                  } else {
                    this.$toast(res.data.stateMessage)
                  }
                  /*else{
                    this.$router.push({path: '/ApplyResult', query: {win:false,type:0,result:res.data.stateMessage}})
                  }*/


                }).catch(() => {
                  this.kaiguan = true
                })
              }

            }
          }
        }

      })
      // console.log(this.$validator.errors.items[0])

    },
    beendtimes (value) {
      this.shop.shopInfo.bcEndtime = format(value, 'yyyy.MM.dd')
      this.beendtime.onoff = false
    },
    times (msg) { // 时间插件的事件
      this.startendtime1.onoff = msg.onoff

      if (msg.oldtime) {
        this.startendtime1.starttime = msg.oldtime
        this.startendtime1.endtime = msg.newtime
        this.shop.shopInfo.contractStartTime = format(msg.olddate, 'yyyy-MM-dd hh:mm:ss')
        this.shop.shopInfo.contractEndTime = format(msg.newdate, 'yyyy-MM-dd hh:mm:ss')

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

    },
    submitBasic () { //  点击下一步，暂时被扔了出来
      if (this.steps == 1) {
        this.steps = 2
        this.topheader.name = '上传合同照片'
      } else if (this.steps == 2) {
        this.steps = 3
        this.topheader.name = '创建账号'
      } else if (this.steps == 3) {
        let para = this.shop
        // para.phone=this.shop.shopInfo.phone
        this.Api.addLocal(para).then(() => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          // setToken(res.data.phone)
          // this.shop.logoUrl = res.data.url

        })
      }
    },
    dataURItoBlob (base64Data) {
      let byteString
      if (base64Data.split(',')[0].indexOf('base64') >= 0) { byteString = atob(base64Data.split(',')[1]) } else { byteString = unescape(base64Data.split(',')[1]) }
      let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
      let ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], { type: mimeString })
    },
  },
  beforeDestroy () {
    inputup2('.anzhuotop', '.app-init')
  },
  async mounted () {
    inputup('.anzhuotop', '.app-init')
    if (this.$route.query.id) {
      this.enter = true
      /*let formdata=new FormData();
      formdata.set("id",this.$route.query.id);*/
      let para2 = {
        id: this.$route.query.id
      }
      this.Api.localDetail2(para2).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        // this.shop=res.data.data
        this.shop.spreadName = res.data.data.serviceUsername
        this.shop.shopInfo.companyType = res.data.data.status.toString()
        this.shop.province = res.data.data.province
        this.shop.city = res.data.data.city
        this.shop.region = res.data.data.region
        this.shop.areaConfig.id = res.data.data.areaConfig.id
        this.shop.shopInfo.name = res.data.data.name
        this.shop.shopCommunicationBookList.name = res.data.data.contactName
        this.shop.shopCommunicationBookList.phone = res.data.data.contactPhone
        this.shop.shopInfo.address = res.data.data.contactAddress
        this.shop.shopCityClue = res.data.data
      })
    } else {
      this.shop.spreadType = sessionStorage.getItem('accountType')
      this.shop.spreadId = sessionStorage.getItem('id')
      this.shop.spreadName = sessionStorage.getItem('accountName')
    }

    if (this.$route.query.id2) {
      /*let formdata = new FormData();
      formdata.set("id", this.$route.query.id2);*/
      let para = {
        id: this.$route.query.id2
      }
      this.Api.getApprovalDetail(para)
        .then(res => {
          // this.shop = res.data.data;
          this.approvalContent = JSON.parse(res.data.data.approvalContent);
          // storeAccount: {
          //   charactar:2,
          this.approvalContent.charactar = this.shop.charactar
          this.shop = this.approvalContent
          this.shop.spreadType = sessionStorage.getItem('accountType')
          this.shop.spreadId = sessionStorage.getItem('id')
          this.shop.spreadName = sessionStorage.getItem('accountName')
          this.shop.shopCommunicationBookList[0].must = true
          this.shop.shopCommunicationBookList[0].id = ''
          this.shop.shopCommunicationBookList[1].must = true
          this.shop.shopCommunicationBookList[1].id = ''
          this.shop.shopCommunicationBookList[2].must = true
          this.shop.shopCommunicationBookList[2].id = ''
          this.shop.shopCommunicationBookList[3].must = true
          this.shop.shopCommunicationBookList[3].id = ''
          this.shop.shopCommunicationBookList[4].must = true
          this.shop.shopCommunicationBookList[4].id = ''
          if (this.shop.shopCommunicationBookList.length == 5) {
            this.shop.shopCommunicationBookList.push({
              role: '售后专员2',
              name: '',
              phone: '',
              wechat: '',
              must: false
            })
          } else {
            this.shop.shopCommunicationBookList[5].must = false
          }
          this.shop.settleType = this.shop.settleType.toString()
          this.shop.shopInfo.companyType = this.shop.shopInfo.companyType.toString()
          this.shop.shopInfo.bcRegisterType = this.shop.shopInfo.bcRegisterType.toString()
          this.shop.rateConfig.storeRatePlatform = accMul(this.shop.rateConfig.storeRatePlatform, 100).toString()
          this.startendtime1.starttime = format(this.shop.shopInfo.contractStartTime, 'yyyy.MM.dd')
          this.startendtime1.endtime = format(this.shop.shopInfo.contractEndTime, 'yyyy.MM.dd')
          this.shop.verifyCode = ''
          this.shop.oldphone = this.shop.phone

          this.shop.province = this.shop.areaConfig.parents[1].name
          this.shop.city = this.shop.areaConfig.parents[0].name
          this.shop.region = this.shop.areaConfig.name
          this.jingying.content = this.shop.brandIdList.map(value => value.id)
          this.shop.rateConfig.id = ''
          this.shop.shopBankrollAccount.id = ''
          this.shop.shopInfo.id = ''
        })

    }
    if (this.$route.query.draft) {
      let para = {
        id: this.$route.query.draft
      }
      this.Api.detailDraft(para).then(res => {
        this.shop = JSON.parse(res.data.data.approvalContent)
        this.draftid = this.$route.query.draft
        this.startendtime1.starttime = format(this.shop.shopInfo.contractStartTime, 'yyyy.MM.dd')
        this.startendtime1.endtime = format(this.shop.shopInfo.contractEndTime, 'yyyy.MM.dd')
        this.jingying.content = this.shop.brandIdList.map(value => value.id)
      })
    }
    // window.addEventListener('scroll', this.handleScroll)
    // this.getjingying()
    // let res = await this.Api.localInside({
    //   page:{
    //     pageNo:1,
    //     pageSize:10
    //   },
    //   searchParameter:{
    //     keyWord:''
    //   }
    // });
    // console.log(res.data.data)//没弄
    // this.jingying.list =treeData(res.data.data, 'parentId', '' || null, 'id', 'name');
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped lang="scss" type="text/scss">
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
.rightmap /deep/ .van-checkbox {
  margin-left: 0;
}
.rightmap /deep/ .van-checkbox__label--left {
  width: calc(100% - 30px);
  text-align: left;
}

.rightmap {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.te {
  margin-left: 15px;
}
.te::before {
  content: '*';
  position: absolute;
  left: 12px;
  font-size: 0.37333rem;
  color: #f44;
}
.rightmap /deep/ .van-cell .van-cell__value {
  text-align: right;
  display: block;
}
.rightmap /deep/ .van-cell .van-cell__title {
  max-width: none;
}
.van-cell /deep/ .van-cell__value.telabel .van-radio__label {
  margin-left: 0 !important;
}
.rate {
  width: 100%;
  background: #ffffff;
  .rate-top {
    font-size: 14px;
    color: #000;
  }
  .rate-content {
    font-size: 12px;
    color: #000;
    margin: 8px;
  }
  .rate-bottom {
    display: flex;
    flex-direction: row-reverse;
    padding: 0 10px 10px 0;
  }
}
.provincete {
  font-size: 12px;
  text-align: center;
}
.typete {
  font-size: 12px;
  margin: 4px 8px;
}
.bottomte {
  margin: 8px 0 8px 12px;
}
</style>
