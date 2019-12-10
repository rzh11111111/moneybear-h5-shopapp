<template>
  <div class="app-init">
    <top-column :top-header="topheader" ref="topdata" @clickcallback="clicks" @search="initialize"></top-column>

    <nav class="list-top" v-if="list!=2">
      <ul class="list-ul">
        <li class="list-li" @click="value.li=!value.li" v-for="value in listli" :key="value.id">
          <template v-if="value.onoff">
            <p v-show="!value.content">{{value.name}}</p>
            <p class="bluecolor" v-show="value.content">{{value.name}}</p>
            <div>
              <img src="@assets/img/listunselected.png" v-show="!value.content" />
              <img src="@assets/img/listselected.png" v-show="value.content" />
            </div>
          </template>
        </li>
      </ul>
      <div
        class="list-te"
        :class="{bluete:!listte}"
        v-if="list==6&&!$route.query.merManager&&(type!='1'&&type!='0')"
        @click="te"
      >我推广的</div>
    </nav>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      style="min-height: 100%;"
      :success-duration="1500"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!--合作商推广员-->
        <template v-if="list==2">
          <div class="list" v-for="item in together" :key="item.accountId" @click="todetails(item)">
            <header class="listtitle">
              <div class="listtitle-text">{{item.name}}</div>
              <!--{{item.managerCooperation.name}}-->
              <span v-if="item.status==1">正常</span>
              <span v-if="item.status==2">关闭</span>
              <span v-if="item.status==3">冻结</span>
            </header>
            <ul class="listcontent">
              <li>
                <div>
                  <img src="@assets/img/detail/position2.png" />
                </div>
                <span
                  v-if="item.managerDutyAreaConfigs[0]"
                  style="overflow: hidden;text-overflow: ellipsis"
                >{{item.managerDutyAreaConfigs[0].province}}{{item.managerDutyAreaConfigs[0].city}}等</span>
                <span v-else style="overflow: hidden;text-overflow: ellipsis">空</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/people.png" />
                </div>
                <span
                  style="overflow: hidden;text-overflow: ellipsis"
                >省区总 {{item.managerCooperation&&item.managerCooperation.merManager&&item.managerCooperation.merManager.name}}</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/datachoose.png" />
                </div>
                <span>{{item.approvalTime|format}}</span>
              </li>
            </ul>
          </div>
        </template>
        <template v-if="list==3">
          <div class="list" v-for="item in together" :key="item.accountId" @click="todetails(item)">
            <header class="listtitle">
              <div class="listtitle-text">{{item.name}}</div>
              <span v-if="item.status==1">正常</span>
              <span v-if="item.status==2">关闭</span>
              <span v-if="item.status==3">冻结</span>
              <span v-if="item.managerSpread.type==1">兼职</span>
              <span v-if="item.managerSpread.type==2">专职</span>
              <!--{{item.managerCooperation.name}}-->
              <!--<span>{{item.managerCooperation.merManager.status}}</span>-->
            </header>
            <ul class="listcontent">
              <li>
                <div>
                  <img src="@assets/img/detail/position2.png" />
                </div>
                <span
                  v-if="item.managerDutyAreaConfigs[0]"
                  style="overflow: hidden;text-overflow: ellipsis"
                >{{item.managerDutyAreaConfigs[0].province}}{{item.managerDutyAreaConfigs[0].city}}等</span>
                <span v-else style="overflow: hidden;text-overflow: ellipsis">空</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/people.png" />
                </div>
                <span
                  style="overflow: hidden;text-overflow: ellipsis"
                >{{item.managerSpread&&item.managerSpread.merManager&&item.managerSpread.merManager.name}}</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/datachoose.png" />
                </div>
                <span>{{item.approvalTime|format}}</span>
              </li>
            </ul>
          </div>
        </template>
        <!--种子店特色店-->
        <template v-if="list==4||list==5">
          <div class="list" v-for="item in store" :key="item.id" @click="todetails(item)">
            <header class="listtitle">
              <div class="listtitle-text">{{item.nickName}}</div>
              <span v-if="item.platformStatus==1">正常</span>
              <span v-if="item.platformStatus==2">关闭</span>
              <span v-if="item.platformStatus==3">冻结</span>
            </header>
            <ul class="listcontent">
              <li>
                <div>
                  <img src="@assets/img/detail/position.png" />
                </div>
                <span
                  v-if="item.province"
                  style="overflow: hidden;text-overflow: ellipsis"
                >{{item.province}}{{item.city}}{{item.region}}</span>
                <span v-else style="overflow: hidden;text-overflow: ellipsis">空</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/people.png" />
                </div>
                <span style="overflow: hidden;text-overflow: ellipsis">{{item.spreadUsername}}</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/datachoose.png" />
                </div>
                <span>{{item.approvalTime | format}}</span>
              </li>
            </ul>
          </div>
        </template>
        <template v-if="list==6">
          <div class="list" v-for="item in local" :key="item.id" @click="todetails(item)">
            <header class="listtitle">
              <div class="listtitle-text">{{item.shopInfo.name}}</div>
              <span v-if="item.status==1">正常</span>
              <span v-if="item.status==2">关闭</span>
              <span v-if="item.status==3">冻结</span>
            </header>
            <ul class="listcontent">
              <li>
                <div>
                  <img src="@assets/img/detail/position.png" />
                </div>
                <span
                  v-if="item.province"
                  style="overflow: hidden;text-overflow: ellipsis"
                >{{item.province}}{{item.city}}{{item.region}}</span>
                <span v-else style="overflow: hidden;text-overflow: ellipsis">空</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/people.png" />
                </div>
                <span
                  v-if="item.spreadType==3"
                  style="overflow: hidden;text-overflow: ellipsis"
                >推广员 {{item.spreadUsername}}</span>
                <span
                  v-if="item.spreadType==2"
                  style="overflow: hidden;text-overflow: ellipsis"
                >合作商 {{item.spreadUsername}}</span>
                <span
                  v-if="item.spreadType==1"
                  style="overflow: hidden;text-overflow: ellipsis"
                >省区总 {{item.spreadUsername}}</span>
                <span
                  v-if="item.spreadType==4"
                  style="overflow: hidden;text-overflow: ellipsis"
                >商户老板 {{item.spreadUsername}}</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/datachoose.png" />
                </div>
                <span>{{item.approvalTime | format}}</span>
              </li>
            </ul>
          </div>
        </template>
        <div
          v-if="local.length===0&&together.length===0&&store.length===0&&!loading&&!finished"
          class="no-data"
        >暂无数据</div>
      </van-list>
    </van-pull-refresh>
    <div class="listadd" @click="toadd()" v-if="type==3&&(list==2||list==3||list==6)">
      <div>
        <img src="@assets/img/add.png" />
      </div>
      <p>添加</p>
    </div>
    <div class="listadd" @click="toadd()" v-if="type==2&&list==6">
      <div>
        <img src="@assets/img/add.png" />
      </div>
      <p>添加</p>
    </div>
    <div class="listadd" @click="toadd()" v-if="type==1&&(list==4||list==5||list==6)">
      <div>
        <img src="@assets/img/add.png" />
      </div>
      <p>添加</p>
    </div>
    <div class="listadd" @click="toadd()" v-if="type==0&&(list==5||list==6)">
      <div>
        <img src="@assets/img/add.png" />
      </div>
      <p>添加</p>
    </div>
    <div class="所有的弹出">
      <van-popup v-model="listli[0].li" position="bottom">
        <van-area
          :area-list="listli[0].columns"
          cancel-button-text="重置"
          @cancel="onConfirm00"
          @confirm="onConfirm0"
          title="选择"
        />
      </van-popup>
      <van-popup v-model="listli[1].li" position="bottom">
        <van-picker
          :columns="listli[1].columns"
          cancel-button-text="重置"
          @confirm="onConfirm1"
          @cancel="onConfirm11"
          show-toolbar
          title="选择"
        />
      </van-popup>

      <van-popup v-model="listli[2].li" position="bottom">
        <van-picker
          :columns="listli[2].columns"
          cancel-button-text="重置"
          @confirm="onConfirm2"
          @cancel="onConfirm22"
          show-toolbar
          title="选择"
        />
      </van-popup>
      <!-- <van-popup v-model="listli[3].li" position="bottom">
        <van-picker
          :columns="listli[3].columns"
          cancel-button-text="重置"
          @confirm="onConfirm3"
          @cancel="onConfirm33"
          show-toolbar
          title="选择"
        />
      </van-popup> -->

