<template>
  <div>
    <top-column :top-header="topheader"></top-column>
    <div class="list">
      <header class="listtitle">
        <p>{{store.nickName}}</p>

        <!--{{item.managerCooperation.name}}-->
        <span v-if="store.type=='1'">种子商户</span>
        <span v-if="store.type=='2'">特色商户</span>
        <span v-if="store.platformStatus==1">正常</span>
        <span v-if="store.platformStatus==2">关闭</span>
        <span v-if="store.platformStatus==3">冻结</span>
      </header>
      <ul class="listcenter">
        
        <li style="color: #666;">
          <span >编码：</span>
          <span  style="overflow: hidden;text-overflow: ellipsis">{{store.code}}</span>
        </li>
      </ul>
      <ul class="listcontent"  >
        <!--<li @click="area.onoff=!area.onoff;topheader.name='查看辖区'">-->
        <li @click="toarea">
          <div>
            <img src="@assets/img/detail/position2.png" />
          </div>
          <span  style="overflow: hidden;text-overflow: ellipsis" v-if="!store.province">空</span>
          <span style="overflow: hidden;text-overflow: ellipsis" v-else>{{store.province}}{{store.city}}{{store.region}}</span>
        </li>
        <li>
          <div>
            <img src="@assets/img/detail/people.png" />
          </div>
          <a :href="'tel:' + all.spreadPhone" style="color: #0095FD;overflow: hidden;text-overflow: ellipsis" @click.prevent="handleRingup(all.spreadPhone)">{{all.spreadRole}}  {{all.spreadName}}</a>
          <!--<span v-else-if="store.managerSpread.type=='2'">合作商 {{store.managerSpread.merManager.name}}</span>-->
          <!--store.managerSpread.merManager.managerCooperation.merManager.name-->
        </li>
        <li style="color: #999;">
          <div>
            <img src="@assets/img/detail/datachoose.png" />
          </div>
          <span>{{store.approvalTime|format}}</span>
        </li>
      </ul>
    </div>

    <van-cell-group>
      <van-cell title="店铺信息" is-link  @click="tochangebasic"/>
 <van-cell title="营业时间" value-class="colorC0C0C0 teti" is-link @click="totime">
            <p class="tetime" v-if="storetime.length">{{storetime[0].arrMonth}}|{{storetime[0].arrWeek}}|{{storetime[0].arrTimes}}{{storetime.length>1?'...':''}}</p>
          </van-cell>
      <van-cell title="费率与合同" value-class="overte" is-link :value="hetong" @click="tohetong"  />

      <van-cell title="银行账户" is-link :value="havecard" @click="tozhanghu"/>
      <!--<van-cell title="开票信息" is-link :value="havecard" />-->
    </van-cell-group>
    <van-cell-group >
      <van-cell title="是否营业" >
        <template slot="title">
          <span class="custom-text">是否营业</span>
          <van-icon name="question-o" class="righticon" @click="question"/>
        </template>
        <van-switch v-model="checked" @input="onInput" size="20px"/>
      </van-cell>
    </van-cell-group>



    <van-popup
            v-model="area.onoff"
            position="right"
            :overlay="false"
    >
      <div class="rightmap">
        <header class="heade">

        </header>
        <div>
          <choose-area :area="area"></choose-area>
        </div>
      </div>
    </van-popup>

    <van-popup
            v-model="rate.onoff"
            position="right"
            :overlay="false"
    >
      <div class="rightmap">
        <header class="heade">

        </header>
        <div>
          <!-- <van-cell-group>
            <van-cell
                    title="合同状态"
                    value="未签"
            >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
           <van-cell
                    title="合同类型"
                    value="纸质合同"
            >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <van-cell
                    title="电子合同模板"
                    value="种子店合作协议"
            >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
          </van-cell-group>
          <van-cell-group>

            <van-cell title="费率" >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
                <van-cell   title="欧拉欧拉欧拉欧拉欧拉欧拉欧拉欧拉欧拉欧拉欧拉欧拉欧拉欧拉" title-class="leftcolor" value-class="rightcolor" />
              <van-cell   title="商户须在1天内开发不同行业特色商户100家" title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="商户须在1天内分享消费者22222人"   title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="商户须在每场名人会议邀请客户不得少于100人"    title-class="leftcolor" value-class="rightcolor" />
           
            
          </van-cell-group>
          <van-cell-group>
            <van-cell
                    title="合同起止时间"
                    :value="store.contractStartTime+'至'+store.contractEndTime"
            >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <van-cell
                    title="其他约定"
                    value="木大木大木大木大11木大木大木大木大木大22木大木大木大木大木大木大木大"
                    value-class="textleft"
            >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
             <van-cell
                    title="电子合同"
                    value="查看"
                    is-link
                    @click="rate.onoff2=true;topheader.name='电子合同'"
            >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            
          </van-cell-group> -->
          <van-cell-group>

            <van-cell title="费率" >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <div v-if="store.type=='1'">
              <van-cell title="店铺折扣"  :value="accMul(store.rateConfig.storeRateBase,10)+'折'" title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="平台收取服务费,收取该种子商户平台销售额的"  :value="accMul(store.rateConfig.storeRatePlatform,100)+'%'" title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="平台补贴种子商户,补贴该种子商户平台销售额的"  value="0.15%" title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="配送平台商品，获得该商品订单价格的" label="注：配送费由商品所属企业承担"  value="10%" title-class="leftcolor" value-class="rightcolor" />
            </div>
            <div v-if="store.type=='2'">
               <van-cell title="店铺折扣"  :value="accMul(store.rateConfig.storeRateBase,10)+'折'" title-class="leftcolor" value-class="rightcolor" />
              <van-cell title="平台收取服务费,收取该特色商户平台销售额的"  title-class="leftcolor" value-class="rightcolor" >{{accMul(store.rateConfig.storeRatePlatform,100)}}%</van-cell>
            </div>
          </van-cell-group>
          <van-cell-group>
            <van-cell
                    title="合同起止时间"
                    :value="store.contractStartTime+'至'+store.contractEndTime"
            >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <van-cell title="合同照片"  >
              <div slot="icon" class="vant-collapse-icon"></div>
            </van-cell>
            <div class="hetongnote">注：必须包含首页,费率页,合作期限页,签章页。</div>
            <van-cell title="" class="hetong" value-class="teadd">
              <some-multiple class="notclickadd" number="8"  :some-multiple="store.contractPicUrls"  filecode="FILE19011225489456"></some-multiple>
        
            </van-cell>
          </van-cell-group>
           <!-- <van-button type="primary" size="large"  class="submitbtn" @click="tocontract" >签署合同</van-button> -->
        </div>
      </div>
    </van-popup>

    <van-popup
            v-model="rank.onoff"
            position="right"
            :overlay="false"
    >
      <div class="rightmap">
        <header class="heade">

        </header>
        <div v-if="!rank.card">
          <van-button type="primary" size="large" class="submitbtn" @click="tobindcard">绑定银行卡</van-button>
        </div>
        <div v-else>
          <van-cell-group>
            <van-cell title="账户类型" v-if="rank.card.type==1" value="对公账号"/>
            <van-cell title="账户类型" v-if="rank.card.type==2" value="个人账号"/>

          </van-cell-group>
          <van-cell-group>
            <van-cell title="开户名称"  :value="rank.card.accountName"/>
            <van-cell title="银行账号"  :value="rank.card.bankNo"   />
            <van-cell title="开户银行"  :value="rank.card.bankName"   />
            <van-cell title="银行支行"  :value="rank.card.bankBranch"   />
          </van-cell-group>
          <van-button type="default" size="large" class="submitbtn" @click="tobindcard">解绑银行卡</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup
            v-model="rate.onoff2"
            position="right"
            :overlay="false"
    >
      <div class="rightmap">
        <header class="heade">

        </header>
        
        <div >
        
            <van-cell title="合同名称" label="2019.13.13" is-link />
            <van-cell title="合同名称2" label="2019.13.13" is-link />

        </div>
      </div>
    </van-popup>
    <van-popup
            v-model="rate.onoff3"
            position="right"
            :overlay="false"
    >
      <div class="rightmap">
        <header class="heade">

        </header>
        
        <div >
        
            欧拉欧拉欧拉欧拉欧拉欧拉欧拉欧拉欧拉

        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import chooseArea from '@/components/chooseArea/chooseArea'
  import someMultiple from '@/components/addimg/someMultiple'
  import {back,format,getStorage,phonearea,ringup,changetime,accMul} from "@/utils";
  export default {
    name: 'ShopManagement',
    data () {
      return {
        accMul,
        topheader: {
          name: '店铺设置',
          left: '3',
          right1: '',
          heade: 'header1'
        },
        type: '1', // 省区总合作商推广员
        list: '1', // 详情页种类（这里没用，只是当做是从list来）
        checked:true, //开关
        fromrouter:'',  //从哪里来
        areaIds:'', //辖区id仓超
        name:'',
        lookcard:'',
        area:{  //查看辖区
          onoff:false,
          chooseno:false,
          arealist: []
        },
        shoplist:{ //店铺列表
          onoff:false
        },
        account:{ //账号信息
          onoff:false
        },
        rate:{  //费率合同
          onoff:false,
          onoff2:false,
          onoff3:false
        },
        rank:{
          onoff:false,
          card:'',
        },
        storetime:{  //新店铺营业时间
        arrMonth:'',
        arrWeek:'',
        arrTimes:''
        },
        havecard:'未绑定',
        store:{
          type:'',
          newfont: '0', // 简介字数
          charactar: '1',
          isEnable: '1', // 0,店铺启用不变
          status: '1', // 0,店铺状态不变
          username: '',
          name: '', // 2,推广员姓名
          createTime:'',
          phone: '',
          verifyCode: '',
          email: '',
          remarks: '',
          rateConfig:{
            storeRatePlatform:''
          }
        },
        all:{
          spreadName:'',
          spreadRole:'',
          spreadPhone:'',
            storeAccount:{
              phone:''
            }
        },
        storelist:[

        ]
      }
    },
    components: {
      chooseArea,someMultiple
    },
    filters: { 
      format
    },
    computed:{
      hetong(){
        switch(this.store.contractStatus){
          case 0:
            return ' '
          case 1:
            return '入驻未完成，请及时签合同。'
          case 2:
            return '合同发生变更，请及时改签。'
          case 3:
            return '合同发生变更，已停用收款功能。请及时续签。'
          case 4:
            return '续签(合同临期)，请及时续签。'
          case 5:
            return '合同已到期，请及时续签。'
            default:
            return ' '
        }
      }
    },
    methods: {
      handleRingup(tel) {
        if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '给退光热打电话','' ,'' , '']);//其中灰色的为选填项
      
         }
        if (!tel) {
          return false;
        }
        ringup(tel);
      },
      goback () {
        if (this.area.onoff) {
          this.area.onoff = !this.area.onoff
          this.topheader.name = '店铺设置'
        }else if (this.shoplist.onoff) {
          this.shoplist.onoff = !this.shoplist.onoff
          this.topheader.name = '店铺设置'
        }else if (this.account.onoff) {
          this.account.onoff = !this.account.onoff
          this.topheader.name = '店铺设置'
        }else if (this.rate.onoff3) {
          this.rate.onoff3 = false
          this.topheader.name = '电子合同'
        }else if (this.rate.onoff2) {
          this.rate.onoff2 = false
          this.topheader.name = '费率和合同页'
        }else if (this.rate.onoff) {
          this.rate.onoff = !this.rate.onoff
          this.topheader.name = '店铺设置'
        }else if (this.rank.onoff) {
          if(this.$route.query.lookcard){
            this.$router.go(-1)
          }else{
            this.rank.onoff = !this.rank.onoff
            this.topheader.name = '店铺设置'
          }
        }else {
          this.$router.go(-1)
        }
      },
      question(){
        
        this.$dialog.alert({
          message: '开启时，店铺营业；' +
                  '关闭时，店铺歇业'
        }).then(() => {
          // on close
        });
      },
      onInput(checked){
        if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '是否营业','' ,'' , '']);//其中灰色的为选填项
      
         }
          this.$dialog.confirm({
            title: '提醒',
            message: '是否切换开关？'
          }).then(() => {
            let para={
              id:this.$route.query.id,
              status:checked?'1':'2'
            }
            console.log(para)
            this.shopApi.storeonoff(para).then(res => {
                if(res.data.status==1){
                  this.checked = checked;
                }else{
                  this.checked = !checked;
                }
                console.log(res)
            })

          }).catch(()=>{
            this.checked = !checked;
          });


      },
      todetails (item) {
        this.$router.push({path: '/StoreDetail', query: {id: item.id, type: this.type, list: this.list}})

      },
      tozhanghu(){
        if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '银行账户','' ,'' , '']);//
         }
        this.rank.onoff=!this.rank.onoff;this.topheader.name='银行账户';
      },
     /* totel(){
        if(this.store.spreadType==1){

        }else if(this.store.spreadType==2){

        }else if(this.store.spreadType==3){

        }else if(this.store.spreadType==4){

        }
      },*/
       totime(){
      this.$router.push('/ShopTime')
      },
      areas (msg) {
        console.log(msg)
        this.shop.managerDutyAreaConfigs = msg
        this.area.onoff = false
        this.topheader.name = '填写资料'
      },
      getdutyArea () { // 辖区列表
        let para = {
          merManagerId:sessionStorage.getItem('id') //如果从详情进入辖区就用传过来的id

          // areaLevel:2
        }
        this.Api.dutyArea(para).then(res => {

          res.data.data.map(value => {
            if(this.areaIds==''){  // 仓超要的格式
              this.areaIds=value.areaConfig.id
            }else{
              this.areaIds+=','+value.areaConfig.id
            }
          })
        }).then(()=>{
          this.getList()
        }).catch(error => {
          console.log(error)
        })
      },
      deletecard(){
        let para={
          id:this.rank.card.id,
        }
        para.storeId=this.rank.card.cardType==2?this.store.id:''
        this.shopApi.deleteCard(para).then(res => {
         console.log(res)
          if(res.data.status==1){
            // this.$router.push({path: '/ApplyResult', query: {win:true,type:3}})
            this.$router.push({ path: '/ApplyResult', query: { result: '解绑成功'} })

          }else{
            // this.$router.push({path: '/ApplyResult', query: {win:false,type:3,result:res.data.stateMessage}})
          }
        }).catch(error => {
          console.log(error)
        })
      },
      tocontract(){
        this.$router.push({path: '/contract', query: {id:this.$route.query.id,bcRegisterType: this.store.bcRegisterType}})
      },
      getList(){
        let datejson4={
          storeAccountId:this.$route.query.id,
          areaId:this.areaId,
        }
        this.Api.storeList(datejson4).then(res => {
          if(res.data.data.list){
              res.data.data.list.map(value => {
              // console.log(this.store, this.store.length, value)
              this.$set(this.storelist, this.storelist.length, value)
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },


      tohetong(){
         if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '合同','' ,'' , '']);//其中灰色的为选填项
      
         }
         if(sessionStorage.getItem('type')==2){
           if(this.store.contractPicUrls){
this.rate.onoff=!this.rate.onoff;this.topheader.name='费率'
           }else if(!this.all.contractRecord||!this.all.contractRecord.signFile){
             this.$router.push({ path:'addcontract', query: { status: this.store.contractStatus } })
           }
           else{
   this.$router.push({path:'storehetong',query:{id:sessionStorage.getItem('storeId'),img:this.all.contractRecord.signFile,status:this.store.contractStatus}})
        
           }
         }else{
           this.rate.onoff=!this.rate.onoff;this.topheader.name='费率'
         }
         
      },
      tochangebasic(){
         if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '店铺信息','' ,'' , '']);//其中灰色的为选填项
      
         }
        this.$router.push({path: '/ShopBasic', query: {id:this.$route.query.id,type: this.type,bcRegisterType:this.rank.card?this.rank.card.bcRegisterType:false}})
      },
      toarea(){

        phonearea(this.store.logo,this.store.longitude,this.store.latitude,this.store.name,this.store.address)
        // window.location.href =`qtkjshop://Area?logo=${this.store.logo}&longitude=${this.store.longitude}&latitude=${this.store.latitude}&name=${this.store.name}&address=${this.store.address}`
      },
      tobindcard(){
        
        // console.log(getStorage(this.$route.query.id))
        if(this.havecard==''){
          if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '解绑银行卡','' ,'' , '']);//其中灰色的为选填项
      
         }
          this.$dialog.confirm({
            title: '',
            message: '您确定要解除绑定的银行卡吗',
          }).then(() => {
            this.deletecard()
          }).catch(() => {

          })
        }else if(getStorage(this.$route.query.id,24)){
          if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '绑定银行卡','' ,'' , '']);//其中灰色的为选填项
      
         }
          this.$router.push({path: '/BindCard', query: {id:this.$route.query.id,wait:true}})
        }else{
          if (window._czc) {
               window._czc.push(['_trackEvent', '店铺设置', '绑定银行卡','' ,'' , '']);//其中灰色的为选填项
      
         }
          this.$router.push({path: '/BindCard', query: {id:this.$route.query.id,bcRegisterType: this.store.bcRegisterType}})
        }



      }


    },
      mounted(){
        back('#00A7FC')
      this.type = sessionStorage.getItem('accountType')
      if(this.$route.query.lookcard){
        this.rank.onoff=!this.rank.onoff;this.topheader.name='银行账户';
      }
      /* let para={
        storeAccountId:this.$route.query.id
      } */
     /* let formdata=new FormData();
      formdata.set("storeId",this.$route.query.id);*/
      let para2={
        storeId:this.$route.query.id
      }
      this.Api.storedetails(para2).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        this.store=JSON.parse(JSON.stringify(res.data.data.store))
        this.all=res.data.data
        this.store.contractStartTime=format(this.store.contractStartTime, 'yyyy.MM.dd')
        this.store.contractEndTime=format(this.store.contractEndTime, 'yyyy.MM.dd')
        this.store.status=='1'?this.checked=true:this.checked=false
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
      this.getdutyArea()



      // let formdata2=new FormData();
      // formdata2.set("id",this.$route.query.id);

      this.Api.getCardstore(para2).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        if(res.data.data.list.length>0){
          this.havecard=''
          this.rank.card=res.data.data.list[0]
        }else{
          this.havecard='未绑定'
        }
        console.log(res)
      }).catch(error => {
        console.log(error)
      })


      let para3={
        storeId:sessionStorage.getItem('storeId')
      }
      this.shopApi.shopTimeList(para3).then(res=>{
        console.log(res)
        if(res.data.status===1){
          this.storetime=res.data.data
       
          this.storetime.forEach(value=>{
            value.arrMonth=changetime(value)[0]
            value.arrWeek=changetime(value)[1]
            value.arrTimes=changetime(value)[2]
          })
        
        }
      })
    },
  }
