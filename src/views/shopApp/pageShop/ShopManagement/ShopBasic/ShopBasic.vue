<template>
  <div class="app-init">
    <top-column :top-header="topheader" ref="topdata" @search="searchCategory"></top-column>
    <p class="changes" @click="toChangeListId" v-if="right9">变更记录</p>
    <div class="anzhuotop">
      <van-collapse v-model="activeNames" v-if="change">
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
          <van-field
            type="text"
            label="推广人"
            :value=" shop.spreadRole +' '+ (shop.spreadName || '')"
            disabled
          ></van-field>
          <van-cell title="店主" :value="shop.storeAccount.name" value-class="colorC0C0C0"></van-cell>
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
          <van-cell title="店铺编码" :value="shop.store.code" />
          <van-cell title="入驻时间" :value="format(shop.store.approvalTime, 'yyyy-MM-dd hh:mm:ss')" />
          <van-cell title="店铺角色" v-if="shop.store.type==1" value="种子店" />
          <van-cell title="店铺角色" v-if="shop.store.type==2" value="特色店" />
          <van-field
            type="text"
            label="店招名称"
            v-model="shop.store.nickName"
            required
            name="nickName"
            v-validate="'required|length:3,20'"
            :error-message="errors.first('nickName')"
          ></van-field>
          <van-cell title="店铺头像">
            <div slot="title" class="requireds">店铺头像</div>
            <div slot="label" class="bluecolor" @click="$refs.example.changes(1)">查看示例</div>
            <one-cut @onecut="addlogo" :one-cut="shop.store.logo" filecode="FILE19011215580409"></one-cut>
          </van-cell>
          <van-cell
            title="店铺地址"
            placeholder="请选择店铺地址"
            :value="shop.store.province+shop.store.city+shop.store.region"
            is-link
            required
            @click="address.onoff1=!address.onoff1"
          ></van-cell>
          <van-field
            label
            type="textarea"
            placeholder="请选择详细地址，门牌号......"
            v-model="shop.store.address"
            name="address"
            v-validate="'required|length:3,50'"
            :error-message="errors.first('address')"
          ></van-field>
          <van-cell
            title="店铺定位"
            placeholder="搜索定位"
            value="搜索定位"
            v-if="shop.store.longitude==''"
            is-link
            required
            @click="tochooseCity"
          ></van-cell>
          <van-cell
            title="店铺定位"
            placeholder="搜索定位"
            :value="(storeaddress&&storeaddress!='返回')?storeaddress:'定位成功'"
            v-else
            is-link
            required
            @click="tochooseCity"
          ></van-cell>
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
            v-model="shop.store.bcCode"
            placeholder="请输入营业执照号"
            required
            name="bcCode"
            v-validate="'bccode'"
            :error-message="errors.first('bcCode')"
            :disabled="bcRegisterType?false:true"
          ></van-field>
          
          <van-field
            type="text"
            label="营业执照名称"
            v-model="shop.store.name"
            placeholder="请输入营业执照名称"
            :disabled="bcRegisterType?false:true"
            required
            name="name"
            v-validate="'required|length:1,30'"
            :error-message="errors.first('name')"
          ></van-field>
          <van-cell title="营业执照类型" required>
            <van-radio-group v-model="shop.store.bcRegisterType" style="display: flex;">
              <van-radio name="1" style="margin-right: 20px;">个体商户</van-radio>
              <van-radio name="2">企业</van-radio>
            </van-radio-group>
          </van-cell>
          <!--<van-cell-->
          <!--title="有效截止日期"-->
          <!--placeholder="请选择截止日期"-->
          <!--:value="shop.store.bcEndtime"-->
          <!--is-link-->
          <!--required-->
          <!--@click="beendtime.onoff=!beendtime.onoff"-->
          <!--&gt;</van-cell>-->
          <van-cell
            title="有效截止日期"
            value="请选择截止日期"
            @change="console.log('222')"
            v-if="!shop.store.bcEndtime&&!longtime"
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
            :value="shop.store.bcEndtime"
            v-else-if="shop.store.bcEndtime&&!longtime"
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
            v-else
            @change="console.log('222')"
            required
          >
            <div slot="right-icon">
              <van-checkbox v-model="longtime" @change="longtimeclick">长期</van-checkbox>
            </div>
          </van-cell>
          <van-cell title="营业执照">
            <div slot="title" class="requireds">营业执照</div>
            <div slot="label" class="bluecolor" @click="$refs.example.changes(2)">查看示例</div>
            <one-not-cut
              @onenotcut="addbcPicUrl"
              :one-not-cut="shop.store.bcPicUrl"
              filecode="FILE19011225489456"
            ></one-not-cut>
          </van-cell>

          <div v-if="shop.store.bcRegisterType==1" style="margin-top: 60px;">
            <van-field
              type="text"
              label="法人姓名"
              v-model="shop.store.bcUserName"
              placeholder="请输入名称"
              name="bcUserName"
            ></van-field>
            <van-field
              type="text"
              label="身份证号"
              v-model="shop.store.bcUserIdCard"
              placeholder="请输入身份证号"
              maxlength="18"
              name="bcUserIdcard"
              @blur="bluridcard"
              :error-message="idcards"
            ></van-field>
            <van-cell title="身份证照">
              <div slot="title">身份证照</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(3)">查看示例</div>
              <one-not-cut
                @onenotcut="addidCardJustUrl"
                class="idjust"
                :one-not-cut="shop.store.idCardJustUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
              <one-not-cut
                @onenotcut="addidCardBackUrl"
                class="idback"
                :one-not-cut="shop.store.idCardBackUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
            </van-cell>
            <!--<p class="redcolor" style="margin: 5px;text-align: left" v-if="(shop.store.bcUserIdCard!=shop.storeAccount.idCard)&&shop.store.bcRegisterType=='1'">营业执照为个体商户，且商户老板与法人身份证不同时，需上传证明资料：转让协议或授权书（盖公章）</p>-->
            <!--<van-cell title="商户老板证明资料" v-if="(shop.store.bcUserIdCard!=shop.storeAccount.idCard)&&shop.store.bcRegisterType=='1'">-->
            <!--<div slot="title" class="requireds">商户老板证明资料</div>-->
            <!--<some-multiple @somemultiple="addrunProvePic"  number="3" :some-multiple="shop.store.runProvePic"  filecode="FILE19011225489456"></some-multiple>-->
            <!---->

            <!--</van-cell>-->
            <van-cell title="其他经营许可证">
              <div slot="title">其他经营许可证</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(4)">查看示例</div>
              <some-multiple
                @somemultiple="addidOthrCerUrl"
                number="8"
                :some-multiple="shop.store.idOthrCerUrl"
                filecode="FILE19011225489456"
              ></some-multiple>
            </van-cell>
          </div>
          <div v-if="shop.store.bcRegisterType==2" style="margin-top: 60px;">
            <van-field type="text" label="法人姓名" v-model="shop.store.bcUserName" placeholder="请输入名称"></van-field>
            <van-field
              type="text"
              label="身份证号"
              v-model="shop.store.bcUserIdCard"
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
                :one-not-cut="shop.store.idCardJustUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
              <one-not-cut
                @onenotcut="addidCardBackUrl"
                class="idback"
                :one-not-cut="shop.store.idCardBackUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
            </van-cell>
            <van-cell title="其他证件">
              <div slot="title">其他证件</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(4)">查看示例</div>
              <some-multiple
                @somemultiple="addidOthrCerUrl"
                number="8"
                :some-multiple="shop.store.idOthrCerUrl"
                filecode="FILE19011225489456"
              ></some-multiple>
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
            value="生活超市"
            v-if="shop.store.type == '1'||shop.store.type == 1"
            value-class="colorC0C0C0"
            required
          ></van-cell>
          <van-cell
            title="店铺分类"
            placeholder="请选择店铺分类"
            v-else
            :value="shop.store.businessRanges"
            is-link
            required
            @click="handleBusinessRange"
          ></van-cell>
          <!-- <van-field
            type="text"
            label="店铺折扣"
            required
            placeholder="1.0-10.0  输入8即为8折"
            v-model="shop.store.rateConfig.storeRateBase"
            max="10"
            name="storeRateBase"
            v-validate="'required|decimal:1'"
            :error-message="errors.first('storeRateBase')"
            @blur="RateBase"
          >
            <div slot="button" v-if="shop.store.rateConfig.storeRateBase">折</div>
          </van-field> -->
          
         
          <van-field
            type="tel"
            label="店铺电话"
            placeholder="手机"
            v-model="shop.store.phone"
            required
          ></van-field>
          <van-cell title="店铺环境">
            <div slot="title" class="requireds">店铺环境</div>
            <div slot="label" class="bluecolor" @click="$refs.example.changes(5)">查看示例</div>
            <some-cut
              @somecut="addalbums"
              :some-cut="shop.store.albums"
              ref="albums"
              filecode="FILE19011215580409"
            ></some-cut>
          </van-cell>
          <van-field type="textarea" label="店铺简介" placeholder="请填写店铺简介" v-model="shop.store.info"></van-field>
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
            <p v-if="shop.store.platformStatus=='1'">正常</p>
            <p v-if="shop.store.platformStatus=='2'">关闭</p>
            <p v-if="shop.store.platformStatus=='3'">冻结</p>
          </van-cell>
          <van-field type="text" label="推广人" :value=" shop.spreadRole+' '+shop.spreadName" disabled></van-field>
          <van-cell title="店主" :value="shop.storeAccount.name" value-class="colorC0C0C0" disabled></van-cell>
        </van-collapse-item>
        <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff1" />
          </div>
          <van-cell title="店铺编码" :value="shop.store.code" value-class="colorC0C0C0" />
          <van-cell
            title="入驻时间"
            :value="format(shop.store.approvalTime, 'yyyy-MM-dd hh:mm:ss')"
            value-class="colorC0C0C0"
          />
          <van-cell title="店铺角色" v-if="shop.store.type==1" value="种子店" value-class="colorC0C0C0" />
          <van-cell title="店铺角色" v-if="shop.store.type==2" value="特色店" value-class="colorC0C0C0" />

          <van-cell title="店招名称" :value="shop.store.nickName" value-class="colorC0C0C0" />
          <van-cell title="店铺头像" disabled value-class="teadd">
            <one-cut class="notclickadd" :one-cut="shop.store.logo"></one-cut>
          </van-cell>
          <van-cell
            title="店铺地址"
            :value="shop.store.province+shop.store.city+shop.store.region"
            value-class="colorC0C0C0"
            disabled
          ></van-cell>
          <van-field label type="text" class="tetitle" :value="shop.store.address" disabled></van-field>
        </van-collapse-item>

        <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff2" />
          </div>
          <van-field type="text" label="营业执照号" v-model="shop.store.bcCode" disabled></van-field>

          <van-cell title="营业执照名称" :value="shop.store.name" value-class="colorC0C0C0" />
          <van-cell title="营业执照类型" disabled value-class="colorC0C0C0">
            <!--<van-radio-group :value="shop.store.bcRegisterType" disabled style="display: flex;">-->
            <!--<van-radio name="1" style="margin-right: 20px;">个体商户</van-radio>-->
            <!--<van-radio name="2">企业</van-radio>-->
            <!--</van-radio-group>-->
            <div v-if="shop.store.bcRegisterType==1">个体商户</div>
            <div v-if="shop.store.bcRegisterType==2">企业</div>
          </van-cell>
          <van-cell title="有效截止日期" :value="shop.store.bcEndtime" disabled value-class="colorC0C0C0"></van-cell>
          <van-cell title="营业执照" disabled value-class="teadd">
            <one-not-cut class="notclickadd" :one-not-cut="shop.store.bcPicUrl"></one-not-cut>
          </van-cell>

          <div style="margin-top: 60px;">
            <van-field type="text" label="法人姓名" :value="shop.store.bcUserName" disabled></van-field>
            <van-field type="text" label="身份证号" :value="shop.store.bcUserIdCard" disabled></van-field>
            <van-cell title="身份证照" disabled value-class="teadd">
              <one-not-cut class="idjust notclickadd" :one-not-cut="shop.store.idCardJustUrl"></one-not-cut>
              <one-not-cut class="idback notclickadd" :one-not-cut="shop.store.idCardBackUrl"></one-not-cut>
            </van-cell>
            <van-cell title="其他经营许可证" value-class="teadd">
              <some-multiple
                class="notclickadd"
                number="8"
                :some-multiple="shop.store.idOthrCerUrl"
              ></some-multiple>
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
           
          </van-field> -->
         
          <!-- <van-cell title="营业时间" value-class="colorC0C0C0" required is-link @click="totime">
            <p v-if="storetime.length">{{storetime[0].arrMonth}}|{{storetime[0].arrWeek}}|{{storetime[0].arrTimes}}{{storetime.length>1?'...':''}}</p>
          </van-cell> -->
          <van-field type="tel" label="店铺电话" v-model="shop.store.phone" disabled></van-field>
          <van-cell title="店铺环境" disabled value-class="teadd">
            <!--<some-cut class="notclickadd" :some-cut="shop.store.albums"></some-cut>-->
            <some-multiple class="notclickadd" :some-multiple="shop.store.albums"></some-multiple>
          </van-cell>
          <van-field type="textarea" label="店铺简介" v-model="shop.store.info" disabled></van-field>
        </van-collapse-item>
        <div class="changebtn" @click="changedata" v-if="type==3||!list">
          <div>
            <img src="@/assets/img/change.png" />
          </div>

          <p>修改</p>
        </div>
      </van-collapse>
    </div>
    <van-popup v-model="map.onoff" position="right" :overlay="false">
      <div class="rightmap" style="background: #fff;">
        <header class="heade"></header>
        <div class="maptitle">
          <label @click="address2.onoff=!address2.onoff">
            <input class="te" v-model="map.city" disabled placeholder="请选择" />
          </label>
          <label style="width: 100%;">
            <input class="te2" v-model="map.keyword" placeholder="小区/写字楼/学校 等" />
          </label>
        </div>
        <!--<label><div @click="choosemap">确定</div></label>-->
        <baidu-map :center="center" :zoom="18">
          <bm-view class="map"></bm-view>
          <bm-local-search
            class="dsa"
            :keyword="map.keyword"
            @searchcomplete="markersset"
            :auto-viewport="true"
            :province="map.province"
            :city="map.city"
            v-show="false"
          ></bm-local-search>
        </baidu-map>
        <ul>
          <li
            v-for="(item,key) in this.list2"
            :key="key"
            @click="addmap(key,item)"
            class="mapbottom"
            :class="(item.point.lat==center.lat&&item.point.lng==center.lng)?actives:''"
          >
            <div class="mapbottom-left" v-if="key==0">A</div>
            <div class="mapbottom-left" v-if="key==1">B</div>
            <div class="mapbottom-left" v-if="key==2">C</div>
            <div class="mapbottom-left" v-if="key==3">D</div>
            <div class="mapbottom-left" v-if="key==4">E</div>
            <div class="mapbottom-left" v-if="key==5">F</div>
            <div class="mapbottom-left" v-if="key==6">G</div>
            <div class="mapbottom-left" v-if="key==7">H</div>
            <div class="mapbottom-left" v-if="key==8">I</div>
            <div class="mapbottom-left" v-if="key==9">J</div>
            <div class="mapbottom-right">{{item.address}}</div>
          </li>
        </ul>
      </div>
    </van-popup>
    <van-popup v-model="jingying.onoff" position="right" :overlay="false">
      <div class="rightmap" style="margin-top:44px;background-color:#fff;">
        <choose-category
          ref="categoryEle"
          :getDataList="getStoreInsidesList"
          @initialize="initialize"
          :listConfig="insideCategory"
          :selected="selectedInsideCate"
        ></choose-category>
      </div>
    </van-popup>
    <van-popup v-model="areaConfig.onoff" position="bottom">
      <one-area :one-area="shop.store" @oneAreascallback="oneAreas"></one-area>
    </van-popup>
    <van-popup v-model="address.onoff1" position="bottom">
      <van-area
        :area-list="address.areaList"
        @confirm="chooseaddress1"
        @cancel="address.onoff1=!address.onoff1"
      />
    </van-popup>
    <van-popup v-model="address2.onoff" position="bottom">
      <van-area
        :area-list="address2.areaList"
        @confirm="chooseaddress"
        @cancel="address2.onoff=!address2.onoff"
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
    <van-popup v-model="starttime.onoff" position="bottom">
      <van-datetime-picker
        v-model="starttime.time1"
        type="time"
        :formatter="formatter"
        @confirm="starttimes"
        @cancel="starttime.onoff=!starttime.onoff"
      />
      <div style="position: fixed;left: 50%;bottom: 99px;">:</div>
    </van-popup>
    <van-popup v-model="endtime.onoff" position="bottom">
      <van-datetime-picker
        v-model="endtime.time1"
        type="time"
        :formatter="formatter"
        @confirm="endtimes"
        @cancel="endtime.onoff=!endtime.onoff"
      />
      <div style="position: fixed;left: 50%;bottom: 99px;">:</div>
    </van-popup>
    <example ref="example"></example>
    <!--<start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>-->
  </div>
