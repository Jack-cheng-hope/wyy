/**
  推荐歌单信息介绍
*/

<template>
  <div class="playListTop">
    <img :src="dataList.playList.coverImgUrl" alt="" />
    <div class="listLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
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
      <img :src="dataList.playList.coverImgUrl" alt="" />
    </div>
    <div class="rightDetail">
      <div class="name">
        <span>{{ dataList.playList.name }}</span>
      </div>
      <div class="creator">
        <img :src="dataList.creator.avatarUrl" alt="" />
        <span>{{ dataList.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </div>
      <div class="description">
        <span>{{ dataList.playList.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </div>
    </div>
  </div>
  <div class="playListFooter">
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun"></use>
      </svg>
      <span>{{ dataList.playList.commentCount }}</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-share_light"></use>
      </svg>
      <span>{{ dataList.playList.shareCount }}</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-download1"></use>
      </svg>
      <span>40</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { songList } from "../../request/api/home.js";
export default {
  name: "playList",
  setup() {
    const dataList = reactive({
      playList: {},
      creator: {},
    });
    // provide("playlist", dataList.playList);
    const Route = useRoute();
    onMounted(async () => {
      const { id } = Route.query;
      const res = await songList(id);
      console.log(res);
      dataList.playList = res.data.playlist;
      dataList.creator = res.data.playlist.creator;
      console.log(dataList.playList, "123");
      // console.log(dataList.creator);
      sessionStorage.setItem(
        "subscribedCount",
        dataList.playList.subscribedCount
      );
    });
    // console.log();

    // console.log(dataList.playList, "2222");
    return { dataList };
  },
};
</script>

<style lang="less">
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
    filter: blur(5px);
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
  justify-content: space-around;
  width: 100%;
  height: 80px;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    height: 100%;
    // background-color: pink;
    .icon {
      width: 80%;
      height: 45%;
      fill: #fff;
      margin-bottom: 0.1rem;
    }
    span {
      color: #fff;
      font-size: 0.28rem;
    }
  }
}
</style>