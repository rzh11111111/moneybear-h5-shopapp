<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="anzhuotop">
      <van-collapse v-model="activeNames">
        <van-collapse-item name="0" title="状态信息" value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff0" />
          </div>
          <van-field type="text" label="推广人" :value="name" required readonly />
        </van-collapse-item>
      </van-collapse>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="经营信息" name="1" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff1" />
          </div>
          <van-cell title="类别" required>
            <van-radio-group v-model="shop.type" style="display: flex;">
              <van-radio name="1" style="margin-right: 20px;">企业</van-radio>
              <van-radio name="2">代理商</van-radio>
            </van-radio-group>
          </van-cell>
          <div class="typete">类型为企业时，以下内容输入企业的相关信息;类型为代理商时,以下内容输入代理商的相关信息</div>
          <van-field
            type="textarea"
            label="经营品牌"
            class="pingpaite"
            placeholder="请输入经营品牌"
            v-model="shop.brandNames"
            required
          ></van-field>
        </van-collapse-item>
      </van-collapse>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="基本信息" name="2" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff2" />
          </div>
          <van-field type="text" label="店铺角色" value="同城企业" required readonly></van-field>
          <van-cell
            title="企业地址"
            placeholder="请选择企业地址"
            :value="shop.province+shop.city+shop.region"
            is-link
            required
            @click="areaConfig.onoff=!areaConfig.onoff"
          ></van-cell>

          <van-field
            label
            type="text"
            class="tetitle"
            placeholder="请选择详细地址，如道路.门牌号等信息"
            v-model="shop.contactAddress"
            name="contactAddress"
            v-validate="'emoji|required|length:3,20'"
            :error-message="errors.first('title')"
          ></van-field>
          <!--<img :src="imgsrc" style="width: 300px;height: 300px;" >-->
          <div v-if="shop.province" class="provincete">同城商品将面向(定位为{{shop.city}})的用户投放</div>
          <div v-else class="provincete">同城商品将面向(定位为) 的用户投放</div>
        </van-collapse-item>
      </van-collapse>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="证照信息" name="3" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff3" />
          </div>
          <van-field type="text" label="企业名称" v-model="shop.name" placeholder="请输入企业名称" required />
        </van-collapse-item>
      </van-collapse>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="通讯录" name="4" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value">
            <van-icon name="info-o" v-show="activewarn.onoff4" />
          </div>
          <van-field
            type="text"
            label="姓名"
            v-model="shop.contactName"
            placeholder="请输入姓名"
            required
          />
          <van-field
            type="text"
            label="手机号"
            v-model="shop.contactPhone"
            placeholder="请输入手机号"
            name="contactPhone"
            v-validate="'emoji|required|length:8,11'"
            :error-message="errors.first('contactPhone')"
            required
          />
        </van-collapse-item>
      </van-collapse>
    </div>
    <van-button type="primary" size="large" @click="submitBasic" class="submitbtn">提交处理</van-button>
    <van-popup v-model="jingying.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
      </div>
    </van-popup>
    <van-popup v-model="areaConfig.onoff" position="bottom">
      <one-area :one-area="shop" @oneAreascallback="oneAreas" emptyText="您的可推广区域为空"></one-area>
    </van-popup>
  </div>
</template>

