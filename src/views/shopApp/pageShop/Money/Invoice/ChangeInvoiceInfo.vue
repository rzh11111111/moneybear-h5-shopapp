<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div class="bindcard-content anzhuotop">

              <div >
              <p class="content2-p">账号类型</p>
              <div class="content2">
                 <van-radio-group class="content2-choose" v-model="invioce.invoiceType" @change="choosetype" >
              <van-radio name="1">
                <div
                  slot="icon"
                  slot-scope="props"
                  :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                >
                  增值税普通发票<br>(电子发票)
                </div>
                </van-radio>
              <van-radio name="2">
                <div
                  slot="icon"
                  slot-scope="props"
                  :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                >
                 增值税专用发票<br>(纸质发票)
                </div>
              </van-radio>
              
            </van-radio-group>
              </div>
              
            </div>
<div >
              <p class="content2-p">一般纳税人资格证明</p>
              <div>
                <p  class="info-p">如：贵企业也开具的增值税专用发票复印件</p>
                <one-not-cut
                @onenotcut="addPicUrl"
                :one-not-cut="invioce.qualificationUrl"
                filecode="FILE19011225489456"
              ></one-not-cut>
              </div>
              
            </div>
  

     <div  class="bindcard-li"  >
      <p   class="bindcard-lil" >名称</p>
      <div   class="bindcard-lir">
        {{invioce.serviceName}}
      </div>
    </div>
<div  class="bindcard-li"  >
      <p   class="bindcard-lil" >纳税人识别号</p>
      <div   class="bindcard-lir">
        {{invioce.bcCode}}
      </div>
    </div>

        <div >
              <p class="content2-p">银行账号</p>
              <div class="content1" >
              <input class="content1-input"  type="number"  v-model="invioce.bankNo" placeholder='请输入'>
              
              </div>
              
            </div>
<div >
              <p class="content2-p">开户行</p>
              <div class="content1" >
              <input class="content1-input"  type="text"  v-model="invioce.bankName" placeholder='请输入'>
              
              </div>
              
            </div>



            <p class="content3-p">营业地址</p>
                <div class="content3-div">
                  <!-- <input type="textarea" style="overflow: hidden" placeholder='选填，您最多可以填写200字' max=200> -->
                  <textarea
                    maxlength="200"
                    v-model="invioce.address"
                    class="content3-input"
                     placeholder='请输入'
                  ></textarea>
                </div>

                <div >
              <p class="content2-p">联系电话</p>
              <div class="content1" >
              <input class="content1-input"  type="number" pattern="number"  v-model="invioce.phone" placeholder='请输入'>
              
              </div>
              
            </div>
            <div >
              <p class="content2-p">邮寄地址</p>
              <div class="content1" >
              <input class="content1-input"  type="text"  v-model="invioce.mailContacts" placeholder='联系人'>
              
              </div>
              <div class="content1" >
              <input class="content1-input"  type="text"  v-model="invioce.mailPhone" placeholder='联系电话'>
              
              </div>
              <div class="content3-div">
                  <!-- <input type="textarea" style="overflow: hidden" placeholder='选填，您最多可以填写200字' max=200> -->
                  <textarea
                    maxlength="200"
                    v-model="invioce.mailAddress"
                    class="content3-input"
                    placeholder='详细地址'
                  ></textarea>
                </div>
            </div>
    </div>
    <div class="content-bottom">
<van-button type="info" size="large" @click="submitBasic" class="submitbtn">编辑开票信息</van-button>
    </div>
  </div>
</template>

<script>
import oneNotCut from '@/components/addimg/oneNotCut'
  export default {
    data () {
      return {
        topheader: {
        name: '编辑开票信息',
        left: '1',
        heade: 'header0',
      },
      invioce:{
        bcRegisterType:1,  //营业执照类型 1.个人 2.企业

        serviceType:1,  //'1.线上企业 2.线下店铺'
        invoiceType:'2', //'1.电子发票 2.专用发票'
        qualificationUrl:'', //'一般纳税人资格证明'
        serviceName:'3231',  //'所属企业名称'
        bcCode:'',  //'纳税人识别号'
        bankNo:'', //'银行卡号'
        bankName:'',  //'开户行'
        address:'',  //'详情地址'
        phone:'', //'企业联系方式'
        mailAddress:'',   //'邮寄地址'
        mailContacts:'',  //邮寄联系人'
        mailPhone:'',  //'邮寄电话'

        email:'', //'邮箱'


      }
      }
    },
    components: {
      oneNotCut
    },
    methods: {
      choosetype(msg){

      },
      addPicUrl(msg){
        this.invioce.qualificationUrl = msg
      },
      submitBasic(){

      }
    },
    computed: {

    },
    mounted(){

    },
  }
</script>

<style scoped lang="scss" type="text/scss">
  .van-radio /deep/ .van-radio__icon{
    height: auto;
  }
  .bindcard-content{
    background: #fff;
    margin: 10px 18px 80px;
    width: calc(100%-36px);
    padding: 20px;
    .bindcard-li{
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 40px;
      line-height: 40px;
      .bindcard-lil{
        width: 120px;
        color: #333333;
        font-size: 14px;
        font-weight: 600;
      }
      .bindcard-lir{
        color: #666;
        font-size: 14px;
      }
    }
  }
   .content2-choose{
    width: 100%;
    display: flex;
    align-items: center;
    overflow: auto;
    .content2-icon{
      // width: 73px;
      // height: 30px;
      margin-right: 10px;
      padding: 6px 20px;
      text-align: center;
      line-height: 18px;
      border-radius: 30px;
      font-size: 12px;
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
    .content2-p{
    color: #333;
    font-size: 14px;
    font-weight: 600;
    margin-top: 14px;
  }
     .content1{
  width: 100%;
  height: 48px;
  display: flex;
  background:rgba(245,245,245,1);
border-radius:5px;
  align-items: center;
  justify-content: space-around;
  margin: 12px 0;
  .content1-input{
    width: 90%;
    background: rgba(245,245,245,1);
    border:none;
    font-size: 14px;
    
  }
  
}
.content2{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 12px 0;
}
  .content3-p{
    color: #333;
     font-size: 14px; 
      font-weight:600;
      margin-bottom: 12px;
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
      font-size:14px;
    }
  }


  .info-p{
    color: #666;
    font-size: 12px;
    margin: 4px 0 12px;
  }
  .content-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
