<template>
  <div class="app-init">
    <top-column :top-header="topheader" ref="topdata" @search="initialize"></top-column>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!--<van-swipe-cell :right-width="65"  :on-close="onClose" v-for="(item,key) in store" :key="store.id">-->
      <van-swipe-cell v-for="(item,key) in store" :key="item.id">
        <van-cell-group>
          <!--<van-cell title="单元格" :value="item" />-->
          <div class="inform-content">
            <!--<p class="redback read"></p>-->
            <div class="inform-title">
              <p>{{item.title}}</p>

              <span v-if="item.serviceType==5">同城企业</span>
              <span v-if="item.serviceType==4">合作商</span>
              <span v-if="item.serviceType==3">推广员</span>
              <span v-if="item.serviceType==2">特色店铺</span>
              <span v-if="item.serviceType==1">种子店铺</span>
            </div>
            <p class="inform-somecontent">{{item.updateTime}}</p>

            <div class="inform-time">
              <!--<img src="@/assets/img/rightlcon.png"/>-->
              <div class="inform-time-left" @click="closee(item.id,key)">
                <div class="inform-time-img">
                  <img src="@/assets/img/delete.png" />
                </div>
                <p style="color: #FF3232;font-size: 10px;">删除</p>
              </div>
              <div class="inform-time-right" @click="todetail(item.id,item.serviceType,key)">
                <div class="inform-time-img">
                  <img src="@/assets/img/change.png" />
                </div>
                <p style="color:#0095FD;font-size: 10px;">编辑</p>
              </div>
            </div>
          </div>
        </van-cell-group>
        <!--<div slot="right" class="deletebtn" @click="closee(item.id,key)"><img src="@/assets/img/shanchu.png"></div>-->
      </van-swipe-cell>
      <div v-if="store.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "Draft",
  data () {
    return {
      topheader: {
        name: '草稿箱',
        left: '2',
        heade: 'header1',
        right2: true
      },
      loading: false, // 分页加载
      kaiguan: true, // 避免多次请求
      finished: false,
      isLoading: false, //下拉刷新
      active: 0,
      page: 1,
      pageSize: 10,
      type: '',
      count: '',   //总共数据
      store: [],
      ddd: [
        {
          id: 1,
          aaa: 'aaa',
          bbb: 'bbb',
          ccc: 'ccc'
        },
        {
          id: 2,
          aaa: 'aaa',
          bbb: 'bbb',
          ccc: 'ccc'
        }
      ]
    }
  },
  components: {
  },
  methods: {
    onRefresh () {
      setTimeout(() => {

        this.isLoading = false;
        this.initialize()
        this.$toast("刷新成功");
      }, 500);
    },
    onLoad () {
      // 异步更新数据
      if (this.kaiguan == true) {
        this.finished = false
        setTimeout(() => {
          if (this.page * this.pageSize >= (this.count + this.pageSize)) {
            this.finished = true
            this.loading = false
          } else {
            this.getList()

            // 加载状态结束
            this.loading = false
          }
        }, 500)
      } else {
        this.loading = false
      }
    },
    initialize () {  //初始化
      this.page = 1
      this.store = []
      this.loading = false
      this.kaiguan = true
      this.finished = false
      this.getList()
    },
    search () {
      this.topheader = {
        search: true
      }
    },
    notsearch () {
      this.topheader = {
        left: '2',
        heade: 'header1'
      }

      this.topheader.name = '草稿箱'
      this.topheader.right2 = '2'
      this.initialize()

    },
    getList () {
      if (this.kaiguan == true) {
        this.kaiguan = false
        let datejson2 = {
          page: {
            pageNo: this.page,
            pageSize: this.pageSize
          },
          searchParameter: {
            keyWord: this.$refs.topdata.key
          }
        }
        this.Api.listDraft(datejson2).then(res => {
          if (res.data.data.list) {
            this.store = this.store.concat(res.data.data.list)

          }
          // console.log(res)
          this.count = res.data.data.count
          this.page++
          this.kaiguan = true
        }).catch(() => {
          this.kaiguan = true
        })

      }
    },

    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
          instance.close();
          break;
        case 'outside':
          instance.close();
          break;
        case 'right':
          instance.close();
          break;
      }
    },

    todetail (msg, serviceType, key) {
      console.log(msg, key)
      let push = {
        '1': '/AddSeed',
        '2': '/AddSeed',
        '3': '/AddPopularize',
        '4': '/AddTogether',
        '5': '/AddLocal',
      }
      // if(serviceType==1){
      //     this.$router.push({path:push[serviceType], query: {list:4}})
      // }else if(serviceType==2){
      //     this.$router.push({path:push[serviceType], query: {list:5}})
      // }else if()
      switch (serviceType) {
        case 1:
          this.$router.push({ path: push[serviceType], query: { list: 4, draft: msg } })
          break
        case 2:
          this.$router.push({ path: push[serviceType], query: { list: 5, draft: msg } })
          break
        case 3:
          this.$router.push({ path: push[serviceType], query: { list: 3, draft: msg } })
          break
        case 4:
          this.$router.push({ path: push[serviceType], query: { list: 2, draft: msg } })
          break
        case 5:
          this.$router.push({ path: push[serviceType], query: { list: 6, draft: msg } })
          break
        default:
          break

      }

    },
    closee (msg) {
      this.$dialog.confirm({
        title: '',
        message: '确定删除该草稿吗',
        confirmButtonText: '确定删除',
        cancelButtonText: '取消'
      }).then(() => {
        let para = {
          id: msg
        }
        this.Api.deleteDraft(para).then(res => {

          console.log(res)
          if (res.data.status == 1) {
            this.initialize()
          } else {
            this.$toast('删除失败')
          }
        })
      }).catch(() => {

      })



    },
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.message-content {
  width: 100%;
  height: 64px;
  background: #ffffff;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
}
.content-left {
  width: 40px;
  height: 40px;
  margin: 12px 9px 12px 18px;
}
.content-left /deep/ img {
  width: 100%;
  height: 100%;
}
.content-center {
  font-size: 16px;
  line-height: 64px;
  font-weight: 800;
}
.content-right {
  position: absolute;
  right: 20px;
}
.tishi {
  position: absolute;
  right: 50px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  /*transform: translateY(-50%);*/
}

