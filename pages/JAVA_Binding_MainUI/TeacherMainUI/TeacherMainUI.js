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
    const that = this
    var app=getApp()
    that.setData({
      userID:"教工号"+app.data._userID,
      userName:"姓名:"+app.data._userName
    })
  },

})