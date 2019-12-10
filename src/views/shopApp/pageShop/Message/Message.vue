<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="message-content" @click="tolist('notice')">
      <div class="content-left">
        <img src="@/assets/img/message.png" />
      </div>
      <p class="content-center">平台公告</p>
      <p class="redback tishi" v-if="message.noticeCount>0"></p>

      <van-icon name="arrow" class="content-right" size="20px" color="#CBCBCB" />
    </div>
    <!--    <div class="message-content" @click="tolist('message')">
            <div class="content-left">
                <img src="@/assets/img/message.png">
            </div>
            <p class="content-center">
                审核消息
            </p>
            <p class="redback tishi" v-if="message.messageCount>0"></p>

            <van-icon name="arrow" class="content-right" size="20px" color="#CBCBCB"/>


    </div>-->

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-swipe-cell
        :right-width="65"
        :on-close="onClose"
        v-for="(item,key) in ddd"
        :key="item.id"
      >
        <van-cell-group>
          <!--<van-cell title="单元格" :value="item" />-->
          <div class="inform-content" @click="todetail(item,key)">
            <p class="redback read" v-if="item.isRead==0"></p>
            <p class="inform-title">{{item.notice.title}}</p>
            <p class="inform-somecontent">{{item.notice.subTitle}}</p>
            <p class="inform-time">{{item.notice.createTime|formNow}}</p>
          </div>
        </van-cell-group>
        <div slot="right" class="deletebtn" @click="closee(item.id,key)">
          <img src="@/assets/img/shanchu.png" />
        </div>
      </van-swipe-cell>
      <div v-if="ddd.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
    </van-list>

    <van-popup v-model="set.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <!--<van-cell-->
          <!--title="开启通知"-->
          <!--value="去开启"-->
          <!--is-link-->
          <!--value-class="right"-->
          <!--&gt;</van-cell>-->
          <van-cell-group>
            <van-cell title="用户付款语音提醒" class="kaiguan">
              <template slot="title">
                <span class="custom-text">用户付款语音提醒</span>
                <!--<van-icon name="question-o" class="righticon" @click="question"/>-->
              </template>
              <van-switch v-model="checked" @input="onInput" size="20px" />
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { voice, exitvoice, voiceSwitch, setStorage, getStorage ,formNow} from "@/utils";
export default {
  name: "Message",
  data () {
    return {
      formNow,
      topheader: {
        name: '消息',
        left: '3',//

        heade: 'header1',
        // right7: '1',
        message: ''
      },
      value: '',
      type: '', // 省区总合作商推广员推广首页
      loading: false, // 分页加载
      kaiguan: true, // 避免多次请求
      finished: false,
      checked: true, //开关
      active: 0,
      page: 1,
      pageSize: 10,
      count: '',   //总共数据
      set: {
        onoff: false
      },
      message: {
        noticeCount: 0,  //平台公告
        messageCount: 0,  //审核公告
        page: {
          list: []
        }
      },
      ddd: []
    }
  },
  filters:{
formNow
  },
  components: {
  },
  methods: {
    goback () {
      if (this.set.onoff) {
        this.set.onoff = !this.set.onoff
        this.topheader.name = '消息'
        this.topheader.right7 = '1'
      } else {
        this.$router.go(-1)
      }
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
      // let formdata=new FormData();
      // formdata.set("id",msg);
      let para = {
        id: msg,
        store: {
          id: this.$route.query.id
        }
      }
      this.shopApi.deleteMessage(para).then(() => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        this.$delete(this.ddd, key)
      })

    },
    todetail (msg, key) {
       if (window._czc) {
               window._czc.push(['_trackEvent', '查单', '平台公告详情','' ,'' , '']);//其中灰色的为选填项
      
         }
      if (this.ddd[key].isRead == 0) {
        this.toread(msg, key)
      }
      this.$store.commit('SET_RECORD', msg)
      this.$router.push('/MessageDetail')
    },
    toread (msg, key) {
      /*let formdata=new FormData();
      formdata.set("id",msg);*/
      let para = {
        id: msg
      }
      this.shopApi.readMessage(para).then(() => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        this.ddd[key].isRead = 1
      })
    },
    tolist (msg) {
 if (window._czc) {
               window._czc.push(['_trackEvent', '消息', '平台公告','' ,'' , '']);//其中灰色的为选填项
      
         }
      this.$router.push({ path: '/Messagelist', query: { type: msg, id: this.$route.query.id } })
    },
    toSet () {
      this.set.onoff = !this.set.onoff
      this.topheader.name = '新消息设置'
      this.topheader.right7 = ''
    },
    getlist () {
      if (this.kaiguan == true) {
        this.kaiguan = false
        let para = {
          page: {
            pageNo: this.page,
            pageSize: this.pageSize
          },
          store: {
            id: this.$route.query.id
          }
        }
        this.shopApi.notReadMessage(para).then(res => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          // setToken(res.data.phone)
          this.count = res.data.data.page.count
          this.page++
          this.kaiguan = true
          this.message = res.data.data
          if (res.data.data.page.list) {
            this.ddd = this.ddd.concat(res.data.data.page.list)
          }
        }).catch(() => {
          this.kaiguan = true
        })



      }
    },
    onInput (checked) {
      this.$dialog.confirm({
        title: '提醒',
        message: '是否切换开关？'
      }).then(() => {
        this.savestore(sessionStorage.getItem('id'), sessionStorage.getItem('storeId'), checked)

      }).catch(() => {
        this.checked = !checked;
      });


    },
    tovoice () {
      voice(this.$route.query.id)
      // window.location.href = `qtkjshop://JPushRegister?storeId=${this.$route.query.id}`
    },
    exitvoice () {
      exitvoice()
      // window.location.href =`qtkjshop://JPushExit?storeId=${this.$route.query.id}`
    },
    savestore (id, storeid, checked) {
      let store = getStorage('store', 1000);
      console.log(store)
      let index = store.findIndex(item => item.id === id);
      let storeindex = store[index].store.findIndex(item => item.storeid === storeid)
      if (checked) {
        store[index].defaultvoice = true
        store[index].store[storeindex].voice = true
        voiceSwitch(true)
        // this.tovoice(storeid)
      } else {
        store[index].defaultvoice = false
        store[index].store[storeindex].voice = false
        voiceSwitch(false)
        // this.exitvoice()
      }
      // store[index].defaultid=storeid
      // store[index].defaultvoice=store[index].store[storeindex].voice

      setStorage('store', store)

    },
  },
  mounted () {
    this.type = sessionStorage.getItem('accountType')
    this.getlist()
    let store = getStorage('store', 1000);
    console.log(store)
    let index = store.findIndex(item => item.id === sessionStorage.getItem('id'));
    // let storeindex=store[index].store.findIndex(item=>item.storeid===sessionStorage.getItem('storeId'))
    this.checked = !!store[index].defaultvoice;
    // let para = {
    // store:{
    //     id:this.$route.query.id
    // }
    // }
    //
    //     this.shopApi.notReadMessage(para).then(res => {
    //         // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
    //         // setToken(res.data.phone)
    //         console.log(res.data)
    //         this.message=res.data.data
    //     }).catch(error => {
    //         console.log(error)
    //     })



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
  flex: 1;
}
.content-right {
  /*position: absolute;*/
  /*right: 20px;*/
  margin-right: 20px;
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

.kaiguan /deep/ .van-cell__value {
  text-align: right;
  display: block;
}
</style>
