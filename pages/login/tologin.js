Page({
  data: {
    showModalStatus: true,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo: function(e) {
    var that = this;
    //此处授权得到userInfo
    console.log(e.detail.userInfo);
    //接下来写业务代码

    //最后，记得返回刚才的页面
    wx.navigateBack({
      delta: 1
    })
  }
})