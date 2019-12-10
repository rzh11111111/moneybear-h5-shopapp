<template>
  <div class="page" style="background:#fff;min-height:100vh;">
      <top-column :top-header="topheader"></top-column>
      <div class="addcontract"  v-if="operatorType==1">
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
        

        <p class="addcontract-title">第一条:双方资质</p>
        <p class="addcontract-title1">1.1甲方资质</p>
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
        <p class="addcontract-p"><b>3.1 授权收款：</b>乙方授权甲方先行收取用户通过平台向乙方支付的实际消费款项。</p>
        <p class="addcontract-p"><b>3.2 合作期限：</b>自     年   月   日起至     年   月 日止。</p>
        
        <p class="addcontract-title">第四条 合作要求</p>
        <p class="addcontract-title1">4.1  折扣、开票</p>
        <p   class="addcontract-p">1）甲方会员到乙方店铺消费按原价支付商品/服务，并享受返现活动。在支付返现营销费用、渠道费等费用后，甲方与乙方最终结算价不低于{{accMul(contract.storeDiscount,100)}} %。
            <br>
            2）乙方给到甲方的折扣价格在扣除营销费用后不得高于给予其他平台或会员的折扣价格，特殊节假日的折扣由双方协商确定。
            <br>
            3）按消费者实际结算金额，乙方须向消费者开具商品销售或服务等类别的发票。
        </p>
        
        <p class="addcontract-title">第五条 收益结算</p>
        <p class="addcontract-p"><b>5.1银行到账：</b>产品或服务的款项以银行 T+1结算方式到账后，可申请提现。如双方对帐款有异议，双方可通过对帐方式进行核对。</p>
        <p class="addcontract-p">5.2 合作期内乙方通过甲方平台获得所有收益的相应税收等由乙方自行承担。</p>
        <p class="addcontract-p">5.3 合作期内乙方在甲方平台完成订单后获得的收益，所产生的银行渠道费用和提现费用由甲方承担。</p>
        
        <p class="addcontract-title">第六条 争议解决</p>
        <p class="addcontract-p">6.1 一切由执行协议引起或者与协议有关的争议，均应友好协商解决，协商不成时任何一方均可向甲方所在地人民法院提起诉讼。</p>
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
 <div class="addcontract"  v-else>
       
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
        <p   class="addcontract-p">1）甲方会员到乙方店铺消费按原价支付商品/服务，并享受返现活动。在支付返现营销费用、渠道费等费用后，甲方与乙方最终结算价不低于{{accMul(contract.storeDiscount,100)}} %。
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
        <br>账户名称&nbsp;&nbsp;{{''+contract.storeAccountName||'_________________'}}
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


      <van-button type="primary" size="large" @click="inputblur" class="submitbtn hetong-popbutton">签合同</van-button>

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
              <ul class="add-ul" v-if="operatorType==1">
                  <li class="add-li">
                      <p  class="add-lil">乙方</p>
                      <p  class="add-lir">{{contract.storeBusinessLicenseName||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">合同期限</p>
                      <p  class="add-lir">店铺签合同之日起1年整</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil redcolor">结算给店铺</p>
                      <p  class="add-lir redcolor">{{accMul(contract.storeDiscount,100)}}%</p>
                  </li>
                  <!-- <li class="add-li">
                      <p  class="add-lil redcolor">营销费用</p>
                      <p  class="add-lir redcolor">{{accMul(contract.platformServiceFee,100)}}%</p>
                  </li> -->
                   <li class="add-li">
                      <p  class="add-lil redcolor">结算方式</p>
                      <p  class="add-lir redcolor">T+1</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">店铺地址</p>
                      <p  class="add-lir ">{{contract.storeProvinceCityDistrict||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil ">经营者姓名</p>
                      <p  class="add-lir">{{contract.storeOperatorName||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">经营者手机号</p>
                      <p  class="add-lir">{{contract.storeOperatorPhone||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">开户银行</p>
                      <p  class="add-lir">{{contract.storeBankName||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">账号</p>
                      <p  class="add-lir">{{contract.storeBankAccount||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">账号名称</p>
                      <p  class="add-lir">{{contract.storeAccountName||''}}</p>
                  </li>
              </ul>
              <ul class="add-ul" v-else>
                  <li class="add-li">
                      <p  class="add-lil">乙方</p>
                      <p  class="add-lir">{{contract.storeBusinessLicenseName||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil ">经营者姓名</p>
                      <p  class="add-lir">{{contract.storeOperatorName||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil ">经营者身份证号</p>
                      <p  class="add-lir">{{contract.storeOperatorIDCardNumber||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">合同期限</p>
                      <p  class="add-lir">店铺签合同之日起1年整</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil redcolor">结算给店铺</p>
                      <p  class="add-lir redcolor">{{accMul(contract.storeDiscount,100)}}%</p>
                  </li>
                  <!-- <li class="add-li">
                      <p  class="add-lil redcolor">营销费用</p>
                      <p  class="add-lir redcolor">{{accMul(contract.platformServiceFee,100)}}%</p>
                  </li> -->
                   <li class="add-li">
                      <p  class="add-lil redcolor">结算方式</p>
                      <p  class="add-lir redcolor">T+1</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">账号名称</p>
                      <p  class="add-lir">{{contract.storeAccountName||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">账号</p>
                      <p  class="add-lir">{{contract.storeBankAccount||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">开户银行</p>
                      <p  class="add-lir">{{contract.storeBankName||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">店铺地址</p>
                      <p  class="add-lir ">{{contract.storeProvinceCityDistrict||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">联系人姓名</p>
                      <p  class="add-lir">{{contract.promoterName||''}}</p>
                  </li>
                  <li class="add-li">
                      <p  class="add-lil">联系人手机号</p>
                      <p  class="add-lir">{{contract.storeOperatorPhone||''}}</p>
                  </li>
                  
                  
                  
              </ul>
              <div class="content-bottom">
            <van-button type="default"  @click="clickul(false)">取消</van-button>
            <van-button type="primary" @click="clickul(true)" >确认无误</van-button>
          </div>
          </div>

      </div>
        </van-popup>
        <van-popup
  v-model="code"
  position="bottom"
  :style="{ height: '50%' }"
>
 <div class="content1" >
              <input class="content1-input" max=6 type="text" disabled :value="codes" placeholder='请输入验证码'>
              <p class="content1-code" v-show="sendAuthCode"  @click="getnote">发送验证码</p>
              <span v-show="!sendAuthCode" class="content1-code"> <span class="auth_text_blue">{{auth_time}} </span>s</span>
              </div>
              <div style="display:flex;justify-content:space-around">
              <p>验证码已发送至{{phonestar(contract.storeOperatorPhone)}}</p>
              <p :class="codeerror?'redcolor':'whitecolor'">验证码错误</p>
             
              </div>
<van-number-keyboard
        :show="code"
        v-model="codes"
        theme="custom"
        close-button-text="签订合同"
        :hide-on-click-outside="false"
        @blur="code = false"
        @close="onInput"
        />
</van-popup>
        
  </div>
</template>

<script>
import likevant from '@/components/likevant'
import {back,accMul,phonestar} from '@/utils'
  export default {
    data () {
      return {
          accMul,
          phonestar,
           topheader: {
          name: '签合同',
          left: '1',
          heade: 'header'
        },
        codeerror:false,
        contract:{},
        operatorType:'', //1法人，2非法人
        show: false,
        code:false,
        codes:'',
        havecard:false,
        sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
        auth_time: 0, /* 倒计时 计数器 */
        timer: null,
      }
    },
    components: {
        likevant
    },
    methods: {
        onInput(){
           if(this.codes.length!==6){
               this.$toast('验证码格式不正确')
                return
            }
    
            console.log('qianhetong')
            let para={
              storeId:sessionStorage.getItem('storeId'),
              code:this.codes,
              contractStatus:this.$route.query.status
            }
            
              this.shopApi.addContract(para).then(res => {
                  console.log('111')
                if (res.data && res.data.status === 1) {
                     this.$router.push({ path: '/ApplyResult', query: { win: true, type: 6 } })

                }
              }).catch(error => {
                console.log(error)
              })
        },
        getnote () {
            
        
            
            let para={
              storeId:sessionStorage.getItem('storeId')
            }
            
              this.shopApi.codeContract(para).then(res => {
                if (res.data && res.data.status === 1) {
                    this.auth_time = 60
                  this.timeInterval()
                }
              }).catch(error => {
                console.log(error)
              })
            

          


        
      },
      timeInterval(){
        this.sendAuthCode = false
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.auth_time--
          if (this.auth_time <= 0) {
            this.sendAuthCode = true
            clearInterval(this.timer)
          }
        }, 1000)
      },
        inputblur(){
            if(!this.havecard){
                this.$dialog.confirm({
                message: '请先绑定银行卡，在签合同'
                }).then(() => {
                // on confirm
                 this.$router.push({path: '/BindCard', query: {id:sessionStorage.getItem('storeId')}})
                }).catch(() => {
                // on cancel
                });
                return
            }
            let para={
                storeId:sessionStorage.getItem('storeId')
            }
            this.Api.changeFirstStore2(para).then(res => {
                console.log(res)
                // res.data.data.managerCooperation.bcRegisterType=res.data.data.managerCooperation.bcRegisterType.toString()//数字转字符串
                if (res.data.data) {
                this.$dialog.confirm({
                    message: '店铺/经营者资料正在审核中，确认签合同？'
                }).then(() => {
                    // on close
                    this.show = true;
                })

                }else{
                   this.show = true;
                }
            }).catch(error => {
                console.log(error)
            })
        },
        clickul(value){
            if(value){
                this.show=false
                this.code=true;
            }else{
                this.show=false
            }
        },
        lookContract(){
            let para2={
                        storeId:sessionStorage.getItem('storeId'),
                        contractStatus:this.$route.query.status
                    }
                    this.shopApi.lookContract(para2).then(res=>{
                        console.log(res)
                        if(res.data.status===1){
                            this.contract=JSON.parse(res.data.data.contractParam);
                            this.operatorType=res.data.data.operatorType
                        }
                        
                    })
        }
    },
    computed: {

    },
    mounted(){
        back('#ffffff')
        let para={
            storeId:sessionStorage.getItem('storeId')
        }
        this.Api.getCardstore(para).then(res => {
        // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
        // setToken(res.data.phone)
        // this.shop.logo = res.data.url
        if(res.data.data.list.length>0){
          this.havecard=true
           this.lookContract()
        //   this.rank.card=res.data.data.list[0]
        }else{
          this.havecard=false
        }
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
 .van-popup.van-popup--center{
        z-index: 205000 !important;
    }
    .van-button--normal{
        width: 36vw;
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
.add-step2{
    height: 90vh;
    background: #fff;
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
    }
}

 


.content2-choose /deep/ .van-radio__icon{
    height: auto;
  }
  .add-ul{
      .add-li{
          display: flex;
          
          .add-lil{
              width: 100px;
              color: #999;
              font-size: 14px;
              line-height: 46px;
          }
          .add-lir{
              color: #666;
              font-size: 14px;
              line-height: 46px;
          }
      }
      
  }
  .add-li:not(:last-child){
      border-bottom: 1px solid #f5f5f5;
  }
  .content-bottom{
  margin-top: 20px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content1{
  width: 90%;
  height: 48px;
  display: flex;
  background:rgba(245,245,245,1);
border-radius:5px;
  align-items: center;
  justify-content: space-around;
  margin: 24px 5% 0;
  .content1-input{
    width: 230px;
    background: rgba(245,245,245,1);
    border:none;
    font-size: 14px;
  }
  .content1-code{
      font-size: 14px;
      color: #0095FD;
  }
}
.whitecolor{
    color: #fff;
}
</style>
