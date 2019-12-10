<template>
  <div ref="categoryGoods"  style="background:#f5f5f9">
    <top-column ref="topheaders" :top-header="topheader" @clicktabs="clicktabs"></top-column>

        <Commodity v-if="active===0&&menu.length" :index-menu="menu"></Commodity>
        <Service v-if="active===1"></Service>
        <Comb v-if="active===2"></Comb>
    <div class="add" @click="toadd">
        <p  class="addadd">+</p>
        <p   class="addp">添加</p>
    </div>
    <van-popup v-model="screen.onoff"  position="right" :style="{ width: '80%',height:'100%'}">
      <p class="right-title">类型</p>

      <van-checkbox-group v-model="result" class="checkgroup">
        <van-checkbox v-for="(item, index) in list" :key="index" :name="item">
          <div
            slot="icon"
            slot-scope="props"
            :class="props.checked ? 'check check-true': 'check check-false'"
          >
          {{item}}</div>
        </van-checkbox>
      </van-checkbox-group>

     <!--  <p class="right-title">下架类型</p>

      <van-checkbox-group v-model="result2" class="checkgroup">
        <van-checkbox v-for="(item, index) in list2" :key="index" :name="item">
          <div
            slot="icon"
            slot-scope="props"
            :class="props.checked ? 'check check-true': 'check check-false'"
          >
          {{item}}</div>
        </van-checkbox>
      </van-checkbox-group> -->
      <div class="checkgroup-bottom">
        <van-button type="default" style="width:50%">重置</van-button>
        <van-button type="info" style="width:50%">确定</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Commodity from './Commodity'
import Service from './Service'
import Comb from './Comb'
export default {
  data () {
    return {
      topheader: {
        name: "商品",
        left: "2",
        right2: true,
        right12: true,
        heade: "header1",
        headerte:[
          '商品',
          '服务',
          '套餐'
        ]
      },
      menu:[],
      checked: true,
      list: ['上架', '下架', '售完'],
      // list2: ['a', 'b', 'c'],
      result: ['上架', '下架'],
      // result2: ['a', 'b'],
      screen: {
        onoff: false
      },
      active:0, //服务
      checkeds:true,//顶部开关
      activeKey: 0,

      contentItemHeight: [],
      itemHeader: 40,
      isClick: false,
    }
  },
  components: {
    Commodity,Service,Comb
  },
  methods: {
    getMenu(){
        let para={
          id:sessionStorage.getItem('storeId')
        }
        this.shopApi.menuList(para).then(res => {
                if(res.data.status==1){
                    console.log(res)
                    this.menu=JSON.parse(JSON.stringify(res.data.data))
                }
            })
      },
      clicktabs(value){
        this.active=value
      },

    toscreen () {
      this.screen.onoff = true
    },
   toadd(id){
    //  if(id){
    //     console.log(id)
    //  }else{
       this.$router.push(this.active===0?'/Commodity/addGoods':this.active===1?'/Commodity/addService':'/Commodity/addMeal')
    //  }
   }

  },

  computed: {

  },
  mounted () {


  },
  created(){
  this.getMenu()
  }

}
</script>

<style scoped lang="scss" type="text/scss">
.van-popup.van-popup--right{
  z-index: 205000 !important;
}
.van-sidebar-item{
  padding: 10px 18px;
}
.van-checkbox{
    margin-left: 0;
}
.van-sidebar-item /deep/ .van-sidebar-item__text{
  font-size: 12px;
  line-height: 16px;
  max-height: 32px;
    color: #666;
    display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
    overflow: hidden;
    // white-space: nowrap;
  text-overflow: ellipsis;
  }
  .van-sidebar-item--select /deep/ .van-sidebar-item__text{
        color: #0095FD;
        font-weight: 800;
      }

.van-sidebar-item--select{
  border-color:white;
  border-right: 1px solid #fff;
}
.van-sidebar{
    width: auto;
}
.add{
    width:44px;
height:44px;
position: absolute;
right: 18px;
bottom: 9px;
border-radius: 50%;
text-align: center;
background:rgba(0,149,253,1);
overflow: hidden;
color: #fff;
    .addadd{
        font-size: 25px;
        line-height: 25px;
        margin:0px 10px 0px;
    }
    .addp{
        font-size: 12px;
        line-height: 12px;
        transform:scale(0.8);
    }
}
.right-title{
    margin: 37px 0 0 18px;
    font-size: 14px;
    color: #666;
}
.checkgroup{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 60px;
}
.check{
    width: 80px;
    height: 30px;
    background: rgb(247,247,247);
    text-align: center;
    color: #333;
    border: 1px solid rgb(247,247,247);
    font-size: 12px;
    line-height: 30px;
    border-radius: 5px;
}
.checkgroup-bottom{
    display: flex;
    width: 100%;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
    left: 0;
}
.check-true{
    color: #0095FD;
    border-color: #0095FD;
    background: rgb(229,244,2454);
}
</style>