<van-popup v-model="listli[4].li" position="bottom">
        <van-picker
          :columns="listli[4].columns"
          cancel-button-text="重置"
          @confirm="onConfirm4"
          @cancel="onConfirm44"
          show-toolbar
          title="选择"
        />
      </van-popup>

      <!--<van-popup-->
      <!--v-model="listli[4].li"-->
      <!--position="bottom"-->
      <!--&gt;-->
      <!--<van-picker :columns="listli[4].columns" cancel-button-text="重置" @confirm="onConfirm4"-->
      <!--@cancel="onConfirm44" show-toolbar title="选择"/>-->
      <!--</van-popup>-->
      <van-dialog v-model="seed" title="提示" confirmButtonText="知道了" @confirm="addstore">
        <p
          style="margin: 10px 30px;font-size: 13px;line-height: 20px;"
        >开店前，请准备以下材料：营业执照、各类经营许可证、店老板身份证正反面照、法人身份证正反面照、店铺头像、店铺门头照、店内环境照、店内商品陈列照、合同。请上传扫描件或照片原图，要求图片清晰、完整、无遮挡、无水印、不倒置。</p>
        <p
          style="margin: 20px 10px 10px;font-size: 12px;line-height: 20px;display: flex;align-items: center;justify-content: center"
        >
          <input type="checkbox" v-model="seedkaiguan" id="seedkaiguan" />
          <label for="seedkaiguan" style="margin-left: 5px;">不再提示</label>
        </p>
      </van-dialog>
      <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
    </div>
  </div>
