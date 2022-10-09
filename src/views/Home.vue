<template>
  <div>
    <topNav />
    <HomeSwiper />
    <IconList />
    <MusicList />
  </div>
</template>

<script>
import topNav from "../components/Home/topNav.vue";
import HomeSwiper from "../components/Home/HomeSwiper.vue";
import IconList from "../components/Home/IconList.vue";
import MusicList from "../components/Home/MusicList.vue";

export default {
  name: "home",
  components: {
    topNav,
    HomeSwiper,
    IconList,
    MusicList,
  },
  setup() {},
};
</script>

<style>
</style>