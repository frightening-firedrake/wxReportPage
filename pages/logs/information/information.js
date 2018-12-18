// pages/logs/information/information.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prodid: "",
    buttonhidden: false,
    submitState: "saveInformer",
    form: [{
      slot: "个人基本信息",
      form: [{
          label: "姓名:",

          name: "name",
          placeholder: "请输入姓名",
          type: "",
          reqvalue: ""
        },
        {
          label: "身份证:",

          name: "idCard",
          placeholder: "请输入身份证",
          type: "id",
          reqvalue: ""
        },
        {
          label: "工作单位:",
          name: "job",

          placeholder: "请输入工作单位",
          type: "",
          reqvalue: ""
        },
        {
          label: "居住地区域:",
          name: "place",

          type: "select",
          icon: "icon-r-jiantou",
          index: 0,
          value: ["山西省"],
          reqvalue: ""
        },
        {
          label: "居住地详址:",
          name: "place_content",
          placeholder: "请输入居住地详址",
          type: "",

          reqvalue: ""
        },
        {
          label: "其他联系方式:",
          placeholder: "QQ、微信、邮箱",
          name: "otherContectWay",
          type: "",
          reqvalue: ""
        },
        {
          label: "手机号:",
          type: "phone",
          placeholder: "请输入手机号",
          name: "phone",

          reqvalue: ""
        },
        {
          label: "验证码:",
          request:true,
          placeholder: "请输入验证码",
          name: "resultMap",
          type: "resultMap",
          reqvalue: ""
        }
      ]
    }]
  },
  submit(e) {
    // console.log(e)
    let data = e.detail.event
    app.getstorage("userInfo").then(res => {
      app.post("wechat/" + this.data.submitState, {
        openId: res.openid,
        informerName: data.name,
        idCard: data.idCard,
        otherContectWay: data.otherContectWay,
        workPlace: data.job,
        livingArea: data.place,
        address: data.place_content,
        phoneNumber: data.phone
      }).then(res => {
        if (res.data.success) {
          wx.showModal({
            title: "提示",
            content: "提交成功",
            success: function(res) {
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
            success: function(res) {
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
  onLoad: function(options) {
    let that = this
    app.getstorage("userInfo").then(res => {
      app.post("wechat/getInformer", {
        openId: res.openid
      }).then(res => {
        if (res.data) {
          let respon = res.data
          let form = {
            name: respon.encryptName,
            idCard: respon.encryptIdCard,
            job: respon.workPlace,
            place: respon.livingArea,
            place_content: respon.address,
            phone: respon.encryptPhoneNumber
          }
          for (let formi in form) {
            that.data.form.forEach((v, i) => {
              v.form.forEach((datav, datai) => {
                if (datav.name == formi) {
                  if (datav.name == "place") {
                    datav.reqvalue = datav.value.indexOf(form[formi])
                  } else {
                    datav.reqvalue = form[formi]
                  }
                }
              })
            })
          }
          that.setData({
            form: that.data.form,
            submitState: 'editInformer',
            prodid: respon.id,
            buttonhidden: true
          })
        }

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