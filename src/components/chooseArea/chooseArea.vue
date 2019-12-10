<template>
  <div style="padding: 5px 0 20px;">
    <van-loading v-if="loading" style="margin: 40px auto;"/>
    <template v-else>
      <el-tree
        :data="data2"
        show-checkbox
        default-expand-all
        :expand-on-click-node="false"
        node-key="id"
        ref="tree"
        :empty-text="emptyText"
        highlight-current
        :props="defaultProps"
        v-if="area.chooseno&&($route.query.listli||$route.query.list)"
      ></el-tree>
      <el-tree
        :data="data2"
        default-expand-all
        :expand-on-click-node="false"
        node-key="id"
        ref="tree"
        :empty-text="emptyText"
        highlight-current
        :props="defaultProps"
        v-else
      ></el-tree>
    </template>
    <!-- <footer class="bott"></footer> -->
  </div>
</template>

<script>
export default {
  name: "rightchoose",
  props: {
    area: {
      required: true
    },
    emptyText: {
      type: String,
      default() {
        return '空'
      }
    }
  },
  data() {
    return {
      loading: true,
      result: [], // 多选选项
      listli: [
        {
          id: 0,
          name: "省",
          li: false,
          columns: [], // 在选择器里面的省
          content: "" // 在添加左边的框里的省
        },
        {
          id: 1,
          name: "市",
          li: false,
          columns: [],
          content: ""
        },
        {
          id: 2,
          name: "区",
          li: false,
          columns: [],
          content: [{ text: "" }]
        }
      ],
      newdata: [
        // 添加到中间的选项
      ],
      province: [],
      provinceBe: [], // 已使用的code列表
      city: [],
      region: [],
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    getdutyArea(para2) {
      // 辖区列表
      this.Api.dutyArea(para2, { showFullLoading: "close" })
        .then(res => {
          this.loading = false;
          let area = [];
          res.data.data.map((item, inx) => {
            if (!this.provinceBe[item.sysAreaConfigCode]) {
              item.disabled = false;
            } else {
              item.disabled = true;
            }
            this.formatDutyArea(
              this.data2,
              item,
              [],
              ["province", "city", "region"],
              0
            );
          });
        })
        .then(res => {
          if (this.area.arealist) {
            console.log('arealist')
            this.$refs.tree.setCheckedKeys(this.area.arealist);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getdutyArea0(para2) {
      // 店主辖区列表
      this.Api.dutyArea0(para2, { showFullLoading: "close" })
        .then(res => {
          this.loading = false;
          let area = [];
          res.data.data.map((item, inx) => {
            if (!this.provinceBe[item.sysAreaConfigCode]) {
              item.disabled = false;
            } else {
              item.disabled = true;
            }
            this.formatDutyArea(
              this.data2,
              item,
              [],
              ["province", "city", "region"],
              0
            );
          });
        })
        .then(res => {
          if (this.area.arealist) {
            this.$refs.tree.setCheckedKeys(this.area.arealist);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getdutyAreaBe(para) {
      // 已使用辖区列表
      this.Api.dutyAreaBe(para, { showFullLoading: "close" })
        .then(res => {
          this.loading = false;
          let para2 = {
            merManagerId: sessionStorage.getItem("id")

            // areaLevel:1
          };
          res.data.data.forEach(item => {
            this.provinceBe[item.sysAreaConfigCode] = true;
          });
          // this.provinceBe=res.data.data
          this.getdutyArea(para2);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getdutyAreaBeNo(para) {
      // 已使用辖区列表并且不包括自己
      this.Api.dutyAreaBeNo(para, { showFullLoading: "close" })
        .then(res => {
          this.loading = false;
          let para2 = {
            merManagerId: sessionStorage.getItem("id")

            // areaLevel:1
          };
          res.data.data.forEach(item => {
            this.provinceBe[item.sysAreaConfigCode] = true;
          });
          // this.provinceBe=res.data.data
          this.getdutyArea(para2);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getCheckedKeys() {
      this.newdata = [];
      await this.$refs.tree.getCheckedNodes().map((item, inx) => {
        if (item.id) {
          let o = {
            areaConfig: {
              id: item.id,
              code: item.code
            }
          };
          this.newdata.push(o);
        }
      });
      await this.$emit("callback", this.newdata);
    },
    setCheckedNodes() {
      // this.$refs.tree.setCheckedNodes([{
      //   id: 5,
      //   label: '二级 2-1'
      // }, {
      //   id: 9,
      //   label: '三级 1-1-1'
      // }])
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys(this.area.arealist);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    formatDutyArea(arr, area, inxList, levelArea, level) {
      let hasArea = false;
      let arry = arr;
      for (var j = 0; j < inxList.length; j++) {
        arry = arry[inxList[j]].children;
      }

      for (var i = 0; i < arry.length; i++) {
        if (arry[i].label === area[levelArea[level]]) {
          hasArea = true;
          if (level < levelArea.length - 1) {
            if (!arry[i].children) {
              arry[i].children = [];
            }
            inxList.push(i);
            this.formatDutyArea(arr, area, inxList, levelArea, level + 1);
          }
          break;
        }
      }
      if (!hasArea) {
        if (level == levelArea.length - 1) {
          arry.push({
            label: area[levelArea[level]],
            id: area.areaConfig.id,
            code: area.sysAreaConfigCode,
            disabled: area.disabled
          });
        } else if (level < levelArea.length - 1) {
          arry.push({
            label: area[levelArea[level]],
            children: []
          });
          inxList.push(arry.length - 1);
          this.formatDutyArea(arr, area, inxList, levelArea, level + 1);
        }
      }
    }
  },
  watch: {
    "area.chooseno"(val) {
      //点击change按钮时
      if (this.$route.query.list) {
        //如果在列表进入
        if (
          this.$route.path == "/StoreDetail" ||
          this.$route.path == "/ChangeStore"
        ) {
        } else if (this.$route.path == "/ChangePopularize" && !val) {
          let para = {
            merManagerId: this.$route.query.id
          };
          this.data2 = [];
          this.provinceBe = [];
          this.getdutyArea(para);
        } else if (this.$route.path == "/ChangePopularize" && val) {
          let para = {
            merManagerId: sessionStorage.getItem("id")
          };
          this.data2 = [];
          this.provinceBe = [];
          this.getdutyArea(para);
        } else if (val) {
          let para = {
            id: this.$route.query.id,
            accountType: parseInt(this.$route.query.list)
          };
          this.data2 = [];
          this.provinceBe = [];
          this.getdutyAreaBeNo(para);
        } else {
          let para = {
            merManagerId: this.$route.query.id
          };
          this.data2 = [];
          this.provinceBe = [];
          this.getdutyArea(para);
        }
      }
    }
  },
  mounted() {
    let route = [
      "/BossDetail",
      "/PromotersListDetail",
      "/ChangePopularize",
      "/StoreDetail",
      "/LocalDetail",
      "/ChangeTogether",
      "/ChangeStore",
      "/ChangeLocal",
      "/ApprovalDetail",
      "/AuditDetail",
      "/PromotersDetail",
      "/DataChangesDetail",
      "/PartnerChangesDetail",
      "/PromotersChangesDetail",
      "/ChangeDetail",
      "/StoreaccountDetail"
    ];
    if (
      this.$route.path == "StoreDetail" ||
      this.$route.path == "ChangeStore"
    ) {
      let para = {
        merManagerId: this.$route.query.id
      };
      this.getdutyArea(para);
      return false;
    } else if (
      this.$route.path === "/ApprovalDetail" ||
      this.$route.path === "/PromotersDetail" ||
      this.$route.path === "/AuditDetail" ||
      this.$route.path === "/DataChangesDetail" ||
      this.$route.path === "/PromotersChangesDetail"||
      this.$route.path === "/ChangeDetail"
    ) {
      let para = {
        merManagerId: this.$route.query.serviceId
      };
      this.getdutyArea(para);
      return false;
    } else if (
      this.$route.path === "/StoreaccountDetail"
    ) {
      let para = {
        id: this.$route.query.serviceId
      };
      this.getdutyArea0(para);
      return false;
    } else if (
      this.$route.path === "/PartnerChangesDetail"
    ) {
      let para = {
        merManagerId: this.$route.query.serviceId
      };
      this.getdutyArea(para);
      return false;
    } else if (
      this.$route.path == "/PopularizeDetail" ||
      (this.$route.path == "/ChangePopularize" && !this.area.chooseno)
    ) {
      let para = {
        merManagerId: this.$route.query.id
      };
      this.getdutyArea(para);
      return false;
    } else if (this.$route.path == "/ChangePopularize" && this.area.chooseno) {
      let para = {
        merManagerId: sessionStorage.getItem("id")
      };
      this.getdutyArea(para);
      return false;
    } else if (
      route.some(item => {
        return item == this.$route.path;
      }) &&
      this.area.chooseno &&
      this.$route.query.list
    ) {
      let para = {
        id: this.$route.query.id,
        accountType: parseInt(this.$route.query.list)
      };
      this.getdutyAreaBeNo(para);
      return false;
    } else if (
      route.some(item => {
        return item == this.$route.path;
      }) &&
      this.area.chooseno &&
      !this.$route.query.list
    ) {
      let para = {
        merManagerId: this.$route.query.id
      };
      this.getdutyArea(para);
      return false;
    } else if (
      route.some(item => {
        return item == this.$route.path;
      }) &&
      !this.area.chooseno
    ) {
      let para = {
        merManagerId: this.$route.query.id
      };
      this.getdutyArea(para);
      return false;
    } else if (
      this.$route.path === "/ChangeMaster" ||
      this.$route.path === "/MasterDetail"
    ) {
      let para = {
        id: this.$route.query.id
      };
      this.getdutyArea0(para);
      return false;
    } else if (
      this.$route.path === "/ShopChangeDetail" ||
      this.$route.path === "/ChangeMasterDetail"
    ) {
      let para = {
        id: this.$route.query.serviceId
      };
      this.getdutyArea0(para);
      return false;
    } else {
      let para = {
        accountType: parseInt(this.$route.query.list)
      };
      this.getdutyAreaBe(para);
    }
  }
};
</script>

<style  scoped>
.van-button--small {
  background: none;
  color: #009afc;
  border: none;
}
.van-popup.van-popup--right {
}
.rightmap {
  width: 100vw;
  height: 100vh;
  /*position:fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  background: #fff;
}
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

.rightcontent {
  width: 100%;
  display: flex;
  position: absolute;
  top: 100px;
  justify-content: space-around;
}
.righbtn {
  width: 50px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #000;
}
.isaddcode {
  position: absolute;
  left: 30px;
  top: 300px;
}
.el-tree__empty-text {
  display: none !important;
}
</style>
