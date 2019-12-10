<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>

      <van-collapse :value="activeNames">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="种子商户入驻" is-link @click="toWaitReviewList(1)">
          <div class="graycolor">
            <span class="bluecolor">{{ myApprovalJobSeedInCount==0?'':myApprovalJobSeedInCount}}</span>
          </div>
        </van-cell>
        <van-cell title="特色商户入驻" is-link @click="toWaitReviewList(2)">
          <div class="graycolor">
            <span class="bluecolor">{{ myApprovalJobSpecialInCount==0?'':myApprovalJobSpecialInCount}}</span>
          </div>
        </van-cell>
      </van-collapse>
      <van-collapse :value="activeNames" style="margin-top:10px">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="种子商户资料变更" is-link @click="toWaitReviewList(21)">
          <div class="graycolor">
            <span class="bluecolor">{{ myApprovalJobSeedUpdateCount==0?'':myApprovalJobSeedUpdateCount}}</span>
          </div>
        </van-cell>
        <van-cell title="特色商户资料变更" is-link @click="toWaitReviewList(22)">
          <div class="graycolor">
            <span class="bluecolor">{{ myApprovalJobSpecialUpdateCount==0?'':myApprovalJobSpecialUpdateCount}}</span>
          </div>
        </van-cell>
      </van-collapse>
      <van-collapse :value="activeNames" style="margin-top:10px">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="商户老板资料变更" is-link @click="toWaitReviewList(29)">
          <div class="graycolor">
            <span class="bluecolor">{{ myApprovalJobStoreAccountCount==0?'':myApprovalJobStoreAccountCount}}</span>
          </div>
        </van-cell>
      </van-collapse>
       <van-collapse :value="activeNames" style="margin-top:10px">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="修改合同审核" is-link @click="toWaitReviewList(30)">
          <div class="graycolor">
            <span class="bluecolor">{{ myApprovalJobUpdateContractCount==0?'':myApprovalJobUpdateContractCount}}</span>
          </div>
        </van-cell>
      </van-collapse>
      <van-collapse :value="activeNames" style="margin-top:10px">
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell title="审核记录" is-link @click="toApprovalRecord()">
          <div class="graycolor">
            <span class="bluecolor"></span>
          </div>
        </van-cell>
      </van-collapse>
  </div>
</template>

