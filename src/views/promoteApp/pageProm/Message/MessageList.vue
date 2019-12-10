<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-swipe-cell
        :right-width="65"
        :on-close="onClose"
        v-for="(item,key) in ddd"
        :key="item.id"
      >
        <van-cell-group>
          <!--<van-cell title="单元格" :value="item" />-->
          <div class="inform-content" @click="todetail(item.id,key)">
            <p class="redback read" v-if="item.isRead==0"></p>
            <p class="inform-title" v-if="type2 == 'message'">{{item.message.title}}</p>
            <p class="inform-title" v-if="type2 == 'notice'">{{item.notice.title}}</p>
            <p class="inform-somecontent" v-if="type2 == 'message'">{{item.message.subTitle}}</p>
            <p class="inform-somecontent" v-if="type2 == 'notice'">{{item.notice.subTitle}}</p>
            <p class="inform-time" v-if="type2 == 'message'">{{item.message.createTime}}</p>
            <p class="inform-time" v-if="type2 == 'notice'">{{item.notice.createTime}}</p>
          </div>
        </van-cell-group>
        <div slot="right" class="deletebtn" @click="closee(item.id,key)">
          <img src="@/assets/img/shanchu.png" />
        </div>
      </van-swipe-cell>
      <div v-if="ddd.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "Message",
  data () {
    return {
      topheader: {
        name: '消息',
        left: '2',//

        heade: 'header1',
        right8: '1',
        message: ''
      },
      value: '',
      type: '', // 省区总合作商推广员推广首页
      type2: '',  //平台公告审核公告
      loading: false, // 分页加载
      kaiguan: true, // 避免多次请求
      finished: false,
      active: 0,
      page: 1,
      pageSize: 10,
      count: 0,   //总共数据
      ddd: [
      ]
    }
  },
  components: {
  },
  methods: {
    tolist () {
      // this.$router.push('/MessageDetail')
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
            this.getlist()

            // 加载状态结束
            this.loading = false
          }
        }, 500)
      } else {
        this.loading = false
        // this.finished = true
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
    closee (msg, key) {
      /*let formdata=new FormData();
      formdata.set("id",msg);*/
      let para = {
        id: msg
      }
      if (this.type == 0 || this.type == '0') {
        this.Api.deleteMessage2(para).then(() => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          // setToken(res.data.phone)
          this.$delete(this.ddd, key)
        })
      } else {
        this.Api.deleteMessage(para).then(() => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          // setToken(res.data.phone)
          this.$delete(this.ddd, key)
        })
      }



    },
    todetail (msg, key) {
      if (this.ddd[key].isRead == 0) {
        this.toread(msg, key)
      }

      this.$router.push({ path: '/MessageDetail', query: { id: msg } })
    },
    toread (msg, key) {
      /*let formdata=new FormData();
      formdata.set("id",msg);*/
      let para = {
        id: msg
      }
      this.Api.readMessage(para).then(() => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        this.ddd[key].isRead = 1
      })
    },
    toreadall () {
      // let formdata=new FormData();
      let para = this.ddd.map(res => {
        if (res.isRead == 1) {
          // para.push(res.id)
          return res.id
        }
      })
      // formdata.set("ids",para);
      let para2 = {
        ids: para
      }
      if (!para.length) {
        this.$toast('没有消息了哦')
      } else {
        if (this.type == 0) {
          this.Api.readMessageAll2(para2).then(res => {
            // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
            // setToken(res.data.phone)
            if (res.data.status === 1) {
              this.$router.go(0)
            }
          })
        } else {
          this.Api.readMessageAll(para2).then(res => {
            // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
            // setToken(res.data.phone)
            if (res.data.status === 1) {
              this.$router.go(0)
            }
          })
        }
      }




    },
    getlist () {
      if (this.kaiguan == true) {
        this.kaiguan = false
        let para = {
          page: {
            pageNo: this.page,
            pageSize: this.pageSize
          }
        }
        if (this.type2 == 'notice') {
          this.topheader.right8 = ''
          if (this.type == 0) {
            this.Api.noticeMessage2(para).then(res => {
              // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
              // setToken(res.data.phone)
              if (res.data.data.list) {
                this.ddd = this.ddd.concat(res.data.data.list)
              }
              this.count = res.data.count
              this.page++
              this.kaiguan = true
            }).catch(() => {
              this.kaiguan = true
            })
          } else {
            this.Api.noticeMessage(para).then(res => {
              // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
              // setToken(res.data.phone)
              if (res.data.data.list) {
                this.ddd = this.ddd.concat(res.data.data.list)
              }
              this.count = res.data.count
              this.page++
              this.kaiguan = true
            }).catch(() => {
              this.kaiguan = true
            })
          }

        } else if (this.type2 == 'message') {
          if (this.type == 0) {
            this.Api.messageMessage2(para).then(res => {
              // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
              // setToken(res.data.phone)
              if (res.data.data.list) {
                this.ddd = this.ddd.concat(res.data.data.list)
              }

              this.count = res.data.data.count
              this.page++
              this.kaiguan = true
            }).catch(() => {
              this.kaiguan = true
            })
          } else {
            this.Api.messageMessage(para).then(res => {
              // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
              // setToken(res.data.phone)
              if (res.data.data.list) {
                this.ddd = this.ddd.concat(res.data.data.list)
              }

              this.count = res.data.data.count
              this.page++
              this.kaiguan = true
            }).catch(() => {
              this.kaiguan = true
            })
          }

        }
      }
    }

  },
  mounted () {
    this.type = sessionStorage.getItem('accountType')
    this.type2 = this.$route.query.type
    this.getlist()
  }
}
</script>

<style scoped>
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
  color: #353535;
  font-size: 14px;
  margin: 16px 0 0 18px;
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
  right: 18px;
  top: 17px;
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
