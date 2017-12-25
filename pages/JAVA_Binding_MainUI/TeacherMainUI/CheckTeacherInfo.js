// JAVA_Binding_MainUI/TeacherMainUI/CheckTeacherInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:'',
    userName:'',
    userSchool:'',
    userNumber:'手机号：188888888'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  Unbind:function()
  {
    wx.showModal({
      title: '提示',
      content: '确定要解绑吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('UnbindingSucess')
          wx.navigateTo({
            url: '../Binding/ChooseCharacter',
          })
        }
    }
    }
    )
  },
  onLoad: function (options) {
    console.log("CheckTeacherInfo")
    const that = this
    var app = getApp()
    that.setData({
      userID: "教工号:" + app.data._userID,
      userName: "姓名:" + app.data._userName,
      userSchool: "学校:" + app.data._userSchool,
    })
    wx.getStorage({
      key: 'school',
      success: function(res) {
        that.setData({
          userSchool: "学校:"+res.data
        })
      },
    })
  },
})