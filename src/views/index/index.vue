<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    // import Api from '../../Api'
    export default {
        data() {
            return {}
        },
        mounted() {
            // const loading = document.getElementById('preloadingAnimation')
            // if (loading != null) {
            //     document.body.removeChild(loading)
            // }
             const script = document.createElement('script');
            script.src = 'https://s4.cnzz.com/z_stat.php?id=1278040654&web_id=1278040654';//友盟中的代码
            script.language = 'JavaScript';
            document.body.appendChild(script);
        },
        watch: {
        $route() {
   
            if (window._czc) {
                let location = window.location;//路由变化
                let contentUrl = location.hash;//自定义当前url，可带上路由以此区分每个页面
                let refererUrl = '/';
                window._czc.push(["_setAutoPageview", false]);
                window._czc.push(["_trackPageview", contentUrl, refererUrl])

            }
        }
    },
        methods: {}
    }
</script>
<style lang="scss" type="text/scss">
    @import "../../assets/style/reset";
</style>
