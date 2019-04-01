// pages/logs/message/message.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: ""
  },
  details: function (e) {
    wx.navigateTo({
      url: '/pages/logs/record/details/rescorddetails?result=' + JSON.stringify(e.currentTarget.dataset.result)
      // url: "details/rescorddetails?id=" + e.currentTarget.dataset.id + "&state=" + e.currentTarget.dataset.state
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getstorage("userInfo").then(res => {
      let params = {
        openId: res.openid
      }
      app.post("updateReadState", params).then(res => {
        console.log(res)
        let information = res.data.filter((i, v) => {
          return i.state != -1
        })
        this.setData({
          information: information
        })
      })
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})