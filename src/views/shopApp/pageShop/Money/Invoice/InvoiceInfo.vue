<template>
  <div class="page">
    <top-column :top-header="topheader"></top-column>
    <van-collapse :value="activeNames" class="margintop">
      <van-collapse-item
      v-if="detail.invoiceType===1"
        name="0"
        title="开票信息"
        title-style="max-width:none"
        value-class="collapsewarn"
        :is-link="false"
      >
        <div slot="icon" class="vant-collapse-icon"></div>
        <van-cell
          type="text"
          title="发票类型"
          :value="detail.invoiceType===1?'增值税普通发票(电子发票)':'增值税专用发票(纸质发票)'"
          value-class="blaccolor"
          readonly
        />
        <van-cell type="text" value-class="blaccolor" title="名称" :value="1" readonly></van-cell>
        <van-cell type="text" value-class="blaccolor" title="纳税人识别号" :value="2" readonly></van-cell>
        <van-cell type="text" value-class="blaccolor" title="邮箱" :value="3" readonly />
      </van-collapse-item>
      <van-collapse-item  v-else name="0" :is-link="false" title="开票信息" title-style="max-width:none" value-class="collapsewarn">
                <div slot="icon" class="vant-collapse-icon"></div>
                <van-cell
          type="text"
          title="发票类型"
          :value="detail.invoiceType===1?'增值税普通发票(电子发票)':'增值税专用发票(纸质发票)'"
          value-class="blaccolor"
          readonly
        />
                <van-cell type="text" title="一般纳税人资格证明" v-if="detail.invoiceType===2" :value="5" readonly>
                  <div class="invoice-img"><img src="https://static-oss-shengqianxiong-produce.oss-cn-hangzhou.aliyuncs.com/activity/498.jpg"/></div>
                </van-cell>
                <van-cell type="text" title="名称" :value="1" readonly></van-cell>
                <van-cell type="text" title="纳税人识别号" :value="2" readonly></van-cell>
                <van-cell type="text" title="银行账号" :value="1" readonly></van-cell>
                <van-cell type="text" title="开户行" :value="1" readonly></van-cell>
                <van-cell type="text" title="营业地址" :value="1" readonly></van-cell>
                <van-cell type="text" title="电话" :value="1" readonly></van-cell>
                <van-cell type="text" title="邮箱地址" :value="3" readonly/>
            </van-collapse-item>
    </van-collapse>
    <div class="content-bottom">
<van-button type="info" size="large" @click="submitBasic" class="submitbtn">编辑开票信息</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topheader: {
        name: '开票信息',
        left: '2',
        heade: 'header1',
      },
      activeNames: ["0"], // 开哪个折叠
      detail: {
        code: '', //开票编码
        bcCode: '', //纳税人识别号
        status: 1, //开票状态(1.待开票 2.已开票 3.异常)',
        serviceType: 1, //'1.线上企业 2.线下店铺',
        invoiceType: 2, //'1.电子发票 2.专用发票',
        type: 1, //'费用类型 1.平台服务费',
        serviceName: 'dsdsdsd', //'所属企业名称',
        serviceCode: '32323232322', //'所属企业编码',
        serviceId: '32323232323', //'所属企业',
        invoiceMoney: '32323', //'开票金额',
        courierNumber: '3232323232', //'快递单号',
        invoicePic: '32323', //'合同照片',
        successTime: '', //'开票成功时间'
        invoiceContent: '32323' //开票内容json格式
      }
    }
  },
  components: {

  },
  methods: {
    submitBasic(){
      this.$router.push({path:'/ChangeInvoiceInfo',query:{}})
    }
  },
  computed: {

  },
  mounted () {

  },
}
</script>

<style scoped lang="scss" type="text/scss">
.blaccolor{
  color: #666;

}
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
.margintop{
  margin-bottom: 70px;
}
</style>
