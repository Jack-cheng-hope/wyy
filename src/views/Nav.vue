<template>
  <div class="footerNav" :style="{ display: isNavShow }">
    <div class="navItem">
      <svg class="icon" aria-hidden="true" @click="this.$router.push('/')">
        <use xlink:href="#icon-yinle2"></use>
      </svg>
      <span class="active">发现</span>
    </div>
    <div class="navItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-radio"></use>
      </svg>
      <span>博客</span>
    </div>
    <div class="navItem">
      <svg
        class="icon"
        aria-hidden="true"
        @click="this.$router.push('/userinfo')"
      >
        <use xlink:href="#icon-yinle1"></use>
      </svg>
      <span>我的</span>
    </div>
    <div class="navItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wodeguanzhu"></use>
      </svg>
      <span>关注</span>
    </div>
    <div class="navItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontshequ"></use>
      </svg>
      <span>社区</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "nav",
  data() {
    return {
      isNavShow: "",
    };
  },
  computed: {
    ...mapState(["isNavShow"]),
  },
};
</script>

<style lang="less" scoped>
.footerNav {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.2rem 0.5rem;
  background-color: #fff;
  //   background-color: pink;
  .navItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 0.6rem;
      fill: #999;
      border-radius: 50%;
      padding: 0.04rem;
    }
    span {
      font-size: 14px;
    }
  }
  //   .active {
  //     color: rgb(245, 71, 71);
  //     fill: #fff;
  //     // background-color: rgb(245, 71, 71);
  //   }
}
</style>