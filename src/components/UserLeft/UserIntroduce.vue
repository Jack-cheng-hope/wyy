<template>
  <div class="userbox">
    <img class="userImg" :src="profile.avatarUrl" alt="" />
    <div class="username">
      <span>{{ profile.nickname }}</span>
    </div>
    <div class="levelinfo">
      <span>1 关注</span> | <span>0 粉丝</span>|
      <span>lv 0</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "userIntroduce",
  props: ["profile"],
  mounted() {
    console.log(123);
  },
};
</script>

<style lang="less" scoped>
.userbox {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 2rem;
  background-color: #fff;
  margin-top: 1rem;
  border-radius: 0.2rem;
  // 背景阴影
  box-shadow: 0px 0px 4px #cdcbcb;
  .userImg {
    position: absolute;
    top: -50%;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
  .username {
    width: 100%;
    padding: 0.2rem;
    margin-top: 0.5rem;
    text-align: center;
    span {
      font-size: 0.32rem;
      font-weight: 700;
    }
  }
  .levelinfo {
    width: 50%;
    display: flex;
    justify-content: space-around;
    color: gray;
    span {
      font-size: 0.28rem;
    }
  }
}
</style>