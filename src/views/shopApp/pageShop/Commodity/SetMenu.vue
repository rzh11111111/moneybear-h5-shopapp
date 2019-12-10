<template>
  <div style="background:#f5f5f9">
    <top-column :top-header="topheader" @tosort='tosort'></top-column>
    <template  v-if="topheader.right13=='1'">
<div v-for="(item,index) in list" :key="index">
        <van-cell :title="item.name">
           <div  class="item-more" @click.stop="compile(index)">
                <p  class="item-moreclick">···</p>
                
              </div>
    </van-cell>
   
      </div>
</template>
<template v-else>
    <vuedraggable class="wrapper" v-model="list">
    <transition-group>
      <div v-for="item in list" :key="item.id">
        <van-cell :title="item.name">
          <div style="display:flex;justify-content: flex-end;">
          
            <div class="rightmenu" style="width:30px;" >
              <svg-icon icon-class="sort" />
              
            </div>
          
          </div>
    </van-cell>
      </div>
    </transition-group>
  </vuedraggable>
  </template>
  <div class="add" @click="toaddMenu">
        <p  class="addadd">+</p>
        <p   class="addp">添加</p>
    </div>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable';
  export default {
    data () {
      return {
        topheader: {
            name: "菜单管理",
            left: "2",
            right13:'1',
            heade: "header1"
        },
        list: [],
      }
    },
    components: {
        vuedraggable
    },
    methods: {
      // goback(){
      //           if (this.topheader.right13=='2') {
      //               this.area.onoff = !this.area.onoff
      //               this.topheader.name = '资料信息'
      //               this.right9 = true
              
      //           } else {
                  
      //                this.$router.go(-1)
      //           }
      // },
      toaddMenu(){
        this.$router.replace({path:'/SetMenu/AddMenu',query:{id:111}})
      },
       compile(index){
         console.log(index)
        // this.$emit('compile',index,indexs)
      },
      tosort(value){
        console.log(value)
        if(value){ //点排序
          this.topheader.right13='2'
        }else{  //点完成
         let para=this.list.map(value=>value.id)
console.log(para)
        this.shopApi.changeMenu(para).then(res => {
                if(res.data.status==1){
                    console.log(res)
                    // this.getList()
                }
            })
          this.topheader.right13='1'
        }
      },
      todelete(name,id){
        this.$dialog.confirm({
         
          message: '是否删除'+name
        }).then(() => {
          let para={
          id:id
        }
        this.shopApi.deleteMenu(para).then(res => {
                if(res.data.status==1){
                    console.log(res)
                    this.getList()
                }
            })
        })

        
      },
      tochange(name,id,cloudCategory){
  this.$router.replace({path:'/SetMenu/AddMenu',query:{name:name,id:id,cloudCategory:cloudCategory}})
      },
      getList(){
        let para={
          id:sessionStorage.getItem('storeId')
        }
        this.shopApi.menuList(para).then(res => {
                if(res.data.status==1){
                    console.log(res)
                    this.list=JSON.parse(JSON.stringify(res.data.data))
                }
            })
      }
    },
    updated() {
    console.log(this.list)
    },
    computed: {

    },
    mounted(){
      
      this.getList()
      
    },
  }
</script>

<style scoped lang="scss" type="text/scss">

.van-cell .van-cell__value{
    justify-content:flex-end;
}
 .wrapper {
  display: flex;
  justify-content: center;
  width: 100vw;
  >span{
    width: 100%;
    
  }
  div{
    overflow-x:hidden;
  }
}
.item{
  width: 100%;
  height: 50px;
  // background-color: #42b983;
  color: #ffffff;
}
.add{
    width:44px;
height:44px;
position: absolute;
right: 18px;
bottom: 9px;
border-radius: 50%;
text-align: center;
background:rgba(0,149,253,1);
overflow: hidden;
color: #fff;
    .addadd{
        font-size: 25px;
        line-height: 25px;
        margin:0px 10px 0px;
    }
    .addp{
        font-size: 12px;
        line-height: 12px;
        transform:scale(0.8);
    }
}
  .item-more {
      width: 60px;
      height: 100%;
      
      font-size: 16px;
      .item-moreclick {
       text-align: right;
       margin-right: 5px;
      }
    }
.rightmenu{
  width: 60px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  img{
width: 33%;
  height: 100%;
  }
  svg{
    width: 20px;
    height: 20px;
  }
}
</style>
