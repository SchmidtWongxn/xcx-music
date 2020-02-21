// more/more_sheet/more_sheet.js
const API = require('../../API/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheetList: [],
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    if (options.type === 'mv') {
      this.getNewMv();
    } else if(options.type === 'songList') {
      this.getSongList();
    }
    
  },
  getNewMv: function () {
    API.getNewMv({}).then(res => {
      wx.hideLoading();
      if (res.code === 200) {
        this.setData({
          sheetList: res.data
        })
      }
    })
  },
  getSongList: function () {
    API.getsongsheet({
      order: 'hot'
    }).then(res => {
      wx.hideLoading()
      if (res.code === 200) {
        // console.log(res.playlists)
        this.setData({
          sheetList: res.playlists
        })
      }
    })
  }
})