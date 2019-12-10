<template>
  <div class="page">
      <top-column :top-header="topheader" @tohetong="tohistory"></top-column>
      <van-notice-bar
      :scrollable="false"
      left-icon="info-o"
      mode="closeable"
      style="width: 100%;"
      v-if="status!=0&&!fromhistory"
    >
      <div style="display: flex;font-size: 12px;justify-content: space-between">
        <p  style='width:70%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>{{hetongs}}</p>
        <p class="bluecolor" v-if="status==2||status==3" @click="memberok">查看原因</p>
      </div>

      
    </van-notice-bar>
  
<div v-if="status=='1'&&contr.operatorType==1"  class="addcontract">
  <p  class="addcontract-p">合同编号：{{contract.contractNumber||''}}
            <br>
            甲方：{{contract.platformBusinessLicenseName||''}}
            <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{contract.platformBusinessLicenseNumber||''}}（以下简称甲方）
            <br>
            乙方：{{contract.storeBusinessLicenseName||''}}
            <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{contract.storeBusinessLicenseNumber||''}}（以下简称乙方）
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;甲、乙双方在自愿、平等、互利的基础上，经友好协商，就乙方经营、推广、传播甲方【省钱熊】APP合作达成如下协议：
        </p>
        
        <p class="addcontract-title">第一条 双方资质</p>
        <p class="addcontract-title1">1.1 甲方资质</p>
        <p   class="addcontract-p">1）甲方是依据中华人民共和国《公司法》规定注册、经营的合法公司；甲方已取得国家合法的《营业执照》、《增值电信业务经营许可证》、《食品流通许可证》等各类资质，并通过年检；甲方相关资质已作为本合同的附件。
            <br>
            2）甲方有权在中国大陆区域内开发、经营、推广、传播【 省钱熊 】APP。
        </p>
        <p class="addcontract-title1">1.2 乙方资质</p>
        <p   class="addcontract-p">1）乙方是具有合法资质、能独立签约、并履行法律义务的商户或法人实体。
            <br>
            2）乙方是完全符合中华人民共和国法律、法规规定注册、经营的个体工商户；乙方已取得国家合法的《营业执照》、《税务登记证》、《卫生许可证》等各类资质，并通过年检；乙方资质及自然人身份证复印件（签章）作为本合同的附件。
        </p>
        
        <p class="addcontract-title">第二条 权利义务</p>
         <p class="addcontract-title1">2.1 甲方权利与义务</p>
         <p   class="addcontract-p">1）甲方提供【 省钱熊 】平台（包括商品展示系统、网上支付系统、商品销售系统、后台管理系统）及相应的技术支持。
            <br>
            2）甲方有权对乙方经营、推广、传播【 省钱熊 】APP行为进行市场监督和市场调查。
            <br>
            3）甲方有权要求乙方不得出现有损【 省钱熊 】APP品牌形象和违法违约的行为，一经发现并查证核实后，甲方有权立即解除合同，乙方应当按照实际损失进行赔偿。
        </p>
        <p class="addcontract-title1">2.2 乙方权利与义务</p>
        <p   class="addcontract-p">1）乙方须认可甲方合作经营管理模式。
            <br>
            2）乙方同意不将甲方所有的任何数据用于本协议约定用途以外，包括但不限于未经甲方书面许可，以复制、传播等方式使用在【 省钱熊 】平台上的任何资料。
            <br>
            3）未经甲方事先书面授权，乙方不得以任何目的，任何形式使用甲方商标、标志及企业字号，否则乙方承担由此产生的全部法律责任。
            <br>
            4）乙方承诺未隐瞒任何其他信息以致足以影响甲方签订及履行本协议。
            <br>
            5）乙方按照合同约定进行甲方【 省钱熊 】APP经营、推广、传播和服务工作，在此过程中维护甲方品牌形象及商业信誉。不得对他人作夸大解释、虚假承诺等有损甲方形象的任何行为。
            <br>
            6）甲方为统一形象会制作相关LOGO及宣传物料，乙方承诺为甲方义务预留省钱熊宣传位置，便于消费者识别进店消费。
        </p>
        <p class="addcontract-title">第三条 合作授权</p>
        <p class="addcontract-p"><b>3.1授权收款：</b>乙方授权甲方先行收取用户通过平台向乙方支付的实际消费款项。</p>
        <p class="addcontract-p"><b>3.2合作期限：</b>自     年   月   日起至     年   月 日止。</p>
        
        <p class="addcontract-title">第四条 合作要求</p>
        <p class="addcontract-title1">4.1  折扣、开票</p>
        <p   class="addcontract-p">1）甲方会员到乙方店铺消费按原价支付商品/服务，并享受返现活动。在支付返现营销费用、渠道费等费用后，甲方与乙方最终结算价不低于{{accMul(contract.storeSettlement,100)}} %。
            <br>
            2）乙方给到甲方的折扣价格在扣除营销费用后不得高于给予其他平台或会员的折扣价格，特殊节假日的折扣由双方协商确定。
            <br>
            3）按消费者实际结算金额，乙方须向消费者开具商品销售或服务等类别的发票。
        </p>
        
        <p class="addcontract-title">第五条 收益结算</p>
        <p class="addcontract-p"><b>5.1银行到账：</b>产品或服务的款项以银行 T+1结算方式到账后，可申请提现。如双方对帐款有异议，双方可通过对帐方式进行核对。</p>
        <p class="addcontract-p">5.2合作期内乙方通过甲方平台获得所有收益的相应税收等由乙方自行承担。</p>
        <p class="addcontract-p">5.3合作期内乙方在甲方平台完成订单后获得的收益，所产生的银行渠道费用和提现费用由甲方承担。</p>
        
        <p class="addcontract-title">第六条 争议解决</p>
        <p class="addcontract-p">6.1一切由执行协议引起或者与协议有关的争议，均应友好协商解决，协商不成时任何一方均可向甲方所在地人民法院提起诉讼。</p>
        <p class="addcontract-p">6.2本协议未涉及的部分，均按《中华人民共和国合同法》及其它相关法律法规的有关规定执行。</p>
        
        <p class="addcontract-title">第七条 生效、终止</p>
        <p class="addcontract-p">7.1本协议自双方或其授权代表签字、盖章之日起正式生效。协议期满前一个月若双方均未以书面形式提出异议，则本协议到期终止。</p>
        <p class="addcontract-p">7.2若本协议终止或解除后双方不再续签新的协议的，则甲方应在本协议终止或解除后的7日内结清所有费用。</p>
        <p class="addcontract-p">7.3对本协议内容做出的任何修改和补充应为书面形式，由双方授权代表签字后成为协议不可分割的部分。</p>
        <p class="addcontract-p">7.4本协议未尽事宜，须经双方另行协商并签署书面文件，与本协议具有同等法律效力。</p>
        <p class="addcontract-p">7.5对协议及附件的任何变更或修改均以书面形式确认，并须甲乙双方或其授权代表签字、盖章方为有效。</p>

        <p class="addcontract-title">第八条 其他约定</p>
        <p   class="addcontract-p">{{contract.otherAgreement}}
            
        </p>
        <div class="heng"></div>
        <div class="heng"></div>
        <div class="addcontract-b">
            <div  class="addcontract-bl">
                <p class="addcontract-title">甲方（盖章）：{{contract.platformBusinessLicenseName||''}} </p>
                <p   class="addcontract-p">
                    授权签字：{{contract.promoterName||''}}
                    <br>
                    地址：{{contract.platformAddress||''}}
                    <br>
                    联系人：{{contract.promoterName||''}}
                    <br>
                    电话：{{contract.promoterPhone||''}}
                    <br>
                    开户银行：{{contract.platformBankName||''}} 
                    <br>
                    账号：{{contract.platformBankAccount||''}}
                    <br>
                    账户名称：{{contract.platformAccountName||''}}
                    <br>
                    签署时间：    年   月   日  
                </p>
            </div>
            <div  class="addcontract-br">
                <p class="addcontract-title">乙方（盖章）：{{contract.storeBusinessLicenseName||''}} </p>
                <p   class="addcontract-p">
                    授权签字：{{contract.storeOperatorName||''}}
                    <br>
                    地址：{{contract.storeProvinceCityDistrict||''}}
                    <br>{{contract.storeAddress||''}}
                    <br>
                    联系人：{{contract.storeOperatorName||''}}
                    <br>
                    电话：{{contract.storeOperatorPhone||''}}
                    <br>
                    开户银行： {{contract.storeBankName||''}}
                    <br>
                    账号：{{contract.storeBankAccount||''}}
                    <br>
                    账户名称：{{contract.storeAccountName||''}}
                    <br>
                    签署时间：    年   月   日  
                </p>
            </div>
        </div>

