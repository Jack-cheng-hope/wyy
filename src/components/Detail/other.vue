<template>
  <!-- <h1>{{ subscribedCount }}</h1> -->
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listleft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div class="play">
          播放全部
          <span>(共{{}}首)</span>
        </div>
      </div>
      <div class="listRight">
        <span>+收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="songList">
      <div
        class="item"
        v-for="(song, index) in songlist.songs"
        :key="song.al.id"
        @click="playsong(index)"
      >
        <div class="itemLeft">
          <span>{{ index + 1 }}</span>
          <div class="song">
            <p>{{ song.al.name }}</p>
            <span>{{ song.name }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true" v-show="song.mv">
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao2"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { getAllPlayListSong } from "@/request/api/musical.js";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const subscribedCount = ref(0);
    const songlist = reactive({
      songs: {},
    });
    const store = useStore();
    const route = useRoute();
    onMounted(async () => {
      const { id } = route.query;
      //  console.log(id);
      let res = await getAllPlayListSong(id);
      console.log(res, "song");
      songlist.songs = res.data.songs;
    });
    subscribedCount.value = sessionStorage.getItem("subscribedCount");
    // console.log(subscribedCount, "444");
    function playsong(index) {
      // alert(1);
      console.log(store);
      store.commit("updataSongList", songlist.songs);
      store.commit("updataSongIndex", index);
    }
    return { subscribedCount, songlist, playsong };
  },
};
</script>

<style lang='less' scoped>
.itemMusicList {
  width: 100%;
  height: auto;
  background-color: #fff;
  border-top-right-radius: 0.4rem;
  border-top-left-radius: 0.4rem;
  padding: 0.2rem;
  .itemListTop {
    display: flex;
    justify-content: space-between;
    width: 100%;
    // background-color: pink;
    height: 0.7rem;
    .listleft {
      display: flex;
      align-items: center;
      .play {
        margin-left: 0.2rem;
        span {
          color: rgb(159, 155, 155);
          font-size: 0.24rem;
        }
      }
    }
    .listRight {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
      height: 100%;
      background-color: red;
      border-radius: 0.4rem;
      span {
        color: #fff;
        font-size: 0.26rem;
      }
    }
  }
  .songList {
    width: 100%;
    margin-top: 0.2rem;
    .item {
      display: flex;
      width: 100%;
      // background-color: pink;
      justify-content: space-between;
      align-items: center;
      // border-bottom: 1px solid #ccc;
      margin: 0.2rem 0;
      .itemLeft {
        display: flex;
        align-items: center;
        span {
          padding-right: 0.2rem;
        }
        .song {
          p {
            font-size: 14px;
            font-weight: 600;
          }
          span {
            font-size: 0.24rem;
            color: gray;
            padding-top: 0.1rem;
          }
        }
      }
      .itemRight {
        display: flex;
        .icon {
          margin: 0 0.1rem;
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }
  }
}
</style>