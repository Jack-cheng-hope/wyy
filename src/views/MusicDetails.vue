<template>
  <PlayList />
  <MusicLists />
</template>

<script>
import PlayList from "@/components/Detail/PlayList.vue";
import MusicLists from "@/components/Detail/MusicLists.vue";

export default {
  name: "musicDetails",
  components: { PlayList, MusicLists },
};
</script>

<style>
</style>