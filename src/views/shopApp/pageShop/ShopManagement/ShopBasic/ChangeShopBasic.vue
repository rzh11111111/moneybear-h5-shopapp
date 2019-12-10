<template>
  <div>
    <top-column :top-header="topheader"></top-column>
    <van-cell-group style="margin-top: 10px;">
      <van-field
        type="text"
        label="店铺编号"
        placeholder="请输入店铺编号"
        v-model="newdata.store.storeAccountId"
        disabled
      />
      <van-field
        type="text"
        label="店铺名称"
        placeholder="请输入店铺名称"
        v-model="newdata.store.storeAccountName"
      />
      <van-field type="text" label="商家电话" placeholder="请输入商家电话" v-model="newdata.store.phone" />
      <!-- <van-cell
        title="营业时间"
        placeholder="请输入营业时间"
        :value="timelimit"
        is-link
        @click="startendtime1.onoff=!startendtime1.onoff;startendtime1.starttime=newdata.store.startTime;startendtime1.endtime=newdata.store.endTime"
      /> -->
    </van-cell-group>
    <p class="alert">编辑以下信息需提交审批，审批通过后生效</p>
    <van-cell-group style="margin-top: 10px;">
      <van-cell title="店铺分类" placeholder="请输入店铺分类" v-model="newdata.storeAccount.code" is-link></van-cell>
      <!-- <van-cell title="店铺折扣">
        
        <input
          type="number"
          style="border:0;width: 80px;font: inherit;"
          maxlength="3"
          v-model="newdata.store.rateConfig"
          placeholder="1.0-10"
          @blur="test(newdata.store.rateConfig)?newdata.store.rateConfig :newdata.store.rateConfig=10;"
        />
        <span>折</span>
      </van-cell> -->
      <van-cell title="店铺头像">
        <van-uploader :after-read="addstorehead" v-show="!newdata.storeHeadPic">
          <div class="imginput">+</div>
        </van-uploader>
        <div class="imgcontent" v-show="newdata.storeHeadPic">
          <img class="head-img" :src="newdata.storeHeadPic" ref="goodsImg" />
          <div class="add" @click="deletestorehead">X</div>
        </div>
      </van-cell>
      <van-cell
        title="所在区域"
        placeholder="请选择所在区域"
        :value="areaConfig"
        is-link
        @click="area.onoff=!area.onoff"
      />
      <van-field
        type="textarea"
        label="详细地址"
        placeholder="请选择所在区域"
        v-model="newdata.store.address"
      />
      <van-cell title="店铺照片">
        <div
          class="imgcontent"
          :key="index"
          v-for="(value,index) in newdata.storeEnvironmentPicList"
        >
          <img class="head-img" :src="value" ref="goodsImg" />
          <div class="add" @click="deletestore(index)">X</div>
        </div>
        <van-uploader
          :after-read="addstore"
          v-show="newdata.storeEnvironmentPicList!== undefined &&newdata.storeEnvironmentPicList.length<8"
        >
          <div class="imginput">+</div>
        </van-uploader>
      </van-cell>
      <van-field type="textarea" label="店铺简介" placeholder="请填写店铺简介" v-model="newdata.store.info" />
      <p class="newfont">{{newfont}}/200</p>
    </van-cell-group>
    <van-cell-group style="margin-top: 10px;">
      <van-field type="text" label="营业执照号" placeholder="请输入营业执照号" v-model="newdata.store.bcCode" />
      <van-field type="text" label="名称" placeholder="请输入店铺名称" v-model="newdata.store.name" />
      <van-cell
        title="类型"
        value="个体商户"
        v-if="newdata.store.bcRegisterType==1"
        is-link
        @click="bcRegisterType.onoff=!bcRegisterType.onoff"
      />
      <van-cell
        title="类型"
        value="企业"
        v-if="newdata.store.bcRegisterType==2"
        is-link
        @click="bcRegisterType.onoff=!bcRegisterType.onoff"
      />

      <van-cell title="营业期限">
        <div @click="bcEndTime.onoff=!bcEndTime.onoff">{{newdata.store.bcEndtime}}</div>
        <van-checkbox v-model="longtime" checked-color="#0088FD">长期</van-checkbox>
      </van-cell>
      <van-cell title="营业执照">
        <van-uploader :after-read="addlicense" v-show="!newdata.businessLicensePic">
          <div class="imginput">+</div>
        </van-uploader>
        <div class="imgcontent" v-show="newdata.businessLicensePic">
          <img class="head-img" :src="newdata.businessLicensePic" ref="goodsImg" />
          <div class="add" @click="deletelicense">X</div>
        </div>
      </van-cell>
      <van-field
        type="text"
        label="法人姓名"
        placeholder="请输入法人姓名"
        v-model="newdata.storeAccount.name"
      />
      <van-field
        type="text"
        label="身份证号"
        placeholder="请输入身份证"
        v-model="newdata.storeAccount.idCard"
        maxlength="18"
      />
      <van-cell title="法人身份证" value="内容">
        <van-uploader :after-read="onRead1">
          <div class="fileinput" v-show="!newdata.idPicturePositive">
            <div class="add">+</div>头像面
          </div>
          <img
            class="head-file"
            :src="newdata.idPicturePositive"
            ref="goodsImg"
            v-show="newdata.idPicturePositive"
          />
        </van-uploader>
        <van-uploader :after-read="onRead2">
          <div class="fileinput" v-show="!newdata.idPictureOpposite">
            <div class="add">+</div>国徽面
          </div>
          <img
            class="head-file"
            :src="newdata.idPictureOpposite"
            ref="goodsImg"
            v-show="newdata.idPictureOpposite"
          />
        </van-uploader>
      </van-cell>
      <van-cell title="其他证件">
        <div class="imgcontent" :key="index" v-for="(value,index) in newdata.businessLimitPicList">
          <img class="head-img" :src="value" ref="goodsImg" />
          <div class="add" @click="deletebus(index)">X</div>
        </div>
        <van-uploader
          :after-read="addbus"
          v-show="newdata.businessLimitPicList!== undefined &&newdata.businessLimitPicList.length<8"
        >
          <div class="imginput">+</div>
        </van-uploader>
      </van-cell>
    </van-cell-group>
    <van-button type="primary" size="large" :disabled="!disabled" @click="submitBasic">提交审批</van-button>
    <div class="所有的弹出">
      <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>

      <van-popup v-model="bcRegisterType.onoff" position="bottom">
        <van-picker
          :columns="bcRegisterType.columns"
          @confirm="onbcRegisterType"
          @cancel="bcRegisterType.onoff=!bcRegisterType.onoff"
          show-toolbar
          title="标题"
        />
      </van-popup>
      <van-popup v-model="area.onoff" position="bottom">
        <van-area :area-list="area.areaList" @cancel="area.onoff=!area.onoff" @confirm="onarea" />
      </van-popup>
      <van-popup v-model="bcEndTime.onoff" position="bottom">
        <van-datetime-picker :value="newdata.store.bcEndtime" type="date" @confirm="onbcendtime" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import startEndTime from '@/components/startEndTime/startEndTime'
