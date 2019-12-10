<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="anzhuotop">
      <van-collapse v-model="activeNames" v-show="change">
        <van-collapse-item title="状态信息" name="0" value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff0" />
          </div>
          <van-cell title="账号启用" value-class="colorC0C0C0">
            <template slot="title" disabled>
              <span class="custom-text">账号启用</span>
              <van-icon name="question-o" class="righticon" @click="question(1)" />
            </template>
            <p v-if="shop.isEnable==0">启用</p>
            <p v-if="shop.isEnable==1">停用</p>
          </van-cell>
          <van-cell title="账号状态" disabled value-class="colorC0C0C0">
            <template slot="title">
              <span class="custom-text">账号状态</span>
              <van-icon name="question-o" class="righticon" @click="question(2)" />
            </template>
            <p v-if="shop.status==1">正常</p>
            <p v-if="shop.status==2">关闭</p>
            <p v-if="shop.status==3">冻结</p>
          </van-cell>

          <van-field
            type="text"
            label="上级用户"
            :value="'省区总  '+(shop.managerCooperation.merManager.name || '')"
            disabled
          ></van-field>
          <van-cell
            title="管辖区域"
            placeholder="请选择管辖区域"
            value="查看管辖区域"
            is-link
            disabled
            v-if="!list"
            @click="area.onoff=!area.onoff;topheader.name='查看管辖区域';topheader.right9=false"
          ></van-cell>
          <!--:value="shop.managerDutyAreaConfigs[0].id"-->
          <van-cell
            title="管辖区域"
            placeholder="请选择管辖区域"
            :value="!!shop.managerDutyAreaConfigs.length ? ('已选择'+shop.managerDutyAreaConfigs.length + '个区域') : '空'"
            is-link
            @click="area.onoff=!area.onoff;topheader.name='选择管辖区域';topheader.right9=false"
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
            placeholder="请选择详细地址，门牌号...."
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
            placeholder="请选择详细地址，门牌号...."
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
            :value="shop.managerCooperation.officeName"
            value-class="colorC0C0C0"
            disabled
          ></van-cell>
          <van-field
            label
            type="textarea"
            class="tetitle"
            v-model="shop.managerCooperation.officeAddress"
            name="address"
            disabled
            v-validate="'required|length:3,50'"
            :error-message="errors.first('address')"
          ></van-field>
          <van-cell
            title="仓库地址"
            :value="shop.managerCooperation.warehouseName"
            value-class="colorC0C0C0"
            disabled
          ></van-cell>
          <van-field
            label
            type="textarea"
            class="tetitle"
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
            @change="console.log('222')"
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
            v-if="shop.managerCooperation.bcEndtime&&!longtime"
            @change="console.log('222')"
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
            value="长期"
            v-if="longtime"
            @change="console.log('222')"
            required
          >
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
              v-model="shop.managerCooperation.bcUserIdcard"
              maxlength="18"
              placeholder="请输入身份证号"
              required
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
              v-model="shop.managerCooperation.bcUserIdcard"
              placeholder="请输入身份证号"
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
        <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn" v-else>
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff2" />
          </div>
          <van-field
            type="text"
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
          <van-cell
            title="类型"
            value-class="colorC0C0C0"
            :value="shop.managerCooperation.bcRegisterType == 1 ? '个体商户' : '企业'"
          ></van-cell>
          <van-cell
            title="有效截止日期"
            :value="shop.managerCooperation.bcEndtime"
            value-class="colorC0C0C0"
            disabled
          ></van-cell>
          <van-cell title="证照" disabled value-class="teadd">
            <!--<img  :src="shop.managerCooperation.bcPicUrl" v-if="shop.managerCooperation.bcPicUrl" @click="addbcPicUrl"/>-->
            <one-not-cut class="notclickadd" :one-not-cut="shop.managerCooperation.bcPicUrl"></one-not-cut>
          </van-cell>

          <div v-if="shop.managerCooperation.bcRegisterType==1">
            <van-field
              type="text"
              label="法人姓名"
              v-model="shop.managerCooperation.bcUserName"
              disabled
              name="bcUserName"
              v-validate="'required|length:1,15'"
              :error-message="errors.first('bcUserName')"
            ></van-field>
            <van-field
              type="text"
              label="身份证号"
              v-model="shop.managerCooperation.bcUserIdcard"
              disabled
              name="bcUserIdcard"
              v-validate="'required|idcard'"
              :error-message="errors.first('bcUserIdcard')"
            ></van-field>
            <van-cell title="身份证照" disabled value-class="teadd">
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
            <van-cell title="其他证件" disabled value-class="teadd">
              <some-multiple
                class="notclickadd"
                number="8"
                :some-multiple="shop.managerCooperation.idOthrCerUrl"
              ></some-multiple>
            </van-cell>
          </div>
          <div v-if="shop.managerCooperation.bcRegisterType==2">
            <van-field
              type="text"
              label="法人姓名"
              v-model="shop.managerCooperation.bcUserName"
              disabled
            ></van-field>
            <van-field
              type="text"
              label="身份证号"
              disabled
              v-model="shop.managerCooperation.bcUserIdcard"
            ></van-field>
            <van-cell title="身份证照" disabled value-class="teadd">
              <one-not-cut
                class="idjust notclickadd"
                :one-not-cut="shop.managerCooperation.idCardJustUrl"
              ></one-not-cut>
              <one-not-cut
                class="idback notclickadd"
                :one-not-cut="shop.managerCooperation.idCardBackUrl"
              ></one-not-cut>
            </van-cell>
            <van-cell title="其他证件" disabled value-class="teadd">
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
      <van-collapse v-model="activeNames" v-show="!change">
        <van-collapse-item title="状态信息" name="0" value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff0" />
          </div>
          <van-cell title="账号启用" disabled value-class="colorC0C0C0">
            <template slot="title">
              <span class="custom-text">账号启用</span>
              <van-icon name="question-o" class="righticon" @click="question(1)" />
            </template>
            <p v-if="shop.isEnable==0">启用</p>
            <p v-if="shop.isEnable==1">停用</p>
          </van-cell>
          <van-cell title="店铺状态" disabled value-class="colorC0C0C0">
            <template slot="title">
              <span class="custom-text">账号状态</span>
              <van-icon name="question-o" class="righticon" @click="question(2)" />
            </template>
            <p v-if="shop.status==1">正常</p>
            <p v-if="shop.status==2">关闭</p>
            <p v-if="shop.status==3">冻结</p>
          </van-cell>

          <van-field
            type="text"
            label="上级用户"
            :value="'省区总  '+(shop.managerCooperation.merManager.name || '')"
            disabled
          ></van-field>
          <van-cell
            title="管辖区域"
            placeholder="请选择管辖区域"
            value="查看管辖区域"
            is-link
            disabled
            @click="area.onoff=!area.onoff;topheader.name='查看管辖区域';topheader.right9=false"
          ></van-cell>
          <!--:value="shop.managerDutyAreaConfigs[0].id"-->
        </van-collapse-item>
        <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff1" />
          </div>
          <van-cell
            title="办公地址"
            value-class="colorC0C0C0"
            :value="shop.managerCooperation.officeName"
            disabled
          ></van-cell>
          <van-field
            label
            type="textarea"
            class="tetitle"
            :value="shop.managerCooperation.officeAddress"
            disabled
          ></van-field>
          <van-cell
            title="仓库地址"
            value-class="colorC0C0C0"
            :value="shop.managerCooperation.warehouseName"
            disabled
          ></van-cell>
          <van-field
            label
            type="textarea"
            class="tetitle"
            :value="shop.managerCooperation.warehouseAddress"
            disabled
          ></van-field>
        </van-collapse-item>

        <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff2" />
          </div>
          <van-field type="text" label="营业执照号" v-model="shop.managerCooperation.bcCode" disabled></van-field>
          <van-field type="text" label="名称" v-model="shop.name" disabled></van-field>
          <van-cell
            title="类型"
            value-class="colorC0C0C0"
            :value="shop.managerCooperation.bcRegisterType == 1 ? '个体商户' : '企业'"
          ></van-cell>
          <van-cell
            title="有效截止日期"
            :value="shop.managerCooperation.bcEndtime"
            value-class="colorC0C0C0"
            disabled
          ></van-cell>
          <van-cell title="证照" disabled value-class="teadd">
            <one-not-cut class="notclickadd" :one-not-cut="shop.managerCooperation.bcPicUrl"></one-not-cut>
          </van-cell>

          <div v-if="shop.managerCooperation.bcRegisterType=='1'">
            <van-field
              type="text"
              label="法人姓名"
              :value="shop.managerCooperation.bcUserName"
              disabled
            ></van-field>
            <van-field
              type="text"
              label="身份证号"
              :value="shop.managerCooperation.bcUserIdcard"
              disabled
            ></van-field>
            <van-cell title="身份证照" disabled value-class="teadd">
              <one-not-cut
                class="idjust notclickadd"
                :one-not-cut="shop.managerCooperation.idCardJustUrl"
              ></one-not-cut>
              <one-not-cut
                class="idback notclickadd"
                :one-not-cut="shop.managerCooperation.idCardBackUrl"
              ></one-not-cut>
            </van-cell>
            <van-cell title="其他证件" disabled value-class="teadd">
              <some-multiple
                class="notclickadd"
                number="8"
                :some-multiple="shop.managerCooperation.idOthrCerUrl"
              ></some-multiple>
            </van-cell>
          </div>
          <div v-if="shop.managerCooperation.bcRegisterType=='2'">
            <van-field
              type="text"
              label="法人姓名"
              :value="shop.managerCooperation.bcUserName"
              disabled
            ></van-field>
            <van-field
              type="text"
              label="身份证号"
              :value="shop.managerCooperation.bcUserIdcard"
              disabled
            ></van-field>
            <van-cell title="身份证照" disabled value-class="teadd">
              <one-not-cut
                class="idjust notclickadd"
                :one-not-cut="shop.managerCooperation.idCardJustUrl"
              ></one-not-cut>
              <one-not-cut
                class="idback notclickadd"
                :one-not-cut="shop.managerCooperation.idCardBackUrl"
              ></one-not-cut>
            </van-cell>
            <van-cell title="其他证件" disabled value-class="teadd">
              <some-multiple
                class="notclickadd"
                number="8"
                :some-multiple="shop.managerCooperation.idOthrCerUrl"
              ></some-multiple>
            </van-cell>
          </div>
        </van-collapse-item>
        <div class="changebtn" @click="changebtn" v-if="type==3||!list">
          <div>
            <img src="@assets/img/change.png" />
          </div>
          <p>修改</p>
        </div>
      </van-collapse>
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
      <div class="rightmap" style="background-color: #fff;margin-top: 44px;">
        <choose-area :area="area" @callback="areas" ref="area" emptyText="辖区为空"></choose-area>
        <footer class="bott"></footer>
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
    <example ref="example"></example>
    <footer class="botto" v-show="area.onoff&&area.chooseno&&area.list">
      <van-button size="large" type="primary" class="submitbtn" @click="getCheckedKeys">确认</van-button>
    </footer>
    <!--<start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>-->
  </div>
