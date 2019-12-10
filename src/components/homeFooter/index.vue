<template>
  <div class="page">
    <div class="home-footer">
        <div v-for="item in routee" :key="item.id" class="home-footer-item" @click="toroute(item.route)">
          <div class="item-div">
          <img :src="active===item.id?item.normal:item.active" class="item-img"/>
         </div>
          <p class="item-p" v-if="active!==item.id">{{item.name}}</p>
          <p class="item-p bluecolor" v-else>{{item.name}}</p>
        </div>
    </div>

      <!-- <van-tabbar  route>
  <van-tabbar-item 
  
  replace
  to="/shophome"
  >
    <span>工作台</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? homeicon.normal : homeicon.active"
    >
  </van-tabbar-item>
  <van-tabbar-item 
  replace
  to="/MasterDetail"
  >
    <span>我的</span>
    <img
      slot="icon"
      slot-scope="props2"
      :src="props2.active? detailicon.normal : detailicon.active"
    >
  </van-tabbar-item>
</van-tabbar> -->
  </div>
</template>

<script>
import hometrue from '@/assets/img/index/hometrue.png'
import homefalse from '@/assets/img/index/homefalse.png'
import detailtrue from '@/assets/img/index/detailtrue.png'
import detailfalse from '@/assets/img/index/detailfalse.png'
  export default {
    name:'homeFooter',
    props: {
        userId:{  
            type:String,
        },
        storeId:{
            type:String,
        },
        actives:{
          type:Number
        }
    },
    data () {
      return {
        active: 0,
        routee:[{
          id:0,
          name:'工作台',
          route:'/shophome',
          normal:hometrue,
          active:homefalse
        },
        {
          id:1,
          name:'我的',
          route:'/MasterDetail',
          normal:detailtrue,
          active:detailfalse
        }
        ],
        homeicon: {
        normal: hometrue,
        active: homefalse
        },
        detailicon: {
        normal: detailtrue,
        active: detailfalse
        }
      }
    },
    components: {

    },
    methods: {
        onchange(index){
            console.log(index)
        },
        toroute(item){
          
          if (window._czc) {
            console.log(item)
            if(item==='/shophome'){
                           window._czc.push(['_trackEvent', '首页', '工作台tab','' ,'' , '']);//其中灰色的为选填项
            }else{
                               window._czc.push(['_trackEvent', '首页', '我的tab','' ,'' , '']);//其中灰色的为选填项
          
                          
                        }
                        }
          this.$router.push(item)
        }
    },
    computed: {

    },
    mounted(){
      this.active=this.actives
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
.home-footer{
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content:space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #fff;
  z-index: 1;
  border-top: 1px solid #E5E5E5;
  .home-footer-item{
    display: flex;
    flex-direction:column;
    align-items: center;
    .item-div{
      width: 26px;
      height: 26px;
    }
    .item-img{
      width: 100%;
      height: 100%;
    }
    .item-p{
      font-size: 12px;
      color:#7F8389;
      font-weight: 600;
    }
  }
}
 .bluecolor{
   
   font-family:PingFangSC;
 }
</style>
