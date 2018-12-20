// pages/index/report/details/details.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anonymity: true,
    prodid: "",
    information: {
      state: false,
      informerId: ""
    },
    form: [{
        slot: "举报信息",
        form: [{
            label: "线报地域:",
            name: "threadArea",
            request: true,
            type: "select",
            value: ["山西省"],
            index: 0,
            placeholder: "请填写线报地域",
            icon: "icon-r-jiantou",
          },
          {
            label: "线索详址:",
            name: "clueAddress",
            type: "map",
            height: "176rpx",
            request: true,
            icon: "icon-dingwei",
            value: "",
            placeholder: "请填写线索详址"
          },
          {
            label: "行业领域:",
            name: "industryField",
            type: "select",
            icon: "icon-r-jiantou",
            index: 0,
            placeholder: "请填写行业领域",
            value: ["1.国家政治安全", "2.基层政权", "3.宗族势力、村霸", "4.征地、拆迁", "5.建设工程、运输、矿产、渔业", "6.欺行霸市", "7.黄赌毒", "8.非法高利放贷、暴力讨债", "9.插手民间纠纷", "10.境外黑社会"],
          },
          {
            label: "举报类别:",
            name: "informType",
            type: "selectcontent",
            icon: "icon-r-jiantou",
            placeholder: "请填写举报类别",
            index: 0,
            value: [{
                label: "1.威胁政治安全",
                name: "1.威胁政治安全特别是政权安全、制度安全以及向政治领域渗透的黑恶势力;"
              },
              {
                label: "2.把持基层政权、操纵破坏基层换届选举",
                name: "2.把持基层政权、操纵破坏基层换届选举、垄断基层资源、侵吞集体资产的黑恶势力"
              },
              {
                label: "3.“村霸”等黑恶势力",
                name: "3.利用家族、宗族势力横行乡里、称霸一方、欺压残害百姓的“村霸”等黑恶势力;"
              },
              {
                label: "4.煽动群众闹事的黑恶势力",
                name: "4.在征地、租地、拆迁、工程项目建设等过程中煽动群众闹事、组织策划群体性上访的黑恶势力;"
              }, {
                name: "5.在建筑工程、交通运输、矿产资源、渔业捕捞等行业、领域，强揽工程、恶意竞标、非法占地、滥开滥采的黑恶势力;",
                label: "5.在建筑工程、滥开滥采的黑恶势力"
              }, {
                name: "6.在商贸集市、批发市场、车站机场码头、旅游景区等场所欺行霸市、强买强卖、收保护费的市霸、行霸等黑恶势力;",
                label: "6.强买强卖、收保护费的市霸、行霸等黑恶势力;"
              }, {
                name: "7.操纵、经营“黄赌毒”等违法犯罪活动的黑恶势力;",
                label: "7.操纵、经营“黄赌毒”等黑恶势力;"
              }, {
                name: "8.非法高利放贷，以暴力或软暴力讨债的黑恶势力;",
                label: "8.以暴力的黑恶势力;"
              }, {
                name: "9.插手民间纠纷，充当“地下执法队”的黑恶势力;",
                label: "9.插手民间纠纷的黑恶势力;"
              }, {
                name: "10.境外黑社会入境发展渗透或跨国跨境黑恶势力;",
                label: "10.跨国跨境黑恶势力;"
              }, {
                name: "11.“地下钱庄”背后的黑恶势力;",
                label: "11.“地下钱庄”背后的黑恶势力;"
              }, {
                name: "12.垄断一定区域内产品或物资经营的黑恶势力;",
                label: "12.垄断一定区域物资经营的黑恶势力;"
              }, {
                name: "13.侵害学生人身和财产安全，妨害校园及周边治安秩序，或者教唆、胁迫在校学生参加犯罪组织或从事黑恶犯罪的黑恶势力;",
                label: "13.侵害学生人身和财产安全的黑恶犯罪的黑恶势力;"
              }, {
                name: "14.恶意插手物业管理、医疗纠纷等案事件，严重妨碍小区、医疗机构等管理秩序，制造负面影响并从中牟利的黑恶势力;",
                label: "14.恶意插手物业管理制造负面影响并从中牟利;"
              }, {
                name: "15.组织雇用网络“水军”在网.上威胁、恐吓、侮辱、诽谤、滋扰的黑恶势力;",
                label: "15.组织雇用网络“水军,滋扰的黑恶势力”;"
              }, {
                name: "16.为黑恶势力充当“保护伞”的公职人员;",
                label: "16.为黑恶势力充当“保护伞”的公职人员;"
              }, {
                name: "17.群众反映强烈、深恶痛绝的其他各类黑恶势力违法犯罪。",
                label: "17.群众反映强烈的其他各类黑恶势力违法犯罪;"
              }
            ]
          }
        ]
      },
      {
        slot: "举报详情",
        form: [{
            label: '举报内容',
            name: "informContent",
            type: "textarea",
            request: true,
            placeholder: "请输入举报内容",
            height: "260rpx",
            value: "",
            maxlength:200
          },
          {
            label: '图片上传:',
            name: "picture",
            type: "photo",
            length: "9",
            index: "0",
            placeholder: "每张图片的大小不能超过1M",
            value: []
          },
          {
            label: '视频上传:',
            name: "video",
            type: "video",
            length: "3",
            index: "0",
            placeholder: "每个视频的大小不能超过6M",
            value: []
          },
          {
            label: "验证码:",
            request: true,
            placeholder: "请输入验证码",
            name: "resultMap",
            input: "number",
            type: "resultMap"
          }
        ]
      },
      {
        type:"personal",
        slot: "个人信息",
        form: [{
            label: '姓名:',
            placeholder: "请输入姓名",
            name: "name",
            type: "",
            reqvalue: ""
          },
          {
            label: "身份证:",
            placeholder: "请输入身份证",
            name: "idCard",
            type: "id",
            reqvalue: "",
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
            name: "phone",
            placeholder: "请输入手机号",
            type: "phone",
            reqvalue: ""
          }
        ]
      }
    ]
  },
  keepvalue: function(e) {
    let that = this
    that.data.form.forEach((v, i) => {
      v.form.forEach((formv, formi) => {
        if (formv.name == e.detail.type.type) {
          let params = {}
          let str = 'form[' + i + '].form[' + formi + '].value'
          params[str] = e.detail.event.value
          // let str = 'that.data[' + i + '].form[' + formi + '].value'
          that.setData(params)
        }
      })

    })
  },
  map: function() {
    const that = this
    wx.chooseLocation({
      success: function(res) {
        that.data.form.forEach((v, i) => {
          v.form.forEach((formv, formi) => {
            if (formv.type == "map") {
              let params = {}
              let str = 'form[' + i + '].form[' + formi + '].value'
              params[str] = res.address
              // let str = 'that.data[' + i + '].form[' + formi + '].value'
              that.setData(params)
            }
          })

        })
        // that.setData()
        // that.setData({
        //   map: res.address
        // })
      }
    })
  },
  addimage: function(e) {
    const that = this
    const event = e.detail
    that.data.form.forEach((v, i) => {
      v.form.forEach((formv, formi) => {
        if (formv.label == event.event.label) {
          let params = {}
          let str = 'form[' + i + '].form[' + formi + '].value'
          let index = 'form[' + i + '].form[' + formi + '].index'
          // that.data.form[i].form[formi].value.push(event.type[0])
          let contentArray = []
          if (that.data.form[i].form[formi].value.length > 0) {
            that.data.form[i].form[formi].value.forEach((v, i) => {
              contentArray.push(v)
            })
            contentArray.push(event.type[0])
          } else {
            contentArray = [event.type[0]]
          }
          // console.log(contentArray)
          params[str] = contentArray
          params[index] = contentArray.length
          // let str = 'that.data[' + i + '].form[' + formi + '].value'
          // console.log(params)
          // console.log(that.data.form)
          that.setData(params)
        }
      })

    })
  },
  picker: function(e) {
    let event = e.detail.event
    // console.log(event)
    const that = this
    that.data.form.forEach((v, i) => {
      v.form.forEach((formv, formi) => {
        if (formv.label == event.label) {
          let params = {}
          let str = `form[${i}].form[${formi}].index`
          params[str] = e.detail.index
          that.setData(params)
        }
      })
    })
  },
  selectcontent(e) {
    wx.showModal({
      title: "提示",
      content: e.detail.event,
    })
  },
  submit(e) {
    let content = e.detail.event,
      value = e.detail.checkboxValue
      // console.log(content,value)
      // return false
    if (value) {
      app.getstorage("userInfo").then(res => {
        content['openId'] = res.openid
        app.post("wechat/anonymitySaveInformation", content).then(res => {
          if (res.data.success == true) {
            wx.showToast({
              title: "提交成功"
            })
            setTimeout(function() {
              wx.switchTab({
                url: "/pages/logs/logs",
                success: function(res) {
                  wx.navigateTo({
                    url: "/pages/logs/record/record"
                  })
                }
              })
            }, 1000)
          } else {
            wx.showToast({
              title: res.data.success
            })
          }
        })
      })
    } else if (this.data.information.state) {
      content['informerId'] = this.data.information.informerId
      app.post("wechat/saveInformation", content).then(res => {
        if (res.data.success == true) {
          wx.showToast({
            title: "提交成功"
          })
          setTimeout(function() {
            wx.switchTab({
              url: "/pages/logs/logs",
              success: function(res) {
                wx.navigateTo({
                  url: "/pages/logs/record/record"
                })
              }
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.success
          })
        }
      })
    } else {
      app.getstorage("userInfo").then(res => {
        content["openid"] = res.openid
        app.post("wechat/saveInformer", {
          openId: content.openid,
          informerName: content.name,
          idCard: content.idCard,
          phoneNumber: content.phone,
          otherContactWay: content.otherContactWay
        }).then(res => {
          if (res.data.success) {
            app.post("wechat/getInformer", {
              openId: content.openid
            }).then(res => {
              //       // res.data.id
              content['informerId'] = res.data.id
              app.post("wechat/saveInformation", content).then(res => {
                if (res.data.success != true) {
                  wx.showToast({
                    title: "提交成功"
                  })
                  setTimeout(function() {
                    wx.switchTab({
                      url: "/pages/logs/logs",
                      success: function(res) {
                        wx.navigateTo({
                          url: "/pages/logs/record/record"
                        })
                      }
                    })
                  }, 1000)
                } else {
                  wx.showToast({
                    title: "请输入正确的验证码"
                  })
                }
              })
            })
          } else {
            wx.showToast({
              title: res.data.msg
            })
          }
        })
      })
    }



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
          that.setData({
            prodid: respon.id
          })
          let form = {
            name: respon.encryptName,
            idCard: respon.encryptIdCard,
            phone: respon.encryptPhoneNumber,
            otherContectWay: respon.encryptOtherContectWay,
          }
          for (let formi in form) {
            that.data.form.forEach((v, i) => {
              v.form.forEach((datav, datai) => {
                if (datav.name == formi) {
                  datav.reqvalue = form[formi]
                }
              })
            })
          }
          that.setData({
            form: that.data.form,
            information: {
              state: true,
              informerId: res.data.id
            }
          })
        } else {
          that.setData({
            information: {
              state: false,
              informerId: ""
            }
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