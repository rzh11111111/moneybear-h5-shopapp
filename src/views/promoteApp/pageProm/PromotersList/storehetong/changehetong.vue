<template>
  <div class="app-init">
      <top-column :top-header="topheader"></top-column>
      <div class="changeht-title">修改后需平台审核，店铺签署后生效</div>
      <div class=" anzhuotop">
          <div  v-show="steps==1" class="steps1 bindcard-content">
          <div >
              <p class="content2-p">原因类型</p>
              <div class="content1" @click="reasons.onoff=true">
              <input class="content1-input" readonly type="text"  :value="updateReason" placeholder='请选择'>
              <div  class="content1-right">></div>
              </div>
              
            </div>
            <div>
                <p class="content3-p"> 详细说明</p>
              <div  class="content3-div">
                <!-- <input type="textarea" style="overflow: hidden" placeholder='选填，您最多可以填写200字' max=200> -->
                <textarea  placeholder="店铺可查看。请认真填写。"  maxlength="200" v-model="updateExplain" class="content3-input"></textarea>
              </div>
            </div>
            <div >
              <p class="content3-p" style="margin-top:10px;">审核通过后是否强制改签</p>
              <div class="content1" @click="Forces.onoff=true">
              <input class="content1-input"  readonly type="text"  :value="isForceUpdate === 1?'强制改签(不改签不能收款)':isForceUpdate === 0?'否':''" placeholder='请选择'>
               <div  class="content1-right">></div>
              </div>
              
            </div>
            <div>
                <p class="content3-p"> 备注</p>
              <div  class="content3-div">
                <!-- <input type="textarea" style="overflow: hidden" placeholder='选填，您最多可以填写200字' max=200> -->
                <textarea   placeholder='(选填)仅审核人员可查看。'  maxlength="200" v-model="remarks" class="content3-input"></textarea>
              </div>
            </div>
            <div class="content-bottom">
              <van-button type="primary" size="large" @click="nextstep" class="submitbtn" >下一步</van-button>
          </div>
            </div>
          <div v-show="steps==2" class="steps2">
   
          <div class="hetong-title">
            <div style="display:flex;align-items:center; justify-content: flex-start;" v-for="(item,index) in stepinfor.stepimg" :key="index">
              <div class="httitle-content" v-if="index!==1">
                <img  class="httitle-contentimg" :src="stepinfor.steps<index?item.falseimg:stepinfor.steps===index?item.nowimg:item.trueimg"/>
                <p  :class="stepinfor.steps>index?'httitle-contentp bluecolor':'httitle-contentp'">{{item.name}}</p>
              </div>
              <div :class="stepinfor.steps<index+1?'httitle-div blacktop':'httitle-div bluetop'" v-if="index+1!==stepinfor.stepimg.length&&index!==1"></div>
            </div>
          </div>
          <div v-show="stepinfor.steps===0">
           
              
            <likevant titles='结算给店铺'>
              
            <div slot="content" >
              <!-- <p class="content2-p">折扣价格包含营销费用</p> -->
              <div class="content1"  @touchstart.stop="zhekoushow=true" style="padding-left:10px;">
              收款金额的
              <input class="content1-input"  style="width:50%;" type="text" disabled :value="storeSettlement" placeholder='范围：1.00 ~ 95.00'>
              %
              </div>
              
            </div>
            
            </likevant>
            
           
          <div class="content-bottom">
              <van-button type="primary" size="large" @click="inputstepsinfo(true)" class="submitbtn" >下一页</van-button>
            
          </div>
       
          </div>
          <div v-show="stepinfor.steps===1">
           
            <likevant titles='营销费用'>
            <div slot="content" class="content2">
              <p class="content2-title">平台收取收款金额的</p>
              <p class="content2-p">折扣价格包含营销费用,不重复收取</p>
              <van-radio-group class="content2-choose" v-model="ratePlatform">
              <van-radio name="4">
                <div
                  slot="icon"
                  slot-scope="props"
                  :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                >
                  4%
                </div>
                </van-radio>
              <van-radio name="5">
                <div
                  slot="icon"
                  slot-scope="props"
                  :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                >
                  5%
                </div>
              </van-radio>
              <van-radio name="6">
                <div
                  slot="icon"
                  slot-scope="props"
                  :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                >
                  6%
                </div>
              </van-radio>
            </van-radio-group>
            </div>
          </likevant>
            
           
          <div class="content-bottom">
            <van-button type="default" @click="inputstepsinfo(false)">上一页</van-button>
            <van-button type="primary" @click="inputstepsinfo(true)">下一页</van-button>
          </div>
          </div>
          <div v-show="stepinfor.steps===2">
            
            <likevant titles='其他相关'>
            <div slot="content" class="content2">
              <div class="content3-title">
                <p class="content3-titlep">经营者是否法人</p>
              <van-radio-group class="content2-choose" v-model="operatorType">
              <van-radio name="1">
                <div
                  slot="icon"
                  slot-scope="props"
                  :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                >
                  是
                </div>
                </van-radio>
              <van-radio name="2">
                <div
                  slot="icon"
                  slot-scope="props"
                  :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                >
                  否
                </div>
              </van-radio>
              
            </van-radio-group>
              </div>
              <p class="content3-p"> 合同时间</p>
              
              <div class="content3-time" >
                店铺签合同之日起1年整
                
              </div>
              <p class="content3-p"> 其他约定</p>
              <div  class="content3-div">
                <!-- <input type="textarea" style="overflow: hidden" placeholder='选填，您最多可以填写200字' max=200> -->
                <textarea  maxlength="200" v-model="otherAppointment" class="content3-input"></textarea>
              </div>
            </div>
          </likevant>
            
            
          <div class="content-bottom">
            <van-button type="default" @click="inputstepsinfo(false)">上一页</van-button>
            <van-button type="primary" @click="inputblur">下一步</van-button>
          </div>
          </div>
        
      </div>
      </div>

