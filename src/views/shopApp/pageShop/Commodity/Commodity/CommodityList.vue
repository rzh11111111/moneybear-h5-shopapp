<template>
<div>
  <dl v-if="sortte">
      <vuedraggable class="wrapper" v-model="menu">
        <transition-group>

          <dd v-for="(item,index) in menu" :key="index">
            <div class="article-item">
              <div class="item-left" v-if="item.picMinUrl">
                <img :src='item.picMinUrl' />
              </div>
              <div :class="item.picMinUrl?'item-right':'item-right item-rightte'">
                <p class="item-title">{{item.title}}</p>
                <div style="display:flex;align-items: flex-end;">
                  <div class="item-type">{{item.status==1?'上架':item.status==2?'下架':'售完'}}</div>
                  <div  class="item-type2">{{item.tag==1?'活动':item.tag==2?'促销':item.tag==3?'热卖':' '}}</div>
                </div>

                <div class="item-bottom">
                  <div class="item-money">￥{{item.skuPriceSellMin}}</div>
                  <div class="item-price" v-if="item.skuPriceMin">￥{{item.skuPriceMin}}</div>
                </div>
                <div class="item-more">
                  <p class="item-moreclick"><svg-icon icon-class="sort" /></p>
                </div>
              </div>
            </div>
          </dd>

      </transition-group>
    </vuedraggable>
  </dl>
  <dl v-else>
  <dd v-for="(item,index) in menu" :key="index">
      <div class="article-item" @click="$router.push({name: 'addGoods', query: {id: item.id}})">
          <div class="item-left" v-if="item.picMinUrl">
              <img :src="item.picMinUrl"/>
          </div>
          <div :class="item.picMinUrl?'item-right':'item-right item-rightte'">
              <p class="item-title">{{item.title}}</p>
              <div style="display:flex;align-items: flex-end;">
              <div class="item-type">{{item.status==1?'上架':item.status==2?'下架':'售完'}}</div>
              <div  class="item-type2">{{item.tag==1?'活动':item.tag==2?'促销':item.tag==3?'热卖':' '}}</div>
            </div>
              <div class="item-bottom">
                <div class="item-money">￥{{item.skuPriceSellMin}}</div>
                <div class="item-price" v-if="item.skuPriceMin">￥{{item.skuPriceMin}}</div>
              </div>
              <div  class="item-more" @click.stop="compile(index,indexs)">
                <p  class="item-moreclick">···</p>
                <!-- <div class="item-compile" v-show="item.kaiguan">
                    <div class="item-compileli">编辑</div>
                    <div class="item-compileli">上架</div>
                    <div class="item-compileli">下架</div>
                    <div class="item-compileli">删除</div>
                </div> -->
              </div>
          </div>
      </div>
  </dd>
</dl>
</div>

</template>

<script>
import vuedraggable from 'vuedraggable';
  export default {
      props: {
    menute:{
                type:Array,
    },
    sortte:{
      type:Boolean
    },
    indexs:{
      type:Number
    }
  },
    data () {
      return {
        menu:[],
        sort:false
      }
    },
    components: {
      vuedraggable,
    },
    methods: {
      compile(index,indexs){
        this.$emit('compile',index,indexs)
      }
    },
    computed: {
      
    },
    watch:{
      // 'menute'(){
        // this.menu=this.menute
      // }
    },
    mounted(){

        // console.log('11')
        // this.$parent.moveHeight()
    },
    created(){
      this.menu=this.menute
        this.sort=this.sortte
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
main {
  width: 100%;
  display: flex;
  background: #fff;
  height: calc(100% - 48px);

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
