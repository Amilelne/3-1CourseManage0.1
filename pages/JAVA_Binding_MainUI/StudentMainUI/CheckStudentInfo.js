// JAVA_Binding_MainUI/StudentMainUI/CheckStudentInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: '',
    userName: '',
    userSchool: '',
    userNumber: '手机号：188888888'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  Unbind: function () {
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
    /*
    wx.getStorage({ //获得绑定页的姓名学号
      key: 'cinfo-student',
      success: function (res) {
        that.setData
          ({
            userID: res.data.ID,
            userName: res.data.Name,
            userSchool: res.data.School
          })
      },
    })*/
    wx.request({
      url: 'http://120.77.173.98:8301/me',
      method:"GET",
      success: function(res) {
        that.setData({
          userID: "学号：" + res.data.number,
          userName: "姓名：" + res.data.type,
          userSchool: "学校：厦门大学",
        })
        console.log(res)
      },
    })
  },
})