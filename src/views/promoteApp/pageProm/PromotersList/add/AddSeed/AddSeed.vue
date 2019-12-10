<template>
  <div class="app-init">
    <top-column :top-header="topheader" ref="topdata" @search="searchCategory"></top-column>
    <div class="anzhuotop">
      <div v-show="steps==1">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="状态信息" name="0" value-class="collapsewarn" v-show="false">
            <div slot="icon" class="vant-collapse-icon"></div>
            <div slot="value">
              <van-icon name="info-o" v-show="activewarn.onoff0"></van-icon>
            </div>
            <van-cell title="店铺启用" required>
              <template slot="title">
                <span class="custom-text">店铺启用</span>
                <van-icon name="question-o" class="righticon" @click="question2(1)"></van-icon>
              </template>
              <van-radio-group value="1" disabled style="display: flex;">
                <van-radio name="1" style="margin-right: 20px;">启用</van-radio>
                <van-radio name="2">停用</van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell title="店铺状态" required disabled>
              <template slot="title">
                <span class="custom-text">店铺状态</span>
                <van-icon name="question-o" class="righticon" @click="question2(2)"></van-icon>
              </template>
              <van-radio-group value="1" disabled style="display: flex;">
                <van-radio name="1" style="margin-right: 20px;">正常</van-radio>
                <van-radio name="2" style="margin-right: 20px;">关闭</van-radio>
                <van-radio name="3">冻结</van-radio>
              </van-radio-group>
            </van-cell>
            <van-field
              type="text"
              label="推广人"
              disabled
              v-if="shop.spreadType=='4'||shop.spreadType=='5'"
              :value="'店主  '+shop.spreadName"
              required
              readonly
            ></van-field>
            <van-field
              type="text"
              label="推广人"
              v-if="shop.spreadType=='3'"
              :value="'省区总  '+shop.spreadName"
              required
              readonly
            ></van-field>
            <van-field
              type="text"
              label="推广人"
              v-if="shop.spreadType=='2'"
              :value="'合作商  '+shop.spreadName"
              required
              readonly
            ></van-field>
            <van-field
              type="text"
              label="推广人"
              v-if="shop.spreadType=='1'"
              :value="'推广员  '+shop.spreadName"
              required
              readonly
            ></van-field>
            <van-field
              type="text"
              label="推广人"
              v-if="shop.spreadType=='0'"
              :value="'店主  '+shop.spreadName"
              required
              readonly
            ></van-field>
            <van-field type="text" label="店主" value="系统自动生成" required readonly></van-field>
          </van-collapse-item>
          <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn">
            <div slot="icon" class="vant-collapse-icon"></div>
            <div slot="value">
              <van-icon name="info-o" v-show="activewarn.onoff1"></van-icon>
            </div>
            <van-field
              type="text"
              label="店铺角色"
              value="种子商户"
              v-if="shop.type=='1'"
              required
              disabled
            ></van-field>
            <van-field type="text" label="店铺角色" value="特色商户" v-else required disabled></van-field>
            <van-field
              type="text"
              label="店招名称"
              v-model="shop.nickName"
              placeholder="请输入店招名称"
              required
              name="nickName"
              v-validate="'required|emoji:3,20'"
              :error-message="errors.first('nickName')"
            >
              <div slot="right-icon" @click="nickNameInfo">
                <van-icon name="info-o" />
              </div>
            </van-field>

            <van-cell title="店铺头像">
              <div slot="title" class="requireds">店铺头像</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(1)">查看示例</div>
              <one-cut @onecut="addlogo" :one-cut="shop.logo" filecode="FILE19011215580409"></one-cut>
            </van-cell>
            <van-cell
              title="店铺地址"
              placeholder="请选择店铺地址"
              value="请选择店铺地址"
              v-if="!shop.region"
              value-class="colorC0C0C0"
              is-link
              required
              @click="areaConfig.onoff=!areaConfig.onoff"
            ></van-cell>
            <van-cell
              title="店铺地址"
              placeholder="请选择店铺地址"
              :value="shop.province+shop.city+shop.region"
              v-else
              is-link
              required
              @click="areaConfig.onoff=!areaConfig.onoff"
            ></van-cell>
            <van-field
              label
              type="text"
              class="tetitle"
              placeholder="请选择详细地址，如道路.门牌号等信息"
              v-model="shop.address"
              name="address"
              v-validate="'required|emoji:3,50'"
              :error-message="errors.first('address')"
            ></van-field>
            <van-cell
              title="店铺定位"
              placeholder="搜索定位"
              value="搜索定位"
              v-if="shop.longitude==''"
              is-link
              required
              @click="tochooseCity"
            ></van-cell>

            <van-cell
              title="店铺定位"
              placeholder="搜索定位"
              :value="storeaddress?storeaddress:'定位成功'"
              v-else
              is-link
              required
              @click="tochooseCity"
            ></van-cell>
          </van-collapse-item>
          <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn">
            <div slot="icon" class="vant-collapse-icon"></div>
            <div slot="value">
              <van-icon name="info-o" v-show="activewarn.onoff2"></van-icon>
            </div>
            <van-field
              type="text"
              label="营业执照号"
              v-model="shop.bcCode"
              placeholder="请输入营业执照号"
              required
              @blur="storecode"
            ></van-field>
            <div v-if="codeerror">
              <van-cell
                :title="codeerror"
                v-if="codeerror==='该营业执照与已有店铺重复。请评估是否可入驻。'"
                title-style="color:red;max-width:100%"
                is-link
                @click="shoplist.onoff=!shoplist.onoff;topheader.name='店铺列表';topheader.right11=false"
              />
              <van-cell :title="codeerror" v-else title-style="color:red;max-width:100%" />
            </div>
            <van-field
              type="text"
              label="营业执照名称"
              v-model="shop.name"
              placeholder="请输入营业执照名称"
              required
              name="name"
              v-validate="'required|emoji:1,30'"
              :error-message="errors.first('name')"
            ></van-field>
            <van-cell title="营业执照类型" required>
              <van-radio-group v-model="shop.bcRegisterType" style="display: flex;">
                <van-radio name="1" style="margin-right: 20px;">个体商户</van-radio>
                <van-radio name="2">企业</van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell
              title="有效截止日期"
              value="请选择截止日期"
              @change="console.log('222')"
              v-if="!shop.bcEndtime&&!longtime"
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
              :value="shop.bcEndtime"
              v-else-if="shop.bcEndtime&&!longtime"
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
                :one-not-cut="shop.bcPicUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
            </van-cell>

            <div v-if="shop.bcRegisterType==1">
              <van-field
                type="text"
                label="法人姓名"
                v-model="shop.bcUserName"
                placeholder="请输入名称"
                @blur="storeAccount.name=shop.bcUserName"
                name="bcUserName"
              ></van-field>
              <van-field
                type="text"
                label="身份证号"
                maxlength="18"
                v-model="shop.bcUserIdCard"
                placeholder="请输入身份证号"
                @blur="bluridcard"
                :error-message="idcards"
                name="bcUserIdcard"
              ></van-field>
              <van-cell title="身份证照">
                <div slot="title">身份证照</div>
                <div slot="label" class="bluecolor" @click="$refs.example.changes(3)">查看示例</div>
                <one-not-cut
                  @onenotcut="addidCardJustUrl"
                  class="idjust"
                  :one-not-cut="shop.idCardJustUrl"
                  filecode="FILE19011225489456"
                ></one-not-cut>
                <one-not-cut
                  @onenotcut="addidCardBackUrl"
                  class="idback"
                  :one-not-cut="shop.idCardBackUrl"
                  filecode="FILE19011225489456"
                ></one-not-cut>
              </van-cell>

              <van-cell title="其他经营许可证">
                <div slot="title">其他经营许可证</div>
                <div slot="label" class="bluecolor" @click="$refs.example.changes(4)">查看示例</div>
                <some-multiple
                  @somemultiple="addidOthrCerUrl"
                  number="8"
                  :some-multiple="shop.idOthrCerUrl"
                  filecode="FILE19011225489456"
                ></some-multiple>
              </van-cell>
            </div>
            <div v-if="shop.bcRegisterType==2">
              <van-field
                type="text"
                label="法人姓名"
                v-model="shop.bcUserName"
                @blur="storeAccount.name=shop.bcUserName"
                placeholder="请输入名称"
              ></van-field>
              <van-field
                type="text"
                label="身份证号"
                maxlength="18"
                v-model="shop.bcUserIdCard"
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
                  :one-not-cut="shop.idCardJustUrl"
                  filecode="FILE19011225489456"
                ></one-not-cut>
                <one-not-cut
                  @onenotcut="addidCardBackUrl"
                  class="idback"
                  :one-not-cut="shop.idCardBackUrl"
                  filecode="FILE19011225489456"
                ></one-not-cut>
              </van-cell>
              <van-cell title="其他经营许可证">
                <div slot="title">其他经营许可证</div>
                <div slot="label" class="bluecolor" @click="$refs.example.changes(4)">查看示例</div>
                <some-multiple
                  @somemultiple="addidOthrCerUrl"
                  number="8"
                  :some-multiple="shop.idOthrCerUrl"
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
              v-if="shop.type == '1'"
              value-class="colorC0C0C0"
              required
            ></van-cell>
            <van-cell
              title="店铺分类"
              placeholder="请选择店铺分类"
              value="请选择店铺分类"
              v-else-if="!shop.businessRange"
              value-class="colorC0C0C0"
              is-link
              required
              @click="handleBusinessRange"
            ></van-cell>
            <van-cell
              title="店铺分类"
              placeholder="请选择店铺分类"
              :value="shop.businessRanges"
              v-else
              is-link
              required
              @click="handleBusinessRange"
            ></van-cell>
            <!-- <van-field
              type="text"
              label="店铺折扣"
              required
              placeholder="1.0-10.0  输入8即为8折"
              v-model="shop.rateConfig.storeRateBase"
              max="10"
              name="storeRateBase"
              v-validate="'required|decimal:1'"
              :error-message="errors.first('storeRateBase')"
              @blur="RateBase"
              v-if="shop.type=='2'"
            >
              <div slot="button" v-if="shop.rateConfig.storeRateBase">折</div>
            </van-field>-->
            <!-- <van-field
              type="text"
              label="店铺折扣"
              required
              placeholder="1.0-10.0  输入8即为8折"
              value="10"
              v-if="shop.type=='1'"
              disabled
            >
              <div slot="button">折</div>
            </van-field>-->

            <!-- <van-field
              type="tel"
              label="店铺电话"
              placeholder="座机区号后请加'-'"
              v-model="shop.phone"
              name="shopphone"
              v-validate="'required|telphone'"
              :error-message="errors.first('shopphone')"
              required
            ></van-field>-->
            <van-field
              type="tel"
              label="店铺电话"
              placeholder="请输入手机号"
              v-model="shop.phone"
              name="shopphone"
              v-validate="'required|txlphone'"
              :error-message="errors.first('shopphone')"
              required
            ></van-field>
            <van-cell title="店铺环境" class="tecell">
              <div slot="title" class="requireds">店铺环境</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(5)">查看示例</div>
              <some-cut
                @somecut="addalbums"
                :some-cut="shop.albums"
                ref="albums"
                filecode="FILE19011215580409"
              ></some-cut>
            </van-cell>
            <p class="typete redcolor">要求：图片清晰、完整、无遮挡、无水印、不倒置</p>
            <van-field type="textarea" label="店铺简介" placeholder="请填写店铺简介" v-model="shop.info"></van-field>
            <p class="newfont">{{shop.newfont}}/200</p>
          </van-collapse-item>
        </van-collapse>
      </div>
      <div v-show="steps==2" class="steps2">
        <!-- <van-cell-group class="rate">
          <van-cell title="合同类型">
            <div slot="icon" class="vant-collapse-icon"></div>
            <van-radio-group v-model="shop.hetongType" style="display: flex;">
              <van-radio name="1" style="margin-right: 20px;">电子合同</van-radio>
              <van-radio name="2">纸质合同</van-radio>
            </van-radio-group>
          </van-cell>
        </van-cell-group>-->
        <!-- <div v-show="shop.hetongType=='1'"> -->
        <!-- <div v-show="shop.type === '2'"> -->

        <div class="hetong-title">
          <div
            style="display:flex;align-items:center; justify-content: flex-start;"
            v-for="(item,index) in stepinfor.stepimg"
            :key="index"
          >
            <div class="httitle-content" v-if="index!==1&&shop.type === '2'||shop.type === '1'">
              <img
                class="httitle-contentimg"
                :src="stepinfor.steps<index?item.falseimg:stepinfor.steps===index?item.nowimg:item.trueimg"
              />
              <p
                :class="stepinfor.steps>index-1?'httitle-contentp bluecolor':'httitle-contentp'"
              >{{item.name}}</p>
            </div>
            <div
              :class="stepinfor.steps<index+1?'httitle-div blacktop':'httitle-div bluetop'"
              v-if="index+1!==stepinfor.stepimg.length&&(index!==1&&shop.type === '2'||shop.type === '1')"
            ></div>
          </div>
        </div>
        <div v-show="stepinfor.steps===0">
          <div v-show="shop.type === '2'">
            <likevant titles="结算给店铺">
              <div slot="content">
                <!-- <p class="content2-p">结算给店铺</p> -->
                <div class="content1" @click.stop="zhekoushow=true">
                  收款金额的
                  <input
                    class="content1-input"
                    style="width:50%;"
                    type="text"
                    disabled
                    :value="contractApproval.storeSettlement"
                    placeholder="范围：1.00 ~ 95.00"
                  />
                  %
                </div>
              </div>
            </likevant>
          </div>
          <div v-show="shop.type === '1'">
            <likevant titles="省钱熊用户专享折扣">
              <div slot="content">
                <p class="content2-p">种子店无折扣</p>
                <div class="content1">
                  <input
                    class="content1-input"
                    type="text"
                    readonly
                    value="10"
                    placeholder="请输入0.1-9.5折，如8.8即为8.8折"
                  />
                  折
                </div>
                <p class="content2-te">签纸质合同(本期适用于种子店)无折扣</p>
              </div>
            </likevant>
          </div>
          <div class="content-bottom">
            <van-button type="default" @click="goback">上一页</van-button>
            <van-button type="primary" @click="inputstepsinfo(true)">下一页</van-button>
          </div>
          <!-- <div class="content-bottom">
              <van-button type="primary" size="large" @click="inputstepsinfo(0)" class="submitbtn" >下一页</van-button>
          </div>-->
        </div>
        <div v-show="stepinfor.steps===1">
          <div v-show="shop.type === '2'">
            <likevant titles="营销费用">
              <div slot="content" class="content2">
                <p class="content2-title">平台收取收款金额的</p>
                <p class="content2-p">折扣价格包含营销费用,不重复收取</p>
                <van-radio-group class="content2-choose" value="4">
                  <van-radio name="4">
                    <div
                      slot="icon"
                      slot-scope="props"
                      :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                    >4%</div>
                  </van-radio>
                  <van-radio name="5">
                    <div
                      slot="icon"
                      slot-scope="props"
                      :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                    >5%</div>
                  </van-radio>
                  <van-radio name="6">
                    <div
                      slot="icon"
                      slot-scope="props"
                      :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                    >6%</div>
                  </van-radio>
                </van-radio-group>
              </div>
            </likevant>
          </div>
          <div v-show="shop.type === '1'">
            <likevant titles="营销费用">
              <div slot="content" class="content2">
                <p class="content2-title">收款金额</p>
                <p class="content2-p">种子店固定抽取4%</p>
                <van-radio-group class="content2-choose" value="4">
                  <van-radio name="4">
                    <div
                      slot="icon"
                      slot-scope="props"
                      :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                    >4%</div>
                  </van-radio>
                </van-radio-group>
                <p class="content2-title">返还店铺收款金额的</p>
                <van-radio-group class="content2-choose" value="4">
                  <van-radio name="4">
                    <div
                      slot="icon"
                      slot-scope="props"
                      :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                    >0.15%</div>
                  </van-radio>
                </van-radio-group>
              </div>
            </likevant>
          </div>
          <div class="content-bottom">
            <van-button type="default" @click="inputstepsinfo(false)">上一页</van-button>
            <van-button type="primary" @click="inputstepsinfo(true)">下一页</van-button>
          </div>
        </div>
        <div v-show="stepinfor.steps===2">
          <div v-show="shop.type === '2'">
            <likevant titles="其他相关">
              <div slot="content" class="content2">
                <div class="content3-title">
                  <p class="content3-titlep">经营者是否法人</p>
                  <van-radio-group class="content2-choose" v-model="contractApproval.operatorType">
                    <van-radio name="1">
                      <div
                        slot="icon"
                        slot-scope="props"
                        :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                      >是</div>
                    </van-radio>
                    <van-radio name="2">
                      <div
                        slot="icon"
                        slot-scope="props"
                        :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                      >否</div>
                    </van-radio>
                  </van-radio-group>
                </div>
                <p class="content3-p">合同时间</p>

                <div class="content3-time">店铺签合同之日起1年整</div>
                <p class="content3-p">其他约定</p>
                <div class="content3-div">
                  <!-- <input type="textarea" style="overflow: hidden" placeholder='选填，您最多可以填写200字' max=200> -->
                  <textarea
                    maxlength="200"
                    v-model="contractApproval.otherAppointment"
                    class="content3-input"
                  ></textarea>
                </div>
              </div>
            </likevant>
          </div>
          <div v-show="shop.type === '1'">
            <likevant titles="其他相关">
              <div slot="content">
                <p class="content2-title">合同时间</p>
                <div class="content1" @click="startendtime2.onoff=!startendtime2.onoff">
                  <input
                    class="content1-input"
                    readonly
                    type="text"
                    :value="startendtime2.starttime+'至'+startendtime2.endtime"
                    placeholder="请选择合同时间"
                  />
                  <div class="content1-right">></div>
                </div>

                <p class="content2-title">合同照片</p>
                <van-cell title class="hetong">
                  <contract
                    @somemultiple="addcontractPicUrls"
                    number="8"
                    ref="contractPicUrls"
                    :some-multiple="shop.contractPicUrls"
                    filecode="FILE19011225489456"
                  ></contract>
                </van-cell>
              </div>
            </likevant>
          </div>
          <div class="content-bottom">
            <van-button type="default" @click="inputstepsinfo(false)">上一页</van-button>
            <van-button type="primary" @click="inputblur">下一步</van-button>
          </div>
        </div>
        <!-- </div> -->
        <!-- <div v-show="shop.hetongType=='2'"> -->
        <!--  <div v-show="shop.type === '1'">
           
          <van-cell-group class="rate">
            <van-cell title="费率">
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <div v-if="shop.type=='1'">
              <van-cell
                title="平台收取服务费,收取该种子商户平台销售额的"
                value="4%"
                title-class="leftcolor"
                value-class="rightcolor"
              ></van-cell>
              <van-cell
                title="平台补贴种子商户,补贴该种子商户平台销售额的"
                value="0.15%"
                title-class="leftcolor"
                value-class="rightcolor"
              ></van-cell>
              <van-cell
                title="配送平台商品，获得该商品订单价格的"
                label="注：配送费由商品所属企业承担"
                value="10%"
                title-class="leftcolor"
                value-class="rightcolor"
              ></van-cell>
            </div>
            <div v-else>
              <p class="rate-content">平台收取服务费,收取该特色商户平台销售额的</p>
              <van-radio-group v-model="shop.rateConfig.storeRatePlatform" class="rate-bottom">
                <van-radio name="6">6%</van-radio>
                <van-radio name="5" style="margin-right: 20px;">5%</van-radio>
                <van-radio name="4" style="margin-right: 20px;">4%</van-radio>
              </van-radio-group>
            </div>
          </van-cell-group>
          <van-cell-group>
            <van-cell
              title="合同起止时间"
              placeholder="请选择合同起止时间"
              :value="startendtime2.starttime+'至'+startendtime2.endtime"
              is-link
              v-if="shop.contractStartTime"
              @click="startendtime2.onoff=!startendtime2.onoff"
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
              @click="startendtime2.onoff=!startendtime2.onoff"
            >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <van-cell title="合同照片">
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <div class="hetongnote redcolor">要求：图片清晰、完整、无遮挡、无水印、不倒置</div>
            <van-cell title class="hetong">
              <contract
                @somemultiple="addcontractPicUrls"
                number="8"
                ref="contractPicUrls"
                :some-multiple="shop.contractPicUrls"
                filecode="FILE19011225489456"
              ></contract>
            </van-cell>
          </van-cell-group>
        </div>-->
      </div>
      <div v-show="steps==3">
        <van-collapse v-model="activeNames2">
          <van-collapse-item title="状态信息" name="0" value-class="collapsewarn" v-show="false">
            <div slot="icon" class="vant-collapse-icon"></div>
            <div slot="value">
              <van-icon name="info-o" v-show="activewarn.onoff0"></van-icon>
            </div>
            <van-cell title="账号启用" required>
              <template slot="title">
                <span class="custom-text">账号启用</span>
                <van-icon name="question-o" class="righticon" @click="question(1)"></van-icon>
              </template>
              <van-radio-group value="1" style="display: flex;">
                <van-radio name="1" style="margin-right: 20px;">启用</van-radio>
                <van-radio name="2">停用</van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell title="账号状态" required disabled>
              <template slot="title">
                <span class="custom-text">账号状态</span>
                <van-icon name="question-o" class="righticon" @click="question(2)"></van-icon>
              </template>
              <van-radio-group value="1" style="display: flex;">
                <van-radio name="1" style="margin-right: 20px;">正常</van-radio>
                <van-radio name="2" style="margin-right: 20px;">关闭</van-radio>
                <van-radio name="3">冻结</van-radio>
              </van-radio-group>
            </van-cell>
            <van-cell title="可推广区域" placeholder="请选择可推广区域" value="店铺所在地级市内均可推广" required></van-cell>
          </van-collapse-item>
          <van-collapse-item title="证照信息" name="1" value=" " value-class="collapsewarn">
            <div slot="icon" class="vant-collapse-icon"></div>
            <div slot="value">
              <van-icon name="info-o" v-show="activewarn.onoff1"></van-icon>
            </div>
            <p
              class="redcolor tetixian"
              style="margin: 5px;text-align: left"
            >以下信息自动抓取法人信息，若商户老板与法人不是同一人，请将以下信息更改为商户老板信息。</p>
            <van-field
              type="text"
              label="老板姓名"
              placeholder="请输入姓名"
              v-model="storeAccount.name"
              required
              @blur="shop.storeAccountName=storeAccount.name"
            ></van-field>
            <van-field
              type="text"
              label="老板身份证号"
              maxlength="18"
              v-model="storeAccount.idCard"
              placeholder="请输入身份证号"
              required
              name="idCard2"
              v-validate="'required|idcard'"
              :error-message="errors.first('idCard2')"
            ></van-field>
            <van-cell title="老板身份证照" class="tecell">
              <div slot="title" class="requireds">老板身份证照</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(3)">查看示例</div>
              <one-not-cut
                @onenotcut="addidCardJustUrlStore"
                class="idjust"
                :one-not-cut="storeAccount.idCardJustUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
              <one-not-cut
                @onenotcut="addidCardBackUrlStore"
                class="idback"
                :one-not-cut="storeAccount.idCardBackUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
            </van-cell>

            <!--<p v-if="storeAccount.idCard!=shop.bcUserIdCard&&shop.bcRegisterType=='1'" class="typete">检测到店主不是法人，请上传证明资料：盖公章的转让协议或者授权书至少有一个</p>-->
            <!--<van-cell title="店主资料证明" required v-if="storeAccount.idCard!=shop.bcUserIdCard&&shop.bcRegisterType=='1'">-->

            <!--<one-not-cut @onenotcut="addrunProvePic"  :one-not-cut="shop.runProvePic"  filecode="FILE19011225489456"></one-not-cut>-->
            <!--</van-cell>-->
          </van-collapse-item>
          <!--<p class="redcolor tetixian" style="margin: 5px;">老板身份证用于提现，审核通过后不能修改，请准确填写！</p>-->
        </van-collapse>
      </div>
      <div v-show="steps==4&&!stepste">
        <create-first :create-first="storeAccount" ref="createf"></create-first>
      </div>
      <div v-show="steps==4&&stepste">
        <van-field type="tel" label="手机号" :value="knowphone" placeholder="请输入手机号" required readonly></van-field>
        <van-field
          center
          clearable
          label="验证码"
          v-if="storeAccount.phone==storeAccount.oldphone"
          value="该手机号已验证"
          required
          readonly
        ></van-field>
        <van-field
          center
          clearable
          label="验证码"
          v-else
          v-model="storeAccount.verifyCode"
          placeholder="请输入短信验证码"
          required
        >
          <van-button
            slot="button"
            v-show="sendAuthCode"
            size="small"
            type="primary"
            @click="getnote"
          >发送验证码</van-button>
          <van-button
            slot="button"
            v-show="!sendAuthCode"
            size="small"
            type="primary"
            class="noteclick"
          >{{auth_time}}s</van-button>
        </van-field>
      </div>
    </div>
    <van-popup v-model="jingying.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>

        <div>
          <choose-category
            ref="categoryEle"
            :getDataList="getStoreInsidesList"
            @initialize="initialize"
            :listConfig="insideCategory"
            :selected="selectedInsideCate"
          ></choose-category>
        </div>
        <footer class="bott"></footer>
      </div>
    </van-popup>
    <van-popup v-model="areaConfig.onoff" position="bottom">
      <one-area :one-area="shop" emptyText="您的可推广区域为空" @oneAreascallback="oneAreas"></one-area>
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
    <van-popup v-model="beendtime.onoff" position="bottom">
      <van-datetime-picker
        type="date"
        :min-date="beendtime.minDate"
        :max-date="beendtime.maxDate"
        @cancel="beendtime.onoff = false"
        @confirm="beendtimes"
      ></van-datetime-picker>
    </van-popup>
    <van-popup v-model="address.onoff" position="bottom">
      <van-area
        :area-list="address.areaList"
        @confirm="chooseaddress"
        @cancel="address.onoff=!address.onoff"
      ></van-area>
    </van-popup>
    <van-popup v-model="shoplist.onoff" position="right" :overlay="false">
      <div class="rightmap" style="margin-top: 44px;">
        <div class="list" v-for="(item,index) in storelist" :key="index" @click="todetailss(item)">
          <div class="listtitle">
            <p>{{item.nickName}}</p>
            <span v-if="item.platformStatus==1">正常</span>
            <span v-if="item.platformStatus==2">关闭</span>
            <span v-if="item.platformStatus==3">冻结</span>
          </div>
          <ul class="listcontent">
            <li style="color: #999;">
              <div>
                <img src="@assets/img/detail/position.png" />
              </div>
              <span
                style="overflow: hidden;text-overflow: ellipsis"
              >{{item.province}}{{item.city}}{{item.region}}</span>
            </li>
            <li style="color: #999;">
              <div>
                <img src="@assets/img/detail/people.png" />
              </div>
              <span>{{item.spreadUsername}}</span>
            </li>
            <li style="color: #999;">
              <div>
                <img src="@assets/img/detail/datachoose.png" />
              </div>
              <span>{{item.createTime|format }}</span>
            </li>
          </ul>
          <div class="listaside">
            <img src="@assets/img/rightlcon.png" />
          </div>
          <div class="listflag" v-if="item.delFlag===2">入驻审核中</div>
        </div>
      </div>
    </van-popup>
    <van-number-keyboard
      v-model="contractApproval.storeSettlement"
      :show="zhekoushow"
      theme="custom"
      extra-key="."
      :maxlength="5"
      close-button-text="下一页"
      @blur="zhekoushowblur"
      @close="inputstepsinfo(true)"
    />
    <goback-save ref="gobackSave"></goback-save>
    <example ref="example"></example>

    <start-end-time :start-end-time="startendtime2" @timecallback="times2"></start-end-time>
    <van-button
      type="primary"
      size="large"
      @click="inputblur"
      class="submitbtn"
      v-if="steps!=allsteps&&steps!==2"
    >下一步({{steps}}/{{allsteps}})</van-button>
    <van-button
      type="primary"
      size="large"
      @click="inputblur"
      class="submitbtn"
      v-else-if="steps===allsteps"
    >提交审核</van-button>
  </div>
