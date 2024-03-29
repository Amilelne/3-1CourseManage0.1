// JAVA_Binding_MainUI/TeacherMainUI/TeacherMainUI.js
Page({

data: {
  userID:'',
  userName:'',
  userNumber:'',
  userSchool:'',
  courses:[],
  },
  btnToCourse:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var course = this.data.courses[index];
    /**
     * 设置courseID
     */
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
    console.log("TeacherMain")
    const that = this
    var app=getApp()
    that.setData({
      userID:app.data._userID,
      userName:app.data._userName
    })
    /**
     * 获取教师基本信息
     */
    wx.request({
      url:app.data._preUrl+'/me',
      header:{
        'Authorization': 'Bearer ' + app.data._jwt
      },
      success:function(res){
        var app = getApp()
        app.data._userName =res.data.name
        app.data._userID = res.data.number
        app.data._userPhone=res.data.phone
        app.data._userSchool=res.data.school.name
        if(res.data.name){
          that.setData({
            userName: res.data.name
          })
        }
        if(res.data.number){
          that.setData({
            userNumber: res.data.number
          })
        }
        
      }
    })
    /***********************************************
     * 获取course数据
     */
    wx.request({
      url: app.data._preUrl+'/course',
      header:{
        'Authorization':'Bearer '+app.data._jwt
      },
      success:function(res){
       if(res.data){
         that.setData({
           courses: res.data
         })
       }  
      }
    })
  },

})