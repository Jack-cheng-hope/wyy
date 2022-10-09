<template>
  <div class="footerMusic">
    <div class="footerLeft">
      <img :src="songList[songIndex].al.picUrl" alt="" @click="showPopup" />
      <div class="songName">
        <p>{{ songList[songIndex].al.name }}</p>
        <span>横滑切换歌曲</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" v-if="isPause" @click="playsong">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="playsong">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao1"></use>
      </svg>
    </div>

    <audio
      ref="audioRef"
      :src="`https://music.163.com/song/media/outer/url?id=${songList[songIndex].id}.mp3`"
    ></audio>

    <van-popup
      v-model:show="isShowPopup"
      position="bottom"
      :style="{ height: '100%' }"
      ><DetailMusic
        :music="songList[songIndex]"
        :playsong="playsong"
        :isPause="isPause"
        :addDuration="addDuration"
    /></van-popup>
  </div>
</template>

<script>
import DetailMusic from "../components/Detail/DetailMusic";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // 保存的定时器
      interval: "",
    };
  },
  computed: {
    ...mapState(["songList", "songIndex", "isPause", "isShowPopup"]),
  },
  mounted() {
    this.$store.dispatch("getlyrics", this.songList[this.songIndex].id);
    // this.updataTime();
    // this.addDuration();
  },
  updated() {
    // console.log("updated");
    this.$store.dispatch("getlyrics", this.songList[this.songIndex].id);
    this.addDuration();
  },
  components: { DetailMusic },
  methods: {
    // 点击播放或暂停歌曲
    playsong() {
      // this.$store.commit("updataIsPause");
      // console.log(this.$refs.audioRef.paused);
      if (this.$refs.audioRef.paused) {
        this.$refs.audioRef.play();
        this.updataIsPause(false);
        // 播放歌曲时跟心当前时间
        this.updataTime();
        this.addDuration();
      } else {
        this.$refs.audioRef.pause();
        this.updataIsPause(true);
        // 播放结束时清除定时器，结束更新播放时间
        clearInterval(this.interval);
      }
    },
    // 更新当前歌曲播放时间
    updataTime() {
      this.interval = setInterval(() => {
        this.updataCurrentTime(this.$refs.audioRef.currentTime);
      }, 500);
    },
    showPopup() {
      // alert(1);
      this.changeShowpopup();
      this.updataTime();
    },
    // 提交歌曲总时长
    addDuration() {
      this.updatadurationTime(this.$refs.audioRef.duration);
    },

    ...mapMutations([
      "updatadurationTime",
      "updataIsPause",
      "changeShowpopup",
      "updataCurrentTime",
    ]),
  },
  watch: {
    // 监听下标，如果发生改变，就自动播放,并且改变图标按钮为播放
    songIndex() {
      this.$refs.audioRef.autoplay = true;
      if (this.$refs.audioRef.paused) {
        this.updataIsPause(false);
      }
    },
    songList() {
      if (this.isPause) {
        this.$refs.audioRef.autoplay = true;
        this.updataIsPause(false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.footerMusic {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.2rem;
  background-color: #fff;
  position: fixed;
  bottom: 60px;
  border-top: 1px solid gray;
  padding: 0.2rem;
  .footerLeft {
    display: flex;
    align-items: center;
    // justify-content: space-around;
    width: 70%;
    height: 100%;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .songName {
      margin-left: 0.2rem;
      p {
        font-size: 0.28rem;
        font-weight: 600;
      }
      span {
        font-size: 0.24rem;
        color: gray;
      }
    }
  }
  .footerRight {
    .icon {
      margin: 0 0.2rem;
    }
  }
}
</style>