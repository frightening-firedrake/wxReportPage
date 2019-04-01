// pages/logs/record/record.js


var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 200 + 9 + 23
  },
  details: function(e) {
    wx.navigateTo({
      url: 'details/rescorddetails?result=' + JSON.stringify(e.currentTarget.dataset.result)
      // url: "details/rescorddetails?id=" + e.currentTarget.dataset.id + "&state=" + e.currentTarget.dataset.state
    })
  },
  setstatus: function(e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // http://192.168.1.253:8081/reportingSystem/information/get
    app.getstorage("userInfo").then(res => {
      app.post("getInformation", {
        openId: res.openid
      }).then(res => {
        let data = res.data
        this.setData({
          height: 190 * data.length + 25+23,
          content: data
        })
        //  res.data

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

  }
})