<template>
    <div class="addGoods">
        <top-column :top-header="topHeader"></top-column>
        <!--<van-uploader-->
                <!--v-model="fileList"-->
                <!--multiple-->
                <!--:max-count="2"-->
        <!--/>-->
        <van-cell-group title="基本信息">
            <van-field
                    v-model="postData.name"
                    required
                    clearable
                    label="套餐名称"
                    placeholder="最多x个字"
                    @click-right-icon="$toast('question')"
            >
                <!--<p slot="button" style="color:dodgerblue" @click="$router.push({name: 'fixImage'})">商品库选择</p>-->
            </van-field>
            <van-field
                    v-model="postData.code"
                    clearable
                    label="自编码"
                    placeholder="不填则自动生成"
            />
            <!--<van-field-->
                    <!--v-model="postData.unit"-->
                    <!--clearable-->
                    <!--label="单位"-->
                    <!--:placeholder="`默认:件`"-->
            <!--/>-->
            <van-cell
                    required
                    :title="`套餐头像`"
                    value="尺寸100x100。可编辑"
            />
            <div class="imgBox">
                <uploadImg v-model="postData.picMinUrl"></uploadImg>
            </div>
        </van-cell-group>
        <van-cell-group title="规格/售价">
            <van-cell
                    required
                    :title="`套餐内容`"
                    value="请选择"
                    @click.native="menuSelect = true"
                    is-link
            />
                <!--<van-field-->
                        <!--required-->
                        <!--clearable-->
                        <!--label="套餐内容"-->
                        <!--placeholder="请选择"-->
                        <!--@click.native="menuSelect = true"-->
                        <!--is-link-->
                <!--/>-->
            <div v-if="postData.storeSetMealContentList.length > 0">
                <div v-for="(item, index) in postData.storeSetMealContentList" :key="index">
                    <van-row type="flex" align="center" justify="space-between" class="specList">
                        <div>
                            <p>
                                <span v-if="item.type === 1">[商品]</span>
                                <span v-else>[服务]</span>
                                {{item.name}}
                            </p>
                            <p>
                                <span>{{item.specName}}</span>
                                <!--<span>￥{{item.specPrice.toFixed(2)}}</span>-->
                            </p>
                        </div>
                        <p>
                            <span>X{{item.number}}</span>
                            <!--<span>￥{{(item.number * item.specPrice).toFixed(2)}}</span>-->
                        </p>
                    </van-row>
                </div>
                <van-row type="flex" justify="end" class="specList">
                    <p>合计:&nbsp; &nbsp;&nbsp;X{{totalNum}}&nbsp; &nbsp;&nbsp;    ￥{{postData.skuPrice}}</p>
                </van-row>
            </div>

                <van-field
                        v-model="postData.skuPriceSell"
                        required
                        clearable
                        :label="`套餐售价`"
                        placeholder="请输入"
                />
                <p slot="button">元</p>
        </van-cell-group>
        <van-cell-group title="详情描述">
            <van-cell
                    title="详情图片"
                    value="尺寸100x100。可编辑"
            />

            <div class="imgBox">
                <uploadImg :maxSize="3" v-model="postData.picsUrls"></uploadImg>
            </div>
            <div class="lines"></div>
            <van-field
                    label="使用规则" required v-model="postData.shortInfo" type="textarea" placeholder="请输入"
            />
            <van-row type="flex" class="specTagBox" align="center">
                <p>推荐标签</p>
                <div>
                    <span class="tag" :class="{selectTag: postData.tag === index+1}" v-for="(item,index) in ['活动','促销','热卖']" :key="item" @click="postData.tag = index+1">{{item}}</span>
                </div>
            </van-row>
        </van-cell-group>
        <van-cell-group title="设置">
            <van-cell title="上架" >
                <van-switch-cell v-model="postData.status" :active-value="1" :inactive-value="0"/>
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
        <van-button  type="primary" size="large" @click.native="getDetail">详情</van-button>
        <!--菜单选择弹出-->
        <template class="menuPop">
            <van-popup v-model="menuSelect" position="right" :overlay="false">
                <chooseMealCom @select="selectMeal"></chooseMealCom>
            </van-popup>
        </template>

    </div>
