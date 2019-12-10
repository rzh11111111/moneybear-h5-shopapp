<template>
  <div class="app-init">
    <top-column
      :top-header="topheader"
      @clickcallback="clicks"
      ref="topdata"
      @search="searchgetList"
    ></top-column>
    <div>
      <van-tabs v-model="active" swipeable color="#0095FD" @click="clicktabs">
        <van-tab title="审核中"></van-tab>

        <van-tab title="审核拒绝"></van-tab>

        <van-tab title="审核通过"></van-tab>
      </van-tabs>
      <!-- <nav class="list-top">
        <ul class="list-ul">
          <li
            class="list-li"
            @click="value.li=!value.li"
            v-for="value in listli"
            :key="value.id"
            v-if="value.onoff"
          >
            <p v-show="!value.content">{{value.name}}</p>
            <p class="bluecolor" v-show="value.content">{{value.name}}</p>
            <div>
                    <img src="@assets/img/listunselected.png" v-show="!value.content">
                    <img src="@assets/img/listselected.png" v-show="value.content">
                    </div>
          </li>
        </ul>
      </nav>-->
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="create"
    >
      <div class="list" v-for="item in local" :key="item.id" @click="todetail(item)">
        <header class="listtitle">
          <p>{{item.createTime}}</p>
        </header>
        <div class="main">
          <h3 class="list-title">{{item.name}}</h3>
          <p class="listright bluecolor" v-if="item.delFlag==0">审核通过</p>
          <p class="listright greencolor" v-if="item.delFlag==2">审核中</p>
          <p class="listright redcolor" v-if="item.delFlag==3">审核拒绝</p>
          <div class="listaside">
            <img src="@assets/img/rightlcon.png" />
          </div>
        </div>
      </div>
      <div v-if="local.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
    </van-list>
    <div v-else>
      <div style="text-align:center;padding: 20px;">
        <p style="margin-bottom:10px;">请检查网络，或重新刷新页面！</p>
        <el-button type="success" round @click="refresh">刷新</el-button>
      </div>
    </div>
    <!-- <van-popup v-model="listli[0].li" position="bottom">
      <van-area
        :area-list="listli[0].columns"
        @confirm="onConfirm0"
        @cancel="listli[0].li=!listli[0].li"
        title="选择"
      />
    </van-popup>-->
    <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
  </div>
</template>

