<template>
  <div class="app-init">
    <top-column :top-header="topheader"></top-column>
    <div v-show="steps==1"  class="anzhuotop">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="状态信息" name="0" value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value"><van-icon name="info-o" v-show="activewarn.onoff0"/></div>
          <van-cell title="账号启用" required>
            <template slot="title">
              <span class="custom-text">账号启用</span>
              <van-icon name="question-o" class="righticon" @click="question(1)"/>
            </template>
            <van-radio-group value="1" disabled style="display: flex;" >
              <van-radio name='1' style="margin-right: 20px;" >启用</van-radio>
              <van-radio name='2' >停用</van-radio>
            </van-radio-group>
          </van-cell>
          <van-cell title="账号状态" required disabled>
            <template slot="title">
              <span class="custom-text">账号状态</span>
              <van-icon name="question-o" class="righticon" @click="question(2)"/>
            </template>
            <van-radio-group value="1" disabled style="display: flex;">
              <van-radio name="1" style="margin-right: 20px;">正常</van-radio>
              <van-radio name="2" style="margin-right: 20px;">关闭</van-radio>
              <van-radio name="3" >冻结</van-radio>
            </van-radio-group>
          </van-cell>

          <van-field
            type="text"
            label="上级省区总"
            :value="'省区总  '+shop.managerSpread.spreadName"
            required
            disabled></van-field>
          <van-cell
            title="所属合作商"
            placeholder="请选择所属合作商"
            :value="'合作商  '+shop.managerSpread.merManager.name"
            v-if="shop.managerSpread.merManager.name"
            is-link
            required
            @click="area.onoff=!area.onoff;topheader.name='选择所属合作商';topheader.right11=false"
          ></van-cell>
          <van-cell
                  title="所属合作商"
                  placeholder="请选择所属合作商"
                  value="请选择合作商"
                  value-class="colorC0C0C0"
                  v-else
                  is-link
                  required
                  @click="area.onoff=!area.onoff;topheader.name='选择所属合作商';topheader.right11=false"
          ></van-cell>
          <van-cell
            title="可推广区域"
            placeholder="请选择管辖区域"
            value="所属合作商的管辖区域内均可推广"
            required
            value-class="colorC0C0C0"
          ></van-cell>
          <van-cell title="性质" required>
            <van-radio-group v-model="shop.managerSpread.type" style="display: flex;" >
              <van-radio name='2' style="margin-right: 20px;">专职</van-radio>
              <van-radio name='1'  >兼职</van-radio>

            </van-radio-group>
          </van-cell>
        </van-collapse-item>
        <van-collapse-item title="基本信息" name="1"  value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value"><van-icon name="info-o" v-show="activewarn.onoff1"/></div>
          <van-cell
                  title="现居住地"
                  value="请选择省市区"
                  v-if="!shop.managerSpread.homeName"
                  value-class="colorC0C0C0"
                  is-link
                  required
                  @click="address.onoff=!address.onoff"
          ></van-cell>
          <van-cell
            title="现居住地"
            placeholder="请选择省市区"
            :value="shop.managerSpread.homeName"
            v-else
            is-link
            required
            @click="address.onoff=!address.onoff"
          ></van-cell>
          <van-field
            label=""
            type="text"
            class="tetitle"
            placeholder="请选择详细地址，如道路.门牌号等信息"
            v-model="shop.managerSpread.address"
            name="address"

            v-validate="'required|emoji:3,50'"
            :error-message="errors.first('address')"
          ></van-field>


        </van-collapse-item>
        <van-collapse-item title="证照信息" name="2" value=" " value-class="collapsewarn">
          <div slot="icon" class="vant-collapse-icon"></div>
          <div slot="value"><van-icon name="info-o" v-show="activewarn.onoff2"/></div>
            <van-field
              type="text"
              label="姓名"
              v-model='shop.name'
              placeholder="请输入名称"
              required
              name="name"
              v-validate="'required|emoji:1,15'"
              :error-message="errors.first('name')"
            ></van-field>
            <van-field
              type="text"
              label="身份证号"
              maxlength="18"
              v-model='shop.managerSpread.idCard'
              placeholder="请输入身份证号"
              required
              name="idCard"
              v-validate="'required|idcard'"
              :error-message="errors.first('idCard')"
            ></van-field>
            <van-cell title="身份证照"  >
              <div slot="title" class="requireds">身份证照</div>
              <div slot="label" class="bluecolor" @click="$refs.example.changes(3)">查看示例</div>
              <one-not-cut @onenotcut="addidCardJustUrl" class="idjust" :one-not-cut="shop.managerSpread.idCardJustUrl"  filecode="FILE19011298615014"></one-not-cut>
              <one-not-cut @onenotcut="addidCardBackUrl" class="idback" :one-not-cut="shop.managerSpread.idCardBackUrl"  filecode="FILE19011298615014"></one-not-cut>
            </van-cell>

        </van-collapse-item>

      </van-collapse>
    </div>
    <div v-show="steps==2" class="steps2">
      <van-cell-group>
        <van-cell title="费率" >
          <div slot="icon" class="vant-collapse-icon"></div>
        </van-cell>
      <van-cell title="推广种子商户,获得种子商户平台销售额的" label="注：省区总获得推广员提成的10%"   value="0.15%" title-class="leftcolor" value-class="rightcolor" />
      <van-cell title="推广特色商户,获得特色商户平台销售额的" label="注：省区总获得推广员提成的10%"  value="0.3%" title-class="leftcolor" value-class="rightcolor" />
      <van-cell title="推广同城企业,获得同城企业平台销售额的"  value="0.3%" title-class="leftcolor" value-class="rightcolor" />
      </van-cell-group>
    </div>
    <div v-show="steps==3">
      <create-first :create-first="shop" ref="createf"></create-first>
    </div>
    <van-popup
      v-model="address.onoff"
      position="bottom"
    >

      <van-area :area-list="address.areaList" @confirm="chooseaddress" @cancel="address.onoff=!address.onoff" />

    </van-popup>
    <van-popup
      v-model="jingying.onoff"
      position="right"
      :overlay="false"
    >
      <div class="rightmap">
        <header class="heade">

        </header>



      </div>
    </van-popup>
    <van-popup
      v-model="area.onoff"
      position="right"
      :overlay="false"
    >
      <!--直接拿来当所属合作商列表-->
      <div class="rightmap">
        <header class="heade">
        </header>
        <div>
          <div
            class="list"
            v-for="item in together"
            :key="item.id"
            @click="choosetogether(item)"
          >
            <header class="listtitle">
              <!--{{item.accountType}}-->
              {{item.name}}
              <span v-if="item.status=='1'">正常</span>
              <span v-if="item.status=='2'">关闭</span>
              <span v-if="item.status=='3'">冻结</span>

            </header>
            <ul class="listcontent">
              <li>
                <div>
                  <img src="@assets/img/detail/position2.png" />
                </div>
                <span  style="overflow: hidden;text-overflow: ellipsis" v-if="item.managerDutyAreaConfigs.length==0">无</span>
                <span  style="overflow: hidden;text-overflow: ellipsis" v-else>{{item.managerDutyAreaConfigs[0].province}}{{item.managerDutyAreaConfigs[0].city}}等</span>

              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/people.png" />
                </div>
                <span  style="overflow: hidden;text-overflow: ellipsis">{{item.managerCooperation.merManager.name}}</span>
              </li>
              <li>
                <div>
                  <img src="@assets/img/detail/datachoose.png" />
                </div>
                <span  style="overflow: hidden;text-overflow: ellipsis">{{item.createTime}}</span>
              </li>
            </ul>

              <van-icon v-if="item.id==togetherchoose" name="passed" color="rgba(0,136,254,1)" size="40px" class="listaside"></van-icon>

          </div>
        </div>
      </div>
    </van-popup>
    <van-popup
      v-model="beendtime.onoff"
      position="bottom"
    >
      <van-datetime-picker
        type="date"
        :min-date="beendtime.minDate"
        @cancel="beendtime.onoff = false"
        @confirm="beendtimes"></van-datetime-picker>
    </van-popup>
    <goback-save  ref="gobackSave"></goback-save>
    <example  ref="example"></example>
    <van-button type="primary" size="large"  @click="inputblur"  class="submitbtn" v-if="steps==allsteps" >提交审核</van-button>
    <van-button type="primary" size="large"  @click="inputblur"  class="submitbtn" v-else>下一步({{steps}}/{{allsteps}})</van-button>

  </div>
