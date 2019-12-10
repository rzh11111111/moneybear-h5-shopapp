<template>
<div class="app-init">
  <top-column :top-header="topheader" ></top-column>
  <div class="bindcard-content anzhuotop">
    <div  class="bindcard-li">
      <p   class="bindcard-lil">账号类型</p>
      <div   class="bindcard-lir">
        <van-radio-group class="content2-choose" v-model="myrank.bcRegisterType" v-if="store.bcRegisterType=='2'">
              <van-radio name="1">
                <div
                  slot="icon"
                  slot-scope="props"
                  :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                >
                  对公账号
                </div>
                </van-radio>
             
        
            </van-radio-group>
        <van-radio-group class="content2-choose" v-model="myrank.bcRegisterType" @change="choosetype" v-else-if="store.bcRegisterType=='1'">
              <van-radio name="1">
                <div
                  slot="icon"
                  slot-scope="props"
                  :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                >
                  对公账号
                </div>
                </van-radio>
              <van-radio name="2">
                <div
                  slot="icon"
                  slot-scope="props"
                  :class="props.checked?'content2-icon content2-true':'content2-icon content2-false'"
                >
                 个人账号
                </div>
              </van-radio>
              
            </van-radio-group>
      </div>
    </div>
   <div  class="bindcard-li"  >
      <p   class="bindcard-lil" v-if="myrank.bcRegisterType=='2'">经营者姓名</p>
      <p   class="bindcard-lil" v-else>营业执照名称</p>
      <div   class="bindcard-lir">
        {{myrank.accountName}}
      </div>
    </div>
   
    <div  class="bindcard-li">
      <p   class="bindcard-lil" v-if="myrank.bcRegisterType=='2'">经营者身份证</p>
      <p   class="bindcard-lil" v-else>营业执照号</p>
      <div   class="bindcard-lir">
        {{myrank.idCard}}
      </div>
    </div>
    <div  class="bindcard-li">
      <p   class="bindcard-lil">开户名称</p>
      <div   class="bindcard-lir">
        {{myrank.accountName}}
      </div>
    </div>
    <p  class="bindcard-p">若证件信息有误,<span @click="tochange"  class="bindcard-span bluecolor">请点击修改(需审核)</span></p>
    <div slot="content" >
              <p class="content2-p">银行账号</p>
              <div class="content1" >
              <input class="content1-input"  type="number"  v-model="myrank.bankNo" placeholder='请输入银行卡号'>
              
              </div>
              
            </div>
    <div slot="content" >
              <p class="content2-p">开户银行</p>
              <div class="content1" @click="bank.onoff1=!bank.onoff1;topheader.name='选择开户银行'">
              <input class="content1-input"  type="text"  :value="myrank.bankName" disabled is-link placeholder="请选择开户银行">
              
              </div>
              
            </div>
    <div slot="content" >
              <p class="content2-p">开户支行</p>
              <div class="content1" @click="bank.onoff2=!bank.onoff2;topheader.name='选择开户支行';branchbank.keyword?'':branchbank.keyword=myrank.bankName.substring(0,myrank.bankName.indexOf('银'))">
              <input class="content1-input"  type="text"  v-model="myrank.bankBranch" disabled is-link placeholder="请选择开户支行">
              
              </div>
              
            </div>
    <div slot="content" >
              <p class="content2-p" v-if="myrank.bcRegisterType=='1'">操作人手机号</p>
              <p class="content2-p" v-else>银行预留手机号</p>
              <div class="content1" >
              <input class="content1-input"  type="number" v-model="myrank.bankPhone"  v-if="myrank.bcRegisterType=='1'"  placeholder="请输入手机号">
              <input class="content1-input"  type="number" v-model="myrank.bankPhone"  v-else  placeholder="请输入手机号">
              
              </div>
              
            </div>
             <div class="content1" v-if="myrank.bcRegisterType==2">
              <input class="content1-input" style="width:60%"  type="text"  v-model="myrank.shortMessage" placeholder='请输入验证码'>
              <p class="content1-code" v-show="sendAuthCode"  @click="getnote">发送验证码</p>
              <span v-show="!sendAuthCode" class="content1-code graycolor"> <span class="auth_text_blue">{{auth_time}} </span>s</span>
              </div>
    <!-- <van-cell-group> -->
      <!-- <van-cell title="开户名称" :value="myrank.accountName"  >
        <van-icon slot="right-icon" name="info" class="custom-icon" @click='hint' />
      </van-cell> -->
      <!-- <van-field type="number" label="银行账号" v-model="myrank.bankNo"  placeholder="请输入银行卡号" /> -->
      <!-- <van-cell  title="开户银行" :value="myrank.bankName" @click="bank.onoff1=!bank.onoff1;topheader.name='选择开户银行'"   is-link  placeholder="请选择开户银行" /> -->

      <!-- <van-cell  title="开户支行" :value="myrank.bankBranch" @click="bank.onoff2=!bank.onoff2;topheader.name='选择开户支行';branchbank.keyword?'':branchbank.keyword=myrank.bankName.substring(0,myrank.bankName.indexOf('银'))"  is-link  placeholder="请选择开户支行" /> -->
      <!-- <van-field type="number"  label="操作人手机号" v-model="myrank.bankPhone" v-if="myrank.bcRegisterType=='1'"   placeholder="请输入手机号" />
      <van-field type="number"  label="银行预留手机号" v-model="myrank.bankPhone" v-if="myrank.bcRegisterType=='2'"   placeholder="请输入手机号" /> -->
    <!-- </van-cell-group> -->

    <!-- <van-field
            v-if="myrank.bcRegisterType==2"
            center
            clearable
            label="验证码"
            v-model="myrank.shortMessage"
            placeholder="请输入短信验证码"
    >
      <van-button slot="button" v-show="sendAuthCode" size="small" type="primary" @click="getnote">发送验证码</van-button>
      <van-button slot="button" v-show="!sendAuthCode" size="small" type="primary" class="noteclick">{{auth_time}}s</van-button>
    </van-field> -->
    </div>
    <!--第二步-->
    <van-popup
            v-model="myrank.onoff"
            position="right"
            :overlay="false"
    >
      <div class="rightmap backback">
        <header class="heade">
        </header>
        <div class="steps2">
