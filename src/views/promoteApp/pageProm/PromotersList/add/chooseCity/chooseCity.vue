<template>
    <div id="city">
        <!-- <img src="/logo.png" alt="" height="10px"> -->
        <div class="word" v-show="showWord">
            <span>{{letter}}</span>
        </div>
        <top-column :top-header="topheader" ></top-column>
        <city-list
                :cities="cities"
                :hot="hotCities"
                :letter="letter"
                :city="City"
        ></city-list>
        <city-alphabet
                :cities="cities"
                @change="handleLetterChange"
        ></city-alphabet>
    </div>
</template>

<script>
    import city from '@/components/choosecity/city.json'
    import CityList from '@/components/choosecity/List'
    import CityAlphabet from '@/components/choosecity/Alphabet'
    export default {
        name: 'City',
        components: {
            CityList,
            CityAlphabet,
        },
        data () {
            return {
                topheader: {
                    name: '选择城市',
                    left: '2',
                    heade: 'header1'
                },
                showWord: false,
                cities: {},
                hotCities: [],
                letter: '',
                City:''
            }
        },
        methods: {
            // getCityInfo () {
            //     axios.get('/mock/city.json').then(this.handleGetCityInfoSucc)
            // },
            handleGetCityInfoSucc (res) {

                    const data = res.data
                    this.cities = data.cities
                    this.hotCities = data.hotCities

            },
            handleLetterChange (letter) {
                console.log(letter)
                this.letter = letter
                this.showWord = true
                setTimeout(() => {
                    this.showWord = false
                    console.log(this.showWord)
                }, 500)
            },
            myFun(result){
                console.log(result)
                var cityName = result.name;
                //map.setCenter(cityName);
                this.City=cityName
                console.log("当前定位城市:"+cityName);
            }
        },
        mounted () {
            var myCity = new BMap.LocalCity();
            myCity.get(this.myFun);
            this.handleGetCityInfoSucc(city)
        }
    }
</script>

<style scoped>
    .title {
        line-height: 40px;
        background: #10d1eb;
        color: #fff;
    }
    .word {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99;
    }
    .word span {
        display: inline-block;
        height: 60px;
        width: 60px;
        background: rgba(0, 0, 0, .2);
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
