//app.js
var WXBizDataCrypt = require('./utils/RdWXBizDataCrypt.js');
var AppId ='wx0e1ff5086222b3e9';
var AppSecret = '5599d7f48b4306bd8a3809538fa5323b';
var app=getApp();

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
    _preUrl:'http://localhost:8090'
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that=this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          console.log(res);
          wx.request({
            url: app.data._preUrl+'/auth/weChat',
            data:{
              code:res.code
            },
            header:{
              "content-type":"application/x-www-form-urlencoded"
            },
            method:'POST',
            success:function(res){
              console.log(res.data);
              //保存3rdSession到storage中
              var pc=new WXBizDataCrypt(AppId,res.data.session_key);
              wx.getUserInfo({
                success: function (res) {
                  var dedata = pc.decryptData(res.encryptedData, res.iv);
                  that.setData({openId:dedata.openId});
                  //保存解密后的信息到storage中
                  wx.setStorage({
                    key: 'decryptData',
                    data: dedata,
                  })
                  console.log('解密后 data: ', data);
                }
              })
              wx.setStorage({
                key: 'thirdSession',
                data: res.data.thridSession,
              });
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