<template>
  <div class="page">
      <top-column :top-header="topheader"></top-column>
      <van-cell title="月份" is-link :value="monlist.arrMonth?monlist.arrMonth:'请选择月份'" @click="monlist.onoff=true;topheader.name='选择月份'"/>
      <van-cell title="星期" is-link :value="weeklist.arrWeek?weeklist.arrWeek:'请选择星期'" @click="weeklist.onoff=true;topheader.name='选择星期'"/>
      <van-cell
                  title="时段"
                  value="请选择营业时间"
                  value-class="colorC0C0C0"
                  v-for="(item,index) in subList"
                  :key="index"
          >
            <p @click="clickstarttime(index)" v-if="!item.startTime" style="border-bottom: 1px solid #999;padding: 0 4px;">开始时间</p>
            <p  @click="clickstarttime(index)" v-else style="color: #353535;border-bottom: 1px solid #999;padding: 0 4px;">{{item.startTime}}</p>
            <p style="margin: 0 10px;color: #353535;">至</p>
            <p @click="clickendtime(index)"  v-if="!item.endTime" style="border-bottom: 1px solid #999;padding: 0 4px;">结束时间</p>
            <p  @click="clickendtime(index)" v-else style="color: #353535;border-bottom: 1px solid #999;padding: 0 4px;">{{item.endTime}}</p>
            <div class="addtimeicon">
                <img 
                src="@/assets/img/menus_add.png" 
                @click="addtime"
                v-if="index===subList.length-1&&index!==4"
                />
                <img 
                src="@/assets/img/delete.png" 
                @click="deletetime(index)"
                v-else
                />
                </div>
          </van-cell>
 <van-button type="primary" size="large" @click="inputbtn" class="submitbtn">保存</van-button>
      
          <van-popup
            v-model="starttime.onoff"
            position="bottom"
    >
      <van-datetime-picker
              v-model="starttime.time1"
              type="time"
              :formatter="formatter"
              @confirm="starttimes"
              @cancel="starttime.onoff=!starttime.onoff"
      />
      <div style="position: fixed;left: 50%;bottom: 99px;">:</div>
    </van-popup>
    <van-popup
            v-model="endtime.onoff"
            position="bottom"
    >
      <van-datetime-picker
              v-model="endtime.time1"
              type="time"
              :formatter="formatter"
              @confirm="endtimes"
              @cancel="endtime.onoff=!endtime.onoff"
      />
      <div style="position: fixed;left: 50%;bottom: 99px;">:</div>
    </van-popup>

    <van-popup
    
      v-model="monlist.onoff"
      position="right"
      :overlay="false"
    >
      <div class="rightmap"  style="margin-top: 44px;">
    
        <div>
            <van-cell 
            title="全选" 
            clickable
            title-style='max-width: none;'
            @click="toggle(true,true)"
             >
                <van-checkbox v-model="monthte" slot="right-icon"></van-checkbox>
            </van-cell>
          <van-checkbox-group v-model="month">
            <van-cell-group>
                <van-cell
                v-for="(item, index) in monlist.list"
                clickable
                :key="item"
                :title="` ${item}月`"
                @click="toggle(index)"
                title-style='max-width: none;'
                >
                <van-checkbox
                    :name="item"
                    ref="checkboxes"
                    slot="right-icon"
                />
                </van-cell>
            </van-cell-group>
            </van-checkbox-group>