import { Dialog } from 'vant'
import areaList from '@/assets/area'
export default {
  data () {
    return {
      topheader: {
        name: '编辑基本信息',
        left: '3',
        // right1: '0',
        // right2: '0',
        right3: false,
        right3content: '',
        heade: 'header1'
      },
      startendtime1: {
        title: '编辑营业时间',
        onoff: false,
        starttime: '',
        endtime: '',
      },
      olddata: {
        areaConfig: {
          parents: [
            { name: '' },
            { name: '' }
          ]
        },
        StoreCategory: {},
        store: {
          managerSpread: {},
          storeAccountId: '',
          bcRegisterType: ''
        },
        storeAccount: {
          idCard: ''
        },
        storeEnvironmentPicList: {},
        businessLimitPicList: {}
      },
      newdata: {
        areaConfig: {
          parents: [
            { name: '' },
            { name: '' }
          ]
        },
        storeHeadPic: '',
        StoreCategory: {},
        store: {
          managerSpread: {},
          storeAccountId: '',
          bcRegisterType: '',
          startTime: '',
          endTime: '',
          bcEndtime: '',
          bcCode: '',
          rateConfig: '',
          storeAccountName: ''
        },
        storeAccount: {
          idCard: ''
        },
        storeEnvironmentPicList: {},
        businessLimitPicList: {}
      },
      bcRegisterType: {
        onoff: false,
        columns: ['个体商户', '企业']
      },
      bcEndTime: {
        onoff: false
      },
      area: {
        onoff: false,
        areaList: areaList
      },
      newfont: '0',
      disabled: false,
      longtime: false

    }
  },
  components: {
    startEndTime
  },
  methods: {
    addstorehead (file) { // 添加删除图片函数，后期简化
      this.$refs.goodsImg.src = file.content
      this.newdata.storeHeadPic = file.content
    },
    addlicense (file) {
      this.$refs.goodsImg.src = file.content
      this.newdata.businessLicensePic = file.content
    },
    deletestorehead () {
      this.newdata.storeHeadPic = null
    },
    deletelicense () {
      this.newdata.businessLicensePic = null
    },
    onRead1 (file) {
      this.$refs.goodsImg.src = file.content
      this.newdata.idPicturePositive = file.content
    },
    onRead2 (file) {
      this.$refs.goodsImg.src = file.content
      this.newdata.idPictureOpposite = file.content
    },
    addstore (file) {
      this.$refs.goodsImg.src = file.content
      this.$set(this.newdata.storeEnvironmentPicList, this.newdata.storeEnvironmentPicList.length, file.content)
    },
    addbus (file) {
      this.$refs.goodsImg.src = file.content
      this.$set(this.newdata.businessLimitPicList, this.newdata.businessLimitPicList.length, file.content)
    },
    deletestore (index) {
      this.$delete(this.newdata.storeEnvironmentPicList, index)
    },
    deletebus (index) {
      this.$delete(this.newdata.businessLimitPicList, index)
    },
    // 图片添加删除一直到这结束
    getstoredetails () { // 获取全局数据
      let para = {
        storeId: 'e2d7cae8a3c74ce68c015eedf489614c'
      }
      this.Api.storedetails(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        this.olddata = res.data.data
        this.newdata = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    test (str) { // 0-9正则
      return /^[0-9]{1}(\.[0-9])?$/.test(str)
    },
    onbcRegisterType (value, index) {
      this.newdata.store.bcRegisterType = (index + 1)
      this.bcRegisterType.onoff = !this.bcRegisterType.onoff
    },
    onarea () {
      this.area.onoff = !this.area.onoff
    },
    onbcendtime (value) {

      let value2 = JSON.stringify(value)
      this.newdata.store.bcEndtime = value2.substr(1, 10)
    },
    times (msg) {
      this.newdata.store.startTime = msg.oldtime
      this.newdata.store.endTime = msg.newtime
      this.startendtime1.onoff = msg.onoff
    },
    submitBasic () { // 提交审批
      let para = this.newdata
      Dialog.confirm({
        title: '',
        message: '确认提交？'
      }).then(() => {
        this.Api.storeupdate(para).then(res => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          // setToken(res.data.phone)
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        // on cancel
      });
    },
    goback () {
      if (this.disabled) {
        Dialog.confirm({
          title: '',
          message: '您有未提交审批的修改',
          confirmButtonText: '继续编辑',
          cancelButtonText: '放弃修改'
        }).then(() => {
          // on confirm
        }).catch(() => {
          this.$router.go(-1);
        });
      } else {
        this.$router.go(-1);
      }

    }
  },
  computed: {

    timelimit: function () {
      return (this.newdata.store.startTime + '到' + this.newdata.store.endTime)
    },
    timelimit2: function () {
      return (this.newdata.store.startTime + '到' + this.newdata.store.endTime)
    },
    areaConfig: function () {
      return (this.newdata.areaConfig.parents[1].name + this.newdata.areaConfig.parents[0].name + this.newdata.areaConfig.name)
    }

  },
  watch: {
    newdata: {
      handler (val, oldval) {
        if (val == oldval) {
          this.disabled = true
        } else {
          this.disabled = false
        }
      },
      deep: true
    },
    'newdata.store.info' () {
      if (this.newdata.store.info !== undefined && this.newdata.store.info !== null && this.newdata.store.info.length > 200) {
        this.newdata.store.info = this.newdata.store.info.substr(0, this.newdata.store.info.length - 1)
      } else if (this.newdata.store.info !== undefined && this.newdata.store.info !== null && this.newdata.store.info.length > 0) {
        this.newfont = this.newdata.store.info !== undefined && this.newdata.store.info !== null && this.newdata.store.info.length
      }
    }

  },

  mounted () {
    this.getstoredetails()
    console.log(this.newdata.store.startTime)
    this.startendtime1.starttime = this.newdata.store.startTime
    this.startendtime1.endtime = this.newdata.store.endTime
  }
}
</script>

<style scoped>
.van-button--large {
  width: 339px;
  height: 44px;
  font-size: 14px;
  line-height: 44px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  margin: 15px 0 15px 18px;
  background: #0088fd;
  background: -webkit-linear-gradient(to right, #00a7fc, #0088fd);
  background: -moz-linear-gradient(to right, #00a7fc, #0088fd);
  background: linear-gradient(to right, #00a7fc, #0088fd);
  border: none;
}
.alert {
  font-size: 12px;
  line-height: 40px;
  margin-left: 18px;
}
.fileinput {
  width: 100px;
  height: 63px;
  background: rgba(245, 245, 249, 1);
  border: 1px solid rgba(245, 245, 249, 1);
  border-radius: 3px;
  text-align: center;
}
.fileinput >>> .add {
  width: 16px;
  height: 16px;
  border: 1px solid rgba(151, 151, 151, 1);
  border-radius: 50%;
  text-align: center;
  font-size: 8px;
  line-height: 14px;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-bottom: 4px;
  margin-top: 14px;
}
.head-file {
  width: 100px;
  height: 63px;
}
.imginput {
  width: 48px;
  height: 48px;
  border: 1px dashed rgba(204, 204, 204, 1);
  text-align: center;
  font-size: 30px;
  line-height: 44px;
  color: #ccc;
}
.head-img {
  width: 46px;
  height: 46px;
}
.imgcontent >>> .add {
  width: 16px;
  height: 16px;
  background: rgba(255, 1, 79, 1);
  box-shadow: 0px 2px 6px 0px rgba(222, 222, 222, 0.5);
  color: #fff;
  border-radius: 50%;
  text-align: center;
  font-size: 10px;
  line-height: 16px;
  position: absolute;
  right: -8px;
  top: -4px;
}
.imgcontent {
  width: 48px;
  height: 48px;
  border: 1px solid #fff;
  position: relative;
  margin-right: 10px;
  margin-top: 10px;
}
.aside {
  width: 44px;
  height: 44px;
  background: #fff;
  background: linear-gradient(
    137deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(242, 242, 242, 0),
      rgba(224, 224, 224, 0.9)
    )
    1 1;
  border-radius: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size: 9px;
  color: #0088fd;
  position: fixed;
  right: 20px;
  bottom: 218px;
}
.modification {
  width: 18px;
  height: 18px;
  margin-top: 9px;
  margin-left: 13px;
}
.newfont {
  color: #c5c5c5;
  font-size: 10px;
  margin-bottom: 9px;
  text-align: right;
  margin-right: 30px;
}
</style>