<p class="steps2-title redcolor">系统将在5-15分钟内向您打款，请输入正确的打款金额，完成认证.</p>
          <van-cell-group>
            <van-field type="number" label="打款金额" class="right" v-model="myrank.shortMessage"  placeholder="0.00" >
              <div slot="button" v-if="myrank.shortMessage">元</div>
            </van-field>
          </van-cell-group>
          <van-button type="danger" class="steps2-btn1" @click="btn1">重新绑卡</van-button>
          <van-button type="primary" class="steps2-btn2" @click="btn2">提交验证</van-button>

          <!--<van-button type="primary" size="large" @click="inputblur" class="submitbtn" v-if="steps==2">确定-->
          <!--</van-button>-->
        </div>
      </div>
    </van-popup>
    <!--开户银行-->
    <van-popup
            v-model="bank.onoff1"
            position="right"
            :overlay="false"
    >
      <div class="rightmap" style="margin-top: 44px;">
        <div>
        <ul class="banklist">
          <li class="banklist-li" v-for="item in allbank" @click="choosebank(item.name)">
            <div class="bankdiv">
              <img v-if="item.id==0" src="@/assets/img/bank/gs.png"/>
              <img v-if="item.id==1" src="@/assets/img/bank/gd.png"/>
              <img v-if="item.id==2" src="@/assets/img/bank/gf.png"/>
              <img v-if="item.id==3" src="@/assets/img/bank/hz.png"/>
              <img v-if="item.id==4" src="@/assets/img/bank/hx.png"/>
              <img v-if="item.id==5" src="@/assets/img/bank/js.png"/>
              <img v-if="item.id==6" src="@/assets/img/bank/jt.png"/>
              <img v-if="item.id==7" src="@/assets/img/bank/ms.png"/>
              <img v-if="item.id==8" src="@/assets/img/bank/nb.png"/>
              <img v-if="item.id==9" src="@/assets/img/bank/ny.png"/>
              <img v-if="item.id==10" src="@/assets/img/bank/pa.png"/>
              <img v-if="item.id==11" src="@/assets/img/bank/pf.png"/>
              <img v-if="item.id==12" src="@/assets/img/bank/xy.png"/>
              <img v-if="item.id==13" src="@/assets/img/bank/yc.png"/>
              <img v-if="item.id==14" src="@/assets/img/bank/zs2.png"/>
              <img v-if="item.id==15" src="@/assets/img/bank/zs.png"/>
              <img v-if="item.id==16" src="@/assets/img/bank/zg.png"/>
              <img v-if="item.id==17" src="@/assets/img/bank/js2.png"/>
              <img v-if="item.id==18" src="@/assets/img/bank/yc.png"/>
            </div>
            {{item.name}}
          </li>
        </ul>

        </div>
      </div>
    </van-popup>
