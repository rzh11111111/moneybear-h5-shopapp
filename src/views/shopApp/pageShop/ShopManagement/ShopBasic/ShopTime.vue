<template>
  <div class="page">
    <top-column :top-header="topheader"></top-column>
    <div v-for="(item,index) in shopTimeList" :key="item.id">
 <div class="inform-content">
            <!--<p class="redback read"></p>-->
            <div class="inform-left">
              <p>{{item.arrMonth}}|{{item.arrWeek}}|{{item.arrTimes}}</p>
          
            </div>
            

            <div class="inform-time">
              <!--<img src="@/assets/img/rightlcon.png"/>-->
              <div class="inform-time-left" @click="deletetime(item,index)">
                <div class="inform-time-img">
                  <img src="@/assets/img/delete.png" />
                </div>
                <p style="color: #FF3232;font-size: 10px;">删除</p>
              </div>
              <div class="inform-time-right" @click="tochange(item,index)">
                <div class="inform-time-img">
                  <img src="@/assets/img/change.png" />
                </div>
                <p style="color:#0095FD;font-size: 10px;">编辑</p>
              </div>
            </div>
          </div>
  </div>
   <van-button type="primary" size="large" @click="inputbtn" class="submitbtn">添加营业时间</van-button>
            
    </div>
   
</template>

<script>
import {changetime}  from "@utils";
  export default {
    name: 'ShopTime',
    data () {
      return {
        topheader: {
          name: '营业时间',
          left: '2',
          heade: 'header1'
        },
        shopTimeList:[

        ]
      }
    },
    components: {
    },
    methods: {
      inputbtn(){
        this.$router.push('/addTimes')
      },
      tochange(item){
        this.$store.commit('SET_TIME', item) 
          this.$router.push({ path: '/addTimes', query: { change: true } })
      },
      deletetime(item,index){
        this.$dialog.confirm({
          messageAlign:'left',
          title: '',
          
          message: `您是否要删除这个<br>(${item.arrMonth}|${item.arrWeek}|${item.arrTimes})<br>营业时间`
        }).then(() => {
          // on confirm
          let para={
            id:item.id,
            storeId:sessionStorage.getItem('storeId')
          }
          this.shopApi.shopTimeDelete(para).then(res=>{
            if(res.data.status===1){
              // console.log(res)
               this.$delete(this.shopTimeList, index)
            }
          })
        }).catch(() => {
          // on cancel
        });
      },
  //     changemonth(){        
  //         this.shopTimeList.forEach(value=>{
  //           let arr=[value.arrMonthOfYear[0]]
  //               value.arrMonthOfYear.forEach((item,index)=>{
  //             // console.log(item,index,value.arrMonthOfYear[index+1])
  //             if(value.arrMonthOfYear[index+1]-item!==1){
  //               arr.push(item)
  //               arr.push(value.arrMonthOfYear[index+1])
  //             }
              
  //         })
  //         arr.pop()
  //         let month=''
  //         arr.forEach((item,index)=>{
  //           if(index%2===0){
  //             if(item===arr[index+1]){
  //               month+=item+'月,'
  //             }else{
  //               month+=item+'~'+arr[index+1]+'月,'
  //             }
  //           }
  //         })
  //         month=month.substr(0,month.length-1);
          
  // console.log(month)
  //         if((arr.length===2&&arr[1]-arr[0]===11)){
  //           value.arrMonth='全年'
  //         }else{
  //           value.arrMonth=month
  //         }
          
  //         })
          
          
  //     },
  //     changeWeek(){
  //         this.shopTimeList.forEach(value=>{
  //           let arr=[value.arrDayOfWeek[0]]
  //               value.arrDayOfWeek.forEach((item,index)=>{
  //             // console.log(item,index,value.arrDayOfWeek[index+1])
  //             if(value.arrDayOfWeek[index+1]-item!==1){
  //               arr.push(item)
  //               arr.push(value.arrDayOfWeek[index+1])
  //             }
              
  //         })
  //         arr.pop()
  //         let month=''
  //         arr.forEach((item,index)=>{
  //           if(index%2===0){
  //             if(item===arr[index+1]){
  //               month+=',周'+item
  //             }else{
  //               month+=',周'+item+'~周'+arr[index+1]
  //             }
  //           }
  //         })
  //         month=month.substr(1,month.length);
          
  // console.log(month)
  //         if((arr.length===2&&arr[1]-arr[0]===6)){
  //           value.arrWeek='整周'
  //         }else{
  //           value.arrWeek=month
  //         }
          
  //         })
          
          
  //     },
      // changeTime(){
      //      this.shopTimeList.forEach(value=>{
      //        console.log(changetime(value))
      //       let times=''
      //           value.subList.forEach((item,index)=>{
      //             times+=','+item.startHourOfDay+':';
      //             item.startMinuteOfHour<10?times+='0'+item.startMinuteOfHour:times+=item.startMinuteOfHour;
      //             times+='~'+item.endHourOfDay+':';
      //              item.endMinuteOfHour<10?times+='0'+item.endMinuteOfHour:times+=item.endMinuteOfHour;
      //     })
          
      //       times=times.substr(1,times.length);
          
      //       value.arrTimes=times
          
          
      //     })
      // }
    },
    computed: {
      subtimes(){
        return 1
      }
    },
    mounted(){
      let para={
        storeId:sessionStorage.getItem('storeId')
      }
      this.shopApi.shopTimeList(para).then(res=>{
        console.log(res)
        if(res.data.status===1){
          this.shopTimeList=res.data.data
          // this.changemonth()
          // this.changeWeek()
          // this.changeTime()
          this.shopTimeList.forEach(value=>{
            value.arrMonth=changetime(value)[0]
            value.arrWeek=changetime(value)[1]
            value.arrTimes=changetime(value)[2]
          })
        }
      })
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
.inform-content {
  width: 100%;
  height: 73px;
  background: #ffffff;
  margin-top: 10px;
  border: 1px solid #ffffff;
  position: relative;
}
.inform-left{
  color: #333333;
  font-size: 16px;
  line-height: 20px;
  margin: 16px 0 16px 18px;
  // display: flex;
  // flex-wrap:wrap;
  width: 60%;
  height: 40px;
 
  p{
    width: 100%;
    height: 100%;
     display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
  }
}

.inform-somecontent {
  color: #666666;
  font-size: 12px;
  margin: 14px 18px 0 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.inform-time {
  color: #b0b0b0;
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0;
  width: 104px;
  height: 73px;
  display: flex;
  .inform-time-left {
    width: 44px;
    height: 100%;
    border-top: 1px solid #ffffff;
    text-align: center;
    .inform-time-img {
      width: 20px;
      height: 24px;
      margin: 12px 12px 10px 12px;
    }
  }
  .inform-time-right {
    width: 60px;
    height: 100%;
    border-top: 1px solid #ffffff;
    text-align: center;
    .inform-time-img {
      width: 24px;
      height: 24px;
      margin: 12px 16px 10px 16px;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.deletebtn {
  display: inline-block;
  width: 65px !important;
  height: 100%;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background: rgba(217, 217, 217, 1);
}
.deletebtn /deep/ img {
  margin-top: 50%;
  transform: translateY(-50%);
}
.read {
  position: absolute;
  left: 5px;
  top: 20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
 
</style>
