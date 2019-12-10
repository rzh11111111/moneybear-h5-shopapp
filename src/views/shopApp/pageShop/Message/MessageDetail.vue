<template>
  <div style="background:#fff;min-height:100vh;">
    <top-column :top-header="topheader"></top-column>
    <div class="message" v-if="ddd.message">
      <header>
        <p class="title">{{ddd.message.title}}</p>
        <content>
          {{ddd.message.subTitle}}
        </content>
        <p class="time">{{ddd.message.createTime}}</p>
      </header>
    </div>
    <div class="message" v-if="ddd.notice">
      <header>
        <p class="title">{{ddd.notice.title}}</p>
        
        <p class="time">{{ddd.notice.createTime}}</p>
      </header>
      
      <p v-html="ddd.notice.content" class="greyColor" v-if="ddd.notice.content"></p>
     
      <p v-html="ddd.notice.subTitle" class="greyColor" v-else></p>
      <!-- <p v-html="`<p>332131231<a target='_blank' href='https://pretuiguang.shengqianxiong8.com/'>www.baidu.com</a></p>`" class="greyColor"></p> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: "Message",
    data () {
      return {
        topheader:{
          name: '消息详情',
          left: '2',//

          heade: 'header1',
          message:''
        },
        value:'',
        type: '', // 省区总合作商推广员推广首页
        ddd:{
          message:{
            title:'',
            content:'',
            subTitle:'',
            createTime:''
          },
          notice:{
            title:'',
            content:'',
            subTitle:'',
            createTime:''
          }
        }
      }
    },
    components: {
    },
    methods: {
      tolist(){
        // this.$router.push('/MessageDetail')
      }
    },
    computed:{
      moneyss(){
        return this.$store.state.record.recordObj
      }
    },
    mounted(){
      this.type=sessionStorage.getItem('accountType')
      // let formdata=new FormData();
      let para={
        id:this.$route.query.id
      }
      if(!this.$route.query.id){
        this.ddd=this.moneyss
      }else{
        // formdata.set("id",this.$route.query.id);

        this.Api.detailMessage(para).then(res => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          // setToken(res.data.phone)
          console.log(res)
          this.ddd=res.data.data
        }).catch(error => {
          console.log(error)
        })
      }

    }
  }
</script>

<style scoped>
  .message{
    width: 80%;
    margin-left: 10%;
  }

  .title{
    color: #353535;
    font-size: 16px;
    margin-top: 28px;
    font-weight: 800;
  }
  .time{
    margin: 3px 0 5px 0;
    font-size: 12px;
    /*margin-bottom: 10px;*/
    color: #B0B0B0;
  }
  header{
    border-bottom: 1px solid #F5F5F5;
  }
  content{
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    color: #353535;
    font-size: 13px;
    line-height: 23px;
    margin-top: 10px;
    margin-bottom: 0 !important;
  }
  .greyColor{
    color: grey;
    font-size: 15px;
    padding: 5px 0;
  }
</style>
