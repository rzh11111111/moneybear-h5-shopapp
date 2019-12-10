<template>
  <div class="app-initte">
    <header>
      消费者端显示商品/服务头像
      <van-switch v-model="checkeds" @input="onInput" size="20px" style="margin-left:15px;"/>
    </header>
    <main>
      <aside ref="categoryMenu">
        <van-sidebar :active-key="activeKey" @change="onChangeTab">
          <van-sidebar-item title="折扣服务"/>
          <van-sidebar-item v-for="(value,index) in menu" :key="index" :title="'我'+value.name" />
        </van-sidebar>
      </aside>
      <div class="aside-te" @click="tosetmenu">
        <p  class="aside-te-p">菜单管理</p>
      </div>
      <article ref="categoryList">
        
        <ul>
          <li  ref="item0">
            <h5 ref="itemHeader">折扣服务</h5>
            <dl>
              <dd v-for="(item,index) in menute" :key="index">
                  <div class="article-item">
                      <div class="item-left" v-if="item.img">
                          <img src="@/assets/img/msg.png"/>
                      </div>
                      <div :class="item.img?'item-right':'item-right item-rightte'">
                          <p class="item-title">dsdsdsds322dsdsdsd444sd</p>
                          <div class="item-type">上架中</div>
                          <div class="item-bottom">
                            <div class="item-money">￥1332.80</div>
                            <div class="item-price">￥1332.80</div>
                          </div>
                          <div  class="item-more" @click="compile(index)">
                            <p  class="item-moreclick">···</p>
                            <div class="item-compile" v-if="item.kaiguan">
                                <div class="item-compileli">编辑</div>
                                <div class="item-compileli">上架</div>
                                <div class="item-compileli">下架</div>
                                <div class="item-compileli">删除</div>
                            </div>
                          </div>
                      </div>
                  </div>
              </dd>
            </dl>
          </li>
          <li :ref="'item' + (index + 1)" v-for="(value,index) in menu" :key="index">
            <h5 ref="itemHeader">{{value.name}}</h5>
            <dl>
              <dd v-for="(item,inindex) in value.menute2" :key="inindex">
                  <div class="article-item">
                      <div class="item-left" v-if="item.img">
                          <img src="@/assets/img/msg.png"/>
                      </div>
                      <div :class="item.img?'item-right':'item-right item-rightte'">
                          <p class="item-title">dsdsdsds322dsdsdsd444sd</p>
                          <div class="item-type">上架中</div>
                          <div class="item-bottom">
                            <div class="item-money">￥1332.80</div>
                            <div class="item-price">￥1332.80</div>
                          </div>
                          <div  class="item-more" @click="compile(index,inindex)">
                            <p  class="item-moreclick">···</p>
                            <div class="item-compile" v-if="item.kaiguan">
                                <div class="item-compileli">编辑</div>
                                <div class="item-compileli">上架</div>
                                <div class="item-compileli">下架</div>
                                <div class="item-compileli">删除</div>
                            </div>
                          </div>
                      </div>
                  </div>
              </dd>
            </dl>
          </li>
        </ul>
      </article>
    </main>
  
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true,
      list: ['a', 'b', 'c'],
      result: ['a', 'b'],
      screen: {
        onoff: false
      },
      checkeds:true,//顶部开关
      activeKey: 0,
      menu: [  //左侧菜单
        {
          name: '第一',
          id: 222,
          img:false,
           menute2:[
          {
            name:321312,
            img:true,
            kaiguan:false,
            },{
            name:32111312,
            img:false,
            kaiguan:false,
            },{
            name:321312,
            img:true,
            kaiguan:false,
            }
      ],
        },
        {
          name: '第二',
          id: 333,
          img:true,
           menute2:[
          {
            name:321312,
            img:true,
            kaiguan:false,
            },{
            name:32111312,
            img:false,
            kaiguan:false,
            },{
            name:321312,
            img:true,
            kaiguan:false,
            }
      ],
        },
        {
          name: '第三',
          id: 333,
          img:true,
           menute2:[
          {
            name:321312,
            img:true,
            kaiguan:false,
            },{
            name:32111312,
            img:false,
            kaiguan:false,
            },{
            name:321312,
            img:true,
            kaiguan:false,
            }
      ],
        },
        {
          name: '第四',
          id: 333,
          img:true,
           menute2:[
          {
            name:321312,
            img:true,
            kaiguan:false,
            },{
            name:32111312,
            img:false,
            kaiguan:false,
            },{
            name:321312,
            img:true,
            kaiguan:false,
            }
      ],
        },
   /*      {
          name: 444,
          id: 333,
          img:true,
        },
        {
          name: 555,
          id: 333,
          img:true,
        },
        {
          name: 666,
          id: 333,
          img:true,
        },
        {
          name: 222,
          id: 333,
           img:false,
            kaiguan:false,
        },
        {
          name: 222,
          id: 333,
           img:false,
            kaiguan:false,
        },
        {
          name: 222,
          id: 333,
           img:false,
            kaiguan:false,
        },
        {
          name: 222,
          id: 333,
           img:false,
            kaiguan:false,
        },
        {
          name: 222,
          id: 333,
           img:false,
            kaiguan:false,
        },
        {
          name: 222,
          id: 333,
           img:false,
            kaiguan:false,
        },
        {
          name: 222,
          id: 333,
           img:false,
            kaiguan:false,
        },
        {
          name: 222,
          id: 333,
           img:false,
            kaiguan:false,
        },
        {
          name: 222,
          id: 333,
           img:false,
            kaiguan:false,
        },
        {
          name: 222,
          id: 333,
           img:false,
            kaiguan:false,
        } */
      ],
      menute:[
          {
            name:321312,
            img:true,
            kaiguan:false,
            },{
            name:32111312,
            img:false,
            kaiguan:false,
            },{
            name:321312,
            img:true,
            kaiguan:false,
            }
      ],
      contentItemHeight: [],
      itemHeader: 40,
      isClick: false,
    }
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
      console.log(this.$refs.categoryList.scrollTop,h)
      this.$refs.categoryList.scrollTop = h - 46 < 0 ? 0 : h-110;//46+17+18+18
      setTimeout(() => {
        this.isClick = false;
      }, 0);
    },
    getHeight () {
      let len = this.menu.length + 1;
      let arr = [];
      for (let i = 0; i < len; i++) {
        let el = this.$refs['item' + i];
        if (el instanceof Array) {
          el = el[0];
        }
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
    /* 两边自动拉伸 */
    toscreen () {
      this.screen.onoff = true
    },
    tosetmenu(){
      this.$router.push('/SetMenu')
    },
    onInput(){//开关事件
      
    },
    compile(index,inindex){ //编辑
    console.log(index,inindex)
      if(inindex!==undefined){
        if(this.menu[index].menute2[inindex].kaiguan==true){
          this.menu[index].menute2[inindex].kaiguan=false
          return
        }
        this.menu.forEach(value => {
          value.menute2.forEach(item=>{
            item.kaiguan=false
          })
        });
        this.menute.forEach(value=>{
          value.kaiguan=false
        })
        this.menu[index].menute2[inindex].kaiguan=true
      }else{
        if(this.menute[index].kaiguan==true){
          this.menute[index].kaiguan=false
          return
        }
        this.menu.forEach(value => {
          value.menute2.forEach(item=>{
            item.kaiguan=false
          })
        });
        this.menute.forEach(value=>{
          value.kaiguan=false
        })
        this.menute[index].kaiguan=true
      }
      
    }
  },
  computed: {

  },
  mounted () {
    this.getHeight()
    this.itemHeader = this.$refs.itemHeader.offsetHeight;
    console.log(this.$refs.categoryMenu.children[0])
    this.menuItemHeight = this.$refs.categoryMenu.children[0].offsetHeight / (this.menu.length + 1);
    this.$refs.categoryList.addEventListener('scroll', this.scrollMenu);
  },
  beforeDestory () {
    this.$refs.categoryList.removeEventListener('scroll', this.scrollMenu);
  },
}
</script>