<!--开户支行-->
    <van-popup
            v-model="bank.onoff2"
            position="right"
            :overlay="false"
    >
      <div class="rightmap" style="margin-top: 44px;">
        <div>

          <van-cell  title="选择省份" :value="branchbank.province" @click="bank.onoff3=!bank.onoff3;topheader.name='选择省份'"  is-link  />
          <van-cell  title="选择城市" :value="branchbank.city" @click="sreachcity"  is-link   />
          <van-field  label="支行关键字" v-model="branchbank.keyword"  placeholder="请输入关键字" />
          <van-field  label="支行关键字2" v-model="branchbank.keyword2"  placeholder="请输入关键字" />
          <van-button type="primary" size="large" @click="sreachbranchbank" class="submitbtn" >查询
          </van-button>
        </div>
      </div>
    </van-popup>
<!--选择省-->
    <van-popup
            v-model="bank.onoff3"
            position="right"
            :overlay="false"
    >
      <div class="rightmap" style="margin-top: 44px;">
        <div>
          <ul class="listprovince">
            <li class="listprovince-li" v-for="item in branchbank.allprovince" @click="chooseprovince(item)">
              {{item.nodeNodeName}}
            </li>
          </ul>
        </div>
      </div>
    </van-popup>
    <!--选择市-->
    <van-popup
            v-model="bank.onoff4"
            position="right"
            :overlay="false"
    >
      <div class="rightmap" style="margin-top: 44px;">
        <div>
          <ul class="listprovince">
            <li class="listprovince-li" v-for="item in branchbank.allcity" @click="choosecity(item)">
              {{item.cityAreaname}}
            </li>
          </ul>
        </div>
      </div>
    </van-popup>
    <!--选择支行-->
    <van-popup
            v-model="bank.onoff5"
            position="right"
            :overlay="false"
    >
      <div class="rightmap" style="margin-top: 44px;">
        <div>
          <ul class="listprovince">
            <li class="listprovince-li" v-for="item in topheader.key?branchbank.bank.filter(value=>{return value.bankname.indexOf(topheader.key)>0}):branchbank.bank" @click="choosebranchbank(item)">
              {{item.bankname}}
            </li>
          </ul>
        </div>
      </div>
    </van-popup>
<div class="content-bottom">
    <van-button type="primary" size="large" @click="inputblur" class="submitbtn" v-if="steps==1">下一步
    </van-button>
</div>
  
</div>
</template>

