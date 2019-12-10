<template>
  <div class="page">
    <top-column :top-header="topheader" ></top-column>
    <van-collapse :value="activeNames" class="margintop">
            <van-collapse-item name="0" :is-link="false" title="开票详情" title-style="max-width:none" value-class="collapsewarn">
                <div slot="icon" class="vant-collapse-icon"></div>
          
                <van-cell type="text" title="费用类型" value="平台服务费" readonly></van-cell>
                <van-cell type="text" title="开票金额" :value="'￥'+2" readonly>
                  <p slot="right-icon" class="bluecolor">明细</p>
                </van-cell>
                <van-cell type="text" title="发票类型" :value="detail.invoiceType===1?'增值税普通发票(电子发票)':'增值税专用发票(纸质发票)'" readonly/>
                <van-cell type="text" title="开票状态" value-class="bluecolor" :value="detail.status===1?'待开票':detail.status===2?'已开票':'异常'" readonly/>
                <van-cell type="text" title="开票编码" :value="5" readonly/>
                <van-cell type="text" title="生成时间" :value="5" readonly/>
                <van-cell type="text" title="开票时间" :value="5" readonly/>
                <van-cell type="text" title="快递" v-if="detail.invoiceType===2" :value="5" readonly/>
                <van-cell type="text" title="纸质发票照片" v-if="detail.invoiceType===2" :value="5" readonly>
                  <div class="invoice-img"><img src="https://static-oss-shengqianxiong-produce.oss-cn-hangzhou.aliyuncs.com/activity/498.jpg"/></div>
                </van-cell>
                
            </van-collapse-item>
        </van-collapse>
         <van-collapse :value="activeNames" class="margintop">
            <van-collapse-item :is-link="false" v-if="detail.invoiceType===1" name="0" title="开票信息" title-style="max-width:none" value-class="collapsewarn">
                <div slot="icon" class="vant-collapse-icon"></div>
                
                <van-cell type="text" title="名称" :value="1" readonly></van-cell>
                <van-cell type="text" title="纳税人识别号" :value="2" readonly></van-cell>
                <van-cell type="text" title="邮箱" :value="3" readonly/>
            </van-collapse-item>
            <van-collapse-item :is-link="false" v-else name="0" title="开票信息" title-style="max-width:none" value-class="collapsewarn">
                <div slot="icon" class="vant-collapse-icon"></div>
                <van-cell type="text" title="一般纳税人资格证明" v-if="detail.invoiceType===2" :value="5" readonly>
                  <div class="invoice-img"><img src="https://static-oss-shengqianxiong-produce.oss-cn-hangzhou.aliyuncs.com/activity/498.jpg"/></div>
                </van-cell>
                <van-cell type="text" title="名称" :value="1" readonly></van-cell>
                <van-cell type="text" title="纳税人识别号" :value="2" readonly></van-cell>
                <van-cell type="text" title="银行账号" :value="1" readonly></van-cell>
                <van-cell type="text" title="开户行" :value="1" readonly></van-cell>
                <van-cell type="text" title="营业地址" :value="1" readonly></van-cell>
                <van-cell type="text" title="电话" :value="1" readonly></van-cell>
                <van-cell type="text" title="邮箱" :value="3" readonly/>
            </van-collapse-item>
        </van-collapse>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        topheader: {
        name: '发票详情',
        left: '2',
        heade: 'header1',
      },
        activeNames: ["0","1"], // 开哪个折叠
        detail:{
          code:'', //开票编码
          bcCode:'', //纳税人识别号
          status:1, //开票状态(1.待开票 2.已开票 3.异常)',
          serviceType:1, //'1.线上企业 2.线下店铺',
          invoiceType:2, //'1.电子发票 2.专用发票',
          type:1, //'费用类型 1.平台服务费',
          serviceName:'dsdsdsd', //'所属企业名称',
          serviceCode:'32323232322', //'所属企业编码',
          serviceId:'32323232323', //'所属企业',
          invoiceMoney:'32323', //'开票金额',
          courierNumber:'3232323232', //'快递单号',
          invoicePic:'32323', //'合同照片',
          successTime:'', //'开票成功时间'
          invoiceContent:'32323' //开票内容json格式
        }
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
.invoice-img{
  width: 48px;
  height: 48px;
  border-radius: 2px;
  overflow: hidden;
    img{
    width: 100%;
    height: 100%;
  }
}
 
</style>
