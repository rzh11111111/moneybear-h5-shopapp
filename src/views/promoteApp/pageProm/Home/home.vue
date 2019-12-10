<template>
  <div class="home">
    <top-column :top-header="topheader" @tominedetail="tominedetails"></top-column>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="min-height: 100%;">
      <van-notice-bar
        :scrollable="false"
        v-if="status==3||status=='3'"
        left-icon="info-o"
        mode="closeable"
      >账号已被冻结，不能提现收益，能推广</van-notice-bar>
      <van-notice-bar
        :scrollable="false"
        v-else-if="status==2"
        left-icon="info-o"
        mode="closeable"
      >账号已被关闭，能提现收益，不能推广</van-notice-bar>
      <div class="home-content">
        <div class="content-center">
          <p
            class="content-money"
            @click="tomoney"
          >￥{{thisMonthMoney>10000?parseInt(thisMonthMoney):thisMonthMoney}}</p>
          <p class="content-intro">本月入账收益</p>
        </div>
        <div class="content-footer2"></div>
        <ul class="content-footer">
          <li @click="tomoney">
            <p
              class="content-footer-content"
            >￥{{lastMonthMoney>10000?parseInt(lastMonthMoney):lastMonthMoney}}</p>
            <p class="content-footer-bottom">上月入账收益</p>
          </li>
          <li @click="tomoney">
            <p class="content-footer-content">￥{{todayMoney>10000?parseInt(todayMoney):todayMoney}}</p>
            <p class="content-footer-bottom">今日入账收益</p>
          </li>
          <li @click="tomoney">
            <p
              class="content-footer-content"
            >￥{{yesterdayMoney>10000?parseInt(yesterdayMoney):yesterdayMoney}}</p>
            <p class="content-footer-bottom">昨日入账收益</p>
          </li>
        </ul>
        <div class="content-back">
          <img src="@/assets/img/homeback.png" />
        </div>
      </div>
      <div class="height40"></div>
      <footer class="footer-div">
        <template v-if="!ddd.length">
          <div class="footer-list" v-for="(item,index) in gjp" :key="index">
            <content class="footer-content">
              <div style="border-radius: 50%;background: #E6E6E6;"></div>
              <b style="background: #E6E6E6;width: 100%;height: 10px;"></b>
            </content>
          </div>
        </template>
        <div class="footer-list" v-for="(item,index) in ddd" :key="index" @click="tolist(item)">
          <content class="footer-content">
            <van-tag
              v-if="item.id==8 && type==3 && (waitNum+myJobPreShopIngCount)!=0"
              round
              type="danger"
              class="hint"
            >{{(waitNum+myJobPreShopIngCount)}}</van-tag>
            <div>
              <img v-if="item.id==2" src="@/assets/img/togetherhome.png" alt />
              <img v-if="item.id==3" src="@/assets/img/popularizehome.png" alt />
              <img v-if="item.id==4" src="@/assets/img/seedhome.png" alt />
              <img v-if="item.id==5" src="@/assets/img/featurehome.png" alt />
              <img v-if="item.id==6" src="@/assets/img/localhome.png" alt />
              <img v-if="item.id==7" src="@/assets/img/moneyhome.png" alt />
              <img v-if="item.id==8" src="@/assets/img/examinehome.png" alt />
              <img v-if="item.id==9" src="@/assets/img/datahome.png" alt />
              <img v-if="item.id==10" src="@/assets/img/rankhome.png" alt />
              <img v-if="item.id==11" src="@/assets/img/storehome.png" alt />
              <img v-if="item.id==12" src="@/assets/img/draft.png" alt />
            </div>
            <b>{{item.name}}</b>
          </content>
        </div>
      </footer>
    </van-pull-refresh>
    <van-dialog
      v-model="seed"
      :title="seedcontent.title"
      confirmButtonText="知道了"
      @confirm="homedialog"
    >
      <p
        style="margin: 10px 30px;font-size: 13px;line-height: 20px;text-align: center"
      >{{seedcontent.content}}</p>
      <p
        style="margin: 20px 10px 10px;font-size: 12px;line-height: 20px;display: flex;align-items: center;justify-content: center"
      >
        <input type="checkbox" v-model="seedkaiguan" id="seedkaiguan" />
        <label for="seedkaiguan" style="margin-left: 5px;">不再提示</label>
      </p>
    </van-dialog>
    <div class="home-bottom" @click="refreshUrl">清除缓存</div>
  </div>
