<template>
    <div class="app-init">
        <top-column :top-header="topheader"></top-column>
        <van-collapse v-model="activeNames" class="margintop">
            <van-collapse-item name="0" title="审核信息" value-class="collapsewarn">
                <div slot="icon" class="vant-collapse-icon"></div>
                <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
                <div slot="value">
                    <van-icon name="info-o" v-show="activewarn.onoff0"/>
                </div>
                <van-field type="text" label="审核编码" :value="shop.code" readonly></van-field>
                <van-field type="text" label="审核名称" :value="shop.name" readonly/>
                <van-field type="text" label="审核类型" :value="returnServiceType(shop.serviceType)" readonly/>
                <van-field type="text" label="申请时间" :value="shop.createTime" readonly/>
                <van-field type="text" label="审核状态" :value="returnDelFlag(shop.delFlag)" readonly/>
                <van-cell-group>
                    <van-field label="拒绝理由" type="textarea" :value="shop.remarks" rows="1" autosize readonly v-if="shop.delFlag==3"/>
                    <van-field label="备注" type="textarea" :value="shop.remarks" rows="1" autosize readonly v-else/>
                </van-cell-group>
            </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="activeNames" class="margintop">
            <van-collapse-item name="1" title="账号信息" value-class="collapsewarn">
                <div slot="icon" class="vant-collapse-icon"></div>
                <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
                <div slot="value">
                    <van-icon name="info-o" v-show="activewarn.onoff0"/>
                </div>
                <van-field type="text" label="编码" :value="approvalContent.code" readonly/>
                <van-field
                        type="text"
                        label="入驻时间"
                        :value="shop.delFlag==0?shop.updateTime:''"
                        readonly
                />
                <van-field type="text" label="角色" :value="approvalContent.role==null?'':approvalContent.role.name"
                           readonly/>
                <van-field type="text" label="登录名" :value="approvalContent.username" readonly/>
                <van-field type="text" label="手机号" :value="approvalContent.phone" readonly/>
                <van-field type="text" label="邮箱" :value="approvalContent.email" readonly/>
            </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="activeNames" class="margintop">
            <van-collapse-item name="2" title="状态信息" value-class="collapsewarn">
                <div slot="icon" class="vant-collapse-icon"></div>
                <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
                <div slot="value">
                    <van-icon name="info-o" v-show="activewarn.onoff0"/>
                </div>
                <van-field
                        type="text"
                        label="帐号启用"
                        :value="approvalContent.isEnable==0?'启用':'停用'"
                        readonly
                />
                <van-field type="text" label="帐号状态" :value="returnStatus(approvalContent.status)" readonly/>
                <!--<van-field type="text" label="上级用户"-->
                           <!--v-if="!!approvalContent.managerCooperation && !!approvalContent.managerCooperation.merManager"-->
                           <!--:value="approvalContent.managerCooperation.merManager.name" readonly/>-->
                <van-cell title="上级用户"   v-if="!!approvalContent.managerCooperation && !!approvalContent.managerCooperation.merManager"
                          :value="approvalContent.managerCooperation.merManager.name"></van-cell>

                <van-cell
                        title="管辖区域"
                        placeholder="查看可推广区域"
                        value="查看可推广区域"
                        is-link
                        @click="area.onoff=!area.onoff;topheader.name='查看可推广区域'"
                ></van-cell>
            </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="activeNames" class="margintop">
            <van-collapse-item title="基本信息" name="3" value=" " value-class="collapsewarn">
                <div slot="icon" class="vant-collapse-icon"></div>
                <div slot="value">
                    <van-icon name="info-o" v-show="activewarn.onoff2"></van-icon>
                </div>

                <!-- <van-cell title="办公地址" :value="shop.province+shop.city+shop.region"></van-cell> -->
                <van-cell title="办公地址"
                          :value="approvalContent.managerCooperation==null?'无':approvalContent.managerCooperation.officeAddress"></van-cell>
                <!-- <van-cell title="仓库地址" :value="shop.province+shop.city+shop.region"></van-cell> -->
                <van-cell title="仓库地址"
                          :value="approvalContent.managerCooperation==null?'无':approvalContent.managerCooperation.warehouseAddress"></van-cell>
            </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="activeNames" class="margintop">
            <van-collapse-item name="4" title="证照信息" value-class="collapsewarn">
                <div slot="icon" class="vant-collapse-icon"></div>
                <!--<div slot="title">状态信息<van-icon name="question-o" /></div>-->
                <div slot="value">
                    <van-icon name="info-o" v-show="activewarn.onoff0"/>
                </div>
                <van-field
                        type="text"
                        label="营业执照号"
                        :value="approvalContent.managerCooperation==null?'无':approvalContent.managerCooperation.bcCode"
                        readonly
                />
                <van-cell title="名称"    :value="approvalContent.name"></van-cell>
                <van-field type="text" label="类型"
                           :value="returnBcRegisterType(approvalContent.managerCooperation==null?'无':approvalContent.managerCooperation.bcRegisterType)"
                           readonly/>
                <van-field type="text" label="有效截至日期"
                           :value="approvalContent.managerCooperation==null?'无':approvalContent.managerCooperation.bcEndtime"
                           readonly/>
                <van-cell title="证照" value-class="teadd">
                    <one-not-cut class="notclickadd"
                                 :one-not-cut="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.bcPicUrl"></one-not-cut>
                </van-cell>
                <van-field type="text" label="法人姓名"
                           :value="approvalContent.managerCooperation==null?'无':approvalContent.managerCooperation.bcUserName"
                           readonly/>
                <van-field type="text" label="身份证号"
                           :value="approvalContent.managerCooperation==null?'无':approvalContent.managerCooperation.bcUserIdcard"
                           readonly/>
                <van-cell title="法人身份证" value-class="teadd">
                    <one-not-cut class="notclickadd"
                                 :one-not-cut="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idCardBackUrl"></one-not-cut>
                    <one-not-cut class="notclickadd"
                                 :one-not-cut="approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idCardJustUrl"></one-not-cut>
                </van-cell>
                <van-cell title="其他证件" value-class="teadd">
                    <one-not-cut class="notclickadd" :one-not-cut="src" v-for="src in approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.idOthrCerUrl.split(',')"></one-not-cut>
                </van-cell>
            </van-collapse-item>
        </van-collapse>
        <van-collapse v-model="activeNames" class="margintop">
            <van-collapse-item title="费率和合同" name="5" value=" " value-class="collapsewarn">
                <div slot="icon" class="vant-collapse-icon"></div>
                <div slot="value">
                    <van-icon name="info-o" v-show="activewarn.onoff3"/>
                </div>
                <div class="floatBox">
                    <h3>费率</h3>
                    <div class="border">
                        <p class="fb-left">管辖区域内种子商户、特色商户平台销售额的</p>
                        <p class="fb-right">0.3％</p>
                    </div>
                    <div class="border">
                        <p class="fb-left">管辖区域内同城企业平台销售额的</p>
                        <p class="fb-right">0.3％</p>
                    </div>
                    注：自己开发的不重复提成，最多就0.3%提成
                    <div class="border">
                        <p class="fb-left">配送平台商品，获得该商品订单价格的</p>
                        <p class="fb-right">3％</p>
                    </div>
                    注：配送费由商品所属企业承担。
                </div>
                <div class="floatBox" >
                    <h3>合同时间</h3>
                    <div class="border">
                        <!--<p class="fb-left">平台收取服务费，收取该特色商户平台销售额的</p>-->
                        <p
                                class="fb-left"
                        >{{approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.activeTime|format }}至{{approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.invalidTime|format }}</p>
                    </div>
                </div>
                <div class="floatBox">
                    <h3>合同照片</h3>注：必须包含首页、费率页、合作期限页、签章页。
                    <van-cell v-if="shop.serviceType==7" value-class="teadd" class="imgBox-cell">
                        <one-not-cut :one-not-cut="src" class="notclickadd" :key="keys" v-for="(src,keys) in approvalContent.managerCooperation==null?'':approvalContent.managerCooperation.contractPicUrls.split(',')"></one-not-cut>
                    </van-cell>
                    <van-cell v-else value-class="teadd" class="imgBox-cell">
                        <one-not-cut :one-not-cut="src" class="notclickadd" :key="keys" v-for="(src,keys) in approvalContent.store==null?'':approvalContent.store.contractPicUrls.split(',')"></one-not-cut>
                    </van-cell>
                </div>
            </van-collapse-item>
        </van-collapse>

        <!--<van-button type="info" size="large" @click="submitBasic" class="submitbtn" v-if="shop.delFlag == 3">重新提交处理-->
        <!--</van-button>-->
        <div class="bott" v-if="shop.delFlag == 3"></div>
        <div class="botto" v-if="shop.delFlag == 3">
            <van-button type="info" size="large" @click="submitBasic" class="submitbtn">重新编辑</van-button>
        </div>
        <van-popup
                v-model="area.onoff"
                position="right"
                :overlay="false"
        >
            <div class="rightmap">
                <header class="heade">

                </header>
                <div>
                    <!--<choose-area :area="area"></choose-area>-->
                    <el-tree
                            :default-expanded-keys="expandKeys"
                            :data="dutyAreaList"
                            node-key="code"
                            empty-text="辖区为空"
                    ></el-tree>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import oneArea from "@/components/chooseArea/oneArea";
