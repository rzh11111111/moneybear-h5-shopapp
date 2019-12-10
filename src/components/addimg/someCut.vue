<template>
  <div class="somecut">
    <div class="contract-one">
        <div  class="contract-one-cell">
        <div class="imgcontent" v-show="urls.one0">
          <div  class="head-img"  @click="lookone(0)">
            <img ref="goodsImg" :src="urls.one0"/>
          </div>
          <div class="add" @click="deletebus(0)" >×</div>
        </div>
        <div class="imginput" v-show="!urls.one0" @click="getimg(0)">
          +
        </div>
          <p class="head-p">门头照</p>
        </div>

        <div  class="contract-one-cell">
          <div class="imgcontent" v-show="urls.one1">
            <div  class="head-img"  @click="lookone(1)">
              <img ref="goodsImg" :src="urls.one1"/>
            </div>
            <div class="add" @click="deletebus(1)" >×</div>
          </div>
          <div class="imginput" v-show="!urls.one1" @click="getimg(1)">
            +
          </div>
          <p class="head-p">店铺环境</p>
        </div>

        <div  class="contract-one-cell">
          <div class="imgcontent" v-show="urls.one2">
            <div  class="head-img"  @click="lookone(2)">
              <img ref="goodsImg" :src="urls.one2"/>
            </div>
            <div class="add" @click="deletebus(2)" >×</div>
          </div>
          <div class="imginput" v-show="!urls.one2" @click="getimg(2)">
            +
          </div>
          <p class="head-p">商品陈列</p>
        </div>
    </div>

    <div class="contract-one">
      <div  class="contract-one-cell" v-for="(value,index) in address">
        <div class="imgcontent" style="margin-bottom: 10px;"

        >
          <div  class="head-img"  @click="look(index)">
            <img ref="goodsImg" :src="value"/>
          </div>
          <div class="add" @click="deletealbums(index)" >×</div>
        </div>
      </div>
      <div class="imginput" v-show="address!== undefined &&address.length<6" @click="getimg(3)">
        +
      </div>
    </div>




    <image-cropper ref="imageCropper0" :cropperConfig="cropperConfig" :callback="loadalbums0"></image-cropper>
    <image-cropper ref="imageCropper1" :cropperConfig="cropperConfig" :callback="loadalbums1"></image-cropper>
    <image-cropper ref="imageCropper2" :cropperConfig="cropperConfig" :callback="loadalbums2"></image-cropper>
    <image-cropper ref="imageCropper3" :cropperConfig="cropperConfig" :callback="loadalbums3"></image-cropper>
  </div>
</template>

