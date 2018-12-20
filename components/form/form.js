const utils = require('../../utils/util.js')
var app = getApp()
Component({
  options: {
    // addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    form: { // 属性名
      type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      observer: function(newVal, oldVal, changedPath) {
        let that = this
        newVal.forEach((v, i) => {
          v.form.forEach((forv, fori) => {
            if (forv.type == "phone") {
              if (forv.reqvalue.length == 11) {
                that.setData({
                  disabled: false,
                  phonecontent: forv.reqvalue,
                  entry: true
                })
              }
            }
          })
        })
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    prodid: {
      type: Number,
    },
    buttonhidden: {
      type: Boolean,
      value: false
    },
    submittype: {
      type: Boolean,
      value: true
    },
    anonymity: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    map: "",
    disabled: true,
    submitStatus: "",
    formdataStatus: true,
    videoContext: "",
    phonecontent: "",
    image: app.globalData.configUrl + "upload/barcode/",
    video: app.globalData.configUrl + "upload/video/",
    code: "获取验证码",
    play: true,
    entry: false,
    sendMsg: "",
    captcha: "",
    captchaImg: "",
    checkboxValue: "",
    showImg:false,
    Inputlength:0
  },
  ready: function() {
    let that = this
    app.post("captcha?d=" + new Date()).then(res => {
      let repon = res.data
      var array = wx.base64ToArrayBuffer(res.data.img);
      var base64 = wx.arrayBufferToBase64(array);
      // repon.img.replace("↵","")
      that.setData({
        captchaImg: "data:image/jpg;base64," + base64,
        captcha: repon.captcha
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    error:function(e){
      this.setData({
        showImg:true
      })
    },
    chang: function() {
      this.setData({
        showImg: false
      })
      let that = this
      app.post("captcha?d=" + new Date()).then(res => {
        let repon = res.data
        var array = wx.base64ToArrayBuffer(res.data.img);
        var base64 = wx.arrayBufferToBase64(array);
        // repon.img.replace("↵","")
        that.setData({
          captchaImg: "data:image/jpg;base64," + base64,
          captcha: repon.captcha
        })
      })
    },
    checkboxChange: function(e) {
      let value = e.detail.value
      console.log(value)
      if (value.length > 0) {
        wx.showToast({
          title: "您的个人信息将不会被提交",
          icon: "none"
        })
      }
      this.setData({
        checkboxValue: value
      })
    },
    preview: function(e) {
      // console.log(e.currentTarget.dataset.list)
      wx.previewImage({
        urls: e.currentTarget.dataset.list
      })

    },
    submit: function(e) {
      this.setData({
        formdataStatus: true,
        submitStatus: e.detail.target.dataset.type,
      })
      let that = this
      let formdata = e.detail.value
      let requireArray = []
      // 在这里循环出form的require为true的
      this.properties.form.forEach((v, i) => {
        v.form.forEach((formv, formi) => {
          if (formv.request == true) {
            requireArray.push(formv)
          }
        })
      })
      // console.log(requireArray,formdata)

      for (var i = 0; i < requireArray.length; i++) {
        if (this.data.submitStatus == 'codesubmit') {
          if (this.properties.prodid) {

          } else if (this.data.phonecontent) {
            var reg = /^[1](3|5|8|7)\d{9}$/
            if (!reg.test(this.data.phonecontent)) {
              wx.showModal({
                title: "提示",
                content: "暂不支持海外手机号",
              })
              return false
            }

          } else if (formdata[requireArray[i].name] == "" && requireArray[i].name != "querycode") {
            wx.showModal({
              title: "提示",
              content: requireArray[i].placeholder,
            })
            that.setData({
              formdataStatus: false
            })
            return false
          }
        } else if (this.data.submitStatus == 'submit') {
          if (!this.data.checkboxValue.length) {
            if (!utils.checkId(formdata.idCard).flag && this.properties.prodid == "") {
              wx.showModal({
                title: "提示",
                content: utils.checkId(formdata.idCard).text,
              })
              return false
            }
          }
          // } else {
          if (formdata[requireArray[i].name] == "") {
            wx.showModal({
              title: "提示",
              content: requireArray[i].placeholder,
            })
            that.setData({
              formdataStatus: false
            })
            return false
          }
          // }
        }

      }
      if (this.data.formdataStatus) {
        /*
          假如有就不提交个人信息
          没有就提交个人信息
        */
        if (this.data.submitStatus == 'submit') {
          // let params = {
          //   'verityCode': formdata.resultMap,
          //   'customCode': this.data.sendMsg.customCode,
          //   'tamp': this.data.sendMsg.tamp,
          // }
          if (formdata.resultMap != this.data.captcha) {
            wx.showModal({
              title: "提示",
              content: "请输入正确的验证码",
            })
            return false
          } else {
            var myEventDetail = {
              event: formdata
            }
            // formdata.resultMap = JSON.stringify(params)
            if (this.data.checkboxValue.length) {
              myEventDetail["checkboxValue"] = true
            } else {
              myEventDetail["checkboxValue"] = false
            }
            var myEventOption = {} // 触发事件的选项
            that.triggerEvent('submit', myEventDetail, myEventOption)
          }
        } else if (this.data.submitStatus == 'codesubmit') {
          this.setData({
            disabled: true,
          })
          if (this.properties.prodid) {
            this.setcode("sendMsg1", this.properties.prodid)
          } else {
            this.setcode("sendMsg2", this.data.phonecontent)
          }
          console.log(this.properties.prodid, this.data.phonecontent)

          // 
        }

      }
      //   e.detail.value
      // var myEventDetail = { event: e.detail.value } // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // that.triggerEvent('submit', myEventDetail, myEventOption)
    },
    entry: function(e) {
      // console.log(e.detail)
      if (e.detail.value.length == 11) {
        this.setData({
          phonecontent: e.detail.value
        })
        this.setData({
          disabled: false,
        })
      } else {
        this.setData({
          disabled: true,
        })
      }
    },
    addvideo: function(e) {
      const that = this
      wx.chooseVideo({
        sourceType: ["album", 'camera'],
        macDuration: 60,
        camera: "back",
        success(res) {
          // console.log(res)
          if (res.size / 1024 / 1024 > 6) {
            wx.showModal({
              title: "提示",
              content: "文件大于6M,请重新改上传",
            })
          } else {
            wx.showLoading({
              title: "加载中",
            })
            var tempFilePaths = res.tempFilePath;
            wx.uploadFile({
              url: app.globalData.configUrl + "wechat/uploadViedofile",
              filePath: tempFilePaths,
              name: "file",
              formData: {
                "file": tempFilePaths
              },
              header: {
                "Content-Type": "multipart/form-data",
                "Authorization": app.globalData.token
              },
              success(res) {
                var myEventDetail = {
                  event: e.currentTarget.dataset.type,
                  type: [res.data]
                } // detail对象，提供给事件监听函数
                var myEventOption = {} // 触发事件的选项
                wx.hideLoading()
                that.triggerEvent('addimage', myEventDetail, myEventOption)
                //do something
              }
            })
            // tempFilePath可以作为img标签的src属性显示图片
            // const tempFilePaths = res.tempFilePaths

          }
        }
      })
    },
    addimage: function(e) {
      const that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是
        success(res) {
          // console.log(res.tempFilePaths)
          if (res.tempFiles[0].size / 1024 / 1024 > 1) {
            wx.showModal({
              title: "提示",
              content: "文件大于1M,请重新改上传",
            })
          } else {
            wx.showLoading({
              title: "加载中",
            })
            var tempFilePaths = res.tempFilePaths;
            wx.uploadFile({
              url: app.globalData.configUrl + "wechat/uploadImagefile",
              filePath: tempFilePaths[0],
              name: "file",
              formData: {
                "file": tempFilePaths[0]
              },
              header: {
                "Content-Type": "multipart/form-data",
                "Authorization": app.globalData.token
              },
              success(res) {
                var myEventDetail = {
                  event: e.currentTarget.dataset.type,
                  type: [res.data]
                } // detail对象，提供给事件监听函数
                var myEventOption = {} // 触发事件的选项
                wx.hideLoading()
                //do something
                that.triggerEvent('addimage', myEventDetail, myEventOption)
              }
            })
            // tempFilePath可以作为img标签的src属性显示图片
            // const tempFilePaths = res.tempFilePaths

          }
        }
      })
    },
    tomap: function() {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
      // const that = this
      // wx.chooseLocation({
      //   success: function (res) {
      //     that.setData({
      //       map: res.address
      //     })
      //   }
      // })
    },
    textareaInput:function(e){
      //e.detail.cursor
      //e.target.detaset.maxlength
      this.setData({
        Inputlength: e.detail.cursor
      })
    },
    keepvalue: function(e) {
      var myEventDetail = {
        event: e.detail,
        type: e.currentTarget.dataset
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('keepvalue', myEventDetail, myEventOption)
    },
    bindPickerChange(e) {
      var myEventDetail = {
        index: e.detail.value,
        event: e.currentTarget.dataset.type
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('picker', myEventDetail, myEventOption)
    },
    selectcontent(e) {
      // console.log(e)
      var myEventDetail = {
        event: e.currentTarget.dataset.type
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('selectcontent', myEventDetail, myEventOption)
    },
    setcode(fun, e) {
      let num = 60,
        that = this,
        t, params
      this.setData({
        entry: true
      })
      if (fun == "sendMsg2") {
        params = {
          phoneNumber: e
        }
      } else if (fun == "sendMsg1") {
        params = {
          id: e
        }
      }
      console.log(params)
      app.post("message/" + fun, params).then(res => {
        that.setData({
          sendMsg: res.data
        })
        t = setInterval(function() {
          num -= 1
          if (num == 0) {
            clearInterval(t)
            that.setData({
              code: "获取验证码",
              disabled: false,
            })
          } else {
            that.setData({
              code: num + "s"
            })
          }

        }, 1000)
      })

    },
    pause() {
      this.setData({
        play: true
      })
    },
    play() {
      this.setData({
        play: false
      })
    },
    plus(e) {
      if (!e.details.fullScreen) {
        this.setData({
          play: true
        })
      }
    }
  }
})