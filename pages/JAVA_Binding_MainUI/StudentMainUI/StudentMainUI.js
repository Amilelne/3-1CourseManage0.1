// JAVA_Binding_MainUI/StudentMainUI/StudentMainUI.js
Page({

  data: {
    userID: '',
    userName: '',
    userSchool: '',
    courtea: [{ course: "J2EE", teacher: "邱明" }, { course: "OOAD", teacher: "邱明" }, { course: "操作系统", teacher: "吴清强" }, { course: "数据仓库", teacher: "王鸿吉"} ],
  },
  btnToCourse:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var coursename=this.data.courtea[index].course;
    wx.navigateTo({
      url: '../../student/CourseUI/CourseMain?courseName='+coursename,
    })
  },
  CheckInfo: function () {
    const that = this
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
    var app = getApp()
    that.setData({
      userID: "学号" + app.data._userID,
      userName: "姓名:" + app.data._userName
    })
  }
})