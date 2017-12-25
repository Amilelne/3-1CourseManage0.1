//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //可以避免session-key过期的情况
    // wx.getUserInfo({
    //   success:function(res){
    //     console.log(res);
    //     wx.request({
    //       url: app.data._preUrl+'/auth/weChat',
    //       data:{
    //         thirdSesssion:wx.getStorageSync('thirdSession'),
    //         encryptedData:res.encryptedData,
    //         iv:res.iv
    //       },
    //       header:{
    //         "content-type":"application/x-www-form-urlencoded"
    //       },
    //       method:'POST',
    //       success:function(res){
    //         console.log('更新成功');
    //       },
    //       fail:function(res){
    //         console.log('用户拒绝');
    //         console.log(res);
    //       }
    //     })
    //   }
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