</template>
<script>
import { back, merchantcode, voice, loginFirst, accDiv } from "@/utils";
import logo from '@/assets/img/LOGO.png'
export default {
  data () {
    return {
      topheader: {
        name: "推广平台",
        left: "4", // 应该是4
        right5: "1",
        right10: true,
        heade: "header1",
        message: ""
      },
      type: "", // 省区总合作商推广员推广首页
      gjp: [], //初始长度
      ddd: [],
      isEnable: "",
      status: "",

      lastMonthProfit: '',
      totalProfit: '',
      yesterdayProfit: '',
      thisMonthProfit: '',

      waitNum: 0,
      myJobPreShopIngCount: 0,
      isLoading: false,
      lastMonthMoney: 0,
      todayMoney: 0,
      yesterdayMoney: 0,
      thisMonthMoney: 0,
      seed: false, //播报
      seedkaiguan: false,
      seedcontent: '',
    };
  },
  components: {
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.getdata();
      }, 500);
    },
    tolist (tolist) {
if (tolist.id == 11) {
if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '个人详情','' ,'' , '']);//其中灰色的为选填项
      
         }
        this.$router.push({
          path: "/MasterDetail",
          query: {
            id: sessionStorage.getItem("id"),
            type: this.type,
            fromrouter: "2"
          }
        });
      } else {
        if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '添加'+tolist.name+'','' ,'' , '']);//其中灰色的为选填项
      
         }
        this.$router.push({
          path: tolist.go,
          query: { id: tolist.id, status: this.status }
        });
      }
    },
    tomoney () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '数据概览','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({
        path: "/money",
        query: { id: 7, status: this.status }
      });
    },
    tobindcard () {
      merchantcode(`${window.location.origin}/download.html`, logo)
    },
    goback () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '返回我的店铺','' ,'' , '']);//其中灰色的为选填项
      
         }
          window.location.href = this.HTTPLOCAT + '/shopApp.html?time=' + ((new Date()).getTime());
        
      // window.location.href = this.HTTPLOCAT + "/shopApp.html";
    },
    tovoice () {
      voice(sessionStorage.getItem('id'))
      // window.location.href = `qtkjshop://JPushRegister?storeId=${this.storeData.id}`
    },
    tominedetails () {
      if (this.type == "3") {
        this.$router.push({
          path: "/BossDetail",
          query: {
            id: sessionStorage.getItem("id"),
            type: this.type,
            fromrouter: "2"
          }
        });
      } else if (this.type == "2") {
        this.$router.push({
          path: "/PromotersListDetail",
          query: {
            id: sessionStorage.getItem("id"),
            type: this.type,
            fromrouter: "2"
          }
        });
      } else if (this.type == "1") {
        this.$router.push({
          path: "/PopularizeDetail",
          query: {
            id: sessionStorage.getItem("id"),
            type: this.type,
            fromrouter: "2"
          }
        });
      } else if (this.type == "0") {
        window.location.href = this.HTTPLOCAT + "/shopApp.html"; //没用
      }
    },
    toPromoters () {
      // 页面的跳转
      window.location.href = this.HTTPLOCAT + "/promoters.html";
      // window.location.href = '/promoters.html'
    },
    getdata () {
      console.log('getdata')
      this.Api.approvalCount({ selectType: 0 }).then(res => {
        console.log('approvalCount0')
        // console.log("审核统计", res.data.data);
        let resData = res.data.data;
        this.waitNum =
          (resData.myApprovalJobSeedInCount == null ? 0 : resData.myApprovalJobSeedInCount) +
          (resData.myApprovalJobSeedUpdateCount == null ? 0 : resData.myApprovalJobSeedUpdateCount) +
          (resData.myApprovalJobSpecialInCount == null ? 0 : resData.myApprovalJobSpecialInCount) +
          (resData.myApprovalJobSpecialUpdateCount == null ? 0 : resData.myApprovalJobSpecialUpdateCount) +
          (resData.myApprovalJobStoreAccountCount == null ? 0 : resData.myApprovalJobStoreAccountCount);
      });
      this.Api.approvalCount({ selectType: 1 }).then(res => {
        console.log('approvalCount1')
        // console.log("审核统计", res.data.data);
        let resData = res.data.data;
        this.myJobPreShopIngCount = resData.myJobPreShopIngCount;
      });
      // 获取全局数据
      let para = {
        // storeId: 'e2d7cae8a3c74ce68c015eedf489614c'
      };
      this.type = sessionStorage.getItem("accountType");
      if (sessionStorage.getItem("accountType") == 0) {
        this.topheader.left = 3
        this.Api.getinfomation2(para)
          .then(res => {
            console.log('getinfomation2')
            if (res.data.data) {
              this.lastMonthMoney = accDiv(res.data.data.lastMonthProfit, 100).toFixed(2) ? accDiv(res.data.data.lastMonthProfit, 100).toFixed(2) : 0;
              this.todayMoney = accDiv(res.data.data.totalProfit, 100).toFixed(2) ? accDiv(res.data.data.totalProfit, 100).toFixed(2) : 0;
              this.yesterdayMoney = accDiv(res.data.data.yesterdayProfit, 100).toFixed(2) ? accDiv(res.data.data.yesterdayProfit, 100).toFixed(2) : 0;
              this.thisMonthMoney = accDiv(res.data.data.thisMonthProfit, 100).toFixed(2) ? accDiv(res.data.data.thisMonthProfit, 100).toFixed(2) : 0;
            }
            this.status = sessionStorage.getItem("status");
            this.homedialogtrue()

            this.topheader.name = "我的推广";
            this.ddd = [
              { id: 5, name: "特色商户", go: "/PromotersList" },
              { id: 6, name: "同城企业", go: "/PromotersList" },
              { id: 7, name: "我的收益", go: "/money" },
              { id: 8, name: "审核中心", go: "/Examine" },
              // {id: 9,name: '数据分析',go: '/PromotersList'},
              // {id: 10, name: '排行榜',go: '/PromotersList'},
              { id: 12, name: "草稿箱", number: "", go: "/Draft" },
              { id: 11, name: "我的", number: "", go: "/PromotersList" }
            ];

          })
        // .catch(error => {
        //   console.log(error);
        // });
      } else {
        this.Api.getinfomation(para)
          .then(res => {
            console.log('getinfomation')
            if (res.data.data) {
              this.lastMonthMoney = accDiv(res.data.data.lastMonthProfit, 100).toFixed(2) ? accDiv(res.data.data.lastMonthProfit, 100).toFixed(2) : 0;
              this.todayMoney = accDiv(res.data.data.totalProfit, 100).toFixed(2) ? accDiv(res.data.data.totalProfit, 100).toFixed(2) : 0;
              this.yesterdayMoney = accDiv(res.data.data.yesterdayProfit, 100).toFixed(2) ? accDiv(res.data.data.yesterdayProfit, 100).toFixed(2) : 0;
              this.thisMonthMoney = accDiv(res.data.data.thisMonthProfit, 100).toFixed(2) ? accDiv(res.data.data.thisMonthProfit, 100).toFixed(2) : 0;
              this.status = sessionStorage.getItem("status");
            }
            this.homedialogtrue()

            if (this.type == 3) {
              this.topheader.name = "省区总";
              this.ddd = [
                { id: 2, name: "合作商", go: "/PromotersList" },
                { id: 3, name: "推广员", go: "/PromotersList" },
                { id: 4, name: "种子商户", go: "/PromotersList" },
                { id: 5, name: "特色商户", go: "/PromotersList" },
                { id: 6, name: "同城企业", go: "/PromotersList" },
                { id: 7, name: "我的收益", go: "/money" },
                { id: 8, name: "审核中心", go: "/Examine" },
                // {id: 9,name: '数据分析',go: '/PromotersList'},
                // {id: 10,name: '排行榜',go: '/PromotersList'}
                { id: 12, name: "草稿箱", go: "/Draft" },
              ];

            } else if (this.type == 2) {
              this.topheader.name = "合作商";
              this.ddd = [
                { id: 3, name: "推广员", go: "/PromotersList" },
                { id: 4, name: "种子商户", go: "/PromotersList" },
                { id: 5, name: "特色商户", go: "/PromotersList" },
                { id: 6, name: "同城企业", go: "/PromotersList" },
                { id: 7, name: "我的收益", go: "/money" },
                { id: 8, name: "审核中心", go: "/Examine" },
                // {id: 9,name: '数据分析',go: '/PromotersList'},
                // {id: 10,name: '排行榜',go: '/PromotersList'}
                { id: 12, name: "草稿箱", go: "/Draft" },
              ];
            } else if (this.type == 1) {
              
             
                this.topheader.name = "推广员";
                this.ddd = [
                { id: 4, name: "种子商户", go: "/PromotersList" },
                { id: 5, name: "特色商户", go: "/PromotersList" },
                { id: 6, name: "同城企业", go: "/PromotersList" },
                { id: 7, name: "我的收益", go: "/money" },
                { id: 8, name: "审核中心", go: "/Examine" },
                // {id: 9, name: '数据分析',go: '/PromotersList' },
                // {id: 10, name: '排行榜',go: '/PromotersList'}
                { id: 12, name: "草稿箱", go: "/Draft" },
              ];
              
              
            } else if (this.type == 0) {
              this.topheader.name = "我的推广";
              // this.ddd = [
              //     {id: 2,name: "合作商",go: "/PromotersList" },
              //     {id: 3,name: "推广员",go: "/PromotersList"},
              //     {id: 4,name: "种子商户", go: "/PromotersList"},
              //     {id: 5,name: "特色商户",go: "/PromotersList"},
              //     {id: 6,name: "同城企业",go: "/PromotersList"},
              //     {id: 7,name: "我的收益", go: "/money"},
              //     {id: 8,name: "审核中心",go: "/Examine" },
              //     // {id: 9,name: '数据分析',go: '/PromotersList'},
              //     // {id: 10, name: '排行榜',go: '/PromotersList'}
              //     {id: 12, name: "草稿箱",  go: "/Draft"},
              // ];
              this.ddd = [
                { id: 5, name: "特色商户", go: "/PromotersList" },
                { id: 6, name: "同城企业", go: "/PromotersList" },
                { id: 7, name: "我的收益", go: "/money" },
                { id: 8, name: "审核中心", go: "/Examine" },
                { id: 12, name: "草稿箱", go: "/Draft" },
                // {id: 9,name: '数据分析', go: '/PromotersList'},
                // {id: 10, name: '排行榜',go: '/PromotersList'}
                { id: 11, name: "我的", number: "", go: "/PromotersList" }
              ];
            }
          })
        // .catch(error => {
        // console.log(error);
        // });
      }
      this.getnotreadmessage();
    },
    getnotreadmessage () {
      let para = {};
      if (this.type == 0) {
        this.Api.notReadMessage2(para)
          .then(res => {
            console.log('getnotreadmessage')
            // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
            // setToken(res.data.phone)
            // console.log(res.data);
            this.topheader.message =
              (res.data.data.noticeCount + res.data.data.messageCount) > 99 ? 99 : (res.data.data.noticeCount + res.data.data.messageCount);
          })

      } else {
        this.Api.notReadMessage(para)
          .then(res => {
            console.log('notReadMessage')
            // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
            // setToken(res.data.phone)
            // console.log(res.data);
            this.topheader.message =
              (res.data.data.noticeCount + res.data.data.messageCount) > 99 ? 99 : (res.data.data.noticeCount + res.data.data.messageCount);
          })
      }
    },
    refreshUrl () {
      this.$toast.loading({
        duration: 0,       // 持续展示 toast
        mask: true,
        message: '加载中...'
      });
      window.location.href = this.HTTPLOCAT + '/promoteApp.html?time=' + ((new Date()).getTime());
      // location.reload(true)
    },
    homedialogtrue () {
      this.Api.homeDialog({}).then(res => {
        if (res.data.status == 1) {
          this.seedcontent = res.data.data
          sessionStorage.getItem('bind') ? '' : this.seed = true
        }
      })
    },
    homedialog () {
      sessionStorage.setItem('bind', true)
      if (this.seedkaiguan) {
        let para = {
          messageId: this.seedcontent.id
        }

        this.Api.homeDialogRead(para).then(() => {
          // if(res.data.status==1){

          // }else{

          // }
        })
      }
    }
  },
  mounted () {
    const loading = document.getElementById('preloadingAnimation')
    if (loading != null) {
      document.body.removeChild(loading)

    }
    sessionStorage.removeItem('lng')  //清除添加种子特色时放的缓存
    sessionStorage.removeItem('lat')
    sessionStorage.removeItem('address')
    sessionStorage.removeItem('city')
    this.$store.commit('SET_SHOP', '') //清除添加种子特色时放的缓存
    this.$store.commit('SET_STOREACCOUNT', '')
    if (this.local.$getLocalStorageByName('accountType')||this.local.$getLocalStorageByName('accountType')===0) {
      this.session.$setSessionStorageByName('accountType', this.local.$getLocalStorageByName('accountType'))
      this.session.$setSessionStorageByName('accountName', this.local.$getLocalStorageByName('accountName'))
      this.session.$setSessionStorageByName('code', this.local.$getLocalStorageByName('code'))
      this.session.$setSessionStorageByName('id', this.local.$getLocalStorageByName('id'))
    }
    back('#00A7FC')
    switch (sessionStorage.getItem('accountType')) {
      case 3:
        this.gjp = [0, 1, 2, 3, 4, 5, 6, 7];
        break;
      case 2:
        this.gjp = [0, 1, 2, 3, 4, 5, 6];
        break;
      case 1:
       
          this.gjp = [0, 1, 2, 3, 4, 5];
        
        
        break;
      case 0:
        this.gjp = [0, 1, 2, 3, 4, 5];
        break;
      default:
        this.gjp = [0, 1, 2, 3, 4, 5];
        break
    }
    this.getdata();
    this.tovoice()
    
    
  },
  created () {
    loginFirst()
  }
};
</script>
<style scoped lang="scss" type="text/scss">
.home {
  overflow: hidden;
  height: 100%;
}

