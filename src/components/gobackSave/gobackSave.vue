<template>
    <div>
        <van-dialog
                v-model="onoff"
                title=""
        message="您有未提交审批的信息"
                confirm-button-text= "存为草稿"
                show-cancel-button
                cancel-button-text= "放弃填写"
                :close-on-click-overlay=true
                @confirm="confirms"
                @cancel="cancels"
        >
            <div class="goback-goon" @click.capture="goOn">
                <van-icon name="close" size="20px" color="#ffffff"/>
            </div>
            <p class="van-dialog__message goback-message">您有未提交审批的信息</p>
        </van-dialog>
    </div>
</template>

<script>
    export default {
        name: "gobackSave",

        data () {
            return {
                onoff:false

            }
        },
        methods:{
            confirms(){
                this.onoff=false
                this.$parent.savedraft()
                this.$router.go(-1)
            },
            cancels(){
               this.onoff=false
                // this.$emit('gobacks',true)
                this.$router.go(-1)
            },
            goOn(){
                // alert('111')
                this.onoff=false
            }
        }
    }
</script>

<style scoped>
    .van-dialog{
        overflow: visible;
    }
    .goback-goon{
        position: absolute;
        right: 0;
        top: -40px;
        /*padding: 0 0 10px 20px;*/
        padding: 6px 6px 15px 15px;
        /*border: 1px solid #999;*/
        /*border-top: none;*/
        /*border-radius: 0 0 0 20px;*/
        /*border-radius: 0 0 0 95%;*/
        font-size: 12px;
        color: #333;
    }
    .goback-message{
        font-size: 20px;
    }
</style>