<script>
  import topColumn from '@/components/topColumn/topColumn'
  import {phonestar,setStorage,getStorage,inputup,inputup2} from '@/utils/'
  export default {
    name: 'bindCard',
    data () {
      return {
        topheader: {
          name: '绑定银行账户',
          left: '3',
          right1: '',
          right4: '',
          heade: 'header1'
        },
        rankname:'',
        store:{
          storeAccount:{
            phone:''
          }
        },
        storeAccount:{

        },
        bank:{
          onoff1:false, //开户银行
          onoff2:false,  //开户支行
          onoff3:false,   //选择省
          onoff4:false,   //选择市
          onoff5:false,   //选择区
        },
        type:'',
        sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 0, /* 倒计时 计数器 */
        steps:1,
        result:{
          win:false,
          lose:false,
          chance:0,
        },
        allbank:[
          {
            name:'工商银行',
            id:0
          },{
            name:'光大银行',
            id:1
          },{
            name:'广发银行',
            id:2
          },{
            name:'杭州银行',
            id:3
          },{
            name:'华夏银行',
            id:4
          },{
            name:'建设银行',
            id:5
          },{
            name:'交通银行',
            id:6
          },{
            name:'民生银行',
            id:7
          },{
            name:'宁波银行',
            id:8
          },{
            name:'农业银行',
            id:9
          },{
            name:'平安银行',
            id:10
          },{
            name:'浦发银行',
            id:11
          },{
            name:'兴业银行',
            id:12
          },{
            name:'邮储银行',
            id:13
          },{
            name:'招商银行',
            id:14
          },{
            name:'浙商银行',
            id:15
          },{
            name:'中国银行',
            id:16
          },
          {
            name:'江苏银行',
            id:17
          },
          {
            name:'邮政储蓄银行',
            id:18
          }
        ],
        branchbank:{
          province:'',
          city:'',
          keyword:'',
          keyword2:'',
          provincecode:'',
          citycode:'',
          allprovince:[],
          allcity:[],
          bank:[]
        },
        myrank:{
          onoff:false,
          bcRegisterType:'2',  //营业执照号类型
          type:"1",  //对公对私
          bankNo:'',  //银行卡号
          accountName:'',  //开户名称
          bankType:'',  //是否平安银行
          stStoreAccountId:'',  //店老板id
          storeId:'',  //店铺id
          idCard:'',
          bankName:'',  //开户银行
          bankBranch:'',//开户支行
          bankPhone:'',  //银行手机号
          cnapsBranchId:'',   //大小额行号
          shortMessage:'',   //资金
          isUse:'1',
        },
      }
    },
    components:{
      topColumn
    },
    methods:{
      goback () {
       if(this.result.lose){
          this.result.lose=false
          this.topheader.name='绑定银行账户'
          this.steps=1;
        }else if(this.bank.onoff5){    //选择支行

          this.bank.onoff5=false

          this.topheader.name='选择开户支行'
        }else if(this.bank.onoff4){  //选择市
          this.bank.onoff4=false
          this.topheader.name='选择开户支行'
        }else if(this.bank.onoff3){  //选择省
          this.bank.onoff3=false
          this.topheader.name='选择开户支行'
        }else if(this.bank.onoff1){  //开户银行
          this.bank.onoff1=false
          this.topheader.name='绑定银行账户'
        }else if(this.bank.onoff2){  //开户支行
          this.bank.onoff2=false
          this.topheader.name='绑定银行账户'
        }else {
          this.$router.go(-1)
        }
      },
      inputblur(){
        if(this.steps==1){  //第一步
          if(this.myrank.bcRegisterType=='1'){  //对公账号
            // setStorage('111',this.branchbank.keyword)
            let type1=[this.myrank.bankNo,this.myrank.bankName,this.myrank.bankBranch,this.myrank.bankPhone]
            if(type1.every(res=>{
              return res
            })){
              if(type1[0].length>=15&&type1[0].length<=21){
                console.log(type1[0].length)
              }else{
                this.$toast('银行账号格式错误')
                return false
              }
              let para=this.myrank
              this.shopApi.bankMoney(para).then(res => {

                console.log(res)
                if(res.data.status==1){
                  setStorage(this.$route.query.id,this.myrank)
                  this.myrank.onoff=true
                  this.steps=2;
              this.topheader.name='输入打款金额'
                }else{
                  this.$toast('打款失败')
                  console.log('打款失败')
                }
              }).catch(res=>{
                console.log(res)
              })
            }else{
              this.$toast('请输入全部信息');
            }
          }else{  //个人账户
            let type1=[this.myrank.bankNo,this.myrank.bankName,this.myrank.bankBranch,this.myrank.bankPhone,this.myrank.shortMessage]
            if(type1.every(res=>{
              return res
            })){
              if(type1[0].length>=8&&type1[0].length<=21){
                console.log(type1[0].length)
              }else{
                this.$toast('银行账号格式错误')
                return false
              }
              let para=this.myrank
              this.shopApi.bankSave2(para).then(res => {

                if(res.data.status==1){
                  // this.result.win=true
                  // this.topheader.name='绑定成功'
                  // this.$router.push({path: '/ApplyResult', query: {win:true,type:2,result:res.data.stateMessage}})
                  this.$router.push({ path: '/ApplyResult', query: { result: '绑定成功'} })
                }else{
                  // this.result.lose=true
                  // this.topheader.name='绑定失败'
                  // this.$toast(res.data.stateMessage)
                  // this.$router.push({path: '/ApplyResult', query: {win:false,type:2,result:res.data.stateMessage}})
                }

              }).catch(res=>{
                console.log(res)
              })
            }else{
              this.$toast('请输入全部信息');
            }
          }
          /*if(this.myrank.bankNo.length<14||this.myrank.bankNo.length>22){
          this.$toast('银行卡号不正确');
          }else if(this.myrank.bankPhone.length!==11){
            this.$toast('手机号不正确');
          }else{
            this.myrank.onoff=true
            this.steps=2;
          }*/
        }else if(this.steps==2){
         /* if(this.myrank.verifyCode.length==6){
            console.log('请求')
            // this.result.win=true
            // this.topheader.name='绑定成功'
            // this.result.lose=true
            // this.topheader.name='绑定失败'
            let para
            if(this.myrank.bcRegisterType==1){
              para={
                accountName:this.myrank.accountName,
                bankType:this.myrank.bankType,
                bankBranch:this.myrank.bankBranch,
                bankNo:this.myrank.bankNo,
                bankPhone:this.myrank.bankPhone,
                verifyCode:this.myrank.verifyCode
              }
            }else{
               para={
                 accountName:this.myrank.accountName,
                 bankType:this.myrank.bankType,
                 bankBranch:this.myrank.bankBranch,
                 bankNo:this.myrank.bankNo,
                 bankPhone:this.myrank.bankPhone,
                 idCard:this.myrank.idCard,
                 verifyCode:this.myrank.verifyCode
              }
            }

            this.Api.localMsg(para).then(res => {
              console.log(res)
            }).catch(error => {
              console.log(error)
            })
          }else{
            this.$toast('验证码不正确');
          }*/
        }
      },
      // hint(){
      //     if(this.myrank.bcRegisterType=='1'){
      //       this.$toast('开户名称为营业执照名称');
      //     }else{
      //       this.$toast('开户名称为老板姓名');
      //     }


      // },
      tochange(){
        if(this.myrank.bcRegisterType=='2'){
          //个人
          // this.$router.push({ path: '/ChangeMaster', query: { id: sessionStorage.getItem('id'), bcRegisterType:this.$route.query.bcRegisterType} })
        this.$router.push({ path: '/ChangeMaster', query: { id: sessionStorage.getItem('id')} })
        }else{
          // this.$router.push({path: '/ShopBasic', query: {id:this.$route.query.id,bcRegisterType:this.$route.query.bcRegisterType}})
          this.$router.push({path: '/ShopBasic', query: {id:this.$route.query.id}})
        }
      },
      btn1(){
       this.myrank.bankNo=''
        this.myrank.bankPhone=''
        this.myrank.bankBranch=''
        this.myrank.bankName=''
        this.myrank.shortMessage=''
        this.myrank.cnapsBranchId=''
        this.myrank.onoff = !this.myrank.onoff
        this.topheader.name = '绑定银行账户'
        this.steps=1
      },
      btn2(){
        let para=this.myrank
        this.shopApi.bankSave(para).then(res => {
          if(res.data.status==1){
            // this.result.win=true
            // this.topheader.name='绑定成功'
            // this.$router.push({path: '/ApplyResult', query: {win:true,type:2,result:res.data.stateMessage}})
            this.$router.push({ path: '/ApplyResult', query: { result: '绑定成功'} })
          }else{
            // this.result.lose=true
            // this.topheader.name='绑定失败'
            // this.$toast(res.data.stateMessage)
            // this.$router.push({path: '/ApplyResult', query: {win:false,type:2,result:res.data.stateMessage}})
          }
        }).catch(res=>{
          console.log(res)
        })
      },
      choosebank(msg){
        this.myrank.bankName=msg
        this.bank.onoff1=false
        this.topheader.name='绑定银行账户'
      },
      chooseprovince(msg){
        this.bank.onoff3=false
        this.topheader.name='选择开户支行'
        this.branchbank.province=msg.nodeNodeName
        this.branchbank.provincecode=msg.nodeNodeCode
        let para={
          cityAreatype:'2',
          cityNodecode:msg.nodeNodeCode
        }
        this.getcity(para)
      },
      sreachcity(){
        if(!this.branchbank.provincecode) {
          this.$toast('请选择省');
        }else{
          this.bank.onoff4 = !this.bank.onoff4;
          this.topheader.name = '选择城市'
        }
      },
      choosecity(msg){
        this.bank.onoff4=false
        this.topheader.name='选择开户支行'
        this.branchbank.city=msg.cityAreaname
        this.branchbank.citycode=msg.cityOrAareaCode
      },
      sreachbranchbank(){
        // if(!this.branchbank.provincecode){
        //   this.$toast('请选择省');
        // }else if(!this.branchbank.citycode){
        //   this.$toast('请选择城市');
        // }else
          if(!this.branchbank.keyword){
          this.$toast('请输入关键字');
        }
        // else if(!this.branchbank.keyword2){
        //     this.$toast('请输入关键字');
        //   } 
          else{
          let para={
            citycode:this.branchbank.citycode?this.branchbank.citycode:'',
            bankname:this.branchbank.keyword2,
            ourBankName:this.branchbank.keyword
          }
          this.shopApi.bankBranchbank(para).then(res => {
            if (res.data.data.length > 0) {
              console.log(res.data.data)
              this.bank.onoff5=!this.bank.onoff5;
              this.topheader.name='选择支行'

              this.branchbank.bank=res.data.data
              // this.bank.onoff2=!this.bank.onoff2
            }else{
              this.$toast('未查询到支行');
            }
          })
        }

      },

      choosebranchbank(msg){

        this.bank.onoff5=false
        this.bank.onoff2=false

        this.topheader.name='绑定银行账户'
        this.myrank.bankBranch=msg.bankname
        this.myrank.cnapsBranchId=msg.bankno
      },
      getnote () {
        if(this.myrank.bankPhone.length==11){


          this.sendAuthCode = false
          this.auth_time = 120
          let auth_timetimer = setInterval(() => {
            this.auth_time--
            if (this.auth_time <= 0) {
              this.sendAuthCode = true
              clearInterval(auth_timetimer)
            }
          }, 1000)
          this.getmsg()
        }else{
          this.$toast('手机号不正确');
        }
      },
      getmsg(){
        let para=this.myrank
        this.shopApi.bankMsg(para).then(res => {
          console.log(res)
          if(res.data.status!==1){
            this.$toast.clear();
            this.$dialog.alert({
              message: res.data.stateMessage
            }).then(() => {
              // on close
            });
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getcity(par){
        this.shopApi.bankCity(par).then(res => {
          if (res.data.data.length > 0) {
            console.log(res.data.data)
            this.branchbank.allcity=res.data.data
            this.branchbank.city=''
            this.branchbank.citycode=''
          }
        })
      },
      choosetype(msg){
        if(msg=='1'){
          this.myrank.accountName=this.store.name
          this.myrank.idCard=this.store.bcCode
        }else if(msg=='2'){
          this.myrank.accountName=this.storeAccount.name
          this.myrank.idCard=this.storeAccount.idCard
        }
      }


    },
    computed:{
      phones(){

        return phonestar(this.store.storeAccount.phone)
      }

    },
    mounted(){
      this.type=sessionStorage.getItem('accountType')
      /*let formdata=new FormData();
      formdata.set("storeId",this.$route.query.id);*/
      let para={
        storeId:this.$route.query.id
      }
      this.Api.storedetails(para).then(res => {

        this.store=res.data.data.store
        this.storeAccount=res.data.data.storeAccount

        if(this.store.bcRegisterType=='1'){
          this.myrank.bcRegisterType='2'
          this.myrank.accountName=res.data.data.storeAccount.name
          this.myrank.idCard=res.data.data.storeAccount.idCard
        }else{
          this.myrank.bcRegisterType='1'
          this.myrank.accountName=res.data.data.store.name
          this.myrank.idCard=res.data.data.store.bcCode
        }


        this.myrank.storeId=res.data.data.store.id
        this.myrank.stStoreAccountId=res.data.data.store.storeAccountId

      }).catch(error => {
        console.log(error)
      })

      let province={

      }
      this.shopApi.bankProvince(province).then(res => {
        if (res.data.data.length > 0) {
          console.log(res.data.data)
        this.branchbank.allprovince=res.data.data
        }
      })

      if(this.$route.query.wait){
        this.myrank=getStorage(this.$route.query.id,24)
        this.myrank.onoff=true
        this.steps=2;
      }else{

      }

      inputup('.anzhuotop', '.app-init')

  },
  beforeDestroy () {
    inputup2('.anzhuotop', '.app-init')
  },

  }
</script>

<style scoped lang="scss" type="text/scss">
  .rightmap{
    background: #fff;
  }
  /*.van-cell.right /deep/ .van-cell__value{*/
    /*text-align: right;*/
    /*display: block;*/

  /*}*/
  .van-cell.right /deep/ .van-cell__title{
    max-width: none !important;
  }
    .content-bottom{
  margin-top: 20px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.phonest{
  color: #999;
  font-size: 14px;
  margin: 18px;
}
  .result{
    width: 100%;
    background: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
.noteclick{
  color: #999;
  background: none !important;
  border: none !important;
}
.banklist{
  display: flex;
  flex-direction:row;
  flex-wrap:wrap;
  .banklist-li:last-of-type{
    width: 100%;
  }
  .banklist-li{
    display: flex;
    font-size: 14px;
    line-height: 50px;

    border-bottom: 1px solid rgba(197,197,197,.5);
    width: 50%;
    height: 50px;
    .bankdiv{
      width: 30px;
      height: 30px;
      margin: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
  .steps2-title{
    font-size: 14px;
    padding: 20px;

  }
  .steps2-btn1{
    margin:20px 0 0 20px;
  }
  .steps2-btn2{
    margin:20px 20px 0 0;
    float: right;
  }
  .listprovince /deep/ .listprovince-li{
    width: calc(100% - 36px);
    height: 35px;
    font-size: 14px;
    line-height: 35px;
    color: #333;
    border: #ffffff;
    border-bottom:1px solid #F5F5F5;
    border-right: 1px solid #ffffff;
    margin-left: 18px;
    margin-right: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .bindcard-content{
    background: #fff;
    margin: 10px 18px;
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
  .van-radio /deep/ .van-radio__icon{
    height: auto;
  }
  .bindcard-p{
    color: #666;
    font-size: 12px;
    margin: 10px 0;
    .bindcard-span{
      
    }
  }
  .content2-p{
    color: #333;
    font-size: 14px;
    font-weight: 600;
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
.content1-code{
      font-size: 14px;
      color: #0095FD;
  }
</style>
