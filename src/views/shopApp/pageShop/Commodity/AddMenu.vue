<template>
  <div class="app-init">
            <top-column :top-header="topheader"  ref="topdata" @search="searchCategory"></top-column>
            <van-field
                  type="text"
                  label="菜单名称"
                  v-model="name"
                  placeholder="最多x字"
                  required></van-field>
          <van-cell
            title="所属行业类目"
            placeholder="请选择所属行业类目"
            value="请选择所属行业类目"
            v-if="!shop.businessRange"
            value-class="colorC0C0C0"
            is-link
            required
            @click="handleBusinessRange"
          ></van-cell>
            <van-cell
                    title="所属行业类目"
                    placeholder="请选择所属行业类目"
                    :value="shop.businessRanges"
                    v-else
                    is-link
                    required
                    @click="handleBusinessRange"
            ></van-cell>
             <van-button type="primary" size="large" class="submitbtn"  @click="tosave">保存</van-button>
            <van-popup
      v-model="jingying.onoff"
      position="right"
      :overlay="false"
    >
      <div class="rightmap">
        <header class="heade">
        </header>

        <div>
          <choose-category ref="categoryEle" :getDataList="getStoreInsidesList" @initialize="initialize" :listConfig="insideCategory" :selected="selectedInsideCate"></choose-category>
        </div>
        <footer class="bott">

        </footer>

      </div>
    </van-popup>
  </div>
</template>

<script>
import chooseCategory from '@/components/chooseCategory'
import {num2chinese} from "@utils";

  export default {
    data () {
      return {
        topheader: {
            name: "菜单管理",
            left: "3",

            heade: "header1"
        },
        name:'',
        insideCategory: {
        level: 0
      },
       jingying: { // 经营品牌
        onoff: false,
        list:[]
      },
      shop:{
          businessRanges:''
      }
      }
    },
    components: {
        chooseCategory
    },
    watch:{
        'insideCategory.level'() {
        this.getCategoryHeader()
        }
    },
    methods: {
      goback(){
                 if (this.jingying.onoff) {
                  if (this.insideCategory.level > 0) {
                    this.insideCategory.level --
                    this.$refs.topdata.onCancel()
                    return false
                  }
                  this.jingying.onoff = !this.jingying.onoff
                  this.topheader.name = '添加菜单'
                  this.topheader.right2 = false;
                  this.$refs.topdata.onCancel()
                } else {

                     this.$router.replace('/SetMenu')
                }
      },
        searchCategory(keyword) {
      console.log(keyword)
      if (!keyword) {

        console.log(!keyword)
        this.getCategoryHeader()
        this.$refs.categoryEle.cancelFilter()
        if(!this.jingying.onoff){
          this.topheader =  {
            name: '填写资料',
            left: '3',
            heade: 'header1',
            right11:true
          }
        }
      }else{
        this.$refs.categoryEle.filterList(keyword);
      }

    },
    initialize(){  //初始化
      this.$refs.topdata.onCancel()

      },
    handleBusinessRange() {
      this.jingying.onoff=!this.jingying.onoff
      if (this.jingying.onoff) {
        // this.topheader.right2 = true;
        this.insideCategory.level = 0
        this.getCategoryHeader()
      }
    },
    getCategoryHeader() {
      this.topheader.right2 = true;
      this.topheader.right11=false
      let level = this.insideCategory.level
      if (level * 1 === 0) {
        this.topheader.name = '选择店铺分类'
      } else {
        this.topheader.name = `选择${num2chinese(level + 1)}级分类`
      }
    },
    selectedInsideCate(item,item2) {
      console.log(item,item2)
      this.shop.storeCategoryInsideId = item.id;
      let businessRange=''
      for(let i=0;i<item2.length;i++){
        businessRange=businessRange+'-'+item2[i]
      }
      businessRange = businessRange.substr(1)
      this.shop.businessRanges = businessRange
      this.shop.businessRange = item.name
      this.jingying.onoff=false
      this.$refs.topdata.onCancel();
    },
    async getStoreInsidesList(item) {
      let params = {};
      if (item && item.id) {
        params.parentId = item.id;
      }
      let res = await this.Api.storeInsideParent(params)
      return res.data.data
    },
    getList(){ //所属行业类目
        this.shopApi.menuCategory({}).then(res => {
                if(res.data.status==1){
                    console.log(res)
                }
            })
    },
    tosave(){  //保存
    let para={
        code:'31232132131321',
        name:this.name,
        cloudCategory:'21365ce7041d47d7a050221b5521cb41',
        // sortNo:10,
        store:sessionStorage.getItem('storeId')

    }
        this.shopApi.addMenu(para).then(res => {
                if(res.data.status==1){
                  console.log('chengg')
                  this.$router.replace({path:'/SetMenu', query: {result:true}})
                }else{
                  this.$toast('添加菜单失败')
                }
            })
    }
    },
    computed: {

    },
    mounted(){
        this.getList()
    },
  }
</script>

<style scoped lang="scss" type="text/scss">


</style>
