// JAVA_Binding_MainUI/StudentMainUI/StudentMainUI.js
Page({
  data: {
    userName:'',
    userNumber:'',
    userDetailVO:'',
    studentClassVOS:'',
      // String courseName;
      // BigInteger courseId;
      // String courseTeacher;
      // String className;
      // BigInteger classId;
      // String site;
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var app=getApp();
    var that = this;
    console.log("StudentMain");
    //获取学生信息
    that.getUserInfo();
    //获取选课数据
    that.getCoursesInfo();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {//下拉刷新数据
    var app = getApp();
    var that = this;
    //获取学生信息
    that.getUserInfo();
    //获取选课数据
    that.getCoursesInfo();
  },

  /**
   * 自定义函数
   * 进入某门课程的button事件
   */
  btnToCourse: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var coursename = this.data.studentClassVOS[index].course;
    wx.navigateTo({
      url: '../../student/CourseUI/CourseMain?courseId=' + this.data.studentClassVOS[index].courseId + '&classId=' + this.data.studentClassVOS[index].classId,
    })
  },

  /**
   * 自定义函数
   * 查看个人信息的button事件（未使用）
   */
  CheckInfo: function () {
    const that = this
    wx.navigateTo({
      url: '../StudentMainUI/CheckStudentInfo',
    })
  },

  /**
   * 自定义函数
   * 获取学生信息
   */
  getUserInfo:function(){
    var app=getApp();
    var that=this;
    wx.request({
      url: app.data._preUrl + '/me',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('学生信息', res);
        if (res.statusCode==200 && res.data != null) {
          that.setData({
            userName: res.data.name,
            userNumber: res.data.number,
            userDetailVO: res.data
          });
          app.data._userName = res.data.name;
          app.data._userNum = res.data.number;
          app.data._userSchool=res.data.school.name;
          console.log('页面数据', that.data);
        }
        // }else if(res.statusCode==404||res.statusCode==400){
        //   wx.showModal({
        //     title: '提示',
        //     content: '未找到该用户',
        //     success: function (res) {
        //       if (res.confirm) {
        //         console.log('确定');
        //       } else if (res.cancel) {
        //         console.log('取消');
        //       }
        //     }
        //   })
        // } else if (res.statusCode == 403) {
        //   wx.showModal({
        //     title: '提示',
        //     content: '没有权限',
        //     success: function (res) {
        //       if (res.confirm) {
        //         console.log('确定');
        //       } else if (res.cancel) {
        //         console.log('取消');
        //       }
        //     }
        //   })
        // } else if (res.statusCode == 500) {
        //   wx.showModal({
        //     title: '提示',
        //     content: '服务器内部错误',
        //     success: function (res) {
        //       if (res.confirm) {
        //         console.log('确定');
        //       } else if (res.cancel) {
        //         console.log('取消');
        //       }
        //     }
        //   })
        // } else {
        //   wx.showModal({
        //     title: '提示',
        //     content: '获取信息失败',
        //     success: function (res) {
        //       if (res.confirm) {
        //         console.log('确定');
        //       } else if (res.cancel) {
        //         console.log('取消');
        //       }
        //     }
        //   })
        // }
      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '请求失败',
          success: function (res) {
            if (res.confirm) {
              console.log('确定');
            } else if (res.cancel) {
              console.log('取消');
            }
          }
        })
      }
    });
  },

  /**
   * 自定义函数
   * 获取选课数据
   */
  getCoursesInfo:function(){
    var app=getApp();
    var that=this;
    wx.request({
      url: app.data._preUrl + '/course/student',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('选课信息', res);
        if (res.statusCode == 200 && res.data instanceof Array) {
          that.setData({ studentClassVOS: res.data });
        }else if(res.statusCode==404){
          wx.showModal({
            title: '提示',
            content: '未找到课程',
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              } else if (res.cancel) {
                console.log('取消');
              }
            }
          })
        } else if (res.statusCode == 403) {
          wx.showModal({
            title: '提示',
            content: '没有权限',
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              } else if (res.cancel) {
                console.log('取消');
              }
            }
          })
        } else if (res.statusCode == 500) {
          wx.showModal({
            title: '提示',
            content: '服务器内部错误',
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              } else if (res.cancel) {
                console.log('取消');
              }
            }
          })
        } else{
          wx.showModal({
            title: '提示',
            content: '获取信息失败',
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              } else if (res.cancel) {
                console.log('取消');
              }
            }
          })
        }
      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '请求失败',
          success: function (res) {
            if (res.confirm) {
              console.log('确定');
            } else if (res.cancel) {
              console.log('取消');
            }
          }
        })
      }
    });
  }
})