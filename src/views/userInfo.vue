<template>
  <div class="container">
    <div class="userTopHandler">
      <svg class="icon" aria-hidden="true" @click="showLeftPopup">
        <use xlink:href="#icon-liebiao2"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        @click="this.$router.push('/search')"
      >
        <use xlink:href="#icon-search"></use>
      </svg>
    </div>
    <UserIntroduce :profile="profile" />
    <UserPlayList :profile="profile" />
    <van-popup
      v-model:show="isShowUserTopPopup"
      position="left"
      @click-overlay="closeLeftPopup"
      :style="{ width: '5rem', height: '100%' }"
      ><UserPopupLeft
    /></van-popup>
  </div>
</template>

<script>
import UserPopupLeft from "@/components/UserLeft/UserPopupLeft";
import UserPlayList from "@/components/UserLeft/userPlayList";
import UserIntroduce from "@/components/UserLeft/UserIntroduce.vue";
import { mapState, mapMutations } from "vuex";
import { getuserInfo } from "@/request/api/login.js";
export default {
  name: "userinfo",
  data() {
    return {
      profile: {},
    };
  },
  components: { UserPopupLeft, UserPlayList, UserIntroduce },
  computed: {
    ...mapState(["isShowUserTopPopup"]),
  },
  methods: {
    ...mapMutations(["updataUserTopPopup"]),
    // 点击用户界面左上角图表展示弹出层
    showLeftPopup() {
      this.updataUserTopPopup(true);
    },
    closeLeftPopup() {
      this.updataUserTopPopup(false);
    },
    // 根据账户id获取用户信息
    async getUserInfos() {
      const accountId = localStorage.getItem("AccoutId");
      let result = await getuserInfo(accountId);
      // console.log(result, "userInfoResult");
      this.profile = result.data.profile;
      localStorage.setItem("userInfo", JSON.stringify(result.data.profile));
    },
  },
  mounted() {
    this.getUserInfos();
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0.3rem;
  background-color: #e0dede;
  .userTopHandler {
    display: flex;
    justify-content: space-between;
  }
}
</style>