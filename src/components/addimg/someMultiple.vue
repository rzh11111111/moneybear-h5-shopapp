<template>
    <div class="somemultiple">
      <div class="imgcontent"
           v-for="(value,index) in address"
      >
        <div  class="head-img" @click="look(index)">
        <img :src="value" ref="goodsImg" />
        </div>
        <div class="add" @click="deletebus(index)" >×</div>

      </div>
      <van-uploader :after-read="addbus" multiple v-show="address!== undefined &&address.length<parseInt(number)">
        <div class="imginput" >
          +
        </div>

      </van-uploader>

    </div>
</template>

<script>
  import { ImagePreview } from 'vant';
  import {onewatermark} from "@utils";
  import lrz from 'lrz'
export default {
  name: 'somemultiple',
  props: [
    'someMultiple',
          'filecode',
          'number',
          'index' //修改店主资料时的列表
  ],
  data () {
    return {
      fileCategoryCode: 'FILE19011208395727',
      urls: {
        Urls: []
      },
      Urls: ''
    }
  },
  methods: {
     addbus (file) { // 有错
       console.log(this.number-1,this.urls.Urls.length)
      if (Array.isArray(file)) {
        for (let files in file) {
          if (this.urls.Urls.length > (this.number-1)) {
            console.log('多了')
          } else {
            lrz(file[files].content,{
              quality:0.5
            }).then(rst=>{
              console.log(rst)
              let blob = this.dataURItoBlob(rst.base64)
              let fd = new FormData()
              fd.append('filename', blob, file[files].file.name)
              fd.append('fileCategoryCode', this.fileCategoryCode)
              this.Api.upload(fd).then(res => {

                if(res.data.status==1){
                  this.urls.Urls.push(res.data.data.url)
                  if(this.urls.Urls.length>(this.number-1)){
                    this.urls.Urls.length=parseInt(this.number)
                  }

                  this.Urls = this.urls.Urls.join(',')
                  this.$emit('somemultiple', this.Urls,this.index)
                }else{
                  this.$toast('图片上传失败')
                }

              }).catch(error => {
                this.$toast('图片上传失败')
              })

             /* onewatermark(rst,(result)=> {
                let blob = this.dataURItoBlob(result)

                let fd = new FormData()
                fd.append('filename', blob, file[files].file.name)
                fd.append('fileCategoryCode', this.fileCategoryCode)
                this.Api.upload(fd).then(res => {

                  // this.urls.showUrl = file.content
                  if (res.data.status == 1) {
                    this.urls.Urls.push(res.data.data.url)
                    this.Urls = this.urls.Urls.join(',')
                    this.$emit('somemultiple', this.Urls)
                  } else {
                    this.$toast('图片上传失败')
                  }

                }).catch(error => {
                  // alert(JSON.stringify(error))
                  this.$toast('图片上传失败')
                })
              })*/

            })


          }
        }
      } else {

        lrz(file.content,{
          quality:0.5
        }).then(rst=>{
          console.log(rst)
          let blob = this.dataURItoBlob(rst.base64)
          let fd = new FormData()
          fd.append('filename', blob, 'img.jpg')
          fd.append('fileCategoryCode', this.fileCategoryCode)
          this.Api.upload(fd).then(res => {
            this.urls.Urls.push(res.data.data.url)
            this.Urls = this.urls.Urls.join(',')
            this.$emit('somemultiple', this.Urls,this.index)
            console.log(this.Urls)
          }).catch(error => {
            console.log(error)
          })

         /* onewatermark(rst,(result)=> {

            let blob = this.dataURItoBlob(result)

            let fd = new FormData()
            fd.append('filename', blob, 'img.png')
            fd.append('fileCategoryCode', this.fileCategoryCode)
            this.Api.upload(fd).then(res => {

              // this.urls.showUrl = file.content
              if(res.data.status==1){
                this.urls.Urls.push(res.data.data.url)
                this.Urls = this.urls.Urls.join(',')
                this.$emit('somemultiple', this.Urls)
              }else{
                this.$toast('图片上传失败')
              }

            }).catch(error => {
              // alert(JSON.stringify(error))
              this.$toast('图片上传失败')
            })
          })*/



        })





      }

    },
    deletebus (index) {
      this.$delete(this.urls.Urls, index)
      this.Urls = this.urls.Urls.join(',') // 要成filedata的
      this.$emit('somemultiple', this.Urls,this.index)
    },
    look(index){

      console.log('111',index)
      let someMultiple=this.someMultiple.split(',')
      this.$store.commit('SET_INSTANCE',  ImagePreview({images:someMultiple,startPosition:index}))

    },
    dataURItoBlob (base64Data) {
      let byteString
      if (base64Data.split(',')[0].indexOf('base64') >= 0) { byteString = atob(base64Data.split(',')[1]) } else { byteString = unescape(base64Data.split(',')[1]) }
      let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
      let ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], {type: mimeString})
    }
  },
  computed: {
    address () {
      let urll
      if(this.someMultiple){

        urll=this.someMultiple.split(',')
      }else{
        urll=[]
      }
      // let urll=this.someMultiple.split(',')
      this.urls.Urls=urll
      this.Urls=this.someMultiple
      return urll
    }
  },
  watch:{
    'filecode'(){
      console.log(this.filecode)
      this.fileCategoryCode=this.filecode
    }
  },
  mounted(){
    this.fileCategoryCode=this.filecode
  }
}
</script>

<style scoped>
.somemultiple{
  display: flex;
  flex-wrap: wrap;
}
.imgcontent{
  margin-bottom: 10px;
}
.imgcontent /deep/ .add{
  margin-bottom: 10px;
}
</style>
