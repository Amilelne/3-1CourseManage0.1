const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

function refreshSessionKey(){
  var app=getApp();
  var that=this;
  wx.getUserInfo({
    success: function (res) {
      console.log(res);
      wx.request({
        url: app.data._preUrl + '/auth/refresh',
        header: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + app.data._jwt,
        },
        method: 'GET',
        success: function (res) {
          console.log('更新成功', res.data);
          if(res.data!=null){
            app.data._jwt = res.data;
          }
        },
        fail: function (res) {
          console.log('用户拒绝', res.data);
        }
      })
    }
  })
  if (app.globalData.userInfo) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  } else if (this.data.canIUse) {
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
}

module.exports = refreshSessionKey
