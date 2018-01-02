//app.js
var AppId ='wx0e1ff5086222b3e9';
var AppSecret = 'c0bc5f7ab3886cf2124e676b5c0df1b5';
var that = this;

App({
  data: {
    _userName:'',
    _userNum:'',
    _userSchool:'',
    _userType:1,    //0:学生，1：老师
    _userPhone:'',
    _userPassword:'',
    _hasSetPhone:false,
    _hasSetPassword:false,
    _hasSetName:false,
    _hasSetID:false,
    _hasSetSchool:false,
    _schoolCity:'',
    _schoolProvince:'',
    _courseID:1,
    _classID:1,
    _seminarID:1,
    _signUp:0,
    _grade:[0,0,0,0,0],
    _preUrl: 'http://10.30.176.131:8080',

    _code:'',
    _jwt:'',
    _openid:'',
    _userId:'',
    
  },
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null
  }
})