</template>

<script>
import likevant from '@/components/likevant'
import createFirst from '@/components/createFirst/createFirst'
import startEndTime from '@/components/startEndTime/startEndTime'
import oneArea from '@/components/chooseArea/oneArea'
import chooseCategory from '@/components/chooseCategory'
import imageCropper from '@/components/imageCropper'
import oneCut from '@/components/addimg/oneCut'
import oneNotCut from '@/components/addimg/oneNotCut'
import someMultiple from '@/components/addimg/someMultiple'
import contract from '@/components/addimg/contract'
import someCut from '@/components/addimg/someCut'
import mapp from '@/components/mapp/mapp'
import example from '@/components/example/example'
import gobackSave from '@/components/gobackSave/gobackSave'
import { format, phonestar, usernamestar, inputup, inputup2, accMul, accDiv, num2chinese, emojiDelete, getAllAreas } from "@utils";


export default {
  data () {
    return {
      format,
      showMapComponent: '',
      center: { lng: 116.404, lat: 39.915 },
      list: [

      ],
      radio2: '是',
      remarks: '',
      zhekoushow: false,
      stepinfor: {
        steps: 0,
        stepimg: [
          {
            name: '结算',
            trueimg: require('@/assets/img/hetong/true1.png'),
            nowimg: require('@/assets/img/hetong/now1.png'),
            falseimg: require('@/assets/img/hetong/false1.png')
          },
          {
            name: '营销费用',
            trueimg: require('@/assets/img/hetong/true2.png'),
            nowimg: require('@/assets/img/hetong/now2.png'),
            falseimg: require('@/assets/img/hetong/false2.png')
          },
          {
            name: '其他',
            trueimg: require('@/assets/img/hetong/true3.png'),
            nowimg: require('@/assets/img/hetong/now3.png'),
            falseimg: require('@/assets/img/hetong/false3.png')
          }
        ],
      },

      topheader: {
        name: '填写资料',
        left: '3',
        heade: 'header1',
        right11: true,
      },
      draftid: '',
      starttime: {
        onoff: false,
        time1: '08:00'
      },
      endtime: {
        onoff: false,
        time1: '18:00'
      },
      kaiguan: true,//避免暴力点击
      startendtime2: {
        title: '编辑合同起止时间',
        type: 'date',
        onoff: false,
        starttime: '',
        endtime: ''
      },
      address: { // 选择地址
        onoff: false,
        list: {

        },
        areaList: {

        }
      },
      imgsrc: '',
      cropperConfig: {
        width: 1, // 裁剪宽度（比例）
        height: 1, // 裁剪高度（比例）
        quality: 0.7, // 图片质量（0~1之间）
        maxWidth: 750, // 导出的图片的最大宽度
        fileCategoryCode: 'FILE19011208395727'
      },
      activeNames: ['2', '1', '0', '3', '4'], // 开哪个折叠
      activeNames2: ['1', '0'],
      steps: 1, // 第几步
      stepste: false, //特殊步，如果第三部店主已存在
      longtime: false,
      allsteps: 4,
      sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /* 倒计时 计数器 */
      // actives:'mapcolor', //选择地区颜色
      i: 0,  //单选树形控件
      codeerror: '',
      activewarn: { // 哪个折叠的错误
        onoff0: false,
        onoff1: false,
        onoff2: false,
        onoff3: false,
        onoff4: false
      },
      jingying: { // 经营品牌
        onoff: false,
        list: []
      },
      storelist: [

      ],

      beendtime: {  // 结束时间
        onoff: false,
        minDate: new Date(),
        maxDate: new Date(2070, 1, 1),
      },
      areaConfig: {
        onoff: false
      },
      shoplist: { //店铺列表
        onoff: false
      },
      map: {
        onoff: false,
        onoff1: false,
        city: '请选择',
        province: '',
        keyword: '',
        region: '',
        keywords: []
      },
      disabled: true, // 后退能否
      storeaddress: '',
      idcards: '',
      shop: { // 先写的同城，数据格式不一样，直接拿来当store
        isEnable: '1', // 0,店铺启用不变
        platformStatus: '1', // 0,店铺状态不变
        spreadType: '', // 0,推广人类型
        spreadId: '', // 0,推广人id
        spreadName: '',
        type: '', // 1,种子特色
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
        bcRegisterType: '1', // 2,工商类型
        bcEndtime: '', // 2,有效截止日期
        bcPicUrl: '', // 2,证照

        bcUserName: '', // 2,法人姓名
        bcUserIdCard: '', // 2,法人身份证号
        idCardJustUrl: '', // 2,法人身份证正面
        idCardBackUrl: '', // 2,法人身份证反面
        idOthrCerUrl: '', // 2,其他证件
        businessRange: '', // 3,店铺分类
        businessRanges: '', //看的店铺分类
        storeCategoryInsideId: '',  //3,店铺分类id
        // stStoreCategoryIds:'333',  //瞎传
        rateConfig: {
          storeRatePlatform: '4', // 3,店铺平台服务费
          storeRateBase: '' // 3,店铺基准折扣
        },
        startTime: '8:00', // 3,营业开始时间
        endTime: '18:00', // 3,营业结束时间
        phone: '', // 3,店铺电话
        albums: '', // 3,店铺环境相册
        info: '', // 3,店铺简介
        newfont: '0', // 简介字数
        storeAccountName: '', // 店铺账号归属人姓名
        areaConfig: {
          id: ''
        },
        hetongType: '1',
        runProvePic: '', //店主资料证明
        contractPicUrls: '',  //合同照片
        contractStartTime: '', //合同开始时间
        contractEndTime: '', //合同结束时间

      },
      contractApproval: { //合同相关
        operatorType: '',//经营者类型1法人2非法人
        // ratePlatform:'4',//平台服务费
        storeSettlement: '',//平台折扣
        otherAppointment: '',//其他约定
      },
      storeBankCard: {
        idCard: '',
        accountName: '',
        bankType: '',
        stStoreAccountId: '',
        isUse: '',
        bankNo: ''
      },
      storeAccount: {
        charactar: 2,
        name: '',
        idCard: '',
        idCardJustUrl: '',
        idCardBackUrl: '',

        userName: '',
        phone: '',
        verifyCode: '',
        email: '',
        remarks: '',
        // role: {
        //   id: '1'
        // }

      },
      insideCategory: {
        level: 0
      },
      editCheckId: "",
      approvalContent: {},

    }
  },
  filters: {
    format
  },

  components: {
    imageCropper, createFirst, startEndTime, oneCut, oneNotCut, someMultiple, someCut, mapp, oneArea, chooseCategory, contract, example, gobackSave, likevant
  },
  computed: {
    knowphone () {
      return phonestar(this.storeAccount.phone)
    },
    keywords () {
      return this.map.region + this.map.keyword
    }
  },
  watch: {
    'shop.info' () {
      if (this.shop.info !== undefined && this.shop.info !== null && this.shop.info.length > 200) {
        this.shop.info = this.shop.info.substr(0, this.shop.info.length - 1)
      } else if (this.shop.info !== undefined && this.shop.info !== null && this.shop.info.length > 0) {
        this.shop.newfont = this.shop.info !== undefined && this.shop.info !== null && this.shop.info.length
      }
    },
    'map.keyword' (val) {
      if (val.length) {
        this.map.onoff1 = true
      } else {
        this.map.onoff1 = false
      }
    },
    'insideCategory.level' () {
      this.getCategoryHeader()
    }
  },
  methods: {
    searchCategory (keyword) {
      console.log(keyword)
      if (!keyword) {

        console.log(!keyword)
        this.getCategoryHeader()
        this.$refs.categoryEle.cancelFilter()
        if (!this.jingying.onoff) {
          this.topheader = {
            name: '填写资料',
            left: '3',
            heade: 'header1',
            right11: true
          }
        }
      } else {
        this.$refs.categoryEle.filterList(keyword);
      }

    },
    initialize () {  //初始化
      this.$refs.topdata.onCancel()

    },
    handleBusinessRange () {
      this.jingying.onoff = !this.jingying.onoff
      if (this.jingying.onoff) {
        // this.topheader.right2 = true;
        this.insideCategory.level = 0
        this.getCategoryHeader()
      }
    },
    getCategoryHeader () {
      this.topheader.right2 = true;
      this.topheader.right11 = false
      let level = this.insideCategory.level
      if (level * 1 === 0) {
        this.topheader.name = '选择店铺分类'
      } else {
        this.topheader.name = `选择${num2chinese(level + 1)}级分类`
      }
    },
    getnote () {
      if (this.storeAccount.phone.length == 11) {
        this.sendAuthCode = false
        this.auth_time = 60
        let auth_timetimer = setInterval(() => {
          this.auth_time--
          if (this.auth_time <= 0) {
            this.sendAuthCode = true
            clearInterval(auth_timetimer)
          }
        }, 1000)
        this.getmsg()
      }
    },
    getmsg () {
      let para = {
        phone: this.storeAccount.phone
      }
      this.Api.loginByStoreMsg(para).then(res => {
        console.log(this.storeAccount.phone, res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    handleClick (data, checked) {
      this.i++;
      if (this.i % 2 == 0) {
        if (checked) {
          this.$refs.tree.setCheckedNodes([]);
          this.$refs.tree.setCheckedNodes([data]);
          //交叉点击节点
        } else {
          this.$refs.tree.setCheckedNodes([]);
          //点击已经选中的节点，置空
        }
      }
    },
    oneAreas (msg) {
      if (msg != '') {
        this.shop.province = msg[0].name
        this.shop.city = msg[1].name
        this.shop.region = msg[2].name
        this.shop.sysAreaConfigId = msg[3].id
      }
      this.areaConfig.onoff = false
    },
    addmap (key) {

      this.center.lng = this.list[key].point.lng
      this.center.lat = this.list[key].point.lat;
      this.shop.longitude = this.center.lng
      this.shop.latitude = this.center.lat
      this.map.onoff = !this.map.onoff
      this.topheader.name = '填写资料'
      // this.map.onoff1 = false

    },
    markersset (msg) {
      if (msg) {
        this.list = msg.Ar
      }
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
    },
    times2 (msg) { // 时间插件的事件
      this.startendtime2.onoff = msg.onoff

      if (msg.oldtime) {
        this.startendtime2.starttime = msg.oldtime
        this.startendtime2.endtime = msg.newtime
        this.shop.contractStartTime = format(msg.olddate, 'yyyy-MM-dd hh:mm:ss')
        this.shop.contractEndTime = format(msg.newdate, 'yyyy-MM-dd hh:mm:ss')

      } else {
        console.log('取消')
      }
    },
    chooseaddress (msg) {

      this.map.city = msg[1].name
      this.map.region = msg[2].name
      this.address.onoff = false
    },
    addlogo (msg) {
      this.shop.logo = msg
    },
    addbcPicUrl (msg) {
      this.shop.bcPicUrl = msg
    },
    addalbums (msg) {
      this.shop.albums = msg
    },
    addidCardJustUrl (msg) {
      this.shop.idCardJustUrl = msg
      this.storeAccount.idCardJustUrl = msg
    },
    addidCardBackUrl (msg) {
      this.shop.idCardBackUrl = msg
      this.storeAccount.idCardBackUrl = msg
    },
    addidOthrCerUrl (msg) {
      this.shop.idOthrCerUrl = msg
    },
    addcontractPicUrls (msg) {
      this.shop.contractPicUrls = msg
    },
    addidCardJustUrlStore (msg) {
      this.storeAccount.idCardJustUrl = msg
    },
    addidCardBackUrlStore (msg) {
      this.storeAccount.idCardBackUrl = msg
    },

    tochooseCity () {
      this.$store.commit('SET_SHOP', this.shop)
      this.$store.commit('SET_STOREACCOUNT', this.storeAccount)
      this.$store.commit('SET_ERROR', { idcards: this.idcards, codeerror: this.codeerror })
      this.$store.commit('SET_STORELIST', this.storelist)
      this.$store.commit('SET_CONTRACTAPPROVAL', this.contractApproval)
      this.$router.push({ path: '/searchCity', query: { list: this.$route.query.list } })

    },
    RateBase () {
      if (this.shop.rateConfig.storeRateBase > 10 || this.shop.rateConfig.storeRateBase < 1) {
        this.shop.rateConfig.storeRateBase = ''
        this.$toast('折扣最大为10折,88折请输入8.8')
      }
    },
    starttimes () {
      this.shop.startTime = this.starttime.time1
      this.starttime.onoff = false
    },
    endtimes () {
      this.shop.endTime = this.endtime.time1
      this.endtime.onoff = false
    },
    bluridcard () {
      this.storeAccount.idCard = this.shop.bcUserIdCard
      if (this.shop.bcUserIdCard == '') {
        this.idcards = ''
      } else if (!/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)/.test(this.shop.bcUserIdCard)) {
        this.idcards = '身份证格式不正确(如果有X则必须为大写)'

      } else {
        this.idcards = ''
      }
    },
    longtimeclick () {  //长期
      if (this.longtime) {
        let d = new Date();
        d.setFullYear(d.getFullYear() + 99);
        this.shop.bcEndtime = format(d, 'yyyy.MM.dd')
      } else {
        this.shop.bcEndtime = ''
      }
    },
    storecode () {
      if (this.shop.bcCode.length == 15 || this.shop.bcCode.length == 18) {
        this.codeerror = ''
        let para = {
          bcCode: this.shop.bcCode,
          // nickName:'种子商户店铺名称001发士大夫撒发射点范德萨发'
        }
        this.Api.storeBcCode(para).then(res => {
          if (res.data && res.data.data && res.data.data.length) {
            this.codeerror = '该营业执照与已有店铺重复。请评估是否可入驻。'
            this.storelist = res.data.data
          }
        }).catch(() => {
          this.codeerror = '未知的错误，可能无网络连接'
        })
      } else {
        this.codeerror = '营业执照号格式不正确，请输入15或18位数字或字母'
      }
    },

    selectedInsideCate (item, item2) {
      console.log(item, item2)
      this.shop.storeCategoryInsideId = item.id;
      let businessRange = ''
      for (let i = 0; i < item2.length; i++) {
        businessRange = businessRange + '-' + item2[i]
      }
      businessRange = businessRange.substr(1)
      this.shop.businessRanges = businessRange
      this.shop.businessRange = item.name
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
      // if(document.querySelector('.van-image-preview')){
      //   alert('1111')
      // }else
      if (this.jingying.onoff) {
        if (this.insideCategory.level > 0) {
          this.insideCategory.level--
          this.$refs.topdata.onCancel()
          return false
        }
        this.jingying.onoff = !this.jingying.onoff
        this.topheader.name = '填写资料'
        this.topheader.right2 = false;
        this.topheader.right11 = true
        this.$refs.topdata.onCancel()
      } else if (this.shoplist.onoff) {
        this.shoplist.onoff = !this.shoplist.onoff
        this.topheader.name = '填写资料'
        this.topheader.right11 = true
      } else if (this.map.onoff) {
        this.map.onoff = !this.map.onoff
        this.topheader.name = '填写资料'
      } else if (this.steps == 2) {
        this.stepinfor.steps = 0
        this.zhekoushow = false
        this.steps = 1
        this.topheader.name = '填写资料'
      } else if (this.steps == 3) {
        this.steps = 2
        this.topheader.name = '填写合同信息'
      } else if (this.steps == 4) {
        this.steps = 3
        this.topheader.name = '填写商户老板资料'
      } else if (this.disabled) {
        this.$refs.gobackSave.onoff = true
        // this.gobackSave=true
        /* this.$dialog.confirm({
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
        if (this.$route.query.address) {
          this.$router.go(-1)
        } else {
          this.$router.go(-1)
        }
      }
      // if(this.map.onoff1) {
      //   this.map.onoff1 = false
      // }
    },

    zhekoushowblur () {
      console.log('111')
      this.zhekoushow = false
    },
    getimg (value) {
      if (value == 2) {
        this.$refs.imageCropper2.checkPhoto()
      } else {
        this.$refs.imageCropper.checkPhoto()
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
    question (msg) {
      if (msg === 1) {
        this.$dialog.alert({
          message: `启用：账号能登录系统<br>停用：账号不能登录系统。名下店铺不能营业`
        })
      } else {
        this.$dialog.alert({
          message: `正常：能提现收益，能推广<br>冻结：不能提现收益，能推广<br>关闭：能提现收益，不能推广`
        })
      }

    },
    question2 (msg) {
      if (msg === 1) {
        this.$dialog.alert({
          message: `启用：店铺正常营业<br>停用：店铺不能营业`
        })
      } else {
        this.$dialog.alert({
          message: `正常：订单收入能提现，店铺正常营业<br>冻结：订单收入不能提现，店铺正常营业<br>关闭：订单收入能提现，店铺不能营业`
        })
      }

    },
    todetailss (item) {  //审核营业执照的点击
      this.$store.commit('SET_SHOP', this.shop)
      this.$store.commit('SET_STOREACCOUNT', this.storeAccount)
      this.$store.commit('SET_ERROR', { idcards: this.idcards, codeerror: this.codeerror })
      this.$store.commit('SET_STORELIST', this.storelist)
      this.$store.commit('SET_CONTRACTAPPROVAL', this.contractApproval)
      if (item.delFlag === 0) {
        this.$router.push({
          path: '/StoreDetail',
          query: { id: sessionStorage.getItem('storeId'), type: sessionStorage.getItem('accountType'), list: item.type == '1' ? '4' : '5', fromrouter: '1' }
        })
      } else if (item.delFlag === 2) {
        this.$router.push({
          path: "/AuditDetail",
          query: { storeid: item.id, type: sessionStorage.getItem("accountType") }
        });
      }
    },
    zhekouInput (value) {
      console.log(value)
    },
    savedraft () {  //保存草稿，修改草稿
      let para
      if (this.draftid) {
        para = {
          id: this.draftid,
          approvalContent: emojiDelete({ shop: this.shop, storeAccount: this.storeAccount, contractApproval: this.contractApproval, idcards: this.idcards, codeerror: this.codeerror }),
          title: emojiDelete(this.shop.nickName) ? emojiDelete(this.shop.nickName) : '暂无名称'
        }
        this.Api.changeDraft(para).then(res => {
          if (res.data.status == 1) {
            this.$toast('已存为草稿并删除非法字符')
          }
        })
      } else {
        para = {
          serviceType: 1,
          approvalContent: emojiDelete({ shop: this.shop, storeAccount: this.storeAccount, contractApproval: this.contractApproval, idcards: this.idcards, codeerror: this.codeerror }),
          title: emojiDelete(this.shop.nickName) ? emojiDelete(this.shop.nickName) : '暂无名称'
        }
        if (this.shop.type == '2') {
          para.serviceType = 2
        }
        this.Api.addDraft(para).then(res => {

          if (res.data.status == 1) {
            this.$toast('已存为草稿并删除非法字符')
            this.draftid = res.data.data.id
          }
        })
      }
    },
    nickNameInfo () {
      this.$dialog.alert({
        confirmButtonText: '知道了',
        messageAlign: 'left',
        message: '店招名称即展示在“省钱熊”APP端的店铺名称，是为了方便顾客识别和快速找到店铺所设，并非营业执照名称。建议店招命名：店招名+主营类目，例：老张餐饮店、小美咖啡馆、大李健身房'
      }).then(() => {
        // on close
      });
    },
    inputstepsinfo (types) {
      // 1-9  十位1-8个位数字  十位9个位0-5  二位小数  特殊
      console.log(/^((([1-9]|[1-8]\d|9[0-5])(\.\d{1,2})?)|95.0|95.00)$/.test(Number(this.contractApproval.storeSettlement)),this.contractApproval.storeSettlement)
      if (this.shop.type === '2') {
        if (this.stepinfor.steps === 0) {
          if (!/^((([1-9]|[1-8]\d|9[0-5])(\.\d{1,2})?)|95.0|95.00)$/.test(this.contractApproval.storeSettlement)) {
            this.$toast('范围：1.00 ~ 95.00')
            return
          }
          // if (Number(this.contractApproval.storeSettlement) < 1) {
          //   this.$toast('范围：1.00 ~ 95:00')
          //   return
          // }
          // if(Number(this.contractApproval.storeSettlement)<0.1||Number(this.contractApproval.storeSettlement)>9.5){
          //   this.$toast('请输入0.1-9.5折')
          //   console.log(Number(this.contractApproval.storeSettlement))
          //   return
          // }
          types ? this.stepinfor.steps += 2 : ''
          return
        } else if (this.stepinfor.steps === 2) {
          types ? '' : this.stepinfor.steps -= 2
          return
        }
      }

      types ? this.stepinfor.steps += 1 : this.stepinfor.steps -= 1
    },
    inputblur: function () { // 点击下一步错误显示折叠上的感叹号
      this.$validator.validateAll().then(ress => {
        let items = this.$validator.errors.items;
        console.log(items);
        this.activeNames = [];
        const activeTwo = [this.shop.nickName, this.shop.logo, this.shop.province, this.shop.address, this.shop.longitude];
        const activeThree2 = [this.shop.bcCode, this.shop.name, this.shop.bcRegisterType, this.shop.bcEndtime, this.shop.bcPicUrl];
        // const activeThree1 = [this.shop.bcCode, this.shop.name, this.shop.bcRegisterType, this.shop.bcEndtime, this.shop.bcPicUrl];
        const activeFour = [this.shop.businessRange, this.shop.phone, this.shop.albums, this.$refs.albums.urls.one0, this.$refs.albums.urls.one1, this.$refs.albums.urls.one2];

        if (items.some(value => value.field === 'nickName' || value.field === 'address')) {   //第二个折叠
          this.activewarn.onoff1 = true
        } else this.activewarn.onoff1 = activeTwo.indexOf('') !== -1;


        if (items.some(value => value.field === 'name')) {// 第三个折叠有2种状态
          this.activewarn.onoff2 = true
        }
        else if (activeThree2.indexOf('') === -1) {

          this.codeerror === '该营业执照与已有店铺重复。请评估是否可入驻。' ? '' : this.activewarn.onoff2 = this.codeerror;
        }
        else {
          this.activewarn.onoff2 = true
        }

        if (items.some(value => value.field === 'shopphone')) {
          this.activewarn.onoff3 = true
        } else this.activewarn.onoff3 = activeFour.indexOf('') !== -1;

        return ress
      }).then(() => {
        let items = this.$validator.errors.items


        switch (this.steps) {
          case 1:
            if (window._czc) {
              // eslint-disable-next-line no-sparse-arrays
              window._czc.push(['_trackEvent', '邀店', '填写店铺资料', '', '', '']);//其中灰色的为选填项

            }
            if (!(this.activewarn.onoff0 || this.activewarn.onoff1 || this.activewarn.onoff2 || this.activewarn.onoff3 || this.idcards)) {
              this.steps = 2
              this.topheader.name = '填写合同信息'
            }
            break
          case 2:
            if (window._czc) {
              // eslint-disable-next-line no-sparse-arrays
              window._czc.push(['_trackEvent', '邀店', '录入费率和合同', '', '', '']);//其中灰色的为选填项

            }
            // if (!this.shop.contractStartTime) {
            //   this.$toast('请选择合同时间')
            //   return
            // } else {
            if (this.shop.type === '2') {
              if (!this.contractApproval.operatorType || !this.contractApproval.storeSettlement) {
                this.$toast('请填写完整')
              } else {
                this.steps = 3
                this.topheader.name = '填写商户老板资料'
              }
            } else {
              if (!this.shop.contractStartTime) {
                this.$toast('请填写完整')
              } else {
                this.steps = 3
                this.topheader.name = '填写商户老板资料'
              }
            }


            // }

            break
          case 3:
            if (window._czc) {
              // eslint-disable-next-line no-sparse-arrays
              window._czc.push(['_trackEvent', '邀店', '填写店主资料', '', '', '']);//其中灰色的为选填项

            }
            if (items.length > 0) {
              return false
            }
            if (!this.storeAccount.name || !this.storeAccount.idCard || !this.storeAccount.idCardJustUrl || !this.storeAccount.idCardBackUrl) { //又一个没填就不能下一页

            } else {
              if (this.storeAccount.idCard != this.shop.bcUserIdCard && this.shop.bcRegisterType == '1') { //判断店主和法人是否相同
                this.storeIdcard(items)

              } else if (this.storeAccount.idCard != this.shop.bcUserIdCard && this.shop.bcRegisterType == '2') {
                this.storeIdcard(items)
              } else if (this.storeAccount.idCard == this.shop.bcUserIdCard) {

                this.storeIdcard(items)
              }

            }
            break
          // eslint-disable-next-line no-case-declarations
          case 4:
            if (window._czc) {
              // eslint-disable-next-line no-sparse-arrays
              window._czc.push(['_trackEvent', '邀店', '创建账号', '', '', '']);//其中灰色的为选填项

            }
            if (!this.storeAccount.userName || !this.storeAccount.phone || !this.storeAccount.verifyCode) {
              if (this.storeAccount.phone != this.storeAccount.oldphone) {
                console.log('retrun')
                return
              }
            }
            //这里
            let para = {
              bcCode: this.shop.bcCode,
              nickName: this.shop.nickName
            }
            this.Api.storeBcCode(para).then(res => {
              if (res.data && res.data.data && res.data.data.length) {
                if (res.data.data[0].delFlag === 0) {
                  this.$dialog.alert({
                    title: '店铺已入驻，勿重复提交',
                    message: '营业执照号和店铺名称都相同，不能重复提交'
                  })
                } else {
                  this.$dialog.alert({
                    title: '店铺审核中，勿重复提交',
                    message: '营业执照号和店铺名称都相同，不能重复提交'
                  })
                }

                return
              }
            }).then(() => {
              if (!this.$refs.createf.usererror && this.kaiguan) {

                this.shop.storeAccountName = this.storeAccount.name
                let para = {
                  store: JSON.parse(emojiDelete(this.shop)),
                  storeAccount: JSON.parse(emojiDelete(this.storeAccount)),
                  contractApproval: JSON.parse(emojiDelete(this.contractApproval))
                }
                para.store.rateConfig.storeRateBase = accDiv(para.store.rateConfig.storeRateBase, 10)
                para.store.rateConfig.storeRatePlatform = accDiv(para.store.rateConfig.storeRatePlatform, 100)
                if (para.contractApproval.storeSettlement) {
                  para.contractApproval.storeSettlement = accDiv(para.contractApproval.storeSettlement, 100)
                  // para.contractApproval.ratePlatform = accDiv(para.contractApproval.ratePlatform, 100)
                  para.contractApproval.operatorType = Number(para.contractApproval.operatorType)
                }

                para.phoneCode = para.storeAccount.verifyCode
                this.kaiguan = false
                console.log(para)
                this.Api.addStoreEnter(para).then(res => {
                  this.kaiguan = true
                  if (res.data.status == 1) {
                    this.deletedraft(this.draftid)
                    // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 0 } })
                    this.$router.push({ path: '/ApplyResult', query: { result: '入驻申请提交成功', redresult: '预计3个工作日内完成审核，审核结果以短信通知为准！' } })

                  } else {
                    this.$toast(res.data.stateMessage)
                  }
                  /*else {
                    this.$router.push({path: '/ApplyResult', query: {win: false, type: 0, result: res.data.stateMessage}})
                  }*/
                }).catch(error => {
                  this.kaiguan = true
                  console.log(error)
                })
              }
            })

            break
          default:
            break
        }


      })


      // console.log(this.$validator.errors.items[0])
    },
    beendtimes (value) {
      this.shop.bcEndtime = format(value, 'yyyy.MM.dd')
      this.beendtime.onoff = false
    },
    formatter (type, value) {
      console.log(typeof value)
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
    deletedraft (para) {
      let par = {
        id: para
      }
      if (para) {
        this.Api.deleteDraft(par).then(() => {

        })
      }

    },
    storeIdcard () {
      let para = {
        idCard: this.storeAccount.idCard
      }
      this.Api.storeIdcard(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)

        if (res.data.data) {
          this.storeBankCard = res.data.data
          this.$dialog.confirm({
            title: '商户老板已存在账户',
            message: '检测到商户老板已有账号:' + usernamestar(res.data.data.userName) + ',本店铺将关联该账号'
          }).then(() => {
            this.storeAccount.userName = this.storeBankCard.userName
            this.storeAccount.phone = this.storeBankCard.phone
            this.storeAccount.email = this.storeBankCard.email
            this.storeAccount.remarks = this.storeBankCard.remarks
            this.storeAccount.verifyCode = ''
            this.stepste = true
            this.steps = 4
            this.topheader.name = '检测账号'
          }).catch(() => {

          })

        } else {
          if (!this.$route.query.id && !this.$route.query.draft) {
            //不是审核和草稿过来还填了第四步再退回来改数据的情况
            console.log(!this.$route.query.id, !this.$route.query.draft)
            if (this.stepste) {
              this.storeAccount.userName = ''
              this.storeAccount.phone = ''
              this.storeAccount.email = ''
              this.storeAccount.remarks = ''
              this.storeAccount.verifyCode = ''
            }

          } else if (this.storeAccount.userName == this.storeBankCard.userName && this.storeAccount.phone == this.storeBankCard.phone && this.storeAccount.email == this.storeBankCard.email) {
            //审核过来还填了第四步再退回来改数据的情况
            this.storeAccount.userName = ''
            this.storeAccount.phone = ''
            this.storeAccount.email = ''
            this.storeAccount.remarks = ''
            this.storeAccount.verifyCode = ''
          }
          this.stepste = false
          this.steps = 4
          this.topheader.name = '创建账号'
        }
      }).catch(error => {
        console.log(error)
      })
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

  mounted () {
    if (window._czc) {
      // eslint-disable-next-line no-sparse-arrays
      window._czc.push(['_trackEvent', '邀店', '添加种子特色页', '', '', '']);//其中灰色的为选填项

    }

    this.shop.spreadType = sessionStorage.getItem('accountType')
    this.shop.spreadId = sessionStorage.getItem('id')
    this.shop.spreadName = sessionStorage.getItem('accountName')

    this.Api.allArea({}).then(res => {
      if (res.data.data) {
        this.address.list = res.data.data.list

        this.address.areaList = getAllAreas(res.data.data)
      } else {
        return false
      }
    })




    if (this.$route.query.list == 4) {
      this.shop.type = '1'
      this.shop.rateConfig.storeRateBase = 10
      if (!this.shop.storeCategoryInsideId || !this.shop.businessRange) {
        this.Api.storeInside({}).then(res => {
          if (res.data.status === 1) {
            let data = res.data.data;
            for (let i = 0; i < data.length; i++) {
              if (data[i].name === '生活超市') {
                this.shop.storeCategoryInsideId = data[i].id
                this.shop.businessRange = data[i].name
                break;
              }
            }
          }
        })
      }
    } else if (this.$route.query.list == 5) {
      this.shop.type = '2'
    }

    // window.addEventListener('scroll', this.handleScroll)
    // let res = await this.Api.storeInside({

    // });
    // this.jingying.list =treeData2(res.data.data, 'parentId', [null,''], 'id', 'name');


    if (this.$route.query.id) {


      let para = {
        id: this.$route.query.id
      }
      this.Api.getApprovalDetail(para)
        .then(res => {
          // this.shop = res.data.data;
          this.approvalContent = JSON.parse(res.data.data.approvalContent);
          // storeAccount: {
          //   charactar:2,
          this.approvalContent.storeAccount.charactar = this.storeAccount.charactar
          this.shop = this.approvalContent.store
          this.storeAccount = this.approvalContent.storeAccount
          if (this.approvalContent.storeSettlement) {
            this.contractApproval = this.approvalContent.contractApproval
          }
          this.shop.spreadType = sessionStorage.getItem('accountType')
          this.shop.spreadId = sessionStorage.getItem('id')
          this.shop.spreadName = sessionStorage.getItem('accountName')
          this.shop.rateConfig.storeRateBase = accMul(this.shop.rateConfig.storeRateBase, 10)
          this.shop.rateConfig.storeRatePlatform = accMul(this.shop.rateConfig.storeRatePlatform, 100).toString()
          if (this.approvalContent.storeSettlement) {
            this.contractApproval.storeSettlement = accMul(this.contractApproval.storeSettlement, 100).toString()
            // this.contractApproval.ratePlatform = accMul(this.contractApproval.ratePlatform, 100).toString()
            this.contractApproval.operatorType = this.contractApproval.operatorType.toString()
          }

          this.startendtime2.starttime = format(this.shop.contractStartTime, 'yyyy.MM.dd')
          this.startendtime2.endtime = format(this.shop.contractEndTime, 'yyyy.MM.dd')
          this.storeAccount.oldphone = this.storeAccount.phone
          this.storeAccount.verifyCode = ''
          if (this.$store.state.record.shop) {
            this.shop = this.$store.state.record.shop
            this.storeAccount = this.$store.state.record.storeAccount
            this.idcards = this.$store.state.record.error.idcards
            this.codeerror = this.$store.state.record.error.codeerror
            this.storelist = this.$store.state.record.storelist
            this.contractApproval = this.$store.state.record.contractApproval
            this.startendtime2.starttime = format(this.shop.contractStartTime, 'yyyy.MM.dd')
            this.startendtime2.endtime = format(this.shop.contractEndTime, 'yyyy.MM.dd')
          }


          this.insideCategory.list = [];
          let categoryInside = this.approvalContent.storeCategoryInside;
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

          for (let i = 0; i < this.approvalContent.storeCategoryInside.parents.length; i++) {
            businessRange = businessRange + '-' + this.approvalContent.storeCategoryInside.parents[i].name
          }
          businessRange = businessRange + '-' + this.approvalContent.storeCategoryInside.name
          this.shop.businessRanges = businessRange.substr(1)
          if (sessionStorage.getItem('address') && sessionStorage.getItem('lng')) {
            this.shop.longitude = sessionStorage.getItem('lng')
            this.shop.latitude = sessionStorage.getItem('lat')
            this.storeaddress = sessionStorage.getItem('address')
          }
          // 纸质合同变电子合同
          this.shop.contractPicUrls = ''
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (this.$route.query.draft) {
      let para = {
        id: this.$route.query.draft
      }
      this.Api.detailDraft(para).then(res => {
        this.approvalContent = JSON.parse(res.data.data.approvalContent)
        console.log(res.data.data.approvalContent)
        this.shop = this.approvalContent.shop
        this.storeAccount = this.approvalContent.storeAccount

        if (this.approvalContent.contractApproval && this.approvalContent.contractApproval.storeSettlement) {
          this.contractApproval = this.approvalContent.contractApproval
        }
        this.idcards = this.approvalContent.idcards
        this.codeerror = this.approvalContent.codeerror
        this.draftid = this.$route.query.draft
        this.startendtime2.starttime = format(this.shop.contractStartTime, 'yyyy.MM.dd')
        this.startendtime2.endtime = format(this.shop.contractEndTime, 'yyyy.MM.dd')
        if (this.$store.state.record.shop) {
          this.shop = this.$store.state.record.shop
          this.storeAccount = this.$store.state.record.storeAccount
          this.idcards = this.$store.state.record.error.idcards
          this.codeerror = this.$store.state.record.error.codeerror
          this.storelist = this.$store.state.record.storelist
          this.contractApproval = this.$store.state.record.contractApproval
          this.startendtime2.starttime = format(this.shop.contractStartTime, 'yyyy.MM.dd')
          this.startendtime2.endtime = format(this.shop.contractEndTime, 'yyyy.MM.dd')
        }
        if (sessionStorage.getItem('address') && sessionStorage.getItem('lng')) {
          this.shop.longitude = sessionStorage.getItem('lng')
          this.shop.latitude = sessionStorage.getItem('lat')
          this.storeaddress = sessionStorage.getItem('address')
        }
        if (!this.storelist.length && this.codeerror) {
          this.storecode()
        }
        // 纸质合同变电子合同
        this.shop.contractPicUrls = ''
      })
    }

    if (this.$store.state.record.shop) {
      this.shop = this.$store.state.record.shop
      this.storeAccount = this.$store.state.record.storeAccount
      this.idcards = this.$store.state.record.error.idcards
      this.codeerror = this.$store.state.record.error.codeerror
      this.storelist = this.$store.state.record.storelist
      this.contractApproval = this.$store.state.record.contractApproval
      this.startendtime2.starttime = format(this.shop.contractStartTime, 'yyyy.MM.dd')
      this.startendtime2.endtime = format(this.shop.contractEndTime, 'yyyy.MM.dd')
    }
    if (sessionStorage.getItem('address') && sessionStorage.getItem('lng')) {
      this.shop.longitude = sessionStorage.getItem('lng')
      this.shop.latitude = sessionStorage.getItem('lat')
      this.storeaddress = sessionStorage.getItem('address')
    }

    inputup('.anzhuotop', '.app-init')

  },
  beforeDestroy () {
    inputup2('.anzhuotop', '.app-init')
  },

  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)
  },
  beforeRouteLeave (to, form, next) {
    if (to.path == '/PromotersList' || to.path == '/ApplyResult') {
      sessionStorage.removeItem('lng')
      sessionStorage.removeItem('lat')
      sessionStorage.removeItem('address')
      sessionStorage.removeItem('city')
      this.$store.commit('SET_SHOP', '')
      this.$store.commit('SET_STOREACCOUNT', '')
      this.$store.commit('SET_ERROR', '')
      this.$store.commit('SET_STORELIST', '')
      this.$store.commit('SET_CONTRACTAPPROVAL', '')
    }
    next()
  }


}
</script>

