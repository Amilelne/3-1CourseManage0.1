// JAVA_Binding_MainUI/TeacherMainUI/TeacherMainUI.js
Page({

data: {
  userID:'',
  userName:'',
  userNumber:'',
  userSchool:'',
  courses:[{"id":1,"name":"OOAD"},{"id":1,"name":"J2EE"}],
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
        console.log(res);
        if(res.data!=null){
          that.setData({
            userName: res.data.name,
            userNumber: res.data.number
          });
        }else{
          wx.showModal({
            title: '提示',
            content: '信息获取失败',
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              } else if (res.cancel) {
                console.log('取消');
              }
            }
          });
        }
      },
      fail:function(res){
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '信息获取失败',
          success: function (res) {
            if (res.confirm) {
              console.log('确定');
            } else if (res.cancel) {
              console.log('取消');
            }
          }
        });
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
        console.log(res.data);
        if(res.statusCode==200){
          that.setData({
            courses: res.data
          });
        }else{
          wx.showModal({
            title: '提示',
            content: '信息获取失败',
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              } else if (res.cancel) {
                console.log('取消');
              }
            }
          });
        }
      },
      fail:function(res){
        wx.showModal({
          title: '提示',
          content: '信息获取失败',
          success: function (res) {
            if (res.confirm) {
              console.log('确定');
            } else if (res.cancel) {
              console.log('取消');
            }
          }
        });
      }
    })
  },

})