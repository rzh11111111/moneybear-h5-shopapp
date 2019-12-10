<template>
  <div>
    <header :class="topHeader.heade" class="heade">
      <slot name="gobacks"></slot>
      <!--money顶部左-->
      <div class="backlcon" @click="goback" v-if="topHeader.left=='0'">
        <img src="@/assets/img/backlcon.png" />
      </div>
      <!--登录页顶部左-->
      <div class="backlcon" @click="goback" v-if="topHeader.left=='1'">
        <img src="@/assets/img/backlcon.png" />
      </div>
      <!--常用顶部左-->
      <div class="backlcon" @click="goback" v-if="topHeader.left=='2'">
        <img src="@/assets/img/backlist.png" />
      </div>
      <!--编辑资料顶部左-->
      <div class="backlcon" @click="goback" v-if="topHeader.left=='3'">
        <img src="@/assets/img/backlist.png" />
      </div>
      <!--首页顶部左-->
      <div class="backlcon2" @click="tominedetail" v-if="topHeader.left=='4'">
        <!--<van-icon name="user-o" size="22px" />-->
        <!-- <img  src="@/assets/img/mine.png"  /> -->
        <svg-icon icon-class="home-mine" />
        <p style="transform:scale(0.75,0.75);white-space:nowrap">我的</p>
      </div>
      <h1 class="headline" v-if="!topHeader.headerte">{{topHeader.name}}</h1>
      <van-tabs class="headtabs"
       v-model="active"
        type="card"
        background="linear-gradient(50deg, #00a7fc 0%, #0088fd 100%)"
        color="#fff" 
        title-active-color="#0088fd" 
        title-inactive-color="#fff"
        @click="clicktabs" 
        v-else>
            <van-tab :title="value" :name="index" v-for="(value,index) in topHeader.headerte" :key="index"></van-tab>
        </van-tabs>
      <form action="/" style="position: absolute;width: 100%;z-index:100;">
        <van-search
          v-model="key"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
          v-if="search"
        ></van-search>
      </form>
      <div class="rightlcon">
        
        <!--搜索-->
        <div @click="clicksearch" class="rightlcon1" v-if="topHeader.right2">
          <img src="@assets/img/search.png" />
        </div>
        <!--选择时间-->
        <div @click="clicktimechoose" class="rightlcon1" v-if="topHeader.right1">
          <img src="@assets/img/datachoose.png" />
        </div>
        <div  class="right1" v-if="topHeader.right3">{{topHeader.right3content}}</div>
        <!--编辑资料-->
        <div @click="tobingcard" class="right1" v-if="topHeader.right4">编辑</div>

        <!--收益帮助-->
        <van-icon
          @click="tohelp"
          slot="right-icon"
          name="info"
          size="20px"
          class="custom-icon right1"
          v-if="topHeader.right6"
        />
        <!--<div @click="" class="right1" v-if="topHeader.right4">{{topHeader.right4content.content}}({{topHeader.right4content.now}}/{{topHeader.right4content.all}})</div>-->
        <!--设置-->
        <div @click="toSet" class="right1" v-if="topHeader.right7">设置</div>
        <!--消息-->
        <div @click="toread" class="right1" v-if="topHeader.right8">全部已读</div>

        <div @click="toChangeList" class="right1" v-if="topHeader.right9">变更记录</div>

        <!--存为草稿-->
        <div @click="savedraft" class="right1" v-if="topHeader.right11">存为草稿</div>

        <!-- 商品筛选 -->
        
        <div  class="right1"  v-if="topHeader.right12"   @click="toscreen">
        <svg-icon class="rightIcon" icon-class="filtrate"/>
        </div>
          <!-- 排序 -->
         <div @click="tosort" class="right1" v-if="topHeader.right13=='1'">排序</div>
          <div @click="tosort" class="right1" v-if="topHeader.right13=='2'">完成</div>

          <!-- 合同 -->
          <div @click="tohetong" class="right1" v-if="topHeader.right14=='1'">历史合同</div>

          <!-- 审核详情三个点 -->
          <div @click="tochangecontract" class="right15" v-if="topHeader.right15=='1'">···</div>
  
         <!-- 开票信息 -->
          <div @click="toinvoice" class="right1" v-if="topHeader.right16=='1'">开票信息</div>

        <!-- 下载码 -->
        <div @click="tobingcard" class="rightCode" v-if="topHeader.right10">
          <p class="rightlcon3"><img src="../../assets/img/code2.png"/></p>
          <!-- <svg-icon class="rightlcon3" icon-class="home-code2" /> -->
          <p style="transform:scale(0.75,0.75);white-space:nowrap">下载码</p>
        </div>

        <!--首页消息-->
        <div class="rightdiv" @click="tomessage" v-if="topHeader.right5">
          <div class="rightlcon2">
            <img src="@/assets/img/information.png" />
          </div>
          <p style="transform:scale(0.75,0.75);white-space:nowrap">消息</p>
          <div
            class="information"
            v-if="topHeader.message!='0'&&topHeader.message"
          >{{topHeader.message}}</div>
        </div>
      </div>
    </header>
    <div class="headerbottom"></div>
  </div>