<van-number-keyboard
      v-model="storeSettlement"
       :show="zhekoushow"
      theme="custom"
      extra-key="."
      :maxlength="5"
      close-button-text="下一页"
      @blur="zhekoushowblur"
      @close='inputstepsinfo(true)'
    />

<van-popup v-model="reasons.onoff" position="bottom">
        <van-picker
          :columns="reasons.list"
          cancel-button-text="取消"
          @confirm="reasonstrue"
          @cancel="reasonsfalse"
          show-toolbar
          title="选择"
        />
      </van-popup>

<van-popup v-model="Forces.onoff" position="bottom">
        <van-picker
          :columns="Forces.list"
          cancel-button-text="取消"
          @confirm="Forcestrue"
          @cancel="Forcesfalse"
          show-toolbar
          title="选择"
        />
      </van-popup>
<van-popup 
        v-model="show"
        :close-on-click-overlay=false
        style="width:90%;height:90vh;"
        >
           <div class="div-all">
          <div class="div-title">
              <div class="div-icon"></div>
              <p class="div-title-p">请再次核对信息</p>
          </div>
          <div class="div-cir div-cir-left"/>
           <div class="div-cir  div-cir-right"/>
          <div class="div-content">
              <ul class="add-ul">
                  <li class="add-li">
                      <p  class="add-lil redcolor">结算给店铺</p>
                      <p  class="add-lir redcolor">{{storeSettlement}}%</p>
                  </li>
                  <!-- <li class="add-li">
                      <p  class="add-lil redcolor">营销费用</p>
                      <p  class="add-lir redcolor">{{ratePlatform}}%</p>
                  </li> -->
                  <li class="add-li">
                      <p  class="add-lil  redcolor">经营者是否法人</p>
                      <p  class="add-lir  redcolor">{{operatorType=='1'?'法人':'非法人'||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">合同期限</p>
                      <p  class="add-lir">店铺签合同之日起1年整</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">原因类型</p>
                      <p  class="add-lir">{{updateReason||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">详细说明</p>
                      <p  class="add-lir">{{updateExplain||''}}</p>
                  </li>
                  <li :class="isForceUpdate=='1'?'add-li redcolor':'add-li'">
                      <p  class="add-lil">审核后是否强制改签</p>
                      <p  class="add-lir">{{isForceUpdate=='1'?'是,不改签不能收款':'否'||''}}</p>
                  </li>
              </ul>
              
              <div class="content-bottom">
            <van-button type="default"  @click="clickul(false)">取消</van-button>
            <van-button type="primary" @click="clickul(true)" >确认无误</van-button>
          </div>
          </div>

      </div>
        </van-popup>
  </div>
</template>

<script>
import likevant from '@/components/likevant'
import {back,inputup,inputup2,accMul,accDiv} from '@/utils'
  export default {
    data () {
      return {
          accMul,
          topheader: {
          name: '修改合同',
          left: '0',
          heade: 'header'
        },
        
        stepinfor:{
        steps:0,
        stepimg:[
        {
          name:'设置折扣',
          trueimg:require('@/assets/img/hetong/true1.png'),
          nowimg:require('@/assets/img/hetong/now1.png'),
          falseimg:require('@/assets/img/hetong/false1.png')
        },
        {
           name:'营销费用', 
          trueimg:require('@/assets/img/hetong/true2.png'),
          nowimg:require('@/assets/img/hetong/now2.png'),
          falseimg:require('@/assets/img/hetong/false2.png')
        },
        {
           name:'其他', 
          trueimg:require('@/assets/img/hetong/true3.png'),
          nowimg:require('@/assets/img/hetong/now3.png'),
          falseimg:require('@/assets/img/hetong/false3.png')
        }
        ],
      },
        reasons:{
            onoff:false,
            list:['受渠道成本增加影响']
        },
        Forces:{
            onoff:false,
            list:['否']
        },
        updateReason:'', //原因类型
        operatorType:'', //经营者类型1法人2非法人
        updateExplain:'', //改签详细说明
        isForceUpdate:'', //是否强制改签0否1是
        remarks:'', // 备注
        otherAppointment:'', //其他说明
        steps:1,
        zhekoushow:false,
        ratePlatform:'4', //平台服务费
        storeSettlement:'', //平台折扣
        show:false,
        ischange:''
      }
    },
    components: {
        likevant
    },
    methods: {
        goback(){
            if(this.show==true){
                this.show=false
            }else if (this.steps == 2) {
        this.stepinfor.steps=0 
        this.zhekoushow=false
        this.steps = 1
        this.topheader.name = '修改合同'
      }  else {
        
          this.$router.go(-1)
        
      }
        },
        reasonstrue(picker){
            this.updateReason = picker
      this.reasons.onoff = false
        },
        reasonsfalse(){
            this.reasons.onoff = false
        },
        Forcestrue(picker){
            
            picker=='强制改签(不改签不能收款)'?this.isForceUpdate = 1:this.isForceUpdate = 0
      this.Forces.onoff = false
        },
        Forcesfalse(){
            this.Forces.onoff = false
        },
        nextstep(){
            if(this.updateReason&&this.updateExplain&&this.isForceUpdate>=0){
                this.steps+=1
            this.topheader.name='填写合同信息'
                
                return
            }
            this.$toast('请填写完整')
        },
        inputblur(){
            console.log('11')
            if(this.storeSettlement&&this.operatorType){
                this.show=true
            }else{
                this.$toast('请填写完整')
            }
        },
        zhekoushowblur(){
      console.log('111')
      this.zhekoushow=false
    },
    inputstepsinfo(types){
      
        if(this.stepinfor.steps===0){
        if(!/^((([1-9]|[1-8]\d|9[0-5])(\.\d{1,2})?)|95.0|95.00)$/.test(this.storeSettlement)){
        this.$toast('范围：1.00 ~ 95.00')
        return
      }
      //  if(Number(this.storeSettlement)<1){
      //   this.$toast('范围：1.00 ~ 95:00')
      //   return
      // }
      // if(Number(this.storeSettlement)<0.1||Number(this.storeSettlement)>9.5){
      //   this.$toast('请输入0.1-9.5折')
      //   console.log(Number(this.storeSettlement))
      //   return
      // }
      types?this.stepinfor.steps+=2:''
      return
      }else if(this.stepinfor.steps===2){
        types?'':this.stepinfor.steps-=2
        return
      }
      
      
      types?this.stepinfor.steps+=1:this.stepinfor.steps-=1
    },
    clickul(value){
        if(value){
            let para={
                storeId:this.$route.query.id,
                beforeContractId:this.$route.query.beforeContractId,
                operatorType:Number(this.operatorType),
                updateReason:this.updateReason,
                updateExplain:this.updateExplain,
                isForceUpdate:Number(this.isForceUpdate),
                serviceType:2,
                // ratePlatform:accDiv(this.ratePlatform, 100),
                storeSettlement:accDiv(this.storeSettlement, 100),
                otherAppointment:this.otherAppointment,
                remarks:this.remarks

            }
            this.Api.changeContract(para).then(res=>{
                console.log(res)
                this.show=false
                if(res.data.status===11106){
                    this.$dialog.confirm({
                    message: '合同修改正在审核中，不能提交',
                    confirmButtonText:'取消',
                    cancelButtonText:'审核详情'
                    }).then(() => {
                    // on confirm

                    }).catch(() => {
                    // on cancel
                     this.$router.push({
                      path: "/changecontract",
                      query: { id: this.ischange.approvalContentId, record: 1 }
                    });
                    });
                }else if(res.data.status===1){
                    // this.$router.push({ path: '/ApplyResult', query: { win: true, type: 6 } })
                    this.$router.push({ path: '/ApplyResult', query: { result: '已提交' } })
                }
            })
        }else{
            this.show=false
        }
    },
    },
    computed: {

    },
    mounted(){
        back('#ffffff')
        let query=this.$route.query
        console.log(query)
         query.storeSettlement?this.storeSettlement = accMul(query.storeSettlement, 100).toString():''
          // query.ratePlatform ?this.ratePlatform = accMul(query.ratePlatform, 100).toString():''
           query.operatorType?this.operatorType = query.operatorType.toString():''
          query.otherAppointment?this.otherAppointment=query.otherAppointment:''
          let para={
        storeId:this.$route.query.id
      }
          this.Api.examineContracts(para).then(res=>{
        this.ischange=res.data.data
      })
        inputup('.anzhuotop', '.app-init')
    },
    beforeDestroy () {
    inputup2('.anzhuotop', '.app-init')
  },
  }
</script>

<style scoped lang="scss" type="text/scss">
 .van-popup.van-popup--center{
        z-index: 205000 !important;
    }
.changeht-title{
    width: 100%;
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    background: #fff;
    color: #FF3232;
    padding: 0 18px;
}
   .bindcard-content{
    background: #fff;
    margin: 10px 18px 90px;
    width: calc(100%-36px);
    padding: 20px;
    .bindcard-li{
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
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
    .content2-p{
    color: #333;
    font-size: 14px;
    font-weight: 600;
  }
  .hetong-title{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  background: #fff;
  text-align: center;
  .httitle-content{
    width: 66px;
    .httitle-contentimg{
      width: 66%;

    }
    .httitle-contentp{
      font-size: 12px;
      width:100%;
      margin-top: 5px;
    }
  }
  .httitle-div{
    width: 100px;
    margin:0 40px;
  }
  .blacktop{
    border-top: 2px solid #DEE2EC;
  }
  .bluetop{
    border-top: 2px solid #0095FD;
  }
}
.content2-choose{
    width: 100%;
    display: flex;
    align-items: center;
    overflow: auto;
    .content2-icon{
      width: 73px;
      height: 30px;
      margin-right: 10px;
      
      text-align: center;
      line-height: 30px;
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

   .content1{
  width: 100%;
  height: 48px;
  display: flex;
  background:rgba(245,245,245,1);
border-radius:5px;
  align-items: center;
  justify-content: space-around;
  margin: 12px 0;
  position: relative;
  border-radius: 5px;
  .content1-input{
    width: 80%;
    background: rgba(245,245,245,1);
    border:none;
    font-size: 14px;
    
  }
  .content1-right{
    position: absolute;
    right: 10px;
    font-size: 14px;
    line-height: 48px;
    color: #999;
  }
}
  .content3-p{
    color: #333;
    font-size: 14px;
    font-weight: 600;
      margin-bottom: 12px;
  }
   .content3-div{
    width: 100%;
    height: 120px;
    padding: 12px;
    background: #F5F5F5;
    border-radius: 5px;
    .content3-input{
      background: #F5F5F5;
      border:none;
      width: 100%;
      height: 100%;
      font-size: 14px;
    }
  }
  .content-bottom{
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
.van-button--normal{
  width: 35vw;
}
  .div-all{
    width: 100%;
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
        border-bottom: 1px dashed #b2b2b2;
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
        background: rgba(0,0,0,.7);
    }
    .div-cir-left{
        left: -10px;
    }
    .div-cir-right{
        right: -10px;
    }
    .div-content{
        margin-top: 20px;
        .content-bottom{
          position: relative;
        }
    }
}
  .add-ul{
      .add-li{
          display: flex;
          
          .add-lil{
              width: 140px;
              color: #999;
              font-size: 14px;
              line-height: 46px;
          }
          .add-lir{
            width: 160px;
              color: #666;
              font-size: 14px;
              line-height: 46px;
              word-wrap:break-word;
    //           overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
          }
      }
      
  }
  .add-li:not(:last-child){
      border-bottom: 1px solid #f5f5f5;
  }
</style>