<script>
import oneArea from '@/components/chooseArea/oneArea'
import { Dialog } from 'vant'
import { inputup, inputup2, emojiDelete } from "@utils";
export default {
  data () {
    return {
      topheader: {
        name: '填写资料',
        left: '3',
        heade: 'header1'
      },
      name: '',
      activeNames: ['2', '1', '0', '3', '4'], // 开哪个折叠
      activewarn: {
        onoff0: false,
        onoff1: false,
        onoff2: false,
        onoff3: false,
        onoff4: false,
      },
      inputwarn: {
        warn1: '',
      },
      areaConfig: {  //选择地址
        onoff: false,
      },
      jingying: { // 经营品牌
        onoff: false
      },
      kaiguan: true,
      disabled: true, // 后退能否
      shop: {
        isEnable: '1',
        name: '',
        type: '1',
        contactName: '',
        contactPhone: '',
        contactAddress: '',
        serviceType: '',
        serviceId: '',
        brandNames: '',
        areaConfig: {
          id: ''
        },
        province: '',
        city: '',
        region: ''
      }
    }
  },
  components: {
   oneArea
  },
  methods: {
    goback () {
      if (this.jingying.onoff) {
        this.jingying.onoff = !this.jingying.onoff
        this.topheader.name = '填写资料'
      } else if (this.disabled) {
        Dialog.confirm({
          title: '',
          message: '您有未提交审批的修改',
          confirmButtonText: '继续编辑',
          cancelButtonText: '放弃修改'
        }).then(() => {
          // on confirm
        }).catch(() => {
          this.$router.go(-1)
        })
      } else {
        this.$router.go(-1)
      }
    },
    oneAreas (msg) {
      if (msg != '') {
        this.shop.province = msg[0].name
        this.shop.city = msg[1].name
        this.shop.region = msg[2].name
        this.shop.areaConfig.id = msg[3].id
      }
      this.areaConfig.onoff = false
    },
    getimg () {
      this.$refs.imageCropper.checkPhoto()
    },
    loadImage (data) {
      // console.log(data.get('fileCategoryCode'),data.get('filename'))
      this.upload(data)
      // this.shop.logoUrl=data
    },
    deletelicense () {
      this.shop.logoUrl = ''
    },
    submitBasic () { // 提交
    if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '同城提交','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$validator.validateAll().then(ress => {
        if (!ress) {
          this.$toast('请填写正确信息')
          return false
        }
      })
      if (!this.shop.name || !this.shop.contactName || !this.shop.contactPhone || !this.shop.contactAddress || !this.shop.brandNames || !this.shop.type || !this.shop.areaConfig.id) {
        this.$toast('请填写完整信息')
        return false
      }

      if (this.$route.query.id) {
        let para = {
          name: emojiDelete(this.shop.name),
          contactName: emojiDelete(this.shop.contactName),
          contactPhone: emojiDelete(this.shop.contactPhone),
          contactAddress: emojiDelete(this.shop.contactAddress),
          brandNames: emojiDelete(this.shop.brandNames),
          type: this.shop.type,
          areaConfig: {
            id: this.shop.areaConfig.id
          },
          id: this.$route.query.id,
          status: 1
        }
        if (this.kaiguan) {
          this.kaiguan = false
          this.Api.changeLocal2(para).then(res => {
            // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
            // setToken(res.data.phone)
            // this.shop.logoUrl = res.data.url
            this.kaiguan = true
            if (res.data.status == 1) {  //去结果页
               this.$router.push({ path: '/ApplyResult', query: { result: '申请成功，省区总处理中', redresult: '处理结果，将消息通知申请者' } })
            } else {
              this.$toast(res.data.stateMessage)
              // this.$router.push({path: '/ApplyResult', query: {win:false,type:5,result:res.data.stateMessage}})
            }
          }).catch(() => {
            this.kaiguan = true
          })
        }

      } else {
        let para = {
          name: emojiDelete(this.shop.name),
          contactName: emojiDelete(this.shop.contactName),
          contactPhone: emojiDelete(this.shop.contactPhone),
          contactAddress: emojiDelete(this.shop.contactAddress),
          brandNames: emojiDelete(this.shop.brandNames),
          type: this.shop.type,
          areaConfig: {
            id: this.shop.areaConfig.id
          }
        }
        if (this.kaiguan) {
          this.kaiguan = false
          this.Api.addLocalFirst(para).then(res => {
            // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
            // setToken(res.data.phone)
            // this.shop.logoUrl = res.data.url
            this.kaiguan = true
            if (res.data.status == 1) {  //去结果页
              this.$router.push({ path: '/ApplyResult', query: { result: '申请成功，省区总处理中', redresult: '处理结果，将消息通知申请者' } })
            } else {
              this.$toast(res.data.stateMessage)
            }
            /*else{
              this.$router.push({path: '/ApplyResult', query: {win:false,type:5,result:res.data.stateMessage}})
            }*/
          }).catch(() => {
            this.kaiguan = true
          })

        }

      }
    },
    /*  handleScroll () {
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
        if (arr[i] == val) {
          arr.splice(i, 1)
          break
        }
      }
    },
  },
  mounted () {
    if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '预添加同城页','' ,'' , '']);//其中灰色的为选填项
      
         }
    inputup('.anzhuotop', '.app-init')
    this.name = sessionStorage.getItem('accountName')
    // window.addEventListener('scroll', this.handleScroll)
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
        this.shop = res.data.data
        this.shop.type = this.shop.type.toString()
        this.topheader.name = '重新填写资料'
        // this.shop.spreadName=res.data.data.serviceUsername
        // this.shop.shopInfo.companyType=res.data.data.status.toString()
        // this.shop.province=res.data.data.province
        // this.shop.city=res.data.data.city
        // this.shop.region=res.data.data.region
        // this.shop.areaConfig.id=res.data.data.areaConfig.id
        // this.shop.shopInfo.name=res.data.data.name
        // this.shop.shopCommunicationBookList.name=res.data.data.contactName
        // this.shop.shopCommunicationBookList.phone=res.data.data.contactPhone
        // this.shop.shopInfo.address=res.data.data.contactAddress
      })
    } else {
      this.shop.serviceType = sessionStorage.getItem('accountType')
      this.shop.serviceId = sessionStorage.getItem('accountId')
    }
  },
  beforeDestroy () {
    inputup2('.anzhuotop', '.app-init')
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)

  },
  watch: {
    //     'activewarn.onoff2'(value){
    //     console.log(value)
    // }
  }
}
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
.provincete {
  font-size: 12px;
  text-align: center;
}
.typete {
  font-size: 12px;
  margin: 4px 8px;
}
.pingpaite {
  align-items: start;
}
</style>