<style scoped lang="scss" type="text/scss">
.map {
  width: 100%;
  height: 85.2vh;
}
.heade {
  width: 375px;
  height: 44px;
  position: relative;
  background: #fff;
  color: #ffffff;
}
.van-field /deep/ .van-field__left-icon {
  margin-right: 0;
}
.backlcon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 18px;
  top: 12px;
}

.rightmap {
  width: 100vw;
  height: 100vh;
  background: #fff;
}

.map + div li {
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
.botto /deep/ .el-button {
  margin: auto !important;
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
  .leftcolor {
    max-width: 60% !important;
  }
}
.rightcolor {
  text-align: right;
  display: block;
  span {
    display: block;

    float: right;
  }
}
.typete {
  font-size: 12px;
  margin: 4px 18px 4px 18px;
  padding-bottom: 4px;
  position: relative;
}

.tetixian {
  font-size: 12px;
  text-align: center;
}
.noteclick {
  color: #999;
  background: none !important;
  border: none !important;
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
.address-list {
  padding: 0 21px;
  .mapbottom {
    width: 90%;
    display: flex;
    flex-direction: row;
    color: #999;
    border-bottom: 1px solid #ededed;
    .mapbottom-left {
      width: 15%;
      font-size: 16px;
      padding-top: 15px;
    }
    .mapbottom-right {
      width: 70%;
      font-size: 13px;
      padding: 16px 0;
    }
  }
}
.mapcolor {
  color: #2294f4;
}
.address-list {
  height: 236px;
  overflow: auto;
}
.seed-rate {
  input {
    width: 30px;
  }
}
.list {
  width: 100%;
  height: 102px;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #fff;
  position: relative;
  cursor: pointer;
}

.listtitle {
  width: 90%;
  color: #333;
  font-size: 18px;
  font-weight: 800;
  position: absolute;
  left: 16px;
  top: 16px;
  cursor: pointer;
}
.listtitle /deep/ p {
  max-width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
.listtitle /deep/ span {
  display: inline-block;

  height: 16px;
  padding: 0 3px;
  margin-left: 5px;
  font-weight: 300;
  border-radius: 2px;
  border: 0.5px solid #0095fd;
  color: #0095fd;
  opacity: 0.9;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
}
.listcenter {
  font-size: 12px;
  position: absolute;
  color: #0095fd;
  top: 50px;
  left: 6px;
  display: flex;
  line-height: 14px;
}
.listcenter /deep/ li {
  width: 100%;
}

.listcontent {
  font-size: 12px;
  color: #0095fd;
  position: absolute;
  left: 6px;
  top: 74px;
  display: flex;
  line-height: 14px;
}

.listaside {
  width: 12px;
  height: 12px;
  color: #cbcbcb;
  position: absolute;
  right: 19px;
  top: 22px;
  img {
    width: 100%;
  }
}
.listflag {
  position: absolute;
  right: 19px;
  top: 40px;
  font-size: 12px;
  color: #0095fd;
}
.hetong-title {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  background: #fff;
  text-align: center;
  .httitle-content {
    width: 66px;
    .httitle-contentimg {
      width: 66%;
    }
    .httitle-contentp {
      font-size: 12px;
      width: 100%;
      margin-top: 5px;
    }
  }
  .httitle-div {
    width: 100px;
    margin: 0 40px;
  }
  .blacktop {
    border-top: 2px solid #dee2ec;
  }
  .bluetop {
    border-top: 2px solid #0095fd;
  }
}
.content2-choose {
  width: 100%;
  display: flex;
  align-items: center;
  overflow: auto;
  // flex-direction: row-reverse;
  .content2-icon {
    width: 73px;
    height: 30px;
    margin-right: 10px;

    text-align: center;
    line-height: 32px;
    border-radius: 15px;
    font-size: 13px;
  }
  .content2-true {
    background: #0092fc;
    color: #fff;
  }
  .content2-false {
    background: #f5f5f5;
    color: #666;
  }
}
.content-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.content1 {
  width: 100%;
  height: 48px;
  display: flex;
  background: rgba(245, 245, 245, 1);
  border-radius: 5px;
  align-items: center;
  justify-content: space-around;
  margin: 12px 0;
  position: relative;
  border-radius: 5px;
  .content1-input {
    width: 80%;
    background: rgba(245, 245, 245, 1);
    border: none;
    font-size: 14px;
  }
  .content1-right {
    position: absolute;
    right: 10px;
    font-size: 14px;
    line-height: 48px;
    color: #999;
  }
}
</style>