<script>
export default {
  name: "onoff",
  data() {
    return {
      topheader: {
        name: "待我审核",
        left: "3",
        heade: "header1"
      },
      type: "1", // 省区总合作商推广员
      accountId: '',
      activeNames: ["0", "1"],
      wait: {
        onoff: false,
        enter: false,
        changes: false
      },
      //统计
      waitNum: 0,
      myPreShopIngCount: 0,
      myApprovalJobSeedInCount: 0,        // 待我审核的种子商户入驻的数目
      myApprovalJobSeedUpdateCount: 0,    // 待我审核的种子商户更新的数目
      myApprovalJobSpecialInCount: 0,     // 待我审核的特色店的入驻的数目
      myApprovalJobSpecialUpdateCount: 0, // 待我审核的特色店更新的数目
      mySpreadCooInCount: 0,              // 我推广的合作商审核中的数目
      mySpreadCooRefusedCount: 0,         // 我推广的合作商拒绝的数目
      spreadIngCount: 0,                  // 我推广的待审核的推广员的数目
      spreadRefused: 0,                   // 我推广的被拒绝的推广员的数目
      mySpreadShopIngCount: 0,            // 我推广的同城企业审核中的数目
      mySpreadShopRefusedCount: 0,        // 我推广的同城企业拒绝的数目
      updateCooperationCount: 0,          // 合作商资料变更待审核的数目
      updateCooperationRefusedCount: 0,   // 合作商资料变更拒绝的数目
      updateSpreadCount: 0,               // 推广员的资料变更待审核的数目
      updateSpreadRefusedCount: 0,        // 推广员的资料变更拒绝的数目
      myPreShopRefusedCount: 0,
      mySpreadSeedIngCount: 0,            // 我推广的种子商户的审核中数目
      mySpreadSeedRefusedCount: 0,        // 我推广的种子商户的审核的数目
      mySpreadSpecialIngCount: 0,         // 我推广的特色店的待审核的数目
      mySpreadSpecialRefusedCount: 0,     // 我推广的特色店被拒绝的数目
      myApprovalJobStoreAccountCount: 0,  // 待我审核的商户更新的数目
      myApprovalJobUpdateContractCount:0
    };
  },
  components: {
  },
  methods: {
    getSource() {

      this.Api.approvalCount({selectType: 0}).then( res => {
        console.log("审核统计",res.data.data)
        let resData = res.data.data;
        this.waitNum = resData.myApprovalJobSeedInCount + resData.myApprovalJobSeedUpdateCount + resData.myApprovalJobSpecialInCount + resData.myApprovalJobSpecialUpdateCount;
        this.myApprovalJobSeedInCount = resData.myApprovalJobSeedInCount;
        this.myApprovalJobSeedUpdateCount = resData.myApprovalJobSeedUpdateCount;
        this.myApprovalJobSpecialInCount = resData.myApprovalJobSpecialInCount;
        this.myApprovalJobSpecialUpdateCount = resData.myApprovalJobSpecialUpdateCount;
        this.myApprovalJobStoreAccountCount = resData.myApprovalJobStoreAccountCount;
        this.myApprovalJobUpdateContractCount=resData.myApprovalJobUpdateContractCount
      });

      this.Api.approvalCount({selectType: 1}).then( res => {
        console.log("审核统计",res.data.data)
        let resData = res.data.data;
        this.myPreShopIngCount = resData.myPreShopIngCount;
        this.mySpreadCooInCount = resData.mySpreadCooInCount;
        this.mySpreadCooRefusedCount = resData.mySpreadCooRefusedCount;
        this.spreadIngCount = resData.spreadIngCount;
        this.spreadRefused = resData.spreadRefused;
        this.mySpreadShopIngCount = resData.mySpreadShopIngCount;
        this.mySpreadShopRefusedCount = resData.mySpreadShopRefusedCount;
        this.updateCooperationCount = resData.updateCooperationCount;
        this.updateCooperationRefusedCount = resData.updateCooperationRefusedCount;
        this.updateSpreadCount = resData.updateSpreadCount;
        this.updateSpreadRefusedCount = resData.updateSpreadRefusedCount;
        this.myPreShopRefusedCount = resData.myPreShopRefusedCount;
        this.mySpreadSeedIngCount = resData.mySpreadSeedIngCount;
        this.mySpreadSeedRefusedCount = resData.mySpreadSeedRefusedCount;
        this.mySpreadSpecialIngCount = resData.mySpreadSpecialIngCount;
        this.mySpreadSpecialRefusedCount = resData.mySpreadSpecialRefusedCount;
        // this.myApprovalJobUpdateContractCount=resData.myApprovalJobUpdateContractCount
      });


    },
    goback() {
      if (this.wait.onoff) {
        this.wait.onoff = !this.wait.onoff;
        this.topheader.name = "审核中心";
      } else if (this.wait.enter) {
        this.wait.enter = !this.wait.enter;
        this.topheader.name = "审核中心";
      } else if (this.wait.changes) {
        this.wait.changes = !this.wait.changes;
        this.topheader.name = "审核中心";
      } else if (this.steps == 2) {
        this.steps = 1;
        this.topheader.name = "填写资料";
      } else if (this.steps == 3) {
        this.steps = 2;
        this.topheader.name = "上传合同照片";
      } else {
        this.$router.go(-1);
      }
    },
    toWaitReviewList(param) {
      this.$router.push({ path: "/WaitReviewList", query: { serviceType: param} });
    },
    toApprovalRecord() {
      this.$router.push({ path: "/ApprovalRecord", query: { id: this.id}});
    }
  },
  mounted() {
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
.backlcon {
}
.van-overlay {
  display: none;
}
</style>
