// pages/index/report/report.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    timedis: false,
    textcontent: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let t,
      that = this
    app.post("findAllNotice").then(res => {
      this.setData({
        textcontent: res.data[0].textContent
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  checkboxChange: function(e) {
    if (e.detail.value[0] == '1') {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  submit() {
    wx.navigateTo({
      url: 'details/details',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  }
})