// play/play.js
const API = require('../API/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    innerAudioContext: {},
    isPlay: '',
    history_songId: [],
    song: [],
    songid: [],
    showLyric: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.play(options.id);
  },
  play: function(audioid) {
    app.globalData.songId = audioid;  //让每一个要播放的歌曲ID给全局变量的songId
    const innerAudioContext = wx.createInnerAudioContext();
    this.setData({
      innerAudioContext,
      isPlay: true
    })
    API.getSongUrl({id: audioid}).then(res => {
      if(res.code === 200) {
        if(!res.data[0].url) {
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          this.createBgAudio(res.data[0]);
        }
      }
    })
    API.getSongDetail({ids: audioid}).then(res => {
      if (res.songs.length === 0) {
        // console.log('无法获取到资源')
        wx.showModal({
          content: '服务器开了点小差~~',
          cancelColor: '#DE655C',
          confirmColor: '#DE655C',
          showCancel: false,
          confirmText: '返回',
          complete() {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        })
      } else {
        this.setData({
          song: res.songs[0],  //获取到歌曲的详细内容，传给song
        })
        // console.log(res.data.songs[0].name)
        app.globalData.songName = res.songs[0].name;
      }
    })
  },
  createBgAudio: function (res) {
    const bgAudioManage = wx.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage
    app.globalData.bgAudioManage = bgAudioManage;         //把实例bgAudioManage(背景音频管理器) 给 全局
    bgAudioManage.title = 'title';                        //把title 音频标题 给实例
    bgAudioManage.src = res.url;                          // res.url 在createBgAudio 为 mp3音频  url为空，播放出错
    // console.log(res)

    const history_songId = this.data.history_songId
    const historySong = {
      id: app.globalData.songId,
      songName: app.globalData.songName
    }
    history_songId.push(historySong)
    bgAudioManage.onPlay(res => {                         // 监听背景音频播放事件
      this.setData({
        isPlay: true,
        history_songId
      })
    });

    bgAudioManage.onEnded(() => {                  //监听背景音乐自然结束事件，结束后自动播放下一首。自然结束，调用go_lastSong()函数，即歌曲结束自动播放下一首歌
      this.go_lastSong();

    })
    wx.setStorageSync('historyId', history_songId); //把historyId存入缓存
  },
  go_lastSong() {
    let that = this;
    let lastSongId = app.globalData.waitForPlaying;
    let songId = lastSongId[Math.floor(Math.random() * lastSongId.length)];
    that.data.songid = songId;
    that.play(songId);
    app.globalData.songId = songId;
  },
  // 点击切换歌词和封面
  showLyric: function() {
    const { showLyric } = this.data;
    this.setData({
      showLyric: !showLyric
    })
  },
  //播放暂停
  handleToggleBGAudio: function() {
    const bgAudioManage = app.globalData.bgAudioManage;
    let { isPlay } = this.data;
    if(isPlay) {
      bgAudioManage.pause();
    } else {
      bgAudioManage.play();
    }
    this.setData({
      isPlay: !isPlay
    });
    console.log(this.data.isPlay)
  }
})
