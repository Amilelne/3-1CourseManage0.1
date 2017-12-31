// pages/StudentClass/CourseUI/Seminar/ChooseTopic/ChooseTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: '',

    show:-1,
    groupId:'',
    seminarId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp();
    var that=this;
    that.setData({
      groupId:options.groupId,
      seminarId:options.seminarId
    });
    //获取topics相关数据
    that.getTopicsInfoBySeminarId();
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1200
    })
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
    that.getTopicsInfoBySeminarId();
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
   * 获取某个seminar下的所有话题
   */
  getTopicsInfoBySeminarId:function(){
    var app=getApp();
    var that=this;
    wx.request({
      url: app.data._preUrl + '/seminar/' + that.data.seminarId + '/topic',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log("所有话题",res);
        if(res.statusCode==200){
          var getTopicVO = res.data;
          for (var i = 0; i < getTopicVO.length; i++) {
            getTopicVO[i].leftnum = getTopicVO[i].groupLimit - getTopicVO[i].groupList.length;
            if (that.data.groupId in getTopicVO[i].groupList) {
              getTopicVO[i].mySelect = true
            }
          }
          console.log("getTopicVO", getTopicVO);
          that.setData({
            topic: getTopicVO
          })
        } else if (res.statusCode == 404){
          wx.showModal({
            title: '提示',
            content: '未找到话题或非法输入',
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
    })
  },

  /**
   * 自定义函数
   * buttonShow事件处理函数
   */
  buttonShow: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    this.setData({
      show: index
    })
  },

  /**
   * 自定义函数
   * showMessage事件处理函数
   */
  showMessage1: function (e) {
    const that = this;
    var app = getApp();
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(that.data.topic[index]);
    if (that.data.topic[index].leftnum <= 0) {
      wx.showModal({
        title: '提示',
        content: '该选题已被抢完，请选择其它的话题',
        success: function (res) {
          if (res.confirm) {
            console.log('确定');
          } else if (res.cancel) {
            console.log('取消');
          }
        }
      });
    } else if (that.data.topic[index].mySelect == true) {
      wx.showModal({
        title: '提示',
        content: '您已经选择了该话题，请勿重复选题',
        success: function (res) {
          if (res.confirm) {
            console.log('确定');
          } else if (res.cancel) {
            console.log('取消');
          }
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '确定选择此话题吗(一旦选择，不可修改)?',
        success: function (res) {
          if (res.confirm) {
            console.log('choose');
            wx.request({
              url: app.data._preUrl + '/group/' + that.data.groupId + '/topic',
              data: {
                id: that.data.topic[index].id
              },
              header: {
                "content-type": "application/json",
                "Authorization": 'Bearer ' + app.data._jwt,
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                var newtopic = that.data.topic;
                newtopic[index].leftnum--;
                newtopic[index].mySelect = true;
                that.setData({
                  topic: newtopic
                })
                wx.showModal({
                  title: '提示',
                  content: '选题成功',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('确定');
                    } else if (res.cancel) {
                      console.log('取消');
                    }
                  }
                });
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        }
      })
    }
  },
})