</div>
<div class="addcontract"  v-if="status=='1'&&contr.operatorType==2" >
       
        <p  class="addcontract-p">合同编号：{{contract.contractNumber||''}}
            <br>
            甲方：{{contract.platformBusinessLicenseName||''}}
            <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{contract.platformBusinessLicenseNumber||''}}（以下简称甲方）
            <br>
            乙方：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{contract.storeBusinessLicenseName||''}}
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经营者姓名&nbsp;{{contract.storeOperatorName||''}}
            <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经营者身份证&nbsp;{{contract.storeOperatorIDCardNumber||''}}
            <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{contract.storeBusinessLicenseNumber||''}}（以下简称乙方）
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;甲、乙双方在自愿、平等、互利的基础上，经友好协商，就乙方经营、推广、传播甲方【省钱熊】APP合作达成如下协议：
        </p>

        <p class="addcontract-title">第一条:双方资质</p>
        <p class="addcontract-title1">1.1甲方资质</p>
        <p   class="addcontract-p">1）甲方是依据中华人民共和国《公司法》规定注册、经营的合法公司；甲方已取得国家合法的《营业执照》、《增值电信业务经营许可证》、《食品流通许可证》等各类资质，并通过年检；甲方相关资质已作为本合同的附件。
            <br>
            2）甲方有权在中国大陆区域内开发、经营、推广、传播【 省钱熊 】APP。
        </p>
        <p class="addcontract-title1">1.2 乙方资质</p>
        <p   class="addcontract-p">1）乙方是具有合法资质、能独立签约、并履行法律义务的商户或法人实体。
            <br>
            2）乙方是完全符合中华人民共和国法律、法规规定注册、经营的个体工商户；乙方已取得国家合法的《营业 执照》、《税务登记证》、《卫生许可证》等各类资质，并通过年检；乙方资质及自然人身份证复印件（签章） 作为本合同的附件。
        </p>
        
        <p class="addcontract-title">第二条 权利义务</p>
         <p class="addcontract-title1">2.1 甲方权利与义务</p>
         <p   class="addcontract-p">1）甲方提供【 省钱熊 】平台（包括商品展示系统、网上支付系统、商品销售系统、后台管理系统）及相应的技术支持。
            <br>
            2）甲方有权对乙方经营、推广、传播【 省钱熊 】APP行为进行市场监督和市场调查。
            <br>
            3）甲方有权要求乙方不得出现有损【 省钱熊 】APP品牌形象和违法违约的行为，一经发现并查证核实后，甲方有权立即解除合同，乙方应当按照实际损失进行赔偿。
        </p>
        <p class="addcontract-title1">2.2 乙方权利与义务</p>
        <p   class="addcontract-p">1）乙方同意不将甲方所有的任何数据用于本协议约定用途以外，包括但不限于未经甲方书面许可，以复制、传播 等方式使用在【 省钱熊 】平台上的任何资料。
            <br>
            2）未经甲方事先书面授权，乙方不得以任何目的，任何形式使用甲方商标、标志及企业字号，否则乙方承担由此 产生的全部法律责任。
            <br>
            3）乙方承诺未隐瞒任何其他信息以致足以影响甲方签订及履行本协议。
            <br>
            4）乙方按照合同约定进行甲方【 省钱熊 】APP 经营、推广、传播和服务工作，在此过程中维护甲方品牌形象及 商业信誉。不得对他人作夸大解释、虚假承诺等有损甲方形象的任何行为。
            <br>
            5）甲方为统一形象会制作相关 LOGO 及宣传物料，乙方承诺为甲方义务预留省钱熊宣传位置，便于消费者识 别进店消费。
            <br>
            
        </p>
        <p class="addcontract-title">第三条 合作授权</p>
        <p class="addcontract-p"><b>3.1 授权收款：</b>乙方授权甲方先行收取用户通过平台向乙方支付的实际消费款项。</p>
        <p class="addcontract-p"><b>3.2 合作期限：</b>自     年   月   日起至     年   月 日止。</p>
        
        <p class="addcontract-title">第四条 合作要求</p>
        <p class="addcontract-title1">4.1  折扣、开票</p>
        <p   class="addcontract-p">1）甲方会员到乙方店铺消费按原价支付商品/服务，并享受返现活动。在支付返现营销费用、渠道费等费用后，甲方与乙方最终结算价不低于{{accMul(contract.storeSettlement,100)}} %。
            <br>
            2）乙方给到甲方的折扣价格在扣除营销费用后不得高于给予其他平台或会员的折扣价格，特殊节假日的折扣由双方协商确定。
            <br>
            3）按消费者实际结算金额，乙方须向消费者开具商品销售或服务等类别的发票。
        </p>
        
        <p class="addcontract-title">第五条 收益结算</p>
        <p class="addcontract-p"><b>5.1银行到账：</b>产品或服务的款项以银行 T+1结算方式到账后，可申请提现。如双方对帐款有异议，双方可通过对帐方式进行核对。</p>
        <p class="addcontract-p">5.2 合作期内乙方通过甲方平台获得所有收益的相应税收等由乙方自行承担。</p>
        <p class="addcontract-p">5.3 合作期内乙方通过甲方平台获得所有收益的提现手续费用等由甲方承担。</p>
        <p class="addcontract-p"><b>5.4 账户信息：</b>乙方指定双方货款结算汇入以下账户：
        br>账户名称&nbsp;&nbsp;{{''+contract.storeAccountName||'_________________'}}
        <br> 账号&nbsp;&nbsp;{{contract.storeBankAccount||'_______________'}}
        <br>开户银行&nbsp;&nbsp;{{contract.storeBankName||'__________'}}</p>

        <p class="addcontract-title">第六条 争议解决</p>
        <p class="addcontract-p">6.1 一切由执行协议引起或者与协议有关的争议，均应友好协商解决，协商不成时任何一方均可向甲方所在地 人民法院提起诉讼。</p>
        <p class="addcontract-p">6.2 本协议未涉及的部分，均按《中华人民共和国合同法》及其它相关法律法规的有关规定执行。</p>
        
        <p class="addcontract-title">第七条 生效、终止</p>
        <p class="addcontract-p">7.1 本协议自双方或其授权代表签字、盖章之日起正式生效。协议期满前一个月若双方均未以书面形式提出异议，则本协议到期终止。</p>
        <p class="addcontract-p">7.2 若本协议终止或解除后双方不再续签新的协议的，则甲方应在本协议终止或解除后的7日内结清所有费用。</p>
        <p class="addcontract-p">7.3 对本协议内容做出的任何修改和补充应为书面形式，由双方授权代表签字后成为协议不可分割的部分。</p>
        <p class="addcontract-p">7.4 本协议未尽事宜，须经双方另行协商并签署书面文件，与本协议具有同等法律效力。</p>
        <p class="addcontract-p">7.5 对协议及附件的任何变更或修改均以书面形式确认，并须甲乙双方或其授权代表签字、盖章方为有效。</p>

        <p class="addcontract-title">第八条 其他约定</p>
        <p   class="addcontract-p">{{contract.otherAgreement}}
            
        </p>
        <!-- <div class="heng"></div>
        <div class="heng"></div> -->
        <br>
        <br>
        <br>
        <div class="addcontract-b">
            <div  class="addcontract-bl">
                <p class="addcontract-title">甲方（盖章）： {{contract.platformBusinessLicenseName||''}}</p>
                <p   class="addcontract-p">
                    授权签字：{{contract.promoterName||''}}
                    <br>
                    地址：{{contract.platformAddress||''}}
                    <br>
                    联系人：{{contract.promoterName||''}}
                    <br>
                    电话：{{contract.promoterPhone||''}}
                    <br>
                    开户银行：{{contract.platformBankName||''}} 
                    <br>
                    账号：{{contract.platformBankAccount||''}}
                    <br>
                    账户名称：{{contract.platformAccountName||''}}
                    <br>
                    签署时间：    年   月   日  
                </p>
            </div>
            <div  class="addcontract-br">
                <p class="addcontract-title">乙方（盖章）：{{contract.storeBusinessLicenseName||''}}  </p>
                <p   class="addcontract-p">
                    授权签字：{{contract.storeOperatorName||''}}
                    <br>
                    地址：{{contract.storeProvinceCityDistrict||''}}
                    <br>{{contract.storeAddress||''}}
                    <br>
                    联系人：{{contract.storeOperatorName||''}}
                    <br>
                    电话：{{contract.storeOperatorPhone||''}}
                    <br>
                   
                    签署时间：    年   月   日  
                </p>
            </div>
        </div>
      </div>
