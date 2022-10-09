<template>
  <h1>相似mv</h1>
</template>

<script>
import { getsimilMvData, getSongerMvData } from "@/request/api/mv";
export default {
  name: "similarMv",
  mounted() {
    // console.log(this.$store.state);
    // const id = this.$store.state.video.id;
    // this.getSimilMv(id);
    this.getSongerMv();
  },
  methods: {
    // async getSimilMv(id) {
    //   const res = await getsimilMvData(id);
    //   //   console.log(res);
    // },
    async getSongerMv() {
      const res = await getSongerMvData();
      console.log(res, "歌手mv");
    },
  },
};
</script>

<style>
</style>