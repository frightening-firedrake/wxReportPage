//index.js
var app = getApp()

Page({
  data: {
    show: false,
  },
  onLoad: function(options) {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          app.getstorage("userInfo").then(res => {
            if (res.openid == "") {
              app.setopenid()
              wx.hideTabBar()
              that.setData({
                show: true
              })
            }
          }).catch(e => {
            wx.hideTabBar()
            that.setData({
              show: true
            })
          })
        } else {
          wx.hideTabBar()
          that.setData({
            show: true
          })
        }
      }
    })
  },
  onGotUserInfo(e) {
    let that = this
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      wx.showModal({
        title: '提示',
        content: "由于您没有对该平台授权,后续功能不能使用",
        showCancel: true,
        success() {
          // wx.showTabBar()
          // that.setData({
          //   show: false
          // })
        }
      })
    } else {
      app.setopenid().then(res => {
        if (res.openid) {
          wx.showTabBar()
          that.setData({
            show: false
          })
        }
      }).catch(e => {
        that.setData({
          show: true
        })
      })
    }
    // console.log(er)
  },
  details: function(list) {
    var url = `details/details?type=${list.currentTarget.dataset.type}&name=${list.currentTarget.dataset.name}`
    wx.navigateTo({
      url: url
    })
  },
  report() {
    wx.navigateTo({
      url: 'report/report'
    })
  }
})