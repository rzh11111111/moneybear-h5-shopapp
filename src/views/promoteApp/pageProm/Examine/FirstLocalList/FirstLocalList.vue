<template>
  <div class="app-init">
    <top-column :top-header="topheader" ref="topdata" @clickcallback="clicks" @search="initialize"></top-column>
    <div>
      <van-tabs v-model="active" swipeable color="#0095FD" @click="initialize">
          <van-tab title="待处理"></van-tab>
          <van-tab title="已录入资料"></van-tab>
          <van-tab title="已拒绝"></van-tab>

      </van-tabs>
      <nav class="list-top">
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
      </nav>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="list" v-for="item in local" :key="item.id" @click="todetail(item)">
        <div class="listtitle">
          <p>{{item.updateTime}}</p>
          <b>{{item.name}}</b>
        </div>
        <ul class="listcontent">
          <li>
            <div>
              <img src="@assets/img/detail/position.png">
            </div>
            <span
              style="overflow: hidden;text-overflow: ellipsis"
            >{{item.province}}{{item.city}}{{item.region}}</span>
          </li>
          <li>
            <div>
              <img src="@assets/img/detail/people.png">
            </div>
            <span
              v-if="item.serviceType==1"
              style="overflow: hidden;text-overflow: ellipsis"
            >省区总 {{item.serviceUsername}}</span>
            <span
              v-if="item.serviceType==2"
              style="overflow: hidden;text-overflow: ellipsis"
            >合作商 {{item.serviceUsername}}</span>
            <span
              v-if="item.serviceType==3"
              style="overflow: hidden;text-overflow: ellipsis"
            >推广员 {{item.serviceUsername}}</span>
            <span
              v-if="item.serviceType==4||item.serviceType==5"
              style="overflow: hidden;text-overflow: ellipsis"
            >店老板 {{item.serviceUsername}}</span>
          </li>
        </ul>
        <p class="listbottom bluecolor" v-if="item.status==1">待处理</p>
        <p class="listbottom greencolor" v-if="item.status==2">已录入资料</p>
        <p class="listbottom redcolor" v-if="item.status==3">已拒绝</p>
        <div class="listaside">
          <img src="@assets/img/rightlcon.png">
        </div>
      </div>
      <div v-if="local.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
    </van-list>
    <div class="所有的弹出">
      <van-popup v-model="listli[0].li" position="bottom">
        <van-area
          :area-list="listli[0].columns"
          cancel-button-text="重置"
          @cancel="onConfirm00"
          @confirm="onConfirm0"
          title="选择"
        />
      </van-popup>

      <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
    </div>
  </div>
</template>

<script>
import startEndTime from "@/components/startEndTime/startEndTime";
import { format,getAllAreas } from "@/utils";
export default {
  name: "FirstLocalList",
  data() {
    return {
      topheader: {
        name: "预推广的同城企业列表",
        left: "2",
        right1: "1",
        right2: "1",
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
      type: "", // 谁登陆的
      loading: false, // 分页加载
      kaiguan: true, // 避免多次请求
      finished: false,
      active: 0,
      page: 1,
      count:0,
      pageSize: 10,
      areaIds: "",
      local: [],
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
    todetail(item) {
      this.$router.push({
        path: "/FirstLocalDetail",
        query: { id: item.id, type: this.type }
      });
    },
    clicks(msg) {
      this.startendtime1.onoff = !this.startendtime1.onoff;
    },
    times(msg) {
      // 时间插件的事件
      if (msg.oldtime) {
        console.log("确定");
        this.startendtime1.starttime = format(msg.olddate, "yyyy-MM-dd hh:mm:ss");
        this.startendtime1.endtime = format(msg.newdate, "yyyy-MM-dd hh:mm:ss");
       this.initialize()
      } else {
        console.log("取消");
        this.startendtime1.starttime = "";
        this.startendtime1.endtime = "";
        this.initialize()
      }
      this.startendtime1.onoff = msg.onoff;
    },

    onConfirm0(picker, values) {
      this.listli[0].content = picker;
      this.listli[0].li = !this.listli[0].li;
      this.initialize()
    },
    onConfirm00(picker, values) {
      this.listli[0].content = "";
      this.listli[0].li = !this.listli[0].li;
      this.initialize();
    },
    initialize() {
      //初始化
      this.page = 1;
      this.store = [];
      this.together = [];
      this.local = [];
      this.loading = false;
      this.kaiguan = true;
      this.finished = false;
      this.getList(this.active);
    },
    onLoad() {
      // console.log(this.page);
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

    getList(area) {
      //
      if (this.kaiguan == true) {
        this.kaiguan = false;
        let para = {
          searchParameter: {
            keyWord: this.$refs.topdata.key,
            starTime: this.startendtime1.starttime,
            endTime: this.startendtime1.endtime
          },
          pageNo: this.page,
          pageSize: this.pageSize,
          status: this.active + 1,
          province:
            this.listli[0].content == "" ||
            this.listli[0].content[0].name == "全部"
              ? ""
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
        this.Api.localList2(para).then(res => {
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
        }).catch(ress=>{
          this.kaiguan = true
        });
        // .catch(error => {
        //   console.log(error);
        // });
      }
    },

    getdutyArea() {
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
              // console.log(value.areaConfig);
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
        .then(res => {
          // console.log("zhengchang");
          this.loading = false;
          this.kaiguan = true;
          this.finished = false;

          this.getList(this.active);
        });
      // .catch(error => {
      //   console.log(error);
      // });
    },
    getAllArea() {
     
      this.Api.allArea({}).then(res => {
        if (res.data.data) {
          
          this.listli[0].columns = getAllAreas(res.data.data)
        } else {
          return false
        }
      })


  }
  },
  mounted() {
    this.type = sessionStorage.getItem("accountType");
    this.getdutyArea();
    this.getAllArea();
  }
};
</script>

<style scoped lang="scss" type="text/scss">
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

.list-li /deep/ div {
  width: 8px;
  height: 4px;
  margin-top: 13px;
  margin-left: 5px;
  img {
    width: 100%;
    height: 100%;
  }
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.listtitle /deep/ b {
  display: block;
}

.listtitle /deep/ p {
  height: 16px;
  font-weight: 300;
  border-radius: 2px;
  padding: 0 3px;
  margin-bottom: 14px;
  color: #a6a6a6;
  opacity: 0.9;
  font-size: 10px;
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
/*.listcontent /deep/ li {
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
}*/
.listbottom {
  position: absolute;
  left: 18px;
  top: 98px;
  font-size: 12px;
}
.listaside {
  width: 12px;
  height: 12px;
  color: #cbcbcb;
  position: absolute;
  right: 19px;
  top: 57px;
  img {
    width: 100%;
  }
}
</style>
