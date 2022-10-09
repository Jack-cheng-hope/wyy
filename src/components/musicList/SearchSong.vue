<template>
  <div class="songList">
    <div
      class="item"
      v-for="(song, index) in songlist"
      :key="song.al.id"
      @click="playsong(index)"
    >
      <div class="itemLeft">
        <span>{{ index + 1 }}</span>
        <div class="song">
          <p>{{ song.al.name }}</p>
          <span>{{ song.name }}</span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true" v-show="song.mv">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao2"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchsong",
  props: ["songlist"],

  methods: {
    playsong(index) {
      // alert(1);
      //   console.log(store);
      this.$store.commit("updataSongList", this.songlist);
      this.$store.commit("updataSongIndex", index);
      console.log("play");
    },
  },
};
</script>

<style lang="less">
.songList {
  width: 100%;
  margin-top: 0.2rem;
  .item {
    display: flex;
    width: 100%;
    // background-color: pink;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid #ccc;
    margin: 0.2rem 0;
    .itemLeft {
      display: flex;
      align-items: center;
      span {
        padding-right: 0.2rem;
      }
      .song {
        p {
          font-size: 14px;
          font-weight: 600;
        }
        span {
          font-size: 0.24rem;
          color: gray;
          padding-top: 0.1rem;
        }
      }
    }
    .itemRight {
      display: flex;
      .icon {
        margin: 0 0.1rem;
        width: 0.4rem;
        height: 0.4rem;
      }
    }
  }
}
.item:nth-last-child(1) {
  margin-bottom: 1.2rem;
}
</style>