var plugin = requirePlugin("myPlugin")
Page({
  data:{
    num:0
  },
  changeEvent(e) {
    // console.log(e)
    this.setData({
      num: e.detail.num
    })
  },
  onLoad: function() {
    plugin.getData()
  }
})