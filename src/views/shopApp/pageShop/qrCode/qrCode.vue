<template>
    <div class="page" style="background:#fff;height:100vh;position:relative">
        <top-column :top-header="topheader"></top-column>
        <div class="box boxte2" ref="box">
            <div class="qrback">
                <img src="@/assets/img/qrback.png" v-if="!isqr" class="qrbackground" alt="分享背景图">
            </div>
            <!-- <p class="storeRateBase">扫码支付  <span v-if="storeRateBase!==10">即享{{storeRateBase}}折</span></p> -->
            <!-- <div id="qrcode"></div> -->
            <me-qrcode v-if="qrCodeUrl" :qrLogo="logo" :qrLogoSize="60" :qr-url="qrCodeUrl" :qr-size="300"
                       class="qrcode"></me-qrcode>
        </div>
        <div class="box">
            <div class="qrback">
                <img src="@/assets/img/qrback.png" v-if="!isqr" class="qrbackground" alt="分享背景图">
            </div>
            <!-- <p class="storeRateBase">扫码支付  <span v-if="storeRateBase!==10">即享{{storeRateBase}}折</span></p> -->
            <!-- <div id="qrcode"></div> -->
            <me-qrcode v-if="qrCodeUrl" :qrLogo="logo" :qrLogoSize="60" :qr-url="qrCodeUrl" :qr-size="300"
                       class="qrcode"></me-qrcode>
        </div>
        <div class="box boxte" ref="box2" style="clip: rect(0, 0, 0 ,0);position:absolute;top:0;">
            <!-- <div  class="qrback">
                <img src="@/assets/img/qrback.png" v-if="!isqr"  class="qrbackground" alt="分享背景图">
            </div> -->
            <!-- <p class="storeRateBase">扫码支付  <span v-if="storeRateBase!==10">即享{{storeRateBase}}折</span></p> -->
            <!-- <div id="qrcode2"></div> -->
            <me-qrcode v-if="qrCodeUrl" :qrLogo="logo" :qrLogoSize="60" :qr-url="qrCodeUrl" :qr-size="300"
                       class="qrcode2"></me-qrcode>
        </div>
        <!-- 存放合成的图片 -->
        <div class="share-img" id="shareImg"></div>
        <div class="share-img2" id="shareImg2"></div>
        <!-- <a class="down">333333</a> -->
        <div class="down" @click="downQrImg">下载物料</div>
        <div class="down2" @click="downQr">下载二维码</div>


        <!-- <vue-qr
          :text="qrCodeUrl"

          colorDark="#000"
          colorLight="#fff"
          :margin="0"
          :logoSrc="logo"
          :logoScale="0.3"
          :size="200"
          class="qr"
          style="margin: 30px;"
        ></vue-qr> -->

    </div>
</template>

<script>
import meQrcode from '@/components/qrcode';
// import { qrcanvas } from 'qrcanvas';
import html2canvas from 'html2canvas';
import {back, downQr, accMul} from '@/utils'

import vueQr from 'vue-qr'

