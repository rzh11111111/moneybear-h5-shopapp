<template>
    <keep-alive>
        <div class="app-initte">
            <top-column ref="topheaders" :top-header="topheader" @clicktabs="clicktabs"
                        :goBackMt="selectEnd"></top-column>
            <header>
                不显示平台禁售的商品服务
            </header>
            <main>
                <aside ref="categoryMenu">
                    <van-sidebar :active-key="activeKey" @change="onChangeTab">
                        <van-sidebar-item v-for="(item,index) in typeList" :key="index" :title="item.name"/>
                    </van-sidebar>
                </aside>
                <article ref="categoryList">
                    <ul>
                        <div ref="itemHeader"></div>
                        <li :ref="'item' + (index)" v-for="(item,index) in menu" :key="index">
                            <b style="color:#666660" v-if="item.menute2 && item.menute2.length">{{item.name}}</b>
                            <dl>
                                <dd v-for="(sitem,sindex) in item.menute2" :key="sindex">
                                    <div class="article-item">
                                        <div class="item-left" v-if="sitem.picMinUrl">
                                            <img :src=sitem.picMinUrl style="object-fit: cover;"/>
                                            <span class="spanner" v-if="sitem.tag === 1">热卖</span>
                                            <span class="spanner" v-else-if="sitem.tag === 2">活动</span>
                                            <span class="spanner" v-else>促销</span>
                                        </div>
                                        <div :class="sitem.picMinUrl?'item-right':'item-right item-rightte'">
                                            <p class="item-title">{{sitem.title}}</p>
                                            <!--<van-row type="flex" align="center">-->
                                                <!--<div class="item-money">￥{{sitem.skuPriceMin}}</div>-->
                                                <!--<div class="item-price" v-if="sitem.skuPriceMin">￥{{sitem.skuPriceSellMin}}</div>-->
                                            <!--</van-row>-->

                                                <!--<div class="item-money">￥1332.80</div>-->
                                            </div>
                                        <!--</div>-->
                                    </div>
                                    <div class="item-bottom">
                                        <p v-if="sitem.status === 1">上架中</p>
                                        <p v-else>下架中</p>
                                        <div class="selectBox" @click="sitem.status === 1 && getDetail(sitem)" :class="{'disSelectBox': sitem.status === 2}">
                                            选规格
                                            <transition name="shop_cart">
                                                <span class="circular" v-if="isSelectNumList[sitem.id]">{{isSelectNumList[sitem.id]}}</span>
                                            </transition>
                                        </div>
                                        <!--<div class="item-price">￥1332.80</div>-->
                                    </div>
                                </dd>
                            </dl>
                        </li>
                        <div style="height:70px"></div>

                    </ul>
                </article>

            </main>
            <van-row type="flex" align="center" justify="space-around" class="cartsBox">
                    <div style="position: relative">
                        <img src="@/assets/img/carts.png" alt="" @click="cartShow = true">
                        <span class="circular">{{totalNum}}</span>
                    </div>
                <p>合计：<span class="redcolor">￥{{totalMoney}}</span></p>
                <van-button type="primary" :hairline="true" @click="selectEnd" :disabled="cartsData.length === 0">选好了</van-button>
            </van-row>
            <van-dialog
                    v-model="specShow"
                    title="选规格"
                    show-cancel-button
                    @confirm="addSpec"
            >
                <van-row type="flex" class="specTagBox" align="center" justify="space-around" >
                    <div v-if="currentSpec" style="padding: 10px;">
                        <span class="tag" :class="{selectTag: tag === index+1}" v-for="(item,index) in currentSpec"
                              :key="index" @click="!item.selectNum ? tag = index+1 : ''">{{item.name}}
                        <span class="circular" v-if="item.selectNum">{{item.selectNum}}</span>
                        </span>
                        <p v-if="currentSpec[tag-1]" style="margin-top: 20px;text-align: center">价格：<span class="redcolor">￥{{currentSpec[tag-1].skuPriceSell}}</span></p>
                    </div>
                </van-row>
                <!--<van-stepper v-model="number"/>-->
            </van-dialog>
            <van-popup
                    v-model="cartShow"
                    position="bottom"
                    :style="{ bottom: 82 }"
            >
                <van-row type="flex" justify="space-between" class="selectBox_title">
                    <p>已选商品/服务</p>
                    <p class="bluecolor" @click="clear">清空</p>
                </van-row>
                <van-row v-for="(item, index) in cartsData" :key=index type="flex" justify="space-between"
                         class="selectSimple">
                    <div>
                        <p>
                            <span v-if="item.type === 1">[商品]</span>
                            <span v-else>[服务]</span>
                            {{item.name}}
                        </p>
                        <p>
                        <span>{{item.specName}}</span>
                        <span>￥{{item.specPrice}}</span>
                        </p>
                    </div>
                    <div class="input_step">
                        <button class="van-stepper__minus" @click="item.number--,changeNumber(item, index)"></button>
                        <input type="number" v-model="item.number" role="spinbutton" aria-valuemax="Infinity" aria-valuemin="0" aria-valuenow="1" class="van-stepper__input">
                        <button class="van-stepper__plus" @click="item.number++,changeNumber(item, index)"></button>
                    </div>
                </van-row>
                <div style="height: 76px"></div>
                <van-row type="flex" align="center" justify="space-around" class="cartsBox">
                    <div style="position: relative" @click="cartShow = true">
                        <img src="@/assets/img/carts.png" alt="">
                        <span class="circular">{{totalNum}}</span>
                    </div>
                    <p>合计：<span class="redcolor">￥{{totalMoney}}</span></p>
                    <van-button type="primary" :hairline="true" @click="selectEnd" :disabled="cartsData.length === 0">选好了</van-button>
                </van-row>
            </van-popup>
        </div>
    </keep-alive>

