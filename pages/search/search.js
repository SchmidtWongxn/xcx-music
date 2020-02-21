// pages/search/search.js
const API = require('../../API/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,//输入框输入的值
    showView: true,//组件的显示与隐藏
    hotsongs: [],//热门音乐
    searchKey: [],
    searchsuggest: [],
    history: [],
    showsongresult: true,
    searchresult:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.gethotsongs();//加载页面完成调用gethotsongs方法
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      history: wx.getStorageSync("history") || []
    })
  },
 
  // input失去焦点函数
  routeSearchResPage: function (e) {
    let history = wx.getStorageSync('history') || [];
    history.push(this.data.searchKey);
    wx.setStorageSync("history", history);
  },
  // 搜索完成点击确认
  searchover: function () {
    let that = this;
    that.setData({
      showsongresult: false
    })
    that.searchResult();
  },
  clearInput: function() {
    this.setData({
      inputValue: ''
    })
  },
  clearHistory: function () {
    const that = this;
    wx.showModal({
      content: '确认清空全部历史记录',
      cancelColor: '#DE655C',
      confirmColor: '#DE655C',
      success(res) {
        if (res.confirm) {
          that.setData({
            history: []
          })
          wx.setStorageSync("history", []) //把空数组给history,即清空历史记录
        } else if (res.cancel) {
        }
      }
    })
  },
  //获取input文本并且实时搜索,动态隐藏组件
  getSearchKey: function(e) {
    console.log(e)
    let that = this;
    if (e.detail.cursor != that.data.cursor) { //实时获取输入框的值
      that.setData({
        searchKey: e.detail.value
      })
    }
    if (e.value != "") { //组件的显示与隐藏
      that.setData({
        showView: false
      })
    } else {
      that.setData({
        showView: ""
      })
    }
    if (e.detail.value != "") { //解决 如果输入框的值为空时，传值给搜索建议，会报错的bug
      that.searchSuggest();
    }  
  },
  searchSuggest: function() {
    API.searchSuggest({ keywords: this.data.searchKey, type: 'mobile' }).then(res => {
      if (res.code === 200) {
        this.setData({
          searchsuggest: res.result.allMatch
        })
      }
    })
  },
  //实现取消功能，停止搜索，返回首页
  cancel: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  gethotsongs: function() {
    API.gethotsongs({type: 'new'}).then(res => {
      wx.hideLoading()
      if (res.code === 200) {  //严谨
        this.setData({
          hotsongs: res.result.hots
        })
      }
    })
  },
  // 点击热门搜索值或搜索历史，填入搜索框
  fill_value: function (e) {
   let that = this;
   that.setData({
     inputValue: e.currentTarget.dataset.value,
     showView: false,
     showsongresult: false, //给false值，隐藏搜索建议页面
     searchKey: e.currentTarget.dataset.value//点击吧=把值给searchKey,让他去搜索
   })
    that.searchResult(); //执行搜索功能
  },
  searchResult: function() {
    API.searchResult({ keywords: this.data.searchKey, type: 1, limit: 30, offset: 2 }).then(res => {
      if (res.code === 200) {
        var resultList = this.data.searchresult;
        var newResultList = resultList.concat(res.result.songs);
        this.setData({
          searchresult: newResultList
        })
      }
    })
  },
  handlePlayAudio: function(event) {
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../../play/play?id=${audioId}`
    })
  },
  onReachBottom: function() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading',
      duration: 2000
    })
    this.searchResult();
  }
})