/**
    歌单详情页面顶部介绍
 */

 <template>
  <div class="container">
    <div class="playListTop">
      <img :src="songInfo.coverImgUrl" alt="" />
      <div class="listLeft">
        <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-more-1"></use>
        </svg>
      </div>
    </div>
    <div class="playListCenter">
      <div class="leftImg">
        <img :src="songInfo.coverImgUrl" alt="" />
      </div>
      <div class="rightDetail">
        <div class="name">
          <span>{{ songInfo.name }}</span>
        </div>
        <div class="creator">
          <img :src="creator.avatarUrl" alt="" />
          <span>{{ creator.nickname }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </div>
        <div class="description">
          <span>{{ songInfo.description }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="playListFooter">
      <div class="itemList">
        <div class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shoucang"></use>
          </svg>
          <span style="font-size: 12px; color: #999; white-space: nowrap"
            >收藏</span
          >
        </div>
        |
        <div class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
          <span>{{ creator.gender }}</span>
        </div>
        |
        <div class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-share_light"></use>
          </svg>
          <span>{{ creator.gender }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
 
 <script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["createSongList"],
  data() {
    return {
      // creator: {},
      songInfo: {},
      creator: {},
    };
  },
  computed: {
    ...mapState(["creatSongList"]),
  },
  mounted() {
    console.log(this.creatSongList, "222222");
    const datalist = this.creatSongList[0];
    this.songInfo = datalist;
    this.creator = datalist.creator;
  },
  methods: {
    ...mapMutations(["updataShowPlaylist"]),
  },
};
</script>
 
 <style lang="less">
.container {
  position: relative;
  width: 100%;

  .playListTop {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    img {
      width: 100%;
      height: 11rem;
      position: fixed;
      left: 0;
      z-index: -1;
      filter: blur(20px);
    }
    .listLeft,
    .listRight {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 0.35rem;
        color: #fff;
      }
      .icon {
        fill: #fff;
      }
    }
  }
  .playListCenter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 3rem;
    padding: 0.2rem;
    .leftImg {
      flex: 1.8;
      img {
        width: 100%;
        //   height: 100%;
        border-radius: 0.2rem;
      }
    }
    .rightDetail {
      display: flex;
      flex-direction: column;
      flex: 3;
      // background-color: pink;
      height: 100%;
      padding: 0 0.2rem;
      .name {
        span {
          color: #fff;
          font-size: 0.32rem;
          font-weight: 500;
        }
      }
      .creator {
        display: flex;
        align-items: center;
        width: 100%;
        margin: 0.15rem 0;
        // height: 0.4rem;
        img {
          width: 0.6rem;
          height: 100%;
          border-radius: 50%;
        }
        span {
          font-size: 0.28rem;
          margin-left: 10px;
          color: #fff;
        }
        .icon {
          // 填充色
          fill: #fff;
        }
      }
      .description {
        display: flex;
        // align-items: center;
        width: 100%;
        height: 25%;
        span {
          display: block;
          // float: left;
          width: 95%;
          // height: 90%;
          color: rgba(238, 238, 238, 0.879);
          font-size: 0.24rem;
          overflow: hidden;
        }
        .icon {
          fill: rgb(146, 145, 145);
        }
      }
    }
  }

  .playListFooter {
    display: flex;
    justify-content: center;
    align-items: center;

    // border: 1px solid #999;
    .itemList {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 70%;
      height: 1rem;
      background-color: #fff;
      color: #999;
      border-radius: 30px;
      padding: 0 0.2rem;
      box-sizing: border-box;
      .item {
        display: flex;
        align-items: center;
        width: 25%;
        height: 100%;
        // background-color: pink;
        .icon {
          width: 80%;
          height: 45%;
          fill: #000;
        }
        span {
          color: #000;
          font-size: 0.28rem;
        }
      }
    }
  }

  .container::after {
    position: absolute;
    content: "";
    width: 140%;
    height: 200px;
    left: -20%;
    bottom: 0px;
    border-radius: 0 0 50% 50%;
    z-index: -1;
  }
}
</style>