</template>

<script>

    export default {
        data() {
            return {
                isSelectNumList: {}, // 存储已经被加入到购物车商品对应的数量{id:num},key为商品id,可使循环商品时绑定显示当前数量
                isChangeActive: 1, // update更新控制是否重新加载函数代码
                totalNum: 0,
                totalMoney: 0,
                cartsData: [],
                active: 'goodsList',
                topheader: {
                    name: "商品",
                    left: "2",
                    heade: "header1",
                    headerte: [
                        '选择商品',
                        '选择服务',
                    ]
                },
                specShow: false,
                cartShow: false,
                activeKey: 0,
                menu: [],
                typeList: [],
                contentItemHeight: [],
                itemHeader: 40,
                isClick: false,
                tag: 0,
                addShow: false, // 动画控制
                currentSpec: [],
                currentGoods: {}
            }
        },
        components: {
        },
        methods: {
            // 确认添加某规格商品
            addSpec() {
                if(!this.currentSpec[this.tag - 1]) {
                    return this.$toast('请选择规格！');
                }
                const item = this.currentGoods;
                const specItem = this.currentSpec[this.tag - 1];
                if(this.isSelectNumList[item.id]) {
                    this.isSelectNumList[item.id] += 1;
                } else {
                    this.isSelectNumList[item.id] = 1;
                }
                this.cartsData.push({
                    code: item.code,
                    type: this.active === 'goodsList' ? 1 : 2,
                    number: 1,
                    contentId: item.id,
                    name: item.title,
                    specName: specItem.name,
                    specPrice: specItem.skuPriceSell,
                    specId: specItem.id
                });
                this.totalNum += 1;
                this.totalMoney += specItem.skuPriceSell;
                this.tag = -2;
            },
            // 加入购物车动效
            addShopCart() {
                this.addShow = true
                // 添加类名的方法没有动画结束的时机,这里我直接写了一个定时器,时机和动画时间一致,在图片移动到购物车位置时隐藏
                setTimeout(() => {
                    this.addShow = false
                }, 1000)
            },
            clear() {
                this.$dialog.confirm({
                    title: '清空',
                    message: `是否确认清空当前购物车？`
                }).then(() => {
                    // on confirm
                    this.cartsData = [];
                    this.isSelectNumList = {};
                    this.totalNum = 0;
                }).catch(() => {
                    // on cancel
                });
            },
            selectEnd() {
                this.$emit('select', {data: this.cartsData, totalNum: this.totalNum, totalMoney: this.totalMoney});
            },
            getDetail(item) {
                this.currentGoods = item;
                let obj = {};
                if(this.active === 'goodsList') {
                    obj = {api: 'goodsDetail', skuText: 'storeGoodsSkuList'};
                } else {
                    obj = {api: 'serverDetail', skuText: 'storeServerSkuList'};
                }
                this.Api[obj.api]({ id: item.id }).then(res => {
                    if(res.data.status==1) {
                        this.specShow = true;
                        // 选择规格时查看是否有部分规格已被选中
                        res.data.data[obj.skuText].map(item => {
                            this.cartsData.map(cartsItem => {
                                if(item.id === cartsItem.specId) {
                                    item.selectNum  = cartsItem.number;// 标记被选中的规格，以是否有数量为基准
                                }
                            })
                        });
                        this.currentSpec = res.data.data[obj.skuText];
                    } else {

                    }
                })
            },
            // deleteMt(index) {
            //     if(this.cartsData[index].number === 0)
            //     this.cartsData.splice(index, 1);
            //     let total = 0;
            //     let totalMoney = 0;
            //     this.cartsData.map(item => {
            //         total = total + item.number;
            //         totalMoney = totalMoney + parseFloat((item.number * item.specPrice).toFixed(2))
            //     })
            //     this.totalNum = total;
            //     this.totalMoney = totalMoney;
            //     this.isSelectNumList[Item.contentId] = Item.number;
            // },
            // 切换数量
            changeNumber(Item, index) {
                if(Item.number === 0) {
                    // this.cartsData[index+1].number = 1;
                    this.cartsData.splice(index, 1);
                }
                let total = 0;
                let totalMoney = 0;
                this.cartsData.map(item => {
                total = total + item.number;
                totalMoney = totalMoney + parseFloat((item.number * item.specPrice).toFixed(2))
                })
                this.totalNum = total;
                this.totalMoney = totalMoney;
                this.isSelectNumList[Item.contentId] = Item.number;
            },
            clicktabs(value) {
                let oldActive = this.active;
                const newActive = value === 0 ? 'goodsList' : 'serverList';
                if (newActive !== oldActive) {
                    this.isChangeActive = 1
                }
                this.active = newActive;
                this.goodsList(this.typeList);
            },
            /* 两边自动拉伸 */
            onChangeTab(index) {
                this.isClick = true;
                this.activeKey = index;
                let el = this.$refs['item' + index];
                if (el instanceof Array) {
                    el = el[0];
                }
                let h = el.offsetTop;
                this.$refs.categoryList.scrollTop = h - 46 < 0 ? 0 : h - 110;//46+17+18+18
                setTimeout(() => {
                    this.isClick = false;
                }, 0);
            },
            getHeight() {
                let len = this.menu.length;
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

            scrollMenu() {
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
            goodsList() {
                this.Api[this.active]({
                    store: {
                        id: this.session.$getSessionStorageByName('storeId')
                    },
                    isEnable: 0
                }).then(res => {
                    if (res.data.status === 1) {
                        let data = res.data.data.list || res.data.data;
                        let i = 0;
                        // let specPriceArr = [];
                        this.menu.map((item, index) => {
                            this.$set(this.menu[index], 'menute2', []);
                            data.map((sitem, sindex, array) => {
                                // sitem.storeServerSkuList && sitem.storeServerSkuList.map(specItem => {
                                //     specPriceArr.push(specItem.skuPriceSell);
                                // });
                                // item.menute2.priceRound = Math.min(...specPriceArr)+'-'+Math.max(...specPriceArr);
                                if (index == 0 && item.id === '110' && sitem.isRecommend === 1) {
                                    item.menute2.push(sitem);
                                    array.splice(sindex, 1);
                                    return 0;
                                }
                                if (sitem.storeSellCategory.id === item.id) {
                                    item.menute2.push(sitem);
                                    array.splice(sindex, 1);
                                }

                            });
                            // 匹配最上方所属的菜单
                            if(i === 0 && this.menu[index].menute2.length > 0) {
                                this.activeKey = index;
                                i = 1;
                            }
                        });
                    }
                })
            },
            sellCategoryList() {
                this.Api.sellCategoryList({
                    id: this.session.$getSessionStorageByName('storeId')
                }).then(res => {
                    if (res.data.status === 1) {
                        res.data.data.unshift({name: '店铺推荐', id: '110',});
                        this.typeList = res.data.data;
                        this.menu = res.data.data;
                        this.goodsList();
                    }
                })
            }
        },
        beforeUpdated() {
            // if(this.isChangeActive === 1) {

            this.getHeight();
            this.itemHeader = this.$refs.itemHeader.offsetHeight;
            this.menuItemHeight = 40;
            this.isChangeActive = 0;
            // }
        },
        mounted() {
            this.$refs.categoryList.addEventListener('scroll', this.scrollMenu);
        },
        beforeDestory() {
            this.$refs.categoryList.removeEventListener('scroll', this.scrollMenu);
        },
        created() {
            this.sellCategoryList();
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
    /* CSS类名实现 */
    .shop_cart-enter-active {
        transition: all 1s ease-out;
    }

    .shop_cart-enter {
        opacity: 0;
        transform: scale(.5);
        transform: translate(-610px, 100px);
    }

    .selectBox_title {
        padding: 15px;
        border-bottom: 1px solid lightgrey;
    }

    .selectSimple {
        padding: 15px;
        border-top: 1px solid lightgrey;
    }

    .cartsBox {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: white;
        padding: 10px;
        z-index: 2029;

        img {
            width: 35px;
            height: 35px;
        }
    }

    .selectTag {
        border: 1px solid #1296db !important;
        position: relative;
        background: url("../../../../assets/img/select.png") no-repeat;
        background-position: -1px -1px;
        background-size: 10px 10px;
        color: #1296db !important;
    }

    .specTagBox {
        padding: 10px 15px;
        font-size: 14px !important;

        .tag {
            display: inline-block;
            padding: 5px 14px;
            border: 1px solid gray;
            border-radius: 3px;
            color: gray;
            font-size: 12px;
            margin: 0 10px;
            position: relative;
        }

        .tag:nth-of-type(1) {
            margin-left: 10px;
        }
    }
    .disSelectBox {
        background: #999999 !important;
    }
    .selectBox {
        color: dodgerblue;
        border: 1px solid dodgerblue;
        display: inline-block;
        padding: 3px 5px;
        font-size: 13px;
        position: relative;
    }

    .circular {
        border-radius: 50%;
        background: #FF3232;
        width: 15px;
        font-size: 10px;
        height: 15px;
        color: white;
        display: inline-block;
        position: absolute;
        text-align: center;
        line-height: 15px;
        right: -7.5px;
        top: -7.5px;
    }

    .skuBox {
        display: inline-block;
        padding: 10px;
        border: 1px solid darkgrey;
    }

    .app-initte {
        width: 100%;
        height: 100vh;
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
        padding:20px 15px;
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
            /*font-size: 30px;*/
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

    .item-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;


    }
    .item-money {
        font-size: 16px;
        color: #e9372f;
    }

    .item-price {
        font-size: 12px;
        color: #b2b2b2;
        text-decoration: line-through;
    }
    .article-item {
        width: 100%;
        display: flex;

        .item-left {
            width: 60px;
            height: 60px;
            border-radius: 4px;
            position: relative;

            .spanner {
                padding: 2px;
                font-size: 10px;
                color: white;
                background: #999999;
                position: absolute;
                top: 0;
                left: 0;
            }

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

    dd {
        background: #fff;
    }
    /*.priceBox{*/
        /*.item-money {*/
            /*font-size: 16px;*/
            /*color: #e9372f;*/
        /*}*/
        /*.item-price {*/
            /*font-size: 12px;*/
            /*color: #b2b2b2;*/
            /*text-decoration: line-through;*/
        /*}*/
    /*}*/
</style>
