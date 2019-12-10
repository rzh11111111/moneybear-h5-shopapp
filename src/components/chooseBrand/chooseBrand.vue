<template>
    <div class="allBrands">
        <top-column :top-header="{name:'选择品牌', left:'2', right1:'', heade:'header1' }" :goBackMt="closeBrand"></top-column>
        <!--<van-list-->
                <!--v-model="loading"-->
                <!--:finished="finished"-->
                <!--finished-text="没有更多了"-->
                <!--@load="getList"-->
                <!--:offset="10"-->
                <!--:immediate-check="false"-->
        <!--&gt;-->
            <!--<van-radio-group v-model="cloudBrand.id">-->
                <!--<van-cell-group>-->
                    <!--<van-cell :title="`${item.name}`" clickable @click="selectMt(item)" v-for="(item, index) in brandList" :key="index">-->
                        <!--<van-radio :name="item.id" />-->
                    <!--</van-cell>-->
                <!--</van-cell-group>-->
            <!--</van-radio-group>-->
            <van-row type="flex" align="center" justify="space-between" v-for="(item, index) in brandList" :key="index" class="brandBox" @click.native="selectMt(item)">
                <van-row type="flex" align="center">
                    <img :src="item.icoUrl" alt="">
                    <p>{{item.name}}</p>
                </van-row>
                <img src="../../assets/img/confirm.png" alt="" v-if="item.id === cloudBrand.id" class="confirm">
            </van-row>
        <!--</van-list>-->

    </div>
</template>

<script>
    import topColumn from '@/components/topColumn/topColumn'
    export default {
        name: "chooseBrand",
        components: {
            topColumn
        },
        data(){
            return {
                cloudBrand: {id:'', name:''},
                brandList: [],
                finished: false,
                loading: false,
                page: {
                    pageNo: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            closeBrand() {
                this.$emit('select');
            },
            getList() {
                // this.loading = true;
                // const params = { page: this.page };
                this.Api.brandList({}).then(res => {
                    if(res.data.status === 1) {
                      // if(res.data.data.length > 0) {
                          this.brandList = res.data.data;
                      //     this.page.pageNo++;
                      // } else {
                      //     this.finished = true;
                      // }
                      //   this.loading = false;
                    } else {

                    }
                })
             },
            selectMt(item) {
                this.cloudBrand.id = item.id;
                this.$emit('select',{ name: item.name, id: item.id});
            }
        },
        created() {
            this.getList();
        }
    }
</script>

<style scoped lang="scss">
    .allBrands{
        width: 100%;
        height: 100vh;
        .brandBox{
            padding: 10px;
            border-bottom: 1px solid rgba(229, 229, 229, .34);
            .confirm{
                width: 30px;
                height: 30px;
            }
            img {
                width:50px;
                height: 50px;
                margin-right: 20px;
            }
        }
    }
</style>
