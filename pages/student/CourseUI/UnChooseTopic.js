// pages/StudentClass/CourseUI/Seminar/FixedGroup/UnChooseTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLeader: '',
    hasLeader:'',

    seminarName:'',
    groupingMethod:'',
    seminarId:'',

    myGroupVO:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var app = getApp();
    var that = this;
    that.setData({
      seminarName:options.seminarName,
      groupingMethod: options.groupingMethod,
      seminarId: options.seminarId,
    });
    //获取队伍信息
    that.getMyGroupInfo();
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
    //获取队伍信息
    that.getMyGroupInfo();
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
   * toBeLeader的button事件函数：辞职或成为队长
   */
  toBeLeader: function () {
    var app = getApp();
    var that = this;
    if (this.data.isLeader) {
      //修改数据库-去队长
      wx.request({
        url: app.data._preUrl + '/group/' + that.data.myGroupVO.id + '/resign',
        data: {
          id: app.data._userId
        },
        header: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + app.data._jwt,
        },
        method: 'PUT',
        success: function (res) {
          console.log("辞职",res);
          if(res.statusCode==204){
            that.setData({
              isLeader: false,
              hasLeader: false
            });
          }else if(res.statusCode==400){
            wx.showModal({
              title: '提示',
              content: '未找到该用户',
              success: function (res) {
                if (res.confirm) {
                  console.log('确定');
                } else if (res.cancel) {
                  console.log('取消');
                }
              }
            })
          } else if (res.statusCode == 404){
            wx.showModal({
              title: '提示',
              content: '未找到小组',
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
      //刷新获取队伍信息
      that.getMyGroupInfo();
    }
    else {
      //修改数据库-加队长
      wx.request({
        url: app.data._preUrl + '/group/' + that.data.myGroupVO.id + '/assign',
        data: {
          id: app.data._userId
        },
        header: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + app.data._jwt,
        },
        method: 'PUT',
        success: function (res) {
          console.log("成为队长", res);
          if(res.statusCode==204){
            that.setData({
              isLeader: true,
              hasLeader: true,
            });
          }else if(res.statusCode==400){
            wx.showModal({
              title: '提示',
              content: '未找到该用户',
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
              content: '未找到小组',
              success: function (res) {
                if (res.confirm) {
                  console.log('确定');
                } else if (res.cancel) {
                  console.log('取消');
                }
              }
            })
          } else if (res.statusCode == 409) {
            wx.showModal({
              title: '提示',
              content: '非法操作',
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
      //刷新获取队伍信息
      that.getMyGroupInfo();
    }
  },

  /**
   * 自定义函数
   * 去选题topic的button事件监听
   */
  topic: function () {
    wx.redirectTo({
      url: './ChooseTopic?seminarId=' + this.data.seminarId + '&groupId=' + this.data.myGroupVO.id,
    })
  },

  /**
   * 自定义函数
   * 获取队伍信息并且设置相应的页面标记
   */
  getMyGroupInfo:function(){
    var app = getApp();
    var that = this;
    //获取队伍信息
    wx.request({
      url: app.data._preUrl + '/seminar/' + that.data.seminarId + '/group/my',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('队伍相关数据', res.data);
        if (res.statusCode==200 && res.data.leader != null && res.data.leader.id != null && res.data.leader.id == app.data._userId) {
          that.setData({ isLeader: true });//初始化界面标记量
        } else {
          that.setData({ isLeader: false });//初始化界面标记量
        }
        if (res.data.leader != null && res.data.leader.id != null) {
          that.setData({
            hasLeader: true
          })
        } else {
          that.setData({
            hasLeader: false
          })
        }
        that.setData({
          myGroupVO: res.data,
        });
        if(res.statusCode==200){
          //进行上述处理
        } else if(res.statusCode==404){
          wx.showModal({
            title: '提示',
            content: '未找到小组或未找到讨论课',
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
  }
})