</div>
      </div>
    </van-popup>


              <van-popup
             
      v-model="weeklist.onoff"
      position="right"
      :overlay="false"
    >
      <div class="rightmap"  style="margin-top: 44px;">
    
        <div>
            <van-cell 
            title="全选" 
            clickable
            title-style='max-width: none;'
            @click="toggle2(true,true)"
             >
                <van-checkbox v-model="weekte" slot="right-icon"></van-checkbox>
            </van-cell>
          <van-checkbox-group v-model="week">
            <van-cell-group>
                <van-cell
                v-for="(item, index) in weeklist.list"
                clickable
                :key="item"
                :title="` 周${item}`"
                @click="toggle2(index)"
                title-style='max-width: none;'
                >
                <van-checkbox
                    :name="item"
                    ref="checkboxes2"
                    slot="right-icon"
                />
                </van-cell>
            </van-cell-group>
            </van-checkbox-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
  export default {
    data () {
      return {
          topheader: {
          name: '添加营业时间',
          left: '3',
          heade: 'header1'
        },
        monthte:false,
        monlist:{
            onoff:false,
            arrMonth:'',
            list:[
                1,2,3,4,5,6,7,8,9,10,11,12
            ]
        },
        month:[

        ],
        weekte:false,
        weeklist:{
            onoff:false,
            arrWeek:'',
            list:[
                1,2,3,4,5,6,7
            ]
        },
        alldata:{},
        week:[

        ],
        subList:[
            
        ],
        // startTime: '', // 3,营业开始时间
        // endTime: '', // 3,营业结束时间
        starttime:{
            nowkey:'',
        onoff:false,
        time1:'08:00'
        },
      endtime:{
          nowkey:'',
        onoff:false,
        time1:'18:00'
        },
      }
    },
    components: {
    },
    methods: {
        goback(){
            if (this.monlist.onoff) {
                this.monlist.onoff = false
                this.topheader.name = '添加营业时间'
                this.changemonth()
            } else if (this.weeklist.onoff) {
                this.weeklist.onoff = false
                this.topheader.name = '添加营业时间'
                this.changeweek()
            } else{
                this.$router.go(-1)
            }
        },
        inputbtn(){
            let time=this.subList.some(res=>{
                return res.startTime&&res.endTime
            })
            if(!time){
                this.$toast('请选择时段')
                return
            }
            if(this.month.length&&this.week.length){
                this.subList.forEach(item=>{
                  if(!item.startTime||!item.endTime){

                  }else{
                    item.startHourOfDay=Number(item.startTime.substring(0,2).replace(':',""))
                    item.startMinuteOfHour=Number(item.startTime.substring(item.startTime.length-2).replace(':',""))
                    item.endHourOfDay=Number(item.endTime.substring(0,2).replace(':',""))
                    item.endMinuteOfHour=Number(item.endTime.substring(item.endTime.length-2).replace(':',""))
              
                  }
                })
                let para={
                    stStoreId:sessionStorage.getItem('storeId'),
                    arrMonthOfYear:this.month,
                    arrDayOfWeek:this.week,
                    subList:this.subList.filter(item=>item.startTime&&item.endTime)
                }
                console.log(para)
               if(this.$route.query.change){
                 para.id=this.alldata.id
               }
                this.shopApi.shopTimeAdd(para).then(res=>{
                    if(res.data&&res.data.status===1){
                        this.$toast('已保存')
                        setTimeout(() => {

                           this.$router.go(-1)
                        }, 500);
                    }
                })
            }else{
                this.$toast('请选择完整')
            }
        },
        addtime(){//添加时段
            this.subList.push({
                startTime:'',
                endTime:'',
                startHourOfDay:'',
                startMinuteOfHour:'',
                endHourOfDay:'',
                endMinuteOfHour:'',
            })
        },
        deletetime(index){ //删除时段
        if(this.$route.query.change){
         


          if(this.alldata.subList[index]){  //修改的时候添加假的再删
            let para={
            storeId:sessionStorage.getItem('storeId'),
            id:this.alldata.subList[index].id
          }
          this.shopApi.shopTimeDeleteOne(para).then(res=>{
            if(res.data.status===1){
              this.$delete(this.alldata.subList, index)
              this.$delete(this.subList, index)
            }else{
              this.$toast('至少有一个时段')
            }
            
          })
          }
          




        }else{
this.$delete(this.subList, index)
        }
             
        },
        clickstarttime(index){ //选择
            this.starttime.onoff=!this.starttime.onoff
            this.starttime.nowkey=index
        },
        clickendtime(index){
            this.endtime.onoff=!this.endtime.onoff
            this.endtime.nowkey=index
        },
        starttimes(){ //确定
      this.subList[this.starttime.nowkey].startTime = this.starttime.time1
      this.starttime.onoff=false
    },
    endtimes(){
      this.subList[this.endtime.nowkey].endTime = this.endtime.time1
      this.endtime.onoff=false
    },
    formatter(type, value) {
      console.log(typeof value)
      // if(value[0]=='0'){
      //   value=value.slice(1)
      // }
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }else if (type === 'day') {
        return `${value}日`
      }else if (type === 'hour') {
        return `${value}点`
      }else if (type === 'minute') {
        return `${value}分`
      }
      return value;
    },
    toggle(index,te) {
        if(te){
            this.monthte=!this.monthte
           
                // this.monlist.list.forEach((item,index1)=>{
                //     this.$refs.checkboxes[index1].toggle();
                // })
                if(this.monthte){
                  this.month.splice(0,this.month.length)
                this.month.push(1,2,3,4,5,6,7,8,9,10,11,12)
              }else{
                this.month.splice(0,this.month.length)
              }
            
        }else{

            this.$refs.checkboxes[index].toggle()
            setTimeout(() => {
              this.month.sort(function (a,b){ return a-b });
        console.log(this.month.length,index);
        this.month.length===12?this.monthte=true:this.monthte=false
          }, 0);
         
            
            
        }
    },
    toggle2(index,te) {
        if(te){
            this.weekte=!this.weekte
              if(this.weekte){
                this.week.splice(0,this.week.length)
                this.week.push(1,2,3,4,5,6,7)
              }else{
                this.week.splice(0,this.week.length)
              }
                // this.weeklist.list.forEach((item,index1)=>{
                //     this.$refs.checkboxes2[index1].toggle();
                // })
            
        }else{
            this.$refs.checkboxes2[index].toggle();
             setTimeout(() => {
              this.week.sort(function (a,b){ return a-b });
        console.log(this.week.length,index);
        this.week.length===7?this.weekte=true:this.weekte=false
          }, 0);
        }
    },
    changemonth(){        
            let arr=[this.month[0]]
                this.month.forEach((item,index)=>{
              // console.log(item,index,value.arrMonthOfYear[index+1])
              if(this.month[index+1]-item!==1){
                arr.push(item)
                arr.push(this.month[index+1])
              }              
          })
          arr.pop()
          let month=''
          arr.forEach((item,index)=>{
            if(index%2===0){
              if(item===arr[index+1]){
                month+=item+'月,'
              }else{
                month+=item+'~'+arr[index+1]+'月,'
              }
            }
          })
          month=month.substr(0,month.length-1);
          
  console.log(month,arr)
          if((arr.length===2&&arr[1]-arr[0]===11)||this.monthte){
            this.monlist.arrMonth='全年'
          }else{
            this.monlist.arrMonth=month
          }
          
          
          
          
      },
        changeweek(){        
            let arr=[this.week[0]]
                this.week.forEach((item,index)=>{
              // console.log(item,index,value.arrweekOfYear[index+1])
              if(this.week[index+1]-item!==1){
                arr.push(item)
                arr.push(this.week[index+1])
              }              
          })
          console.log(arr)
          arr.pop()
          let week=''
          arr.forEach((item,index)=>{
            
            if(index%2===0){
              if(item===arr[index+1]){
                week+=',周'+item
              }else{
                week+=',周'+item+'~周'+arr[index+1]
              }
            }
          })
        //   week=week.substr(0,week.length-1);
          week=week.substr(1,week.length);
  console.log(week)
          if((arr.length===2&&arr[1]-arr[0]===6)||this.weekte){
            this.weeklist.arrWeek='整周'
          }else{
            this.weeklist.arrWeek=week
          }
          
          
          
          
      },
        changeTime(){
          
           
                this.subList.forEach((item,index)=>{
                   let startTime=''
            let endTime=''
                  startTime+=item.startHourOfDay+':';
                  item.startMinuteOfHour<10?startTime+='0'+item.startMinuteOfHour:startTime+=item.startMinuteOfHour;
                  item.startTime=startTime
                  endTime+=item.endHourOfDay+':';
                   item.endMinuteOfHour<10?endTime+='0'+item.endMinuteOfHour:endTime+=item.endMinuteOfHour;
                   item.endTime=endTime
          })
          
            // times=times.substr(1,times.length);
          
            // value.arrTimes=times
          // console.log(startTime,endTime)
          
          
      }
    },
    computed: {

    },
    created(){

    },
    mounted(){
      if(this.$route.query.change){
        console.log(this.$store.state.record.time)
        let changetimes=this.$store.state.record.time
        this.alldata=changetimes
        let arrMonthOfYear=changetimes.arrMonthOfYear.map(Number)
        let arrDayOfWeek=changetimes.arrDayOfWeek.map(Number)
       
        
        this.week.push(...arrDayOfWeek)
        this.month.push(...arrMonthOfYear)
        this.subList.push(...changetimes.subList)
        this.changeTime()
        if(this.subList.length<5){
          this.subList.push({
                startTime:'',
                endTime:'',
                startHourOfDay:'',
                startMinuteOfHour:'',
                endHourOfDay:'',
                endMinuteOfHour:'',
            })
        }
         
      }else{
        this.subList.push({
                startTime:'',
                endTime:'',
                startHourOfDay:'',
                startMinuteOfHour:'',
                endHourOfDay:'',
                endMinuteOfHour:'',
            })
            this.week.push(1,2,3,4,5,6,7)
            this.month.push(1,2,3,4,5,6,7,8,9,10,11,12)
             this.monthte=true
        this.weekte=true
      }
        this.changemonth()
        this.changeweek()
       
    },
  }
</script>

<style scoped lang="scss" type="text/scss">
.addtimeicon{
    position: absolute;
    right: 0;
    width: 24px;
    height: 24px;
    img{
        width: 100%;
        height: 100%;
    }
}
 
</style>
