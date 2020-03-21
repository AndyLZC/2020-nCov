<template>
  <div class="map-container">
    <div class="header">{{area.length > 100 ? '全球' : '中国'}}疫情地图</div>
    <div class="map-tab">
      <span
        class="currentConfirmed"
        @click="activeTab = 0"
        :class="{choose: !activeTab}"
      >现存确诊</span>
      <span class="confirmed" @click="activeTab = 1" :class="{choose: !!activeTab}">累计确诊</span>
    </div>
    <div class="map" ref="map"></div>
  </div>
</template>

<script>
// @ is an alias to /src

import {
  watchEffect, reactive, toRefs, onMounted,
} from '@vue/composition-api'
import Echarts from 'echarts/lib/echarts'
import worldMap from '@/api/world'
import 'echarts/map/js/china'
import 'echarts/map/js/world'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/tooltip'

export default {
  name: 'worldMap',
  components: {
  },
  props: {
    area: Array,
  },
  setup(props, context) {
    const state = reactive({
      activeTab: 0,
    })
    let myChart
    onMounted(() => {
      myChart = Echarts.init(context.refs.map)
    })
    watchEffect(() => {
      const { area } = props
      const tabInfo = {
        a: state.activeTab ? '累计确诊' : '现存确诊',
        b: state.activeTab ? 'confirmedCount' : 'currentConfirmedCount',
        c: area.length > 100 ? 'world' : 'china',
        d: area.length > 100 ? 'provinceName' : 'provinceShortName',
        e: area.length > 100 ? '国家' : '省份',
      }
      const list = area.map(item => ({ name: item[tabInfo.d], value: item[tabInfo.b] }))
      const option = {
        tooltip: {
          show: true,
          formatter: ({ name, value }) => `${tabInfo.e}：${name}<br> ${tabInfo.a}：${value}例`,
          textStyle: {
            fontSize: 10,
            fontWeight: 700,
          },
        },
        visualMap: {
          show: true,
          type: 'piecewise',
          min: 0,
          max: 100000,
          left: 10,
          inRange: {
            color: ['#eee', '#ffc0b1', '#ff8c71', '#ef1717', '#9c0505'],
          },
          pieces: [
            { min: 10000 },
            { min: 1000, max: 9999 },
            { min: 500, max: 999 },
            { min: 100, max: 499 },
            { min: 10, max: 99 },
            { min: 1, max: 9 },
          ],
          showLabel: true,
          padding: 2,
          text: ['高', '低'],
          itemWidth: 8,
          itemHeight: 10,
          textStyle: {
            fontSize: 7,
          },
        },
        series: [
          {
            left: 'center',
            type: 'map',
            map: tabInfo.c,
            name: '确诊人数',
            nameMap: worldMap, // 数据国家名字和nameMap映射国家名字保持
            data: list,
          },
        ],
      }
      myChart.setOption(option)
    })
    return { ...toRefs(state) }
  },
};
</script>

<style lang="scss" scoped>
  .map-container {
    text-align: left;
    border-top: 1px solid #eee;
  }
  .header {
    @include title;
  }

  .map-tab {
    font-size: 13px;
    margin: 15px 20px;
    padding: 5px 0;
    .currentConfirmed, .confirmed {
      background-color: #e1e1e1;
      padding: 5px 10px;
    }
    .currentConfirmed {
      border-radius: 15px 0 0 15px;
    }
    .confirmed {
      border-radius: 0 15px 15px 0;
    }
    .choose {
      background-color: #b6d1e4;
      color: #fff;
      font-weight: 700;
    }
  }

  .map {
    height: 350px;
    background: #f8f8f8;
  }
</style>
