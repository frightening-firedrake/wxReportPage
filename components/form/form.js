const utils = require('../../utils/util.js')
var app = getApp()
Component({
  options: {
    // addGlobalClass: true,
  },
  lifetimes: {
    attached() {

    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    form: {
      type: Object,
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
      }
    },
    buttonhidden: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    region: ['山西省', "太原市", "小店区"],
    customItem: "全部",
    showImg: true,
    captchaImg: "",
    captcha: "",
    checkboxValue: true,
    imgaeUrl: app.globalData.uploadUrl + "upload/barcode/",
    videoUrl: app.globalData.uploadUrl + "upload/video/",
  },
  ready: function() {
    let that = this
    app.catchpost("captcha?d=" + new Date()).then(res => {
      let repon = res.data
      var array = wx.base64ToArrayBuffer(res.data.img);
      var base64 = wx.arrayBufferToBase64(array);
      // repon.img.replace("↵","")
      if (base64 == "") {
        that.setData({
          captchaImg: "",
          captcha: repon.captcha
        })
      } else {
        that.setData({
          captchaImg: "data:image/jpg;base64," + base64,
          captcha: repon.captcha
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    commontrigger(triggername, data, option = "") {
      const myEventDetail = {
        value: data
      } // detail对象，提供给事件监听函数
      const myEventOption = option // 触发事件的选项
      this.triggerEvent(triggername, myEventDetail, myEventOption)
    },
    selectchage(e) {
      this.commontrigger("selectchage", {
        value: e.detail.value,
        type: e.currentTarget.dataset.type
      })
    },
    //地址下拉框
    bindRegionChange(e) {
      console.log(e)
      let data = e.detail.value
      this.commontrigger('regionChange', data)
    },
    bindcolumnchange(e) {
      let data = e.detail
      this.commontrigger('columnchange', data)
    },
    //textarea输入变化
    bindinput(e) {
      let data = {
        value: e.detail.value,
        type: e.target.dataset.type
      }
      this.commontrigger("text", data)
    },
    //地址取消
    bindcancel(e) {
      let data = e.detail.value
      const myEventDetail = {
        value: data
      } // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('cancel', myEventDetail, myEventOption)
    },

    chang: function() {
      this.setData({
        showImg: false
      })
      let that = this
      app.catchpost("captcha?d=" + new Date()).then(res => {
        let repon = res.data
        var array = wx.base64ToArrayBuffer(res.data.img);
        var base64 = wx.arrayBufferToBase64(array);
        if (base64 == "") {
          that.setData({
            captchaImg: "",
            captcha: repon.captcha
          })
        } else {
          that.setData({
            captchaImg: "data:image/jpg;base64," + base64,
            captcha: repon.captcha
          })
        }
        // repon.img.replace("↵","")

      })
    },
    checkboxChange: function(e) {
      let value = e.detail.value
      if (!value) {
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
        current: e.currentTarget.dataset.item,
        urls: e.currentTarget.dataset.list
      })

    },
    chooseLocation() {
      let that = this
      wx.chooseLocation({
        success: function(res) {
          // address
          that.commontrigger("location", res.address)
        }
      })
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
            wx.that.showModal({
              title: "提示",
              content: "文件大于6M,请重新改上传",
            })
          } else {
            wx.showLoading({
              title: "加载中",
            })
            var tempFilePaths = res.tempFilePath;
            wx.uploadFile({
              url: app.globalData.configUrl + "uploadViedofile",
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
                wx.hideLoading()
                that.commontrigger("addvideo", that.data.videoUrl+res.data)
                //do something
              }
            })

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
            wx.that.showModal({
              title: "提示",
              content: "文件大于1M,请重新改上传",
            })
          } else {
            wx.showLoading({
              title: "加载中",
            })
            var tempFilePaths = res.tempFilePaths;
            wx.uploadFile({
              url: app.globalData.configUrl + "uploadImagefile",
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
                wx.hideLoading()
                that.commontrigger("addimg", that.data.imgaeUrl+res.data)
                // var myEventDetail = {
                //   event: e.currentTarget.dataset.type,
                //   type: [res.data]
                // } // detail对象，提供给事件监听函数
                // var myEventOption = {} // 触发事件的选项
                // 
                // that.triggerEvent('addimage', myEventDetail, myEventOption)
              }
            })
            // tempFilePath可以作为img标签的src属性显示图片
            // const tempFilePaths = res.tempFilePaths

          }
        }
      })
    },
    showModal(error) {
      wx.showModal({
        content: error,
        showCancel: false,
      })
    },
    submit(e) {
      let that=this
      let subflag = true
      let formobj = {}
      if ("idCard" in e.detail.value) {
        var flag = utils.checkId(e.detail.value.idCard)
        if (!flag.flag) {
          // wx.showToast({
          //   title: flag.text,
          //   icon: "none"
          // })
          that.showModal(flag.text)
          return false
        }
      }
      for (var i = 0; i < this.properties.form.formdata.length; i++) {
        if (this.properties.form.formdata[i].data == undefined) {
          // break;
        } else {
          for (var j = 0; j < this.properties.form.formdata[i].data.length; j++) {
            if (this.properties.form.formdata[i].data[j].require) {
              formobj[this.properties.form.formdata[i].data[j].model] = ""
            }
          }
        }
      }
      if (e.detail.value.code == this.data.captcha) {
        for (var obj in formobj) {
          // console.log(e.detail.value[obj], obj)
          if (e.detail.value[obj] == "") {
            subflag = false
            let req = this.forform(obj)
            // console.log(req)
            // wx.showToast({
            //   title: "请输入" + req.name,
            //   icon: "none"
            // })
            that.showModal("请输入" + req.name)
            return false
            
            if (obj =="phoneNumber"){
              
              
            }
          } else if (obj == "phoneNumber") {
            if (/^1[34578]\d{9}$/.test(e.detail.value.phoneNumber)) {
            } else {
              that.showModal("请输入正确的手机号")
              return false
            }
          } else if (obj == "phone") {
            if (/^1[34578]\d{9}$/.test(e.detail.value.phoneNumber)) {
            } else {
              that.showModal("请输入正确的手机号")
              return false
            }
          }  else if (e.detail.value.informContent==""){
            // wx.showToast({
            //   title: "请输入举报详情",
            //   icon: "none"
            // })
            that.showModal("请输入举报详情")

            return false
          } else {
            subflag = true
          }
        }
        if (subflag) {
          let data = e.detail.value
          this.commontrigger("submit", data)
        }
      } else {
        // wx.showToast({
        //   title: "验证码错误,请重新输入",
        //   icon: "none"
        // })
        that.showModal("验证码错误,请重新输入")
        return false
      }

      // for(var i = 0;i<this.properties.form.length;i++){

      // }
      // if (e.detail.value.code != "" && e.detail.value.code == this.data.captcha) {
      //   let data = e.detail.value
      //   this.commontrigger("submit", data)
      // } else {
      //   wx.showToast({
      //     title: "验证码错误,请重新输入",
      //     icon: "none"
      //   })
      // }

    },
    forform(roles) {
      for (var role = 0; role < this.properties.form.formdata.length; role++) {
        if (this.properties.form.formdata[role].data == undefined) {

        } else {
          for (var rolej = 0; rolej < this.properties.form.formdata[role].data.length; rolej++) {
            if (roles == this.properties.form.formdata[role].data[rolej].model) {
              return this.properties.form.formdata[role].data[rolej]
            }
          }
        }
      }
    }
  }
})