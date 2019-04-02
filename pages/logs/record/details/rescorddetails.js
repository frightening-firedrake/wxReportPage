// pages/logs/record/details/rescorddetails.js
import WxValidate from '../../../../utils/WxValidate';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['山西省', "太原市", "小店区"],
    editMode:false,
    customItem: "全部",
    useras:true,
    showImg: true,
    captchaImg: "",
    captcha: "",
    checkboxValue: true,
    imgaeUrl: app.globalData.uploadUrl + "upload/barcode/",
    videoUrl: app.globalData.uploadUrl + "upload/video/",
    textLength:200,//字数限制
    imgLength:10,//图片数量限制
    imgList: [],//图片列表
    imgListShow:[],//图片列表展示
    videoLength:3,//视频数量限制
    videoList:[],//视频列表
    videoListShow:[],//视频列表展示
    openId:'',
    informerId:0,
        threadAreaValues: [],
        industryFieldIndex:"",
        informTypeIndex:"",
        regionlist: [],
        threadAreaId: [],
        industryField: [],
        informType: [{
            id: 1,
            label: '1、威胁政治安全特别是制度安全、政权安全以及向政治领域渗透的黑恶势力'
          },
          {
            id: 2,
            label: '2、把持基层政权、操纵破坏基层换届选举、垄断农村资源、侵吞集体资产的黑恶势力'
          },
          {
            id: 3,
            label: '3、利用家族、宗族势力横行乡里、称霸一方、欺压残害百姓的“村霸”等黑恶势力'
          },
          {
            id: 4,
            label: '4、在征地、租地、拆迁、工程项目建设等过程中煽动闹事的黑恶势力'
          },
          {
            id: 5,
            label: '5、在建筑工程、交通运输、矿产资源、渔业捕捞等行业、领域，强揽工程、恶意竞标、非法占地、滥开滥采的黑恶势力'
          },
          {
            id: 6,
            label: '6、在商贸集市、批发市场、机场车站、旅游景区等场所欺行霸市、强买强卖、收保护费的市霸、行霸等黑恶势力'
          },
          {
            id: 7,
            label: "7、操纵、经营“黄赌毒”等违法犯罪活动的黑恶势力"
          },
          {
            id: 8,
            label: '8、非法高利放贷、暴力讨债的黑恶势力'
          },
          {
            id: 9,
            label: '9、盗掘古墓葬以及倒卖、走私文物的黑恶势力'
          },
          {
            id: 10,
            label: '10、插手民间纠纷，充当“地下执法队”的黑恶势力'
          },
          {
            id: 11,
            label: '11、境外黑社会入境发展渗透以及跨国跨境的黑恶势力'
          },
          {
            id: 12,
            label: '12、黑恶势力“保护伞”'
          },
      ],
    
      result: {
        openId:"",
        id:"",
        state:"",//案件进度
        feedbackInformation:"864511153",//反馈信息
        clueAddress: "",//线索地址
        informContent: "",//举报详情
        threadAreaId: "",//线报地域number转数组
        industryField: "",//行业领域
        informType: "",//举报类别
        picture: [],//图片
        video: [],//视频
        code: "",//二维码
        informerName: "",//举报人
        phoneNumber: "",//手机号
      },
  },
  // 事件
  // 获取提交数据
  submit(e){
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
        const error = this.WxValidate.errorList[0]
        this.showModal(error)
        return false
    }
    var that=this;
    var data = {};
    var url ="saveInformation";
    data.threadAreaId = this.data.threadAreaId[2][e.detail.value.threadAreaId[2]].id
    data.clueAddress = e.detail.value.clueAddress
    data.informContent = e.detail.value.informContent
    data.industryField = this.data.industryField[e.detail.value.industryField].label
    data.informType = this.data.informType[e.detail.value.informType].label
    data.picture = this.data.imgList.length ? this.data.imgList.join(","):""
    data.video = this.data.videoList.length ? this.data.videoList.join(","):""
    data.openId = this.data.openId

    // console.log(data)
    // console.log(this.data.informerId)
    // console.log(e.detail.value)
    // console.log('提交成功')
    // return
    if (e.detail.value.useras){
      // data.informerName = e.detail.value.informerName
      // data.phoneNumber = e.detail.value.phoneNumber
      if (!this.data.informerId){
        app.post("saveInformer", {
          openId: data.openId,
          informerName: e.detail.value.informerName,
          phoneNumber: e.detail.value.phoneNumber
        }).then(res => {
          app.post("getInformer", {
            openId: that.data.openId
          }).then(res => {
            data.informerId = res.data.id
            app.post(url, data).then(res => {
              if (res.data.success) {
                wx.redirectTo({
                  url: "/pages/logs/record/record"
                })
              }
            })
          })
        })
      }else{
        data.informerId = that.data.informerId
        app.post(url, data).then(res => {
          if (res.data.success) {
            wx.redirectTo({
              url: "/pages/logs/record/record"
            })
          }
        })
      }

    }else{
      url = "anonymitySaveInformation"
      data.informerId = 0
      app.post(url, data).then(res => {
        if (res.data.success) {
          wx.redirectTo({
            url: "/pages/logs/record/record"
          })
        }
      })
    }

            
    
    

    

  },
  //线报地域
  getThreadArea(){
    app.post("getAll").then(res => {
      let pids = [];
      let ids=[];
      if (this.data.result.threadAreaId) {
        let id_f = this.data.result.threadAreaId
        ids.unshift(id_f)
        let pid_OBJ = res.data.find((v)=>{
          return v.id == id_f
        })
        let pid_f = pid_OBJ.pId
        pids.unshift(pid_f)
        if (pid_f!==-1){
          let id_f1 = pid_f
          ids.unshift(id_f1)
          let pid_OBJ1 = res.data.find((v) => {
            return v.id == id_f1
          })
          let pid_f1 = pid_OBJ1.pId
          pids.unshift(pid_f1)
          if (pid_f1 !== -1) {
            let id_f2 = pid_f1
            ids.unshift(id_f2)
            let pid_OBJ2 = res.data.find((v) => {
              return v.id == id_f2
            })
            let pid_f2 = pid_OBJ2.pId
            pids.unshift(pid_f2)
          }
        }
      }
      let data = res.data.filter((i, v) => {
        let pid = pids[0] ? pids[0]:-1
        return i.pId == pid
      })
      let child = res.data.filter((i, v) => {
        let pid = pids[1] ? pids[1] : data[0].id
        return i.pId == pid
      })
      let child2 = res.data.filter((i, v) => {
        let pid = pids[2] ? pids[2] : child[0].id
        return i.pId == pid
      })
      this.setData({
        regionlist: res.data,
        "threadAreaId[0]": data,
        "threadAreaId[1]": child,
        "threadAreaId[2]": child2
      })
      if (this.data.result.threadAreaId){
        let arr=[]
        ids.forEach((v,i)=>{
          let index = this.data.threadAreaId[i].findIndex((v2)=>{
            return v2.id==v
          })
          arr.push(index)
        })
        this.setData({
          "threadAreaValues": arr
        })
      }
    })
  },
  bindRegionChange(e){
    this.setData({
      "threadAreaValues": e.detail.value
    })
  },
  bindcolumnchange(e){
    if (e.detail.column==0){
      let id = this.data.threadAreaId[0][e.detail.value].id
      let child = this.data.regionlist.filter((i, v) => {
        return i.pId == id
      })
      let child2 = this.data.regionlist.filter((i, v) => {
        let pid = child[0].id
        return i.pId == pid
      })
      this.setData({
        "threadAreaId[1]": child,
        "threadAreaId[2]": child2
      })
    } else if (e.detail.column ==1){
      let id = this.data.threadAreaId[1][e.detail.value].id
      let child2 = this.data.regionlist.filter((i, v) => {
        return i.pId == id
      })
      this.setData({
        "threadAreaId[2]": child2
      })
    }else{

    }
  },
  //行业领域
  getAllIndustry(){
    app.post("findAllIndustry").then(res => {
      res.data.forEach((i, v) => {
        i["label"] = i.content
      })
      this.setData({
        industryField: res.data
      })
      if (this.data.result.industryField){
        let index = res.data.findIndex((v)=>{
          return v.label == this.data.result.industryField
        })
        this.setData({
          "industryFieldIndex": index
        })
      }
      // 举报类别没地方就先扔这里了
      if (this.data.result.informType) {
        let index = this.data.informType.findIndex((v) => {
          return v.label == this.data.result.informType
        })
        this.setData({
          "informTypeIndex": index
        })
      }
    })
  },
  industryFieldchage(e){
    this.setData({
      "industryFieldIndex": e.detail.value
    })
  },
  informTypechange(e){
    this.setData({
      "informTypeIndex": e.detail.value
    })
  },
  //举报详情
  textareaInput(e){
    this.setData({
      "result.informContent": e.detail.value
    })
  },

  // 图片添加及预览
  setimgList(str){
    let arr=str.split(',');
    let arr2=[];
    arr2=arr.map((v)=>{
      return this.data.imgaeUrl+v
    })
    this.setData({
      "imgList": arr,
      "imgListShow": arr2,
    })
  },
  previewIMG(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: this.data.imgListShow
    })
  },
  addimage: function (e) {
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
              that.data.imgList.push(res.data)
              that.data.imgListShow.push(that.data.imgaeUrl+res.data)
              that.setData({
                "imgList": that.data.imgList,
                "imgListShow": that.data.imgListShow,
              })

            },
          })
        }
      }
    })
  },
  //视频添加预览
  setvideoList(str){
    let arr = str.split(',');
    let arr2=[];
    arr2 = arr.map((v) => {
      return this.data.videoUrl + v
    })
    this.setData({
      "videoList": arr,
      "videoListShow": arr2,
    })
  },
  videoPlayer(e){
    this.videoContext = wx.createVideoContext(e.currentTarget.dataset.src)
    this.videoContext.requestFullScreen()
  },
  fullscreenchange(e){
    console.log(e)
    this.videoContext = wx.createVideoContext(e.currentTarget.dataset.src)
    this.videoContext.stop()
  },
  addvideo: function (e) {
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
              that.data.videoList.push(res.data)
              that.data.videoListShow.push(that.data.videoUrl+res.data)
              that.setData({
                "videoList": that.data.videoList,
                "videoListShow": that.data.videoListShow,
              })
            }
          })

        }
      }
    })
  },
  // 地图
  chooseLocation() {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          "result.clueAddress": res.address
        })
      }
    })
  },
  // 匿名举报
  switchChange(e){
    let value = e.detail.value
    if (!value) {
      wx.showToast({
        title: "您的个人信息将不会被提交",
        icon: "none"
      })
    }
    this.setData({
      "useras": e.detail.value
    })
  },
  //取验证码
  getCaptcha(){
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
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  initValidate() {
    const rules = {
          // name: {
          //     required: true,
          //     rangelength: [2, 4]
          // },
          // idcard: {
          //     required: true,
          //     idcard: true,
          // },
          // tel: {
          //     required: true,
          //     tel: true,
          // },
          // regcode: {
          //     required: false,
          //     minlength: 6
          // },
      threadAreaId:{
        required: true,
      },
      clueAddress: {
        required: true,
      },
      industryField: {
        required: true,
      },
      informType: {
        required: true,
      },
      informContent: {
        required: true,
      },
      code: {
        required: true,
        codetrue: true,
      },
      // useras: {
      //   required: true,
      // },
      informerName: {
        informerNameRequired: true,
      },
      phoneNumber: {
        phoneNumberRequired: true,
        phoneNumberTel: true,
      },

    }
    const messages = {
          // name: {
          //     required: '请输入姓名',
          //     rangelength: '请输入2~4个汉字个汉字'
          // },
          // tel: {
          //     required: '请输入11位手机号码',
          //     tel: '请输入正确的手机号码',
          // },
          // idcard: {
          //     required: '请输入身份证号码',
          //     idcard: '请输入正确的身份证号码',
          // },
      threadAreaId: {
        required: "请选择线报地域",
      },
      clueAddress: {
        required: "请填写线索地址",
      },
      industryField: {
        required: "请选择行业领域",
      },
      informType: {
        required: "请选择举报类别",
      },
      informContent: {
        required: "请填写举报详情内容",
      },
      code: {
        required: "请输入验证码",
      },
      // useras: {
      //   required: "",
      // },
      informerName: {
        informerNameRequired: "请输入姓名",
      },
      phoneNumber: {
        phoneNumberRequired: "请输入手机号",
        phoneNumberTel: '请输入正确的手机号码',
      },

    }
    this.WxValidate = new WxValidate(rules, messages)
    this.WxValidate.addMethod('informerNameRequired', (value, param) => {
      return !this.data.useras || this.data.useras && value
    }, '请输入姓名')
    this.WxValidate.addMethod('phoneNumberRequired', (value, param) => {

      return !this.data.useras || this.data.useras && value
    }, '请输入手机号')
    this.WxValidate.addMethod('phoneNumberTel', (value, param) => {
      if (this.data.informerId) {
        return true
      }
      return !this.data.useras || this.data.useras && this.WxValidate.optional(value) || this.data.useras &&/^1[34578]\d{9}$/.test(value)
    }, '请输入正确的手机号码')
    this.WxValidate.addMethod('codetrue', (value, param) => {
      return value == this.data.captcha
    }, '验证码信息错误')
  },
  // 后台查询个人信息
  getUser(informerId){
    app.post("findById", {
        informerId: informerId
      }).then(res => {
        if (res.data) {
          let respon = res.data
          this.setData({
            'result.informerName': respon.encryptName,
            'result.phoneNumber': respon.encryptPhoneNumber
          })
        }

      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.getstorage("userInfo").then(openres => {
      app.post("getInformer", {
        openId: openres.openid
      }).then(res => {
   
        this.setData({
          openId: openres.openid,
          informerId: res.data.id
        })
      })
    })
    this.initValidate();
    if (options.result){
      let params = JSON.parse(options.result)
      console.log(params)
      this.setData({
        result: params
      })
      if(params.state==4){
        this.setData({
          editMode:true
        })
      }
      if (params.picture){
        this.setimgList(params.picture)
      }
      if (params.video){
        this.setvideoList(params.video)
      }
      if (params.informerId){
        this.getUser(params.informerId)
      }else{
        this.setData({
          useras: false
        })
      }
    }
    // this.getCaptcha()
    this.getAllIndustry()
    this.getThreadArea()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.getstorage("userInfo").then(openres => {
      app.post("getInformer", {
        openId: openres.openid
      }).then(res => {

        this.setData({
          openId: openres.openid,
          informerId: res.data.id
        })
      })
    })
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