.inform-content {
  width: 100%;
  height: 73px;
  background: #ffffff;
  margin-top: 10px;
  border: 1px solid #ffffff;
  position: relative;
}
.inform-title {
  color: #333333;
  font-weight: 600;
  font-size: 16px;
  margin: 16px 0 0 18px;
  display: flex;
  p {
    max-width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  span {
    display: inline-block;

    height: 20px;
    font-weight: 200;
    border-radius: 2px;
    padding: 0 5px;
    border: 0.5px solid #0095fd;
    color: #0095fd;
    opacity: 0.9;
    font-size: 12px;
    line-height: 20px;
    /*字体最小12，用scale缩小*/
    transform: scale(0.8);
    text-align: center;
    margin-left: 5px;
  }
}
.inform-somecontent {
  color: #666666;
  font-size: 12px;
  margin: 14px 18px 0 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.inform-time {
  color: #b0b0b0;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0;
  width: 104px;
  height: 73px;
  display: flex;
  .inform-time-left {
    width: 44px;
    height: 100%;
    border-top: 1px solid #ffffff;
    text-align: center;
    .inform-time-img {
      width: 20px;
      height: 24px;
      margin: 12px 12px 10px 12px;
    }
  }
  .inform-time-right {
    width: 60px;
    height: 100%;
    border-top: 1px solid #ffffff;
    text-align: center;
    .inform-time-img {
      width: 24px;
      height: 24px;
      margin: 12px 16px 10px 16px;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.deletebtn {
  display: inline-block;
  width: 65px !important;
  height: 100%;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background: rgba(217, 217, 217, 1);
}
.deletebtn /deep/ img {
  margin-top: 50%;
  transform: translateY(-50%);
}
.read {
  position: absolute;
  left: 5px;
  top: 20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
