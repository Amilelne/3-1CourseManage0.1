// JAVA_Binding_MainUI/TeacherMainUI/TeacherMainUI.js
Page({

data: {
  userID:'',
  userName:'',
  userSchool:'',
  courses:["OOAD","J2EE","操作系统","数据仓库"],
  },
  btnToCourse:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var coursename = this.data.courses[index];
    console.log(coursename);
    wx.navigateTo({
      url: '../../TeacherClass/ClassManage/ClassManage?courseName=' + coursename,
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
    /*
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
    })*/
    const that = this
    wx.request({
      url: 'http://120.77.173.98:8301/me',
      method: "GET",
      success: function (res) {
        that.setData({
          userID: "教工号：" + res.data.number,
          userName: "姓名：" + res.data.type,
          userSchool: "学校：" + res.data.School
        })
      }
    })
  },

})