<template>
  <div class="app-initte">
    <!-- <header>
      消费者端显示商品/服务头像
      <van-switch v-model="checkeds" @input="onInput" size="20px" style="margin-left:15px;" />
    </header> -->
    <main>
      <aside ref="categoryMenu">
        <van-sidebar :active-key="activeKey" @change="onChangeTab">
          <!-- <van-sidebar-item title="折扣服务" /> -->
          <van-sidebar-item v-for="(value,index) in menu" :key="index" :title="value.name" />
        </van-sidebar>
      </aside>
      <div class="aside-te" @click="tosetmenu">
        <p class="aside-te-p">菜单管理</p>
      </div>
      <article ref="categoryList">
        <ul>
          <!-- <li ref="item0">
            <div ref="itemHeader" class="article-item-header">
              <b>折扣服务</b>
              <div class="sort" v-if="!sortte" @click="sorts(false)">排序</div>
              <div class="sort" v-else @click="sorts(true)">完成</div>
            </div>
            <commoditylist :menute='menute' :sortte='sortte'>

            </commoditylist>
          </li> -->
          <li :ref="'item'+index" v-for="(value,index) in menu" :key="index">
            <div ref="itemHeader" class="article-item-header">
              <b>{{value.name}}</b>
              <div class="sort" v-if="!value.sort" @click="sorts(false,index)">排序</div>
              <div class="sort" v-else @click="sorts(true,index)">完成</div>
            </div>
            <div v-if="value.menute.length===0">
                暂无商品
            </div>
            <commoditylist v-else :menute='value.menute' @compile="compile" :sortte='value.sort' :indexs='index'>

            </commoditylist>
            <!-- <dl>
              <dd v-for="(item,inindex) in value.menute" :key="inindex">
                <div class="article-item">
                  <div class="item-left" v-if="item.picMinUrl">
                    <img :src="item.picMinUrl" />
                  </div>
                  <div :class="item.picMinUrl?'item-right':'item-right item-rightte'">
                    <p class="item-title">{{item.title}}</p>
                    <div style="display:flex;align-items: flex-end;">
                          <div class="item-type">{{item.status==1?'上架':item.status==2?'下架':'售完'}}</div>
                          <div  class="item-type2">{{item.tag==1?'活动':item.tag==2?'促销':item.tag==3?'热卖':' '}}</div>
                        </div>
                    <div class="item-bottom">
                      <div class="item-money">￥1332.80</div>
                      <div class="item-price">￥1332.80</div>
                    </div>
                    <div class="item-more" @click="compile(index,inindex)">
                      <p class="item-moreclick">···</p>
                      <div class="item-compile" v-show="item.kaiguan">
                        <div class="item-compileli">编辑</div>
                        <div class="item-compileli">上架</div>
                        <div class="item-compileli">下架</div>
                        <div class="item-compileli">删除</div>
                      </div>
                    </div>
                  </div>
                </div>
              </dd>
            </dl> -->
          </li>
        </ul>
      </article>
    </main>
    <van-action-sheet
    v-model="show"
    :actions="actions"
    @select="onSelect"
    />
  </div>
</template>

<script>

