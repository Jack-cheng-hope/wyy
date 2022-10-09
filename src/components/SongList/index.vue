    // 歌曲列表页面
/** 
    歌单详情页歌曲列表
*/
<template>
  <div class="itemListTop">
    <div class="listleft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <div class="play">
        播放全部
        <span>(共10首)</span>
      </div>
    </div>
    <div class="listRight"></div>
  </div>
  <div class="songList">
    <div class="item" v-for="(song, index) in songList" :key="song.al.id">
      <div class="itemLeft" @click="playsong(index)">
        <span>{{ index + 1 }}</span>
        <div class="song">
          <p>{{ song.al.name }}</p>
          <span>{{ song.name }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg
          class="icon"
          aria-hidden="true"
          v-show="song.mv"
          @click="playMv(song.mv)"
        >
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao2"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      songList: [],
    };
  },
  computed: {
    ...mapState(["requestSongList"]),
    songData() {
      return this.requestSongList.dailySongs;
    },
  },
  mounted() {
    this.songList = this.songData;
  },
  methods: {
    playsong(index) {
      console.log(typeof index);
      const songIndex = index;
      const songs = this.songList;
      this.$store.commit("updataSongList", songs);
      this.$store.commit("updataSongIndex", songIndex);
      console.log(this.songList, index, "6666");
    },
    playMv(id) {
      this.$router.push({
        path: "/video",
        query: {
          mid: id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.itemListTop {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  // height: 0.7rem;
  padding: 0.3rem 0.2rem;
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
  // margin-top: 0.2rem;
  padding: 0 0.2rem;
  background-color: #fff;
  .item {
    display: flex;
    width: 100%;
    // background-color: pink;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid #ccc;
    margin-bottom: 0.2rem;
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
</style>