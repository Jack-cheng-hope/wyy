/** 
    用户信息顶部左侧按钮弹出层
*/
<template>
  <div class="top">
    <div class="gologin">立即登录</div>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-shoucang"></use>
    </svg>
  </div>
  <div class="settingList">
    <div class="btn">
      <button @click="getStatus">获取登录状态</button>
      <button @click="userlogout">退出云音乐</button>
    </div>
  </div>
</template>

<script>
import { getuserStatus, logout } from "@/request/api/user";
export default {
  name: "userpopupleft",
  methods: {
    async getStatus() {
      let res = await getuserStatus();
      console.log(res);
    },
    async userlogout() {
      let res = await logout();
      console.log(res);
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      sessionStorage.removeItem("store");
      sessionStorage.removeItem("cookie");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1rem;
  background-color: #fff;
  // overflow: hidden;
  padding: 0.2rem;
}
.settingList {
  width: 100%;
  height: 3rem;
  background-color: #e8e6e6;
  padding: 0.2rem;
  border-radius: 0.4rem;
  margin: 0.2rem 0;
  .btn {
    display: flex;
    flex-direction: column;

    button {
      width: 100%;
      height: 0.7rem;
      border: none;
      margin: 0.2rem 0;
      background-color: #fff;
      border-radius: 0.4rem;
    }
    button:nth-last-child(1) {
      color: red;
    }
  }
}
</style>