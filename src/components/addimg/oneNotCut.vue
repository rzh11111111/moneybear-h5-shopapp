<template>
  <div>
    <div class="imgcontent" v-if="oneNotCut">
      <div  class="head-img"  @click="look()">
      <img  :src="oneNotCut" ref="goodsImg" />
      </div>
      <!--<img class="head-img" :src="oneNotCut.bcPicUrl" ref="goodsImg" />-->
      <div class="add" @click="deletebcPicUrl()" >×</div>
    </div>

    <van-uploader :after-read="addidjust"  v-if="!oneNotCut">
      <div class="imginput" >
        <div class="imginput1">
          +
        </div>
        <div class="imginput2">
          头像面
        </div>
        <div class="imginput3">
          国徽面
        </div>
      </div>
    </van-uploader>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant';
  import {onewatermark} from "@utils";
  import lrz from 'lrz'
export default {
  name: 'onecut',
  props: [
    'oneNotCut',
    'filecode'
  ],
  data () {
    return {
      fileCategoryCode: 'FILE19011208395727',
      urls: {
        showUrl: ''
      },
      Url:'',
      urlFile:'',
    }
  },
  methods: {
    deletebcPicUrl () {
      this.Url = ''
      // this.urls.showUrl = ''
      this.$emit('onenotcut', this.Url)
    },
    look(){
      this.$store.commit('SET_INSTANCE',ImagePreview([
        this.oneNotCut,
      ]))

    },
    addidjust (file) {
      // let blob2=this.imgCompress(file,{quality: 0.2})
      lrz(file.content,{
        quality:0.5
      }).then(rst=>{
        console.log(rst)
        let blob = this.dataURItoBlob(rst.base64)

        let fd = new FormData()
        fd.append('filename', blob, 'img.jpg')
        fd.append('fileCategoryCode', this.fileCategoryCode)
        this.Api.upload(fd).then(res => {

          // this.urls.showUrl = file.content
          if(res.data.status==1){
            this.Url = res.data.data.url
            this.$emit('onenotcut', this.Url)
          }else{
            this.$toast('图片上传失败')
          }

        }).catch(error => {
          this.$toast('图片上传失败')
        })

       /* onewatermark(rst,(result)=> {
          let blob = this.dataURItoBlob(result)

          let fd = new FormData()
          fd.append('filename', blob, 'img.png')
          fd.append('fileCategoryCode', this.fileCategoryCode)
          this.Api.upload(fd).then(res => {

            // this.urls.showUrl = file.content
            if(res.data.status==1){
              this.Url = res.data.data.url
              this.$emit('onenotcut', this.Url)
            }else{
              this.$toast('图片上传失败')
            }

          }).catch(error => {
            // alert(JSON.stringify(error))
            this.$toast('图片上传失败')
          })
        })*/
      })

    },
    compress(img,Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext('2d');
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = width * height / 4000000) > 1) {
        console.log("大于400万像素")
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
//        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = width * height / 1000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
//            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if(Orientation != "" && Orientation != 1){
        switch(Orientation){
          case 6://需要顺时针（向左）90度旋转
            this.rotateImg(img,'left',canvas);
            break;
          case 8://需要逆时针（向右）90度旋转
            this.rotateImg(img,'right',canvas);
            break;
          case 3://需要180度旋转
            this.rotateImg(img,'right',canvas);//转两次
            this.rotateImg(img,'right',canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1);
      console.log('压缩前：' + initSize);
      console.log('压缩后：' + ndata.length);
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
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

</style>
