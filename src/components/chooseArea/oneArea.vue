<template>
  <div>
    <div v-if="!newdata.length" style="position:relative;height: 264px;text-align:center;line-height:264px;">
      <van-loading v-if="loading" style="position:absolute;top:50%;transform:translate(-50%, -50%);left: 50%;" />
      <template v-else>{{emptyText}}</template>
    </div>
    <van-area :area-list="columns" @confirm="onConfirm0" @cancel="onConfirm1" title="选择" v-else />
  </div>
</template>

<script>
  export default {
    name: 'rightchoose',
    props: {
      oneArea: {
        required: true
      },
      emptyText: {
        type: String,
        default: () => '暂无数据'
      }
    },
    data () {
      return {
        loading: true,
        columns: {
          province_list: {

          },
          city_list: {

          },
          county_list: {

          }
        },
        newdata: [ // 添加到中间的选项

        ],

      }
    },
    methods: {
      getdutyArea (para) { // 辖区列表
        this.loading = true
        this.Api.dutyArea(para).then(res => {
          this.loading = false
          if (res.data.data && res.data.data.length) {
            this.newdata=JSON.parse(JSON.stringify(res.data.data))
            res.data.data.map(value => {
              let province = value.sysAreaConfigCode.substring(0, 2).concat('0000')
              let city = value.sysAreaConfigCode.substring(0, 4).concat('00')
              this.$set(this.columns.province_list, province, value.province)
              this.$set(this.columns.city_list, city, value.city)
              this.$set(this.columns.county_list, value.sysAreaConfigCode, value.region)
            })
          } else {
            this.newdata = []
          }

        }).catch(error => {
          console.log(error)
        })
      },
      getdutyArea0 (para) { // 辖区列表
        this.loading = true
        this.Api.dutyArea0(para).then(res => {
          this.loading = false
          if (res.data.data && res.data.data.length) {

            this.newdata=JSON.parse(JSON.stringify(res.data.data))

            res.data.data.map(value => {
              let province = value.sysAreaConfigCode.substring(0, 2).concat('0000')
              let city = value.sysAreaConfigCode.substring(0, 4).concat('00')
              this.$set(this.columns.province_list, province, value.province)
              this.$set(this.columns.city_list, city, value.city)
              this.$set(this.columns.county_list, value.sysAreaConfigCode, value.region)
            })

          } else {
            this.newdata = []
          }

        }).catch(error => {
          console.log(error)
        })
      },
      onConfirm0(msg){
        // this.oneArea.province=msg[0].name
        // this.oneArea.city=msg[1].name
        // this.oneArea.region=msg[2].name
        for(let i=0;i<this.newdata.length;i++){
          if(this.newdata[i].sysAreaConfigCode==msg[2].code){

            msg[3]={id:this.newdata[i].areaConfig.id}
          }
        }
        this.$emit('oneAreascallback',msg)
      },
      onConfirm1(){
        this.$emit('oneAreascallback','')
      }
    },
    mounted () {
      if(sessionStorage.getItem('accountType')==0){
        let para = {
          id: sessionStorage.getItem('id')
        }
        this.getdutyArea0(para)
      }else{
        let para = {
          merManagerId: sessionStorage.getItem('id')
        }
        this.getdutyArea(para)
      }


    }
  }
</script>

<style  scoped>
  .van-button--small{
    background: none;
    color: #009AFC;
    border: none;
  }
  .van-popup.van-popup--right{
  }
  .rightmap{
    width: 100vw;
    height: 100vh;
    /*position:fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    background: #fff;
  }
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

  .rightcontent{
    width: 100%;
    display: flex;
    position: absolute;
    top: 100px;
    justify-content: space-around;
  }
  .righbtn{
    width: 50px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #000;
  }
  .isaddcode{
    position: absolute;
    left: 30px;
    top: 300px;
  }

</style>
