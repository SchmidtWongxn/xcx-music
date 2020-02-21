// more/more_toplist/more_toplist.js
const API = require('../../API/api.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    toplist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading',
    })
    let list = [];
    for(let i = 0; i < 10; i++) {
      list.push(this.getTopList(i));
    }
    Promise.all(list).then((result) => {
      wx.hideLoading();
      this.setData({
        toplist: result
      })
    })
  },

  getTopList: function(index) {
    var that = this;
    return new Promise((resolve, reject) => {
      API.getTopList({
        idx: index,
      }).then(res => {
        resolve(res.playlist);
      })
    })
    
  },
  go_toplist: function(e) {
    let index = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../more_list/more_list?type=toplist&id=${index}`,
    })
  }
})