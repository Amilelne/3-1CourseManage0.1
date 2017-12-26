// pages/index/CourseUI.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    getCourseVO:'',
    listSeminarAndGradeVO:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp();
    //可以避免session-key过期的情况
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res);
    //     wx.request({
    //       url: app.data._preUrl + '/auth/refresh',
    //       header: {
    //         "content-type": "application/json",
    //         "Authorization": 'Bearer ' + app.data._jwt,
    //       },
    //       method: 'GET',
    //       success: function (res) {
    //         console.log('更新成功', res.data);
    //         if(res.data!=null){
    //           app.data._jwt = res.data;
    //         }
    //       },
    //       fail: function (res) {
    //         console.log('用户拒绝', res.data);
    //       }
    //     })
    //   }
    // })
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
    //****************获得各个seminar，以及获得上面的标题 
    const that=this;
    console.log('courseId',options.courseID);
    //获取course的相关数据
    wx.request({
      url: app.data._preUrl+'/course/'+options.courseID,
      header:{
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method:'GET',
      success:function(res){
        console.log('course相关数据',res.data)
        if("data" in res && res.data!=null){
          that.setData({
            getCourseVO: res.data,
          });
        }
      },
      fail:function(res){
        console.log(res);
      }
    });
    //获取course下的seminars
    wx.request({
      url: app.data._preUrl + '/course/' + options.courseID+'/student/seminar',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: "GET",
      success: function (res) {
        console.log('seminars相关数据',res.data);
        if ("data" in res && res.data != null){
          //获取seminar的status
          var lists = res.data;
          console.log('lists-a', lists);
          var curDate = new Date();
          for (var i = 0; i < lists.length; i++) {
            var myDate = new Date(lists[i].startTime);
            lists[i].status = myDate < curDate;
          }
          that.setData({
            listSeminarAndGradeVO: lists,
          });
          console.log('lists-f', lists);
        }
      },
      fail:function(res){
        console.log(res);
      }
    });
    
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
  onPullDownRefresh: function () {

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
  enterSeminar: function (e) {
    var index = e.currentTarget.dataset.index;
    var groupingMethod = this.data.listSeminarAndGradeVO[index].groupingMethod;
    var seminarId = this.data.listSeminarAndGradeVO[index].id;
    wx.navigateTo({ url: '../CourseUI/seminarHome?seminarId=' + seminarId + '&groupingMethod=' + groupingMethod + '&courseName=' + this.data.getCourseVO.name + '&seminarName=' + this.data.listSeminarAndGradeVO[index].name});
    
  }
})

