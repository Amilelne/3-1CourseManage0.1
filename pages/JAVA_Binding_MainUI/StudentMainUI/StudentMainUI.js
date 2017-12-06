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
    const that = this/*
    var checkinfo =
      {
        Name: that.userName,
        ID: that.userID,
        School: that.userSchool,
      }
    wx.setStorage({
      key: 'cinfo-student',
      data: checkinfo,
    })*/
    wx.navigateTo({
      url: '../StudentMainUI/CheckStudentInfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log("StudentMain")
    /*
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
    })*/
    const that=this
    wx.request({
      url: 'http://120.77.173.98:8301/me',
      method:"GET",
      success:function(res)
      {
        that.setData({
          userID: "学号：" + res.data.number,
          userName: "姓名：" + res.data.type,
          userSchool: "学校：" + res.data.School
        })
      }
    })
  }
})