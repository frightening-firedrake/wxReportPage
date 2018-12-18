// pages/logs/record/details/rescorddetails.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: [{
      slot: "举报反馈",
      form: [{
          label: "举报时间:",
          reqvalue: "",
          disabled: true,
          name: "createTime",
          type: ""
        },
        {
          label: '行业领域:',
          reqvalue: "",
          disabled: true,
          name: "industryField",
          type: ""
        }, {
          label: "举报种类:",
          reqvalue: "",
          disabled: true,
          name: "informType",
          type: "textarea",
          height: "260rpx",
        }, {
          label: "线报地域:",
          reqvalue: "",
          disabled: true,
          name: "threadArea",
          type: ""
        }, {
          label: "状态:",
          reqvalue: "",
          disabled: true,
          name: "state",
          type: ""
        }, {
          label: "反馈信息:",
          reqvalue: "",
          disabled: true,
          name: "feedbackInformation",
          type: "textarea",
          height: "260rpx",
        }
      ]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let params = JSON.parse(options.result)
    let state = ""
    this.data.form.forEach((v, i) => {
      v.form.forEach((v, i) => {
        for (var i in params) {
          if (i == v.name) {
            if (v.name == "state") {
              switch (params[v.name]) {
                case -1:
                  state = "待审核"
                  break;
                case 1:
                  state = "已接案"
                  break;
                case 2:
                  state = "侦办中"
                  break;
                case 3:
                  state = "已结案"
                  break;
                case 4:
                  state = "未立案"
                  break;
              }
              console.log(state)
              v.reqvalue = state
            } else {
              v.reqvalue = params[v.name]
            }
          }
        }
      })
    })
    // console.log(this.data.form)
    this.setData({
      form: this.data.form
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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