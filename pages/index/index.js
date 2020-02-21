//index.js
//获取应用实例
const app = getApp();
let half, quarter;
const API = require('../../API/api.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    slideOffset: 0,
    indicatorDots: true,
    indicatorcolor: '#ffffff',
    indicatoractivecolor: '#DC4238',
    autoplay: true,
    interval: 4500,
    duration: 1700,
    circular: true,
    banner: [],
    newsong: [],
    songsheet: [],
    recommend_MV: [],
    dj: [],
    newest: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        half = res.windowWidth / 2;
        quarter = res.windowWidth / 2 / 2;
        that.setData({
          slideOffset: quarter - 14
        })
      },
    });
    this.getBanner();
    this.getNewSong();
    this.getSongSheet();
    this.getRecommandMV();
    this.getDjRadios();
    this.getNewest();
  },
  go_search: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  getBanner: function() {
    API.getBanner({type: 2}).then(res => {
      if(res.code === 200) {
        this.setData({
          banner: res.banners
        })
      }
    })
  },
  handleAudioPlay: function(event) {
    let audioid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../../play/play?id=${audioid}`,
    })
  },
  changeline: function(e) {
    // console.log(e.detail.current);
    if (!e.detail.current || e.detail.current === 0) {
      this.setData({
        slideOffset: quarter - 14
      })
    }
    if (e.detail.current === 1) {
      this.setData({
        slideOffset: (quarter - 14) + half
      })
    }
  },
  go_mv: function() {
    wx.navigateTo({
      url: '../../more/more_sheet/more_sheet?type=mv',
    })
  },
  go_songer: function() {
    wx.navigateTo({
      url: '../../more/more_songer/more_songer',
    })
  },
  go_songSheet: function() {
    wx.navigateTo({
      url: '../../more/more_sheet/more_sheet?type=songList',
    })
  },
  go_toplist: function () {
    wx.navigateTo({
      url: '../../more/more_toplist/more_toplist',
    })
  },
  getNewSong: function() {
    API.getNewSong({}).then(res => {
      if (res.code === 200) {
        let data = res.result.slice(0, 6);
        let mapSet = [];
        data.forEach(item => {
          let map = {};
          map.id = item.id;
          map.picUrl = item.song.album.picUrl;
          map.name = item.name;
          map.artist = item.song.artists[0].name;
          mapSet.push(map);
        })
        this.setData({
          newsong: mapSet
        })
      }
    })
  },
  getSongSheet: function() {
    API.getsongsheet({
      order: 'hot'
    }).then(res => {
      if (res.code === 200) {
        let data = res.playlists.slice(0, 6)
        let mapSet = [];
        data.forEach(item => {
          let map = {};
          map.id = item.id;
          map.picUrl = item.coverImgUrl;
          map.name = item.name;
          mapSet.push(map);
        })
        this.setData({
          songsheet: mapSet
        })
      }
    })
  },
  getRecommandMV: function () {
    API.getRecommendMV({}).then(res => {
      if (res.code === 200) {
        let data = res.result.slice(0, 4);
        let mapSet = [];
        data.forEach(item => {
          let map = {};
          map.id = item.id;
          map.picUrl = item.picUrl;
          map.name = item.name;
          map.artist = item.artistName;
          mapSet.push(map);
        })
        this.setData({
          recommend_MV: mapSet
        })
      }
    })
  },
  getDjRadios: function () {
    API.getDjRadios({}).then(res => {
      let data = res.djRadios.slice(0, 6);
      let mapSet = [];
      data.forEach(item => {
        let map = {};
        map.id = item.id;
        map.picUrl = item.picUrl;
        map.name = item.name;
        mapSet.push(map);
      })
      this.setData({
        dj: mapSet
      })
    })
  },
  getNewest: function () {
    API.getNewEst({}).then(res => {
      if (res.code === 200) {
        let data = res.albums.slice(4, 10);
        let mapSet = [];
        data.forEach(item => {
          let map = {};
          map.id = item.id;
          map.picUrl = item.picUrl;
          map.name = item.name;
          item.artist = item.artist.name;
          mapSet.push(map);
        })
        this.setData({
          newest: mapSet
        })
      }
    })
  }
})
