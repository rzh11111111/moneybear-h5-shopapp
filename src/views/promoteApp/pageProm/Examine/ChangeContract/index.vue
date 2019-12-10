<template>
  <div class="page">
    <top-column :top-header="topheader" @tochangecontract='tochangecontract'></top-column>
    <div class="changecon-title greencolor" v-if="shop.delFlag==0">{{returnDelFlag(shop.delFlag)}}</div>
    <div class="changecon-title bluecolor" v-if="shop.delFlag==2">{{returnDelFlag(shop.delFlag)}}</div>
    <div class="changecon-title redcolor" v-if="shop.delFlag==3">{{returnDelFlag(shop.delFlag)}}</div>
    <div v-if="steps===1">
      <van-collapse :value="activeNames">
        <van-collapse-item title="申请人信息" title-style="font-weight:600;" name="1" value=" " value-class="collapsewarn teshuclass">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="right-icon"></div>
          <van-cell title="申请人" value-class="contractright">{{shop?shop.createBy:''}}</van-cell>
          <van-cell title="申请时间" value-class="contractright">{{shop?shop.createTime:''}}</van-cell>
          <van-cell title="店招名称" value-class="contractright">{{approvalContent?approvalContent.storeName:''}}</van-cell>
          <van-cell title="店铺地址" value-class="contractright">{{shop.province+shop.city+shop.region}}</van-cell>
          <van-cell title=" " value-class="contractright">{{approvalContent==null?'':approvalContent.address}}</van-cell>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div v-if="steps===2">
      <van-collapse :value="activeNames">
        <van-collapse-item title="申请说明"  title-style="font-weight:600;" name="1" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="right-icon"></div>
          <van-cell title="原因类型"  value-class="contractright">{{approvalContent?approvalContent.updateReason:''}}</van-cell>
          <van-cell title="详细说明"  value-class="contractright">{{approvalContent?approvalContent.updateExplain:''}}</van-cell>
          <van-cell
            title="审核通过后是否强制改签"
             value-class="contractright"
          >{{approvalContent?(approvalContent.isForceUpdate=='1'?'是,不改签不能收款':'否'):''}}</van-cell>
          <van-cell title="备注"  value-class="contractright">{{approvalContent?approvalContent.remarks:''}}</van-cell>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div v-if="steps===3">
      <van-collapse :value="activeNames">
        <van-collapse-item title="合同摘要"  title-style="font-weight:600;" name="1" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="right-icon"></div>
          <van-cell title="结算给店铺" value-class="contractright">
            <div slot="default">
              {{approvalContent?accMul(approvalContent.storeSettlement, 100)+'%':''}}
              <br />
              <p
                class="redcolor"
                v-if="oldapp.storeSettlement&&approvalContent.storeSettlement!=oldapp.storeSettlement"
              >变更前：{{oldapp?accMul(oldapp.storeSettlement, 100)+'%':''}}</p>
            </div>
          </van-cell>
          <!-- <van-cell title="平台收取收款金额" value-class="contractright">
            <div slot="default">
              {{approvalContent?accMul(approvalContent.ratePlatform, 100)+'%':''}}
              <br />
              <p
                class="redcolor"
                v-if="oldapp.ratePlatform&&approvalContent.ratePlatform!=oldapp.ratePlatform"
              >变更前：{{oldapp?accMul(oldapp.ratePlatform, 100)+'%':''}}</p>
            </div>
          </van-cell> -->
          <van-cell title="签署人是否法人" value-class="contractright">
            <div slot="default">
              {{approvalContent?(approvalContent.operatorType==1?'法人':'非法人'):''}}
              <br />
              <p
                class="redcolor"
                v-if="oldapp.operatorType&&approvalContent.operatorType!=oldapp.operatorType"
              >变更前：{{oldapp?(oldapp.operatorType==1?'法人':'非法人'):''}}</p>
            </div>
          </van-cell>
          <van-cell title="合同时间" value-class="contractright">
            <div slot="default">
              店铺签合同之日起1年整
              <br />
              <!-- <p class="redcolor">
                店铺签合同之日起1年整
              </p>-->
            </div>
          </van-cell>
          <van-cell title="其他约定" value-class="contractright">
            <div slot="default">
              {{approvalContent?approvalContent.otherAppointment:'无'}}
              <br />
              <p
                class="redcolor"
                v-if="oldapp.otherAppointment&&approvalContent.otherAppointment!=oldapp.otherAppointment"
              >变更前：{{oldapp?oldapp.otherAppointment:'无'}}</p>
            </div>
          </van-cell>
        </van-collapse-item>
      </van-collapse>
    </div>

    <van-popup v-model="show" :close-on-click-overlay="false" class="shows">
      <p class="shows-title">原因/备注</p>
      <textarea
        maxlength="200"
        v-model="remakes"
        class="content3-input"
        placeholder="审核拒绝时，必须填写原因"
      ></textarea>
      <div class="shows-b">
        <div class="shows-bl" @click="show=false">取消</div>
        <div class="shows-br" @click="toresult">确定</div>
      </div>
    </van-popup>

    <div class="content-bottom">
      <van-button
        type="primary"
        size="large"
        @click="inputblur"
        v-if="steps===1||steps===2"
        class="submitbtn"
      >下一页</van-button>
      <van-button
        type="default"
        style="background:#FE5502;color:#fff;"
        v-if="steps===3&&accountType=='3'&&!records"
        @click="inputstepsinfo(false)"
      >驳回</van-button>
      <van-button
        type="default"
        style="background:#65D13E;color:#fff;"
        v-if="steps===3&&accountType=='3'&&!records"
        @click="inputstepsinfo(true)"
      >通过</van-button>
    </div>
    <div class="changecontract-te" v-show="contractte">
        <p  class="changecontract-tep" @click="todetali(false)">店铺详情</p>
    </div>
  </div>
