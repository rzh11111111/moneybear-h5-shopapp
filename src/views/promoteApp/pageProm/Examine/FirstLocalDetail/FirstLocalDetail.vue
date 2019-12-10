<template>
  <div class="app-init">

    <top-column :top-header="topheader"></top-column>
    <div class="anzhuotop">
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="0" title="处理信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
          <van-cell title="预推广名称" :value="shop.name" ></van-cell>
          <van-cell title="预推广类型" value="同城企业预推广" ></van-cell>
          <van-cell title="申请时间" :value="shop.createTime" ></van-cell>
        <van-cell title="处理状态" value="待处理" v-if="shop.status==1" value-class="bluecolor"/>
        <van-cell title="处理状态" value="已录入资料" v-if="shop.status==2" value-class="greencolor"/>
        <van-cell title="处理状态" value="已拒绝" v-if="shop.status==3" value-class="redcolor"/>
        <van-cell-group>
            <van-cell title="拒绝理由" :value="shop.remarks" v-if="shop.status==3"></van-cell>
          <!--<van-field label="拒绝理由" type="textarea" :value="shop.remarks" rows="1" autosize readonly v-if="shop.status==3"/>-->
          <!--<van-field label="备注" type="textarea" :value="shop.remarks" rows="1" autosize readonly v-else/>-->
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item name="1" title="状态信息" value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff0"/>
        </div>
          <van-cell title="预推广人" :value="'省区总'+shop.serviceUsername"  v-if="shop.serviceType==1"></van-cell>
          <van-cell title="预推广人" :value="'合作商'+shop.serviceUsername"   v-if="shop.serviceType==2"></van-cell>
          <van-cell title="预推广人" :value="'推广员'+shop.serviceUsername"  v-if="shop.serviceType==3"></van-cell>
          <van-cell title="预推广人" :value="'店主'+shop.serviceUsername"  v-if="shop.serviceType==4||shop.serviceType==5"></van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item title="经营信息" name="2" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff1"/>
        </div>
        <van-cell title="类别" value="企业" v-if="shop.type==1"/>
        <van-cell title="类别" value="代理商" v-if="shop.type==2"/>

        <van-cell title="经营品牌" :value="shop.brandNames"/>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item title="基本信息" name="3" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff2"></van-icon>
        </div>
        <van-field type="text" label="店铺角色" value="同城企业" readonly></van-field>
        <van-cell title="企业地址" placeholder="请选择企业地址" :value="shop.province+shop.city+shop.region"></van-cell>
        <van-cell title=" " placeholder="请选择详细地址，门牌号。。。。。。。。。" :value="shop.contactAddress"></van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item title="证照信息" name="4" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff3"/>
        </div>
        <van-cell title="企业名称" placeholder="请输入企业名称" :value="shop.name"></van-cell>
      </van-collapse-item>
    </van-collapse>
    <van-collapse v-model="activeNames" class="margintop">
      <van-collapse-item title="通讯录" name="5" value=" " value-class="collapsewarn">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff4"></van-icon>
        </div>
        <van-field type="text" label="姓名" v-model="shop.contactName" placeholder="请输入姓名" readonly></van-field>
        <van-field
          type="text"
          label="手机号"
          v-model="shop.contactPhone"
          placeholder="请输入手机号"
          readonly
        ></van-field>
      </van-collapse-item>
    </van-collapse>
    <van-collapse :value="activeNames" v-show="type==3&&shop.status==1">
      <van-collapse-item title="原因/备注" name="6" class="margintop" value=" " :is-link="false">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value">
          <van-icon name="info-o" v-show="activewarn.onoff4"/>
        </div>
        <van-field type="textarea" label="原因/备注" placeholder="审批拒绝时，必须填写原因" v-model="shop.remarks"></van-field>
        <p class="newfont">{{newfont}}/200</p>
      </van-collapse-item>
    </van-collapse>
    <van-button type="warning" @click="refuse" v-if="type==3&&shop.status==1" class="redback">拒绝</van-button>
    <van-button
      type="primary"
      @click="toaddlocal"
      v-if="type==3&&shop.status==1"
      class="greenback"
    >录入资料</van-button>
    <van-button
      type="info"
      size="large"
      @click="submitBasic"
      class="submitbtn"
      v-if="type!=3&&shop.status==3"
    >重新提交处理</van-button>
    </div>
    <van-popup v-model="jingying.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>


      </div>
    </van-popup>
    <van-popup v-model="areaConfig.onoff" position="bottom">
      <one-area :one-area="shop" @oneAreascallback="oneAreas"></one-area>
    </van-popup>
  </div>
</template>

<script>
import oneArea from "@/components/chooseArea/oneArea";
import { format,inputup,inputup2 } from "@utils";
export default {
  data() {
    return {
      topheader: {
        name: "预推广的同城企业详情",
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
      jingying: {
        // 经营品牌
        onoff: false
      },
      disabled: true, // 后退能否
      shop: {
        isEnable: "1",
        name: "",
        type: "1",
        contactName: "省区总 张三",
        contactPhone: "",
        contactAddress: "",
        serviceType: sessionStorage.getItem("accountType"),
        serviceId: sessionStorage.getItem("accountId"),
        merManagerId: "1",
        brandNames: "1",
        areaConfig: {
          id: "840"
        },
        province: "1",
        city: "1",
        region: "1",
        remarks: "",
      },
      newfont: 0
    };
  },
  components: {
    oneArea
  },
  methods: {
    goback() {
      if (this.jingying.onoff) {
        this.jingying.onoff = !this.jingying.onoff;
        this.topheader.name = "填写资料";
      } else {
        this.$router.go(-1);
      }
    },
    oneAreas(msg) {
      // console.log(msg);
      if (msg == "") {
      } else {
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
    refuse() {
      if (this.shop.remarks) {
        let para = {
          id: this.shop.id,
          status: 3,
          remarks: this.shop.remarks
        };
        this.Api.changeLocal2(para)
          .then(res => {
            // console.log(res);
            if(res.data.status==1){
              this.$toast('拒绝成功')
              this.$router.go(-1);
            }

          })
          .catch(error => {
            // console.log(error);
          });
      } else {
        this.$toast("请输入拒绝原因");
      }
    },
    toaddlocal() {
      this.$router.push({ path: "/AddLocal", query: { id: this.shop.id } });
    },
    submitBasic() {
      // 获取全局数据
      this.$router.push({
        path: "/AddLocalFirst",
        query: { id: this.shop.id }
      });
    },
    /*handleScroll() {
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
    },*/
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
          // console.log(result);
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
        this.newfont =
          this.shop.remarks !== undefined &&
          this.shop.remarks !== null &&
          this.shop.remarks.length;
      }
    }
  },
  beforeDestroy(){
    inputup2('.anzhuotop','.app-init')
  },
  mounted() {
    inputup('.anzhuotop','.app-init')
    // window.addEventListener("scroll", this.handleScroll);
    this.type = sessionStorage.getItem("accountType");
    this.list = this.$route.query.list;
    // let para = this.$route.query.id, // 0,挂靠合作商id
    // this.name=sessionStorage.getItem('accountName')
    let para = {
      id: this.$route.query.id
    }
    // let formdata = new FormData();
    // formdata.set("id", this.$route.query.id);
    this.Api.localDetail2(para)
      .then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        this.shop = res.data.data;
        // console.log(res.data);
      })
      .catch(error => {
        // console.log(error);
      });
  },
  destroyed() {
    // window.removeEventListener("scroll", this.handleScroll);
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
.botto{
  z-index: 2000;
}
</style>