</template>

<script>
import chooseArea from '@components/chooseArea/chooseArea'
import startEndTime from '@components/startEndTime/startEndTime'
import oneCut from '@components/addimg/oneCut'
import oneNotCut from '@components/addimg/oneNotCut'
import someMultiple from '@components/addimg/someMultiple'
import { format, inputup, inputup2, getAllAreas } from '@utils'
import example from '@/components/example/example'

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
      kaiguan: true,
      change: false, // 能否编辑
      longtime: false,
      activeNames: ['2', '1', '0'], // 开哪个折叠
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
        chooseno: false,
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
      idcards: '',
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

          bcRegisterType: 2, // 2,工商类型
          bcEndtime: '', // 2,有效截止日期
          bcPicUrl: '', // 2,证照

          bcUserName: '', // 2,法人姓名
          bcUserIdcard: '', // 2,法人身份证号
          idCardJustUrl: '', // 2,法人身份证正面
          idCardBackUrl: '', // 2,法人身份证反面
          idOthrCerUrl: '', // 2,其他证件
          activeTime: '', // 合同时间
          invalidTime: ''
        },
        rateConfig: {
          storeRatePlatform: '0.8', // 3,店铺平台服务费
          storeRateBase: '' // 3,店铺基准折扣
        },
        newfont: '0', // 简介字数
        areaConfig: {},
        shopInfo: {

          invoiceEmail: ''// 创建账号的错
        },
        charactar: '',
        username: '',
        name: '', // 2,营业执照名字
        phone: '',
        verifyCode: '',
        email: '',
        remarks: ''
      }
    }
  },
  components: {
    startEndTime, oneCut, oneNotCut, someMultiple, chooseArea, example
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
    longtimeclick () {  //长期
      if (this.longtime) {
        let d = new Date();
        d.setFullYear(d.getFullYear() + 99);
        this.shop.managerCooperation.bcEndtime = format(d, 'yyyy.MM.dd')
      } else {
        this.shop.managerCooperation.bcEndtime = ''
      }
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
    getCheckedKeys () {
      this.$refs.area.getCheckedKeys("嘿嘿嘿");
    },
    changebtn () {
      let para = {
        id: this.$route.query.id
      }
      this.Api.changeFirst(para).then(res => {
        if (res.data.status == 1 && res.data.data === 2) {
          this.$dialog.alert({
            message: '资料正在审核中，不能编辑'
          }).then(() => {
            // on close
          })
        } else {
          this.change = true;
          this.topheader.name = '修改资料信息';
          this.area.chooseno = true
        }
      })

    },
    goback () {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '资料信息'
        if (!this.list) {
          this.topheader.right9 = true
        }
      } else if (this.change) {
        this.$dialog.confirm({
          title: '',
          message: '您有未提交审批的修改',
          confirmButtonText: '继续编辑',
          cancelButtonText: '放弃修改'
        }).then(() => {
          // on confirm
        }).catch(() => {
          this.shop = JSON.parse(JSON.stringify(this.olddata))
          this.change = false   //禁止编辑
          this.area.chooseno = false
          this.topheader.name = '资料信息'
          this.idcards = ''
        })
      } else {
        this.$router.go(-1)
      }
    },
    /*    handleScroll () { // 自动收缩插件
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
      const activeTwo = [this.shop.managerCooperation.areaOfficeId, this.shop.managerCooperation.officeAddress, this.shop.managerCooperation.areaWarehouseId, this.shop.managerCooperation.warehouseAddress]
      const activeThree2 = [this.shop.managerCooperation.bcCode, this.shop.name, this.shop.managerCooperation.bcRegisterType, this.shop.managerCooperation.bcEndtime, this.shop.managerCooperation.bcPicUrl]
      const activeThree1 = [this.shop.managerCooperation.bcCode, this.shop.name, this.shop.managerCooperation.bcRegisterType, this.shop.managerCooperation.bcEndtime, this.shop.managerCooperation.bcPicUrl, this.shop.managerCooperation.bcUserName, this.shop.managerCooperation.bcUserIdcard, this.shop.managerCooperation.idCardJustUrl, this.shop.managerCooperation.idCardBackUrl]
      if (activeTwo.indexOf('') !== -1) {
        return false
      } else if (this.shop.managerCooperation.bcRegisterType === '2' && activeThree2.indexOf('') !== -1) {
        console.log('2')
        return false
      } else if (this.shop.managerCooperation.bcRegisterType === '1' && activeThree1.indexOf('') !== -1) {
        console.log('1')
        return false
      }

      let para = JSON.parse(JSON.stringify(this.shop))
      if (this.longtime) {
        let d = new Date();
        d.setFullYear(d.getFullYear() + 99);

        para.managerCooperation.bcEndtime = format(d, 'yyyy.MM.dd')
      }
      if (this.kaiguan) {
        this.kaiguan = false
        this.Api.changeTogether(para).then(res => {
          console.log(res.data)
          this.kaiguan = true
          if (res.data.status == 1) {
            // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 1 } })
            this.$router.push({ path: '/ApplyResult', query: { result: '提交申请成功，正在审核中',redresult:'审核结果，将消息通知申请者' } })

          } else {
            // this.$router.push({ path: '/ApplyResult', query: { win: false, type: 1, result: res.data.stateMessage } })
          }
        }).catch(error => {
          this.kaiguan = true
          console.log(error)
        })
      }

    },
    beendtimes (value) {
      this.shop.managerCooperation.bcEndtime = format(value, 'yyyy.MM.dd')
      this.beendtime.onoff = false
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
  beforeDestroy () {
    inputup2('.anzhuotop', '.app-init')
  },
  mounted () {
    inputup('.anzhuotop', '.app-init')

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
    this.area.list = this.$route.query.list
    // let para = this.$route.query.id, // 0,挂靠合作商id
    this.name = sessionStorage.getItem('accountName')
    /*let formdata = new FormData()
    formdata.set('id', this.$route.query.id)*/
    let para = {
      id: this.$route.query.id
    }
    this.Api.togetherDetail(para).then(res => {
      // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
      // setToken(res.data.phone)
      // this.shop.logo = res.data.url
      // officeName  warehouseName
      res.data.data.managerCooperation.officeName = (res.data.data.managerCooperation.areaOfficeProvince || '') + (res.data.data.managerCooperation.areaOfficeCity || '') + (res.data.data.managerCooperation.areaOfficeRegion || '')
      res.data.data.managerCooperation.warehouseName = (res.data.data.managerCooperation.areaWarehouseProvince || '') + (res.data.data.managerCooperation.areaWarehouseCity || '') + (res.data.data.managerCooperation.areaWarehouseRegion || '')
      res.data.data.managerCooperation.bcRegisterType = res.data.data.managerCooperation.bcRegisterType.toString()//数字转字符串
      this.olddata = res.data.data
      this.shop = JSON.parse(JSON.stringify(res.data.data))

      // for (let o = 0, len = this.shop.managerDutyAreaConfigs; o < len.length; o++) {
      //   this.area.userlist.push(len[o].areaConfig.id)
      //
      //
      // }
      this.area.arealist = this.shop.managerDutyAreaConfigs.map(value => value.areaConfig.id)  //选择上辖区
      // this.shop.managerCooperation.officeName = '1'
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
  div {
    width: 15px;
    height: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