</template>

<script>
import startEndTime from '@/components/startEndTime/startEndTime'
import { format, setStorage, getStorage, getAllAreas } from "@/utils";
export default {

  data () {
    return {
      topheader: {
        name: '1',
        left: '2',
        right1: '',
        right2: '',
        heade: 'header1',
        key: ''
      },
      startendtime1: {
        title: '选择创建时间',
        type: 'date',
        onoff: false,
        starttime: '',
        endtime: ''
      },
      type: '', // 谁登陆的
      list: 2, // 详情页种类
      isLoading: false, //下拉刷新
      listte: false, // 我推广的
      loading: false, // 分页加载
      kaiguan: true, // 避免多次请求
      finished: false,
      page: 1,
      pageSize: 10,
      count: 0,
      together: [],
      store: [],
      areaIds: '',
      seed: false,  //seed弹窗提示
      seedkaiguan: false,
      local: [{
        id: '1',
        nickName: '',
        status: '',
        province: '',
        city: '',
        region: '',
        spreadType: '',
        createTime: ''

      }],
      listli: [{
        id: 0,
        name: '地区',
        li: false,
        onoff: true,
        columns: {
          province_list: {
            '100000': '全部'
          },
          city_list: {
            '100000': '全部'
          },
          county_list: {
            '100000': '全部'
          }
        },
        content: ''
      },
      {
        id: 1,
        name: '状态',
        li: false,
        onoff: true,
        columns: ['正常', '关闭', '冻结'],
        content: ''
      },
      {
        id: 2,
        name: '角色',
        li: false,
        onoff: false,
        columns: ['店主', '推广员'],
        content: ''
      },
      {
        id: 3,
        name: '性质',
        li: false,
        onoff: false,
        columns: ['兼职', '专职'],
        content: ''
      }
        ,
      {
        id: 4,
        name: '合同状态',
        li: false,
        onoff: false,
        columns: ['全部', '待改签(合同参数变更)', '未签(入驻后未签)', '生效中', '临期(有效期≤30天)', '过期'],
        content: ''
      }
      ],
      listlis1: {}
    }
  },
  components: {
    startEndTime
  },
  filters: {
    format
  },
  methods: {
    onRefresh () {
      setTimeout(() => {

        this.isLoading = false;
        this.initialize()
        this.$toast("刷新成功");
      }, 500);
    },
    todetails (item) {
      if (this.list == 2) {
        this.$router.push({
          path: '/PromotersListDetail',
          query: { id: item.id, type: this.type, list: this.list, fromrouter: '1' }
        })
      } else if (this.list == 3) {
        this.$router.push({
          path: '/PopularizeDetail',
          query: { id: item.id, type: this.type, list: this.list, fromrouter: '1' }
        })
      } else if (this.list == 4 || this.list == 5) {
        this.$router.push({
          path: '/StoreDetail',
          query: { id: item.id, type: this.type, list: this.list, fromrouter: '1' }
        })
      } else if (this.list == 6) {
        this.$router.push({
          path: '/LocalDetail',
          query: { id: item.id, type: this.type, list: this.list, fromrouter: '1' }
        })
      }

    },
    times (msg) { // 时间插件的事件
      if (msg.oldtime) {
        // console.loglog('确定')
        // this.startendtime1.starttime=format(new Date(msg.oldtime), 'yyyy-MM-dd hh:mm:ss')
        // this.startendtime1.endtime=format(new Date(msg.newtime), 'yyyy-MM-dd hh:mm:ss')
        this.startendtime1.starttime = format(msg.olddate, 'yyyy-MM-dd hh:mm:ss')
        this.startendtime1.endtime = format(msg.newdate, 'yyyy-MM-dd hh:mm:ss')
        this.initialize()
      } else {
        // console.loglog('取消')
        this.startendtime1.starttime = ''
        this.startendtime1.endtime = ''
        this.initialize()
      }
      // this.newdata.store.startTime=msg.oldtime
      // this.newdata.store.endTime=msg.newtime
      this.startendtime1.onoff = msg.onoff
      // console.log('msg.oldtime',msg.oldtime);
      // this.startendtime1.starttime=format(new Date(msg.oldtime), 'yyyy-MM-dd hh:mm:ss')
      // this.startendtime1.endtime=format(new Date(msg.newtime), 'yyyy-MM-dd hh:mm:ss')

      // this.shop.managerCooperation.invalidTime=format(value, 'yyyy-MM-dd hh:mm:ss')
    },
    onLoad () {
      if (this.kaiguan) {
        this.finished = false
        setTimeout(() => {
          if (this.count <= this.pageSize) {
            this.finished = true
            this.loading = false
            console.log('diyi')
          } else if (this.page * this.pageSize >= (this.count + this.pageSize)) {
            this.finished = true
            this.loading = false
            console.log('di3')
          } else {
            this.getList()

            // 加载状态结束
            this.loading = false
            console.log('di4')
          }
        }, 100)
      } else {
        this.loading = false
      }
      /*if (this.kaiguan) {
          // 异步更新数据


          setTimeout(() => {
              this.loading = false;
              this.getList()
              if(this.list===4||this.list===5) {
                  // 数据全部加载完成
                  if (this.store.length >= this.count) {
                      this.finished = true;
                      this.loading = false
                  }
              }else if(this.list===6){
                  // 数据全部加载完成
                  if (this.local.length >= this.count) {
                      this.finished = true;
                      this.loading = false
                  }
              }else {
                  if (this.together.length >= this.count) {
                      this.finished = true;
                      this.loading = false
                  }
              }
          }, 500);
      } else {
          this.loading = false
      }*/

    },
    clicks () {
      this.startendtime1.onoff = !this.startendtime1.onoff
    },
    onConfirm0 (picker) {
      this.listli[0].content = picker
      this.listli[0].li = !this.listli[0].li
      this.initialize()
    },
    onConfirm00 () {
      this.listli[0].content = ''
      this.listli[0].li = !this.listli[0].li
      this.initialize()
    },
    onConfirm1 (picker) {
      this.listli[1].content = picker
      this.listli[1].li = !this.listli[1].li
      this.initialize()
    },
    onConfirm11 () {
      this.listli[1].content = ''
      this.listli[1].li = !this.listli[1].li
      // console.loglog(picker, values)
      this.initialize()
    },
    onConfirm2 (picker, ) {
      this.listli[2].content = picker
      this.listli[2].li = !this.listli[2].li
      this.initialize()
    },
    onConfirm22 () {
      this.listli[2].content = ''
      this.listli[2].li = !this.listli[2].li
      this.initialize()
    },
    onConfirm4 (picker, ) {
      this.listli[4].content = picker
      this.listli[4].li = !this.listli[4].li
      this.initialize()
    },
    onConfirm44 () {
      this.listli[4].content = ''
      this.listli[4].li = !this.listli[4].li
      this.initialize()
    },
    
    initialize (msg) {  //初始化
      this.page = 1
      this.store = []
      this.together = []
      this.local = []
      this.loading = false
      this.kaiguan = true
      this.finished = false
      this.getList(msg)
    },
    country (msg) {  //添加省市区
      msg.province = this.listli[0].content == '' || this.listli[0].content[0].name == '全部' ? '' : this.listli[0].content[0].name
      msg.city = this.listli[0].content == '' || this.listli[0].content[1].name == '全部' ? '' : (this.listli[0].content[1].name == '省直辖县' ? this.listli[0].content[2].name : this.listli[0].content[1].name)
      msg.region = this.listli[0].content == '' || this.listli[0].content[2].name == '全部' ? '' : this.listli[0].content[2].name
    },
    toseed () {
      this.$router.push({ path: '/AddSeed', query: { list: this.list } })
    },
    toadd () {
     
      let push = {
        '2': '/AddTogether',
        '3': '/AddPopularize',
        '4': '/AddSeed',
        '5': '/AddSeed',
      }
      if (this.list === 2 || this.list === 3) {
        this.$router.push({ path: push[this.list], query: { list: this.list } })
      } else if (this.list === 5 || this.list === 4) {
        // this.seed=true
        let addstore = getStorage('addstore', 10000);
        console.log(addstore)
        if (addstore) {
          let index = addstore.findIndex(item => item.id === sessionStorage.getItem('id'));
          if (index < 0) {
            this.seed = true
          } else {
            addstore[index].onoff ? this.$router.push({ path: push[this.list], query: { list: this.list } }) : this.seed = true
          }
        } else {
          this.seed = true
          this.seedkaiguan = false

        }
        // this.$router.push({path:push[this.list], query: {list: this.list}})
      } else {
        // console.log(this.type,typeof this.type)
        (this.type === 3 || this.type === '3') ? this.$router.push({ path: '/AddLocal', query: { list: this.list } }) : this.$router.push('/AddLocalFirst')
      }


      /* switch (this.list) {
           case 2:
               this.$router.push({path: '/AddTogether', query: {list: this.list}})
               break
           case 3:
               this.$router.push({path: '/AddPopularize', query: {list: this.list}})
               break
           case 4:
               this.$router.push({path: '/AddSeed', query: {list: this.list}})
               break
           case 5:
               this.$router.push({path: '/AddSeed', query: {list: this.list}})
               break
           case 6:
               if (this.type == 3) {
                   this.$router.push({path: '/AddLocal', query: {list: this.list}})
               } else {
                   this.$router.push('/AddLocalFirst')
               }

               break
           default:
               break
       }*/
    },
    addstore () {
      let addstore = getStorage('addstore', 10000);
      if (addstore) {
        let index = addstore.findIndex(item => item.id === sessionStorage.getItem('id'));
        if (index < 0) {
          addstore.push({
            id: sessionStorage.getItem('id'),
            onoff: this.seedkaiguan
          })
        } else {
          addstore[index].onoff = this.seedkaiguan
        }
      } else {
        addstore = [{
          id: sessionStorage.getItem('id'),
          onoff: this.seedkaiguan
        }]
      }




      // this.tovoice(storeid)
      setStorage('addstore', addstore)
      this.$router.push({ path: '/AddSeed', query: { list: this.list } })
    },
    te () {
      // console.log('111')
      this.listte = !this.listte
      this.initialize()
    },
    getList () { // 所有列表
      console.log('aa', this.list)
      if (this.kaiguan == true) {
        this.kaiguan = false
        switch (this.list) { // 进入的是哪个列表
          case 2: {
            let datejson2 = {
              managerCooperation: {
                merManager: {
                  id: sessionStorage.getItem('id')
                },
              },
              page: {
                pageNo: this.page,
                pageSize: this.pageSize,
              },


            }
            this.Api.togetherList(datejson2).then(res => {
              if (res.data.status === 1) {
                if (this.together.length >= res.data.data.count) {
                  this.kaiguan = true
                  return
                }
                res.data.data.list.map(value => {
                  // // console.loglog(this.store, this.store.length, value)
                  this.$set(this.together, this.together.length, value)
                })
                this.count = res.data.data.count
                this.page++
                this.kaiguan = true
              }
            }).catch(() => {
              this.kaiguan = true
            })
            break          }
          case 3: {
            
          
            let datejson3 = {
              managerSpread: {
                merManager: {
                }
              },
              status: this.listli[1].content == '正常' ? 1 : this.listli[1].content == '关闭' ? 2 : this.listli[1].content == '冻结' ? 3 : '',
              page: {
                pageNo: this.page,
                pageSize: this.pageSize
              },
              merManagerKeyWordSelect: {
                province: this.listli[0].content == '' || this.listli[0].content[0].name == '全部' ? '' : this.listli[0].content[0].name,
                city: this.listli[0].content == '' || this.listli[0].content[1].name == '全部' ? '' : (this.listli[0].content[1].name == '省直辖县' ? this.listli[0].content[2].name : this.listli[0].content[1].name),
                region: this.listli[0].content == '' || this.listli[0].content[2].name == '全部' ? '' : this.listli[0].content[2].name,
              },
              searchParameter: {
                starTime: this.startendtime1.starttime,
                endTime: this.startendtime1.endtime,
                keyWord: this.$refs.topdata.key
              },
              platformStatus: this.listli[1].content,
           }
            if (this.$route.query.merManager) {  //如果是从详情过来
              datejson3.managerSpread.merManager.id = this.$route.query.merManager
            } else {  //从首页过来没有merManager
              (this.type === 3 || this.type === '3') ? datejson3.managerSpread.parentId = sessionStorage.getItem('id') : datejson3.managerSpread.merManager.id = sessionStorage.getItem('id')
              //如果登录人是省区总 不然
            }
            if (this.type == 3) {
              // datejson3.managerSpread.type = this.listli[3].content == '' ? '' : this.listli[3].content == '兼职' ? 1 : 2
            } else {
              datejson3.managerSpread.type = 2
            }
            this.Api.popularizeList(datejson3).then(res => {
              if (res.data.status === 1) {
                if (this.together.length >= res.data.data.count) {
                  this.kaiguan = true
                  return
                }
                res.data.data.list.map(value => {
                  // // console.loglog(this.store, this.store.length, value)
                  this.$set(this.together, this.together.length, value)
                })
                this.count = res.data.data.count
                this.page++
                this.kaiguan = true
              }
              // console.loglog(res.data.data)
            }).catch(() => {
              this.kaiguan = true
              // console.loglog(error)
            })
            break          }
          case 4: {
            let datejson4 = {
              pageNo: this.page,
              pageSize: this.pageSize,
              type: '1',
              platformStatus: this.listli[1].content == '正常' ? 1 : this.listli[1].content == '关闭' ? 2 : this.listli[1].content == '冻结' ? 3 : '',
              createStartTime: this.startendtime1.starttime,
              createEndTime: this.startendtime1.endtime,
              searchParameter: {
                starTime: this.startendtime1.starttime,
                endTime: this.startendtime1.endtime,
                keyWord: this.$refs.topdata.key
              },
                 contractStatus:this.listli[4].content==='全部'?'':this.listli[4].content==='待改签(合同参数变更)'?2:this.listli[4].content==='未签(入驻后未签)'?1:this.listli[4].content==='生效中'?0:this.listli[4].content==='临期(有效期≤30天)'?4:this.listli[4].content==='过期'?5:''
            
            }
            if (sessionStorage.getItem('accountType') == 1 || sessionStorage.getItem('accountType') == 0) {
              datejson4.spreadId = sessionStorage.getItem('id')
              this.country(datejson4)

            } else if (!this.$route.query.merManager) { //如果是从首页过来没有merManager
              if (this.listli[0].content == '') {  //没选择区域就传人的区域
                datejson4.areaIds = this.areaIds
              } else {
                datejson4.areaIds = this.areaIds
                this.country(datejson4)

              }
            } else if (this.$route.query.mine) {
              datejson4.spreadId = this.$route.query.merManager
              this.country(datejson4)
            } else {
              if (this.listli[0].content == '') {  //没选择区域就传详情过来的人的区域
                datejson4.areaIds = this.areaIds
              } else {
                this.country(datejson4)
              }
            }
            if (datejson4.areaIds === "") {
              return
            }
            this.Api.storeList(datejson4).then(res => {
              // if (!res.data.data.list) {
              //
              // } else {
              //     res.data.data.list.map(value => {
              //         // // console.loglog(this.store, this.store.length, value)
              //         this.$set(this.store, this.store.length, value)
              //     })
              //     this.count=res.data.data.count
              // }
              if (res.data.status === 1) {
                if (this.store.length >= res.data.data.count) {
                  this.kaiguan = true
                  return
                }
                res.data.data.list.map(value => {
                  // // console.loglog(this.store, this.store.length, value)
                  this.$set(this.store, this.store.length, value)
                })
                this.count = res.data.data.count
                this.page++
                this.kaiguan = true
              }
            }).catch(() => {
              this.kaiguan = true
            })
            break          }
          case 5: {
            let datejson5 = {
              pageNo: this.page,
              pageSize: this.pageSize,
              type: '2',
              platformStatus: this.listli[1].content == '正常' ? 1 : this.listli[1].content == '关闭' ? 2 : this.listli[1].content == '冻结' ? 3 : '',
              createStartTime: this.startendtime1.starttime,
              createEndTime: this.startendtime1.endtime,
              searchParameter: {
                starTime: this.startendtime1.starttime,
                endTime: this.startendtime1.endtime,
                keyWord: this.$refs.topdata.key
              },
                 contractStatus:this.listli[4].content==='全部'?'':this.listli[4].content==='待改签(合同参数变更)'?2:this.listli[4].content==='未签(入驻后未签)'?1:this.listli[4].content==='生效中'?0:this.listli[4].content==='临期(有效期≤30天)'?4:this.listli[4].content==='过期'?5:''
            
            }
            if (sessionStorage.getItem('accountType') == 1 || sessionStorage.getItem('accountType') == 0) {
              datejson5.spreadId = sessionStorage.getItem('id')
              this.country(datejson5)

            } else if (!this.$route.query.merManager) { //如果是从首页过来没有merManager
              if (this.listli[0].content == '') {  //没选择区域就传人的区域
                datejson5.areaIds = this.areaIds
              } else {
                datejson5.areaIds = this.areaIds
                this.country(datejson5)

              }
            } else if (this.$route.query.mine) {
              datejson5.spreadId = this.$route.query.merManager
              this.country(datejson5)
            } else {
              if (this.listli[0].content == '') {  //没选择区域就传详情过来的人的区域
                datejson5.areaIds = this.areaIds
              } else {
                this.country(datejson5)
              }
            }
            if (datejson5.areaIds === "") {
              return
            }
            this.Api.storeList(datejson5).then(res => {
              if (res.data.status === 1) {
                if (this.store.length >= res.data.data.count) {
                  this.kaiguan = true
                  return
                }
                res.data.data.list.map(value => {
                  // // console.loglog(this.store, this.store.length, value)
                  this.$set(this.store, this.store.length, value)
                })
                this.count = res.data.data.count
                this.page++
                this.kaiguan = true
              }
            }).catch(() => {
              this.kaiguan = true
            });
            break;          }
          case 6: {
            let datejson6 = {
              pageNo: this.page,
              pageSize: this.pageSize,
              status: this.listli[1].content == '正常' ? 1 : this.listli[1].content == '关闭' ? 2 : this.listli[1].content == '冻结' ? 3 : '',
              searchParameter: {
                starTime: this.startendtime1.starttime,
                endTime: this.startendtime1.endtime,
                keyWord: this.$refs.topdata.key
              },
            }
            if (sessionStorage.getItem('accountType') == 1 || sessionStorage.getItem('accountType') == 0) {  //如果登录人是推广员或者店主
              datejson6.spreadId = sessionStorage.getItem('id')
              this.country(datejson6)
            } else {
              if (this.$route.query.merManager && this.$route.query.mine) { // 从详情页进入(自己推广的列表)
                datejson6.spreadId = this.$route.query.merManager
                this.country(datejson6)
              } else {  // 从详情页进入(不是自己推广的列表)和 非推广员店主从首页进入 2合1
                if (this.listli[0].content == '' && datejson6.searchParameter.keyWord) {
                  console.log('111')
                } else if (this.listli[0].content == '' && !datejson6.searchParameter.keyWord) {
                  datejson6.areaIds = this.areaIds
                } else {
                  this.country(datejson6)
                }
              }
              if (this.listte) {
                datejson6.spreadId = sessionStorage.getItem('id')
                // datejson6.areaIds=''
                delete datejson6.areaIds
              }
            }
            if (datejson6.areaIds === "") {
              return
            }
            this.Api.localList(datejson6).then(res => {
              if (res.data.status === 1) {
                if (this.local.length >= res.data.data.count) {
                  this.kaiguan = true
                  return
                }
                res.data.data.list.map(value => {
                  // // console.loglog(this.store, this.store.length, value)
                  this.$set(this.local, this.local.length, value)
                })
                this.count = res.data.data.count
                this.page++
                this.kaiguan = true
              }
            }).catch(() => {
              this.kaiguan = true
            })
            break          }
        }
      }
    },
    getdutyArea () { // 辖区列表
      let para = {
        merManagerId: this.$route.query.merManager ? this.$route.query.merManager : sessionStorage.getItem('id') //如果从详情进入辖区就用传过来的id
      }
      this.Api.dutyArea(para).then(res => {
        console.log(res)
        if (res.data.data.length) {
          res.data.data.map(value => {


            if (this.areaIds == '') {  // 仓超要的格式
              this.areaIds = value.areaConfig.id
            } else {
              this.areaIds += ',' + value.areaConfig.id
            }
            let province = value.sysAreaConfigCode.substring(0, 2).concat('0000')
            let city = value.sysAreaConfigCode.substring(0, 4).concat('00')

            this.$set(this.listli[0].columns.province_list, province, value.province) // 地区插件用的格式
            this.$set(this.listli[0].columns.city_list, city, value.city)
            this.$set(this.listli[0].columns.city_list, province, '全部')
            this.$set(this.listli[0].columns.county_list, province, '全部')
            this.$set(this.listli[0].columns.county_list, value.sysAreaConfigCode, value.region)
            this.$set(this.listli[0].columns.county_list, city, '全部')
          })
        } else {
          return false
        }


      }).then(() => {
        this.initialize()
      })
    },
    getAllArea () {
      this.Api.allArea({}).then(res => {
        if (res.data.data) {
          this.listli[0].columns = getAllAreas(res.data.data)
        } else {
          return false
        }
      })


    },

  },
  // beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    // if(to.path=='/AddSeed'){
    //     to.meta.keepAlive = true;
    // }
    // to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新
  //   next();
  // },
  created () {
    this.local = []

    this.type = sessionStorage.getItem('accountType')
    // let push=[
    //
    // ]
    switch (Number(this.$route.query.id)) { // 进入的是哪个列表
      case 2:
        // console.loglog('222')
        this.list = 2
        this.topheader.name = '合作商列表'
        this.getdutyArea()
 if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '合作商列表','' ,'' , '']);//其中灰色的为选填项
      
         }
        break
      case 3:
        this.list = 3
        this.topheader.name = '推广员列表'
        this.topheader.right1 = '1'
        this.topheader.right2 = '2'