import oneNotCut from '@components/addimg/oneNotCut'
import chooseArea from '@/components/chooseArea/chooseArea'
import {format} from "../../../../../utils";

export default {
    data() {
        return {
            topheader: {
                name: "详情",
                left: "3",
                heade: "header1"
            },
            type: "",
            list: "",
            expandKeys: [],
            dutyAreaList: [],
            activeNames: ["2", "1", "0", "3", "4", "5", "6"], // 开哪个折叠
            activewarn: {
                onoff0: false,
                onoff1: false,
                onoff2: false,
                onoff3: false,
                onoff4: false
            },
            inputwarn: {
                warn1: ""
            },
            areaConfig: {
                //选择地址
                onoff: false
            },
            area: {
                list: false,
                onoff: false,
                chooseno: false,
                arealist: [],
                userlist: []
            },
            jingying: {
                // 经营品牌
                onoff: false
            },
            disabled: true, // 后退能否
            shop: {},
            approvalContent: {}
        };
    },
    components: {
        oneNotCut,
        oneArea,
        chooseArea
    },
    methods: {
        goback() {
            if (this.area.onoff) {
                this.area.onoff = !this.area.onoff
                this.topheader.name = '详情'
            } else {
                this.$router.go(-1)
            }
        },
        areas(msg) {
            this.shop.managerDutyAreaConfigs = msg
            this.area.onoff = false
            this.topheader.name = '详情'
        },
        returnServiceType(type) {
            switch (type) {
                case 1:
                    return "种子商户入驻";
                case 2:
                    return "特色商户入驻";
                case 3:
                    return "商品审核";
                case 4:
                    return "生产企业审核";
                case 5:
                    return "同城企业审批";
                case 6:
                    return "省区总审批";
                case 7:
                    return "合作商审批";
                case 8:
                    return "推广员审批";
                case 10:
                    return "红包提现审批";
                case 11:
                    return "推广员收益提现审批";
                case 12:
                    return "合作商收益提现审批";
                case 13:
                    return "省区总收益提现审批";
                default:
                    return "无";
            }
        },
        returnDelFlag(type) {
            switch (type) {
                case 0:
                    return "审核通过";
                case 1:
                    return "已删除";
                case 2:
                    return "审核中";
                case 3:
                    return "审核拒绝";
                default:
                    return "无";
            }
        },
        returnStatus(type) {
            switch (type) {
                case 1:
                    return "正常";
                case 2:
                    return "关闭";
                case 3:
                    return "冻结";
                default:
                    return "无";
            }
        },
        returnBcRegisterType(type) {
            switch (type) {
                case 1:
                    return "个体商户 ";
                case 2:
                    return "企业";
                default:
                    return "无";
            }
        },
        oneAreas(msg) {
            if (msg == "") {
            } else {
                this.shop.province = msg[0].name;
                this.shop.city = msg[1].name;
                this.shop.region = msg[2].name;
                this.shop.areaConfig.id = msg[3].id;
            }
            this.areaConfig.onoff = false;
        },
        getimg() {
            this.$refs.imageCropper.checkPhoto();
        },
        loadImage(data) {
            this.upload(data);
            // this.shop.logoUrl=data
        },
        deletelicense() {
            this.shop.logoUrl = "";
        },
        getDutyArea() {
            console.log("this.approvalContent.", this.approvalContent);
            let arr = [];
            this.approvalContent.managerDutyAreaConfigs.map(item => {
                if (item.areaConfig) {
                    this.formatDutyAreaApproval(
                        arr,
                        item.areaConfig,
                        [],
                        ["province", "city", "region"],
                        1
                    );
                }
            });
            console.log(arr)
            this.dutyAreaList = arr;
            if (arr.length > 0) {
                this.expandKeys = [arr[0].code];
            } else {
                this.expandKeys = [];
            }
        },
        formatDutyAreaApproval(arr, area, inxList, levelArea, level) {
            let parents = area.parents;
            if (!parents) {
                return;
            }
            let hasArea = false;
            let arry = arr;
            for (let j = 0; j < inxList.length; j++) {
                arry = arry[inxList[j]].children;
            }

            for (let i = 0; i < arry.length; i++) {
                for (let k = 0; k < parents.length; k++) {
                    if (arry[i].label === parents[k].name) {
                        hasArea = true;
                        if (level < levelArea.length) {
                            if (!arry[i].children) {
                                arry[i].children = [];
                            }
                            inxList.push(i);
                            this.formatDutyAreaApproval(
                                arr,
                                area,
                                inxList,
                                levelArea,
                                level + 1
                            );
                        }
                        break;
                    }
                }
            }
            if (!hasArea) {
                if (level === levelArea.length) {
                    arry.push({
                        label: area.name,
                        code: area.code
                    });
                } else if (level < levelArea.length) {
                    for (let i = 0; i < parents.length; i++) {
                        if (parents[i].areaLevel === level) {
                            arry.push({
                                label: parents[i].name,
                                code: parents[i].code,
                                children: []
                            });
                            inxList.push(arry.length - 1);
                            this.formatDutyAreaApproval(
                                arr,
                                area,
                                inxList,
                                levelArea,
                                level + 1
                            );
                            break;
                        }
                    }
                }
            }
        },
        refuse() {
            if (this.shop.remarks) {
                let para = {
                    id: this.shop.id,
                    status: 3,
                    remarks: this.shop.remarks
                };
                this.Api.changeLocal2(para)
                    .then(res => {
                        this.$router.go(-1);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.$toast("提示内容");
            }
        },
        toaddlocal() {
            this.$router.push({path: "/AddLocal", query: {id: this.shop.id}});
        },
        submitBasic() {
            // 获取全局数据
            this.$router.push({
                path: '/AddTogether',
                query: {id: this.shop.id, list: 2,}
            })
        },
        handleScroll() {
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            // var offsetTop = document.getElementsByClassName("van-collapse-item")[1].getBoundingClientRect().top
            let offsetTop = document.getElementsByClassName("van-collapse-item");
            for (let i = 1; i < offsetTop.length; i++) {
                if (offsetTop[i].getBoundingClientRect().top < 0) {
                    this.removeByValue(this.activeNames, i - 1);
                }
            }
            if (scrollTop > 600) {
                // console.log("11");
            }
            // console.log(offsetTop,scrollTop)
            // if (scrollTop > offsetTop) {
            //   this.searchBarFixed = true
            // } else {
            //   this.searchBarFixed = false
            // }
        },
        removeByValue(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                }
            }
        },
        inputblur(type) {
            // 错误显示折叠上的感叹号
            this.$validator.validateAll().then(result => {
                if (result) {
                    // ...
                    console.log(result);
                } else {
                    switch (type) {
                        case 0:
                            this.activewarn.onoff0 = true;
                            break;
                        case 1:
                            this.activewarn.onoff1 = true;
                            break;
                        case 2:
                            this.activewarn.onoff2 = true;
                            break;
                        case 3:
                            this.activewarn.onoff3 = true;
                            break;
                        case 4:
                            this.activewarn.onoff4 = true;
                            break;
                    }
                }
            });
        }
    },
    watch: {
        "shop.remarks"() {
            if (
                this.shop.remarks !== undefined &&
                this.shop.remarks !== null &&
                this.shop.remarks.length > 200
            ) {
                this.shop.remarks = this.shop.remarks.substr(
                    0,
                    this.shop.remarks.length - 1
                );
            } else if (
                this.shop.remarks !== undefined &&
                this.shop.remarks !== null &&
                this.shop.remarks.length > 0
            ) {
                this.shop.newfont =
                    this.shop.remarks !== undefined &&
                    this.shop.remarks !== null &&
                    this.shop.remarks.length;
            }
        }
    },
    filters: {
        format
    },
    mounted() {
       // window.addEventListener("scroll", this.handleScroll);
        this.type = sessionStorage.getItem("accountType");
        this.list = this.$route.query.list;
        // let para = this.$route.query.id, // 0,挂靠合作商id
        // this.name=sessionStorage.getItem('accountName')

        let para = {
            id: this.$route.query.id
        }

        // let formdata = new FormData();
        // formdata.set("id", this.$route.query.id);

        this.Api.getApprovalDetail(para)
            .then(res => {
                this.shop = res.data.data;
                this.approvalContent = JSON.parse(res.data.data.approvalContent);
                for (let o = 0, len = this.approvalContent.managerDutyAreaConfigs; o < len.length; o++) {
                    this.area.userlist.push(len[o].areaConfig.id)
                }
                this.getDutyArea();
                console.log("this.approvalContent",this.approvalContent);
            })
            .catch(error => {
                console.log(error);
            });
    },
    destroyed() {
        //window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style scoped>
.heade {
    width: 375px;
    height: 44px;
    position: relative;
    background: #0088fd;
    background: -webkit-linear-gradient(to right, #00a7fc, #0088fd);
    background: -moz-linear-gradient(to right, #00a7fc, #0088fd);
    background: linear-gradient(to right, #00a7fc, #0088fd);
    color: #ffffff;
}

.backlcon {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 18px;
    top: 12px;
}

.headline {
    position: absolute;
    left: 50%;
    font-size: 18px;
    line-height: 44px;
    transform: translateX(-50%);
}

.rightmap {
    width: 100vw;
    height: 100vh;
    background: #fff;
}

.margintop {
    margin-top: 10px;
}

.newfont {
    color: #c5c5c5;
    font-size: 10px;
    margin-bottom: 9px;
    text-align: right;
    margin-right: 30px;
}

.van-button--normal {
    margin: 18px 0 18px 18px;
}

.floatBox {
    padding: 10px 15px;
    overflow: hidden;
}

.floatBox h3 {
    color: #333;
    font-size: 16px;
}

.floatBox .border {
    overflow: hidden;
    padding: 10px 0;
    font-size: 14px;
    color: #333;
}

.floatBox .imgBox {
    width: 100%;
    height: 120px;
}

.floatBox .imgBox img {
    width: 100%;
    height: 100%;
}

.floatBox .border:not(:last-child),
.floatBox:not(:last-child) {
    border-bottom: 1px solid #eee;
}

.fb-left {
    width: 85%;
    float: left;
}

.fb-right {
    width: 15%;
    float: right;
    text-align: right;
}

.btnBox {
    overflow: hidden;
}

.btnBox .btn {
    margin: 10px 0;
}

.btnBox .btn:last-child {
    float: right;
}
.imgBox-cell {
  padding: 0;
}
.botto{
    z-index: 2000;
}
</style>
