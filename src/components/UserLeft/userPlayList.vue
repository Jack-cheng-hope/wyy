<template>
  <div class="mylove">
    <div class="loveBox">
      <img :src="loveSongList.coverImgUrl" alt="" />
      <div class="title">
        <span>我喜欢的音乐</span>
        <span>8首</span>
      </div>
    </div>
    <div class="hearSong">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-more"></use>
      </svg>
      <span>心动模式</span>
    </div>
  </div>
  <div class="myPlayList">
    <div class="listItem">
      <span>创建歌单</span>|
      <span>收藏歌单</span>
    </div>
    <div class="creatlist">
      <div class="creatSongList">
        <span>创建歌单(1个)</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-more"></use>
        </svg>
      </div>
      <div
        class="createplayList"
        v-for="item in creatSongList"
        :key="item.id"
        @click="goPlayList"
      >
        <div class="imgbox">
          <img :src="item.coverImgUrl" alt="" />
          <div class="info">
            <span class="name">{{ item.name }}</span>
            <span class="name">{{ item.trackCount }}</span>
          </div>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-more"></use>
        </svg>
      </div>
    </div>
    <div class="collectList">
      <div class="collectSong">
        <span>收藏歌单(1个)</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-more"></use>
        </svg>
      </div>
      <div
        class="collectplayList"
        v-for="item in collectSongList"
        :key="item.id"
      >
        <div class="imgbox">
          <img :src="item.coverImgUrl" alt="" />
          <div class="info">
            <span class="name">{{ item.name }}</span>
            <span>{{ item.trackCount }}首,by{{ item.creator.nickname }}</span>
          </div>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-more"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getUserPlaylist } from "@/request/api/user";
import emitter from "../../utils/eventbus.js";
export default {
  name: "userplaylist",
  props: ["profile"],
  data() {
    return {
      // 我喜欢的音乐
      loveSongList: [],
      // 创建的歌单
      creatSongList: [],
      // 收藏的歌单
      collectSongList: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getplaylist();
    });
  },
  methods: {
    ...mapMutations(["updataShowPlaylist"]),
    async getplaylist() {
      // console.log(this.profile);
      // const uid = this.profile.userId;
      // console.log(uid);
      const uid = JSON.parse(localStorage.getItem("userInfo")).userId;
      // console.log(file, "file");
      let res = await getUserPlaylist(uid);
      console.log(res, "用户歌单");
      const list = res.data.playlist;
      const firstsognList = list.shift();
      this.loveSongList = firstsognList;
      list.forEach((item) => {
        // console.log(item);
        if (item.creator.nickname == "Worthy_呀") {
          this.creatSongList.push(item);
        } else {
          this.collectSongList.push(item);
        }
      });
    },
    goPlayList() {
      this.$router.push("/collectionlist");
      this.$store.commit("updataUserCreateSong", this.creatSongList);
      console.log("提交");
    },
  },
};
</script>

<style lang="less" scoped>
.mylove {
  display: flex;
  align-items: center;
  width: 100%px;
  height: 1.7rem;
  background-color: #fff;
  margin: 0.2rem 0;
  border-radius: 0.2rem;
  padding: 0 0.2rem;
  .loveBox {
    display: flex;
    align-items: center;
    img {
      width: 20%;
      border-radius: 0.2rem;
    }
    .title {
      display: flex;
      flex-direction: column;
      width: 50%;
      // background-color: pink;
      margin-left: 0.2rem;
      span:nth-last-child(1) {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .hearSong {
    display: flex;
    width: 2.7rem;
    align-items: center;
    // background-color: pink;
    font-size: 0.23rem;
    border: 1px solid #999;
    border-radius: 0.3rem;
    padding: 0 0.2rem;

    .icon {
      width: 15px;
    }
  }
}
.myPlayList {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 15rem;
  //   background-color: pink;
  // margin-top: 0.4rem;
  .listItem {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0.24rem 0;
    span {
      margin: 0 1rem;
    }
  }
  .creatlist {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.2rem;
    margin: 0.2rem 0;
    padding: 0.2rem;
    box-sizing: border-box;
    .creatSongList {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0.1rem 0;
    }
    .createplayList {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      // height: 1.5rem;
      background-color: #fff;
      .imgbox {
        width: 20%;
        display: flex;
        align-items: center;
        img {
          width: 100%;
          border-radius: 0.2rem;
        }
        .info {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          span:nth-last-child(1) {
            font-size: 0.24rem;
            color: #999;
          }
        }
      }
    }
  }

  .collectList {
    width: 100%;
    background: none;
    background-color: #fff;
    border-radius: 0.2rem;
    .collectSong {
      display: flex;
      justify-content: space-between;
      margin: 0.2rem 0;
      padding: 10px;
      box-sizing: border-box;
    }
    .collectplayList {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-radius: 0.2rem;
      // background-color: pink;
      padding: 0.2rem;
      .imgbox {
        display: flex;
        align-items: center;
        width: 20%;
        img {
          width: 100%;
          border-radius: 0.2rem;
        }
        .info {
          display: flex;
          flex-direction: column;
          margin-left: 0.2rem;
          .name {
            font-size: 0.28rem;
            // 不换行
            white-space: nowrap;
          }
          span:nth-last-child(1) {
            font-size: 0.24rem;
            color: #999;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
