<template>
  <div class="homeSwiper">
    <van-swipe lazy-render>
      <van-swipe-item v-for="image in swiper.images" :key="image.targetType">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { getBanner } from "@/request/api/home.js";
export default {
  setup() {
    const swiper = reactive({
      images: [],
    });
    onMounted(async () => {
      //   axios.get("http://localhost:3000/banner?type=2").then((res) => {
      //     console.log(res);
      //     swiper.images = res.data.banners;
      //   });
      let res = await getBanner();
      // console.log(res);
      swiper.images = res.data.banners;
    });
    return { swiper };
  },
};
</script>

<style lang="less" scoped>
.homeSwiper {
  .van-swipe {
    width: 100%;
    height: 3rem;
    padding: 0.1rem;

    .van-swipe-item {
      padding: 0 0.2rem;
      margin-right: -0.02rem;

      border-radius: 0.4rem;
      img {
        width: 100%;
        height: 3rem;
        border-radius: 0.4rem;
      }
    }
    .van-swipe__indicator--active {
      background-color: rgb(219, 120, 130);
    }
  }
}
</style>