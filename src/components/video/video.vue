/**
    视频播放页面
 */
<template>
  <div class="videoContent">
    <video class="video" :src="videoUrl" controls autoplay></video>
  </div>
  <Detail />
  <SimilarMv />
</template>

<script>
import { getMv, getMvData } from "@/request/api/mv.js";
import { mapMutations } from "vuex";

import Detail from "./detail.vue";
import SimilarMv from "./similarMv.vue";
export default {
  name: "video",
  data() {
    return {
      // videoUrl:''
    };
  },
  components: { Detail, SimilarMv },
  mounted() {
    // console.log(this.$route);
    this.playMv(this.$route.query.mid);
  },
  computed: {
    videoUrl() {
      return this.$store.state.video.url;
    },
  },
  methods: {
    ...mapMutations(["updatavideo"]),
    async playMv(id) {
      const res = await getMv(id);
      if (res.data.code == 200) {
        console.log("请求成功");
        const mvdata = res.data.data;
        // console.log(mvdata);
        this.updatavideo(mvdata);
      } else {
        console.log("请求失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.videoContent {
  width: 100%;
  .video {
    width: 100%;
  }
}
</style>