// more/more_mv/more_mv.js
const API = require('../../API/api.js');
const app = getApp();
Component({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  properties: {
    sheetData: {
      type: Array,
      value: []
    },
    type: {
      type: String,
      value: ''
    }
  },

  methods: {
    handlePlayMv: function (e) {
      let mvId = e.currentTarget.dataset.id;
      wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
        url: `../../play/play_mv?id=${mvId}`
      })
    },
    handleSheet: function (e) {
      let sheetId = e.currentTarget.dataset.id;
      wx.navigateTo({                                 //获取到id带着完整url后跳转到moremore_songer页面
        url: `../more_list/more_list?id=${sheetId}&type=songList`
      })
    }
  },
  lifetimes:{
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
  }
})