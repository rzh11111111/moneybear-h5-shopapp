<template>
  <div>

    <div class="rightmap">
      <header class="heade">

      </header>
      <label>地区：<input v-model="area.location" class="maparea"></label>
      <label>关键词：<input v-model="area.keyword" class="mapkey"></label>
      <div>

      </div>
      <baidu-map
        style="width:750px;height:500px"
        :center="area.center"
        :zoom="area.zoom"
        :min-zoom="7"
      >
        <bm-view class="map" style="width:750px;height:300px"></bm-view>
        <bm-local-search :keyword="area.keyword" :auto-viewport="true" :location="area.location" class="mapsearch"></bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'storeAddress'
    ],
    data () {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .rightmap{
    width: 100vw;
    height: 100vh;
    background: #fff;
  }
  .maparea{
    width: 75px;
    height: 30px;
  }
</style>
