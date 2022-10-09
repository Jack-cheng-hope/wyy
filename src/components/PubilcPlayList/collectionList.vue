/** 
    收藏的歌单
*/
<template>
  <PlayListTop />
  <UserPlayListSongs />
</template>

<script>
import PlayListTop from "./PlayListTop.vue";
import UserPlayListSongs from "./UserPlayListSongs";

export default {
  name: "collectionList",

  components: { PlayListTop, UserPlayListSongs },
};
</script>

<style>
</style>