</template>

<script>
import chooseArea from '@/components/chooseArea/chooseArea'
import startEndTime from '@/components/startEndTime/startEndTime'
import oneCut from '@/components/addimg/oneCut'
import oneArea from '@/components/chooseArea/oneArea'
import chooseCategory from '@/components/chooseCategory'
import oneNotCut from '@/components/addimg/oneNotCut'
import someMultiple from '@/components/addimg/someMultiple'
import someCut from '@/components/addimg/someCut'
import mapp from '@/components/mapp/mapp'
import example from '@/components/example/example'
import { format, inputup, inputup2, accMul, accDiv, num2chinese, getAllAreas } from "@utils";
import { Dialog } from 'vant'

export default {
  data () {
    return {
      format,
      right9: true,
      topheader: {
        name: '资料信息',
        left: '3',
        heade: 'header1'
      },
      
      starttime: {
        onoff: false,
        time1: '08:00'
      },
      endtime: {
        onoff: false,
        time1: '18:00'
      },
      type: '',
      list: '',
      storeId: '',
      storeaddress: '',
      change: false, // 能否编辑
      activeNames: ['2', '1', '0', '3'], // 开哪个折叠
      longtime: false,
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
      areaConfig: {
        onoff: false
      },
      area: {
        onoff: false,
        chooseno: true,
        arealist: [],
        userlist: []
      },
      jingying: { // 经营品牌
        onoff: false,
        list: []
      },
      insideCategory: {
        level: 0,
        list: []
      },
      editCheckId: "",
      beendtime: {
        onoff: false,
        minDate: new Date()
      },
      map: {
        onoff: false,
        city: '',
        province: '',
        keyword: ''
      },
      center: { lng: 116.404, lat: 39.915 },
      list2: [

      ],
      
      kaiguan: true,
      actives: 'mapcolor', //选择地区颜色
      address2: { // 选择地址
        onoff: false,
        list: {

        },
        areaList: {

        }
      },
      bcRegisterType:true, //绑卡后不能改了
      disabled: true, // 后退能否
      olddata: {},
      idcards: '',
      shop: { // 先写的同城，数据格式不一样，直接拿来当store
        managerDutyAreaConfigs: [], // 0,辖区
        store: {
          isEnable: '1', // 0,店铺启用不变
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
          businessRanges: '', //
          storeCategoryInsideId: '',  //3,店铺分类id
          stStoreCategoryIds: '',  //瞎传
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
          id: '3787'
        },

      }
    }
  },
  components: {
    startEndTime, oneCut, oneNotCut, someMultiple, someCut, chooseArea, mapp, oneArea, chooseCategory, example
  },
  watch: {
    'insideCategory.level' () {
      this.getCategoryHeader()
    }
  },
  methods: {
    searchCategory (keyword) {
      console.log(keyword)
      if (!keyword) {

        console.log(!keyword)
        // this.getCategoryHeader()
        this.$refs.categoryEle.cancelFilter()
        if (!this.jingying.onoff) {
          this.topheader = {
            name: '资料信息',
            left: '3',
            heade: 'header1',

          }
          this.right9 = true
        }
      } else {
        this.$refs.categoryEle.filterList(keyword);
      }
    },

    handleBusinessRange () {
      this.jingying.onoff = !this.jingying.onoff
      this.right9 = false
      if (this.jingying.onoff) {
        this.insideCategory.level = 0
        this.getCategoryHeader()
      }
    },
    getCategoryHeader () {
      this.topheader.right2 = true;
      this.right9 = false
      let level = this.insideCategory.level
      if (level * 1 === 0) {
        this.topheader.name = '选择店铺分类'
      } else {
        this.topheader.name = `选择${num2chinese(level + 1)}级分类`
      }
    },
    markersset (msg) {
      if (msg) {
        this.list2 = msg.Ar
      }

    },
    oneAreas (msg) {
      if (msg != '') {
        this.shop.store.province = msg[0].name
        this.shop.store.city = msg[1].name
        this.shop.store.region = msg[2].name
        this.shop.storesysAreaConfigId = msg[3].id
      }
      this.areaConfig.onoff = false
    },
    areas (msg) {
      this.shop.managerDutyAreaConfigs = msg
      this.area.onoff = false
      this.topheader.name = '资料信息'
    },
    addlogo (msg) {
      this.shop.store.logo = msg
    },
    addalbums (msg) {
      this.shop.store.albums = msg
    },
    addbcPicUrl (msg) {
      this.shop.store.bcPicUrl = msg
    },
    addidCardJustUrl (msg) {
      this.shop.store.idCardJustUrl = msg
    },
    addidCardBackUrl (msg) {
      this.shop.store.idCardBackUrl = msg
    },
    addidOthrCerUrl (msg) {
      this.shop.store.idOthrCerUrl = msg
    },
    // addrunProvePic(msg){
    //   this.shop.store.runProvePic = msg
    // },
    chooseaddress1 (msg) {
      const filtered = this.address.list.filter(element => element.code == msg[2].code)
      // this.shop.managerCooperation.areaOfficeId = filtered[0].id
      // this.shop.managerCooperation.officeName = msg[0].name + msg[1].name + msg[2].name
      this.address.onoff1 = false

      this.shop.store.province = msg[0].name
      this.shop.store.city = msg[1].name
      this.shop.store.region = msg[2].name
      this.shop.store.sysAreaConfigId = filtered[0].id
    },
    chooseaddress (msg) {
      // const filtered = this.address2.list.filter(element => element.code == msg[2].code);

      this.map.province = msg[0].name
      this.map.city = msg[1].name
      this.address2.onoff = false
    },

    addmap (key) {

      this.center.lng = this.list2[key].point.lng
      this.center.lat = this.list2[key].point.lat
      this.shop.store.longitude = this.center.lng
      this.shop.store.latitude = this.center.lat
      this.map.onoff = !this.map.onoff
      this.topheader.name = '填写资料'

    },
    tochooseCity () {
      this.$store.commit('SET_SHOP', this.shop)
      this.$store.commit('SET_STOREACCOUNT', this.storeAccount)
      this.$router.push({ path: '/searchCity', query: { list: '1' } })
    },
    longtimeclick () {  //长期
      if (this.longtime) {
        let d = new Date();
        d.setFullYear(d.getFullYear() + 99);
        this.shop.store.bcEndtime = format(d, 'yyyy.MM.dd')
      } else {
        this.shop.store.bcEndtime = ''
      }
    },
    bluridcard () {
      if (this.shop.store.bcUserIdCard == '') {
        this.idcards = ''
      } else if (!/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)/.test(this.shop.store.bcUserIdCard)) {
        this.idcards = '身份证格式不正确(如果有X则必须为大写)'

      } else {
        this.idcards = ''
      }
    },
    RateBase () {
      if (this.shop.store.rateConfig.storeRateBase > 10 || this.shop.store.rateConfig.storeRateBase < 1) {
        this.shop.store.rateConfig.storeRateBase = ''
        this.$toast('折扣最大为10折,88折请输入8.8')
      }
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
    selectedInsideCate (item, item2) {
      // this.shop.store.storeCategoryInsideId = item.id;
      // this.shop.store.businessRange = item.name
      // this.jingying.onoff=false
      // this.$refs.topdata.onCancel();


      this.shop.store.storeCategoryInsideId = item.id;
      let businessRange = ''
      for (let i = 0; i < item2.length; i++) {
        businessRange = businessRange + '-' + item2[i]
      }
      businessRange = businessRange.substr(1)
      this.shop.store.businessRange = item.name
      this.shop.store.businessRanges = businessRange
      this.jingying.onoff = false
      this.$refs.topdata.onCancel();
    },
    async getStoreInsidesList (item) {
      let params = {};
      if (item && item.id) {
        params.parentId = item.id;
      }
      let res = await this.Api.storeInsideParent(params)
      return res.data.data
    },
    goback () {
      if (this.jingying.onoff) {
        if (this.insideCategory.level > 0) {
          this.insideCategory.level--
          this.$refs.topdata.onCancel()
          return false
        }
        this.jingying.onoff = !this.jingying.onoff
        this.topheader.name = '填写资料'
        this.right9 = true
        this.topheader.right2 = false;
        this.$refs.topdata.onCancel()
      } else if (this.map.onoff) {
        this.map.onoff = !this.map.onoff
        this.topheader.name = '填写资料'
        this.right9 = true
      } else if (this.change) {
        Dialog.confirm({
          title: '',
          message: '您有未提交审批的修改',
          confirmButtonText: '继续编辑',
          cancelButtonText: '放弃修改'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // this.$router.go(-1)
          this.change = false
          sessionStorage.removeItem('lng')
          sessionStorage.removeItem('lat')
          sessionStorage.removeItem('address')
          sessionStorage.removeItem('city')
          this.storeaddress = ''
          this.topheader.name = '填写资料'
          this.shop = JSON.parse(JSON.stringify(this.olddata))
          this.longtime = false
          this.idcards = ''
        })
      } else {
        this.$router.go(-1)
      }
    },
    formatter (type, value) {
      // if(value[0]=='0'){
      //   value=value.slice(1)
      // }
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}点`
      } else if (type === 'minute') {
        return `${value}分`
      }
      return value;
    },
    starttimes () {
      this.shop.store.startTime = this.starttime.time1
      this.starttime.onoff = false
    },
    endtimes () {
      this.shop.store.endTime = this.endtime.time1
      this.endtime.onoff = false
    },
    initialize () {  //初始化
      console.log('2222')
      // this.getCategoryHeader()
      // setTimeout(() => {
      // if(this.$refs.topdata.search){
      //     this.topheader.name=''
      // }
      this.$refs.topdata.onCancel()
      // },500)

    },
    removeByValue (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (Number(arr[i]) === Number(val)) {
          arr.splice(i, 1)
          break
        }
      }
    },
    inputblur () { // 点击提交
    if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '修改店铺资料提交','' ,'' , '']);//其中灰色的为选填项
      
         }
      let para = JSON.parse(JSON.stringify(this.shop))
      /*for(let keyy in this.shop.store){
          if(this.olddata.store[keyy]!=this.shop.store[keyy]&&typeof this.olddata.store[keyy]!='object'){
              // console.log(typeof this.olddata.store[keyy], this.olddata.store[keyy],this.shop.store[keyy])
            para.store[keyy]=this.shop.store[keyy]
          }

      }*/
      if (para.store.rateConfig.storeRateBase) {
        para.store.rateConfig.storeRateBase = accDiv(para.store.rateConfig.storeRateBase, 10)
      }
      //企业
      const activeTwo = [this.shop.store.nickName, this.shop.store.logo, this.shop.store.province, this.shop.store.address, this.shop.store.longitude, this.shop.store.bcCode, this.shop.store.name, this.shop.store.bcEndtime, this.shop.store.bcPicUrl, this.shop.store.businessRange, this.shop.store.rateConfig.storeRateBase, this.shop.store.startTime, this.shop.store.endTime, this.shop.store.phone, this.shop.store.albums, this.$refs.albums.urls.one0, this.$refs.albums.urls.one1, this.$refs.albums.urls.one2];
      //个人
      const activeOne = [this.shop.store.nickName, this.shop.store.logo, this.shop.store.province, this.shop.store.address, this.shop.store.longitude, this.shop.store.bcCode, this.shop.store.name, this.shop.store.bcEndtime, this.shop.store.bcPicUrl, this.shop.store.businessRange, this.shop.store.rateConfig.storeRateBase, this.shop.store.startTime, this.shop.store.endTime, this.shop.store.phone, this.shop.store.albums, this.$refs.albums.urls.one0, this.$refs.albums.urls.one1, this.$refs.albums.urls.one2];
      if (this.shop.store.bcRegisterType === '2' && activeTwo.indexOf('') === -1) {

        console.log('11111')
      } else if (this.shop.store.bcRegisterType === '1' && activeOne.indexOf('') === -1) {
        //  this.shop.storeAccount.idCard != this.shop.store.bcUserIdCard&& !this.shop.store.runProvePic
        //   if(this.shop.storeAccount.idCard != this.shop.store.bcUserIdCard){
        //     this.$toast('请填写完整')
        //     return false
        //   }
      } else {
        this.$toast('请填写完整')
        return false
      }
      console.log('222222')
      if (this.kaiguan) {
        this.kaiguan = false
        this.Api.storeupdateapprove(para).then(res => {
          this.kaiguan = true
          if (res.data.status == 1) {
            // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 1, result: res.data.stateMessage } })
            this.$router.push({ path: '/ApplyResult', query: { result: '提交申请成功 正在审核中',redresult:'审核结果将消息通知申请者'} })
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
      this.shop.store.bcEndtime = format(value, 'yyyy.MM.dd')
      this.beendtime.onoff = false
      // this.shop.store.activeTime = format(value, 'yyyy-MM-dd hh:mm:ss')
      // this.shop.store.invalidTime = format(value, 'yyyy-MM-dd hh:mm:ss')
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
      this.shop.store.startTime = msg.oldtime
      this.shop.store.endTime = msg.newtime
    },
    changedata () {
if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '修改店铺资料','' ,'' , '']);//其中灰色的为选填项
      
         }
      let para = {
        storeId: this.shop.store.id
      }

      this.Api.changeFirstStore2(para).then(res => {
        console.log(res)
        // res.data.data.managerCooperation.bcRegisterType=res.data.data.managerCooperation.bcRegisterType.toString()//数字转字符串
        if (res.data.data) {
          this.$dialog.alert({
            message: '资料正在审核中，不能编辑'
          }).then(() => {
            // on close
          })

        } else {
          this.change = true;
          this.topheader.name = '修改资料信息'
        }
      }).catch(error => {
        console.log(error)
      })


    },
    toChangeListId () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '变更记录','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({ path: "/ShopChangeList", query: { storeId: this.storeId } })
    }
  },

  mounted () {
    if(this.$route.query.bcRegisterType==='2'){
      this.bcRegisterType=false
    }
    this.Api.allArea({}).then(res => {
      if (res.data.data) {
        this.address.list = res.data.data.list
        this.address2.list = res.data.data.list

        this.address.areaList = getAllAreas(res.data.data)
        this.address2.areaList = getAllAreas(res.data.data)
      } else {
        return false
      }
    })




    this.type = sessionStorage.getItem('accountType')
    // let para = this.$route.query.id, // 0,挂靠合作商id
    this.name = sessionStorage.getItem('accountName')
    /*let formdata = new FormData()
    formdata.set('storeId', this.$route.query.id)*/
    let para = {
      storeId: this.$route.query.id
    }
    this.Api.storeDetail(para).then(res => {

      // res.data.data.managerCooperation.bcRegisterType=res.data.data.managerCooperation.bcRegisterType.toString()//数字转字符串
      this.olddata = JSON.parse(JSON.stringify(res.data.data))
      this.shop = Object.assign({}, res.data.data)
      this.olddata.store.rateConfig.storeRateBase = accMul(this.olddata.store.rateConfig.storeRateBase, 10)
      this.shop.store.rateConfig.storeRateBase = accMul(this.shop.store.rateConfig.storeRateBase, 10)

      this.insideCategory.list = [];
      let categoryInside = this.shop.storeCategoryInside;
      if (categoryInside && categoryInside.parents) {
        let ids = categoryInside.parentIds ? categoryInside.parentIds.split(',') : [];
        ids.map(item => {
          if (item != 'null' && item) {
            for (let i = categoryInside.parents.length - 1; i >= 0; i--) {
              if (categoryInside.parents[i].id === item) {
                this.insideCategory.list.push(categoryInside.parents[i])
              }
            }
          }
        })
      }
      this.insideCategory.list.push(categoryInside);

      let businessRange = ''

      for (let i = 0; i < this.shop.storeCategoryInside.parents.length; i++) {
        businessRange = businessRange + '-' + this.shop.storeCategoryInside.parents[i].name
      }
      businessRange = businessRange + '-' + this.shop.storeCategoryInside.name
      this.shop.store.businessRanges = businessRange.substr(1)

      let businessRanges = ''

      for (let i = 0; i < this.shop.storeCategoryInside.parents.length; i++) {
        businessRanges = businessRanges + '-' + this.shop.storeCategoryInside.parents[i].name
      }
      businessRanges = businessRanges + '-' + this.shop.storeCategoryInside.name
      this.olddata.store.businessRanges = businessRanges.substr(1)


      this.starttime.time1 = this.shop.store.startTime
      this.endtime.time1 = this.shop.store.endTime
      this.storeId = res.data.data.store.id;
      if (sessionStorage.getItem('address')) {
        this.changedata()

      }
      if (this.$store.state.record.shop) {
        this.shop = this.$store.state.record.shop
      }
      if (sessionStorage.getItem('address') && sessionStorage.getItem('lng')) {
        this.shop.store.longitude = sessionStorage.getItem('lng')
        this.shop.store.latitude = sessionStorage.getItem('lat')
        this.storeaddress = sessionStorage.getItem('address')
      }
    }).catch(error => {
      console.log(error)
    })


    // window.addEventListener('scroll', this.handleScroll)
    inputup('.anzhuotop', '.app-init')
  },
  beforeDestroy () {
    inputup2('.anzhuotop', '.app-init')
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)
  },
  beforeRouteLeave (to, form, next) {
    if (to.path == '/ShopManagement' || to.path == '/ApplyResult') {
      sessionStorage.removeItem('lng')
      sessionStorage.removeItem('lat')
      sessionStorage.removeItem('address')
      sessionStorage.removeItem('city')
      this.$store.commit('SET_SHOP', '')
    }
    next()
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.map {
  width: 100%;
  height: 300px;
}
.map + div /deep/ li {
  font-size: 15px !important;
  line-height: 20px !important;
}

.map + div div div {
  font-size: 15px !important;
  line-height: 20px !important;
}

.map + div li div {
  font-size: 15px !important;
  line-height: 20px !important;
}

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

.maptitle {
  width: 85%;
  margin-left: 18px;
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .te {
    width: 80px;
    border-radius: 30px 0 0 30px;
    padding-left: 10px;
  }
  .te2 {
    width: 100%;
    border-radius: 0 30px 30px 0;
  }
  input {
    height: 30px;
    font-size: 14px;
    background: rgba(246, 246, 246, 1);
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 1);
    padding: 0 10px;
  }
}
.mapbottom {
  width: 90%;
  min-height: 30px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  margin-left: 10%;
  color: #999;
  border-bottom: 1px solid #ededed;
  .mapbottom-left {
    width: 15%;
    line-height: 20px;
    font-size: 16px;
  }
  .mapbottom-right {
    width: 70%;
    font-size: 13px;
    line-height: 20px;
    margin-bottom: 16px;
  }
}
.mapcolor {
  color: #2294f4;
}
.changes {
  position: fixed;
  top: 0;
  right: 4.8vw;
  z-index: 199999;
  color: #fff;
  line-height: 11.733vw;
}
</style>
