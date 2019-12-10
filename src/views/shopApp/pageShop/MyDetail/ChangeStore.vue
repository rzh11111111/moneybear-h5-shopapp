<template>
  <div class="page" style="background:rgba(245,245,249,1);">
<top-column :top-header="topheader"></top-column>

        <div
          class="list"
          v-for="(item,index) in storelist"
          :key="index"
          @click="todetailss(item.id)"
        >
        <div class="list-logo">
            <img :src="item.logo?item.logo:''"/>>
        </div>
          <div class="list-title">
            <p class="list-name">{{item.nickName}}</p>
            <p class="list-user">账号：{{item.storeAccount.userName}}</p>
          </div>
          <!-- <div :class="item.id===storeid?'list-choose list-thischoose':'list-choose'">
              √
          </div> -->
          <div class="list-choose" v-if="item.id===storeid">
          <svg-icon class="rightIcon" icon-class="change-choose"/>
          </div>
          <div  class="list-choose" v-else>
           <svg-icon class="rightIcon" icon-class="change-notchoose"/>
           </div>
            
            
              
            
            
          
    
        </div>
        <p class="list-tops">如有新开店铺需要入驻，请联系推广人员</p>
  </div>
</template>

<script>
import { setStorage, getStorage } from "@/utils";
  export default {
    data () {
      return {
          topheader: {
        name: '切换店铺',
        left: '2',
        heade: 'header1'
      },
          storelist:[],
          storeid:''
      }
    },
    components: {
    },
   
    methods: {
        getList () {
      let datejson4 = {
        storeAccountId: sessionStorage.getItem('id'),
      }
      this.Api.storeList(datejson4).then(res => {
        if (res.data.data.list) {
            this.storelist=res.data.data.list
          /* res.data.data.list.map(value => {
            // console.log(this.store, this.store.length, value)

            this.$set(this.storelist, this.storelist.length, value)
          }) */
        }
      }).catch(error => {
        console.log(error)
      })
    },
    savestore (id, storeid) {  //缓存要去的店铺和语音播报开关

      let store = getStorage('store', 1000);
      if (store) {   //如果有缓存
        let index = store.findIndex(item => item.id ? item.id === id : false);
        if (index > 0) {   //如果能找到store的id

          let storeindex = store[index].store.findIndex(item => item.storeid ? item.storeid === storeid : -1)
          console.log(storeindex)
          if (storeindex < 0) {  //如果数组里没有当前登录store
            store[index].defaultid = storeid   //增加一个store并且切换默认店铺
            store[index].defaultvoice = true
            store[index].store.push({
              storeid: storeid,
              voice: true
            })

          } else {   //如果数组里有当前登录store
            store[index].defaultid = storeid
            store[index].defaultvoice = store[index].store[storeindex].voice
          }
        } else {  //如果有store不是我现在弄得，弄一个新的缓存
          store = [{
            id: id,
            defaultid: storeid,
            defaultvoice: true,
            store: [{
              storeid: storeid,
              voice: true
            }]
          }]
        }

      } else {  //直接做个现在的店铺的缓存
        store = [{
          id: id,
          defaultid: storeid,
          defaultvoice: true,
          store: [{
            storeid: storeid,
            voice: true
          }]
        }]
      }



      setStorage('store', store)

    },
    todetailss (item) {


  

      this.session.$setSessionStorageByName('storeId', item)

      this.savestore(sessionStorage.getItem('id'), item)

      this.$router.go(-1)
  

    },
    },
    computed: {

    },
    mounted(){
        this.storeid=sessionStorage.getItem('storeId')
        this.getList()
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
.list{
    background: #fff;
    margin: 19px;
    width:calc(100%-40px) ;
    border: 1px solid #fff;
    height: 80px;
    border-radius:5px;
    display: flex;
    position: relative;
    .list-logo{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin: 15px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .list-title{
      width: 50%;
           
        .list-name{
            color: #333;
            font-size: 16px;
            font-weight: 600;
            line-height: 22px;
            margin-top: 15px;
             overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .list-user{
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:20px;
            margin-top: 8px;
        }
        
    }
    .list-choose{
        width: 25px;
        height: 25px;
        position: absolute;
        right: 18px;
        top: 27px;
      svg{
        width: 100%;
        height: 100%;
      }
            // border: 1px solid #CBCBCB;
            // border-radius: 5px;
            // width: 25px;
            // height: 25px;
            // font-size: 17px;
            // text-align: center;
            // line-height: 25px;
            // position: absolute;
            // right: 18px;
            // top: 27px;
            // color: #fff;
        }
        // .list-thischoose{
        //     background: #008BFD;
        //     border:1px solid #008BFD;
        // }
}
 .list:active{
     border: 1px solid #008BFD;
 }
 .list-tops{
   font-size: 13px;
   text-align: center;
   width: 100%;
   color: #333;
   position: fixed;
   bottom: 19px;
 }
</style>
