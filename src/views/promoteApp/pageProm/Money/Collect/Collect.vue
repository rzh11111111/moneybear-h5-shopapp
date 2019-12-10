<template>
    <div class="app-init">
        <top-column :top-header="topheader" ></top-column>
        <div class="collect">
            <div class="collect-title">
                <div class="collect-title-click"  @click="show=!show">
                <van-icon name="arrow-down" color="#fff" class="title-right"/>
                <p class="title-left" v-if="choosetype==3">{{showstarttime}}-{{showendtime}}</p>
                <p class="title-left"  v-if="choosetype==2">上月</p>
                <p class="title-left"  v-if="choosetype==1">本月</p>
                <p class="title-left"  v-if="choosetype==0">累计</p>
                </div>
                <transition name="slide-fade">
                <ul  v-show="show">
                    <li @click="choosetime('0')">积累</li>
                    <li  @click="choosetime('1')">
                        本月
                    </li>
                    <li  @click="choosetime('2')">
                        上月
                    </li>
                    <li  @click="choosetime('3')">
                        自定义
                    </li>
                </ul>
                </transition>
            </div>
            <div class="collect-content">
                <div >
                    <p class="content-title">收益入账（元）</p>
                    <p class="content-titlemoney">{{store.countMoneyIn}}</p>
                </div>
                <ul>
                    <li>
                        <p class="content-li-title">应收收益（元）</p>
                        <p class="content-li-titlemoney">{{store.countReceivableIn}}</p>
                    </li>
                    <!--<li v-if="type==1">-->
                        <!--<p class="content-li-title">省区总抽成（元）</p>-->
                        <!--<p class="content-li-titlemoney">{{store.countMoneyBossTakeSpread}}</p>-->
                    <!--</li>-->
                    <li>
                        <p class="content-li-title">退回收益（元）</p>
                        <p class="content-li-titlemoney">{{store.countReceivableOut}}</p>
                    </li>
                    <li>
                        <p class="content-li-title">提现金额（元）</p>
                        <p class="content-li-titlemoney">{{store.countWithDrawMoney}}</p>
                    </li>
                </ul>


            </div>



            <div class="collect-bottom">
                <img src="@/assets/img/collectbottom.png"/>
            </div>
        </div>
        <start-end-time :start-end-time="startendtime1" @timecallback="times"></start-end-time>
    </div>
</template>

<script>
    import startEndTime from '@/components/startEndTime/startEndTime'
    import {format,currency,back,accDiv} from "@/utils";
    export default {
        name: "Collect",
        data() {
            return {
                topheader: {
                    name: '汇总',
                    left: '1',
                },
                ullong:'ullon',
                show:false,
                type:'',
                startendtime1: {
                    title: '',
                    type: 'date',
                    onoff: false,
                    starttime: '',
                    endtime: ''
                },
                choosetype:0,
                createStartTime:'',
                createEndTime:'',
                showstarttime:'',
                showendtime:'',
                store:{
                    countReceivableIn:'', //应收收益
                    countReceivableOut:'',  //退回收益
                    countMoneyIn:'', //收益入账
                    countWithDrawMoney:'',  //总提现金额
                    countMoneyBossTakeSpread:'' //省区总抽成
                }
            }
        },
        components: {
            startEndTime
        },
        computed:{
            starttime(){
                return false
            }
        },
        methods:{
            onoff(){
                if(this.ullong=='ullon'){
                    this.ullong='ullong'
                }else{
                    this.ullong='ullon'
                }
            },
            times (msg) { // 时间插件的事件
                if (msg.oldtime) {
                    console.log('确定')
                    // this.startendtime1.starttime=format(new Date(msg.oldtime), 'yyyy-MM-dd hh:mm:ss')
                    // this.startendtime1.endtime=format(new Date(msg.newtime), 'yyyy-MM-dd hh:mm:ss')
                    this.startendtime1.starttime=format(msg.olddate, 'yyyy-MM-dd hh:mm:ss')
                    this.startendtime1.endtime=format(msg.newdate, 'yyyy-MM-dd hh:mm:ss')
                    this.createStartTime=this.startendtime1.starttime
                    this.createEndTime= this.startendtime1.endtime
                    this.showstarttime=msg.oldtime
                    this.showendtime=msg.newtime
                    this.show=false
                    this.getdata()
                } else {
                    console.log('取消')
                    this.startendtime1.starttime=''
                    this.startendtime1.endtime=''
                    this.showstarttime=''
                    this.showendtime=''
                    this.choosetype='0'
                    this.createStartTime=this.startendtime1.starttime
                    this.createEndTime= this.startendtime1.endtime
                    this.show=false
                    this.getdata()
                }

                this.startendtime1.onoff = msg.onoff

            },
            choosetime(msg){
                console.log(msg)
                let newdate=new Date(new Date().toLocaleDateString());
                newdate.setDate(1);//本月第一天
                let t=newdate.getTime();
                // let date=format(new Date(), 'yyyy-MM-dd hh:mm:ss')
                // console.log(date)
                if(msg=='3'){
                    this.choosetype='3'
                    this.startendtime1.onoff=! this.startendtime1.onoff
                }else if(msg=='2'){  // 上月
                    this.choosetype='2'
                    t+=1000;//1秒的毫秒数
                    newdate=new Date(t);
                    newdate.setMonth(newdate.getMonth()-1);//下个月
                    let str = format(newdate,"yyyy-MM-dd hh:mm:ss");
                    t-=1000;//一个秒的毫秒数
                    newdate=new Date(t);
                    let str1 = format(newdate,"yyyy-MM-dd hh:mm:ss");
                    console.log(str,str1)
                    this.createStartTime=str
                    this.createEndTime=str1
                    this.show=false
                    this.getdata()
                }else if(msg=='1'){  //本月
                    this.choosetype='1'
                    t+=1000;//1秒的毫秒数
                    newdate=new Date(t);
                    let str = format(newdate,"yyyy-MM-dd hh:mm:ss");
                    t-=1000;//一个小时的毫秒数
                    newdate=new Date(t);
                    newdate.setMonth(newdate.getMonth()+1);//下个月
                    let str1 = format(newdate,"yyyy-MM-dd hh:mm:ss");
                    console.log(str,str1)
                    this.createStartTime=str
                    this.createEndTime=str1
                    this.show=false
                    this.getdata()
                }else{
                    this.choosetype='0'
                    this.createStartTime=''
                    this.createEndTime=''
                    this.show=false
                    this.getdata()
                }

            },
            getdata(){
                /*let formdata=new FormData();
                formdata.set("createStartTime",this.createStartTime);
                formdata.set("createEndTime",this.createEndTime);*/
                let para={
                    createEndTime:this.createEndTime,
                    createStartTime:this.createStartTime
                }
                this.Api.allGet(para).then(res => {
                    console.log(res)
                    this.store.countReceivableIn=currency(accDiv(res.data.data.countReceivableIn,100))
                    this.store.countReceivableOut=currency(accDiv(res.data.data.countReceivableOut,100))
                    this.store.countMoneyIn=currency(accDiv(res.data.data.countMoneyIn,100))
                    this.store.countWithDrawMoney=currency(accDiv(res.data.data.countWithDrawMoney,100))
                    this.store.countMoneyBossTakeSpread=currency(accDiv(res.data.data.countMoneyBossTakeSpread,100))
                }).catch(res=>{
                    console.log(res)
                })
            },
            toback() {
                back('#ffffff')
                // window.location.href = `qtkjshop://background?color=#ffffff`
            },
        },
        mounted(){
            this.toback()
            this.type=sessionStorage.getItem('accountType')
            this.getdata()

        }
    }