</template>

<script>
    import uploadImg from '@/components/uploadImg/uploadImg'
    import chooseMealCom from './chooseMealCom'
    import {validateForm} from "../../../../utils";
    export default {
        components: {
            uploadImg,
            chooseMealCom
        },
        name: "addGoods",
        data() {
            return {
                menuSelect: false,
                fileList: [
                    { url: 'https://img.yzcdn.cn/vant/cat.jpeg' }
                ],
                currentType: {},
                topHeader: {
                    name: '新增套餐',
                    left: "2",
                    right1: "",
                    heade: "header1"
                },
                postData: {
                    skuPriceSell: '',
                    shortInfo: '',
                    skuPrice: 0,
                    code: '',
                    sourceType: 1,
                    logisticsType: 2,
                    isInvoice: 0,
                    isReturn: 0,
                    isEnable: 0,
                    isRepair: 0,
                    isRecommend: 0,
                    unit: '件',
                    picMinUrl: [],// 头图
                    number: '',
                    tag: 1,
                    status: 0,
                    isPlace: 0,
                    picsUrls: [],
                    sortNum: 0,
                    store: {
                        id: this.session.$getSessionStorageByName('storeId')
                    },
                    storeSetMealContentList: []
                },
                startPicMinUrl: '',
                startPicsUrls: '',
                isSimple: '1',
                describe: '',
                currentTag: 0,

            }

        },
        created() {
            if(this.$route.query.id) {
                this.topHeader.name = '编辑套餐';
               this.getDetail();
            }
        },
        methods: {
            getDetail() {
                this.Api.mealDetail({ id: '9acb4c800d29483e93d718baba4314be' }).then(res => {
                    if(res.data.status==1) {
                        this.postData = res.data.data;
                        this.postData.picsUrls = JSON.parse(this.postData.picsUrls);
                    } /*else {

                    }*/
                })
            },
            deleteMt() {
                this.$dialog.confirm({
                    title: '删除',
                    message: '是否确认删除当前套餐'
                }).then(() => {
                    // on confirm
                    this.Api.deleteMeal({id: this.$route.query.id}).then(res => {
                        if(res.data.status === 1) {
                            this.$toast('删除成功')
                        } /*else {

                        }*/
                    })
                }).catch(() => {
                    // on cancel
                });
            },
            selectMeal(val) {
                this.menuSelect = false;
                this.postData.storeSetMealContentList = val.data;
                this.postData.skuPrice = val.totalMoney;
                this.totalNum = val.totalNum;
                console.log(val);
            },
            save() {
                document.createDocumentFragment()
                const { name, storeSetMealContentList, shortInfo, picMinUrl, skuPriceSell, picsUrls } = this.postData;
                if(storeSetMealContentList.length === 0) {
                   return this.$toast('请选择套餐内容！');
                }
                // if(!this.postData.unit) {
                //     this.postData.unit = '件';
                // }
                if(validateForm({ picMinUrl, name, shortInfo, skuPriceSell }, this)){
                    this.Api.addMeal({...this.postData, picMinUrl: picMinUrl[0], picsUrls: JSON.stringify(picsUrls)}).then(res => {
                        if(res.data.data.status === 1) {
                            this.$toast('添加成功');
                        }
                        console.log(res);
                    })
                }

            },
            addSpec() {
                this.postData.storeGoodsSkuList.push({
                    name: '',
                    skuPriceSell: '',
                })
            },
            deleteSpec(index) {
                this.postData.storeGoodsSkuList.splice(index, 1)
            },
        }
    }
</script>

<style scoped lang="scss">
    .specList {
        padding:10px;
        font-size: 13px;
        color: grey;
        span {
            margin:0 5px;
        }
    }
    .van-popup{
        z-index: 30000 !important;
    }
    .van-radio {
        justify-content: flex-end !important;
    }
    .addGoods {
        /*background: grey;*/
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
            top: 33%;
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
        font-size: 14px;

        .tag {
            display: inline-block;
            padding: 5px 14px;
            border: 1px solid gray;
            border-radius: 3px;
            color: gray;
            font-size: 12px;

            margin: 0 15px;
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
        color: #969799
    }
</style>

