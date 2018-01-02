// JAVA_Binding_MainUI/Binding/ChooseCharacter.js
Page({

  data: {},

  TeacherButton:function(){
    var app=getApp();
    app.data._userType=1;
    wx.request({
      url: app.data._preUrl +'/auth/weChat',
      data: {
        code: app.data._code,
        "type": 1,//app.data._userType
      },
      header: {
        "content-type": "application/json"
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        app.data._jwt = res.data.jwt;
        app.data._openid = res.data.openid;
        app.data._userId = res.data.userId;
        if (res.data.status=='unbind') {
          wx.redirectTo({
            url: '../Binding/TeacherBindingUI',
          })
        } else {
          wx.redirectTo({
            url: '../TeacherMainUI/TeacherMainUI',
          })
        }
      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '信息获取失败',
          success: function (res) {
            if (res.confirm) {
              console.log('确定');
            } else if (res.cancel) {
              console.log('取消');
            }
          }
        });
        wx.reLaunch({
          url: '../Binding/ChooseCharacter'
        });
      }
    });
    //可能得删除
    wx.removeStorage({
      key: 'school',
      success: function(res) {},
    });
  },

  StudentButton: function () {
    var app = getApp();
    app.data._userType = 0;
    wx.request({
      url: app.data._preUrl+'/auth/weChat',
      data: {
        code: app.data._code,
        "type": 0,//app.data._userType
      },
      header: {
        "content-type": "application/json"
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        app.data._jwt = res.data.jwt;
        app.data._openid = res.data.openid;
        app.data._userId = res.data.userId;
        if (res.data.status == 'unbind') {
          wx.redirectTo({
            url: '../Binding/StudentBindingUI',
          })
        } else {
          wx.redirectTo({
            url: '../StudentMainUI/StudentMainUI',
          })
        }
      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '信息获取失败',
          success: function (res) {
            if (res.confirm) {
              console.log('确定');
            } else if (res.cancel) {
              console.log('取消');
            }
          }
        });
        wx.reLaunch({
          url: '../Binding/ChooseCharacter'
        });
      }
    });
    //可能得删除
    wx.removeStorage({
      key: 'school',
      success: function (res) { },
    })
  },

  onLoad: function (options) {
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var app=getApp();
          app.data._code=res.code;
        } else {
          console.log('获取用户登录失败：' + res.errMsg);
        }
      },
      fail:function(res){
        console.log(res);
      }
    });
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res);
    //           // 可以将 res 发送给后台解码出 unionId
    //           var app=getApp();
    //           app.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             var app = getApp();
    //             app.userInfoReadyCallback(res)
    //           }
    //         },
    //         fail: function (res) {
    //           console.log("wx.getUserInfo失败", res);
    //         }
    //       })
    //     }
    //   },
    //   fail:function(res){
    //     console.log("wx.getSetting失败",res);
    //   }
    // })
  },

  onReady:function(options){

  }
})