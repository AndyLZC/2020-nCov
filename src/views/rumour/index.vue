<template>
  <div class="rumour">
    <div class="title">谣言打假</div>
    <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white">
      <van-swipe-item v-for="(item, index) of rumourList" :key="index">
        <div class="box" ref="box">
          <div class="bg">
            <p class="rumour-text">谣言</p>
            {{item.title}} ?
            <img class="rumour-img" src="https://assets.dxycdn.com/gitrepo/ncov-mobile/dist/static/badge-big@2x.5395c013.png" alt="谣言">
          </div>
          <p class="desc">{{item.desc}}</p>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'rumour',
  components: {
  },
  props: {
    rumourList: Array,
  },
  setup() {
  },
};
</script>

<style lang="scss" scoped>
  .title {
    @include title;
  }
  .box {
    margin: auto;
    width: 250px;
    height: 250px;
    border: 1px solid #999;
    overflow: hidden;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 0.5px solid #ebebeb;
    border-radius: 7px;
    box-shadow: 0 3px 12px 0 rgba(0,0,0,.08);

    .bg {
      position: relative;
      padding: 25px 0px 0 15px;
      height: 130px;
      font-size: 18px;
      font-weight: 700;
      line-height: 24px;
      color: #fff;
      background-image: url('../../assets/nCov.jpg');
      background-size: 100%;

      .rumour-text {
        font-size: 32px;
        margin-bottom: 15px;
      }

      .rumour-img {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 100px;
      }
    }

    .desc {
      font-size: 18px;
      padding: 20px 10px;
    }
  }
</style>
