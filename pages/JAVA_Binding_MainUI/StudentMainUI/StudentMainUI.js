// JAVA_Binding_MainUI/StudentMainUI/StudentMainUI.js
Page({
  data: {
    userDetailVO:'',
    studentClassVOS:'',
      // String courseName;
      // BigInteger courseId;
      // String courseTeacher;
      // String className;
      // BigInteger classId;
      // String site;
  },
  btnToCourse:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var coursename=this.data.studentClassVOS[index].course;
    wx.navigateTo({
      url: '../../student/CourseUI/CourseMain?courseID=' + this.data.studentClassVOS[index].courseId,
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
    var app=getApp();
    const that = this;
    console.log("StudentMain");
    //可以避免session-key过期的情况
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        wx.request({
          url: app.data._preUrl +'/auth/refresh',
          header:{
            "content-type": "application/json",
            "Authorization": 'Bearer ' + app.data._jwt,
          },
          method:'GET',
          success:function(res){
            console.log('更新成功', res.data);
            app.data._jwt=res.data;
          },
          fail:function(res){
            console.log('用户拒绝', res.data);
          }
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //获取选课数据
    wx.request({
      url: app.data._preUrl + '/course/student',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('选课信息',res);
        if(res.statusCode==200){
          that.setData({ studentClassVOS: res.data });
        }
      },          
      fail:function(res){
        console.log(res);
      }
    });

    //获取学生信息
    wx.request({
      url: app.data._preUrl + '/me',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('学生信息',res);
        if (res.data!=null){
          that.setData({
            userDetailVO:res.data
          });
          console.log('页面数据',that.data);
        }
      },
      fail:function(res){
        console.log(res);

      }
    });
    
  }
})