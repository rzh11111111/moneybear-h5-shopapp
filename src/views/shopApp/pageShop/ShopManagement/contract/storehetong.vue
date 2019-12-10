<template>
  <div class="page" style="height:100vh;width:100%;">
      <top-column :top-header="topheader" @tohetong="tohistory"></top-column>
      <van-notice-bar
      :scrollable="false"
      left-icon="info-o"
      mode="closeable"
      style="width: 100%;"
      v-if="status!=0"
    >
    <div style="display: flex;font-size: 12px;justify-content: space-between">
        <p  style='width:70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>{{hetongs}}</p>
        <p class="bluecolor" v-if="status==2||status==3" @click="memberok">查看原因</p>
        <p class="bluecolor" v-else-if="status==4||status==5" @click="tocontract">去签合同</p>
      </div>
    </van-notice-bar>
  
  

  <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
<div class="content-bottom">
           <van-button type="primary" size="large" @click="look" class="submitbtn">查看合同</van-button>
          </div>
     <van-popup
  v-model="show"
  
  position="bottom"
  :style="{ height: '30%' }"
>
<p class="hetong-popt">查看原因</p>
<p class="hetong-popb">原因类型：受渠道成本增长影响。</p>
<p class="hetong-popb">详细说明：{{contractremakes.updateExplain||''}}</p>
<van-button type="primary" size="large" @click="tocontract" class="submitbtn hetong-popbutton">去签合同</van-button>
</van-popup>
  </div>
</template>

<script>
// import pdf from 'vue-pdf'
import PDFJS from "pdfjs-dist";
 import {back,lookContract} from '@/utils'
  export default {
    data () {
      return {
          topheader: {
          name: '合同',
          left: '1',
          heade: 'header'
        },
        show:false,
        hetong:'',
        numPages: undefined,
        status:'',
        contractremakes:'',
        contr:'',
        pdfDoc:null,
	      pages:0
      }
    },
    components: {
    // pdf
    },
    methods: {
      look(){
        lookContract(this.hetong)
      },
        tocontract(){
      this.$router.push({ path:'addcontract', query: { status: this.$route.query.status } })
    },
        tohistory(value){
            console.log(value)
          this.$router.push({path:'historyhetong',query:{id:this.$route.query.id}})
        },
        memberok(){
            this.show=true;
        },
        inputblur(){

        },
       changebtn(){
        //  this.$router.push('changehetong')
       },
       _renderPage(num) {
      this.pdfDoc.getPage(num).then(page => {
        let canvas = document.getElementById("the-canvas" + num);
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1;
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        let ratio = dpr / bsr;
        let viewport = page.getViewport(
          screen.availWidth / page.getViewport(1).width
        );
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;
        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
        if (this.pages > num) {
          this._renderPage(num + 1);
        }
      });
    },
    _loadFile(url) {
      PDFJS.getDocument(url).then(pdf => {
        this.pdfDoc = pdf;
        this.pages = this.pdfDoc.numPages;
        this.$nextTick(() => {
          this._renderPage(1);
        });
      });
    }

    },
        computed:{
      hetongs(){
        switch(this.status){
          case 0:
            return ' '
          case 1:
            return '入驻未完成，请及时签合同。'
          case 2:
            return '合同发生变更，请及时改签。'
          case 3:
            return '合同发生变更，已停用收款功能。请及时改签。'
          case 4:
            return '续签(合同临期)，请及时续签。'
          case 5:
            return '合同已到期，请及时续签。'
            case '1':
            return '入驻未完成，请及时签合同。'
          case '2':
            return '合同发生变更，请及时改签。'
          case '3':
            return '合同发生变更，已停用收款功能。请及时改签。'
          case '4':
            return '续签(合同临期)，请及时续签。'
          case '5':
            return '合同已到期，请及时续签。'
            default:
            return ' '
        }
      }
    },
    mounted(){



        back('#ffffff')
        this.hetong=this.$route.query.img
        // this.hetong=pdf.createLoadingTask(this.$route.query.img);
         this.status=this.$route.query.status
         let para={
        storeId:this.$route.query.id
      }
         this.Api.lookChangeContract(para).then(res=>{
        this.contractremakes=res.data.data
      })
    //     this.hetong.then(pdf => {

		// 	this.numPages = pdf.numPages;
    // });
    let getpdf = this.$route.query.img;
    let obj = {};
    obj.url = `${getpdf}?fpdm=${this.$route.query.fpdm}&fphm=${ //每个人地址不同 不要盲目复制粘贴
      this.$route.query.fphm
    }&djxh=${this.$route.query.djxh}`;
    obj.httpHeaders = {
      token: localStorage.getItem("token")
    };
    const CMAP_URL = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.943/cmaps/';
    obj.cMapUrl = CMAP_URL
    obj.cMapPacked = true
    this._loadFile(obj);
  
    },
  }
</script>

<style scoped lang="scss" type="text/scss">

 .hetong-popt{
     color: #333;
     font-size: 16px;
     text-align: center;
     margin-top: 18px;
 }
 .hetong-popb{
     color: #666;
     font-size: 14px;
     margin: 14px 18px;
 }
 .hetong-popbutton{
    //  bottom: -30px;
 }
.storehetong-img{
  width: 100%;

}
    .changebtn {
  width: 44px;
  height: 44px;
  background: linear-gradient(
    137deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  border: 1px solid rgba(223, 223, 223, 1);
  border-radius: 50%;
  font-size: 9px;
  color: rgba(0, 136, 253, 1);
  line-height: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 20px;
  bottom: 200px;
  div {
    width: 15px;
    height: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.content-bottom {
 
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>
