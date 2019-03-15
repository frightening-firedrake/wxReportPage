var app = getApp()

Page({
  data: {
    show: false,
    classitem: false,
    content: {},
    type: "",
    buttons: [],
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
  photo: function() {

  },
  details: function(e) {
    let that = this
    let type = e.currentTarget.dataset.type
    console.log(type)
    let buttons = [{
          label: "findAllKind",
          name: "举报种类"
        },
        {
          label: 'findAllSecrecy',
          name: "保密规定"
        },
        {
          label: "findAllAward",
          name: "奖励规定"
        }
      ],
      button
    app.post(type).then(res => {
      button = buttons.filter((v, i) => {
        return v.label != type
      }, true)
      res.data[0]['type'] = type
      that.setData({
        classitem: true,
        type: type,
        buttons: button,
        content: res.data[0]
      })
    }, err => {
      // console.log(err)
    })
  },
  close() {
    this.setData({
      classitem: false
    })
  },
  getfindall() {
    let that = this
    app.post("wechat/findAllContent").then(res => {
      let respon = res.data
      let str = {}
      respon.forEach((v, i) => {
        v.textContent = v.textContent.split("<br>")
        str[v.type] = {
          'type': v.type,
          'h1': v.title,
          'img': `${app.globalData.configUrl}${v.image}`,
          'text': v.textContent
        }
      })
      that.setData({
        content: str,
      })
    }, err => {
      // console.log(err)
    })
  },
  report() {
    wx.navigateTo({
      url: 'report/report'
    })
  }
})