<div v-else>
  <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
  <div class="content-bottom">
           <van-button type="primary" size="large" @click="look" class="submitbtn">查看合同</van-button>
          </div>
</div>

   <div class="changebtn" @click="changebtn"  v-if="list=='5'&&!fromhistory&&(type==1||type==0)">
          <div>
            <img src="@assets/img/change.png" />
          </div>
          <p>修改</p>
        </div>
   <van-popup
  v-model="show"
  
  position="bottom"
  :style="{ height: '30%' }"
>
<p class="hetong-popt">查看原因</p>
<p class="hetong-popb">原因类型：受渠道成本增长影响。</p>
<p class="hetong-popb">详细说明：{{contractremakes.updateExplain||''}}</p>
<!-- <van-button type="primary" size="large" @click="inputblur" class="submitbtn hetong-popbutton">去签合同</van-button> -->
</van-popup>
  </div>
</template>

<script>
import PDFJS from "pdfjs-dist";
 import {back,accMul,phonestar,lookContract} from '@/utils'
  export default {
    data () {
      return {
        accMul,
          phonestar,
          topheader: {
          name: '合同',
          left: '1',
          right14: '1',
          heade: 'header'
        },
        show:false,
        type:'',
        list:'',
        hetong:'',
        numPages: undefined,
        status:'',
        contractremakes:'',
        fromhistory:false,
        contract:{},  //状态为1时预览合同
        contr:'',
        pdfDoc:null,
        pages:0,
        ischange:false,
      }
    },
    components: {
    },
    methods: {
      look(){
        lookContract(this.hetong)
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
         if(this.ischange&&this.ischange.approvalContentId){
           this.$dialog.confirm({
              message: '合同修改正在审核中，不能提交。',
              confirmButtonText:'取消',
              cancelButtonText:'审核详情'
            }).then(() => {
              // on confirm
            }).catch(() => {
              this.$router.push({
          path: "/changecontract",
          query: { id: this.ischange.approvalContentId}
        });
            });
         }else 
         if(this.status==1){
          this.$router.push({path:'changehetong',query:{id:this.$route.query.id,beforeContractId:'',operatorType:this.contr.operatorType,ratePlatform:this.contr.ratePlatform,rateBase:this.contr.rateBase,otherAppointment:this.contr.otherAppointment}})
      
         }
         
         else{
              this.$router.push({path:'changehetong',query:{id:this.$route.query.id,beforeContractId:this.$route.query.contractId,operatorType:this.$route.query.operatorType,ratePlatform:this.$route.query.ratePlatform,rateBase:this.$route.query.rateBase,otherAppointment:this.$route.query.otherAppointment}})
      
         }
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
            return '入驻未完成，请督促店铺签合同。'
            case '1':
            return '入驻未完成，请督促店铺签合同。'
          case 2:
            return '合同发生变更，请督促店铺改签。'
             case '2':
            return '合同发生变更，请督促店铺改签。'
          case 3:
            return '合同发生变更，已停用收款功能。请督促店铺改签。'
            case '3':
            return '合同发生变更，已停用收款功能。请督促店铺改签。'
          case 4:
            return '续签(合同临期)，请督促店铺续签。'
            case '4':
            return '续签(合同临期)，请督促店铺续签。'
          case 5:
            return '合同已到期，请督促店铺续签。'
            case '5':
            return '合同已到期，请督促店铺续签。'
            default:
            return ' '
        }
      }
    },
    mounted(){
        back('#ffffff')
       this.type=sessionStorage.getItem('accountType')
      this.hetong=this.$route.query.img
         this.status=this.$route.query.status
         this.list=this.$route.query.list
         this.fromhistory=this.$route.query.fromhistory
          if(this.fromhistory){
            this.topheader.right14=''
          }
            let para={
        storeId:this.$route.query.id
      }
      this.Api.lookChangeContract(para).then(res=>{
        this.contractremakes=res.data.data
      })
      this.Api.examineContracts(para).then(res=>{
        this.ischange=res.data.data
      })
          

    if(this.$route.query.status=='1'){
      let para={
        storeId:this.$route.query.id,
        contractStatus:1
      }
      this.Api.lookContracts(para).then(res=>{
          console.log(res)
          if(res.data.status===1){
                            this.contract=JSON.parse(res.data.data.contractParam);
                            this.contr=res.data.data
                        }
      })
    }
           

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

.addcontract{
    padding: 20px;
}
.addcontract-title{
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 20px 0;
}
 .addcontract-title1{
    font-size: 13px;
    font-weight: 600;
    color: #333;
    margin: 10px 0;
}
.addcontract-p{
    font-size: 12px;
    line-height: 18px;
}
.heng{
    border-top: 1px solid #333;
    height: 10px;
}
.addcontract-b{
    // display: flex;
    .addcontract-bl{
        // width: 50%;

    }
    .addcontract-br{
        // width: 50%;
        
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