<script>
import startEndTime from "@/components/startEndTime/startEndTime";
import { format, getAllAreas } from "@/utils";
export default {
  name: "FirstLocalList",
  data () {
    return {
      topheader: {
        name: "变更记录",
        left: "2",
        right1: "1",
        // right2: "1",
        heade: "header1",
        key: ""
      },
      startendtime1: {
        title: "",
        type: "date",
        onoff: false,
        starttime: "",
        endtime: ""
      },
      auditType: 1,
      type: "", // 谁登陆的
      id: "", // 谁登陆的
      code: "", // 谁登陆的
      loading: false, // 分页加载
      kaiguan: true, // 避免多次请求
      finished: false,
      page: 1,
      active: 0,
      pageSize: 10,
      areaIds: "",
      local: [],
      count: 0,
      create: true,
      delFlag: [2, 3, 0],
      listli: [
        {
          id: 0,
          name: "地区",
          li: false,
          onoff: true,
          columns: {
            province_list: {
              "100000": "全部"
            },
            city_list: {
              "100000": "全部"
            },
            county_list: {
              "100000": "全部"
            }
          },
          content: ""
        }
      ],
      listlis1: {}
    };
  },
  components: {
    startEndTime
  },
  methods: {
    refresh () {
      this.$router.go(0);
    },
    clicktabs (msg) {
      console.log("666", msg)
      this.page = 1;
      this.local = [];
      this.finished = false;
      this.kaiguan = true;
      this.getList(this.active);
    },
    todetail (item) {
      this.approvalContent = JSON.parse(item.approvalContent);
      let itemId = this.approvalContent.id;
      this.$router.push({
        path: "/ChangeDetail",
        query: { id: item.id, serviceId: itemId }
      });
    },
    clicks () {
      this.startendtime1.onoff = !this.startendtime1.onoff;
    },
    times (msg) {
      // 时间插件的事件
      if (msg.oldtime) {
        console.log("确定");
        this.startendtime1.starttime = format(msg.olddate, "yyyy-MM-dd hh:mm:ss");
        this.startendtime1.endtime = format(msg.newdate, "yyyy-MM-dd hh:mm:ss");
        this.page = 1;
        this.store = [];
        this.together = [];
        this.local = [];
        this.loading = false;
        this.kaiguan = true;
        this.finished = false;
        this.getList(this.active);
      } else {
        console.log("取消");
        this.startendtime1.starttime = "";
        this.startendtime1.endtime = "";
        this.page = 1;
        this.store = [];
        this.together = [];
        this.local = [];
        this.loading = false;
        this.kaiguan = true;
        this.finished = false;
        this.getList(this.active);
      }
      this.startendtime1.onoff = msg.onoff;
    },
    searchgetList () {
      this.page = 1;
      this.local = [];
      this.loading = false;
      this.kaiguan = true;
      this.finished = false;
      this.getList(this.active);
    },
    search () {
      this.topheader = {
        search: true
      };
    },
    notsearch () {
      this.topheader = {
        left: "2",
        heade: "header1"
      };
      this.page = 1;
      this.local = [];
      this.topheader.name = "预推广的同城企业列表";
      this.topheader.right1 = "1";
      this.topheader.right2 = "2";
      this.getList(this.active);
    },
    onConfirm0 (picker, values) {
      this.listli[0].content = picker;
      this.listli[0].li = !this.listli[0].li;
      console.log(picker, values);
      this.page = 1;
      this.local = [];
      this.getList(this.active);
    },
    onLoad () {
      console.log(this.page);
      // 异步更新数据
      if (this.kaiguan == true) {
        this.finished = false;
        setTimeout(() => {
          this.loading = false;
          this.getList(this.active)
          if (this.local && this.local.length) {
            if (this.local.length >= this.count) {
              this.finished = true;
            }
          }
        }, 500);
      } else {
        this.loading = false;
      }
    },

    getList (parms) {
      if (this.code == '') {
        this.create = false;
        return false
      }
      let id = '';
      if (parms == null) {
        parms = 0;
      }
      if (this.$route.query.accountType == 1) {
        this.auditType = 28;
      } else if (this.$route.query.accountType == 2) {
        this.auditType = 27;
      } else {
        this.auditType = '';
        id = this.id;
      }
      if (this.kaiguan == true) {
        this.kaiguan = false;
        let para = {
          serviceId: id,
          createBy: this.code,
          serviceType: this.auditType,
          delFlag: this.delFlag[parms],
          startTime: this.startendtime1.starttime,
          endTime: this.startendtime1.endtime,
          pageNo: this.page,
          pageSize: this.pageSize,
          searchParameter: {
            keyWord: this.$refs.topdata.key
          },
          province:
            this.listli[0].content == "" ||
              this.listli[0].content[0].name == "全部"
              ? ''
              : this.listli[0].content[0].name,
          city:
            this.listli[0].content == "" ||
              this.listli[0].content[1].name == "全部"
              ? ""
              : this.listli[0].content[1].name,
          region:
            this.listli[0].content == "" ||
              this.listli[0].content[2].name == "全部"
              ? ""
              : this.listli[0].content[2].name
        };
        // if(this.type==3){
        //     para.merManagerId=sessionStorage.getItem('id')
        // }else{
        //     para.serviceId=sessionStorage.getItem('id')
        // }
        this.Api.getApprovalContent(para)
          .then(res => {
            if (this.local.length >= res.data.data.count) {
              this.kaiguan = true
              return
            }
            if (res.data.data.list) {
              res.data.data.list.map(value => {
                // // console.loglog(this.store, this.store.length, value)
                this.$set(this.local, this.local.length, value)
              })
            }
            this.count = res.data.data.count
            this.page++
            this.kaiguan = true
          })
          .catch(() => {
            this.kaiguan = true
          });
      }
    },
    getdutyArea () {
      // 辖区列表
      let para = {
        merManagerId: this.$route.query.merManager
          ? this.$route.query.merManager
          : sessionStorage.getItem("id") //如果从详情进入辖区就用传过来的id

        // areaLevel:2
      };
      this.Api.dutyArea(para)
        .then(res => {
          if (res.data.data) {
            res.data.data.map(value => {
              if (this.areaIds == "") {
                // 仓超要的格式
                this.areaIds = value.areaConfig.id;
              } else {
                this.areaIds += "," + value.areaConfig.id;
              }
              console.log(value.areaConfig);
              let province = value.sysAreaConfigCode
                .substring(0, 2)
                .concat("0000");
              let city = value.sysAreaConfigCode.substring(0, 4).concat("00");

              this.$set(
                this.listli[0].columns.province_list,
                province,
                value.province
              ); // vant地区插件用的格式
              this.$set(this.listli[0].columns.city_list, city, value.city);
              this.$set(this.listli[0].columns.city_list, province, "全部");
              this.$set(this.listli[0].columns.county_list, province, "全部");
              this.$set(
                this.listli[0].columns.county_list,
                value.sysAreaConfigCode,
                value.region
              );
              this.$set(this.listli[0].columns.county_list, city, "全部");
            });
          } else {
            return false;
          }
        })
        .then(() => {
          console.log("zhengchang");
          this.loading = false;
          this.kaiguan = true;
          this.finished = false;

          this.getList();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAllArea () {

      this.Api.allArea({}).then(res => {
        if (res.data.data) {

          this.listli[0].columns = getAllAreas(res.data.data)
        } else {
          return false
        }
      })

    }
  },
  mounted () {
    this.type = sessionStorage.getItem("accountType");
    this.id = sessionStorage.getItem("id");
    this.code = sessionStorage.getItem("code");
    this.getdutyArea();
    this.getAllArea();
  }
};
</script>

<style scoped>
.list-top {
  /*background: #fff;*/
  height: 30px;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.09);
  position: relative;
  /*margin-bottom: 10px;*/
}
.list-top /deep/ .list-ul {
  display: flex;
}
.list-li {
  width: 25%;
  display: flex;
  color: #666;
  justify-content: center;
  font-size: 12px;
  line-height: 30px;
}
.list-li /deep/ img {
  width: 8px;
  height: 4px;
  margin-top: 13px;
  margin-left: 5px;
}
.list {
  width: 100%;
  height: 126px;
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
  left: 16px;
  top: 16px;
}

.listtitle /deep/ p {
  height: 16px;
  font-weight: 300;
  border-radius: 2px;
  padding: 0 3px;
  margin-bottom: 14px;
  color: #a6a6a6;
  opacity: 0.9;
  font-size: 12px;
  line-height: 10px;
}

.listcontent {
  font-size: 12px;
  color: #999;
  position: absolute;
  left: 6px;
  top: 74px;
  display: flex;
}
.listcontent /deep/ li {
  width: 105px;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.listcontent /deep/ img {
  width: 14px;
  height: 14px;
  transform: translate(0, +10%);
  margin-right: 2px;
}
.listright {
  position: absolute;
  right: 18px;
  top: 16px;
  font-size: 12px;
}
.listaside {
  width: 12px;
  height: 12px;
  color: #cbcbcb;
  position: absolute;
  right: 19px;
  top: 57px;
}
.listaside /deep/ img {
  width: 100%;
}
.list-title {
  margin: 0 19px;
}
.main {
  margin-top: 50px;
}
</style>
