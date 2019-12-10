<template>
    <div id="app">
        <!--<transition name="fade" mode="out-in">-->
        <!--<keep-alive>-->
                <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
        <!--</keep-alive>-->
        <!--</transition>-->

        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    // import Api from '../../Api'
    export default {
        data() {
            return {}
        },
        mounted () {
            // const loading = document.getElementById('preloadingAnimation')
            // if (loading != null) {
            //     document.body.removeChild(loading)
            // }
            let token = this.local.$getLocalStorageByName('token')
            if (token) { // 确定是否有Token
                this.$router.push({path:'/'})
            } else {
                window.location.reload()
                window.location.href = this.HTTPLOCAT + '/index.html#/login'
            }
 const script = document.createElement('script');
            script.src = 'https://s4.cnzz.com/z_stat.php?id=1278040654&web_id=1278040654';//友盟中的代码
            script.language = 'JavaScript';
            document.body.appendChild(script);

        },
          watch: {
        $route(to, from) {
   
            if (window._czc) {
                let location = window.location;//路由变化
                let contentUrl = location.hash;//自定义当前url，可带上路由以此区分每个页面
                let refererUrl = '/';
                window._czc.push(["_setAutoPageview", false]);
                window._czc.push(["_trackPageview", contentUrl, refererUrl])

            }
        }
    },
        methods: {},
    }
</script>
<style lang="scss">
    @import "../../assets/style/reset";
    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s ease;
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
    // #nprogress .bar {
    //   background: red !important; //自定义颜色
    // }
</style>
