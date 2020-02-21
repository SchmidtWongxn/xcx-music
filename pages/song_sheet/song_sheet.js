// pages/song_sheet/song_sheet.js
Component({

  /**
   * 页面的初始数据
   */
  data: {

  },

  properties: {
    sheetData: {
      type: Array,
      value: [],
      observer: function () {
        
      }
    },
    title: {
      type: String,
      value: ''
    },
    action: {
      type: String,
      value: ''
    }
  },
  methods:{
    go_newsong: function () {
      console.log(1111)
    },
    go_songsheet: function () {
      console.log(222)
    },
    go_mv: function () {
      console.log(333)
    },
    go_dj: function () {
      console.log(444)
    },
    go_newest: function () {
      console.log(5555)
    }

  }
})