if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '推广员列表','' ,'' , '']);//其中灰色的为选填项
      
         }
        this.getdutyArea()
        
        // if (this.type == '3') {
        //   this.listli[3].onoff = true
        // }


        break
      case 4:
        this.list = 4
        if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '种子商户列表','' ,'' , '']);//其中灰色的为选填项
      
         }
        this.topheader.name = '种子商户列表'
        this.topheader.right1 = '1'
        this.topheader.right2 = '2'
        this.getdutyArea()
        this.getAllArea()
        // this.listli[4].onoff = true

        // console.loglog(this.store)
        break
      case 5:
         if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '特色商户列表','' ,'' , '']);//其中灰色的为选填项
      
         }
        this.list = 5
        this.topheader.name = '特色商户列表'
        this.topheader.right1 = '1'
        this.topheader.right2 = '2'

        this.getdutyArea()
        this.getAllArea()
        this.listli[4].onoff = true
        break
      case 6:
        // console.loglog('6')
         if (window._czc) {
               window._czc.push(['_trackEvent', '邀店', '同城企业列表','' ,'' , '']);//其中灰色的为选填项
      
         }
        this.list = 6
        this.topheader.name = '同城企业列表'
        this.topheader.right1 = '1'
        this.topheader.right2 = '2'
        this.getdutyArea()
        this.getAllArea()
        break
      default:

        break
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.list-top {
  background: #fff;
  height: 30px;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.09);
  position: relative;
  margin-bottom: 10px;
}

