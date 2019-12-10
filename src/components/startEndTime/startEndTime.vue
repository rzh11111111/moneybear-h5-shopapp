<template>
<div>
  <van-popup v-model="startEndTime.onoff" position="bottom" overlay >
    <div style="bottom: 220px;"  class="startTimeTop">
      <header class="headers">
        <div class="leftbtn btn" @click="quxiao" v-if="$route.path=='/PromotersList'||$route.path=='/OrderManagement'">重置</div>
        <div class="leftbtn btn" @click="quxiao" v-else>取消</div>
        <div class="title">{{startEndTime.title}}</div>
        <div class="rightbtn btn" @click="queding">确认</div>
      </header>
      <content class="conten" v-if="startEndTime.type==='time'">
        <div class="inpu" :class="blue1" @click="choose(1)"  >
      {{defaul}}
        </div>
        至
        <div class="inpu" :class="blue2" @click="choose(2)" >
          {{defaul2}}
        </div>
      </content>
      <content class="conten" v-if="startEndTime.type==='date'">
        <div class="inpu" :class="blue1" @click="choose(1)"  >
          {{dateold| format}}
        </div>
        至
        <div class="inpu" :class="blue2" @click="choose(2)" >
          {{datenew| format}}
        </div>
      </content>
    </div>
    <div v-if="startEndTime.type==='time'">
    <van-datetime-picker
      v-model="defaul"
      type="time"
      :min-hour="minHour"
      :max-hour="maxHour"
      :show-toolbar="true"
      confirm-button-text=" "
      cancel-button-text=" "
      @confirm="onstartTime"
      v-show="blue1"
    ></van-datetime-picker>
    <van-datetime-picker
      v-model="defaul2"
      type="time"
      :min-hour="minHour2"
      :max-hour="maxHour2"
      :show-toolbar="true"
      confirm-button-text=" "
      cancel-button-text=" "
      @confirm="onstartTime2"
      @cancel="startEndTime.onoff=!startEndTime.onoff"
      v-show="blue2"
    ></van-datetime-picker>
    </div>
    <div v-if="startEndTime.type==='date'">
      <van-datetime-picker
        v-model="dateold"
        type="date"
        @change="handleTime1"
        :show-toolbar="true"
        confirm-button-text=" "
        cancel-button-text=" "
        @confirm="onstartTime"
        :formatter="formatter"
        v-show="blue1"
      ></van-datetime-picker>
      <van-datetime-picker
        v-model="datenew"
        type="date"
        @change="handleTime2"
        :show-toolbar="true"
        confirm-button-text=" "
        cancel-button-text=" "
        @confirm="onstartTime2"
        :formatter="formatter"
        @cancel="startEndTime.onoff=!startEndTime.onoff"
        v-show="blue2"
      ></van-datetime-picker>
    </div>
  </van-popup>
</div>
</template>

<script>
import {format} from '@/utils';
export default {
  props: [
    'startEndTime'
  ],
  data () {
    return {
      blue1: 'blue',
      blue2: '',
      defaul: '8:00',
      defaul2: '8:00',
      dateold:new Date(
              new Date(new Date().toLocaleDateString()).getTime()
      ), //当天0点
      datenew:new Date( // 当天23:59
              new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1
      ),
      maxHour: 24,
      minHour: 0,
      maxHour2: 24,
      minHour2: 0,
      // maxDate:'',
      // minDate:'',
      // maxDate2:'',
      // minDate2:''
    }
  },
  filters: {
    format
},
  methods: {
    onstartTime (value) {
      console.log(value)
      this.startEndTime.onoff = !this.startEndTime.onoff
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }else{
        return `${value}日`
      }
      return value;
    },
    choose (key) {
      if (key === 1) {
        this.blue2 = ''
        this.blue1 = 'blue'
        // document.getElementsByClassName('van-picker__confirm')[1].click()
      } else if (key === 2) {
        this.blue1 = ''
        this.blue2 = 'blue'
        // document.getElementsByClassName('van-picker__confirm')[0].click()
      }
    },
    quxiao () {
      let times = {
        onoff: false
      }
      this.$emit('timecallback', times)
    },
    queding () {

      if(this.startEndTime.type==='time'){
      let times = {
        oldtime: this.defaul,
        newtime: this.defaul2,
        onoff: false
      }
        this.$emit('timecallback', times)
      }else if(this.startEndTime.type==='date'){
        let filte
        let times = {
          olddate:this.dateold,
          newdate:this.datenew,
          oldtime: this.$options.filters['format'](this.dateold, 'yyyy.MM.dd'),
          newtime: this.$options.filters['format'](this.datenew, 'yyyy.MM.dd'),
          onoff: false
        }
        this.$emit('timecallback', times)
      }

    },
    onstartTime (index) {
      console.log(index)
      this.defaul = index
    },
    onstartTime2 (index) {
      console.log(index)
      this.defaul2 = index
    },
    handleTime1(){
      this.dateold=new Date(
              new Date(this.dateold.toLocaleDateString()).getTime()
      )
        if(this.compareDate(this.dateold,this.datenew)){
            this.$toast('请选择正确的时间')
            this.dateold = new Date(
                    new Date(this.datenew.toLocaleDateString()).getTime()
            )
        }
    },
    handleTime2(){
      this.datenew=new Date( // 当天23:59
              new Date(this.datenew.toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1
      )
        if(this.compareDate(this.dateold,this.datenew)){
            this.$toast('请选择正确的时间')
            this.datenew= new Date( // 当天23:59
                    new Date(this.dateold.toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1
            )
        }
    },
    compareDate (date1, date2) {

      var Date1 = new Date(date1);
      var Date2 = new Date(date2);
      if(Date1.getTime() > Date2.getTime()){
          return true
      } else {

          return false
      }
    }
  }
}
</script>

<style scoped>
  .van-popup{
    overflow-y:visible ;
  }
  .van-picker /deep/ .van-picker__toolbar{
    height: 0px;
  }
  .van-picker /deep/ .van-picker__toolbar::after{
    border: none;
  }
  .startTimeTop{
    width: 100%;
    height: 127px;
    padding: 0 18px;
    box-sizing:border-box;
    position: fixed;
    background: #fff;
    display: block;
  }
  .headers{
    display: flex;
    justify-content: space-between;
  }
  .btn{
    font-size: 14px;
    margin-top: 18px;
  }
  .leftbtn{
    color: #9b9b9b;
  }
  .rightbtn{
    color: #0088fd;
  }
  .title{
    margin-top: 16px;
    font-size: 18px;
    color: #353535;
  }
  .conten{
    margin-top: 43px;
    display: flex;
    justify-content: space-around;
  }
  .inpu{
    width: 137px;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #c0c0c0;
    text-align: center;
  }
  .blue{
    border-bottom: 1px solid #0088FD;
  }
</style>
