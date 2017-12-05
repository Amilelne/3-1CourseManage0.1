// JAVA_Binding_MainUI/StudentMainUI/StudentMainUI.js
Page({

  data: {
    userID: '',
    userName: '',
    userSchool: '',
  },
  btnToCourse:function(){
    wx.navigateTo({
      url: '../../student/CourseUI/CourseMain',
    })
  },
  CheckInfo: function () {
    const that = this
    var checkinfo =
      {
        Name: that.userName,
        ID: that.userID,
        School: that.userSchool,
      }
    wx.setStorage({
      key: 'cinfo-student',
      data: checkinfo,
    })
    wx.navigateTo({
      url: '../StudentMainUI/CheckStudentInfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log("StudentMain")
    const that = this
    wx.getStorage({ //获得绑定页的姓名学号
      key: 'info',
      success: function (res) {
        that.userID = "学号：" + res.data.ID
        that.userName = "姓名：" + res.data.Name
        that.userSchool = "学校：" + res.data.School
        that.setData
          ({
            userID: "学号：" + res.data.ID,
            userName: "姓名：" + res.data.Name,
            userSchool: "学校：" + res.data.School
          })
      },
    })
  }
})