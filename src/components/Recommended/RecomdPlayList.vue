/** 
   推荐歌单
*/
<template>
  <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
    <use xlink:href="#icon-fanhui"></use>
  </svg>
  <SongList />
</template>

<script>
import SongList from "../SongList/index.vue";
import { getRecommnedSong } from "@/request/api/musical.js";
import { mapMutations } from "vuex";
export default {
  name: "recommendPlayList",
  data() {
    return {
      songData: {},
    };
  },
  components: { SongList },
  created() {
    this.getRecommendSonglist();
  },
  methods: {
    ...mapMutations(["updataRequestSongList"]),
    async getRecommendSonglist() {
      let res = await getRecommnedSong();
      console.log(res);
      const { data } = res.data;
      this.songData = data;
      this.updataRequestSongList(this.songData);
    },
  },
};
</script>

<style>
</style>