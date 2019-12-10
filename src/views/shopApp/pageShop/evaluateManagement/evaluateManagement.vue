<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <van-collapse :value="activeNames">
      <van-collapse-item title="评价列表" name="0" :is-link="false">
        <div slot="icon" class="vant-collapse-icon"></div>
        <div slot="value" class="evaluate-value">
          平均评分：
          <van-rate v-model="value" void-color="#C5C5C5" :allow-half="true" readonly />
          {{value}}星
        </div>
      </van-collapse-item>
    </van-collapse>
    <!--<van-cell-group>-->
    <!--<van-cell title="平均评分" class="cellclass" value-class="evaluaterate" v-if="value" >-->
    <!--<van-rate v-model="value" void-color="#C5C5C5" :allow-half="true"  readonly/>{{value}}-->
    <!--</van-cell>-->
    <!--</van-cell-group>-->
    <ul>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <li class="evaluateli" v-for="item in list" :key="item.id">
          <div class="evaluateheader">
            <p class="bluecolor" v-if="item.isHide!=0">匿名评价</p>
            <p
              class="bluecolor"
              v-else-if="item.member&&item.member.nickname"
            >{{item.member.nickname}}</p>
            <p class="bluecolor" v-else>{{item.tcMemberUsername}}</p>
            <div class="evaluateflex">
              <van-rate v-model="item.score" void-color="#C5C5C5" :size="17" readonly />
              <p style="font-weight: 700;font-size:14px;">服务：{{item.scoreService}}星</p>
              <p style="font-weight: 700;font-size:14px;">环境：{{item.scoreStore}}星</p>
            </div>
          </div>
          <div class="evaluatecontent">
            <p class="graycolor" v-if="item.evaluateRemarks">{{item.evaluateRemarks}}</p>
            <p class="graycolor" v-else>无评价</p>
          </div>
          <div class="evaluatefooter evaluateflex">
            <p class="footer-time">{{item.createTime|formNow}}</p>
            <div class="evaluateflex">
              <p class="footer-btn heibtn" v-if="item.status==2" @click="reports(item,1)">举报评价</p>
              <p class="footer-btn huibtn" v-if="item.status==3" @click="reports(item,2)">已举报</p>
              <p class="footer-btn bluecolor blueborder" @click="toorder(item.offlineOrder.id)">查看订单</p>
            </div>
          </div>
        </li>
        <div v-if="list.length===0&&!loading&&!finished" class="no-data">暂无数据</div>
      </van-list>
    </ul>
    <!--<div v-if="!list.length" class="no-data">暂无数据</div>-->
    <van-popup v-model="report.onoff" position="right" :overlay="false">
      <div class="rightmap">
        <header class="heade"></header>
        <div>
          <van-panel :title="report.title" :status="report.value">
            <van-field
              v-model="report.remarks"
              label
              type="textarea"
              class="tetitle"
              placeholder="请输入举报理由"
              autosize
              maxlength="200"
              v-if="report.reportlook"
            />
            <van-field
              v-model="report.remarks"
              label
              type="textarea"
              class="tetitle"
              placeholder="没有举报内容"
              autosize
              readonly
              maxlength="200"
              v-else
            />
            <p class="newfont">{{newfont}}/200</p>
          </van-panel>
        </div>
        <van-button size="large" @click="clickreport" v-if="report.reportlook">提交</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { formNow} from "@/utils";
