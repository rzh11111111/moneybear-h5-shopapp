<template>
    <div class="allMenus">
            <top-column :top-header="topHeader" :goBackMt="goBackMt"></top-column>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getList"
                :offset="10"
                :immediate-check="false"
        >
            <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell :title="`${item.name}`" clickable @click="selectMt(item)" v-for="(item, index) in list" :key="index">
                        <van-radio :name="item.id" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-list>

        <!--<img src="@assets/img/menus_add.png" alt="" class="floatImg">-->
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import topColumn from '@/components/topColumn/topColumn'
    export default {
        components: {
            topColumn,
            draggable
        },
        name: "allMenus",
        props: [
            'data'
        ],
        data() {
            return {
                radio: '1',
                topHeader: {
                    name: "选择所属菜单",
                    left: "2",
                    right1: "",
                    heade: "header1"
                },
                list: [],
                finished: false,
                loading: false,
                page: {
                    pageNo: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            getList() {
                this.Api.sellCategoryList({id: this.session.$getSessionStorageByName('storeId')}).then(res => {
                    if(res.data.status==1){
                        if(res.data.data.length > 0) {
                            this.list = this.list.concat(res.data.data);
                            this.page.pageNo++;

                        } else {
                            this.finished = true;

                        }
                        this.loading = false;

                    }else{
                        // this.$toast('')
                    }
                })
            },
            selectMt(item) {
                this.radio = item.id;
                this.$emit('select',{ name: item.name, id: item.id});
            },
            goBackMt() {
                this.$emit('select');
            }
        },
        created() {
            this.getList();
        }
    }
</script>

<style scoped lang="scss">
.allMenus{
    height:100vh;
}
.floatImg{
    position: fixed;
    right:10px;
    bottom:20%;
}
.van-cell-group{
    margin-top: 0!important;
}
.van-cell__value{
    color: #969799;
    display: block !important;
}
    .van-radio {
        justify-content: flex-end;
    }
</style>