export default {
    data() {
        return {
            topheader: {
                name: '收款码',
                left: '1',
                right1: '',
                heade: 'header'
            },
            fileCategoryCode: 'FILE19011208395727',
            qrCodeUrl: '',
            qrshow: false,
            logo: require('../../../../assets/img/qr-icon.png'),
            urls: '',
            urls2: '',
            storeRateBase: '',
            name: '',
            isqr: false, //是否下载二维码
            kaiguan: false //是否点击
        }
    },
    components: {
        vueQr, meQrcode
    },
    methods: {
        // 生成支付二维码
        createmerchantcode(id) {

            let para = {
                storeId: id
            }
            this.shopApi.createmerchantcode(para).then(res => {
                if (res.data && res.data.data) {
                    this.qrCodeUrl = res.data.data
                }
            })
        },
        downQrImg() {
            // this.createmerchantcode(sessionStorage.getItem('storeId'),false)
            if (window._czc) {
                window._czc.push(['_trackEvent', '收款', '下载物料', '', '', '']);//其中灰色的为选填项
            }
            this.creatImg(false)

        },
        downQr() {
            if (window._czc) {
                window._czc.push(['_trackEvent', '收款', '下载二维码', '', '', '']);//其中灰色的为选填项
            }
            // this.createmerchantcode(sessionStorage.getItem('storeId'),true)
            // this.tourls(true)
            this.creatImg(true)
        },
        addidjust(file, isqr) {
            // let blob2=this.imgCompress(file,{quality: 0.2})


            let blob = this.dataURItoBlob(file)

            let fd = new FormData()
            fd.append('filename', blob, 'img.jpg')
            fd.append('fileCategoryCode', this.fileCategoryCode)
            this.Api.upload(fd).then(res => {

                // this.urls.showUrl = file.content
                if (res.data.status == 1) {
                    if (isqr) {
                        this.urls2 = res.data.data.url
                    } else {
                        this.urls = res.data.data.url
                    }
                    // this.tourls(isqr)
                    isqr ? downQr(this.urls2) : downQr(this.urls)

                } else {
                    this.$toast('图片上传失败')
                }

            }).catch(() => {
                this.$toast('图片上传失败')
            })
        },
        // tourls(isqr){
        //   if(isqr){
        //     downQr(this.urls2)
        //   }else{
        //     downQr(this.urls)
        //   }

        // },
        dataURItoBlob(base64Data) {
            let byteString
            if (base64Data.split(',')[0].indexOf('base64') >= 0) {
                byteString = atob(base64Data.split(',')[1])
            } else {
                byteString = unescape(base64Data.split(',')[1])
            }
            let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
            let ia = new Uint8Array(byteString.length)
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            return new Blob([ia], {type: mimeString})
        },
        creatImg(isqr) {
            let that = this;
            // 已经生成二维码
            // clearInterval(this.timer)
            let element
            let width = null
            let height = null
            if (isqr) {
                element = that.$refs.box2;
                width = that.$refs.box2.offsetWidth;//dom宽
                height = that.$refs.box2.offsetHeight;//dom高
            } else {
                element = that.$refs.box;
                width = that.$refs.box.offsetWidth;//dom宽
                height = that.$refs.box.offsetHeight;//dom高
            }
            console.log(width, height)
            html2canvas(element, {
                allowTaint: true,
                taintTest: false,
                dpi: window.devicePixelRatio * 2,
                scale: 4,
                width: width,
                heigth: height,
            }).then(function (canvas) {
                // console.log(canvas.toDataURL())

                that.addidjust(canvas.toDataURL(), isqr)

            });

        }

    },
    computed: {},
    mounted() {
        back('#ffffff')
        // this.logo=this.$route.query.logo
        this.createmerchantcode(sessionStorage.getItem('storeId'))
        this.storeRateBase = accMul(this.$route.query.storeRateBase, 10)
        this.name = this.$route.query.name


    },
}
</script>

<style scoped lang="scss" type="text/scss">
.qrtan {
    z-index: 205000 !important;
}

.box {
    // position: relative;
    top: 20px;
    transform: scale(.8);
    position: absolute
}

.qrback {
    width: 100%;

    .qrbackground {
        width: 100%;
        height: 100%;
    }
}

.qrcode {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 24.7%;
    width: 200px;
    height: 200px;

    img {
        width: 100%;
        height: 100%;
    }
}

.down {
    width: 150px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border-radius: 25px;
    border: 1px solid rgba(0, 149, 253, 1);
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(0, 149, 253, 1);
    line-height: 50px;
    // margin: 0 20px 30px 0;
    // float:right;
    position: absolute;
    bottom: 30px;
    right: 20px;
}

.down2 {
    width: 150px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    border-radius: 25px;
    border: 1px solid rgba(0, 149, 253, 1);
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(0, 149, 253, 1);
    line-height: 50px;
    // margin: 0 0 30px 20px;
    position: absolute;
    bottom: 30px;
    left: 20px;
}

.storeRateBase {
    font-size: 37px;
    position: absolute;
    top: 105px;
    text-align: center;
    width: 100%;
    color: #fff;
    font-family: PingFang SC;
    font-weight: 600;
}

.storename {
    position: absolute;
    top: 392px;
    width: 175px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(35, 24, 21, 1);
    text-align: center;
}

.storename2 {
    text-align: center;
    width: 175px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.boxte {
    padding: 20px;
    background: #fff;
    transform: scale(1);
}

.boxte2 {
    z-index: -1;
    transform: scale(1);
    top: 0;
}
</style>
