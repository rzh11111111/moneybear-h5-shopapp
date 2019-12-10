<template>
    <div style="background:#fff;">
        <top-column :top-header="topheader" ></top-column>
        <div id="allmap"></div>
        <div class="maptitle">
            <label  @click="tochoose"><p  class="te">{{map.city?map.city:'选择城市'}}</p></label>
            <label style="width: 100%;"><input class="te2" v-model="map.keyword"  placeholder="小区/写字楼/学校 等"></label>
        </div>
        <baidu-map :center="center" :zoom="18" v-show="false">
            <bm-view class="map"></bm-view>
            <bm-local-search class="dsa" :keyword="keywords" @searchcomplete="markersset" :auto-viewport="true" :location="map.city"  v-show="false"></bm-local-search>
        </baidu-map>
        <van-collapse :value="activeNames" class="tecollapse" >
            <van-collapse-item title="我的位置" name="0" value-class="collapsewarn" :is-link=false >
                <div slot="icon" class="vant-collapse-icon"></div>
                <div slot="value" class="bluecolor"  >
                    <van-button :loading="loading" type="default" style="height: 44px;border:none"   class="mapright  bluecolor"  @click="getshowLocation">获取定位</van-button>
                </div>
                <!--<p  @click="getmap" class="mapbottomte">{{ding}}-->
                <!--</p>-->
                <!--<van-button :loading="loading" type="default" style="height: 44px;"   class="mapright"  @click="getmap">获取定位</van-button>-->
                <div  class="address-list"  v-if="!addresss">
                    <div class="mapbottom telist">
                        <div class="mapbottom-left" style=""  >{{ding}}</div>
                        <div class="mapbottom-right"  style="max-width: 60%;"  >店铺地址</div>
                    </div>
                    <!--<p class="mapright"  >重新定位</p>-->
                    <!--<van-button :loading="loading" type="default" style="height: 44px;"  class="mapright"  @click="getmap">获取定位</van-button>-->
                </div>
                <div  class="address-list" v-else>
                    <div class="mapbottom telist">
                        <div class="mapbottom-left" style=""  @click="addmymap">{{title}}</div>
                        <div class="mapbottom-right"  style="max-width: 60%;"  @click="addmymap">{{addresss}}</div>
                    </div>
                    <!--<p class="mapright"  >重新定位</p>-->
                    <!--<van-button :loading="loading" type="default" style="height: 44px;"  class="mapright"  @click="getmap">重新定位</van-button>-->
                </div>
                <!--<p   class="mapbottomte" v-else>{{title}}<br/>-->
                <!--{{addresss}}-->
                <!--</p>-->
            </van-collapse-item>

            <van-collapse-item title="搜索结果" name="1" value-class="collapsewarn" :is-link=false v-show="list.length" >
                <div slot="icon" class="vant-collapse-icon"></div>
                <!--<p class="mapbottomte"  v-for="item in near">{{item.address}}{{item.title}}</p>-->
                <ul class="address-list">
                    <!--<li class="mapbottom" @click="getmap">{{ding}}</li>-->
                    <li v-for="(item,key) in list" :key="key" @click="addmap(item)" class="mapbottom" :class="(item.point.lat==center.lat&&item.point.lng==center.lng)?actives:''">
                        <div class="mapbottom-left">{{item.title}}</div>
                        <div class="mapbottom-right">{{item.address}}</div>
                    </li>
                </ul>
            </van-collapse-item>
            <van-collapse-item title="附近定位" name="2" value-class="collapsewarn" :is-link=false v-show="!list.length" >
                <div slot="icon" class="vant-collapse-icon"></div>
                <!--<p class="mapbottomte" v-if="!list.length" v-for="item in near">{{item.address}}{{item.title}}</p>-->
                <ul class="address-list">
                    <!--<li class="mapbottom" @click="getmap">{{ding}}</li>-->
                    <li v-for="(item,key) in near" :key="key" @click="addmap(item)" class="mapbottom" :class="(item.point.lat==center.lat&&item.point.lng==center.lng)?actives:''">
                        <div class="mapbottom-left">{{item.title}}</div>
                        <div class="mapbottom-right">{{item.address}}</div>
                    </li>
                </ul>
            </van-collapse-item>
        </van-collapse>
        <!--<p   class="mapbottomte-top">我的位置</p>-->
        <!--<p  @click="getmap" class="mapbottomte">{{ding}}</p>-->
        <!--<p  v-if="list.length>0" class="mapbottomte-top">搜索结果</p>-->
        <!--<ul class="address-list">-->
        <!--&lt;!&ndash;<li class="mapbottom" @click="getmap">{{ding}}</li>&ndash;&gt;-->
        <!--<li v-for="(item,key) in list" :key="" @click="addmap(key,item)" class="mapbottom" :class="(item.point.lat==center.lat&&item.point.lng==center.lng)?actives:''">-->
        <!--<div class="mapbottom-left">{{item.title}}</div>-->
        <!--<div class="mapbottom-right">{{item.address}}</div>-->
        <!--</li>-->
        <!--</ul>-->
    </div>
