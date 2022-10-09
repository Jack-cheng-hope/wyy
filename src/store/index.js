import { createStore } from 'vuex'
import { getlyric } from '@/request/api/musical.js'
import { login } from '@/request/api/login.js'

export default createStore({
  state: {
    songList: [{
      al: {
        id: 96935136,
        name: "不配擁有愛情",
        pic: 109951165398822860,
        picUrl: "https://p2.music.126.net/9iUofnl-0xzaEOSx3PCOUA==/109951165398822871.jpg",
        pic_str: "109951165398822871"
      },
      id: 1293886117
    }],
    songIndex: 0,
    isPause: true,
    isShowPopup: false,
    lyrics: {},
    isLryShow: true,
    currentTime: 0, //播放歌曲的当前时间
    durationTime: 0,//音乐总时长
    isLogin: false,//判断是否登录
    isShowFooterBar: true,//判断底部组件是否显示
    isNavShow: true,
    token: '', //保存登录的tokwen
    userInfo: {},


    // 用户账户id
    userAccoutId: 0,
    // userState
    isShowUserTopPopup: false,
    // 用户创建歌单
    creatSongList: [],
    // 歌曲mv
    video: {},
    // mv信息
    videoData: {},


    // 请求歌单列表
    requestSongList: {},

    // 控制歌单显示隐藏
    isShowPlaylist: false
  },
  getters: {
  },
  mutations: {
    updataRequestSongList(state, value) {
      state.requestSongList = value;
    },
    // 保存视频mv
    updatavideo(state, value) {
      state.video = value
      console.log(value)
    },
    updatavideoData(state, value) {
      state.videoData = value
    },
    // 提交用户创建的歌单
    updataUserCreateSong(state, value) {
      state.creatSongList = value;
    },
    // 控制歌单显示隐藏
    updataShowPlaylist(state, value) {
      state.isShowPlaylist = value;
    },
    // 保存获取的账户id
    updataUserAccoutId(state, value) {
      state.userAccoutId = value;
    },
    updataUserTopPopup(state, value) {
      state.isShowUserTopPopup = value;
    },
    // 保存音月总时长
    updatadurationTime(state, value) {
      // console.log(value);
      state.durationTime = value;
    },
    // 获取当前歌曲的播放时间
    updataCurrentTime(state, value) {
      state.currentTime = value
      // console.log(state.currentTime);
    },
    updataIsPause(state, value) {
      state.isPause = value;
    },
    updataSongList(state, value) {
      state.songList = value;
      console.log(value, 'store')
    },
    updataSongIndex(state, value) {
      state.songIndex = value;
      console.log(value, 'store7');
    },
    changeShowpopup(state) {
      state.isShowPopup = !state.isShowPopup;
    },
    // 底部导航栏是否显示
    changeNavshow(state) {
      state.isNavShow = !state.isNavShow;
    },
    GETLYRIC(state, value) {
      state.lyrics = value;
    },
    changeLryShow(state) {
      state.isLryShow = !state.isLryShow;
    },
    updataIsLogin(state, value) {
      state.isLogin = value;
    },
    updataToken(state, value) {
      state.token = value;
      localStorage.setItem("token", value);
    },
    //保存用户信息
    updataUserInfo(state, value) {
      state.userInfo = value
    },


    // 页面刷新时保存state
    saveState(state, value) {
      state = value
    }
  },
  actions: {
    getlyrics: async function (context, value) {
      let res = await getlyric(value)
      // console.log(res.data.lrc.lyric);
      // console.log(123);
      // console.log(context);
      context.commit('GETLYRIC', res.data.lrc)
    },

    async userLogin(context, value) {
      const number = value.phoneNum
      const password = value.password
      // console.log(number, password);
      let res = await login(number, password)
      // console.log(res)
      // 将结果返回到login界面
      return res
    },

  },

})


