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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var app = getApp();
    var that = this;
    that.setData({
      classId:options.classId,
      seminarId: options.seminarId
    });
    //获取讨论课信息
    that.getSeminarInfoBySeminarId();
    //获取是否签到状态
    that.getStateSign();
    //获取讨论课状态
    that.getStateSeminar();
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
    //获取讨论课信息
    that.getSeminarInfoBySeminarId();
    //获取是否签到状态
    that.getStateSign();
    //获取讨论课状态
    that.getStateSeminar();
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
   * 签到的button事件处理函数
   */
  buttonSignup: function () {
    var app = getApp();
    var that = this;
    //先获取位置信息
    //先确定是否打开获取位置权限
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userLocation']) {//如果未获得位置权限提醒用户开启位置权限
          wx.openSetting({
            success: (res) => {
              console.log("授权结果", res);
              if (res.authSetting['scope.userLocation']) {
                //如果获取了位置权限
                that.getLocationAndSign();
              } else {
                wx.authorize({
                  scope: 'scope.userLocation',
                  success(res) {
                    console.log('位置信息授权成功，请进行签到')
                  },
                  fail() {
                    console.log('位置信息授权失败')
                  }
                })
              }
            }
          });
        } else {//如果获取了位置权限
          that.getLocationAndSign();
        }
      }
    });
  },

  /**
   * 用户自定义函数
   * 获取讨论课信息
   */
  getSeminarInfoBySeminarId:function(){
    var app=getApp();
    var that=this;
    wx.request({
      url: app.data._preUrl + '/seminar/' + that.data.seminarId + '/detail',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('seminar相关数据', res)
        if(res.statusCode == 200){
          that.setData({
            SeminarDetailVO: res.data,
          });
        }else if(res.statusCode == 404){
          wx.showModal({
            title: '提示',
            content: '未找到讨论课',
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
   * 获取是否签到状态
   */
  getStateSign:function(){
    var app=getApp();
    var that=this;
    wx.request({
      url: app.data._preUrl + '/seminar/' + that.data.seminarId + '/class/' + that.data.classId + '/attendance/status',
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
        if (res.statusCode == 200) {
          that.setData({
            statesign: 1,//标明已签到
          });
        } else {
          that.setData({
            statesign: 0,//标明未签到
          });
        }
      },
      fail: function (res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '签到请求失败，请重新签到',
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
   * 获取讨论课状态
   */
  getStateSeminar:function(){
    var app=getApp();
    var that=this;
    wx.request({
      url: app.data._preUrl + '/seminar/' + that.data.seminarId + '/class/' + that.data.classId + '/attendance',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('课堂状态相关数据', res)
        if (res.statusCode == 200) {
          if (res.data.status == "break") {
            that.setData({
              stateseminar: 0,//未开始
            });
          } else if (res.data.status == "end") {
            that.setData({
              stateseminar: 1,//已结束
            });
          } else {
            that.setData({
              stateseminar: 2,//正在签到
            });
          }
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
          content: '课堂状态信息获取请求失败',
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
   * 自定义函数
   * 获取位置信息并签到
   */
  getLocationAndSign: function () {//获取了位置权限后获取位置信息并进行签到
    var app=getApp();
    var that=this;
    wx.getLocation({
      success: function (res) {
        console.log("位置信息", res);
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
                content: '签到成功',
                success: function (res) {
                  if (res.confirm) {
                    console.log('确定');
                    that.setData({
                      statesign:1
                    });
                  } else if (res.cancel) {
                    console.log('取消');
                  }
                }
              })
            } else if (res.statusCode == 400) {
              wx.showModal({
                title: '提示',
                content: '签到失败：位置错误（未发起签到或系统错误）',
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
                content: '签到失败：签到地点不匹配',
                success: function (res) {
                  if (res.confirm) {
                    console.log('确定');
                  } else if (res.cancel) {
                    console.log('取消');
                  }
                }
              })
            } else if (res.statusCode == 404) {
              wx.showModal({
                title: '提示',
                content: '签到失败：未找到用户',
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
                content: '签到失败：服务器内部错误',
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
              content: '签到请求失败，请重新签到',
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
          content: '请求失败，签到失败',
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
})