</script>

<style scoped>
  body{
    background:rgba(245,245,249,1);
  }
  .rightmap{
    background:rgba(245,245,249,1);
  }
  .van-cell /deep/ .van-cell__title{
    max-width: none;
  }
  .van-cell /deep/ .van-cell__value{
    text-align: right;
    display: block;

  }
  .van-cell /deep/ .rightvalue{
    color: #0095fd !important;
  }
  .van-cell /deep/ .rightcolor{
    color: #FF3232 ;
    font-weight: 800;
    font-size: 16px;
  }
  .van-cell /deep/ .leftcolor{
    color: #666;
    font-size: 14px;
  }
  .teti{
     width: 60%;
  }
  .tetime{
    width: 100%;
    overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  }
  .list{
    width: 100%;
    height: 102px;
    background: #FFF;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #FFF;
    position: relative;
  }
  .listtitle{
    width: 90%;
    color: #333;
    font-size: 18px;
    font-weight: 800;
    position: absolute;
    left: 16px;
    top: 16px;
  }
  .listtitle /deep/ p{
    max-width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listtitle /deep/ span{
    display: inline-block;

    height: 16px;
    padding: 0 3px;
    margin-left: 5px;
    font-weight: 300;
    border-radius: 2px;
    border: 0.5px solid #0095fd;
    color: #0095fd;
    opacity: .9;
    font-size: 10px;
    line-height: 16px;
    text-align: center;
    /*overflow: hidden;*/
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listcenter{
    font-size: 12px;
    position: absolute;
    color: #0095FD;
    top: 50px;
    left: 6px;
    display: flex;
    line-height: 14px;
  }
/*  .listcenter /deep/ li{
    width: 105px;
    margin-left:10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listcenter /deep/ img{
    width: 14px;
    height: 14px;
    !*transform: translate(0,+10%);*!
    margin-right: 2px;
  }*/
  .listcontent{
    font-size: 12px;
    color: #0095FD;
    position: absolute;
    left: 6px;
    top: 74px;
    display: flex;
    line-height: 14px;
  }
 /* .listcontent /deep/ li{
    width: 105px;
    margin-left:10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .listcontent /deep/ img{
    width: 14px;
    height: 14px;
    !*transform: translate(0,+10%);*!
    margin-right: 2px;
  }*/
  .listaside{
    width: 12px;
    height: 12px;
    color: #cbcbcb;
    position: absolute;
    right: 19px;
    top: 22px;
  }
.textleft{
  text-align:left !important;
}
.overte{
  width: 30%;
   overflow: hidden !important;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
