<template>
  <div class="centerList">
    <van-swipe
      class="my-swipe"
      :loop="false"
      :width="75"
      :show-indicators="false"
    >
      <van-swipe-item>
        <svg class="icon" aria-hidden="true" @click="goRecommedList">
          <use xlink:href="#icon-rili"></use>
        </svg>
        <span>每日推荐</span>
      </van-swipe-item>
      <van-swipe-item>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tips_radio"></use>
        </svg>
        <span>私人FM</span>
      </van-swipe-item>
      <van-swipe-item>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gedan"></use>
        </svg>
        <span>歌单</span>
      </van-swipe-item>
      <van-swipe-item>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangdianxiaoshoupaihangbang"></use>
        </svg>
        <span>排行榜</span>
      </van-swipe-item>
      <van-swipe-item>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhibo"></use>
        </svg>
        <span>直播</span>
      </van-swipe-item>
      <van-swipe-item>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanji"></use>
        </svg>
        <span>数字专辑</span>
      </van-swipe-item>
      <van-swipe-item>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-book"></use>
        </svg>
        <span>有声书</span>
      </van-swipe-item>
      <van-swipe-item>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-geshou"></use>
        </svg>
        <span>关注歌手</span>
      </van-swipe-item>
      <van-swipe-item>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-star"></use>
        </svg>
        <span>歌房</span>
      </van-swipe-item>
      <van-swipe-item>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-game"></use>
        </svg>
        <span>游戏专区</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "iconList",
  setup() {
    const Router = useRouter();
    function goRecommedList() {
      Router.push("/recommedplaylist");
    }
    return { goRecommedList };
  },
};
</script>

<style lang="less" scoped>
.centerList {
  width: 100%;
  height: 1rem;
  margin: 0.2rem 0;
  .van-swipe-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
      margin-bottom: 0.1rem;
    }
    span {
      font-size: 0.24rem;
      color: #999;
    }
  }
}
</style>