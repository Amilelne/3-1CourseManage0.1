// pages/index/CourseUI.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getCourseVO:'',
    listSeminarAndGradeVO:'',
    courseId:'',
    classId:'',
    seminarId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp();
    var that = this;
    //获取上个页面的数据
    console.log(options);
    that.setData({
      courseId:options.courseId,
      classId:options.classId
    });
    //获取course的相关数据
    that.getCourseInfoByCourseId();
    //获取course下的seminars
    that.getSeminarsInfoByCourseId();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {//下拉刷新数据
    var that=this;
    //获取course的相关数据
    that.getCourseInfoByCourseId();
    //获取course下的seminars
    that.getSeminarsInfoByCourseId();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 自定义函数
   * 进入某个seminar的button事件
   */
  enterSeminar: function (e) {
    var index = e.currentTarget.dataset.index;
    var groupingMethod = this.data.listSeminarAndGradeVO[index].groupingMethod;
    var seminarId = this.data.listSeminarAndGradeVO[index].id;
    wx.navigateTo({ url: '../CourseUI/seminarHome?classId=' + this.data.classId + '&seminarId=' + seminarId + '&groupingMethod=' + groupingMethod + '&courseName=' + this.data.getCourseVO.name + '&seminarName=' + this.data.listSeminarAndGradeVO[index].name + '&seminarStatus=' + this.data.listSeminarAndGradeVO[index].status});
    
  },

  /**
   * 自定义函数
   * 获取course相关信息
   */
  getCourseInfoByCourseId:function(){
    var app=getApp();
    var that=this;
    wx.request({
      url: app.data._preUrl + '/course/' + that.data.courseId,
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('course相关数据', res.data)
        if (res.statusCode==200) {
          that.setData({
            getCourseVO: res.data,
          });
        }else if(res.statusCode==404){
          wx.showModal({
            title: '提示',
            content: '未找到该课程',
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              } else if (res.cancel) {
                console.log('取消');
              }
            }
          })
        } else if (res.statusCode == 400){
          wx.showModal({
            title: '提示',
            content: '非法输入',
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              } else if (res.cancel) {
                console.log('取消');
              }
            }
          })
        } else if (res.statusCode == 403){
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
        } else if (res.statusCode == 500){
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
        } else {
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
  },

  /**
   * 自定义函数
   * 获取seminars相关信息
   */
  getSeminarsInfoByCourseId: function () {
    var app = getApp();
    var that = this;
    wx.request({
      url: app.data._preUrl + '/course/' + that.data.courseId + '/student/seminar',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('seminars相关数据', res.data)
        if (res.statusCode == 200) {
          //获取seminar的status
          var lists = res.data;
          console.log('lists-a', lists);
          var curDate = new Date();
          for (var i = 0; i < lists.length; i++) {
            var myDateStart = new Date(lists[i].startTime);
            var myDateEnd = new Date(lists[i].endTime);
            if (myDateStart > curDate) {
              lists[i].status = 2;//seminar未开始
            }
            if (myDateEnd < curDate) {
              lists[i].status = 1;//seminar已结束
            }
            if (myDateStart <= curDate && myDateEnd > curDate) {
              lists[i].status = 0;//seminar正在进行
            }
          }
          that.setData({
            listSeminarAndGradeVO: lists,
          });
          console.log('lists-f', lists);
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
        } else {
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
  },
})