import commoditylist from './CommodityList'
import { setTimeout } from 'timers';
export default {
  props: {
    indexMenu:{  
                type:Array,
    },
  },
  data () {
    return {
      checked: true,
      list: ['a', 'b', 'c'],
      result: ['a', 'b'],
      screen: {
        onoff: false
      },
      checkeds: true,//顶部开关
      activeKey: 0,
      menu: [  //左侧菜单
      
      ],
      contentItemHeight: [],
      itemHeader: 40,
      isClick: false,
      show: false,  //上啦菜单
      actions: [
        // { name: '选项' },
        // { name: '选项' },
        // { name: '选项', subname: '描述信息' }
      ]
    }
  },
  components: {
    commoditylist
  },
  methods: {
    /* 两边自动拉伸 */
    onChangeTab (index) {
      this.isClick = true;
      this.activeKey = index;
      let el = this.$refs['item' + index];
      if (el instanceof Array) {
        el = el[0];
      }
      let h = el.offsetTop;
      console.log(this.$refs.categoryList.scrollTop, h)
      this.$refs.categoryList.scrollTop = h - 46 < 0 ? 0 : h - 62;//46+17+18+18
      setTimeout(() => {
        this.isClick = false;
      }, 0);
    },
    getHeight () {
      let len = this.menu.length;
      let arr = [];
      for (let i = 0; i < len; i++) {
        let el = this.$refs['item' + i];
        if (el instanceof Array) {
          el = el[0];
        }
        console.log(el.offsetHeight)
        arr.push(el.offsetHeight);
      }
      this.contentItemHeight = arr;
    },
    scrollMenu () {
      if (this.isClick) {
        return;
      }
      let top = this.$refs.categoryList.scrollTop;
      let h = 0;
      let len = this.contentItemHeight.length;
      for (let i = 0; i < len; i++) {
        // let old = this.$refs['item' + i].name;
        if (top >= h && top < h + this.contentItemHeight[i]) {
          this.activeKey = i;
          break;
        }
        h += this.contentItemHeight[i];
      }
      this.$refs.categoryMenu.scrollTop = this.menuItemHeight * this.activeKey;
    },
    moveHeight(){
      
          this.getHeight()
          this.itemHeader = this.$refs.itemHeader.offsetHeight;
          this.menuItemHeight = this.$refs.categoryMenu.children[0].offsetHeight / this.menu.length;
          
  
    },
    /* 两边自动拉伸 */
    async getCategory() {
      let para={
          store:{
            id:sessionStorage.getItem('storeId')
            }
        }
        this.shopApi.goodsList(para).then(res => {
          console.log(res.data)
                if(res.data.status==1){
                  res.data.data.forEach(value=>{
                    value.kaiguan=false
                    //如果商品所属菜单的id和菜单的id相同，放进菜单
                    this.menu.forEach(item=>item.id==value.storeSellCategory.id?item.menute.push(value):'')
                    //如果商品被推荐，放入推荐
                    value.isRecommend?this.menu[0].menute.push(value):''
                  })
                    console.log(res)
                    this.$nextTick(() => {
                      this.moveHeight()
                      this.$refs.categoryList.addEventListener('scroll', this.scrollMenu);
               
                    })
                 }
            })
            // let {status, data} = await this.Api.getGoodsCategory({});
            // if (status === 1) {
            //     let allGoodsCategory = data.allGoodsCategory || [];
            //     this.firstCategoryList = allGoodsCategory.filter(item => !item.parentId);
            //     this.secondCategoryObj = {};
            //     this.firstCategoryList.forEach(item => {
            //         this.secondCategoryObj[item.id] = allGoodsCategory.filter(subitem => subitem.parentId === item.id);
            //     })
            //     this.topGoodsCategory = data.topGoodsCategory || [];
            //     this.topBrand = data.topBrand || [];
            //     this.banner = data.banner || [];
            //     this.$nextTick(() => { 
            //         this.getHeight()
            //         this.itemHeader = this.$refs.itemHeader.offsetHeight;
            //         this.menuItemHeight = this.$refs.categoryMenu.children[0].offsetHeight / (this.firstCategoryList.length + 2);
            //         this.$refs.categoryList.addEventListener('scroll', this.scrollMenu);
            //     }) 
            // }
        },
    toscreen () {
      this.screen.onoff = true
    },
    tosetmenu () {
      this.$router.push('/SetMenu')
    },
    todetail(index){ //第一个是小循环参数，第二个是大循环参数
      console.log('第'+index+'个')
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      
      switch (item.name) {
        case '上架':
          this.shopApi.goodsUp({id:item.id}).then(res=>{
            if(res.data.status===1){
              this.menu.forEach(value=>{  //假装改变状态，实际上还是原来的数据
                  console.log(value)
                  value.menute.forEach(valuete=>{
                    valuete.id===item.id?valuete.status=1:''
                  })
                })
              setTimeout(() => {
                this.$toast('上架成功')
                
              }, 500);
          
            }
            
          })
          break;
        case '下架':
          this.shopApi.goodsLower({id:item.id}).then(res=>{
            if(res.data.status===1){
              this.menu.forEach(value=>{  //假装改变状态，实际上还是原来的数据
                  console.log(value)
                  value.menute.forEach(valuete=>{
                    valuete.id===item.id?valuete.status=2:''
                  })
                })
              setTimeout(() => {
                this.$toast('下架成功')
              }, 500);
          
            }
          })
          break;
          case '删除':
          this.shopApi.goodsDelete({id:item.id}).then(res=>{
            if(res.data.status===1){
              setTimeout(() => {
                this.$toast('删除成功')
              }, 500);
          
            }
          })
          break;
          case '推荐':
          this.shopApi.goodsSetRecommend({id:item.id}).then(res=>{
            if(res.data.status===1){
              this.menu.forEach(value=>{  //假装改变状态，实际上还是原来的数据
                  console.log(value)
                  value.menute.forEach(valuete=>{
                    if(valuete.id===item.id){
                      valuete.isRecommend=true
                      this.menu[0].menute.push(valuete)
                      }
                  })
                })
              setTimeout(() => {
                this.$toast('推荐成功')
              }, 500);
          
            }
          })
          break;
           case '取消推荐':
          this.shopApi.goodsNotRecommend({id:item.id}).then(res=>{
            if(res.data.status===1){
              this.menu.forEach((value,index)=>{  //假装改变状态，实际上还是原来的数据
                  console.log(value)
                  value.menute.forEach(valuete=>{
                    if(valuete.id===item.id){
                      valuete.isRecommend=false
                      }
                  })
                })
                this.menu[0].menute.filter(value=>{
                  value.id!==item.id
                })
              setTimeout(() => {
                this.$toast('取消推荐成功')
              }, 500);
          
            }
          })
          break;
        default: //编辑

          break;
      }
    },
    sorts(onoff,index){  //排序开关
      
        this.menu[index].sort=!onoff
      
    },
    compile (index, inindex) { //编辑  index是子顺序，indexs是父顺序
      console.log(index, inindex)
      let action=[]

      const menute=this.menu[inindex].menute[index],
      compilebtn1={name:'编辑',id:menute.id},
      compilebtn2={name:'上架',id:menute.id},
      compilebtn3={name:'推荐',id:menute.id},
      compilebtn4={name:'删除',id:menute.id},
      compilebtn5={name:'下架',id:menute.id},
      compilebtn6={name:'取消推荐',id:menute.id}
      
      switch (menute.status) {
        case 1:
          menute.isRecommend?
          action.push(compilebtn1,compilebtn6,compilebtn5):
          action.push(compilebtn1,compilebtn3,compilebtn5);
          
          break;
        case 2:
          
          action.push(compilebtn4,compilebtn1,compilebtn2);
          
          break;
        default:
          break;
      }
      console.log(action)
      this.actions=action
      this.show=true
     

    }
  },
  computed: {

  },
   updated() {
    // console.log(this.menute)
    },
  mounted () {
    console.log(this.indexMenu)
    
    this.getCategory();
    
    
  },

  created(){
     if(this.indexMenu){
      this.menu=this.indexMenu.map(value=>{
            return{
              name:value.name,
              id:value.id,
              sort:false,
              menute:[]
            }
          })
          this.menu.unshift({
            name:'店铺推荐',
              id:'00000000',
              sort:false,
              menute:[]
          })
         
    }
  },
  beforeDestory () {
    this.$refs.categoryList.removeEventListener('scroll', this.scrollMenu);
  },
}
</script>

