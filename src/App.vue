<template>
  <router-view></router-view>
  <FooterMusical v-show="$store.state.isShowFooterBar" />
  <Nav v-show="$store.state.isShowFooterBar" />
</template>
<script>
import FooterMusical from "./views/FooterMusical";
import Nav from "./views/Nav.vue";

export default {
  components: { FooterMusical, Nav },
  created() {
    window.addEventListener("beforeunload", () => {
      console.log("123");
      sessionStorage.removeItem("store");
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      console.log("456");
    });
    // console.log(store, "newstore");

    this.$store.replaceState(
      Object.assign(
        {},
        this.$store.state,
        JSON.parse(sessionStorage.getItem("store"))
      )
    );
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
</style>
