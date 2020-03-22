<template>
  <div class="home">
    <div class="top">
      human fighting
    </div>
    <van-tabs v-model="active" scrollspy sticky>
      <van-tab title="中国疫情">
        <data-box :desc="desc" from="国内" v-if="desc.deadCount"></data-box>
        <echart-map :area="domesticList" v-if="domesticList.length"></echart-map>
        <area-list :area="domesticList" v-if="domesticList.length"></area-list>
      </van-tab>
      <van-tab title="全球疫情">
        <data-box :desc="desc" from="全球" v-if="desc.deadCount"></data-box>
        <echart-map :area="abroadList" v-if="abroadList.length"></echart-map>
        <area-list :area="abroadList" v-if="abroadList.length"></area-list>
      </van-tab>
      <van-tab title="谣言打假">
        <Romour :rumourList="rumourList" v-if="rumourList.length"></Romour>
      </van-tab>
      <van-tab title="实时新闻">
        <News :newsList="newsList"></News>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src

import {
  reactive, toRefs, onMounted,
} from '@vue/composition-api'

import DataBox from './statistic/index.vue'
import Romour from './rumour/index.vue'
import getNews from '@/api/news'
import EchartMap from './map/index.vue'
import News from './news/index.vue'
import AreaList from './area/index.vue'
import getAbroad from '@/api/abroad'
import getDomestic from '@/api/domestic'
import getRumour from '@/api/rumour'

export default {
  name: 'home',
  components: {
    DataBox,
    EchartMap,
    Romour,
    News,
    AreaList,
  },
  setup() {
    const state = reactive({
      newsList: [],
      active: 0,
      desc: {},
      abroadList: [],
      domesticList: [],
      rumourList: [],
    })
    const getNewsList = async () => {
      const result = await getNews()
      const { news, desc } = result.data.newslist[0]
      state.newsList = news
      state.desc = desc
    }
    const getAbroadList = async () => {
      const result = await getAbroad()
      state.abroadList = result.data.newslist
    }
    const getDomesticList = async () => {
      const result = await getDomestic()
      state.domesticList = result.data.newslist
    }
    const getRumourList = async () => {
      const result = await getRumour()
      state.rumourList = result.data.newslist
    }
    onMounted(() => {
      getNewsList()
      getAbroadList()
      getDomesticList()
      getRumourList()
    })
    return {
      ...toRefs(state),
    }
  },
};
</script>

<style lang="scss" scoped>
  .top {
    background-image: url('../assets/nCov.jpg');
    height: 200px;
    width: 100%;
    background-size: 100%;
    font-weight: 700;
    font-size: 40px;
    text-align: center;
    line-height: 200px;
    font-style: italic;
    color: #fff;
  }
  .test {
    height: 600px;
    font-size: 60px;
    text-align: center;
    line-height: 400px;
  }
</style>
