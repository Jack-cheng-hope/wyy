<template>
  <div class="commentTop">
    <div class="left">
      <div class="totalComment">
        <span>评论({{ total }})</span>
      </div>
    </div>
    <div class="right">
      <div class="list">
        <span class="active">推荐</span> | <span>最热</span> | <span>最新</span>
      </div>
    </div>
  </div>
  <div class="commentContent">
    <div class="item" v-for="item in comments" :key="item.commentId">
      <div class="userinfo">
        <div class="user">
          <img :src="item.user.avatarUrl" alt="" />
          <div class="info">
            <span class="nickname">{{ item.user.nickname }}</span>
            <span class="time">{{ item.timeStr }}</span>
          </div>
        </div>
        <div class="subContent">
          <span>1111</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tubiaozhizuomoban-"></use>
          </svg>
        </div>
      </div>
      <div class="comment">
        <span>{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMvCommentData } from "@/request/api/mv";
export default {
  name: "comment",
  data() {
    return {
      comments: [],
      total: 0,
    };
  },
  mounted() {
    console.log(this.$store);
    const mvid = this.$store.state.video.id;
    this.getMvComment(mvid);
  },
  methods: {
    async getMvComment(mvid) {
      const res = await getMvCommentData(mvid);
      console.log(res);
      this.comments = res.data.comments;
      this.total = res.data.total;
    },
  },
};
</script>

<style lang='less' scoped>
.commentTop {
  position: fixed;
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  .left {
    .totalComment {
      font-weight: 700;
    }
  }
  .right {
    .active {
      font-weight: 700;
    }
  }
}
.commentContent {
  width: 100%;
  padding: 0.2rem;
  margin-top: 1rem;
  .item {
    .userinfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user {
        display: flex;
        img {
          width: 40px;
          border-radius: 50%;
        }
        .info {
          display: flex;
          flex-direction: column;
          margin-left: 0.2rem;
          .nickname {
            font-size: 0.28rem;
          }
          .time {
            font-size: 0.24rem;
            margin-top: 0.1rem;
            color: rgb(114, 114, 114);
          }
        }
      }
      .subContent {
        display: flex;
        align-items: center;
        color: #999;
        .icon {
          fill: #999;
        }
      }
    }
    .comment {
      margin: 10px 0 10px 1rem;
    }
  }
}
</style>