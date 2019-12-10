<template>
    <div class="example">
        <van-image-preview
                v-model="show1"
                :images="images1"
                @change="onChange1"
        >

            <div slot="index">
                <p  class="example-x"><van-icon name="close" /></p>
                <div class="huan" style="margin-top: 32px;">

                    {{index1}}/{{images1.length}}<br>
                    <div style="margin-top: 16px;font-size: 12px;">左滑查看下一张示例图</div>
                </div>
                <p style="position: absolute;top: 80vh;width: 80%;left: 10%;">要求：使用店铺logo或门头照。图片清晰、完整、无遮挡、无水印、不倒置（为保护商户隐私，部分示例图已做模糊处理，请您在上传时保证图片中的内容清晰可见）</p>
            </div>
        </van-image-preview>
        <van-image-preview
                v-model="show2"
                :images="images2"
                @change="onChange2"
        >
             <div slot="index">
                <p class="example-x"><van-icon name="close" /></p>
                <div class="huan" style="margin-top: 32px;">

                    {{index2}}/{{images2.length}}<br>
                    <div style="margin-top: 16px;font-size: 12px;">左滑查看下一张示例图</div>
                </div>
                <p style="position: absolute;top: 85vh;width: 80%;left: 10%;font-size: 12px;">要求：图片清晰、完整、无遮挡、无水印、不倒置（为保护商户隐私，部分示例图已做模糊处理，请您在上传时保证图片中的内容清晰可见）</p>
             </div>

        </van-image-preview>
        <van-image-preview
                v-model="show3"
                :images="images3"
                @change="onChange3"
        >
           <div slot="index">
                <p class="example-x"><van-icon name="close" /></p>
                <div class="huan" style="margin-top: 32px;">

                    {{index3}}/{{images3.length}}<br>
                    <div style="margin-top: 16px;font-size: 12px;">左滑查看下一张示例图</div>
                </div>
                <p style="position: absolute;top: 85vh;width: 80%;left: 10%;font-size: 12px;">要求：图片清晰、完整、无遮挡、无水印、不倒置（为保护商户隐私，部分示例图已做模糊处理，请您在上传时保证图片中的内容清晰可见）</p>
            </div>

        </van-image-preview>
        <van-image-preview
                v-model="show4"
                :images="images4"
                @change="onChange4"
        >
        <!--    <div slot="index">
                <p style="position: absolute;top: 1%;right: -25px;font-size: 20px;">×</p>
                <p style="position: absolute;top: 90vh;left: 50%;transform: translateX(-50%)">{{index4}}/{{images4.length}}</p>
                <p class="huan">要求：图片清晰、完整、无遮挡、无水印、不倒置（为保护商户隐私，部分示例图已做模糊处理，请您在上传时保证图片中的内容清晰可见）</p></div>
       -->
            <div slot="index">
                <p class="example-x"><van-icon name="close" /></p>
                <div class="huan" style="margin-top: 32px;">

                    {{index4}}/{{images4.length}}<br>
                    <!--<div style="margin-top: 16px;font-size: 12px;">左滑查看下一张示例图</div>-->
                </div>
                <p style="position: absolute;top: 85vh;width: 80%;left: 10%;font-size: 12px;">要求：图片清晰、完整、无遮挡、无水印、不倒置（为保护商户隐私，部分示例图已做模糊处理，请您在上传时保证图片中的内容清晰可见）</p>
            </div>
        </van-image-preview>
        <van-image-preview
                v-model="show5"
                :images="images5"
                @change="onChange5"
        >
       <!--     <div slot="index">
                <p style="position: absolute;top: 1%;right: -25px;font-size: 20px;">×</p>
                <p style="position: absolute;top: 90vh;left: 50%;transform: translateX(-50%)">{{index5}}/{{images5.length}}</p>
                <p class="huan">要求：首图使用门头照，图片必须包含门店全景、店内环境、商品陈列。图片清晰、完整、无遮挡、无水印、不倒置（为保护商户隐私，部分示例图已做模糊处理，请您在上传时保证图片中的内容清晰可见）</p></div>
       -->
            <div slot="index">
                <p class="example-x"><van-icon name="close" /></p>
                <div class="huan" style="margin-top: 32px;">

                    {{index5}}/{{images5.length}}<br>
                    <div style="margin-top: 16px;font-size: 12px;">左滑查看下一张示例图</div>
                </div>
                <p style="position: absolute;top: 80vh;width: 80%;left: 10%;font-size: 12px;">要求：首图使用门头照，图片必须包含门店全景、店内环境、商品陈列。图片清晰、完整、无遮挡、无水印、不倒置（为保护商户隐私，部分示例图已做模糊处理，请您在上传时保证图片中的内容清晰可见）</p>
            </div>
        </van-image-preview>
    </div>
