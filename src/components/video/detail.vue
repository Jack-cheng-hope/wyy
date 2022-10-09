/** 
    视频详细信息
*/
<template>
  <div class="barragebox">
    <input type="text" placeholder="发个弹幕聊聊..." />
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-danmukaiqi"></use>
    </svg>
  </div>
  <div class="container">
    <div class="articlebox">
      <div class="leftbox" v-for="item in info.artists" :key="item.id">
        <img :src="item.img1v1Url" alt="" />
        <div class="infobox">
          <span class="name">{{ item.name }}</span>
          <span class="msg">6万粉丝 10视频</span>
        </div>
      </div>
      <div class="rightbox">
        <span>关注</span>
      </div>
    </div>
    <van-collapse v-model="activeName" :border="false">
      <van-collapse-item :title="info.name" name="1">
        <span>{{ info.desc }}</span>
      </van-collapse-item>
    </van-collapse>
    <div class="bottombox">
      <span class="song">{{ info.name }} - {{ info.artistName }}</span>
      <span class="info">{{ playCount }}万次观看·{{ info.publishTime }}</span>
    </div>
    <div class="iconlist">
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang1"></use>
        </svg>
        <span>收藏</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanfa"></use>
        </svg>
        <span>{{ info.shareCount }}</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true" @click="showComment">
          <use xlink:href="#icon-pinglun2"></use>
        </svg>
        <span>{{ info.commentCount }}</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianzan_kuai"></use>
        </svg>
        <span>{{ info.subCount }}</span>
      </div>
    </div>
  </div>

  <van-popup
    v-model:show="isCommentShow"
    position="bottom"
    closeable
    :style="{ height: '58%', width: '100%' }"
    :overlay="false"
    close-icon="close"
  >
    <Comment
  /></van-popup>
</template>

<script>
import { getMvData } from "@/request/api/mv";
import { mapMutations } from "vuex";
import Comment from "./coment.vue";
export default {
  name: "detail",
  data() {
    return {
      info: {},
      activeName: ["2"],
      isCommentShow: false,
    };
  },
  components: { Comment },
  computed: {
    playCount() {
      return Math.floor(this.info.playCount / 10000);
    },
  },

  mounted() {
    console.log(this.$store.state.video);
    this.mvData(this.$store.state.video.id);
  },
  methods: {
    ...mapMutations(["updatavideoData"]),
    async mvData(id) {
      const res = await getMvData(id);
      console.log(res);
      this.info = res.data.data;
    },
    showComment() {
      this.isCommentShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
.barragebox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1.1rem;
  padding: 0.2rem;
  box-sizing: border-box;
  input {
    width: 90%;
    height: 100%;
    border-radius: 0.4rem;
    border: none;
    background-color: rgb(206, 204, 204);
    padding: 0 0.2rem;
  }
  .icon {
    width: 0.6rem;
    height: 0.6rem;
  }
}
.container {
  width: 100%;
  padding: 10px;
  .articlebox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .leftbox {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .infobox {
        display: flex;
        flex-direction: column;
        margin-left: 0.2rem;
        .name {
          font-size: 0.28rem;
          font-weight: 700;
        }
        .msg {
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
  }
  .bottombox {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 1rem;

    .song {
      font-size: 0.28rem;
      //   font-weight: 700;
      color: blue;
    }
    .info {
      font-size: 0.24rem;
      color: rgb(155, 154, 154);
    }
  }
  .iconlist {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 0.2rem;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        fill: rgb(78, 78, 78);
        margin-bottom: 0.1rem;
      }
      span {
        font-size: 0.24rem;
      }
    }
  }
}
</style>