export default {
  name: 'evaluateManagement',
  data () {
    return {
      formNow,
      topheader: {
        name: '评价管理',
        left: '3',
        right1: '',
        heade: 'header1'
      },
      activeNames: ['0'],
      value: 0,
      disabled: false,
      loading: false, // 分页加载
      kaiguan: true, // 避免多次请求
      finished: false, //分页结束
      count: '',
      newfont: '0', // 简介字数
      report: { //举报评价数据
        onoff: false,
        reportlook: false,  //举报还是查看，true是举报
        title: '',
        value: '',
        remarks: '',
        id: '',
        status: '',
      },
      page: {
        pageNo: 1,
        pageSize: 10,
      },
      list: [

      ]
    };
  },
  filters:{
    formNow
  },
  components: {
  },
  watch: {
    'report.remarks' () {
      if (this.report.remarks !== undefined && this.report.remarks !== null && this.report.remarks.length > 200) {
        this.report.remarks = this.report.remarks.substr(0, this.report.remarks - 1)
      } else if (this.report.remarks !== undefined && this.report.remarks !== null && this.report.remarks.length > 0) {
        this.newfont = this.report.remarks !== undefined && this.report.remarks !== null && this.report.remarks.length
      }
    }
  },
  methods: {
    goback () {
      if (this.report.onoff) {
        this.report.onoff = !this.report.onoff
        this.topheader.name = '评价管理'
      } else {
        this.$router.go(-1)
      }
    },
    evaluate () {
      if (this.kaiguan == true) {
        this.kaiguan = false
        let para = {
          store: {
            id: this.$route.query.id,
          },
          pageNo: this.page.pageNo,
          pageSize: this.page.pageSize,
        }
        this.shopApi.evaluate(para).then(res => {
          if (res.data.data.list) {
            console.log(res.data.data)

            res.data.data.list.forEach(ress => {
              ress.score = parseFloat((ress.score / 4).toFixed(1))
              ress.scoreService = parseFloat((ress.scoreService / 2).toFixed(1))
              ress.scoreStore = parseFloat((ress.scoreStore / 2).toFixed(1))
            })
            this.count = res.data.data.count


            this.list = this.list.concat(res.data.data.list)
            this.value = parseFloat((res.data.data.average / 2).toFixed(1))
          }
          this.page.pageNo++
          this.kaiguan = true
        })
      }
    },
    clickreport () {
      if (window._czc) {
               window._czc.push(['_trackEvent', '评价管理', '提交举报','' ,'' , '']);//其中灰色的为选填项
      
         }
      let para = {
        id: this.report.id,
        status: 3,
        remarks: this.report.remarks
      }
      this.$dialog.confirm({
        title: '',
        message: '确认提交举报？',
      }).then(() => {
        this.shopApi.evaluateDetail(para).then(res => {
          console.log(res)
          this.report.onoff = !this.report.onoff
          this.topheader.name = '评价管理'
          this.list = []
          this.page.pageNo = 1
          this.evaluate()
          this.$toast({
            message: '已举报',
            duration: 3000
          });
        })
      }).catch((res) => {
        console.log(res)
      })

    },
    toorder (msg) {
      if (window._czc) {
               window._czc.push(['_trackEvent', '评价管理', '查看订单','' ,'' , '']);//其中灰色的为选填项
      
         }
      // OrderDetails?orderId
      this.$router.push({ path: '/OrderDetails', query: { orderId: msg } })
      console.log('去订单详情', msg)
    },
    onLoad () {
      // 异步更新数据
      if (this.kaiguan == true) {
        this.finished = false
        setTimeout(() => {
          if (this.page.pageNo * this.page.pageSize >= (this.count + this.page.pageSize)) {
            this.finished = true
            this.loading = false
          } else {
            this.evaluate()

            // 加载状态结束
            this.loading = false
          }
        }, 500)
      } else {
        this.loading = false
      }

    },
    reports (msg, index) {
      if (window._czc) {
               window._czc.push(['_trackEvent', '评价管理', '举报','' ,'' , '']);//其中灰色的为选填项
      
         }
      console.log(msg, index)
      this.report.onoff = !this.report.onoff;
      this.report.title = msg.isHide ? '匿名用户' : (msg.member ? (msg.member.nickname ? msg.member.nickname : msg.member.phone) : '')
      this.report.value = msg.evaluateRemarks ? msg.evaluateRemarks : '无评论'
      this.report.remarks = msg.remarks ? msg.remarks : ''
      this.report.id = msg.id
      this.report.status = msg.status
      if (index == 1) {
        this.report.reportlook = true
        this.topheader.name = '举报评价'
      } else {
        this.report.reportlook = false
        this.topheader.name = '举报详情'
      }
    }

  },
  mounted () {
    this.evaluate()
  }
}
</script>

<style scoped>
.van-button--large {
  width: 339px;
  height: 44px;
  font-size: 14px;
  line-height: 44px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  margin: 15px 0 15px 18px;
  background: #0088fd;
  background: -webkit-linear-gradient(to right, #00a7fc, #0088fd);
  background: -moz-linear-gradient(to right, #00a7fc, #0088fd);
  background: linear-gradient(to right, #00a7fc, #0088fd);
  border: none;
  color: #fff;
}
.van-panel__header /deep/ .van-cell__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px !important;
  color: #353535 !important;
}
.van-panel__header /deep/ .van-cell__value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px !important;
  color: #666 !important;
}

.evaluaterate {
  margin-top: 5px;
}
.evaluateli {
  width: 100%;
  margin-top: 10px;
  background: #fff;
  padding: 0 18px;
}
.evaluateheader {
  font-size: 14px;
  font-weight: 800;
  line-height: 40px;
}
.evaluatecontent {
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 21px;
}

.footer-time {
  font-size: 12px;
  line-height: 42px;
  color: #a6a6a6;
}
.footer-btn {
  width: 60px;
  height: 20px;
  border-radius: 2px;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  margin-top: 11px;
  margin-left: 12px;
}
.heibtn {
  border: 1px solid #9a9a9a;
  color: #9a9a9a;
}
.huibtn {
  border: 1px solid #ddd;
  color: #ddd;
}
.evaluateflex {
  display: flex;
  justify-content: space-between;
}
.newfont {
  color: #c5c5c5;
  font-size: 10px;
  margin-bottom: 9px;
  text-align: right;
  margin-right: 30px;
}
.no-data {
  text-align: center;
  height: 100px;
  line-height: 100px;
}
.evaluate-value {
  display: flex;
  font-size: 14px;
  align-items: center;
}
.van-collapse-item /deep/ .van-collapse-item__wrapper {
  display: none !important;
}
</style>
