//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
  data: {
    newMessage:false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  record: function() {
    wx.navigateTo({
      url: 'record/record'
    })
  },
  aboutus: function() {
    wx.navigateTo({
      url: 'about/aboutus'
    })
  },
  message:function(){
    wx.navigateTo({
      url: 'message/message'
    })
  },
  information: function() {
    wx.navigateTo({
      url: 'information/information'
    })
  },
  // getMessage(){
  //   console.log('开始连接')
  //   let socketOpen = false
  //   wx.connectSocket({
  //     url: app.globalData.configUrls + "newInformation"
  //   })

  //   wx.onSocketOpen( (res)=> {
  //     socketOpen = true
  //     sendSocketMessage()
  //   })

  //   function sendSocketMessage() {
  //     if (socketOpen) {
  //       wx.sendSocketMessage({
  //         openId: app.globalData.userInfo.openId
  //       })
  //     } else {

  //     }
  //   }
  //   wx.onSocketMessage((res)=>{
  //     console.log(res)
  //   })
  //   wx.onSocketError((err)=>{
  //     console.log('error',err)
  //   })
  //   wx.onSocketClose((close)=>{
  //     console.log('close')
  //   })
  // },
  getMessage2(){
    let that = this
    app.getstorage("userInfo").then(res => {
      app.post("newInformation", {
        openId: res.openid
      }).then(res => {
          that.setData({
            newMessage: res.data.success
          })
        

      })
    })
  },

  onLoad: function() {
    wx.showShareMenu({
      withShareTicket: true,
      success: function(res) {
        console.log(res)
      }
    })
    
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        // app.globalData.userInfo = res.userInfo
        // this.setData({
        //   userInfo: res.userInfo,
        //   hasUserInfo: true
        // })
        // console.log(res)

      }
    })
    // }
  },
  onShow(){
    this.getMessage2()
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})