</script>

<style scoped>

    .collect{
        width: 339px;
        height: 478px;
        background:linear-gradient(123deg,rgba(0,167,252,1) 0%,rgba(0,136,253,1) 100%);
        border-radius:4px;
        position: absolute;
        margin:auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .collect-title{

        /*margin: 18px 18px 0 0;*/
        width: 80%;
        position: relative;
        left: 20%;
    }
    .collect-title-click{

        display: flex;
        flex-direction: row-reverse;
    }
    .title-left{
        margin: 18px 0 18px 18px;
        font-size: 12px;
        color: #fff;
        opacity: .45;
    }
    .title-right{
        margin: 18px 18px 0 0;
        opacity: .45;
    }
    .collect-title ul{
        position: absolute;
        right: 18px;
        top: 90%;
        background:rgba(255,255,255,0.3);
        border-radius:4px;
        padding:0  9px;
        overflow: hidden;
        /*transition:all 100ms linear ;*/
    }
    .collect-title li{
        padding: 5px 0;
        border-bottom: 1px solid #ffffff;
        color: #fff;
        opacity: .7;
        text-align: center;
        font-size: 12px;
    }
    .collect-title li:last-of-type{
        border: none;
    }
    .content-title{
        position: absolute;
        top: 54px;
        left: 28px;
        color: rgba(255,255,255,.65);
        font-size: 18px;
    }
    .content-titlemoney{
        position: absolute;
        top: 90px;
        left: 28px;
        font-size: 30px;
        color: #ffffff;

    }
    .collect-content /deep/ ul{
        width: 90%;
        position: absolute;
        top: 165px;
        margin: 0 5%;
    }
    .collect-content /deep/ li{
        width: 100%;
        padding: 10px;
        background: rgba(255,255,255,.35);
        border-radius:4px;
        margin-bottom: 18px;

    }
    .content-li-title{
        font-size: 12px;
        color: rgba(255,255,255,.65);
    }
    .content-li-titlemoney{
        font-size: 18px;
        color: #ffffff;
    }




    .collect-bottom{
        width: 100%;
        height: 66px;
        position: absolute;
        bottom: 0;
    }
    .collect-bottom img{
        width: 100%;
        height: 100%;
    }
    .slide-fade-enter,.slide-fade-leave-to{
        opacity: 0;
        /*height: 0;*/
        /*padding: 0 9px;*/
    }
    .slide-fade-enter-active,.slide-fade-leave-active{
        transition: all 1s ease;
    }


</style>
