<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <!-- 推广员-审核中心 -->
    <div v-if="type==1">
      <van-collapse :value="activeNames">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="我推广的种子商户" is-link @click="toAuditList(1)">
          <div class="graycolor">
            <span class="bluecolor">{{mySpreadSeedIngCount}}</span>审核中
            <span class="redcolor">{{mySpreadSeedRefusedCount}}</span>拒绝
          </div>
        </van-cell>
        <van-cell title="我推广的特色商户" is-link @click="toAuditList(2)">
          <div class="graycolor">
            <span class="bluecolor">{{mySpreadSpecialIngCount}}</span>审核中
            <span class="redcolor">{{mySpreadSpecialRefusedCount}}</span>拒绝
          </div>
        </van-cell>
      </van-collapse>
      <!-- <van-collapse :value="activeNames" style="margin-top:10px">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="我推广的同城企业" is-link @click="toAuditList(5)">
          <div class="graycolor">
            <span class="bluecolor">{{mySpreadShopIngCount}}</span>审核中
            <span class="redcolor">{{mySpreadShopRefusedCount}}</span>拒绝
          </div>
        </van-cell>
      </van-collapse>-->
      <van-collapse :value="activeNames" style="margin-top:10px">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="我预推广的同城企业" is-link @click="tofirstlocallist">
          <div class="graycolor">
            <span class="bluecolor">{{myPreShopIngCount}}</span>审核中
            <span class="redcolor">{{myPreShopRefusedCount}}</span>拒绝
          </div>
        </van-cell>
      </van-collapse>
      <div class="contenttext">您预推广的同城企业，由省区总录入资料后，前往"我推广的同城企业"中查看。</div>

      <van-cell title="修改合同审核" is-link @click="toAuditList(30)">
          <div class="graycolor">
            <span class="bluecolor">{{myUpdateContractCount}}</span>审核中
            <span class="redcolor">{{myUpdateContractRefusedCount}}</span>拒绝
          </div>
        </van-cell>
    </div>
    <!-- 合作商-审核中心 -->
    <div v-if="type==2">
      <!-- <van-collapse :value="activeNames">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="我推广的同城企业" is-link @click="toPartnerCityList">
          <div class="graycolor">
            <span class="bluecolor">{{mySpreadShopIngCount}}</span>审核中
            <span class="redcolor">{{mySpreadShopRefusedCount}}</span>拒绝
          </div>
        </van-cell>
      </van-collapse>-->
      <van-collapse :value="activeNames" style="margin-top:10px">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="我预推广的同城企业" is-link @click="tofirstlocallist">
          <div class="graycolor">
            <span class="bluecolor">{{myPreShopIngCount}}</span>审核中
            <span class="redcolor">{{myPreShopRefusedCount}}</span>拒绝
          </div>
        </van-cell>
      </van-collapse>
      <div class="contenttext">您预推广的同城企业，由省区总录入资料后，前往"我推广的同城企业"中查看。</div>
    </div>
    <!-- 省区总-审核中心 -->
    <div v-if="type==3">
      <van-collapse :value="activeNames">
        <van-collapse-item
          title="待办事项"
          name="0"
          value-class="collapsewarn"
          value=" "
          :is-link="false"
        >
          <div slot="icon" class="vant-collapse-icon"></div>
          <van-cell title="待我审核" is-link @click="toOnOff">
            <div class="graycolor">
              <span class="bluecolor">{{waitNum==0?'':waitNum}}</span>
            </div>
          </van-cell>
          <van-cell title="预推广的同城企业" is-link @click="tofirstlocallist">
            <div class="graycolor">
              <span class="bluecolor">{{myJobPreShopIngCount==0?'':myJobPreShopIngCount}}</span>
            </div>
          </van-cell>
        </van-collapse-item>
      </van-collapse>
      <div class="contenttext">合作商/推广员预推广的同城企业，由您录入资料后，前往“全部审核>同城企业入驻”中查看</div>
      <van-collapse :value="activeNames">
        <van-collapse-item
          title="审核列表"
          name="1"
          value-class="collapsewarn"
          value=" "
          :is-link="false"
        >
          <div slot="icon" class="vant-collapse-icon"></div>
          <van-cell title="入驻审核" is-link @click="toEnter"></van-cell>
          <van-cell title="资料变更审核" is-link @click="toChanges"></van-cell>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- 商户老板-审核中心 -->
    <div v-if="type==0">
      <van-collapse :value="activeNames">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="我推广的特色商户" is-link @click="toAuditList(2)">
          <div class="graycolor">
            <span class="bluecolor">{{mySpreadSpecialIngCount}}</span>审核中
            <span class="redcolor">{{mySpreadSpecialRefusedCount}}</span>拒绝
          </div>
        </van-cell>
      </van-collapse>
      <!-- <van-collapse :value="activeNames" style="margin-top:10px">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="我推广的同城企业" is-link @click="toPartnerCityList">
          <div class="graycolor">
            <span class="bluecolor">{{mySpreadShopIngCount}}</span>审核中
            <span class="redcolor">{{mySpreadShopRefusedCount}}</span>拒绝
          </div>
        </van-cell>
      </van-collapse>-->
      <van-collapse :value="activeNames" style="margin-top:10px">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="我预推广的同城企业" is-link @click="tofirstlocallist">
          <div class="graycolor">
            <span class="bluecolor">{{myPreShopIngCount}}</span>审核中
            <span class="redcolor">{{myPreShopRefusedCount}}</span>拒绝
          </div>
        </van-cell>
      </van-collapse>
      <div class="contenttext">您预推广的同城企业，由省区总录入资料后，前往"我推广的同城企业"中查看。</div>

       <van-cell title="修改合同审核" is-link @click="toAuditList(30)">
          <div class="graycolor">
            <span class="bluecolor">{{myUpdateContractCount}}</span>审核中
            <span class="redcolor">{{myUpdateContractRefusedCount}}</span>拒绝
          </div>
        </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: "Examine",
  data() {
    return {
      topheader: {
        name: "审核中心",
        left: "3",
        heade: "header1"
      },
      type: "1", // 省区总合作商推广员
      accountId: "",
      activeNames: ["0", "1"],
      wait: {
        onoff: false,
        enter: false,
        changes: false
      },
      //统计
      waitNum: 0,
      myPreShopIngCount: 0,
      myApprovalJobSeedInCount: 0, // 待我审核的种子商户入驻的数目
      myApprovalJobSeedUpdateCount: 0, // 待我审核的种子商户更新的数目
      myJobPreShopIngCount: 0, // 待我审核的特色店的入驻的数目
      myJobPreShopRefusedCount: 0, // 待我审核的特色店更新的数目
      mySpreadCooInCount: 0, // 我推广的合作商审核中的数目
      mySpreadCooRefusedCount: 0, // 我推广的合作商拒绝的数目
      spreadIngCount: 0, // 我推广的待审核的推广员的数目
      spreadRefused: 0, // 我推广的被拒绝的推广员的数目
      mySpreadShopIngCount: 0, // 我推广的同城企业审核中的数目
      mySpreadShopRefusedCount: 0, //  我推广的同城企业拒绝的数目
      updateCooperationCount: 0, // 合作商资料变更待审核的数目
      updateCooperationRefusedCount: 0, // 合作商资料变更拒绝的数目
      updateSpreadCount: 0, // 推广员的资料变更待审核的数目
      updateSpreadRefusedCount: 0, // 推广员的资料变更拒绝的数目
      myPreShopRefusedCount: 0,
      mySpreadSeedIngCount: 0, // 我推广的种子商户的审核中数目
      mySpreadSeedRefusedCount: 0, // 我推广的种子商户的审核的数目
      mySpreadSpecialIngCount: 0, // 我推广的特色店的待审核的数目
      mySpreadSpecialRefusedCount: 0, // 我推广的特色店被拒绝的数目
      myApprovalJobUpdateContractCount:0,
      myUpdateContractCount:0, // 我改签合同待审核的数目
      myUpdateContractRefusedCount:0, // 我改签合同已拒绝的数目
    };
  },
  components: {
  },
  methods: {
    getSource() {
      this.Api.approvalCount({ selectType: 0 }).then(res => {
        console.log("审核统计", res.data.data);
        let resData = res.data.data;
        this.waitNum =
          (resData.myApprovalJobSeedInCount==null?0:resData.myApprovalJobSeedInCount) +
          (resData.myApprovalJobSeedUpdateCount==null?0:resData.myApprovalJobSeedUpdateCount) +
          (resData.myApprovalJobSpecialInCount==null?0:resData.myApprovalJobSpecialInCount) +
          (resData.myApprovalJobSpecialUpdateCount==null?0:resData.myApprovalJobSpecialUpdateCount) +
          (resData.myApprovalJobStoreAccountCount==null?0:resData.myApprovalJobStoreAccountCount)+
          (resData.myApprovalJobUpdateContractCount==null?0:resData.myApprovalJobUpdateContractCount);
          
        this.myApprovalJobSeedInCount = resData.myApprovalJobSeedInCount;
        this.myApprovalJobSeedUpdateCount =
          resData.myApprovalJobSeedUpdateCount;
          this.myApprovalJobUpdateContractCount=resData.myApprovalJobUpdateContractCount
      });

      this.Api.approvalCount({ selectType: 1 }).then(res => {
        console.log("审核统计", res.data.data);
        let resData = res.data.data;
        this.myPreShopIngCount = resData.myPreShopIngCount;
        this.mySpreadCooInCount = resData.mySpreadCooInCount;
        this.mySpreadCooRefusedCount = resData.mySpreadCooRefusedCount;
        this.spreadIngCount = resData.spreadIngCount;
        this.spreadRefused = resData.spreadRefused;
        this.mySpreadShopIngCount = resData.mySpreadShopIngCount;
        this.mySpreadShopRefusedCount = resData.mySpreadShopRefusedCount;
        this.updateCooperationCount = resData.updateCooperationCount;
        this.updateCooperationRefusedCount =
          resData.updateCooperationRefusedCount;
        this.updateSpreadCount = resData.updateSpreadCount;
        this.updateSpreadRefusedCount = resData.updateSpreadRefusedCount;
        this.myPreShopRefusedCount = resData.myPreShopRefusedCount;
        this.mySpreadSeedIngCount = resData.mySpreadSeedIngCount;
        this.mySpreadSeedRefusedCount = resData.mySpreadSeedRefusedCount;
        this.mySpreadSpecialIngCount = resData.mySpreadSpecialIngCount;
        this.mySpreadSpecialRefusedCount = resData.mySpreadSpecialRefusedCount;
        this.myJobPreShopIngCount = resData.myJobPreShopIngCount;
        this.myJobPreShopRefusedCount = resData.myJobPreShopRefusedCount;
        this.myUpdateContractCount = resData.myUpdateContractCount
      this.myUpdateContractRefusedCount = resData.myUpdateContractRefusedCount
      });
      /* let para = {
        pageNo: 1,
        pageSize: 1,

      };
      this.Api.localList2(para)
              .then(res => {
                if (!res.data.data.list) {
                } else {
                  this.local = this.local.concat(res.data.data.list);
                }

                console.log(res.data.data);
                this.page++;
                this.kaiguan = true;
              })
              .catch(error => {
                console.log(error);
              });*/
    },
    goback() {
      if (this.steps == 2) {
        this.steps = 1;
        this.topheader.name = "填写资料";
      } else if (this.steps == 3) {
        this.steps = 2;
        this.topheader.name = "上传合同照片";
      } else {
        this.$router.go(-1);
      }
    },
    toOnOff() {
      this.$router.push("/onoff");
    },
    toEnter() {
      this.$router.push("/enter");
    },
    toChanges() {
      this.$router.push("/changes");
    },
    tofirstlocallist() {
      if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '我预推广的同城','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push("/FirstLocalList");
    },
    toApprovalList() {
      this.$router.push("/ApprovalList");
    },
    toAuditList(param) {
      if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '我推广的种子特色','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({
        path: "/AuditList",
        query: { serviceType: param, loginPeopleId: this.accountId }
      });
    },
    toWaitReviewList(param) {
      this.$router.push({
        path: "/WaitReviewList",
        query: { serviceType: param }
      });
    },
    toApprovalRecord() {
      this.$router.push({ path: "/ApprovalRecord", query: { id: this.id } });
    },
    toPartnerCityList() {
      this.$router.push({
        path: "/PartnerCityList",
        query: { serviceId: this.accountId }
      });
    }
  },
  mounted() {
    if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '审核中心','' ,'' , '']);//其中灰色的为选填项
      
         }
    this.type = sessionStorage.getItem("accountType");
    this.accountId = sessionStorage.getItem("accountId");
    this.id = sessionStorage.getItem("id");
    console.log("this.type", this.accountId);
    this.getSource();
  }
};
</script>

<style scoped>
.van-cell /deep/ .van-cell__value {
  text-align: right;
  display: block;
}
.van-cell /deep/ .van-cell__title {
  max-width: none;
}
.contenttext {
  color: #999;
  margin: 10px 18px 30px;
  font-size: 12px;
  line-height: 18px;
}

.van-overlay {
  display: none;
}
</style>