</template>

<script>
    import logo from '@/assets/img/example/logo.jpg'
    import logo2 from '@/assets/img/example/logo2.jpg'
    import bcPicUrl1 from '@/assets/img/example/bcPicUrl1.jpg'
    import bcPicUrl2 from '@/assets/img/example/bcPicUrl2.jpg'
    import idCardBackUrl from '@/assets/img/example/idCardBackUrl.jpg'
    import idCardJustUrl from '@/assets/img/example/idCardJustUrl.jpg'
    import idOthrCerUrl from '@/assets/img/example/idOthrCerUrl.jpg'
    import albums1 from '@/assets/img/example/albums1.jpg'
    import albums2 from '@/assets/img/example/albums2.jpg'
    import albums3 from '@/assets/img/example/albums3.jpg'
    export default {
        name: "example",
        props: [
            'example'
        ],
        data () {
            return {
                    show1:false, //1店铺头像
                    show2:false, //2证照
                    show3:false, //3身份证照
                    show4:false, //4其他证件
                    show5:false, //5店铺环境
                    index1:1,
                    index2:1,
                    index3:1,
                    index4:1,
                    index5:1,
                    images1:[logo,logo2],
                    images2:[bcPicUrl1,bcPicUrl2],
                    images3:[idCardJustUrl,idCardBackUrl],
                    images4:[idOthrCerUrl],
                    images5:[albums1,albums2,albums3],
            }
        },
        methods:{

            onChange1(index){
                this.index1=index+1
            },
            onChange2(index){
                this.index2=index+1
            },
            onChange3(index){
                this.index3=index+1
            },
            onChange4(index){
                this.index4=index+1
            },
            onChange5(index){
                this.index5=index+1
            },
            changes(index){
                 if(index===1){
                    this.show1=!this.show1
                     this.$store.commit('SET_INSTANCE','on')
                 }else if(index===2){
                    this.show2=!this.show2
                     this.$store.commit('SET_INSTANCE','on')
                }else if(index===3){
                    this.show3=!this.show3
                     this.$store.commit('SET_INSTANCE','on')
                }else if(index===4){
                    this.show4=!this.show4
                     this.$store.commit('SET_INSTANCE','on')
                }else if(index===5){
                    this.show5=!this.show5
                     this.$store.commit('SET_INSTANCE','on')
                }
                 console.log(this)
            },
        },
        watch:{
            '$store.state.record.instance'(){
                console.log(this.$store.state.record.instance)
                if(this.$store.state.record.instance=='off'){
                    this.show1=false
                    this.show2=false
                    this.show3=false
                    this.show4=false
                    this.show5=false
                }
            }
        }
    }
</script>

<style>
    .van-image-preview  .van-image-preview__index{
        width: 80% !important;
        text-align: center;
        font-size: 12px;
    }
    .van-image-preview .van-swipe-item img{
        max-height: 70%;
    }
    .example-x{
        position: absolute;
        top: 1%;
        right: -25px;
        font-size: 20px;
    }
</style>
