<template>
  <div class="container">
    <img class="bgImg" :src="music.al.picUrl" alt="" />
    <div class="musicTop">
      <svg class="icon" aria-hidden="true" @click="changeShowpopup">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <div class="article">
        <p>
          <Vue3Marquee>
            {{ music.al.name }}
          </Vue3Marquee>
        </p>
        <span v-for="item in music.ar" :key="item.id">{{ item.name }}</span>
      </div>
      <div class="shareSong">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-share_light"></use>
        </svg>
      </div>
    </div>
    <div class="musicCenter" v-show="isLryShow" @click="showLry">
      <div class="musicImg">
        <img
          src="@/assets/cizhen.png"
          :class="[!isPause ? 'cizhen-active' : 'cizhen']"
        />
        <img class="cipan" src="@/assets/cipan.png" />
        <img
          class="musicImg"
          :src="music.al.picUrl"
          :class="[!isPause ? 'musicImg_active' : 'musicImg_paused']"
        />
      </div>
    </div>
    <div class="lry" ref="LryRef" v-show="!isLryShow" @click="showLry">
      <p
        ref="lryItemRef"
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 <= item.next,
        }"
      >
        {{ item.lry }}
      </p>
    </div>
    <div class="musicFooter">
      <div class="musicIconList">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-test"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao1"></use>
        </svg>
      </div>
      <div class="progressBar">
        <!-- 滑块 -->
        <input
          class="range"
          type="range"
          min="0"
          :max="durationTime"
          v-model="currentTime"
          step="0.05"
        />
      </div>
      <div class="musicControl">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <!-- 上一首 -->
        <svg class="icon" aria-hidden="true" @click="changeSong(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-if="isPause" @click="playSong">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-else @click="playSong">
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <!-- 下一首 -->
        <svg class="icon" aria-hidden="true" @click="changeSong(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-more-1"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
// import { onMounted } from "vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "detailMusic",
  props: ["music", "isPause", "playsong", "addDuration"],
  components: {
    Vue3Marquee,
  },
  mounted() {
    this.addDuration();
  },
  computed: {
    ...mapState([
      "songList",
      "songIndex",
      "lyrics",
      "isLryShow",
      "currentTime",
      "durationTime",
    ]),
    // console.log(this.lyrics);
    // 对歌词进行处理
    lyric: function () {
      // console.log(this.lyrics.lyric, "computed");
      let arr;
      // 判断厂库库是否有歌词
      if (this.lyrics.lyric) {
        // split以换行符为切割点，结果为一个数组， map循环数组，返回个新的数组
        arr = this.lyrics.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          // console.log(item);
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mil = item.slice(7, 10);
          let lry = item.slice(11, item.length);
          // isNaN（value）如果value是NaN， isNaN返回为true 否则为false
          if (isNaN(Number(mil))) {
            mil = item.slice(7, 9);
            lry = item.slice(10, item.length);
          }

          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mil);
          // console.log(hour, second, Number(min), lrc);
          // 返回出一个对象
          return { min, sec, mil, lry, time };
        });

        // 获取下一句歌词的时间
        arr.forEach((item, i) => {
          // 如果是最后一句歌词，next就为0
          if (i == arr.length - 1) {
            item.next = 0;
          } else {
            // 下一句歌词的时间
            item.next = arr[i + 1].time;
          }
        });
        // console.log(arr);
        // console.log(this.currentTime * 100);
      }
      return arr;
    },
    // currentTimes(){
    //   console.log(this.currentTimes* 1000);
    //   return this.currentTime * 1000
    // }
  },
  methods: {
    ...mapMutations(["changeShowpopup", "changeLryShow", "updataSongIndex"]),
    playSong() {
      // alert(1);
      this.playsong();
    },
    // 控制歌词和磁盘动画的显示与隐藏
    showLry() {
      this.changeLryShow();
    },
    // 上一首/下一首
    changeSong(value) {
      // console.log(this.songIndex);
      // 获取厂库里当前播放的音乐下标
      let index = this.songIndex + value;
      // this.songList[index]
      // 小于零调到最后一首
      if (index < 0) {
        index = this.songList.length - 1;
      } else if (index == this.songList.length) {
        index = 0;
      }
      this.addDuration();
      this.updataSongIndex(index);
    },
  },
  // 监听currentTime的变化，发生变化，滚动歌词
  watch: {
    currentTime(newValue) {
      const p = document.querySelector("p.active");
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.LryRef.scrollTop = p.offsetTop - 300;
        }
      }

      if (newValue == this.durationTime) {
        if (this.songIndex == this.songList.length - 1) {
          this.changeSong(1);
          this.playsong();
        } else {
          this.updataSongIndex(this.songIndex + 1);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  //   padding: 0.2rem;
  .bgImg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(20px);
  }
  .musicTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .icon {
      fill: #fff;
    }
    .article {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 35%;
      p {
        color: wheat;
        font-size: 0.32rem;
      }
      span {
      }
    }
  }
  .musicCenter {
    margin-top: 10px;
    width: 100%;
    height: 8rem;
    .musicImg {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 8rem;
      //   background-color: pink;
      .cipan {
        position: absolute;
        width: 4rem;
        height: 4rem;
        z-index: -1;
      }
      .musicImg {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        animation: img_rotate 10s linear infinite;
      }
      .cizhen {
        position: absolute;
        left: 44%;
        width: 2rem;
        top: 0;
        // 逆时针旋转-15度 rotate 围绕某一基点旋转
        transform: rotate(-15deg);
        // 旋转点位置 默认50% 50%
        transform-origin: 0 0;
        transition: all 2s;
      }
      .cizhen-active {
        position: absolute;
        left: 44%;
        width: 2rem;
        top: 0;
        // 逆时针旋转-15度 rotate 围绕某一基点旋转
        transform: rotate(0deg);
        // 旋转点位置 默认50% 50%
        transform-origin: 0 0;
        transition: all 2s;
      }
      .musicImg_active {
        animation-play-state: running;
      }
      .musicImg_paused {
        animation-play-state: paused;
      }
      @keyframes img_rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
  .lry {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 8rem;
    margin-top: 10px;
    overflow: scroll;
    // background-color: pink;
    // transform: all 0.2s linear;
    p {
      color: rgb(199, 197, 197);
      margin: 0.2rem 0;
    }
    .active {
      color: #fff;
      font-size: 0.48rem;
      // transition: all 0.2 linear;
    }
  }
  .musicFooter {
    width: 100%;
    height: 4.15rem;
    // background-color: pink;
    .musicIconList {
      display: flex;
      justify-content: space-around;
      width: 100%;
      .icon {
        width: 25%;
        height: 1rem;
        padding: 10px;
      }
    }
    .progressBar {
      display: flex;
      align-items: center;
      width: 100%;
      height: 1.4rem;
      padding: 0.2rem;
      // background-color: red;
      .range {
        width: 100%;
        height: 0.06rem;
      }
    }

    .musicControl {
      display: flex;
      justify-content: space-around;
      margin-top: 0.4rem;
      .icon {
        width: 25%;
        height: 1rem;
        padding: 0.2rem;
      }
    }
  }
}
</style>