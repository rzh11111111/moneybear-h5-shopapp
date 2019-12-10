<template>
  <div>
      <van-pull-refresh
      v-show="value.length"
      v-model="isLoading"
      @refresh="onRefresh"
      style="min-height: 100%;"
      :success-duration="1500"
    >
      <van-list 
        v-model="loading" 
        :finished="finished" 
        finished-text="没有更多了" 
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        
            <slot name="detailList">

            </slot>
      </van-list>
    </van-pull-refresh>
    <div v-if="!value.length&&!loading&&!finished" class="no-data">暂无数据</div>
  </div>
</template>

<script>
  export default {
      props: {
            value: {
                type: Array
            },
            allowHalf: {
                type: Boolean,
                default() {
                    return false;
                }
            },
          
        },
    data () {
      return {
          loading: false, // 分页加载
            kaiguan: true, // 避免多次请求
            finished: false,
            isLoading: false, //下拉刷新
            error: false,
            page: 1,
            pageSize: 10,
            count: '',   //总共数据
            
      }
    },
    components: {

    },
    methods: {
        async onLoad () {
      console.log(this.page)
      // 异步更新数据
      // if (this.kaiguan == true) {
        console.log('kaiguan-true',this.page)
        this.finished = false
       
          if (this.page * this.pageSize >= (this.count + this.pageSize)) {
            this.finished = true
            // this.loading = false
          } else {
            // this.getList()
            // this.loading = false
            this.$emit('getlist',true) //加载list
            
            // 加载状态结束
            
          }
        
        console.log('123')
      // } else {
      //   console.log('kaiguan-false',this.page)
      //   // this.loading = false
      // }
    },
        onRefresh () { //上啦刷新
      setTimeout(() => {

        this.isLoading = false;
        this.initialize()
        this.$toast("刷新成功");
      }, 1500);

    },
        initialize () {  //初始化
      this.page = 1
      
      this.loading = false
      // this.kaiguan = true
      this.finished = false
    //   this.getList()
      this.$emit('getlist',false) //清空list重新加载list
    //   this.store = []
    },
    getlistlast(count,value){
        if(value===1){
            this.count = count
          this.page++
          // this.kaiguan = true
          this.error = false
        }else{
            this.error = true
        }
        this.loading=false

    }

    },
    computed: {

    },
    mounted(){

    },
  }
</script>

<style scoped lang="scss" type="text/scss">

 
</style>