.home-content {
  width: 375px;
  height: 159px;
  background: #00A7FC;
  background: -webkit-linear-gradient(to bottom, #00A7FC 0%, #0088fd 100%);
  background: -moz-linear-gradient(to bottom, #00A7FC 0%, #0088fd 100%);
  background: linear-gradient(to bottom, #00A7FC 0%, #0088fd 100%);
  position: relative;
  border-radius: 0 0 5% 5%;
}

.content-center {
  text-align: center;
  position: absolute;
  bottom: 87.5px;
  left: 50%;
  transform: translateX(-50%);
}

.content-back {
  width: 100%;
  position: absolute;
  bottom: 5px;
}

.content-back /deep/ img {
  width: 100%;
}

.content-money {
  font-size: 28px;
  line-height: 36px;
  color: #fff;
}

.content-intro {
  font-size: 12px;
  line-height: 17px;
  color: #fff;
}

.content-footer2 {
  width: 345px;
  height: 80px;
  position: absolute;
  bottom: -20px;
  left: 15px;
  z-index: 999;
  background: rgba(204, 204, 204, 1);
  border-radius: 18px;
  opacity: 0.3306;
  filter: blur(10px);
}

.content-footer {
  width: 345px;
  height: 80px;
  border-radius: 9px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: -20px;
  left: 15px;
  z-index: 1000;
}

.content-footer li {
  width: 115px;
  height: 37px;
  margin-top: 21.5px;
}

.content-footer li:nth-of-type(1),
.content-footer li:nth-of-type(2) {
  border-right: 1px solid #dcdcdc;
}

.content-footer-content {
  font-size: 17px;
  line-height: 21px;
  font-weight: 800;
  margin-top: -6.5px;
  color: #25669e;
  text-align: center;
}

.content-footer-bottom {
  font-size: 12px;
  line-height: 17px;
  color: #6e6e6e;
  margin-top: 5px;
  text-align: center;
}

.footer-div {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 375px;
}

/*.footer-div /deep/ img{*/
/*width: 47px;*/
/*!*height: 47px;*!*/
/*}*/
.footer-div /deep/ b {
  display: block;
  font-size: 14px;
  line-height: 20px;
  margin-top: 10px;
  text-align: center;
  font-weight: 500;
  color: #333;
}

.footer-list {
  box-sizing: border-box;
  width: 125px;
  height: 110px;
  position: relative;
  /*border:1px solid #c0c0c0;*/
  border: none;
}

.footer-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.footer-content /deep/ div {
  width: 47px;
  height: 47px;
  margin-left: 50%;
  transform: translateX(-50%);
}

.footer-content /deep/ img {
  width: 100%;
}

.hint {
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 9999;
}
.home-bottom {
  width: 100%;
  position: absolute;
  bottom: 5px;
  left: 0;
  text-align: center;
  color: rgb(0, 149, 253);
  font-size: 14px;
}
</style>
