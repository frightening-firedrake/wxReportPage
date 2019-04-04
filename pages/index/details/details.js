// pages/index/details/details.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.configUrl,
    type: "",
    content: {
      type: {
        h1: "",
        img: "",
        text: []
      },
      secrecy: {
        img: "",
        h1: "",
        text: []
      },
      reward: {
        h1: "",
        img: "",
        text: []
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      type: options.type
    })
    app.post("wechat/findAllContent").then(res => {
      let respon = res.data
      respon.forEach((v, i) => {
        let params = {}
        let str
        v.textContent = v.textContent.split("<br>")
        // console.log(v)
        switch (v.type) {
          case 1:
            str = "content.type";
            break;
          case 2:
            str = "content.secrecy";
            break;
          case 3:
            str = "content.reward"
            break;
        }
        params[str] = {
          'h1': v.title,
          'img': `${app.globalData.configUrl}${v.image}`,
          'text': v.textContent
        }
        that.setData(params)
      })

    }, err => {
      // console.log(err)
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

  },
  select(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
    wx.setNavigationBarTitle({
      title: e.currentTarget.dataset.name
    })
  }
})