// pages/StudentClass/CourseUI/Seminar/SignUP/signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statesign:1,//0表示未签到，1表示已签到
    stateseminar:0,//0表示未开始，1表示已结束，2表示正在签到

    SeminarDetailVO:'',
    attendanceVO:'',
    seminarId:'',
    classId:'',//根据上一个页面的传值获得
    longitude:0.0,
    latitude:0.0
  },
  //事件处理函数
  buttonSignup: function () {
    var app=getApp();
    var that=this;
    //先获取位置信息
    //先确定是否打开获取位置权限
    wx.getSetting({
      success:function(res){
        if (!res.authSetting['scope.userLocation']){//如果未获得位置权限提醒用户开启位置权限
          wx.openSetting({
            success: (res) => {
              console.log("授权结果", res);
              if (res.authSetting['scope.userLocation']) {
                //如果获取了位置权限
                wx.getLocation({
                  success: function(res) {
                    console.log("位置信息", res);
                    that.setData({
                      longitude: res.longitude,
                      latitude: res.latitude
                    });
                    wx.request({
                      url: app.data._preUrl + '/seminar/'+that.data.seminarId+'/class/'+that.data.classId+'/attendance/'+app.data._userId,
                      data:{
                        longitude: res.longitude,
                        latitude: res.latitude,
                        elevation:0.0
                      },
                      header: {
                        "content-type": "application/json",
                        "Authorization": 'Bearer ' + app.data._jwt,
                      },
                      method: 'POST',
                      success: function (res) {
                        console.log('学生进行签到', res);
                        if(res.statusCode==200){
                          wx.showModal({
                            title: '提示',
                            content: '签到成功：'+res.data,
                            success: function (res) {
                              if (res.confirm) {
                                console.log('确定');
                              } else if (res.cancel) {
                                console.log('取消');
                              }
                            }
                          })
                        }else{
                          wx.showModal({
                            title: '提示',
                            content: '签到失败',
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
                          content: '签到失败，请重新签到',
                          success: function (res) {
                            if (res.confirm) {
                              console.log('确定');
                            } else if (res.cancel) {
                              console.log('取消');
                            }
                          }
                        })
                      }
                    })
                  },
                  fail:function(res){
                    console.log("位置信息", res);
                    wx.showModal({
                      title: '提示',
                      content: '未获得位置数据，签到失败',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('确定');
                        } else if (res.cancel) {
                          console.log('取消');
                        }
                      }
                    })
                  }
                })
              }
            }
          });
        } else {//如果获取了位置权限
          wx.getLocation({
            success: function (res) {
              console.log("位置信息",res);
              that.setData({
                longitude: res.longitude,
                latitude: res.latitude
              });
              wx.request({
                url: app.data._preUrl + '/seminar/' + that.data.seminarId + '/class/' + that.data.classId + '/attendance/' + app.data._userId,
                data: {
                  longitude: res.longitude,
                  latitude: res.latitude,
                  elevation: 0.0
                },
                header: {
                  "content-type": "application/json",
                  "Authorization": 'Bearer ' + app.data._jwt,
                },
                method: 'POST',
                success: function (res) {
                  console.log('学生进行签到', res);
                  if (res.statusCode == 200) {
                    wx.showModal({
                      title: '提示',
                      content: '签到成功：' + res.data,
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
                      content: '签到失败',
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
                    content: '签到失败，请重新签到',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('确定');
                      } else if (res.cancel) {
                        console.log('取消');
                      }
                    }
                  })
                }
              })
            },
            fail: function (res) {
              console.log("位置信息", res);
              wx.showModal({
                title: '提示',
                content: '未获得位置数据，签到失败',
                success: function (res) {
                  if (res.confirm) {
                    console.log('确定');
                  } else if (res.cancel) {
                    console.log('取消');
                  }
                }
              })
            }
          })
        }
      }
    });
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

    //获取签到状态
    //获取是否签到状态
    wx.request({
      url: app.data._preUrl + '/seminar/' + seminarId + '/class/' +this.data.classId +'/attendance/status',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('签到相关数据', res)
        that.setData({
          status: res.data,
        });
        if(res.statusCode==200){
          that.setData({
            statesign:1,//标明已签到
          });
        }else{
          that.setData({
            statesign: 0,//标明未签到
          });
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });
    //获取讨论课状态
    wx.request({
      url: app.data._preUrl + '/seminar/' + seminarId + '/class/' + this.data.classId + '/attendance',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('课堂状态相关数据', res)
        if (res.statusCode == 200) {
          if(res.data.status=="break"){
            that.setData({
              stateseminar: 0,//未开始
            });
          } else if (res.data.status == "end"){
            that.setData({
              stateseminar: 1,//已结束
            });
          }else{
            that.setData({
              stateseminar: 2,//正在签到
            });
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '课堂状态信息获取失败',
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
      fail: function (res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '课堂状态信息获取失败：wx.requset() fail',
          success: function (res) {
            if (res.confirm) {
              console.log('确定');
            } else if (res.cancel) {
              console.log('取消');
            }
          }
        });
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
  
  }
})