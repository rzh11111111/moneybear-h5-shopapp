<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="anzhuotop">
      <van-collapse v-model="activeNames" v-if="change">
        <van-collapse-item title="状态信息" name="0" value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff0" />
          </div>
          <van-cell title="账号启用" value-class="colorC0C0C0">
            <template slot="title">
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
            label="上级省区总"
            :value="'省区总  '+(shop.managerSpread.merManager.managerCooperation.merManager.name || '')"
            disabled
          ></van-field>
          <van-cell
            title="所属合作商"
            v-if="shop.managerSpread.type=='2'&&!list"
            :value="'合作商  '+shop.managerSpread.merManager.name"
            disabled
            value-class="colorC0C0C0"
          ></van-cell>
          <van-cell
            title="所属合作商"
            v-if="shop.managerSpread.type=='2'&&list"
            :value="'合作商  '+(shop.managerSpread.merManager.name || '')"
            is-link
            @click="area2.onoff=!area2.onoff;topheader.name='选择所属合作商'"
            disabled
            value-class="colorC0C0C0"
          ></van-cell>
          <van-cell
            title="可推广区域"
            value="查看可推广区域"
            is-link
            disabled
            v-if="!list"
            @click="area.onoff=!area.onoff;topheader.name='查看可推广区域';topheader.right9=false"
          ></van-cell>
          <!--:value="shop.managerDutyAreaConfigs[0].id"-->
          <van-cell
            title="可推广区域"
            placeholder="请选择管辖区域"
            :value="!!shop.managerDutyAreaConfigs.length ? ('已选择'+shop.managerDutyAreaConfigs.length + '个区域') : '空'"
            is-link
            required
            @click="area.onoff=!area.onoff;topheader.name='选择可推广区域';topheader.right9=false"
            v-else
          ></van-cell>
          <van-cell title="性质" value="专职" v-if="list" required>
            <van-radio-group v-model="shop.managerSpread.type" style="display: flex;">
              <van-radio name="2" style="margin-right: 20px;">专职</van-radio>
              <van-radio name="1">兼职</van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell title="性质" value="兼职" v-if="shop.managerSpread.type=='1'&&!list" disabled></van-cell>
          <van-cell title="性质" value="专职" v-if="shop.managerSpread.type=='2'&&!list" disabled></van-cell>
        </van-collapse-item>
        <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn" v-if="!list">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff1" />
          </div>
          <van-cell
            title="现居住地"
            placeholder="请选择现居住地"
            :value="shop.managerSpread.homeName?shop.managerSpread.homeName:' '"
            is-link
            required
            @click="address.onoff1=!address.onoff1"
          ></van-cell>
          <van-field
            label
            type="textarea"
            placeholder="请选择详细地址，门牌号。。。。。。。。。"
            v-model="shop.managerSpread.address"
            name="address"
            v-validate="'required|length:3,50'"
            :error-message="errors.first('address')"
          ></van-field>
        </van-collapse-item>
        <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn" v-else>
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff1" />
          </div>
          <van-cell
            title="现居住地"
            :value="shop.managerSpread.homeName?shop.managerSpread.homeName:' '"
            value-class="colorC0C0C0"
            is-link
            disabled
          ></van-cell>
          <van-field
            label
            type="textarea"
            class="tetitle"
            v-model="shop.managerSpread.address"
            name="address"
            disabled
            v-validate="'required|length:3,50'"
            :error-message="errors.first('address')"
          ></van-field>
        </van-collapse-item>
        <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn" v-if="!list">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff2" />
          </div>
          <van-field
            type="text"
            label="姓名"
            v-model="shop.name"
            placeholder="请输入姓名"
            required
            name="name"
            v-validate="'required|length:1,15'"
            :error-message="errors.first('name')"
          ></van-field>
          <van-field
            type="text"
            label="身份证号"
            v-model="shop.managerSpread.idCard"
            placeholder="请输入身份证号"
            maxlength="18"
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
              :one-not-cut="shop.managerSpread.idCardJustUrl"
              filecode="FILE19011298615014"
            ></one-not-cut>
            <one-not-cut
              @onenotcut="addidCardBackUrl"
              class="idback"
              :one-not-cut="shop.managerSpread.idCardBackUrl"
              filecode="FILE19011298615014"
            ></one-not-cut>
          </van-cell>
        </van-collapse-item>
        <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn" v-else>
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff2" />
          </div>

          <van-field
            type="text"
            label="姓名"
            v-model="shop.name"
            name="name"
            disabled
            v-validate="'required|length:1,15'"
            :error-message="errors.first('name')"
          ></van-field>

          <van-field type="tel" label="身份证号" v-model="shop.managerSpread.idCard" disabled></van-field>
          <van-cell title="身份证照" disabled value-class="teadd">
            <one-not-cut class="idjust notclickadd" :one-not-cut="shop.managerSpread.idCardJustUrl"></one-not-cut>
            <one-not-cut class="idback notclickadd" :one-not-cut="shop.managerSpread.idCardBackUrl"></one-not-cut>
          </van-cell>
        </van-collapse-item>
        <van-button type="primary" size="large" @click="inputblur" class="submitbtn">提交审核</van-button>
      </van-collapse>
      <van-collapse v-model="activeNames" v-else>
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
            label="上级省区总"
            :value="'省区总  '+shop.managerSpread.merManager.managerCooperation.merManager.name"
            disabled
          ></van-field>
          <van-field
            type="text"
            label="所属合作商"
            v-if="shop.managerSpread.type=='2'"
            :value="'合作商  '+shop.managerSpread.merManager.name"
            disabled
          ></van-field>
          <van-cell
            title="可推广区域"
            placeholder="请选择管辖区域"
            value="查看可推广区域"
            is-link
            disabled
            @click="area.onoff=!area.onoff;topheader.name='查看可推广区域';topheader.right9=false"
          ></van-cell>
          <van-cell
            title="性质"
            value="专职"
            v-if="shop.managerSpread.type=='2'"
            disabled
            value-class="colorC0C0C0"
          ></van-cell>
          <van-cell
            title="性质"
            value="兼职"
            v-if="shop.managerSpread.type=='1'"
            disabled
            value-class="colorC0C0C0"
          ></van-cell>
        </van-collapse-item>
        <van-collapse-item title="基本信息" name="1" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff1" />
          </div>
          <van-cell
            title="现居住地"
            :value="shop.managerSpread.homeName"
            value-class="colorC0C0C0"
            disabled
          ></van-cell>
          <van-field
            label
            type="textarea"
            class="tetitle"
            :value="shop.managerSpread.address"
            disabled
          ></van-field>
        </van-collapse-item>

        <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff2" />
          </div>

          <van-field
            type="text"
            label="姓名"
            value-class="colorC0C0C0"
            v-model="shop.name"
            name="name"
            disabled
            v-validate="'required|length:1,15'"
            :error-message="errors.first('name')"
          ></van-field>

          <van-field
            type="tel"
            label="身份证号"
            value-class="colorC0C0C0"
            v-model="shop.managerSpread.idCard"
            disabled
          ></van-field>
          <van-cell title="身份证照" disabled value-class="teadd">
            <!--<one-not-cut @onenotcut="addbcPicUrl" :one-not-cut="shop.managerSpread.bcPicUrl" ></one-not-cut>-->
            <one-not-cut class="idjust notclickadd" :one-not-cut="shop.managerSpread.idCardJustUrl"></one-not-cut>
            <one-not-cut class="idback notclickadd" :one-not-cut="shop.managerSpread.idCardBackUrl"></one-not-cut>
          </van-cell>
        </van-collapse-item>
        <div class="changebtn" @click="changebtn" v-if="type==3||type==1">
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
        <choose-area :area="area" @callback="areas" emptyText="您的可推广区域为空" ref="area"></choose-area>
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
    <van-popup v-model="area2.onoff" position="right" :overlay="false">
      <!--直接拿来当所属合作商列表-->
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <div class="list" v-for="item in together" :key="item.id" @click="choosetogether(item)">
            <header class="listtitle">
              <!--{{item.accountType}}-->
              {{item.name}}
              <span v-if="item.status=='1'">正常</span>
              <span v-if="item.status=='2'">关闭</span>
              <span v-if="item.status=='3'">冻结</span>
            </header>
            <ul class="listcontent">
              <li>
                <div>
                  <img src="@assets/img/detail/position2.png" />
                </div>
                <span
                  v-if="!!item.managerDutyAreaConfigs && !!item.managerDutyAreaConfigs[0]"
                >{{item.managerDutyAreaConfigs.province}}{{item.managerDutyAreaConfigs[0].city}}等</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/people.png" />
                </div>
                <span>{{item.managerCooperation.merManager.name}}</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/datachoose.png" />
                </div>
                <span>{{item.createTime}}</span>
              </li>
            </ul>

            <van-icon
              v-if="item.id==togetherchoose"
              name="passed"
              color="rgba(0,136,254,1)"
              size="40px"
              class="listaside"
            ></van-icon>

            <!--<div class="listaside">-->
            <!---->
            <!--</div>-->
          </div>
        </div>
      </div>
    </van-popup>
    <example ref="example"></example>
    <!--<start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>-->
    <footer class="botto" v-show="area.onoff&&area.chooseno&&area.list">
      <van-button size="large" type="primary" class="submitbtn" @click="getCheckedKeys">确认</van-button>
    </footer>
  </div>
