<template>
    <div class="addGoods">
        <top-column :top-header="topHeader"></top-column>
        <van-cell-group title="基本信息">
            <van-field
                    v-model="postData.title"
                    required
                    clearable
                    :label="`${currentType.nameLabel}名称`"
                    placeholder="最多x个字"
                    @click-right-icon="$toast('question')"
            >

                <!--<p slot="button" style="color:dodgerblue" @click="$router.push({name: 'fixImage'})">商品库选择</p>-->
            </van-field>
            <van-cell
                    value-class="cellClass"
                    v-model="postData.storeSellCategory.name"
                    required
                    clearable
                    title="所属菜单"
                    is-link
                    placeholder="请选择"
                    @click="menuSelect = true"
                    @click-right-icon="$toast('question')"
            />
            <van-field
                    v-if="routeName === 'addGoods'"
                    v-model="postData.barCode"
                    clearable
                    label="条码"
                    placeholder="请输入条码"
            >
                <img slot="button" src="@/assets/img/saoma.png" style="width:20px;height: 20px"  @click="getCodes"/>
            </van-field>

                <van-field
                        v-model="postData.code"
                        clearable
                        label="自编码"
                        placeholder="不填则自动生成"
                />
            <van-field
                    v-model="postData.unit"
                    clearable
                    label="单位"
                    :placeholder="`默认:${currentType.unit}`"
            />
            <van-cell
                    :title="`${currentType.nameLabel}头像`"
                    value="尺寸100x100。可编辑"
            />
            <div class="imgBox">
                <uploadImg v-model="postData.picMinUrl" :isSimple="true"></uploadImg>
            </div>
        </van-cell-group>
        <van-cell-group title="规格/售价">
            <van-cell title="规格">
                <van-row type="flex">
                    <van-row type="flex" align="center">
                        <input type="radio" @change="isSimple = 1" name="spec" :checked="isSimple === 1"><span>单规格</span>
                    </van-row>
                    <van-row type="flex" align="center">
                        <input type="radio" @change="isSimple = 2" name="spec" style="margin-left:15px;" :checked="isSimple === 2"><span>多规格</span>
                    </van-row>
                </van-row>
            </van-cell>
            <template v-if="isSimple==1">
                <van-field
                        v-model="simpleSpec.name"
                        clearable
                        label="规格名称"
                        placeholder="请输入"
                />
                <van-field
                        v-model="simpleSpec.skuPriceSell"
                        type="number"
                        clearable
                        required
                        :label="`${currentType.nameLabel}售价`"
                        placeholder="0.00"
                />
                    <van-field
                            v-model="simpleSpec.skuPrice"
                            type="number"
                            clearable
                            :label="`划线价`"
                            placeholder="不填则不显示划线价"
                    >
                        <p slot="button">元</p>
                    </van-field>

            </template>
            <template v-else>
                <div v-for="(item, index) in postData[currentType.apiSkuText]" :key="index+'spec'">
                    <p class="specTitle">规格{{index+1}}</p>
                    <van-row type="flex" justify="start">
                        <van-row type="flex" align="center" jusity="center" @click.native="deleteSpec(index)" class="deleteBox">删除
                        </van-row>
                        <div>
                            <van-field
                                    v-model="item.name"
                                    clearable
                                    required
                                    label="规格名称"
                                    placeholder="请输入"
                            />
                            <van-field
                                    v-model="item.skuPriceSell"
                                    type="number"
                                    clearable
                                    required
                                    :label="`${currentType.nameLabel}售价`"
                                    placeholder="请输入"
                            >
                            </van-field>
                            <van-field
                                    v-model="item.skuPrice"
                                    type="number"
                                    clearable
                                    :label="`${currentType.nameLabel}划线价`"
                                    placeholder="请输入"
                            >
                            </van-field>
                        </div>
                    </van-row>
                </div>
                <div class="addSpecBox" @click="addSpec">添加规格</div>
            </template>
        </van-cell-group>
        <van-cell
                v-if="routeName === 'addGoods'"
                title="商品品牌"
                value="请选择"
                is-link
                @click.native="openBrand"
                v-model="postData.cloudBrand.name"
                style="margin:10px 0"
        />
        <van-cell-group title="详情描述">

            <div class="lines"></div>
            <van-field
                    label="使用规则"
                    v-model="postData.shortInfo"
                    required
                    type="textarea"
                    placeholder="请输入"
                    autosize
                    style="align-items: flex-start"
            />
            <van-row type="flex" class="specTagBox" align="center">
                <p class="font13">推荐标签</p>
                <div>
                    <span class="tag" :class="{selectTag: postData.tag === index+1}" v-for="(item,index) in ['活动','促销','热卖']" :key="item" @click="postData.tag = index+1">{{item}}</span>
                </div>
            </van-row>
        </van-cell-group>
        <van-cell-group title="设置">
            <van-cell title="上架" >
                <!--已被禁售-->
                <van-switch-cell v-model="postData.status" :active-value="1" :inactive-value="0" :disabled="postData.isEnable === 1"/>
            </van-cell>
            <van-cell title="店铺推荐">
                <van-switch-cell v-model="postData.isRecommend" :active-value="1" :inactive-value="0" />
            </van-cell>
            <van-cell title="是否需要预约" >
                <van-switch-cell v-model="postData.isPlace" :active-value="1" :inactive-value="0" />
            </van-cell>
        </van-cell-group>
        <van-row type="flex" v-if="$route.query.id" justify="space-around" style="padding:10px;">
            <van-button type="primary" @click.native="save">保存</van-button>
            <van-button plain @click="deleteMt" style="background: gainsboro">删除</van-button>
        </van-row>
        <van-button v-else type="primary" size="large" @click.native="save">保存</van-button>
        <!--菜单选择弹出-->
        <template class="menuPop">
            <van-popup v-model="menuSelect" position="right" :overlay="false">
                <allMenus @select="selectMenu" v-if="menuSelect"></allMenus>
            </van-popup>
        </template>
        <!--品牌选择弹出-->
        <template class="brandPop">
            <van-popup v-model="brandSelect" position="right" :overlay="false">
                <chooseBrand @select="selectBrand" v-if="brandSelect"></chooseBrand>
            </van-popup>
        </template>
    </div>
