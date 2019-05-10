// pages/index/phoneReport/phoneReport.js
const pinyinUtil = require('../../../utils/pinyinUtil.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    threadArea: []
  },
  isFather(id,arr){
    return arr.some((item)=>{
      return item.pId==id
    })
  },
  slideDown(e){
    var index=this.data.threadArea.findIndex((item)=>{
      return item.id == e.target.dataset.id
    })
    this.data.threadArea[index].slide = !this.data.threadArea[index].slide
    this.setData({
      threadArea: this.data.threadArea
    })
  },
  makePhoneCall(e){
    var phoneNum = e.target.dataset.num;
    console.log(phoneNum)
    if (phoneNum){
      wx.makePhoneCall({
        phoneNumber: phoneNum
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '您选择的地区暂未开通电话举报，请尝试上一级举报中心进行举报，如遇紧急情况请拨打110',
        showCancel: false,
        success(res) {
          if (res.confirm) {

          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.post("getAll").then(res => {
      var threadArea = res.data
      threadArea.map((item)=>{
        if (this.isFather(item.id, threadArea)){
          item.slide = item.pId==-1?true:false
        }
        return item
      })
      threadArea = threadArea.sort((a,b)=>{
        if (pinyinUtil.getFirstLetter(a.regionName) > pinyinUtil.getFirstLetter(b.regionName)){
          return 1
        }else{
          return -1
        }
      })
      this.setData({
        threadArea:threadArea
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