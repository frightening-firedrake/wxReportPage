const configUrl = "http://192.168.1.252:8081/reportingSystem/"
// const configUrl = "http://192.168.1.253:8082/reportingSystem/"
let post = (url, data, header = {}) => {
  wx.showLoading({
    title: "加载中",
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: configUrl + url,
      data: data,
      method: "POST",
      // application/x-www-form-urlencoded
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        wx.hideLoading()
        resolve(res)
      },
      fail: function(err) {
        wx.hideLoading()
        reject(err)
      }
    })
  })

}
let get = (url, data = "") => {
  wx.showLoading({
    title: "加载中",
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: configUrl + url,
      data: data,
      method: "GET",
      // application/x-www-form-urlencoded
      success: function(res) {
        wx.hideLoading()
        resolve(res)
      },
      fail: function(err) {
        wx.hideLoading()
        reject(err)
      }
    })
  })
}
module.exports = {
  get: get,
  post: post,
  configUrl: configUrl
}