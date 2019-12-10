<template>
    <div>
        <header :class="topHeader.heade" class="heade">
            
            <!--常用顶部左-->
            <div class="backlcon" @click="goback" v-if="topHeader.left=='2'">
                <img src="@assets/img/backlist.png"/>
            </div>
            <!--首页顶部左-->
            <div class="backp" 
                 v-if="topHeader.left=='4'">
                <!-- <img  src="@/assets/img/mine.png"  />
                <p style="transform:scale(0.75,0.75);white-space:nowrap">我的</p> -->
                <p>{{storename}}</p>
            </div>
            <h1 class="headlines" v-if="!topHeader.serarch">{{topHeader.name}}</h1>
            <form action="/" style="width: 100%;">
                <van-search
                        style="margin: 0;left: 0;"
                        v-model="topHeader.key"
                        placeholder="请输入搜索关键词"
                        show-action
                        @search="onSearch"
                        @cancel="onCancel"
                        v-if="topHeader.search"
                />
            </form>
            <van-search v-if="topHeader.serarch" placeholder="输入订单号/手机号/用户昵称" v-model="value"></van-search>
            <div class="rightlcon">
                <div @click="searchTime" class="rightlcon1"
                     v-if="topHeader.right1">
                    <img src="@assets/img/datachoose.png"/>
                </div>
                <div @click="clicksearch" class="rightlcon2" v-if="topHeader.right2">
                    <img src="@assets/img/search.png"/>
                </div>
                <!--<div @click="searchOrderList" class="rightSearch" v-if="topHeader.right3">搜索</div>-->
                <div @click="tobingcard" class="rightCode" v-if="topHeader.right4">
                    <p class="rightlcon3"><img src="../../assets/img/code2.png"/></p>
                    <p  style="transform:scale(0.75,0.75);white-space:nowrap">收款码</p>
                </div>
                <div @click="clickchange" class="rightlcon2" v-if="topHeader.right5">
                    <img src="@assets/img/storehome/change.png"/>
                </div>
            </div>
        </header>
        <div class="height44"></div>
    </div>
</template>
<script>

export default {
    name: 'topBars',
    props: [
        'topHeader',
        'storename'
    ],
    data() {
        return {
            value: ''
        }
    },
    components: {},
    methods: {
        toadd() {
            console.log(this.$route.query.id)
            switch (this.$route.query.id) {
                case 0:
                    this.$router.push('/AddTogether')
                    break
                case 1:
                    this.$router.push('/AddPopularize')
                    break
                case 2:
                    this.$router.push('/AddSeed')
                default:
                    break
            }

        },
        clicksearch() {
            this.$parent.search();
        },
        clickchange(){
            this.$parent.change();
        },
        onSearch(msg) {
            this.$emit('search', msg)
        },
        onCancel() {
            this.$parent.notsearch();
        },
        tominedetail() {
            this.$emit('tominedetail', 'click')
            // this.$router.push('/MineDetail')
        },
        searchTime() {
            this.$emit('searchTime', 'click')
        },
        searchOrder() {
            this.$emit('searchOrder', 'click')
        },
        searchOrderList() {
            this.$emit('searchOrderList', this.value)
        },
        tobingcard() {
            this.$emit('tobingcard', 'click')
        },
        goback(msg) {
            if(document.getElementsByClassName('van-image-preview').length){
                this.$store.state.record.instance.close()
            }else if(this.topHeader.left=='1'||this.topHeader.left=='2'){
                this.$router.go(-1)
            }else if(this.topHeader.left=='3'||this.topHeader.search==true){
                this.$parent.goback();
            }else{
                if(this.ready){
                    // window.location.href = `qtkjshop://back`
                    window.AndroidJs.back()
                }else{


                    this.ready=true
                    this.$toast({
                        duration: 0,       // 持续展示 toast
                        loadingType: 'spinner',
                        message: '再次点击退出应用'
                    })
                    let second = 3;
                    const timer = setInterval(() => {
                        second--;
                        if (second) {

                        } else {
                            clearInterval(timer);
                            this.ready=false
                            this.$toast.clear();
                        }
                    }, 1000);
                }
            }
        },

    },
    mounted(){
        window.goback=this.goback
    }
}
</script>
<style type="text/scss" lang="scss" scoped>
.heade {
    width: 100%;
    height: 44px;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 30000;
    box-sizing: border-box;
    .backp{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 600;
        font-size: 20px;
        font-family:'黑体';
    }
    .backlcon {
        width: 40px;
        height: 40px;
        text-align: center;
        img {
            width: auto;
            height: 50%;
            margin: 30% 0 0 0;
        }
    }
    .backlcon2{
        width: 40px;
        height: 40px;
        font-size: 15px !important;
        position: absolute;
        /*border-radius: 50%;*/
        /*border: 1px solid #fff;*/
        left: 16px;
        text-align: center;
        margin-top: 4px;
        img{
            width: 50%;
            height: 50%;
        }
    }
    .headlines {
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // transform: translate(-50%, -50%);
        // font-size: 18px;

         position: absolute;
  left: 50%;
  font-size: 18px;
  line-height: 44px;
  transform: translateX(-50%);
  white-space: nowrap;
  overflow: hidden;
  width: 50%;
  text-align: center;
    }

    .rightlcon {
        font-size: 12px;
        text-align: center;
        display: flex;

        .rightlcon1 {
            width: 20px;
            height: 20px;
            float: right;
            display: inline-block;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .rightlcon2 {
            display: inline-block;
            width: 20px;
            height: 20px;
            float: right;
            margin-left: 15px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .rightlcon3 {
            width: 20px;
            height: 20px;
            margin: 0 auto 1px;

            img {
                width: 100%;
                height: 100%;
            }
        }


        .rightCode {
            font-size: 15px;
            width: 45px;
            text-align: center;
            margin-top:6px;
        }
    }

    .van-search {
        padding: 0;
        flex: 1;
        margin: 0 13px;
        border-radius: 2px;

        /deep/ .van-cell {
            padding: 0;
            font-size: 13px;
        }

        /deep/ .van-field__left-icon {
            display: none;
        }
    }
}

.header1 {
    background: #00A7FC;
    color: #ffffff;
}

.height44 {
    height: 43px;
}
</style>
