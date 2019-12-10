<template>
    <div>
        <top-column :top-header="topHeader"></top-column>
        <!--<image-cropper ref="imageCropper" :cropperConfig="cropperConfig" :callback="loadImage"></image-cropper>-->
        <oneCut></oneCut>
        <!--<imageCropper :cropperConfig="cropperConfig"></imageCropper>-->
    </div>
</template>

<script>
    import imageCropper from '@components/imageCropper'
    import oneCut from '@components/addimg/oneCut'
    export default {
        components: {
            imageCropper,
            oneCut,
        },
        name: "fixImage",
        data() {
            return {
                cropperConfig: {
                    width: 1, // 裁剪宽度（比例）
                    height: 1, // 裁剪高度（比例）
                    quality: 0.7, // 图片质量（0~1之间）
                    maxWidth: 750, // 导出的图片的最大宽度
                    fileCategoryCode: 'FILE19011208395727'
                },
                topHeader: {
                    name: '商品库选择',
                    left: "2",
                    right1: "",
                    heade: "header1"
                },
            }
        },
        methods: {
            loadImage (data, url) {
                console.log('111',data)
                this.Api.upload(data).then(res => {
                    // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
                    //  setToken(res.data.phone)
                    if(res.data.status==1){
                        this.logoUrl = res.data.data.url
                        this.$emit('onecut',this.logoUrl)
                    }else{
                        this.$toast('图片上传失败')
                    }

                    // this.urls.showlogoUrl = url
                    console.log(res)
                }).catch(error => {
                    this.$toast('图片上传失败')
                })
            },
            getImg () {
                this.$refs.imageCropper.checkPhoto()
            },
        }
    }
</script>

<style scoped>

</style>