<script>
  import imageCropper from "@/components/imageCropper3"
  import { ImagePreview } from 'vant';
  export default {
    name: 'someCut',
    props: {
      someCut:{
        type:String
      },
      filecode:{
        type:String
      }
    },
    //         [
    //   'someCut',
    //         'filecode'
    // ],
    data () {
      return {
        imgUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2146046871,2611785107&fm=27&gp=0.jpg',
        cropperConfig: {
          width: 3, // 裁剪宽度（比例）
          height: 2, // 裁剪高度（比例）
          quality: 0.7, // 图片质量（0~1之间）
          maxWidth: 750, // 导出的图片的最大宽度
          fileCategoryCode: 'FILE19011208395727'
        },
        urls: {
          one0:'',
          one1:'',
          one2:'',
          Urls: []
        },
        Urls: ''
      }
    },
    components: {
      imageCropper
    },
    methods: {
      loadalbums0(data, url) {
        console.log(data)
        this.Api.upload(data).then(res => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          //  setToken(res.data.phone)

          if(res.data.status==1){
            this.urls.one0=res.data.data.url
            this.emits()
          }else{
            this.$toast('图片上传失败')
          }

        }).catch(error => {
          this.$toast('图片上传失败')
        })
      },
      loadalbums1(data, url) {
        console.log(data)
        this.Api.upload(data).then(res => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          //  setToken(res.data.phone)

          if(res.data.status==1){
            this.urls.one1=res.data.data.url
            this.emits()
          }else{
            this.$toast('图片上传失败')
          }

        }).catch(error => {
          this.$toast('图片上传失败')
        })
      },
      loadalbums2(data, url) {
        console.log(data)
        this.Api.upload(data).then(res => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          //  setToken(res.data.phone)

          if(res.data.status==1){
            this.urls.one2=res.data.data.url
            this.emits()
          }else{
            this.$toast('图片上传失败')
          }

        }).catch(error => {
          this.$toast('图片上传失败')
        })
      },
      loadalbums3(data, url) {
        console.log(data)
        this.Api.upload(data).then(res => {
          // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
          //  setToken(res.data.phone)

          if(res.data.status==1){
            this.urls.Urls.push(res.data.data.url)
            this.emits()
          }else{
            this.$toast('图片上传失败')
          }

        }).catch(error => {
          this.$toast('图片上传失败')
        })
      },
      emits(){
        if(this.urls.Urls.length){
          this.Urls = this.urls.one0+','+this.urls.one1+','+ this.urls.one2+','+ this.urls.Urls.join(',') // 要成filedata的

        }else{
          this.Urls = this.urls.one0+','+this.urls.one1+','+ this.urls.one2
        }
        this.$emit('somecut', this.Urls)
      },
      deletebus (index) {
        if(index===0){
          this.urls.one0=''
        }else if(index===1){
          this.urls.one1=''
        }else if(index===2){
          this.urls.one2=''
        }

        this.emits()
      },
      look(index){
        let somecut= this.urls.Urls
        this.$store.commit('SET_INSTANCE', ImagePreview({images:somecut,startPosition:index}))

      },
      lookone(index){
        if(index===0){
          this.$store.commit('SET_INSTANCE',ImagePreview({
            images: [
              this.urls.one0,
            ]
          }))
        }else if(index===1){
          this.$store.commit('SET_INSTANCE',ImagePreview({
            images: [
              this.urls.one1,
            ]
          }))
        }else if(index===2){
          this.$store.commit('SET_INSTANCE',ImagePreview({
            images: [
              this.urls.one2,
            ]
          }))
        }

      },
      deletealbums (index){
        this.urls.Urls.splice(index,1)
        // this.Urls = this.urls.Urls.join(',')
        // this.$emit('somecut', this.Urls)
        this.emits()
      },
      getimg (index) {
        if(index==0){
          this.$refs.imageCropper0.checkPhoto()
        }else if(index==1){
          this.$refs.imageCropper1.checkPhoto()
        }else if(index==2){
          this.$refs.imageCropper2.checkPhoto()
        }else if(index==3){
          this.$refs.imageCropper3.checkPhoto()
        }

      },
    },
    computed: {
      address () {
        let one
        let urll
        if(this.someCut==''){
          urll=[]
          return urll
        }else{
          this.Urls=this.someCut
          urll=this.someCut.split(',')
          if(urll.length>3){
            one=urll.splice(0,3)
            this.urls.one0=one[0]
            this.urls.one1=one[1]
            this.urls.one2=one[2]
            console.log(urll,urll.length)
            this.urls.Urls=urll
            return urll
          }else if(urll.length==3){
            one=urll.splice(0,3)
            this.urls.one0=one[0]
            this.urls.one1=one[1]
            this.urls.one2=one[2]
            console.log(urll,urll.length)
            this.urls.Urls=urll
            return urll
          }else if(urll.length==2){
            one=urll.splice(0,3)
            this.urls.one0=one[0]
            this.urls.one1=one[1]
            console.log(urll,urll.length)
            this.urls.Urls=urll
            return urll
          }else if(urll.length==1){
            one=urll.splice(0,3)
            this.urls.one0=one[0]
            console.log(urll,urll.length)
            this.urls.Urls=urll
            return urll
          }else if(!urll.length){
            console.log('meiyouchangdu')
            //或者是旧版
            // urll=[]
            urll=[]
            this.urls.Urls=[]
            return urll
          }else{
            console.log('xiaoyu6')

            this.urls.Urls=urll
            return urll
          }
        }
        // this.urls.Urls=urll
        // this.Urls=this.someCut

      }
    },
    watch:{
      'filecode'(){
        console.log(this.filecode)
        this.cropperConfig.fileCategoryCode=this.filecode
      }
    },
    mounted(){

      // this.cropperConfig.fileCategoryCode=this.filecode
    }
  }
</script>

<style scoped lang="scss">
  .somecut{
    display: flex;
    flex-wrap: wrap;
  }
  .imgcontent{
    /*margin-bottom: 10px;*/
  }
  .imgcontent /deep/ .add{
    margin-bottom: 10px;
  }

  .contract-one{
    display: flex;
    flex-wrap:wrap;
    justify-content:start;
    width: 100%;
  .contract-one-cell{
    width: 30%;
    /*display: flex;*/
    /*flex-direction:column;*/
    /*justify-content:center;*/
  }
  }
</style>
