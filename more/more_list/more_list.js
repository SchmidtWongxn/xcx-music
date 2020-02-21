// more/more_list/more_list.js
const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();
const API = require('../../API/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    let sheetId = options.id;
    if(options.type === 'moreSonger') {
      this.getSearchSongList(sheetId);
    } else if (options.type === 'songList') {
      this.getSongList(sheetId);
    } else if (options.type === 'toplist') {
      this.getToplist(sheetId);
    }
  },
  getSearchSongList: function (sheetId) {
    wx.request({
      url: API_BASE_URL + '/artists',
      data: {
        id: sheetId
      },
      success: res => {
        const waitForPlay = new Array;
        for (let i = 0; i <= res.data.hotSongs.length - 1; i++) { //循环打印出其id
          waitForPlay.push(res.data.hotSongs[i].id) //循环push ID 到waitForPlay数组
          app.globalData.waitForPlaying = waitForPlay  //让waitForPlay数组给全局数组
          // console.log(app.globalData.waitForPlaying)
        }
        wx.hideLoading()
        console.log(res.data.hotSongs)
        this.setData({
          songList: res.data.hotSongs
        })
      }
    })
  },
  getSongList: function (sheetId) {
    wx.request({
      url: API_BASE_URL + '/playlist/detail',
      data: {
        id: sheetId    //http://neteasecloudmusicapi.zhaoboy.com/song/url?id=xxx,id为必选参数
      },
      success: res => {
        // console.log(res.data.playlist.trackIds) //打印出歌曲ID数组
        // console.log(res.data.playlist.trackIds.length) //打印出歌曲ID数组长度

        // console.log(res.data.playlist.trackIds[i].id)
        const waitForPlay = new Array;
        for (let i = 0; i <= res.data.playlist.trackIds.length - 1; i++) { //循环打印出其id
          waitForPlay.push(res.data.playlist.trackIds[i].id) //循环push ID 到waitForPlay数组
          app.globalData.waitForPlaying = waitForPlay  //让waitForPlay数组给全局数组
          // console.log(app.globalData.waitForPlaying)
        }
        wx.hideLoading()
        this.setData({
          songList: res.data.playlist.tracks
        })
      }
    })
  },
  getToplist: function (index) {
    API.getTopList({
      idx: index,
    }).then(res => {
      const waitForPlay = new Array;
      for (let i = 0; i <= res.playlist.trackIds.length - 1; i++) { //循环打印出其id
        waitForPlay.push(res.playlist.trackIds[i].id) //循环push ID 到waitForPlay数组
        app.globalData.waitForPlaying = waitForPlay  //让waitForPlay数组给全局数组
        // console.log(app.globalData.waitForPlaying)
      }
      wx.hideLoading()
      console.log(res.playlist)
      this.setData({
        songList: res.playlist.tracks
      })
    })
  }
})