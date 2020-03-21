<template>
  <div>
    <div class="title">地区统计</div>
    <div class="trend">
      <div class="areaBlock1">
        <p style="background:#e3e7f3">地区</p>
        <p style="background:#f3bab0">现存确诊</p>
        <p style="background:#e69a8d">累计确诊</p>
        <p style="background:#95db9a">治愈</p>
        <p style="background:#b4c0d5">死亡</p>
      </div>
      <div >
        <van-collapse v-model="activeName" :accordion="true" :border="false">
          <van-collapse-item
              :name="area.areaName"
              :border="false"
              v-for="area of areaList" :key="area.areaName">
             <template #title>
              <div class="areaBlock2">
                <p>{{area.areaName}}</p>
                <p>{{area.currentConfirmedTotal}}</p>
                <p>{{area.confirmedCountTotal}}</p>
                <p>{{area.curedCountTotal}}</p>
                <p>{{area.deadCountTotal}}</p>
              </div>
            </template>
            <div
              class="areaBlock3"
              v-for="(subArea, index) of area.subAreaList"
              :key="index">
              <p>{{subArea.provinceName || subArea.cityName}}</p>
              <p>{{subArea.currentConfirmedCount}}</p>
              <p>{{subArea.confirmedCount}}</p>
              <p>{{subArea.deadCount}}</p>
              <p>{{subArea.curedCount}}</p>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api';

export default {
  name: 'rumour',
  components: {
  },
  props: {
    area: Array,
  },
  setup(props) {
    const state = reactive({
      areaList: [],
      activeName: '',
    })
    const { area } = props
    // 中国省市
    if (area.length < 100) {
      state.areaList = area.map(item => ({
        areaName: item.provinceShortName,
        currentConfirmedTotal: item.currentConfirmedCount,
        curedCountTotal: item.curedCount,
        confirmedCountTotal: item.confirmedCount,
        deadCountTotal: item.deadCount,
        subAreaList: item.cities,
      }))
    } else {
      area.forEach((item) => {
        const areaItem = state.areaList.find(v => item.continents === v.areaName)
        if (!areaItem) {
          const newAreaItem = {}
          newAreaItem.areaName = item.continents
          newAreaItem.subAreaList = []
          newAreaItem.currentConfirmedTotal = 0
          newAreaItem.confirmedCountTotal = 0
          newAreaItem.curedCountTotal = 0
          newAreaItem.deadCountTotal = 0
          state.areaList.push(newAreaItem)
        } else {
          areaItem.currentConfirmedTotal += item.currentConfirmedCount
          areaItem.confirmedCountTotal += item.confirmedCount
          areaItem.curedCountTotal += item.curedCount
          areaItem.deadCountTotal += item.deadCount
          areaItem.subAreaList.push(item)
        }
      })
    }
    return {
      ...toRefs(state),
    }
  },
};
</script>

<style lang="scss">
  .trend {
    margin: 0 5px;
  }
  .title {
    @include title;
  }
  .areaBlock1, .areaBlock2, .areaBlock3 {
    display: flex;
    p {
      margin: 0 5px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      padding: 8px 2px;
    }
  }
  .areaBlock1 {
    margin-bottom: 5px;
  }
  .areaBlock2 {
    background-color: #f7f7f7;
    p {
       font-weight: 700;
       font-size: 14px;
       justify-content: left;
    }
  }
  .areaBlock3 {
      margin: 5px 0px;
      color: #666666;
      border-bottom: 1px solid #ddd;
  }
  [class*=van-]:focus, a:focus, button:focus, input:focus, textarea:focus {
    background: none;
  }
  .van-cell {
    padding: 0px 2px;
  }
  .van-cell__right-icon {
    margin-left: 5px;
    height: 40px;
    color: #999;
    font-size: 14px;
    line-height: 36px;
    background-color: #f7f7f7;
    order: -1;
  }
</style>