</template>

<script>
    import {showLocation} from '@/utils'
    export default {
        name: "searchCity",
        data () {
            return {
                topheader: {
                    name: '选择定位',
                    left: '3',
                    heade: 'header1'
                },
                activeNames:['0','1','2'],
                map: {
                    onoff: false,
                    onoff1:false,
                    city:'',
                    province: '',
                    keyword: '',
                    region:'',
                    keywords:[]
                },
                ding:'店铺地址',
                isanzhuo:'',
                near:[],
                actives:'mapcolor', //选择地区颜色
                center: {lng: '', lat: ''},
                list: [

                ],
                lng:'',
                lat:'',
                title:'',
                addresss:'',
                loading:false

            }
        },
        components: {
        },
        computed:{
            keywords(){
                // return this.map.region+this.map.keyword
                return this.map.keyword
            }
        },
        watch:{
            "center.lng"(){
                this.loading=true
                setTimeout(()=>{
                    // map.centerAndZoom(new BMap.Point(this.center.lng, this.center.lat), 11);
// 创建地理编码实例
                    var myGeo = new BMap.Geocoder();
// 根据坐标得到地址描述
                    myGeo.getLocation(new BMap.Point(this.center.lng, this.center.lat), (result)=>{
                        if (result){
                            console.log(result)
                            this.title=result.business?result.business:'当前店铺'
                            this.addresss=result.address
                            this.near=result.surroundingPois
                            this.lng=result.point.lng
                            this.lat=result.point.lat
                            // alert(result.address);
                            // this.$router.go(-1)
                        }
                    });
                    this.loading=false
                },1000)
            }
        },
        methods:{
            goback () {
                if(!sessionStorage.getItem('address')){
                    sessionStorage.setItem('address','返回')
                }
                        this.$router.go(-1)
            },
            addmap (item) {

                sessionStorage.setItem('lng',item.point.lng)
                sessionStorage.setItem('lat',item.point.lat)
                sessionStorage.setItem('address',item.title)
                this.$router.go(-1)

            },
            addmymap(){
                sessionStorage.setItem('lng',this.lng)
                sessionStorage.setItem('lat',this.lat)
                sessionStorage.setItem('address',this.title)
                this.$router.go(-1)
            },
            markersset (msg) {
                if(msg){
                    // this.list = msg.Ar
                    if(msg.Ar&&msg.Ar.length){
                        this.list = msg.Ar
                    }else if(msg.Br&&msg.Br.length){
                        this.list = msg.Br
                    }
                }

            },
            tochoose(){
                this.$router.push({path:'/chooseCity',query: {list:this.$route.query.list}}) // 页面跳转 参考
            },
            getshowLocation(){
                if(this.isanzhuo){
                    showLocation()
                }else{
                    this.getmap()
                }

            },
            getLocation(item){
                if(item!='1'){
                    this.ding=''
                    item=JSON.parse(item)
                    this.center.lng = item.longitude
                    this.center.lat = item.latitude;
                }else{
                    this.ding= '定位失败，请前往设置-省钱熊商户App-位置，允许获取定位'
                }
            },
            getmap(){
                var geolocation = new BMap.Geolocation();
                let that=this
                geolocation.getCurrentPosition(function (r) {
                    // console.log(this.getStatus())
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        // alert(JSON.stringify(r))
                        // getCurrentPosition 但是用户拒绝或者允许获取地理位置，this.getStatus()都是0；
                        //解决办法：当用户拒绝该网站使用浏览器位置时，此时其精度则为null，通过此值判断用户是否拒绝网站获取浏览器位置信息

                        if(r.accuracy==null){
                            // that.ding=r.accuracy
                            that.ding= '定位失败，请前往设置-省钱熊商户App-位置，允许获取定位'
                        }else{
                            that.ding=''
                            that.center.lng = r.longitude
                            that.center.lat = r.latitude;

                        }
                    }
                    else {
                        that.ding='定位失败，请前往设置-省钱熊商户App-位置，允许获取定位'
                    }
                })

            },
            myFun(result){
                console.log(result)
                var cityName = result.name;
                //map.setCenter(cityName);
                this.map.city=cityName
                console.log("当前定位城市:"+cityName);
            }
        },
        mounted () {
            let u = navigator.userAgent
            let isAndroid=u.indexOf('Android')>-1||u.indexOf('Linux')>-1;//android终端
            if(isAndroid){
                this.isanzhuo=true
                window.getLocation=this.getLocation
                showLocation()
            }else{
                this.isanzhuo=false
                var geolocation = new BMap.Geolocation();

                let that=this
                geolocation.getCurrentPosition(function (r) {
                    // console.log(this.getStatus())

                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        // alert(JSON.stringify(r))
                        // getCurrentPosition 但是用户拒绝或者允许获取地理位置，this.getStatus()都是0；
                        //解决办法：当用户拒绝该网站使用浏览器位置时，此时其精度则为null，通过此值判断用户是否拒绝网站获取浏览器位置信息

                        if(r.accuracy==null){
                            // that.ding=r.accuracy
                            that.ding= '定位失败，请前往设置-省钱熊商户App-位置，允许获取定位'
                        }else{
                            that.center.lng = r.longitude
                            that.center.lat = r.latitude;

                        }
                    }
                    else {
                        that.ding='定位失败，请前往设置-省钱熊商户App-位置，允许获取定位'
                    }
                })
            }

            if(sessionStorage.getItem('city')){
                setInterval(()=>{
                    this.map.city=sessionStorage.getItem('city')
                },500)
            }else{
                var myCity = new BMap.LocalCity();
                myCity.get(this.myFun);
            }



        },
        activated(){
            if(this.$route.query.city){
                    this.map.city=this.$route.query.city
            }
        },
        destroyed(){   //调用百度地图会产生一个永久的iframe
            let el = document.querySelector('iframe')


            if(el){
                let iframe = el.contentWindow;
                el.src = 'about:blank';
                try{
                    iframe.document.write('');
                    iframe.document.clear();
                }catch(e){};
                //以上可以清除大部分的内存和文档节点记录数了
                //最后删除掉这个 iframe 就哦咧。
                document.body.removeChild(el);
            }
        }

    }
