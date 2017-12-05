// JAVA_Binding_MainUI/Binding/ChooseCharacter.js
Page({

  data: {},
  TeacherButton:function(){
    wx.navigateTo({
      url:'../Binding/TeacherBindingUI',
    })
  },
  StudentButton: function () {
    wx.navigateTo({
      url: '../Binding/StudentBindingUI',
    })
  },
  onLoad: function (options) {
  },
  onReady:function(options){

  }
})