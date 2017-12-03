// JAVA_Binding_MainUI/Binding/StudentBindingUI.js
Page({
  data: {
    userID:'',
    userName:'',
    userSchool:"厦门大学"
  },
  inputUserID:function(e)
  {
    this.userID=e.detail.value
  },
  inputUserName: function (e) {
    this.userName=e.detail.value
  },
  chooseSchool:function(){
    wx.redirectTo({
      url: './ChooseSchool1',
    })
  },
  ConfirmButton:function()
  {
    var userInfo={
      ID:this.userID,
      Name:this.userName
    }
    wx.setStorage({  //传递相应的参数
      key: 'info',
      data: userInfo,
    })
    wx.redirectTo({
      url:'../StudentMainUI/StudentMainUI',
    })
  },
  onLoad: function (options) {
    console.log("StudentBindingNow")
  },
})