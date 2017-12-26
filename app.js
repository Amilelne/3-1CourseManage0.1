//app.js
var WXBizDataCrypt = require('./utils/RdWXBizDataCrypt.js');
var AppId ='wx0e1ff5086222b3e9';
var AppSecret = '5599d7f48b4306bd8a3809538fa5323b';
var that = this;

App({
  data: {
    _userName:'',
    _userID:'',
    _userSchool:'',
    _userType:1,    //0:学生，1：老师
    _hasSetName:false,
    _hasSetID:false,
    _hasSetSchool:false,
    _schoolCity:'',
    _schoolProvince:'',
    _courseID:1,
    _classID:1,
    _seminarID:1,
    _preUrl:'http://localhost:8080',
  },
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          //var that=this;
          wx.request({
            url: 'http://localhost:8080/auth/weChat',
            data:{
              code:res.code,
              "type": 0,
            },
            header:{
              "content-type":"application/json"
            },
            method:'POST',
            success:function(res){
              console.log(res.data);
              wx.setStorage({
                key: 'jwt',
                data: res.data.jwt,
              });
              wx.setStorage({
                key: 'openid',
                data: res.data.openid,
              });
              wx.setStorage({
                key: 'userId',
                data: res.data.userId,
              });
              if(res.data.status){
                wx.navigateTo({
                  url: '../Binding/ChooseCharacter',
                })
              }else{
                wx.request({
                  url: 'http://localhost:8080/me',
                  header: {
                    "content-type": "application/json",
                    'Authorization': res.data.jwt,
                  },
                  method: 'GET',
                  success: function (ress) {
                    console.log(ress);
                  }
                })
                wx.navigateTo({
                  url: '../Binding/ChooseCharacter',
                })
              }
              // app.data._openId = res.data.openid;
              // app.data._userId = res.data.userId;
              // var _openId = res.data.openid;
              // var _userId = res.data.userId;
              // that.setData(_openId);
              // that.setData(_userId);
              // that.setData({
              //   _openId:"res.data.openid",
              //   _userId:"res.data.userId",
              // });
              // app.data._openId = res.data.openid;
              // app.data._userId = res.data.userId;
              // app.setData({
              //   _openId:res.data.openid,
              //   _userId:res.data.userId,
              // });

            },
            fail:function(res){
              console.log(res);
            }
          })
        }else{
          console.log('获取用户登录失败：'+res.errMsg);
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})