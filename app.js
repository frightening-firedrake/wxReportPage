//app.js
App({
  onLaunch: function() {
    wx.authorize({
      scope: 'scope.userLocation',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问

      }
    })
    this.login()
    wx.showShareMenu({
      withShareTicket: true,
      success: function(res) {
        // console.log(res)
      }
    })
  },
  login() {
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/token',
    //   data: { "grant_type": "client_credential", "APPID": "wxd1597a21d6aaa3af", "secret": "d68a672fe901c05b33cb9cdd9326647d" },
    //   method: "GET",
    //   success: function (res) {
    //     var token = res.data.access_token
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token='+token,
    //       data: { "action_name": "QR_LIMIT_STR_SCENE", "action_info": { "scene": { "scene_str": "test" } } },
    //       method: "POST",
    //       success: function (res) {
    //         console.log(res)
    //       }
    //     })
    //   }
    // })
    // const that = this
    // this.post("loginWX", {
    //   userName: "admin",
    //   userPass: "asdf0987"
    // }).then(res => {
    //   that.globalData.token = res.data.user.token
    //   wx.getStorageInfo({
    //     success(res) {
    //       if (!res.userInfo) {
    //         that.globalData.state = false
    //       } else {
    //         that.globalData.state = true
    //       }
    //     }
    //   })
    // })
  },
  post(url, data, header = {}) {
    wx.showLoading({
      title: "加载中",
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.configUrl + url,
        data: data,
        method: "POST",
        // application/x-www-form-urlencoded
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization": this.globalData.token
        },
        success: function(res) {
          wx.hideLoading()
          resolve(res)
        },
        fail: function(err) {
          wx.hideLoading()
          reject(err)
        }
      })
    })

  },
  catchpost(url, data, header = {}) {
    wx.showLoading({
      title: "加载中",
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: "https://report.ityyedu.com/reportingSystem/" + url,
        data: data,
        method: "POST",
        // application/x-www-form-urlencoded
        header: {
          "content-type": "application/x-www-form-urlencoded",
          "Authorization": this.globalData.token
        },
        success: function(res) {
          wx.hideLoading()
          resolve(res)
        },
        fail: function(err) {
          wx.hideLoading()
          reject(err)
        }
      })
    })

  },
  get(url, data = "") {
    wx.showLoading({
      title: "加载中",
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.globalData.configUrl + url,
        data: data,
        method: "GET",
        header: {
          "Authorization": this.globalData.token
        },
        // application/x-www-form-urlencoded
        success: function(res) {
          wx.hideLoading()
          resolve(res)
        },
        fail: function(err) {
          wx.hideLoading()
          reject(err)
        }
      })
    })
  },
  getstorage(key) {
    let that = this
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: key,
        success(res) {
          if (res.data.openid.code == "1000000") {
            // that.login()
            that.setopenid()
          } else {
            resolve(res.data)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })

  },
  setopenid: function() {
    let that = this
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          // let params = {
          //   appid: "wx05dd96e3e0d5a7fb",
          //   secret: "0e6dda534ca661ac1f799a7b4f154a8c",
          //   js_code: res.code,
          //   grant_type: "authorization_code"
          // }
          // console.log(res) //code
          // wx.request({
          //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx05dd96e3e0d5a7fb&secret=d6aae1ffc685b60fbc7a8b848514108f&js_code=' + res.code + '&grant_type=authorization_code',
          //   success: function(res) {
          //     console.log(res)
          //   }
          // })
          let params = {
            code: res.code,
          }

          // that.get("wechat/userInfo", params).then(res => {
          that.get("getOpenId", params).then(res => {
            if (res.data) {
              that.globalData.userInfo = {
                openid: res.data
              }
              wx.setStorage({
                key: "userInfo",
                data: {
                  openid: res.data
                }
              })
              resolve(that.globalData.userInfo)
            }
          }).catch(e => {
            reject(e)
          })
        }
      })
    })

  },
  globalData: {
    userInfo: null,
    state: false,
    configUrl: "https://report.ityyedu.com/reportingSystem/wechat/",
    uploadUrl: 'https://report.ityyedu.com/reportingSystem/',
    // configUrls: "ws://report.ityyedu.com/reportingSystem/wechat/",
    // configUrl: 'https://192.168.1.244:8443/reportingSystem/wechat/',
    // configUrls: 'ws://192.168.1.244:8085/reportingSystem/wechat/',
    // uploadUrl: 'https://192.168.1.244:8085/reportingSystem/',
    // configUrl: 'http://192.168.1.244:8085/reportingSystem/wechat/',
    // uploadUrl: 'http://192.168.1.244:8085/reportingSystem/',
    token: ""
  }
})