<style scoped lang="scss" type="text/scss">
.app-initte {
  width: 100%;
  height: calc(100vh - 44px);
  overflow: auto;
}
.van-popup.van-popup--right {
  z-index: 205000 !important;
}
.van-sidebar-item {
  padding: 10px 18px;
}
.van-sidebar-item /deep/ .van-sidebar-item__text {
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
.van-sidebar-item--select /deep/ .van-sidebar-item__text {
  color: #0095fd;
  font-weight: 800;
}

.van-sidebar-item--select {
  border-color: white;
  border-right: 1px solid #fff;
}
.van-sidebar {
  width: auto;
}
header {
  height: 48px;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
}
main {
  width: 100%;
  display: flex;
  background: #fff;
  // height: calc(100% - 48px);
  height:100%;
  aside {
    width: 85px;
    background: #f7f7f7;
    overflow-y: auto;
    height: 95%;
  }
  .aside-te {
    height: 5%;
    width: 85px;
    position: absolute;
    left: 0;
    bottom: 0;

    background: #fff;

    .aside-te-p {
      // margin-top: calc(50% - 12px);
      width: 65px;
      height: 26px;
      font-size: 12px;
      line-height: 26px;
      position: absolute;
      text-align: center;
      left: calc(50% - 32.5px);
      bottom: calc(50% - 13px);
      border: 1px solid #fff;
      border-radius: 12px;
      background: #0095fd;
      color: #fff;
    }
  }
  article {
    height: 100%;
    width: calc(100% - 85px);
    font-size: 30px;
    overflow-y: auto;
    ul {
      padding: 0 18px;
      li {
        margin-top: 18px;
        .article-item-header {
          max-width: 100%;
          font-size: 17px;
          color: #666660;
          background: #fff;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .sort {
            width: 30%;
            height: 100%;
            font-size: 12px;
            text-align: end;
            color: #999;
          }
        }
        dd {
          margin: 18px 0;
        }
      }
    }
  }
}
.checkgroup {
  display: flex;
  height: 80px;
}
.check {
  width: 50px;
  height: 30px;
  border: 1px solid #000;
  text-align: center;
}
.check-true {
  border-color: blue;
}
.check-false {
  border-color: black;
}
.checkgroup-bottom {
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.article-item {
  width: 100%;
  display: flex;
  .item-left {
    width: 72px;
    height: 72px;
    border-radius: 4px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .item-right {
    width: calc(100% - 81px);
    margin-left: 9px;
    position: relative;
    .item-title {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #333;
      margin-bottom: 5px;
      font-weight: 600;
    }
    .item-type {
      display: inline-block;
      font-size: 12px;
      line-height: 12px;
      transform: scale(0.8);
      padding: 4px 6px;
      border: 1px solid #000;
    }
    .item-type2 {
      display: inline-block;
      font-size: 12px;
      line-height: 12px;
      transform: scale(0.8);
      padding: 4px 6px;
      color: #666;
    }
    .item-bottom {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      margin-top: 5px;
      .item-money {
        font-size: 16px;
        color: #e9372f;
      }
      .item-price {
        font-size: 12px;
        color: #b2b2b2;
        text-decoration: line-through;
      }
    }
    .item-more {
      width: 44px;
      height: 100%;
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 16px;
      .item-moreclick {
        position: absolute;
        right: 0;
        bottom: 0;
      }
      .item-compile {
        position: absolute;
        width: 100px;
        right: 0;
        top: 100%;
        border: 1px solid #fff;
        border-radius: 4px;
        box-shadow: 0px 1px 8px 0px rgba(0, 18, 95, 0.2);
        background: #fff;
        z-index: 100;
        .item-compileli {
          font-size: 16px;
          line-height: 42px;
          text-align: center;
          border-bottom: 1px solid rgba(178, 178, 178, 0.5);
          color: #666;
        }
        .item-compileli:last-of-type {
          border: none;
        }
      }
    }
  }
  .item-rightte {
    width: 100%;
    margin-left: 0;
  }
}
dd{
  background: #fff;
}
</style>