</template>

<script>
import { accMul} from '@/utils'
export default {
  data () {
    return {
      accMul,
      topheader: {
        name: "审核详情",
        left: "3",
        right15:'1',
        heade: "header1"
      },
      accountType: '',
      show: false,
      istrue: true, //通过还是驳回
      steps: 1,
      activeNames: ['1'],
      remakes: '',
      shop: {},
      approvalContent: {},
      oldapp: {},
      records:'',//省区总是否从审核记录过来
      contractte:false
    }
  },
  components: {

  },
  methods: {
    goback () {
      if (this.steps == 2) {
        this.steps = 1;
      } else if (this.steps == 3) {
        this.steps = 2;
      } else {
        this.$router.go(-1);
      }
    },
    todetali(value){
      console.log(value)
      if(!value){
        // storeId
        this.$router.push({
          path: '/StoreDetail',
          query: { id: this.approvalContent.storeId,  list: 5, fromrouter: '1' }
        })
      }
    },
    tochangecontract(){
      console.log('11')
      this.contractte=!this.contractte
    },
    toresult () {
      let para = {
        isRelease: this.istrue ? '0' : '1',
        id: this.shop.id,
        serviceType: '30',
        remarks: this.remarks
      };
      if (!this.istrue && !this.remakes) {
        this.$toast('审核拒绝时，必须填写原因')
        return
      }
      this.Api.approveornot(para)
        .then(res => {
          if (res) {
            if (res.status == 1) {
              this.$toast("操作成功，审核通过");
            } else {
              this.$toast(res.data.stateMessage);
            }
            this.$router.go(-1);
          }
        });
    },
    inputblur () {
      this.steps += 1
      this.contractte=false
    },
    inputstepsinfo (value) {
      this.show = true;
      this.istrue = value
    },
    lookContract (id) {
      let para = {
        id: id
      }

      // let formdata = new FormData();
      // formdata.set("id", this.$route.query.id);

      this.Api.lookContract(para)
        .then(res => {
          this.oldapp = res.data.data;
          // this.shop.createBy = this.shop.createBy.split('/')[1];
          //  var bPos = this.shop.createBy.indexOf('B');

          // var r = str.substr(aPos + 1, bPos - aPos - 1);
          // this.approvalContent = JSON.parse(res.data.data.approvalContent);


        })
        .catch(error => {
          console.log(error);
        });
    },
    returnDelFlag(type) {
      switch (type) {
        case 0:
          return "审核通过";
        case 1:
          return "已删除";
        case 2:
          return "审核中";
        case 3:
          return "审核拒绝";
        default:
          return "无";
      }
    },
  },
  computed: {

  },
  mounted () {
    this.accountType = sessionStorage.getItem('accountType')
    this.records=this.$route.query.record
    if (this.$route.query.id) {  //正常流程进来
      let para = {
        id: this.$route.query.id
      }

      // let formdata = new FormData();
      // formdata.set("id", this.$route.query.id);

      this.Api.getApprovalDetail(para)
        .then(res => {
          this.shop = res.data.data;
          this.shop.createBy = this.shop.createBy.split('/')[1];
          // var bPos = this.shop.createBy.indexOf('B');

          // var r = str.substr(aPos + 1, bPos - aPos - 1);
          this.approvalContent = JSON.parse(res.data.data.approvalContent);
          if(this.approvalContent.beforeContractId){
             this.lookContract(this.approvalContent.beforeContractId)
          }
         

        })
        .catch(error => {
          console.log(error);
        });
    }

  }
}
</script>

<style scoped lang="scss" type="text/scss">
.van-popup.van-popup--center {
  z-index: 205000 !important;
}
.van-cell .van-cell__title{
max-width: 16vw;
}
.van-cell .van-cell__value{
margin-left: 20px;
}
.changecon-title {
  width: 100%;
  height: 44px;
  background: #fff;
  padding: 0 18px;
  font-size: 14px;
  line-height: 48px;
  font-weight: 600;
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
.content3-input {
  background: #f5f5f5;
  border: none;
  color: #333;
  font-size: 12px;
  padding: 10px;
  width: 80%;
  height: 120px;
  margin: 0 10% 12px;
}
.shows {
  width: 70%;
  height: 40vh;
  border-radius: 15px;
  .shows-title {
    text-align: center;
    color: #333;
    margin: 20px 0;
  }
}
.shows-b {
  width: 100%;
  height: 45px;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  font-size: 14px;
  line-height: 45px;
  .shows-bl {
    width: 50%;
    height: 100%;
    color: #666;
    background: #e8e8e8;
  }
  .shows-br {
    width: 50%;
    height: 100%;
    color: #fff;
    background: #0088fd;
  }
}
.changecontract-te{
    width:126px;
height:43px;
background:rgba(255,255,255,1);
box-shadow:0px 1px 8px 0px rgba(0,18,95,0.2);
border-radius:4px;
position: absolute;
right: 18px;
top: 44px;
color: #666;
  .changecontract-tep{
    width: 100%;
    height: 43px;
    line-height: 43px;
    text-align: center;

  }
  .borderbottom{
    border-bottom: 1px solid #B2B2B2;
  }
}
.contractright{
  color: #666;
}
.vant-collapse-icon{
  margin-left: 0.4rem;
}
</style>