</script>

<style scoped lang="scss" type="text/scss">
    .map {
        width: 100%;
        height:85.2vh;
    }

    .map+div  li{
        font-size: 15px !important;
        line-height: 20px !important;
    }
    .map+div  div  div{
        font-size: 15px !important;
        line-height: 20px !important;
    }
    .map+div li  div{
        font-size: 15px !important;
        line-height: 20px !important;
    }
    .maptitle{
        width: 355px;
        height: 30px;
        margin-left: 10px;
        margin-top: 12px;
        margin-bottom: 12px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        border: 1px solid #f6f6f6;
        border-radius:30px;
        overflow: hidden;
        .te{
            width: 80px;
            border-radius:4px 0 0 4px;
            padding-left:10px;
            font-size: 14px;
            line-height: 28px;
            background: #f6f6f6;
            text-align: center;
            border: 1px solid #f6f6f6;
        }
        .te2{
            width: 100%;
            height: 30px;
            border: none;
            border-radius:0 4px 4px 0;
        }
        input{
            height: 30px;
            font-size: 14px;
            background:rgba(246,246,246,1);
            border-radius:4px;
            /*border:1px solid rgba(255,255,255,1);*/
            padding: 0 10px;
        }
    }
    .address-list {
        position: relative;
        padding: 0 21px;
        .mapbottom{
            width: 100%;
            display: flex;
            flex-direction: column;
            color: #999;
            border-bottom: 1px solid #EDEDED;
            .mapbottom-left{
                width: 100%;
                font-size: 14px;
                padding-top: 10px;
                color: #323232;
            }
            .mapbottom-right{
                width: 100%;
                font-size: 12px;
                padding: 8px 0;
                color: #999;
            }
        }
    }
    .mapcolor{
        color:#2294F4;
    }
    .address-list {
        overflow: auto;
    }
    .mapbottomte-top{
        width: 100%;
        height: 40px;
        font-size: 16px;
        line-height: 38px;
        background: #E6E6E6;
        border-top: 1px solid #C5C5C5;
        border-bottom: 1px solid #C5C5C5;
        color: #333;
        padding: 0 20px;
        font-weight: 800;
    }
    .mapbottomte{
        padding: 10px 21px;
        border-bottom:1px solid #EDEDED ;
        font-size: 14px;
        margin-bottom: 15px;
    }
    .mapright{
        position: absolute;
        right: 0%;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        width: 30%;
        padding: 0;
    }
    .tecollapse::after{
        border-bottom: none;
    }
    .telist{
        border-bottom: none !important;
    }
</style>
