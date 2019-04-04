// pages/logs/information/information.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prodid: "",
    buttonhidden: false,
    Informer: false,    
    submitState: "saveInformer",
    form: {
      check: {
        name: "",
        phone: "",
        idCard: "",
        region: "",
      },
      formdata: [
        {
          model: "about",
          icon: "icon-guanliyuan",
          name: "个人基本信息",
          data: [
            {
              model: "name",
              placeholder: "请输入姓名",
            },
            {
              model: "phone",
              placeholder: "请输入手机号",
            },
            {
              model: "idCard",
              placeholder: "请输入身份证号",
            },
            {
              model: "region",
              require: true,
              name: "详细地址",
              type: "map"
            },
            {
              model: "code",
              name: "验证码",
              type: "code",
              require: true
            }
          ]
        }
      ]
    }
  },
  location(res) {
    this.setData({
      "form.check.region": res.detail.value
    })
  },
  text(res) {
    console.log(res)
    let data = {}
    data["form.check." + res.detail.value.type] = res.detail.value.value
    this.setData(data)
  },
  submit(e) {
    let data = e.detail.value
    app.getstorage("userInfo").then(res => {
      app.post(this.data.submitState, {
        openId: res.openid,
        informerName: data.name,
        idCard: data.idCard,
        phoneNumber: data.phone,
        address: data.region
      }).then(res => {
        if (res.data.success) {
          wx.showModal({
            title: "提示",
            content: "提交成功",
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        } else {
          wx.showModal({
            title: "提示",
            content: "提交失败",
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.getstorage("userInfo").then(res => {
      app.post("decodeInformer", {
        openId: res.openid
      }).then(res => {
        if (res.data) {
          let respon = res.data
          let form = {
            name: respon.informerName,
            idCard: respon.idCard,
            phone: respon.phoneNumber,
            region: respon.address,
          }
          that.setData({
            'form.check':form,
            // buttonhidden: true
            submitState: "editInformer",
          })
        }else{
          that.setData({
            submitState: "saveInformer",
          })
        }

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