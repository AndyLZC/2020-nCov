<template>
  <div class="rumour">
    <div class="title">实时新闻</div>
    <ul>
      <li v-for="(item, index) of newsList" :key="item.id" class="news-item">
          <a :href="item.sourceUrl">
            <header class="news-title">
            <i class="newest" v-if="!index">new</i>{{item.title}}
            </header>
            <p class="news-content">{{item.summary}}</p>
            <div class="info">
              <div class="modify-time">更新时间： {{item.pubDateStr}}</div>
              <div class="source">来源： {{item.infoSource}}</div>
            </div>
          </a>
      </li>
    </ul>
  </div>
</template>

<script>
import formatDate from '@/util/date'

export default {
  name: 'rumour',
  components: {
  },
  props: {
    newsList: Array,
  },
  setup() {
    const formatTime = t => formatDate(t, 'yyyy-MM-dd:hh:ss')
    return { formatTime }
  },
};
</script>

<style lang="scss" scoped>
  .title {
    @include title;
  }
  .news-item  {
    margin: 10px 15px 10px 15px;
    padding: 8px 10px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 3px 12px 0 rgba(0,0,0,.08);
    text-align: left;

    .news-title {
      font-size: 16px;
      font-weight: 700;
      color: #444444;
      padding: 5px;
      .newest {
        margin-right: 2px;
        display: inline-block;
        background-color: #e05c1f;
        color: #fff;
        font-size: 10px;
        border-radius: 2px;
        padding: 2px 4px;
        font-style: italic;
        vertical-align: 3px;
      }
    }
    .news-content {
      font-size: 14px;
      color: #aaa;
      line-height: 20px;
      @include text-ellipsis-multi(4);
    }

    .info {
      padding-top: 8px;
      display: flex;
      line-height: 22px;
      font-size: 13px;
      color: #888;
      font-style: italic;
    }
    .modify-time {
      text-align: left;
    }
    .source {
      flex: 1;
      text-align: right;
    }
  }
</style>
