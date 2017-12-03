// JAVA_Binding_MainUI/TeacherMainUI/TeacherMainUI.js
Page({

data: {
  userID:'',
  userName:'',
  userSchool:''
  },
  btnToCourse:function(){
    wx.navigateTo({
      url: '../../student/CourseUI/CourseMain',
    })
  },
  CheckInfo:function(){
    const that = this
    var checkinfo=
    {
      Name:that.userName,
      ID:that.userID,
      School:that.userSchool,
    }
    wx.setStorage({
      key: 'cinfo-teacher',
      data: checkinfo,
    })
    wx.navigateTo({
      url: '../TeacherMainUI/CheckTeacherInfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log("TeacherMain")
    const that = this
    wx.getStorage({ //获得绑定页的姓名教工号
      key: 'info',
      success: function (res) {
        that.userID = "教工号：" + res.data.ID
        that.userName="姓名：" + res.data.Name
        that.userSchool= "学校：" + res.data.School
        that.setData
          ({
            userID: "教工号：" + res.data.ID,
            userName: "姓名：" + res.data.Name,
            userSchool:"学校："+res.data.School
          })
      },
    })
  },

})