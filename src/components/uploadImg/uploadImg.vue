
<template>
    <div class="uploadImg">
        <van-image-preview
                v-model="show"
                :images="fileList"
                @change="onChange"
                :startPosition="preIndex"
        >
        </van-image-preview>
        <van-row type="flex" justify="start" class="van-uploader__wrapper">
            <div class="van-image van-uploader__preview-image" v-for="(item, index) in fileList" :key="index" v-if="item">
                <img :src="item" class="van-image__img" alt="" style="object-fit: cover;" @click="show = true, preIndex = index">
                <i class="van-icon van-icon-delete van-uploader__preview-delete" @click="deleteImg(index)"></i>
            </div>
            <van-uploader :after-read="afterRead" class="uploadImg" :max-size="1024*1024*3" @oversize="oversizeMt">
                <div class="imginput" style="background: rgba(128,128,128,0.11)">+</div>
            </van-uploader>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: "uploadImg",
        props: {
            maxSize: {
                type: Number,
                default: 1
            },
            value: {

            },
            isSimple: {
                type: Boolean,
                default: false
            }
        },
        watch:{
            value:{
                handler(newValue,oldValue){
                    if(this.value) {
                        this.fileList = (typeof this.value) === 'string' ? [this.value] : this.value.filter((item)=> {return item!==''})
                    }
                },
                // deep:true
            },
        },
        data() {
            return {
                fileList: this.value,
                show: false,
                preIndex: 0
            }
        },
        mounted() {
            // this.fileList = (typeof this.value) === 'string' ? [this.value] : this.value.filter((item)=> {return item!==''})
            // console.log(this.fileList);
            // console.log('我来了');
            // console.log(this.fileList);

        },
        methods: {
            onChange() {

            },
            afterRead(val) {
                console.log(this.fileList);
                if(this.fileList.length === this.maxSize) {
                    return this.$toast(`最多上传${this.maxSize}张图片`)
                }
                this.uploadImage(val.file);

            },
            oversizeMt() {
                return this.$toast(`图片大小不能超过3M!`)
            },
            uploadImage (file) {
                let fd = new FormData()
                fd.append('filename', file);
                fd.append('fileCategoryCode', 'FILE19011208395727')
                this.Api.upload(fd).then(res => {
                    if(res.data.status==1){
                        this.fileList.push(res.data.data.url);
                        console.log(this.fileList);
                        this.$emit('input', this.fileList);
                    }else{
                        this.$toast('图片上传失败')
                    }
                }).catch(error => {
                    this.$toast('图片上传失败')
                })
            },
            deleteImg(index) {
                this.fileList.splice(index, 1);
                this.$emit('input', this.fileList);
            }

        }
    }
</script>

<style scoped>
    .uploadImg {
        margin: 10px 0 10px 10px ;
    }
    .van-uploader__preview-image{
        width: 48px;
        height: 48px;
        margin: 10px 0 0 10px ;
    }
    img{
        width: 48px;
        height: 48px;
    }
</style>
