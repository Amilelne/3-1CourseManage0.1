// JAVA_Binding_MainUI/Binding/ChooseCharacter.js
Page({

  data: {},
  TeacherButton:function(){
    var app=getApp()
    app.data._userType=1,
    wx.removeStorage({
      key: 'school',
      success: function(res) {},
    })
    wx.navigateTo({
      url:'../Binding/TeacherBindingUI',
    })
  },
  StudentButton: function () {
    var app = getApp()
    app.data._userType = 0,
    wx.removeStorage({
      key: 'school',
      success: function (res) { },
    })
    wx.navigateTo({
      url: '../Binding/StudentBindingUI',
    })
  },
  onLoad: function (options) {
  },
  onReady:function(options){

  }
})