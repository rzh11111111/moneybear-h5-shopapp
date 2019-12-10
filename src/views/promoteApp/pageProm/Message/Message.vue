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
    <!--     <div class="message-content" @click="tolist('message')">
            <div class="content-left">
                <img src="@/assets/img/message.png">
            </div>
            <p class="content-center">
                审核消息
            </p>
            <p class="redback tishi" v-if="message.messageCount>0"></p>

            <van-icon name="arrow" class="content-right" size="20px" color="#CBCBCB"/>


    </div>-->
    <!--     <van-popup
                v-model="set.onoff"
                position="right"
                :overlay="false"
        >
            <div class="rightmap">
                <header class="heade">
                </header>
                <div >
                    <van-cell
                            title="开启通知"
                            value="去开启"
                            is-link
                            value-class="right"
                    ></van-cell>

                </div>
            </div>
    </van-popup>-->
  </div>
</template>

<script>
export default {
  name: "Message",
  data () {
    return {
      topheader: {
        name: '消息',
        left: '3',//

        heade: 'header1',
        message: ''
      },
      value: '',
      type: '', // 省区总合作商推广员推广首页
      set: {
        onoff: false
      },
      message: {
        noticeCount: 0,  //平台公告
        messageCount: 0,  //审核公告

      }
    }
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
    tolist (msg) {

      this.$router.push({ path: '/Messagelist', query: { type: msg } })
    },
    toSet () {
      this.set.onoff = !this.set.onoff
      this.topheader.name = '新消息设置'
      this.topheader.right7 = ''
    }
  },
  mounted () {
    this.type = sessionStorage.getItem('accountType')

    let para = {
    }
    if (this.type == 0) {
      this.Api.notReadMessage2(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        this.message = res.data.data
      })
    } else {
      this.Api.notReadMessage(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        this.message = res.data.data
      })
    }


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
</style>