</template>

<script>

export default {
  props: [
    'topHeader',
    'goBackMt'
  ],
  data () {
    return {
      value: '',
      ready: false,
      search: false,
      key: '',
      active:0
    }
  },
  components: {

  },
  methods: {
    toadd () {
      console.log(this.$route.query.id)
      switch (this.$route.query.id) {
        case 0:
          this.$router.push('/AddTogether')
          break
        case 1:
          this.$router.push('/AddPopularize')
          break
        case 2:
          this.$router.push('/AddSeed')
          break
        default:
          break
      }

    },
    clicksearch () {
      // this.$parent.search();
      this.search = true
    },
    goback () {
      // 判断是否存在自定义返回方法
      if(this.goBackMt) {
        return this.goBackMt();
      }
      // 进入默认返回返回
      if (document.getElementsByClassName('van-image-preview').length) {
        if (this.$store.state.record.instance == 'on') {
          this.$store.commit('SET_INSTANCE', 'off')
        } else {
          this.$store.state.record.instance.close()
        }

      } else if (this.topHeader.left == '1' || this.topHeader.left == '2') {
        this.$router.go(-1)
        // this.$toast.clear()
      } else if (this.topHeader.left == '3' || this.topHeader.search == true || this.topHeader.left == '0') {
        this.$parent.goback();
        // this.$toast.clear()
      } else {
        // alert(document.getElementsByClassName('van-image-preview'))
        if (this.ready) {
          // window.location.href = `qtkjshop://back`
          window.AndroidJs.back()
        } else {


          this.ready = true
          this.$toast({
            duration: 0,       // 持续展示 toast
            loadingType: 'spinner',
            message: '再次点击退出应用'
          })
          let second = 3;
          const timer = setInterval(() => {
            second--;
            if (!second) {
              clearInterval(timer);
              this.ready = false
              this.$toast.clear();
            }
          }, 1000);
        }
      }
    },
    tominedetail () {
      this.$emit('tominedetail', 'click')
      // this.$router.push('/MineDetail')
    },
    tohetong(){
      this.$emit('tohetong', 'click')
    },
    toinvoice(){
      this.$emit('toinvoice', 'click')
    },
    clicktimechoose () {
      this.$emit('clickcallback', 'click')
    },
    tochangecontract(){
       this.$emit('tochangecontract', 'click')
    },
    tobingcard () {
      this.$parent.tobindcard('1')
    },
    onSearch (msg) {
      console.log(msg)
      let param = msg;
      // eslint-disable-next-line no-useless-escape
      let regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\-+*/|\r\n\s,.?!，。: '";%￥#@（）_<>？！…—&$=(){}[\]]|\s/g;
      this.key = param.replace(regRule, "");
      this.$emit('search', this.key)
    },
    onCancel (msg) {
      // this.$parent.notsearch();
      this.key = ''
      this.search = false
      this.$emit('search', msg)
    },
    tohelp () {
      this.$parent.tohelp();
    },
    toscreen(){
 this.$parent.toscreen();
    },
    tomessage () {
      this.$router.push('/Message')
    },
    toSet () {
      this.$parent.toSet();
    },
    savedraft () {
      this.$parent.savedraft();
    },
    toread () {
      this.$parent.toreadall();
    },
    toChangeList () {
      this.$router.push({ path: "/ChangeList", query: { accountType: sessionStorage.getItem("accountType") } })
    },
    clicktabs(value,index){
      this.$emit('clicktabs', value)
        console.log(value,index)
    },
    tosort(){
      if(this.topHeader.right13=='1'){
        console.log('11')
        this.$emit('tosort', true)
      }else{
        this.$emit('tosort', false)
      }
        
    },
    keyups () {

      let regRule = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]){1,20}$");
      regRule.test(this.topHeader.key) ? '' : this.topHeader.key = ''

    },
    keyupanzhuo (index) {

      if (!this.isios()) {
        console.log(index)
        let param = this.topHeader.key;
        // eslint-disable-next-line no-useless-escape
        let regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g;
        this.topHeader.key = param.replace(regRule, "");
      }


    },
    keyupios (index) {

      if (this.isios()) {
        console.log(index)
        let param = this.topHeader.key;
        // eslint-disable-next-line no-useless-escape
        let regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g;
        this.topHeader.key = param.replace(regRule, "");
      }

    },
    isios () {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    isAndroid?false:true
    //   if (isAndroid) {
    //     return false;
    //   } else {
    //     return true;
    //   }

    }

  },

  mounted () {
    window.goback = this.goback
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.heade {
  width: 100%;
  height: 44px;
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 30000;
  background: #fff;
  color: #000;
}
.headerbottom {
  width: 100%;
  height: 43px;
}
.header1 {
  background: #00A7FC;
  
  color: #ffffff;
}
.backlcon {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 16px;
  top: 2px;
  img {
    width: 50%;
    height: 50%;
    margin: 25% 0 0 25%;
  }
}
.backlcon2 {
  width: 40px;
  height: 40px;
  font-size: 15px !important;
  position: absolute;
  /*border-radius: 50%;*/
  /*border: 1px solid #fff;*/
  left: 16px;
  text-align: center;
  margin-top: 6px;
  img {
    width: 50%;
    height: 50%;
    /*margin: 6px 0 1px 0;*/
  }
  svg {
    width: 50%;
    height: 50%;
  }
}
.headline {
  position: absolute;
  left: 50%;
  font-size: 18px;
  line-height: 44px;
  transform: translateX(-50%);
  white-space: nowrap;
  overflow: hidden;
  width: 50%;
  text-align: center;
}
.headtabs{
  width: 50%;
  position: absolute;
  left: 50%;
  top: 7px;
  transform: translateX(-50%);
}
.rightlcon {
  float: right;
  display: flex;
  z-index:99;
}
.rightdiv {
  position: relative;
  font-size: 15px;
  text-align: center;
  margin-right: 20px;
}
.rightlcon1 {
  width: 20px;
  height: 20px;
  margin: 12px 18px 12px 0;
  img {
    width: 100%;
    height: 100%;
  }
}
.rightlcon2 {
  width: 20px;
  height: 20px;
  margin: 6px auto 1px;
  img {
    width: 100%;
    height: 100%;
  }
}
.information {
  width: 15px;
  height: 15px;
  text-align: center;
  position: absolute;
  right: -5px;
  top: 3px;
  background: rgba(255, 77, 77, 1);
  box-shadow: 0px 2px 4px 0px rgba(202, 0, 0, 0.5);
  border-radius: 50%;
  font-size: 11px;
  line-height: 15px;
}
.right1 {
  font-size: 14px;
  line-height: 44px;
  margin-right: 18px;
}
.right15 {
  font-size: 12px;
  line-height: 44px;
  margin-right: 18px;
}
.rightCode {
  font-size: 15px;
  width: 45px;
  text-align: center;
  margin-top: 6px;
  margin-right: 15px;
}
.rightlcon3 {
  width: 20px;
  height: 20px;
  margin: 0 auto 1px;

  img {
    width: 100%;
    height: 100%;
  }
}
.rightIcon{
  width: 20px;
  height: 20px;
  margin-top: 12px;
}
.van-tabs--card{
padding-top: 0px;
}
</style>
