// pages/StudentClass/CourseUI/Seminar/SignUP/signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickSignup:'',

    SeminarDetailVO:'',
    attendanceVO:'',
    seminarId:'',
    classId:'',//根据上一个页面的传值获得
  },
  //事件处理函数
  buttonSignup: function () {
    var app=getApp();
    var that=this;
    if(app.data._signUp==0){
      // wx.request({
        // url: app.data._preUrl + 'seminar'+that.data.seminarId + '/class/' + that.data.classId + '/attendance',
        // data: {
        //   //'location': {
        //     longitude: 100.0,
        //     latitude: 100.0,
        //     elevation: 0.0,
        //   //}
        // },
        // header: {
        //       "content-type": "application/json",
        //       "Authorization": 'Bearer ' + app.data._jwt,
        // },
        // method: 'POST',
        // success: function (res) {
        //   console.log('course相关数据', res.data);
          //变换状态:应在success之下
          this.setData({
            clickSignup: true
          });
          app.data._signUp=1;
      //   },
      //   fail: function (res) {
      //     //console.log(res);
      //   }
      // });
    }
    // if(this.data.clickSignup==false){
    //   //获取信息
    //   wx.getLocation({
    //     type: 'wgs84',
    //     success: function (res) {
    //       var latitude = res.latitude
    //       var longitude = res.longitude
    //       //获取成功签到
    //       wx.request({
    //         url: app.data._preUrl + that.data.seminarId + '/class/' + that.data.classId + '/attendance',
    //         data: {
    //           location: {
    //             longitude: longitude,
    //             latitude: latitude,
    //             elevation: 0.0,
    //           }
    //         },
    //         header: {
    //           "content-type": "application/json",
    //           "Authorization": 'Bearer ' + app.data._jwt,
    //         },
    //         method: 'POST',
    //         success: function (res) {
    //           console.log('course相关数据', res.data);
    //           //变换状态:应在success之下
    //           this.setData({
    //             clickSignup: true
    //           });
    //         },
    //         fail: function (res) {
    //           //console.log(res);
    //         }
    //       });
    //     }
    //   });
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var seminarId=options.seminarId;
    this.setData({
      classId:options.classId,
      seminarId:seminarId
      });
    var app = getApp();
    var that = this;
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
    //         console.log('更新成功', res);
    //         if(res.statusCode==200){
    //           app.data._jwt = res.data;
    //         }
    //       },
    //       fail: function (res) {
    //         console.log('用户拒绝', res.data);
    //       }
    //     })
    //   }
    // })
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    //获取讨论课信息
    wx.request({
      url: app.data._preUrl + '/seminar/' + seminarId+'/detail',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('seminar相关数据', res)
        that.setData({
          SeminarDetailVO: res.data,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
    //获取classId
    //unknown

    //获取签到状态
    //to look up attendance
    var latitude;
    var longitude;
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     latitude = res.latitude;
    //     longitude = res.longitude;
    //   }
    // });
    // wx.request({
    //   url: app.data._preUrl + '/seminar/' + seminarId + '/class/' +this.data.classId +'/attendance/'+app.data._userId,
    //   data:{
    //     locationVO:{
    //       latitude: latitude,
    //       longitude: longitude,
    //       elevation: 0.0,
    //     }
    //   },
    //   header: {
    //     "content-type": "application/json",
    //     "Authorization": 'Bearer ' + app.data._jwt,
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     console.log('签到相关数据', res)
    //     that.setData({
    //       status: res.data,
    //     });
    //     if(res.statusCode==200&&res.data){
    //       that.setData({
    //         clickSignup: true,//标明已经签到成功
    //       });
    //     }else{
    //       that.setData({
    //         clickSignup: false,//标明未签到
    //       });
    //     }
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //     that.setData({
    //       clickSignup: false,//标明未签到
    //     });
    //   }
    // });
    if(app.data._signUp==0){
      that.setData({
        clickSignup: false,//标明未签到
      });
    }else{
      that.setData({
        clickSignup: true,//标明签到
      });
    }
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