</template>

<script>
    const routeData = {
        addGoods: {
            nameLabel: '商品',
            apiType: 'addGoods',
            apiDetail: 'goodsDetail',
            apiDelete: 'deleteGoods',
            unit: '件',
            headerTitle: '新增商品',
            apiSkuText: 'storeGoodsSkuList' // 不同sku区别
        },
        addService: {
            nameLabel: '服务',
            apiType: 'service',
            apiDetail: 'serverDetail',
            apiDelete: 'deleteServer',
            unit: '次',
            headerTitle: '新增服务',
            apiSkuText: 'storeServerSkuList'
        },
    };
    import uploadImg from '@/components/uploadImg/uploadImg'
    import {validateForm, getCode} from "../../../../utils";
    import allMenus from '@/components/chooseMenus/allMenus';
    import chooseBrand from '@/components/chooseBrand/chooseBrand'
    export default {
        components: {
            uploadImg,
            allMenus,
            chooseBrand,
        },
        name: "addGoods",
        data() {
            return {
                menuSelect: false,
                brandSelect: false,
                currentType: {},
                topHeader: {
                    name: '新增商品',
                    left: "2",
                    right1: "",
                    heade: "header1"
                },
                postData: {
                    barCode: '',
                    sourceType: 1,
                    logisticsType: 2,
                    isInvoice: 0,
                    code: '',
                    isReturn: 0,
                    isEnable: 0,
                    isRepair: 0,
                    isRecommend: 0,
                    unit: '',
                    picMinUrl: [],// 头图
                    tag: 1,
                    status: 1,
                    isPlace: 0,
                    sortNum: 0,
                    shortInfo: '',
                    title: '',
                    storeSellCategory:{
                        id: '',
                        name: ''
                    },
                    cloudBrand: {
                        id: '3ce2b789e0a94e5aaf979076d44a67c2',
                        name: ''
                    },
                    store: {
                        id: this.session.$getSessionStorageByName('storeId')
                    }
                },
                simpleSpec: {
                    name: '',
                    skuPriceSell: '',
                    sortNum: 1
                },
                isSimple: 1,
                describe: '',
                checked: false,
                routeName: this.$route.name,
                brandList: [],
            }
        },
        created() {
            if(this.$route.query.id) {
                // 进入获取详情
                this.currentType = {...routeData[this.routeName],headerTitle: routeData[this.routeName].nameLabel+'编辑'};
                this.getDetail();
            } else {
                this.currentType = routeData[this.routeName];
                const arr = [{ name: '', skuPriceSell: '' ,sortNum: 1}];
                this.$set(this.postData,this.currentType.apiSkuText,arr);
            }

            this.topHeader.name = this.currentType.headerTitle;
        },
        mounted(){
            window['shopappGetscan'] = (val)=> {

                // this.$set(this.postData, 'barCode', val)
                this.postData.barCode = val;
            };
        },
        methods: {
            getCodes() {
                getCode()
            },
            deleteMt() {
                this.$dialog.confirm({
                    title: '删除',
                    message: `是否确认删除当前${this.currentType.nameLabel}`
                }).then(() => {
                    // on confirm
                    this.Api[this.currentType.apiDelete]({id: 'd8cd14058900486697e302a0690590f3'}).then(res => {
                        if(res.data.status === 1) {
                            this.$toast('删除成功');
                            this.$router.go(-1)
                        } else {

                        }
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            // 套餐详情图片
            getMealImg(val) {
                console.log(val);
            },
            getDetail() {
                this.Api[this.currentType.apiDetail]({ id: this.$route.query.id }).then(res => {
                    if(res.data.status==1) {
                        this.postData = res.data.data;
                        this.isSimple = 2;
                        // if(this.postData[this.currentType.apiSkuText].length > 1) {
                        //
                        // }
                    } else {

                    }
                })
            },
            openBrand() {
                this.brandSelect = true;
                // 获取品牌接口

            },

            // 选择菜单
            selectMenu(data) {
                this.menuSelect = false;
                if(data) {
                    this.postData.storeSellCategory = data;
                }
            },
            // 选择品牌
            selectBrand(data) {
                this.brandSelect = false;
                if(data) {
                    this.postData.cloudBrand = data;
                    console.log(data);
                }
            },
            save() {
                const { title, storeSellCategory:{ name }, shortInfo, picMinUrl } = this.postData;
                if(validateForm({ title, name, shortInfo }, this)){
                    if(this.isSimple === 1) {
                        this.postData[this.currentType.apiSkuText] = [this.simpleSpec];
                    }
                    if(this.postData.unit === '') {
                        this.postData.unit = this.currentType.unit;
                    }
                    const id = this.$route.query.id || '';
                    this.postData.id = id;
                    this.Api[this.routeName]({...this.postData, picMinUrl: picMinUrl[0]}).then(res => {
                        if(res.data.status === 1) {
                            this.$toast(`${id ? '保存' : '添加'}成功`)
                        }
                        console.log(res);
                    })
                }
            },
            changeImg(val) {
                console.log(555);
                console.log(val);
                this.postData.picMinUrl = val[0];
            },
            addSpec() {
                this.postData[this.currentType.apiSkuText].push({
                  name: '',
                  skuPriceSell: 20,
                  sortNum: this.postData[this.currentType.apiSkuText].length+1
              })
            },
            deleteSpec(index) {
                this.postData[this.currentType.apiSkuText].splice(index, 1)
            },
        }
    }
</script>

<style scoped lang="scss">
    .addGoods {
        /*background: grey;*/
    }
        .van-popup{
            z-index: 30000 !important;
        }
    .van-radio {
        justify-content: flex-end;
    }
    .van-cell-group{
        margin-top: 0 !important;
    }
    .van-cell-group__title {
        position: relative;
        color: black;
        background: white;
        padding-bottom:15px;
        box-sizing: border-box;
        &:before {
            content: '';
            position: absolute;
            left: 7px;
            top: 35%;
            width: 2px;
            height: 34%;
            background: #008EFC;
        }
    }

    .specTitle {
        padding: 10px 15px;
        background: rgba(229, 229, 229, 0.34);
    }

    .deleteBox {
        padding: 0 20px;
    }

    .addSpecBox {
        padding: 10px 0;
        background: white;
        text-align: center;
        margin: 15px 0;
        border-top: 1px solid rgba(229, 229, 229, 0.34);
        border-bottom: 1px solid rgba(229, 229, 229, 0.34);
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
            margin: 0 15px;
        }
        .tag:nth-of-type(1){
            margin-left: 30px;
        }
    }

    #preloadingAnimation {
        display: none;
    }
    .selectTag{
        border:1px solid #1296db !important;
        position: relative;
        background: url("../../../../assets/img/select.png") no-repeat;
        background-position: -1px -1px;
        background-size: 10px 10px;
        color: #1296db !important;
    }
.imgBox{
    margin-left: 85px;
}

    .van-radio__label{
        font-size: 14px;
    }
    .van-cell__value{
        color: #969799;
        display: block !important;
    }


</style>
