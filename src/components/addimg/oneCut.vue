<template>
  <div>
    <div class="imginput" v-if="!oneCut" @click="getimg">
      +
    </div>
    <div class="imgcontent" v-if="oneCut">
      <div  class="head-img" @click="look()">
      <img :src="oneCut" ref="goodsImg" />
      </div>
      <div class="add" @click="deletelicense">×</div>
    </div>
    <image-cropper ref="imageCropper" :cropperConfig="cropperConfig" :callback="loadImage"></image-cropper>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant';
  import imageCropper from "@/components/imageCropper2"
  export default {
    name: 'onecut',
    props: [
      'oneCut',
            'filecode'
    ],
    data(){
      return{
        instance:null,
        cropperConfig: {
          width: 1, // 裁剪宽度（比例）
          height: 1, // 裁剪高度（比例）
          quality: 0.7, // 图片质量（0~1之间）
          maxWidth: 750, // 导出的图片的最大宽度
          fileCategoryCode: 'FILE19011208395727'
        },
        urls:{
          showlogoUrl:'',
        },
        logoUrl:'',
      }
    },
    components: {
       imageCropper
    },
    methods:{
      deletelicense () {
        console.log('222')
        this.logoUrl = ''
        // this.urls.showlogoUrl=''
        this.$emit('onecut',this.logoUrl)
      },
      look(){
        this.$store.commit('SET_INSTANCE',ImagePreview({
          images: [
            this.oneCut,
          ]
        }))
      },
      closeImgBig() {
        this.instance.close();
      },
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
      getimg () {
        this.$refs.imageCropper.checkPhoto()
      },
    },
    watch:{
      'filecode'(){
        this.cropperConfig.fileCategoryCode=this.filecode
      }
    },
    mounted(){
      console.log(this.filecode)
      // this.cropperConfig.fileCategoryCode=this.filecode

     /* if(this.$route.name=='AddTogether'||this.$route.name=='ChangeTogether'){
        this.cropperConfig.fileCategoryCode='FILE19011295718743'
      }else if(this.$route.name=='AddPopularize'||this.$route.name=='ChangePopularize'){
        this.cropperConfig.fileCategoryCode='FILE19011298615014'
      }else if(this.$route.name=='AddSeed'||this.$route.name=='ShopBasic'){
        this.cropperConfig.fileCategoryCode='FILE19011215580409'
      }else if(this.$route.name=='ChangeMaster'){
        this.cropperConfig.fileCategoryCode='FILE19011225489456'
      }else if(this.$route.name=='AddLocal'){
        this.cropperConfig.fileCategoryCode='FILE19011205660913'
      }*/
    }
  }
</script>

<style scoped>

</style>
