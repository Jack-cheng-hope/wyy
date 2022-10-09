<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
      <use xlink:href="#icon-arrow-left"></use>
    </svg>
    <input
      type="text"
      v-model="keyWord"
      class="search"
      @keydown.enter="enterSearch"
    />
  </div>
  <div class="searchList">
    <div class="historybox">
      <span class="history">历史</span>
      <svg class="icon" aria-hidden="true" @click="deletKey">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="keybox">
      <span
        class="historyKey"
        v-for="item in keyWordList"
        :key="item"
        @click="SearchHisKey(item)"
        >{{ item }}</span
      >
    </div>
  </div>
  <div class="searchsong">
    <SearchSong :songlist="songList" />
  </div>
</template>

<script>
import SearchSong from "../components/musicList/SearchSong.vue";
import { searchSong } from "@/request/api/searchSong";
import { nanoid } from "nanoid";
export default {
  name: "search",
  data() {
    return {
      keyWordList: [],
      keyWord: "",
      songList: [],
    };
  },
  components: {
    SearchSong,
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem("keyWordList")) || [];
  },
  methods: {
    async enterSearch() {
      if (this.keyWord.trim()) {
        this.keyWordList.unshift(this.keyWord);
      }
      console.log(this.keyWordList);
      //  数组去重
      this.keyWordList = [...new Set(this.keyWordList)];

      console.log(this.keyWordList);

      if (this.keyWordList.length > 5) {
        this.keyWordList.splice(this.keyWordList.length - 1, 1);
      }

      const res = await searchSong(this.keyWord);
      console.log(res);
      this.songList = res.data.result.songs;
      this.keyWord = "";
      localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
    },
    // 删除历史记录
    deletKey() {
      localStorage.removeItem("keyWordList");
      this.keyWordList = [];
    },
    // 历史记录搜索
    async SearchHisKey(item) {
      const res = await searchSong(item);
      console.log(res);
      this.songList = res.data.result.songs;
    },
  },
};
</script>

<style lang="less">
.searchTop {
  display: flex;
  align-items: center;
  width: 100%;
  height: 1rem;
  .icon {
    width: 0.6rem;
    height: 0.6rem;
  }
  .search {
    width: 90%;
    border: none;
    border-bottom: 1px solid #999;
    padding: 0.1rem;
  }
}
.searchList {
  width: 100%;
  height: 1.5rem;
  padding: 0 0.2rem;
  .historybox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    // background-color: pink;
    .history {
      font-size: 0.32rem;
      font-weight: 700;
    }
  }
  .keybox {
    width: 100%;
    margin-top: 0.2rem;
    .historyKey {
      display: inline-block;
      padding: 0.1rem 0.2rem;
      background-color: rgb(185, 169, 169);
      border-radius: 20px;
      margin: 0.1rem 0.1rem;
    }
  }
}
.searchsong {
  width: 100%;
  padding: 0.2rem;
}
</style>