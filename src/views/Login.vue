<template>
  <img src="@/assets/loginBg.jpg" alt="" />

  <div class="container">
    <div class="login-top">
      <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
        <use xlink:href="#icon-arrow-left"></use>
      </svg>
    </div>
    <!-- <input type="text" v-model="num" />
    <input type="password" v-model="psd" />
    <button @click="login">登录</button> -->
    <van-form class="login-form">
      <van-cell-group inset>
        <van-field
          v-model="num"
          name="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="psd"
          type="password"
          name="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          @click="login"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getuserInfo, login } from "@/request/api/login.js";
export default {
  data() {
    return {
      num: "",
      psd: "",
    };
  },
  methods: {
    async login() {
      // let res = await login(parseInt(this.num), this.psd);
      let res = await this.$store.dispatch("userLogin", {
        phoneNum: parseInt(this.num),
        password: this.psd,
      });

      console.log(res, "login~~~~~");
      if (res.data.code == 200) {
        this.$store.commit("updataIsLogin", true);
        // 保存token
        this.$store.commit("updataToken", res.data.token);
        // 保存cookie
        sessionStorage.setItem("cookie", res.data.cookie);
        this.$store.commit("updataUserAccoutId", res.data.account.id);
        // 保存用户账户id
        localStorage.setItem("AccoutId", res.data.account.id);
        this.$router.push("/userinfo");
      } else {
        alert("error");
      }
    },
  },
};
</script>

<style lang="less" scoped>
img {
  width: 100%;
  position: absolute;
  z-index: -1;
  // filter: blur(1px);
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 13rem;
  padding: 0.2rem;
  .login-top {
    width: 100%;
    fill: #fff;
  }
  .login-form {
    width: 100%;
    margin-bottom: 2rem;
    border: none;
    .van-cell {
      background: #cb3838 !important;
      // opacity: 0.6;
    }
    .van-button {
      background-color: red;
      border: none;
    }
  }
  // background: url("@/assets/loginBg.jpg");
}
</style>