// pages/StudentClass/CourseUI/Seminar/SignUP/signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickSignup:false,
    SeminarDetailVO:'',
    seminarId:'',
    classId:'',
  },
  //事件处理函数
  buttonSignup: function () {
    //获取信息
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        //获取成功签到
        wx.request({
          url: app.data._preUrl + this.data.seminarId + '/class/' + this.data.classId + '/attendance',
          data: {
            location: {
              longitude: longitude,
              latitude: latitude,
              elevation: 0.0,
            }
          },
          header: {
            "content-type": "application/json",
            "Authorization": 'Bearer ' + app.data._jwt,
          },
          method: 'POST',
          success: function (res) {
            console.log('course相关数据', res.data)
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }
    });
    //变换表格
    this.setData({
      clickSignup: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var seminarId=options.seminarId;
    var app=getApp();
    wx.request({
      url: app.data._preUrl + '/seminar/' + seminarId+'/detail',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('seminar相关数据', res.data)
        that.setData({
          SeminarDetailVO: res.data,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
    //获取classId

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
  
  }
})