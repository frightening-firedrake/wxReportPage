// pages/logs/record/record.js


var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: "all",
    result: [],
    resultlist: ""
  },
  details: function(e) {
    wx.navigateTo({
      url: 'details/rescorddetails?result=' + JSON.stringify(e.currentTarget.dataset.result),
    })
  },
  setstatus: function(e) {
    var str = new Date()
    var data = str.getDate() < 10 ? "0" + str.getDate() : str.getDate()
    var year = str.getFullYear()
    var month = str.getMonth() + 1
    switch (e.currentTarget.dataset.status) {
      case "mouth":
        month = (month - 2) < 10 ? "0" + (month - 2) : month - 2
        if (month < 0) {
          year -= 1
          month = 1
        }
        break;
      case "year":
        year -= 1
        break;
      case "all":
        break;
    }
    str = `${year}-${month}-${data}`
    var newlist = this.data.result.filter((v, i) => {
      if (e.currentTarget.dataset.status == "all") {
        return v
      } else {
        return v.createTime >= str
      }
    })
    newlist.sort((a, b) => {
      return a.createTime > b.createTime
    })
    newlist.reverse()
    this.setData({
      status: e.currentTarget.dataset.status,
      resultlist: newlist
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // http://192.168.1.253:8081/reportingSystem/information/get
    app.getstorage("userInfo").then(res => {
      app.post("wechat/getInformation", {
        openId: res.openid
      }).then(res => {
        if (res.data == 0) {
          res.data = []
        } else {
          res.data.sort((a, b) => {
            return a.createTime > b.createTime
          })
          res.data.reverse()

        }
        that.setData({
          result: res.data,
          resultlist: res.data
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