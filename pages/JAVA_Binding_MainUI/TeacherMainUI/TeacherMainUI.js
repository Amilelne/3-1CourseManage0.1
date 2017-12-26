// JAVA_Binding_MainUI/TeacherMainUI/TeacherMainUI.js
Page({

data: {
  userID:'',
  userName:'',
  userSchool:'',
  courses:[],
  },
  btnToCourse:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var course = this.data.courses[index];
    var app = getApp();
    app.data._courseID = this.data.courses[index].id;
    wx.navigateTo({
      url: '../../TeacherClass/ClassManage/ClassManage?courseName=' + course.name,
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
    var app = getApp()
    const that = this
    //先设置教工号
    app.data._userID ='20170315'
    console.log("TeacherMain")
    that.setData({
      userID:app.data._userID,
      userName:app.data._userName
    })
    /***********************************************
     * 获取course数据
     */
    var jwtValue
    wx.getStorage({
      key: 'jwt',
      success: function(res) {
        jwtValue=res.data
      },
    })
    wx.request({
      url: app.data._preUrl+'/course',
      header:{
        'Authorization': 'Bearer '+jwtValue
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          courses:res.data
        })
      }
    })
  },

})