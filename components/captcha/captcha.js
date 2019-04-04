Component({
  ready() {
    let width = 50
    let height = 30
    let x = parseInt(Math.random() * (this.data.firstcanvas.firstwidth / 2) + (this.data.firstcanvas.firstwidth / 4))
    let y = parseInt(Math.random() * (this.data.firstcanvas.firstheight / 2) + (this.data.firstcanvas.firstheight / 4))
    let that = this
    console.log(x,y,width,height)
    const ctx = wx.createCanvasContext('firstcanvas', this)
    const ccc = wx.createCanvasContext('canvas', this)
    ctx.drawImage("../../image/index/login.png", 0, 0, this.data.firstcanvas.firstwidth, this.data.firstcanvas.firstheight)
    ctx.setFillStyle('white')
    ctx.fillRect(x, y, width, height)
    ctx.draw()
    ccc.fillRect(x, y, width, height)
    ccc.clip()
    ccc.drawImage("../../image/index/login.png", 0, 0, this.data.firstcanvas.firstwidth, this.data.firstcanvas.firstheight)
    ccc.draw()
    this.setData({
      canvasstyle: {
        left: "-" + x
      },
      left: "-" + x
    })
  },
  data: {
    imageurl: "",
    canvasstyle: {

    },
    firstcanvas: {
      firstwidth: "600",
      firstheight: "300"
    },
    left: "",
    x: "",
    y: ""
  },
  methods: {
    move: function(e) {
      console.log(e)
      let offset = this.data.left
      this.setData({
        'canvasstyle.left': e.detail.x + offset * 1
      })
    },
    end: function(e) {
      if (this.data.canvasstyle.left < 10 && this.data.canvasstyle.left > -9) {
        console.log("验证成功")
      } else {
        console.log("验证失败")
      }
    },
    jjj: function(e) {
      console.log(e)
    }
  }
})