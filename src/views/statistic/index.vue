<template>
  <div class="data-board">
    <div class="title">
      <span>截止{{createTime}} {{from}}数据统计</span>
      <em @click="visible = true">数据说明</em>
      <!-- <pop-up :show.sync="visible"></pop-up> -->
    </div>
    <ul class="board">
      <li v-for="(item, index) of categoryList" :key="index" class="pane" v-show="item.count">
        <div class="change-wrap" v-if="item.change !== ''">
          <b class="change-text">较昨日
             <em class="change" :style="{color: item.color}">
            {{ item.change > 0 ? '+' :''}}{{item.change}}
          </em>
          </b>
          </div>
        <strong class="count" :style="{color: item.color}">{{item.count}}</strong>
        <span class="type">{{item.type}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

import {
  reactive, toRefs,
} from '@vue/composition-api'
import formatDate from '@/util/date'
// import PopUp from '@/components/pop-up.vue'

export default {
  name: 'home',
  components: {
    // PopUp,
  },
  props: {
    desc: Object,
    from: String,
  },
  setup(props) {
    const { desc, from } = props
    const {
      currentConfirmedCount,
      deadCount,
      seriousCount = null,
      curedCount,
      suspectedCount = null,
      confirmedCount,
      currentConfirmedIncr = null,
      deadIncr = null,
      confirmedIncr = null,
      seriousIncr = null,
      curedIncr = null,
      suspectedIncr = null,
    } = from === '全球' ? desc.globalStatistics : desc
    const state = reactive({
      createTime: formatDate(desc.modifyTime, 'yyyy-MM-dd hh:mm'),
      visible: false,
      categoryList: [{
        count: currentConfirmedCount,
        type: '现存确诊',
        change: currentConfirmedIncr,
        color: '#F74C31',
      },
      {
        count: deadCount,
        type: '累计死亡',
        change: deadIncr,
        color: '#F78201',
      },
      {
        count: seriousCount,
        type: '现存重症',
        change: seriousIncr,
        color: '#A25A4E',
      },
      {
        count: curedCount,
        type: '累计治愈',
        change: curedIncr,
        color: '28B7A3',
      },
      {
        count: suspectedCount,
        type: '疑似病例',
        change: suspectedIncr,
        color: '#5D7092',
      },
      {
        count: confirmedCount,
        type: '累计确诊',
        change: confirmedIncr,
        color: '#AE212C',
      },
      ],
    })
    return { ...toRefs(state) }
  },
};
</script>

<style lang="scss" scoped>
  .data-board {
    margin-top: 20px;
  }
  .title {
      display: flex;
      justify-content: space-between;
      margin: 5px 18px 0 22px;
      font-size: 12px;
      color: #666666;
      font-weight: 700;
      font-style: italic;
      text-align: left;
      line-height: 26px;
  }

  .board {
    margin: 5px 18px;
    border: 1px solid #ebebeb;
    border-radius: 6px;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,.05);
    display: flex;
    flex-wrap: wrap;
    background: #fff;

    .pane {
      position: relative;
      margin: 10px 0;
      width: 33.33%;
      display: flex;
      flex-direction: column;
      font-weight: 700;
    }

    .change-wrap {
      font-size: 12px;
    }

    .count {
      font-size: 16px;
      line-height: 28px;
    }
    .type {
      font-size: 12px;
    }

    li:not(:nth-child(3n+1)):before {
      position: absolute;
      bottom: 3px;
      width: 1px;
      height: 40px;
      background-image: linear-gradient(180deg,#eee,#e1e1e1 51%,#fff);
      content: "";
    }
  }
</style>
