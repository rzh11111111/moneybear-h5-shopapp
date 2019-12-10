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
        <van-field type="text" label="审核名称" :value="shop.name" readonly/>
        <van-field type="text" label="审核类型" :value="returnServiceType(shop.serviceType)" readonly/>
        <van-field type="text" label="申请时间" :value="shop.createTime" readonly/>
        <van-field type="text" label="审核状态" :value="returnDelFlag(shop.delFlag)" readonly/>
        <van-cell-group>
          <van-field label="拒绝理由" type="textarea" :value="shop.remarks" rows="1" autosize readonly v-if="shop.delFlag==3"/>
          <van-field label="备注" type="textarea" :value="shop.remarks" rows="1" autosize readonly v-else/>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <div v-if="type==2">
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
            :value="approvalContent.approvalTime==null?'':format(approvalContent.approvalTime, 'yyyy-MM-dd hh:mm:ss')"
            readonly
          ></van-field>
          <van-field
            type="text"
            label="角色"
            :value="returnAccountType(approvalContent.accountType)"
            readonly
          ></van-field>
          <van-field
            type="text"
            label="登录名"
            :value="approvalContent.username"
            readonly
          ></van-field>
          <van-field
            type="text"
            label="手机号"
            :value="approvalContent.phone"
            readonly
          ></van-field>
          <van-field
            type="text"
            label="邮箱"
            :value="approvalContent.email"
            readonly
          ></van-field>
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
          <van-field
            type="text"
            label="帐号状态"
            :value="returnStatus(approvalContent.status)"
            readonly
          />
          <van-field
            type="text"
            label="上级用户"
            v-if="!!approvalContent.managerCooperation && !!approvalContent.managerCooperation.merManager"
            :value="approvalContent.managerCooperation.merManager.name"
            readonly
          />
          <van-cell
            title="管辖区域"
            placeholder="查看管辖区域"
            value="查看管辖区域"
            is-link
            @click="area.onoff=!area.onoff;topheader.name='查看管辖区域'"
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
            style="margin-left:12px;"
            v-if="approvalContentSuccess!=null && approvalContentSuccess.managerCooperation != null && approvalContentSuccess.managerCooperation.areaOfficeProvince != null && change(approvalContent.managerCooperation.areaOfficeRegion,approvalContentSuccess.managerCooperation.areaOfficeRegion)"
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
            v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.officeAddress,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.officeAddress)"
            :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.officeAddress)"
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
            style="margin-left:12px;"
            v-if="approvalContentSuccess!=null && approvalContentSuccess.managerCooperation != null && approvalContentSuccess.managerCooperation.areaWarehouseProvince != null && change(approvalContent.managerCooperation.areaWarehouseRegion,approvalContentSuccess.managerCooperation.areaWarehouseRegion)"
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
            v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.warehouseAddress,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.warehouseAddress)"
            :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.warehouseAddress)"
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
            v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcCode,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcCode)"
            :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcCode)"
            readonly
            error
          />
          <van-field
            type="text"
            label="名称"
            :value="approvalContent.name"
            readonly
          />
          <van-field
            type="text"
            style="margin-left:12px;"
            :value="'变更前：'+approvalContentSuccess.name"
            readonly
            error
            v-if="approvalContentSuccess!=null && change(approvalContent.name,approvalContentSuccess.name)"
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
            v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcRegisterType,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcRegisterType)"
            :value="'变更前：'+(returnRegisterType(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcRegisterType))"
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
            v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcEndtime,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcEndtime)"
            :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcEndtime)"
            readonly
            error
          />
          <van-cell title="证照" value-class="teadd">
            <one-not-cut class="notclickadd" :one-not-cut="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcPicUrl"></one-not-cut>
          </van-cell>
          <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcPicUrl,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcPicUrl)">
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
            :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcUserName)"
            readonly
            error
            v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcUserName,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcUserName)"
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
            :value="'变更前：'+(approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcUserIdcard)"
            readonly
            error
            v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcUserIdcard,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.bcUserIdcard)"
          />
          <van-cell title="法人身份证" value-class="teadd">
            <one-not-cut class="notclickadd" :one-not-cut="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idCardBackUrl"></one-not-cut>
            <one-not-cut class="notclickadd" :one-not-cut="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idCardJustUrl"></one-not-cut>
          </van-cell>
          <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && (change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idCardBackUrl,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.idCardBackUrl) || change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idCardJustUrl,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.idCardJustUrl))">
            <p style="color:#f44">变更前：</p>
            <one-not-cut :one-not-cut="approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.idCardBackUrl" class="notclickadd"></one-not-cut>
            <one-not-cut :one-not-cut="approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.idCardJustUrl" class="notclickadd"></one-not-cut>
          </van-cell>
          <van-cell title="其他证件" value-class="teadd">
            <one-not-cut class="notclickadd" :one-not-cut="src" :key="index" v-for="(src,index) in approvalContent.managerCooperation==null?'':(approvalContent.managerCooperation.idOthrCerUrl?approvalContent.managerCooperation.idOthrCerUrl.split(','):'')"></one-not-cut>
          </van-cell>
          <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && change(approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idOthrCerUrl,approvalContentSuccess.managerCooperation==null?'':approvalContentSuccess.managerCooperation.idOthrCerUrl)">
            <p style="color:#f44">变更前：</p>
            <one-not-cut class="notclickadd" :one-not-cut="src" :key="index" v-for="(src,index) in approvalContentSuccess.managerCooperation==null?'':(approvalContentSuccess.managerCooperation.idOthrCerUrl?approvalContentSuccess.managerCooperation.idOthrCerUrl.split(','):'')"></one-not-cut>
          </van-cell>
        </van-collapse-item>
      </van-collapse>
      <!--<van-collapse v-model="activeNames" class="margintop">-->
          <!--<van-collapse-item title="费率和合同" name="5" value=" " value-class="collapsewarn">-->
              <!--<div slot="icon" class="vant-collapse-icon"></div>-->
              <!--<div slot="value">-->
                  <!--<van-icon name="info-o" v-show="activewarn.onoff3"/>-->
              <!--</div>-->
              <!--<div class="floatBox">-->
                  <!--<h3>费率</h3>-->
                  <!--<div class="border">-->
                      <!--<p class="fb-left">管辖区域内种子商户、特色商户平台销售额的</p>-->
                      <!--<p class="fb-right">0.3％</p>-->
                  <!--</div>-->
                  <!--<div class="border">-->
                      <!--<p class="fb-left">管辖区域内同城企业平台销售额的</p>-->
                      <!--<p class="fb-right">0.3％</p>-->
                  <!--</div>-->
                  <!--注：自己开发的不重复提成，最多就0.3%提成-->
                  <!--<div class="border">-->
                      <!--<p class="fb-left">配送平台商品，获得该商品订单价格的</p>-->
                      <!--<p class="fb-right">3％</p>-->
                  <!--</div>-->
                  <!--注：配送费由商品所属企业承担。-->
              <!--</div>-->
              <!--<div class="floatBox">-->
                  <!--<h3>合同照片</h3>注：必须包含首页、费率页、合作期限页、签章页。-->
                  <!--<van-cell value-class="teadd" class="imgBox-cell">-->
                    <!--<one-not-cut :one-not-cut="src" class="notclickadd" :key="keys" v-for="(src,keys) in approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.contractPicUrls.split(',')"></one-not-cut>-->
                  <!--</van-cell>-->
              <!--</div>-->
          <!--</van-collapse-item>-->
      <!--</van-collapse>-->
    </div>

    <div v-if="type==1">
      <van-collapse v-model="activeNames" class="margintop">
        <van-collapse-item name="1" title="账号信息" value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="title" style="width: 35vw">账号信息</div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff0"/>
          </div>
          <van-field
            type="text"
            label="编码"
            :value="approvalContent.code"
            readonly
          />
          <van-field
            type="text"
            label="入驻时间"
            :value="format(new Date(approvalContent.createTime), 'yyyy-MM-dd hh:mm:ss')"
            readonly
          />
          <van-field
            type="text"
            label="角色"
            :value="returnAccountType(approvalContent.accountType)"
            readonly
          />
          <van-field
            type="text"
            label="登录名"
            :value="approvalContent.username"
            readonly
          />
          <van-field
            type="text"
            label="手机号"
            :value="approvalContent.phone"
            readonly
          />
          <van-field
            type="text"
            label="邮箱"
            :value="approvalContent.email"
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
            label="帐号启用"
            :value="approvalContent.isEnable==0?'启用':'停用'"
            readonly
          />
          <van-field
            type="text"
            label="帐号状态"
            :value="returnStatus(approvalContent.status)"
            readonly
          />
          <van-field type="text" label="上级省区总" :value="approvalContent.managerSpread==null?'':approvalContent.managerSpread.merManagerBoss.name" readonly/>
          <van-field
            type="text"
            label="所属合作商"
            :value="approvalContent.managerSpread==null?'':approvalContent.managerSpread.merManager.name"
            readonly
          />
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
            value-class="colorC0C0C0"
            :value="approvalContent.managerSpread==null?'':(approvalContent.managerSpread.areaHomeRegion?(approvalContent.managerSpread.areaHomeProvince+approvalContent.managerSpread.areaHomeCity+approvalContent.managerSpread.areaHomeRegion):'')"
            disabled
          ></van-cell>
          <van-field
            type="text"
            style="margin-left:12px;"
            :value="'变更前：'+(approvalContentSuccess.managerSpread==null?'':(approvalContentSuccess.managerSpread.areaHomeRegion?(approvalContentSuccess.managerSpread.areaHomeProvince+approvalContentSuccess.managerSpread.areaHomeCity+approvalContentSuccess.managerSpread.areaHomeRegion):''))"
            readonly
            error
            v-if="approvalContentSuccess!=null &&approvalContentSuccess.managerSpread !=null &&approvalContentSuccess.managerSpread.areaHomeRegion !=null && change(approvalContent.managerSpread==null?'':(approvalContent.managerSpread.areaHomeRegion?approvalContent.managerSpread.areaHomeRegion:''),approvalContentSuccess.managerSpread==null?'':(approvalContentSuccess.managerSpread.areaHomeRegion?approvalContentSuccess.managerSpread.areaHomeRegion:''))"
          />

          <van-field
            label=""
            type="textarea"
            class="tetitle"
            :value="approvalContent.managerSpread==null?'':approvalContent.managerSpread.address"
            disabled
          ></van-field>
          <van-field
            type="text"
            style="margin-left:12px;"
            :value="'变更前：'+(approvalContentSuccess.managerSpread==null?'':approvalContentSuccess.managerSpread.address)"
            readonly
            error
            v-if="approvalContentSuccess!=null && change(approvalContent.managerSpread==null?'':approvalContent.managerSpread.address,approvalContentSuccess.managerSpread==null?'':approvalContentSuccess.managerSpread.address)"
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
            label="姓名"
            :value="approvalContent.name"
            readonly
          />
          <van-field
            type="text"
            style="margin-left:12px;"
            :value="'变更前：'+(approvalContentSuccess.name)"
            readonly
            error
            v-if="approvalContentSuccess!=null && change(approvalContent.name,approvalContentSuccess.name)"
          />
          <van-field
            type="text"
            label="身份证号"
            :value="approvalContent.managerSpread==null?'':approvalContent.managerSpread.idCard"
            readonly
          />
          <van-field
            type="text"
            style="margin-left:12px;"
            :value="'变更前：'+(approvalContentSuccess.managerSpread==null?'':approvalContentSuccess.managerSpread.idCard)"
            readonly
            error
            v-if="approvalContentSuccess!=null && change(approvalContent.managerSpread==null?'':approvalContent.managerSpread.idCard,approvalContentSuccess.managerSpread==null?'':approvalContentSuccess.managerSpread.idCard)"
          />
          <van-cell title="身份证" value-class="teadd">
            <one-not-cut class="notclickadd" :one-not-cut="approvalContent.managerSpread==null?'':approvalContent.managerSpread.idCardJustUrl"></one-not-cut>
            <one-not-cut class="notclickadd" :one-not-cut="approvalContent.managerSpread==null?'':approvalContent.managerSpread.idCardBackUrl"></one-not-cut>
          </van-cell>
          <van-cell title="" value-class="teadd" v-if="approvalContentSuccess!=null && (change(approvalContent.managerSpread==null?'':approvalContent.managerSpread.idCardJustUrl,approvalContentSuccess.managerSpread==null?'':approvalContentSuccess.managerSpread.idCardJustUrl) || change(approvalContent.managerSpread==null?'':approvalContent.managerSpread.idCardBackUrl,approvalContentSuccess.managerSpread==null?'':approvalContentSuccess.managerSpread.idCardBackUrl))">
            <p style="color:#f44">变更前：</p>
            <one-not-cut :one-not-cut="approvalContentSuccess.managerSpread.idCardJustUrl" class="notclickadd"></one-not-cut>
            <one-not-cut :one-not-cut="approvalContentSuccess.managerSpread.idCardBackUrl" class="notclickadd"></one-not-cut>
          </van-cell>
        </van-collapse-item>
      </van-collapse>
      <!--<van-collapse v-model="activeNames" class="margintop">-->
        <!--<van-collapse-item title="费率和合同" name="5" value=" " value-class="collapsewarn">-->
          <!--<div slot="icon" class="vant-collapse-icon"></div>-->
          <!--<div slot="value">-->
            <!--<van-icon name="info-o" v-show="activewarn.onoff3"/>-->
          <!--</div>-->
          <!--<div class="floatBox">-->
            <!--<h3>费率</h3>-->
            <!--<div class="border">-->
              <!--<p class="fb-left">推广种子商户，获得种子商户平台销售额的</p>-->
              <!--<p class="fb-right">0.15％</p>-->
            <!--</div>注：省区总获得推广员提成的 10%-->
            <!--<div class="border">-->
              <!--<p class="fb-left">推广特色商户，获得特色商户平台销售额的</p>-->
              <!--<p class="fb-right">0.3％</p>-->
            <!--</div>注：省区总获得推广员提成的 10%-->
            <!--<div class="border">-->
              <!--<p class="fb-left">推广同城企业，获得同城企业平台销售额的</p>-->
              <!--<p class="fb-right">0.3％</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash; <div class="floatBox" v-if="shop.delFlag == 3">-->
            <!--<div class="btnBox">-->
              <!--<van-button type="primary" class="btn">重新提交</van-button>-->
            <!--</div>-->
          <!--</div> &ndash;&gt;-->
        <!--</van-collapse-item>-->
      <!--</van-collapse>-->
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
          <choose-area :area="area" @callback="areas"></choose-area>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import oneArea from "@/components/chooseArea/oneArea";
import chooseArea from '@/components/chooseArea/chooseArea'
import oneNotCut from '@components/addimg/oneNotCut'
import { format } from "../../../../../utils";
export default {
  data() {
    return {
      approvalContentSuccess: {},
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
      if (msg != "") {
     
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
    }
    // let formdata = new FormData();
    // formdata.set("id", this.$route.query.id);
    this.Api.getApprovalDetail(para)
      .then(res => {
        this.shop = res.data.data;
        this.approvalContent = JSON.parse(res.data.data.approvalContent);
        this.approvalContentSuccess = JSON.parse(res.data.data.approvalContentSuccess);
        console.log("变更后：",this.approvalContent);
        console.log("变更前：",this.approvalContentSuccess);
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
.imgBox-cell {
  padding: 0;
}
</style>
