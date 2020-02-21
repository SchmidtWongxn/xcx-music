// more/more_songer/moremore_songer.js
const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();
Component({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  properties: {
    songList: {
      type: Array,
      value: []
    }
  },

  methods: {
    handleAudioPlay: function (event) {
      const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
      wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
        url: `../../play/play?id=${audioId}`
      })
    }
  }
})