// pages/index/report/details/details.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionlist: "",//地区列表
    buttonhidden: false,//是否隐藏提交按钮
    Informer: false,//是否已提交过个人信息判断（提交过为true），关系到之后是否提交个人信息(true时不提交)，提交过所获取回的个人信息为加密（true时）将不进行表单验证
    form: {//表单组件数据
      data: {
        threadAreaId: [],//线报地域
        industryField: [],//行业领域
        informType: [{//举报类型
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
        ]
      },
      check: {
        clueAddress: "",//线索地址
        informContent: "",//举报内容
        threadAreaId: [],//线报地域 例如[0,0,0]
        industryField: "",//行业领域
        informType: "",//举报类型
        picture: [],//图片列表集合
        video: [],//视频列表集合
        code: "",//验证码
        informerName: "",//举报人名
        phoneNumber: "",//举报电话
      },
      formdata: [{
          model: "report",
          icon: "icon-ziliaoku",
          name: "举报信息",
          data: [{
              model: "threadAreaId",
              name: "线报地域",
              require: true,
              type: "regionselect",
            },
            {
              model: "clueAddress",
              name: "线索地址",
              require: true,
              type: "map",
              placeholder: "请输入详细地址"
            },
            {
              model: "industryField",
              name: "行业领域",
              type: "select",
              require: true,
            },
            {
              model: "informType",
              name: "举报类别",
              type: "select",
              require: true,
            }
          ]
        },
        {
          model: "informContent",
          icon: "icon-fuzhiwenjian",
          name: "举报详情",
          maxlength: "200",
          data: [{
            model: "informContent",
            type: "context",
            maxlength: "200",
            placeholder: "请您详细描述内容",
            class: "textareacontent"
          }]
        },
        {
          model: "picture",
          maxlength: 10,
          icon: "icon-tuwenxiangqing",
          name: "图片上传",
        },
        {
          model: "video",
          maxlength: 3,
          num: 0,
          icon: "icon-gaoqingshexiang",
          name: "视频上传",
          data: [{
            model: "code",
            require: true,
            name: "验证码",
            type: "code",
            placeholder: "请输入验证码"
          }]
        },
        {
          model: "useras",
          name: "个人信息",
          icon: "icon-guanliyuan",
          switch: true,
          data: [{
              name: "姓名",
              model: "informerName",
              require: true,
              placeholder: "请输入姓名"
            },
            {
              name: "手机号",
              model: "phoneNumber",
              require: true,
              placeholder: "请输入手机号"
            }
          ]
        }
      ]
    }
  },
  submit(res) {
    // console.log(res)
    let url = "saveInformation"//默认的提交地址
    let saveobj = {}
    let params = res.detail.value
    // 下面是数据转化index To text
    params["informType"] = this.data.form.data.informType[res.detail.value.informType].label
    params["industryField"] = this.data.form.data.industryField[res.detail.value.industryField].label
    // 线报地域很坑爹三级联动后台只要最后一位有效id例如[1,2,3]取3 [1,2,0]取2 [1,0,0]取1是个容易出bug的地方l例如[1,2,null]所以下面处理了一下null换成0
    res.detail.value.threadAreaId[2] = res.detail.value.threadAreaId[2] ? res.detail.value.threadAreaId[2]:0;
    params['threadAreaId'] = this.data.form.data.threadAreaId[2][res.detail.value.threadAreaId[2]].id ? this.data.form.data.threadAreaId[2][res.detail.value.threadAreaId[2]].id : this.data.form.data.threadAreaId[1][res.detail.value.threadAreaId[1]].id ? this.data.form.data.threadAreaId[1][res.detail.value.threadAreaId[1]].id : this.data.form.data.threadAreaId[0][res.detail.value.threadAreaId[0]].id
    params['picture'] = this.data.form.check.picture
    params["video"] = this.data.form.check.video
    app.getstorage("userInfo").then(openres => {
      //获取openid
      params["openId"] = openres.openid
      if (!params.useras) {//实名匿名举报useras
        url = "anonymitySaveInformation"//匿名举报地址
        app.post(url, params).then(res => {
          if (res.data.success) {
            wx.redirectTo({
              url: "/pages/logs/record/record"
            })
          }
        })
      } else {
        // 实名举报
        if (this.data.Informer) {//是否已提交个人信息至数据库
          app.post("getInformer", {//获取个人信息id
            openId: openres.openid
          }).then(res => {
            if (params.useras) {//实名举报需提交informerId即个人信息id
              params["informerId"] = res.data.id
            }
            app.post(url, params).then(res => {
              if (res.data.success) {
                wx.redirectTo({
                  url: "/pages/logs/record/record"
                })
              }
            })
          })
        } else {
          app.post("saveInformer", {//未已提交个人信息需先提交个人信息至数据库
            openId: params.openId,
            informerName: params.informerName,
            phoneNumber: params.phoneNumber
          }).then(res => {
            app.post("getInformer", {
              openId: openres.openid
            }).then(res => {
              if (params.useras) {
                params["informerId"] = res.data.id
              }
              app.post(url, params).then(res => {
                if (res.data.success) {
                  wx.redirectTo({
                    url: "/pages/logs/record/record"
                  })
                }
              })
            })
          })
        }
      }
    })
  },
  bindcancel(res) {
    console.log(res)
  },
  selectchage(res) {//组件通用选择事件更改对应数据
    let params = {}
    params["form.check." + res.detail.value.type] = res.detail.value.value
    this.setData(params)
  },
  regionChange(res) {//线报地域确定
    this.setData({
      "form.check.threadAreaId": res.detail.value
    })
  },
  columnchange(res) {//线报地域列
    this.setData({
      "form.check.threadAreaId": []
    })
    var region=[]
    let pId = this.data.form.data.threadAreaId[res.detail.value.column][res.detail.value.value].id
    // 查询父级id可能为空哦此处有bug无pId时赋值任意值
    pId = pId ? pId:999999999999999;
    region = this.data.regionlist.filter((i, v) => {
      return i.pId == pId
    })
    if (res.detail.value.column == 0) {//第一列滚动变化
      region.push({ id: '', regionName: '' })//添加了一个空选项
      this.setData({
        "form.data.threadAreaId[1]": region,//根据第一列变化得出pid筛选第二列数据
        "form.data.threadAreaId[2]": []//第三列置空
      })
    } else if (res.detail.value.column == 1) {//第二列滚动变化
      region.push({ id: '', regionName: '' })
      this.setData({
        "form.data.threadAreaId[2]": region,
      })
    } else {
      // this.setData({
      //   "form.data.region": this.data.form.data.region
      // })
    }
  },
  location(res) {//线索地址
    this.setData({
      "form.check.clueAddress": res.detail.value
    })
  },
  text(res) {//不知道宇轩写着干啥的—_—,找到了是举报详情
    let data = {}
    data["form.check." + res.detail.value.type] = res.detail.value.value
    this.setData(data)
  },
  addimg(res) {//添加图片
    let arr = this.data.form.check.picture
    arr.push(res.detail.value)
    this.setData({
      "form.check.picture": arr
    })
  },
  addvideo(res) {//添加录像
    let arr = this.data.form.check.video
    arr.push(res.detail.value)
    this.setData({
      "form.check.video": arr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    app.getstorage("userInfo").then(res => {
      app.post("getInformer", {//获取用户信息
        openId: res.openid
      }).then(res => {
        if (res.data) {
          let respon = res.data
          that.setData({
            Informer: true,
            'form.check.informerName': respon.encryptName,
            'form.check.phoneNumber': respon.encryptPhoneNumber
          })
        }

      })
    })
    //获取线报地域默认取值个列的第一个
    app.post("getAll").then(res => {
      let data = res.data.filter((i, v) => {
        return i.pId == -1
      })
      let child = res.data.filter((i, v) => {
        return i.pId == data[0].id
      })
      let child2 = res.data.filter((i, v) => {
        return i.pId == child[0].id
      })
      let emptyObj = { id: '', regionName: '' }
      child.push(emptyObj)
      child2.push(emptyObj)
      this.setData({
        regionlist: res.data,
        "form.data.threadAreaId[0]": data,
        "form.data.threadAreaId[1]": child,
        "form.data.threadAreaId[2]": child2
      })
    })
    //行业领域
    app.post("findAllIndustry").then(res => {
      res.data.forEach((i, v) => {
        i["label"] = i.content
      })
      this.setData({
        "form.data.industryField": res.data
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