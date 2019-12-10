<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <van-collapse :value="activeNames">
      <div slot="icon" class="vant-collapse-icon"></div>
      <van-cell title="我添加的合作商" is-link @click="toApprovalList">
        <div class="graycolor">
          <span class="bluecolor">{{mySpreadCooInCount}}</span>待审核
          <span class="redcolor">{{mySpreadCooRefusedCount}}</span>拒绝
        </div>
      </van-cell>
      <van-cell title="我添加的推广员" is-link @click="toAuditList(8)">
        <div class="graycolor">
          <span class="bluecolor">{{spreadIngCount}}</span>待审核
          <span class="redcolor">{{spreadRefused}}</span>拒绝
        </div>
      </van-cell>
    </van-collapse>
    <van-collapse :value="activeNames" style="margin-top:10px">
      <div slot="icon" class="vant-collapse-icon"></div>
      <van-cell title="我推广的同城企业" is-link @click="toAuditList(5)">
        <div class="graycolor">
          <span class="bluecolor">{{mySpreadShopIngCount}}</span>待审核
          <span class="redcolor">{{mySpreadShopRefusedCount}}</span>拒绝
        </div>
      </van-cell>
    </van-collapse>
  </div>
</template>

<script>
export default {
  name: "enter",
  data() {
    return {
      topheader: {
        name: "入驻审核",
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
      myApprovalJobSpecialInCount: 0, // 待我审核的特色店的入驻的数目
      myApprovalJobSpecialUpdateCount: 0, // 待我审核的特色店更新的数目
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
      mySpreadSpecialRefusedCount: 0 // 我推广的特色店被拒绝的数目
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
          resData.myApprovalJobSeedInCount +
          resData.myApprovalJobSeedUpdateCount +
          resData.myApprovalJobSpecialInCount +
          resData.myApprovalJobSpecialUpdateCount;
        this.myApprovalJobSeedInCount = resData.myApprovalJobSeedInCount;
        this.myApprovalJobSeedUpdateCount =
          resData.myApprovalJobSeedUpdateCount;
        this.myApprovalJobSpecialInCount = resData.myApprovalJobSpecialInCount;
        this.myApprovalJobSpecialUpdateCount =
          resData.myApprovalJobSpecialUpdateCount;
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
    toApprovalList() {
      this.$router.push("/ApprovalList");
    },
    toAuditList(param) {
      this.$router.push({
        path: "/AuditList",
        query: { serviceType: param, loginPeopleId: this.accountId }
      });
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
