<template>
  <div class="nav">
    <div class="left">
      <svg class="icon" aria-hidden="true" @click="showLeftPopup">
        <use xlink:href="#icon-liebiao2"></use>
      </svg>
    </div>
    <div class="topList" @click="goSearch">
      <input class="searchInput" type="text" placeholder="林俊杰" />
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-huatong"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { mapMutations } from "vuex";
export default {
  name: "topNav",
  methods: {
    ...mapMutations(["updataUserTopPopup"]),
    // 点击用户界面左上角图表展示弹出层
    showLeftPopup() {
      this.updataUserTopPopup(true);
    },
  },
  setup() {
    const Router = useRouter();

    function goSearch() {
      // console.log(123);
      Router.push("/search");
    }

    return { goSearch };
  },
};
</script>

<style lang='less' scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  .topList {
    display: flex;
    align-items: center;
    width: 80%;
    height: 100%;
    font-size: 0.3rem;
    .searchInput {
      width: 100%;
      height: 100%;
      background-color: rgb(235, 231, 231);
      text-align: center;
      border: none;
      border-radius: 0.6rem;
    }
  }
}
</style>