</template>

<script>
import createFirst from '@/components/createFirst/createFirst'
import chooseArea from '@/components/chooseArea/chooseArea'
import oneCut from '@/components/addimg/oneCut'
import oneNotCut from '@/components/addimg/oneNotCut'
import someMultiple from '@/components/addimg/someMultiple'
import {format,inputup,inputup2,emojiDelete,getAllAreas} from '@/utils'
import example from '@/components/example/example'
import gobackSave from '@/components/gobackSave/gobackSave'
export default {
  data () {
    return {
      topheader: {
        name: '填写资料',
        left: '3',
        heade: 'header1',
        right11:true
      },
      createfirst: {
        name: '添加合作商',
        left: '3',
        // right1: '0',
        // right2: '0',
        right3: false,
        right3content: '',
        heade: 'header1'
      },
      draftid:'',
      activeNames: ['2', '1', '0'], // 开哪个折叠
      steps: 1, // 第几步
      allsteps: 3,
      togetherchoose:'',
        clickbtn:true,  //防暴力点击
      activewarn: { // 哪个折叠的错误
        onoff0: false,
        onoff1: false,
        onoff2: false
      },
      jingying: { // 经营品牌
        onoff: false
      },
      address: { // 选择地址
        onoff: false,
        list:{

        },
        areaList:{

        }
      },
      area: {
        onoff: false,
        arealist: []
      },
      beendtime: {
        onoff: false,
        minDate: new Date()
      },
      together: [
      ],
      kaiguan:true,
      disabled: true, // 后退能否
      shop: { // 先写的同城，数据格式不一样，直接拿来当store
        managerSpread: {
          merManager: {
            id: '', // 0,挂靠合作商id
            name: '' // 合作商名字
          },
          type1: '', // 0,上级类型
          id1: '', // 0,上级ID
          spreadName:'',
          type: '', // 0,专职兼职
          sysAreaConfigHome: '', // 1,现居住地
          homeName: '',
          address: '', // 1,办公地址
          name: '', // 2,姓名
          idCard: '', // 2,身份证
          idCardJustUrl: '', // 2,身份证正面
          idCardBackUrl: '', // 2,身份证反面
          createType:3
        },
        newfont: '0', // 简介字数
        charactar: '1',
        isEnable: '1', // 0,店铺启用不变
        status: '1', // 0,店铺状态不变
        username: '',
        name: '', // 2,推广员姓名
        phone: '',
        verifyCode: '',
        email: '',
        remarks: ''
      }
    }
  },
  components: {
    createFirst, oneCut, oneNotCut, someMultiple,  chooseArea,example,gobackSave
  },
  watch: {
    // 'shop.info' () {
    //   if (this.shop.info !== undefined && this.shop.info !== null && this.shop.info.length > 200) {
    //     this.shop.info = this.shop.info.substr(0, this.shop.info.length - 1)
    //   } else if (this.shop.info !== undefined && this.shop.info !== null && this.shop.info.length > 0) {
    //     this.shop.newfont = this.shop.info !== undefined && this.shop.info !== null && this.shop.info.length
    //   }
    // }
  },
  methods: {
    areas (msg) {
      this.shop.managerDutyAreaConfigs = msg
      this.area.onoff = false
      this.topheader.name = '填写资料'
    },
    addbcPicUrl (msg) {
      this.shop.managerSpread.bcPicUrl = msg
    },
    addidCardJustUrl (msg) {
      this.shop.managerSpread.idCardJustUrl = msg
    },
    addidCardBackUrl (msg) {
      this.shop.managerSpread.idCardBackUrl = msg
    },
    addidOthrCerUrl (msg) {
      this.shop.managerSpread.idOthrCerUrl = msg
    },
    chooseaddress(msg){
      const filtered = this.address.list.filter(element => element.code == msg[2].code);
      this.shop.managerSpread.sysAreaConfigHome=filtered[0].id
      this.shop.managerSpread.homeName=msg[0].name+msg[1].name+msg[2].name
      this.address.onoff=false
    },
    goback () {
      if (this.jingying.onoff) {
        this.jingying.onoff = !this.jingying.onoff
        this.topheader.name = '填写资料'
      } else if (this.area.onoff) {
        this.area.onoff = !this.area.onoff
        this.topheader.name = '填写资料'
        this.topheader.right11=true
      } else if (this.steps == 2) {
        this.steps = 1
        this.topheader.name = '填写资料'
      } else if (this.steps == 3) {
        this.steps = 2
        this.topheader.name = '录入费率'
      } else if (this.disabled) {
        this.$refs.gobackSave.onoff=true
        /*this.$dialog.confirm({
          title: '',
          message: '您有未提交审批的修改',
          confirmButtonText: '保存为草稿',
          cancelButtonText: '放弃修改'
        }).then(() => {
          // on confirm
          this.savedraft()
          this.$router.go(-1)
        }).catch(() => {
          this.$router.go(-1)
        })*/
      } else {
        this.$router.go(-1)
      }
    },
   /* handleScroll () { // 自动收缩插件
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // var offsetTop = document.getElementsByClassName("van-collapse-item")[1].getBoundingClientRect().top
      let offsetTop = document.getElementsByClassName('van-collapse-item')
      for (let i = 1; i < offsetTop.length; i++) {
        if (offsetTop[i].getBoundingClientRect().top < 0) {
          this.removeByValue(this.activeNames, i - 1)
        }
        // console.log(offsetTop[1].getBoundingClientRect().top)
      }
      if (scrollTop > 600) {
        console.log('11')
      }
      // console.log(offsetTop,scrollTop)
      // if (scrollTop > offsetTop) {
      //   this.searchBarFixed = true
      // } else {
      //   this.searchBarFixed = false
      // }
    },*/
    removeByValue (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (Number(arr[i]) === Number(val)) {
          arr.splice(i, 1)
          break
        }
      }
    },
    savedraft(){  //保存草稿，修改草稿
      let para
      if(this.draftid){
        para={
          id:this.draftid,
          approvalContent:emojiDelete(this.shop),
          title:emojiDelete(this.shop.name)?emojiDelete(this.shop.name):'暂无名称'
        }
        this.Api.changeDraft(para).then(res=>{
          if(res.data.status==1){
            this.$toast('已存为草稿并删除非法字符')
          }
        })
      }else{
        para={
          serviceType:3,
          approvalContent:emojiDelete(this.shop),
          title:emojiDelete(this.shop.name)?emojiDelete(this.shop.name):'暂无名称'
        }
        this.Api.addDraft(para).then(res=>{
          if(res.data.status==1){
            this.$toast('已存为草稿并删除非法字符')
            this.draftid=res.data.data.id
          }
        })
      }
    },
     inputblur () { // 点击下一步错误显示折叠上的感叹号
       this.$validator.validateAll().then(ress => {
           let items = this.$validator.errors.items



        this.activeNames = []
         const activeTwo = [this.shop.managerSpread.sysAreaConfigHome, this.shop.managerSpread.address];
         const activeThree = [this.shop.name, this.shop.managerSpread.idCard, this.shop.managerSpread.idCardJustUrl, this.shop.managerSpread.idCardBackUrl];

        if (!this.shop.managerSpread.merManager.id || !this.shop.managerSpread.type) { // 第一个折叠
          this.activewarn.onoff0 = true
        } else {
          this.activewarn.onoff0 = false
        }
         if(items.some(value=>value.field==='address')){  //第二个折叠
           this.activewarn.onoff1 = true
         }else this.activewarn.onoff1 = activeTwo.indexOf('') !== -1;

         if(items.some(value=>value.field==='idCard'||value.field==='name')){  //第三个折叠
           this.activewarn.onoff2 = true
         }else this.activewarn.onoff2 = activeThree.indexOf('') !== -1;

         return ress
       }).then(()=>{
         let items = this.$validator.errors.items
         if(items.length>0){
           return false
         }else{
           if (this.steps == 1) {
             if (! (this.activewarn.onoff0 || this.activewarn.onoff1 || this.activewarn.onoff2 || this.activewarn.onoff3)) {
               this.steps = 2
               this.topheader.name = '录入费率'
             }
           } else if (this.steps == 2) {
             this.steps = 3
             this.topheader.name = '创建账号'
           } else if (this.steps == 3) {
             if(!this.shop.username||!this.shop.phone||!this.shop.verifyCode){
               if(this.shop.phone!=this.shop.oldphone){
                 console.log('retrun')
                 return
               }
             }
             if(!this.$refs.createf.usererror&&this.kaiguan){
               let para =  JSON.parse(emojiDelete(this.shop))
               para.managerSpread.name=para.name
               // if(this.clickbtn){
               //     this.clickbtn=false
               this.kaiguan=false
               this.Api.addPopularize(para).then(res => {
                 // sessionStorage.$setSessionStorageByName('userId', res.data.userId)
                 // setToken(res.data.phone)
                 // this.shop.logo = res.data.url
                 this.kaiguan=true
                 if(res.data.status==1){
                   this.deletedraft(this.draftid)
                  //  this.$router.push({path: '/ApplyResult', query: {win:true,type:0}})
                    this.$router.push({ path: '/ApplyResult', query: { result: '入驻申请提交成功', redresult: '预计3个工作日内完成审核，审核结果以短信通知为准！' } })
                 }else{
                   this.$toast(res.data.stateMessage)
                 }
                 /*else{
                   this.$router.push({path: '/ApplyResult', query: {win:false,type:0,result:res.data.stateMessage}})
                 }*/
               }).catch(()=>{
                 this.kaiguan=true
               })
             }

           }
         }

      })

      // console.log(this.activewarn.onoff0 && this.activewarn.onoff1 && this.activewarn.onoff2 && this.activewarn.onoff3)



      // console.log(this.$validator.errors.items[0])
    },
    beendtimes (value) {
      this.shop.managerSpread.bcEndtime = format(value, 'yyyy.MM.dd')
      this.beendtime.onoff = false
      // this.shop.managerSpread.activeTime = format(value, 'yyyy.MM.dd hh:mm:ss')
      // this.shop.managerSpread.invalidTime = format(value, 'yyyy.MM.dd hh:mm:ss')
    },
    choosetogether(msg){
      this.togetherchoose=msg.id
      // managerSpread: {
      //   merManager: {
      //     id: '654ed6bdf62f436781b04945bb4058c6', // 0,挂靠合作商id
      //       name: '合作商333' // 合作商名字
      //   },
      this.shop.managerSpread.merManager.id=msg.id
      this.shop.managerSpread.merManager.name=msg.name
      this.area.onoff=false
      this.topheader.name = '填写资料'
      this.topheader.right11=true
    },
    deletedraft(para){
      let par={
        id:para
      }
      if(para){
        this.Api.deleteDraft(par).then(() => {

        })
      }

    }

  },
  beforeDestroy(){
    inputup2('.anzhuotop','.app-init')
  },
  mounted () {
    inputup('.anzhuotop','.app-init')
    this.shop.managerSpread.type1 = sessionStorage.getItem('accountType')
    this.shop.managerSpread.id1 = sessionStorage.getItem('id')
    this.shop.managerSpread.spreadName = sessionStorage.getItem('accountName')
    
    this.Api.allArea({}).then(res => {
      if (res.data.data) {
        this.address.list=res.data.data.list
        
        this.address.areaList=getAllAreas(res.data.data)
      } else {
        return false
      }
    }).then(()=>{
      if(this.$route.query.id){
        /*let formdata = new FormData();
        formdata.set("id", this.$route.query.id);*/
        let para={
          id:this.$route.query.id
        }
        this.Api.getApprovalDetail(para)
                .then(res => {
                  // this.shop = res.data.data;
                  this.approvalContent = JSON.parse(res.data.data.approvalContent);
                  // storeAccount: {
                  //   charactar:2,
                  this.approvalContent.charactar=this.shop.charactar
                  this.shop=this.approvalContent
                  this.shop.managerSpread.type1 = sessionStorage.getItem('accountType')
                  this.shop.managerSpread.id1 = sessionStorage.getItem('id')
                  this.shop.managerSpread.spreadName = sessionStorage.getItem('accountName')
                  this.shop.oldphone=this.shop.phone   //老手机号
                  this.shop.verifyCode=''
                  this.shop.managerSpread.type=this.shop.managerSpread.type.toString()
                  // this.address.list.forEach(val=>{

                  // })
                  const filtered = this.address.list.filter(element => element.id == this.shop.managerSpread.sysAreaConfigHome);
                  let province = filtered[0].code.substring(0, 2).concat('0000')
                  let city = filtered[0].code.substring(0, 4).concat('00')
                  const provinceName = this.address.areaList.province_list[province];
                  const cityName = this.address.areaList.city_list[city];
                  this.shop.managerSpread.homeName=provinceName+cityName+filtered[0].name  //审核拿到省市区

                })
      }

    })





    let datejson2 = {
      managerCooperation:{
        merManager:{
          id:sessionStorage.getItem('id')
        }
      },
      page:{
        pageNo: 1,
        pageSize: 1000
      },
    }
    this.Api.togetherList(datejson2).then(res => {
      // console.log(res.data.data)
      this.together = this.together.concat(res.data.data.list)
    })


    if(this.$route.query.draft){
      let para={
        id:this.$route.query.draft
      }
      this.Api.detailDraft(para).then(res=>{
        this.shop=JSON.parse(res.data.data.approvalContent)
        this.draftid=this.$route.query.draft
      })
    }
    // window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped lang="scss" type="text/scss">

  .heade{
    width: 375px;
    height: 44px;
    position: relative;
    background: #0088FD;
    background: -webkit-linear-gradient(to right,#00A7FC, #0088FD);
    background: -moz-linear-gradient(to right,#00A7FC, #0088FD);
    background: linear-gradient(to right,#00A7FC, #0088FD);
    color: #ffffff;
  }
  .backlcon{
    width: 20px;
    height: 20px;
    position: absolute;
    left: 18px;
    top:12px;
  }

  .headline{
    position: absolute;
    left: 50%;
    font-size: 18px;
    line-height: 44px;
    transform: translateX(-50%);
  }

  .rightmap{
    width: 100vw;
    height: 100vh;
    background: #fff;
  }
  .te::before {
    content: '*';
    position: absolute;
    left: 0.18667rem;
    font-size: 0.37333rem;
    color: #f44;
  }
  .newfont{
    color: #C5C5C5;
    font-size: 10px;
    margin-bottom: 9px;
    text-align: right;
    margin-right: 30px;
  }
  .blue{
    color:#0095FD;
  }
  .list-top{
    background: #fff;
    height:30px;
    box-shadow:0px 1px 0px 0px rgba(0,0,0,0.09);
    position: relative;
    margin-bottom: 10px;
  }
  .list-top /deep/ .list-ul{
    display: flex;
  }
  /*.list-li{*/
    /*width: 25%;*/
    /*display: flex;*/
    /*color: #666;*/
    /*justify-content: center;*/
    /*font-size: 12px;*/
    /*line-height: 30px;*/
  /*}*/
  /*.list-li /deep/ img{*/
    /*width: 8px;*/
    /*height: 4px;*/
    /*margin-top: 13px;*/
    /*margin-left: 5px;*/
  /*}*/
  .list-te{
    width: 48px;
    height: 16px;
    position: absolute;
    border-radius:2px;
    border:1px solid #0095fd;
    color: #0095fd;
    font-size: 10px;
    line-height: 14px;
    font-weight: 300;
    text-align: center;
    right: 18px;
    top: 7px;
  }
  .bluete{
    border:1px solid #999;
    color: #666;
  }
  .list{
    width: 100%;
    height: 82px;
    background: #FFF;
    margin-bottom: 10px;
    border: 1px solid #FFF;
    position: relative;
  }
  .listtitle{
    color: #333;
    font-size: 16px;
    font-weight: 800;
    position: absolute;
    left: 18px;
    top: 16px;
    display: flex;
    align-items:center

  }
  .listtitle /deep/ span{
    display: inline-block;

    height: 20px;
    font-weight: 200;
    border-radius: 2px;
    padding: 0 5px;
    border: 0.5px solid #0095fd;
    color: #0095fd;
    opacity: .9;
    font-size: 12px;
    line-height: 20px;
    /*字体最小12，用scale缩小*/
    transform:scale(0.8);
    text-align: center;
    margin-left: 5px;
  }

  .listcontent{
    font-size: 12px;
    color: #999;
    position: absolute;
    left: 18px;
    top: 52px;
    display: flex;
  }
 /* .listcontent /deep/ li{
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right:15px
  }
  .listcontent /deep/ img{
    width: 14px;
    height: 14px;
    transform: translate(0,+10%);
    margin-right: 2px;
  }*/
  .listaside{

    position: absolute;
    right: 19px;
    top: 22px;
  }
  .iconchoose{
    width:18px;
    height:18px;
  }
  .listadd{
    width: 44px;
    height: 44px;
    background: #0095FD;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    font-size: 9px;
    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.2);
    position: fixed;
    right: 20px;
    bottom: 50px;
  }
  /*.listadd /deep/ img{*/
    /*width: 18px;*/
    /*height: 18px;*/
    /*margin:8px 0 0 13px ;*/
  /*}*/
  .van-cell__title.leftcolor{
    max-width: 60% !important;
  }
  .rightcolor{
    text-align: right;
    display: block;
    span{
      display: block;

      float: right;
      /*margin-left: 30%;*/
    }
  }
</style>
