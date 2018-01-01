// pages/StudentClass/CourseUI/Seminar/Grade/grade.js
Page({
  data: {
    groups: [{ id: 0, name: 'A1', score: 0 },
    { id: 1, name: 'A2', score: 0 },
    { id: 2, name: 'A3', score: 0 },
    { id: 3, name: 'A4', score: 0 },
    { id: 4, name: 'A5', score: 0 }],
    showView:true,
    heart_chosen: "../../images/heart_chosen.png",
    heart_empty: "../../images/heart_empty.png",
    key: 0, //评分
    groupId: 0, //第一组
    
    
    status:'',
    
    
    

    //重写
    groupId: '',

    myTopics: '',
    allTopics: '',
    seminarId: '',
    gradeTopics: '',
    gradeGroups: '',
  },
  selectHeart: function (e) {
    const groupIndex = e.currentTarget.id;
    const score = e.target.dataset.score;
    console.log(groupIndex, score);
    const groups = this.data.groups;
    groups[groupIndex].score = score;
    this.setData({
      groups: groups
    });
  },
  //*******************************提交打分表到数据库
  submit:function(){ 
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定要打分吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({showView:false,})
          var app = getApp()
          var $i;
          for ($i = 0; $i < that.data.groups.length; $i++) {
            var topiciiid
            wx.request({
              url: app.data._preUrl + '/group/' + that.data.groups[$i].id + '/grade/presentation/' + app.data._userId,
              method: 'PUT',
              data: {
                topicId:$i,
                grade: that.data.groups[$i].score
              },
              header:
              {
                "content-type": "application/json",
                "Authorization": 'Bearer ' + app.data._jwt,
              },
              success: function (res) 
              {
                console.log(res.data)
              }
            })
          }
        }
      }
    }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showToast({
    //   title: '加载中',
    //   icon: 'loading',
    //   duration: 1200
    // })

    var that=this;
    var app=getApp();
    that.setData({
      seminarId:options.seminarId,
      status:options.status
    });
    //获取自己选择的topic
    that.getMyTopics();

    //------------------------------------------

    if(options.status==0)
    {
      //*****************获得数据库中获得小组
      var app=getApp();
      options.seminarId=1
      const that=this;
      for(var i=0;i<5;i++)that.data.groups[i]
      wx.request({
        url:app.data._preUrl+'/seminar/'+that.data.seminarId+'/group',
        header: {
          'Authorization': 'Bearer ' + app.data._jwt
        },
        method:'GET',
        success:function(res)
        {
          that.setData({
            group:res.data
          })
          console.log(res.data)
        }
      })
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

  },

  /**
   * 自定义函数
   * 获取自己选择的topic
   * 成功后调用getTopicsInfoBySeminarId()获取所有topic
   */
  getMyTopics:function(){
    var app=getApp();
    var that=this;
    wx.request({
      url: app.data._preUrl + '/seminar/' + that.data.seminarId + '/group/my',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('自己选择的topic', res.data.topics);
        if(res.statusCode==200){
          that.setData({
            myTopics: res.data.topics,//list:id+name(1，话题1)
            groupId:res.data.id//我所在的小组的id
          });
          that.getTopicsInfoBySeminarId();//调用函数，获取所有topic
        }else if(res.statusCode=404){
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
  },

  /**
   * 自定义函数
   * 获取某个seminar下的所有话题
   */
  getTopicsInfoBySeminarId: function () {
    var app = getApp();
    var that = this;
    wx.request({
      url: app.data._preUrl + '/seminar/' + that.data.seminarId + '/topic',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log("所有话题", res);
        if (res.statusCode == 200) {
          console.log("getTopicVO", res.data);
          that.setData({
            allTopics: res.data//list: id+serial+name+description+groupLimit+groupMemberLimit+groupList(is.tostring)
          })
        } else if (res.statusCode == 404) {
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
   * 计算需要打分的组的topics（先做差集再做并集）
   */
  calGradeTopic:function(){
    var app=getApp();
    var that=this;
    var gradeTopics;//存的是topic
    var k = 0;
    for (var i = 0; i < that.data.myTopics; i++) {
      for (var j = 0; j < that.data.allTopics; j++) {
        if (that.data.allTopics[j].id != that.data.myTopics[i].id) {
          var l = 0;
          for (l = 0; l < k; l++) {
            if (gradeTopics[l].id == that.data.allTopics[j].id) break;
          }
          if (l >= k) {
            gradeTopics[k] = that.data.allTopics[j];
            k++;
          }
        }
      }
    }
    that.setData({
      gradeTopics: gradeTopics
    });
  },

  /**
   * 自定义函数
   * 计算需要打分的组（根据topics查找相应的组）
   */
  calGradeGroup: function () {
    var that=this;
    var app=getApp();
    var gradeGroups=[];
    for (var i = 0; i < that.data.gradeTopics.length; i++) {
      console.log("calGradeGroup loop " + i);
      wx.request({
        url: app.data._preUrl + '/topic/' + that.data.gradeTopics[i].id + '/group',
        header: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + app.data._jwt,
        },
        method: 'GET',
        success: function (res) {
          console.log(res);//res=id+name
          for (var j = 0; j < res.data.length; j++) {
            if (res.data[j].id != that.data.groupId) {
              var agroup = res.data[j];
              agroup.topicSerial = that.data.gradeTopics[i].serial;//将topic信息存入
              agroup.topicId = that.data.gradeTopics[i].id;
              agroup.topicName = that.data.gradeTopics[i].name;
              gradeGroups.push(agroup);
            }
          }
          console.log("gradeGroups", gradeGroups);
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    that.setData({
      gradeGroups:gradeGroups
    });
    return 0;
  },
});