<style scoped lang="scss" type="text/scss">
.app-initte{
  width: 100%;
  height: calc(100vh - 44px);
  overflow: auto;
}
.van-popup.van-popup--right{
  z-index: 205000 !important;
}
.van-sidebar-item{
  padding: 10px 18px;
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
header{
  height: 48px;
  background: #F7F7F7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
}
main{
  width: 100%;
  display: flex;
  background: #fff;
  height: calc(100% - 48px);
  
  aside{
    width: 85px;
    background: #F7F7F7;
    overflow-y:auto; 
    height: 95%;
  }
  .aside-te{
    height: 5%;
    width: 85px;
    position: absolute;
    left: 0;
    bottom: 0;
    
    background: #fff;
    
    .aside-te-p{
// margin-top: calc(50% - 12px);
width: 65px;
height: 26px;
font-size: 12px;
line-height: 26px;
position: absolute;
text-align: center;
left:calc(50% - 32.5px);
bottom: calc(50% - 13px);
border: 1px solid #fff;
border-radius: 12px;
background: #0095FD;
color: #fff;
    }
  }
  article{
    height: 100%;
    width: calc(100% - 85px);
    font-size: 30px;
    overflow-y: auto;
    ul{
      padding: 0 18px;
      li{
        margin-top: 18px;
        h5{
                max-width: 100%;
                font-size: 17px;
                color: #666;
                overflow: hidden;
            white-space: nowrap;
          text-overflow: ellipsis;
        }
        dd{
          margin: 18px 0;
        }
      }
     
    }
  }
}
.checkgroup{
  display:flex;
  height: 80px;
}
.check{
  width: 50px;
  height: 30px;
  border: 1px solid #000;
  text-align: center;
}
.check-true{
  border-color: blue;
}
.check-false{
  border-color: black;
}
.checkgroup-bottom{
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.article-item{
  width: 100%;
  display: flex;
  .item-left{
    width: 72px;
    height: 72px;
    border-radius:4px;
    
    img{
      width: 100%;
      height: 100%;
    }
  }
  .item-right{
    width: calc(100% - 81px);
     margin-left: 9px;
     position: relative;
    .item-title{
      width: 100%;
       overflow: hidden;
    white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #333;
  margin-bottom: -9px;
  font-weight: 600;
    }
    .item-type{
      display: inline-block;
      font-size: 12px;
      line-height: 12px;
      transform:scale(0.8);
      padding: 4px 6px;
      border:1px solid #000;
    }
    .item-bottom{
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      .item-money{
        font-size: 16px;
        color: #E9372F;
      }
      .item-price{
        font-size: 12px;
        color: #B2B2B2;
        text-decoration:line-through;
      }
    }
    .item-more{
      width: 44px;
      height: 100%;
      position: absolute;
      right: 0;
      bottom: 0;
        font-size: 16px;
        .item-moreclick{
          position: absolute;
          right: 0;
          bottom: 0;
        }
        .item-compile{
          position: absolute;
          width: 100px;
          right: 0;
          top: 100%;
          border: 1px solid #fff;
          border-radius: 4px;
          box-shadow:0px 1px 8px 0px rgba(0,18,95,0.2);
          background: #fff;
          z-index: 100;
          .item-compileli{
            font-size: 16px;
            line-height: 42px;
            text-align: center;
            border-bottom: 1px solid rgba(178, 178, 178, .5);
            color: #666;
          }
           .item-compileli:last-of-type{
                border: none;
            }
        }
      }
  }
  .item-rightte{
    width: 100%;
    margin-left: 0;
  }
}
</style>