.list-top /deep/ .list-ul {
  display: flex;
}

.list-li {
  width: 25%;
  display: flex;
  color: #666;
  justify-content: center;
  font-size: 12px;
  line-height: 30px;
}

.list-li /deep/ div {
  width: 8px;
  height: 4px;
  margin-top: 13px;
  margin-left: 5px;
  img {
    width: 100%;
    height: 100%;
  }
}

.list-te {
  width: 48px;
  height: 16px;
  position: absolute;
  border-radius: 2px;
  border: 1px solid #0095fd;
  color: #0095fd;
  font-size: 10px;
  line-height: 14px;
  font-weight: 300;
  text-align: center;
  right: 18px;
  top: 7px;
  overflow: hidden;
  white-space: nowrap;
}

.bluete {
  border: 1px solid #999;
  color: #666;
}

.list {
  width: 100%;
  height: 82px;
  background: #fff;
  margin-bottom: 10px;
  border: 1px solid #fff;
  position: relative;
}

.listtitle {
  width: 90%;
  color: #333;
  font-size: 16px;
  font-weight: 800;
  position: absolute;
  left: 18px;
  top: 16px;
  display: flex;
  width: calc(100% - 9.6vw);
  align-items: center;
}

.listtitle /deep/ span {
  display: inline-block;

  height: 20px;
  font-weight: 200;
  border-radius: 2px;
  padding: 0 5px;
  border: 0.5px solid #0095fd;
  color: #0095fd;
  opacity: 0.9;
  font-size: 12px;
  line-height: 20px;
  /*字体最小12，用scale缩小*/
  transform: scale(0.8);
  text-align: center;
  margin-left: 5px;
}
.listtitle /deep/ div.listtitle-text {
  max-width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.listcontent {
  font-size: 12px;
  color: #999;
  position: absolute;
  left: 18px;
  top: 52px;
  display: flex;
}

.listcontent /deep/ li {
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 15px;
  display: flex;
  align-items: center;
  margin-left: 0;
}

/* .listcontent /deep/ div {
        width: 14px;
        height: 14px;
        transform: translate(0, +10%);
        margin-right: 2px;
        vertical-align: middle;
    }
    .listcontent /deep/ div img{
        width: 100%;
        height: 100%;

    }*/
.listcontent /deep/ span {
  width: 80%;
  vertical-align: middle;
}
.listaside {
  width: 12px;
  height: 12px;
  color: #cbcbcb;
  position: absolute;
  right: 19px;
  top: 22px;
}

.listadd {
  width: 44px;
  height: 44px;
  background: #0095fd;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  position: fixed;
  right: 20px;
  bottom: 50px;
}

.listadd /deep/ div {
  margin-top: 5px;
  width: 41%;
  /*margin: 8px 0 0 13px;*/
}
.listadd /deep/ div img {
  width: 100%;
  height: 100%;
}
.listadd /deep/ p {
  font-size: 15px;
  transform: scale(0.66);
  position: relative;
  top: -5px;
  opacity: 0.8;
}

.tomap {
  width: 98px;
  height: 34px;
  background: #0088fd;
  background: -webkit-linear-gradient(to right, #00a7fc, #0088fd);
  background: -moz-linear-gradient(to right, #00a7fc, #0088fd);
  background: linear-gradient(to right, #00a7fc, #0088fd);
  color: #fff;
  -webkit-border-radius: 5px 0 0 5px;
  -moz-border-radius: 5px 0 0 5px;
  border-radius: 5px 0 0 5px;
  border: none;
  position: fixed;
  right: 0;
  bottom: 50px;
  z-index: 1001;
}

#map {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
