<template>
  <div class="musiclist">
    <div class="musicTop">
      <div class="title">推荐歌单</div>
      <div class="more">查看更多</div>
    </div>
    <!-- 推荐歌单列表 -->
    <div class="songList">
      <van-swipe
        :loop="false"
        :width="100"
        class="songSwiper"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="item in list.musicList"
          :key="item"
          @click="goDetails(item.id)"
        >
          <!-- <router-link :to="{ path: '/musicDetails', query: { id: item.id } }"> -->
          <img :src="item.picUrl" />
          <div class="playCount">
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
            </span>
            <span>{{ changCount(item.playCount) }}</span>
          </div>
          <span class="name">{{ item.name }}</span>
          <!-- </router-link> -->
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { playlist } from "@/request/api/home.js";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "musiclist",
  setup() {
    const list = reactive({
      musicList: [],
    });
    const router = useRouter();
    onMounted(async () => {
      const res = await playlist();
      console.log(res);
      list.musicList = res.data.result;
    });
    function changCount(num) {
      if (num > 100000) {
        return (num / 100000).toFixed(1) + "万";
      }
    }

    function goDetails(id) {
      console.log(id);
      router.push({
        path: "/musicDetails",
        query: {
          id: id,
        },
      });
    }

    return { list, changCount, goDetails };
  },
};
</script>

<style lang="less" scoped>
.musiclist {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 0.6rem;
    margin-bottom: 0.2rem;
    // background-color: pink;
    .title {
      font-weight: 400;
      font-size: 0.3rem;
    }
    .more {
      border: 1px solid #ccc;
      padding: 0 0.2rem;
      text-align: center;
      line-height: 0.5rem;
      border-radius: 0.4rem;
    }
  }
}
.songList {
  width: 100%;
  height: 2.8rem;
  .songSwiper {
    height: 100%;
    .van-swipe-item {
      position: relative;
      padding-right: 0.2rem;

      img {
        width: 100%;
        height: 2rem;
        border-radius: 0.24rem;
      }
      .playCount {
        position: absolute;
        display: flex;
        align-items: center;
        top: 0.1rem;
        right: 0.1rem;
        color: #fff;
        font-size: 12px;
        .icon {
          width: 15px;
          height: 15px;
          margin-top: 5px;
        }
      }
      .name {
        font-size: 0.24rem;
      }
    }
    .van-swipe-item:nth-child(1) {
      margin-left: 0;
    }
  }
}
</style>