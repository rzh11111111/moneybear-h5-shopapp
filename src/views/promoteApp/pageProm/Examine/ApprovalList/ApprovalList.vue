<template>
  <div class="app-init">
    <top-column :top-header="topheader"  ref="topdata"   @clickcallback="clicks" @search="searchgetList"></top-column>
    <div>
      <van-tabs v-model="active" swipeable color="#0095FD" @click="clicktabs">

          <van-tab title="审核中"></van-tab>
          <van-tab title="审核拒绝"></van-tab>
          <van-tab title="审核通过"></van-tab>


      </van-tabs>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" v-if="create">
      <div class="list" v-for="item in local" :key="item.id" @click="todetail(item)">
        <header class="listtitle">
          <p>{{item.createTime}}</p>
        </header>
        <div class="main">
          <h3 class="list-title">{{item.name}}</h3>
          <p class="listright bluecolor" v-if="item.delFlag==0">审核通过</p>
          <p class="listright greencolor" v-if="item.delFlag==2">审核中</p>
          <p class="listright redcolor" v-if="item.delFlag==3">审核拒绝</p>
          <div  class="listaside">
            <img src="@assets/img/rightlcon.png"/>
          </div>
        </div>
      </div>
      <div v-show="local.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
    </van-list>
    <div v-else>
      <div style="text-align:center;padding: 20px;">
        <p style="margin-bottom:10px;">请检查网络，或重新刷新页面！</p>
        <el-button type="success" round @click="refresh">刷新</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import startEndTime from "@/components/startEndTime/startEndTime";
import { format } from "@/utils";
export default {
  name: "FirstLocalList",
  data() {
    return {
      topheader: {
        name: "合作商账号审核列表",
        left: "2",
        heade: "header1",
        key: ""
      },
      type: "", // 谁登陆的
      id: "", // 谁登陆的
      code: "", // 谁登陆的
      loading: false, // 分页加载
      kaiguan: true, // 避免多次请求
      finished: false,
      active: 0,
      page: 1,
      pageSize: 10,
      count:0,
      areaIds: "",
      local: [],
      create: true,
      delFlag: [2, 3, 0]
    };
  },
  components: {
    startEndTime
  },
  methods: {
    refresh(){
      this.$router.go(0);
    },
    todetail(item) {
      this.$router.push({
        path: "/ApprovalDetail",
        query: { id: item.id, serviceId: item.serviceId }
      });
    },
    clicks(msg) {
      this.startendtime1.onoff = !this.startendtime1.onoff;
    },
    searchgetList() {
      this.page = 1;
      this.local = [];
      this.loading=false
      this.kaiguan=true
      this.finished=false
      this.getList(this.active);
    },
    search() {
      this.topheader = {
        search: true
      };
    },
    notsearch() {
      this.topheader = {
        left: "2",
        heade: "header1"
      };
      this.page = 1;
      this.local = [];
      this.loading=false
      this.kaiguan=true
      this.finished=false
      this.topheader.name = "合作商账号审核列表";
      this.getList(this.active);
    },
    onConfirm0(picker, values) {
      console.log(picker, values);
      this.page = 1;
      this.local = [];
      this.loading=false
      this.kaiguan=true
      this.finished=false
      this.getList(this.active);
    },
    onLoad() {
      console.log(this.page);
      // 异步更新数据
      if (this.kaiguan == true) {
        this.finished = false;
        setTimeout(() => {
          this.loading = false;
          this.getList(this.active)
          if(this.local&&this.local.length) {
            if (this.local.length >= this.count) {
              this.finished = true;
            }
          }
        }, 500);
      } else {
        this.loading = false;
      }
    },

    getList(parms) {
      if(this.code==''){
        this.create = false;
        return false
      }
      if (parms == null) {
        parms = 0;
      }
      if (this.kaiguan == true) {
        this.kaiguan = false;
        let para = {
					createBy: this.code,
          serviceType: 7,
          delFlag: this.delFlag[parms],
          // startTime: this.startendtime1.starttime,
          // endTime: this.startendtime1.endtime,
          pageNo: this.page,
          pageSize: this.pageSize,
          searchParameter:{
            keyWord: this.$refs.topdata.key
          },
        };
        this.Api.getApprovalContent(para)
          .then(res => {
            if (this.local.length >= res.data.data.count) {
              this.kaiguan = true
              return
            }
            res.data.data.list.map(value => {
              // // console.loglog(this.store, this.store.length, value)
              this.$set(this.local, this.local.length, value)
            })
            this.count=res.data.data.count
            this.page++
            this.kaiguan = true
          })
          .catch(error => {
            this.kaiguan = true
            console.log(error);
          });
      }
    },
    clicktabs() {
      this.page = 1;
      this.local = [];
      this.finished = false;
      this.kaiguan = true;
      this.getList(this.active);
    }
  },
  mounted() {
    this.type = sessionStorage.getItem("accountType");
    this.id = sessionStorage.getItem("id");
    this.code = sessionStorage.getItem("code");
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
.listaside /deep/ img{
  width: 100%;
}
.list-title {
  margin: 0 19px;
}
.main {
  margin-top: 50px;
}
</style>
