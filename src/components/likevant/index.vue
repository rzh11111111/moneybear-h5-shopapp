<template>
  <div class="page">
      <div class="div-all">
          <div class="div-title">
              <div class="div-icon"></div>
              <p class="div-title-p">{{titles}}</p>
          </div>
          <div class="div-cir div-cir-left"/>

          
           <div class="div-cir  div-cir-right"/>
          <div class="div-content">
              <slot name="content"></slot>
          </div>

      </div>
  </div>
</template>

<script>
  export default {
       props: {
            titles: {
                type: String
            },
            value: {

            },
            isSimple: {
                type: Boolean,
                default: false
            }
        },
    data () {
      return {

      }
    },
    components: {

    },
    methods: {

    },
    computed: {

    },
    mounted(){

    },
  }
</script>

<style scoped lang="scss" type="text/scss">
.div-all{
    width: 339px;
    margin: 18px;
    padding:0 20px 20px;
    background: #fff;
    position: relative;
    overflow: hidden;
    .div-title{
        width: 100%;
        height: 54px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px dashed #f5f5f5;
        .div-icon{
            width:5px;
            height:16px;
            background:rgba(0,140,252,1);
            border-radius:3px;
            margin-right: 20px;
        }
        .div-title-p{
            font-size: 16px;
            color: #333;
            font-weight: 500;

        }
    }
    .div-cir{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        position: absolute;
        top: 44px;
        background: #F5F5F5;
    }
    .div-cir-left{
        left: -10px;
    }
    .div-cir-right{
        right: -10px;
    }
    .div-content{
        margin-top: 20px;
    }
}
.content2-p{
    font-size: 12px;
    color: #FF3232;
    margin-bottom: 12px;
  }
  .content2-te{
    font-size: 12px;
    color: #999;
    margin-top: 12px;
    text-align: right;
  }
 .content1{
  width: 100%;
  height: 48px;
  display: flex;
  background:rgba(245,245,245,1);
border-radius:5px;
  align-items: center;
  justify-content: space-around;
  padding-right: 14px;
  .content1-input{ 
    width: 230px;
    background: rgba(245,245,245,1);
    border:none;
    font-size: 14px;
    text-align: center;
  }
  
}
.content2{
  width: 100%;
  .content2-title{
    color: #333;
    font-size: 14px;
    margin-bottom: 5px;

  }
  .content2-p{
    font-size: 12px;
    color: #FF3232;
    margin-bottom: 12px;
  }
  .content2-choose{
    width: 100%;
    display: flex;
    align-items: center;
    overflow: auto;
    // flex-direction: row-reverse;
    .content2-icon{
      width: 73px;
      height: 30px;
      margin-right: 10px;
      
      text-align: center;
      line-height: 32px;
      border-radius: 15px;
      font-size: 13px;
    }
    .content2-true{
      background: #0092FC;
      color: #fff;
    }
    .content2-false{
      background: #F5F5F5;
      color: #666;
    }
  }
  .content3-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    .content3-titlep{
     color: #333;
     font-size: 14px; 
     width: 50%;
     font-weight:500;
    }
  }
  .content3-p{
    color: #333;
     font-size: 14px; 
      font-weight:500;
      margin-bottom: 12px;
  }
  .content3-time{
    width: 100%;
    height: 48px;
    background: #F5F5F5;
    color: #999999;
    font-size: 14px;
    line-height: 48px;
    padding: 0 12px;
    margin-bottom: 10px;
    position: relative;
    .content3-timeicon{
      width: 12px;
      height: 12px;
      position: absolute;
      right: 12px;
      top: 18px;
      img{
        width: 100%;
        height: 100%;
      }
    }

  }
  .content3-div{
    width: 100%;
    height: 120px;
    padding: 12px;
    background: #F5F5F5;
    .content3-input{
      background: #F5F5F5;
      border:none;
      width: 100%;
      height: 100%;
    }
  }
}

.content2-choose /deep/ .van-radio__icon{
    height: auto;
  }
</style>