</template>

<script>
import chooseArea from '@/components/chooseArea/chooseArea'
import startEndTime from '@/components/startEndTime/startEndTime'
import oneCut from '@/components/addimg/oneCut'
import oneNotCut from '@/components/addimg/oneNotCut'
import example from '@/components/example/example'
import { inputup, inputup2, getAllAreas } from '@/utils'
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
        title: '编辑营业时间',
        type: 'time',
        onoff: false,
        starttime: '',
        endtime: ''
      },
      type: '',
      list: '',
      kaiguan: true,
      change: false, // 能否编辑
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
        onoff: false,
        chooseno: false,
        arealist: [],
        userlist: []
      },
      area2: { //合作商选择
        onoff: false,
        arealist: []
      },
      togetherchoose: '',
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
      together: [
      ],
      olddata: '',
      shop: { // 先写的同城，数据格式不一样，直接拿来当store
        managerDutyAreaConfigs: [{ id: '840,860' }, { id: '830' }], // 0,辖区
        managerSpread: {
          merManager: {
            isEnable: '1', // 0,店铺启用不变
            status: '1', // 0,店铺状态不变
            managerCooperation: {
              nameCooperation: '',
              merManager: {
                name: '',
              },
            },
          },

          type1: '', // 0,上级类型
          id1: '', // 0,上级ID
          type: '', // 0,专职兼职
          sysAreaConfigHome: '840', // 1,现居住地
          homeName: '浙江省杭州市瓯海区',
          address: '', // 1,办公地址
          name: '', // 2,姓名
          idCard: '', // 2,身份证
          idCardJustUrl: '', // 2,身份证正面
          idCardBackUrl: '', // 2,身份证反面
          activeTime: '2016-12-21 09:09:10', // 合同时间
          invalidTime: '2016-12-21 09:09:10',
        },
        areaConfig: {
          id: '3787'
        },
        shopInfo: {

          invoiceEmail: ''// 创建账号的错
        },
      }
    }
  },
  components: {
     startEndTime, oneCut, oneNotCut, chooseArea, example
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
      this.topheader.name = '资料信息'
    },
    addbcPicUrl (msg) {
      this.shop.managerSpread.bcPicUrl = msg
    },
    addidCardJustUrl (msg) {
      this.shop.managerSpread.idCardJustUrl = msg
    },
    addidCardBackUrl (msg) {
      this.shop.managerSpread.idCardBackUrl = msg
    },
    addidOthrCerUrl (msg) {
      this.shop.managerSpread.idOthrCerUrl = msg
    },
    chooseaddress1 (msg) {
      const filtered = this.address.list.filter(element => element.code == msg[2].code)
      this.shop.managerSpread.sysAreaConfigHome = filtered[0].id
      this.shop.managerSpread.homeName = msg[0].name + msg[1].name + msg[2].name
      this.address.onoff1 = false
    },
    chooseaddress2 (msg) {
      const filtered = this.address.list.filter(element => element.code == msg[2].code)
      this.shop.managerSpread.areaWarehouseId = filtered[0].id
      this.shop.managerSpread.warehouseName = msg[0].name + msg[1].name + msg[2].name
      this.address.onoff2 = false
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
    goback () {
      if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '资料信息'
        if (!this.list) {
          this.topheader.right9 = true
        }

      } else if (this.area2.onoff) {
        this.area2.onoff = !this.area2.onoff
        this.topheader.name = '填写资料'
      } else if (this.change) {
        Dialog.confirm({
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
 
       },*/
    removeByValue (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (Number(arr[i]) === Number(val)) {
          arr.splice(i, 1)
          break
        }
      }
    },
    getCheckedKeys () {
      this.$refs.area.getCheckedKeys("嘿嘿嘿");
    },
    inputblur () { // 点击提交
      const activeTwo = [this.shop.managerSpread.sysAreaConfigHome, this.shop.managerSpread.address];
      const activeThree = [this.shop.name, this.shop.managerSpread.idCard, this.shop.managerSpread.idCardJustUrl, this.shop.managerSpread.idCardBackUrl];
      if (activeTwo.indexOf('') !== -1) {
        return false
      } else if (activeThree.indexOf('') !== -1) {
        return false
      } else if (this.$validator.errors.items.length > 0) {
        this.$toast('请填写正确')
        return false
      }
      let para = this.shop
      if (this.kaiguan) {
        this.kaiguan = false
        this.Api.changePopularize(para).then(res => {
          this.kaiguan = true
          if (res.data.status == 1) {
            // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 1 } })
 this.$router.push({ path: '/ApplyResult', query: { result: '提交申请成功，正在审核中',redresult:'审核结果，将消息通知申请者' } })
          } else {
            // this.$router.push({ path: '/ApplyResult', query: { win: false, type: 1, result: res.data.stateMessage } })
          }
        }).catch(() => {
          this.kaiguan = true
        })
      }

    },
    beendtimes (value) {
      this.shop.managerSpread.bcEndtime = this.$options['filters'].format(value, 'yyyy.MM.dd')
      this.beendtime.onoff = false
      // console.log(this.$options['filters'].format(value, 'yyyy.MM.dd'))
      // this.shop.managerSpread.activeTime = format(value, 'yyyy-MM-dd hh:mm:ss')
      // this.shop.managerSpread.invalidTime = format(value, 'yyyy-MM-dd hh:mm:ss')
    },
    times (msg) { // 时间插件的事件
      // if (msg.oldtime) {
      //   console.log('确定')
      // } else {
      //   console.log('取消')
      // }
      // this.newdata.store.startTime=msg.oldtime
      // this.newdata.store.endTime=msg.newtime
      this.startendtime1.onoff = msg.onoff
      this.shop.startTime = msg.oldtime
      this.shop.endTime = msg.newtime
    },
    choosetogether (msg) {
      this.togetherchoose = msg.id
      // managerSpread: {
      //   merManager: {
      //     id: '654ed6bdf62f436781b04945bb4058c6', // 0,挂靠合作商id
      //       name: '合作商333' // 合作商名字
      //   },
      this.shop.managerSpread.merManager.id = msg.id
      this.shop.managerSpread.merManager.name = msg.name
      this.area2.onoff = false
    }

  },
  // watch: {
  //   "shop.managerSpread.bcRegisterType" () {
  //      console.log(typeof parseInt(this.shop.managerSpread.bcRegisterType),parseInt(this.shop.managerSpread.bcRegisterType))
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
    this.Api.popularizeDetail(para).then(res => {

      let homeProvince = res.data.data.managerSpread.areaHomeProvince;
      let homeCity = res.data.data.managerSpread.areaHomeCity;
      let homeRegion = res.data.data.managerSpread.areaHomeRegion;

      res.data.data.managerSpread.homeName = (homeProvince ? homeProvince : '') + (homeCity ? homeCity : '') + (homeRegion ? homeRegion : '')
      // shop.managerSpread.areaHomeProvince+shop.managerSpread.areaHomeCity+shop.managerSpread.areaHomeRegion
      this.olddata = res.data.data
      this.shop = JSON.parse(JSON.stringify(res.data.data))
      this.shop.managerSpread.type = this.shop.managerSpread.type.toString()
      // for (let o = 0, len = this.shop.managerDutyAreaConfigs; o < len.length; o++) {
      //
      //   this.area.userlist.push(len[o].areaConfig.id)
      //
      //
      // }
      this.area.arealist = this.shop.managerDutyAreaConfigs.map(value => value.areaConfig.id)  //选择上辖区
      this.shop.managerSpread.officeName = '1'
    }).catch(() => {
      // console.log(error)
    })

    let datejson2 = {
      managerCooperation: {
        merManager: {
          id: sessionStorage.getItem('id')
        }
      },
      page: {
        pageNo: 1,
        pageSize: 1000
      },
    }
    this.Api.togetherList(datejson2).then(res => {
      // console.log(res.data.data)
      this.together = this.together.concat(res.data.data.list)
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

.list {
  width: 100%;
  height: 82px;
  background: #fff;
  margin-bottom: 10px;
  border: 1px solid #fff;
  position: relative;
}
.listtitle {
  color: #333;
  font-size: 16px;
  font-weight: 800;
  position: absolute;
  left: 18px;
  top: 16px;
  display: flex;
  align-items: center;
}
.listtitle /deep/ span {
  display: inline-block;

  height: 20px;
  font-weight: 200;
  border-radius: 2px;
  padding: 0 5px;
  border: 0.5px solid #0095fd;
  color: #0095fd;
  opacity: 0.9;
  font-size: 12px;
  line-height: 20px;
  /*字体最小12，用scale缩小*/
  transform: scale(0.8);
  text-align: center;
  margin-left: 5px;
}

.listcontent {
  font-size: 12px;
  color: #999;
  position: absolute;
  left: 18px;
  top: 52px;
  display: flex;
}
/*  .listcontent /deep/ li{
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right:15px
  }
  .listcontent /deep/ img{
    width: 14px;
    height: 14px;
    transform: translate(0,+10%);
    margin-right: 2px;
  }*/
.listaside {
  position: absolute;
  right: 19px;
  top: 22px;
}
</style>
