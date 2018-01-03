// pages/StudentClass/CourseUI/Seminar/Grade/grade.js
Page({
  data: {
    showView:true,
    heart_chosen: "../../images/heart_chosen.png",
    heart_empty: "../../images/heart_empty.png",
    key: 0, //评分
    
    status:'',

    //重写
    groupId: '',
    myTopics: '',
    seminarId: '',
    gradeGroups: '',//重写controller
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that=this;
    var app=getApp();
    that.setData({
      seminarId:options.seminarId,
      status:options.status
    });
    //判断当前状态是否可以打分
    if(options.status==0)
    {
      that.getMyTopics();
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
   * 每次更改每一组的打分时需要对应修改页面暂存数据
   */
  selectHeart: function (e) {
    var that = this;
    var groupIndex = e.currentTarget.id;
    var score = e.target.dataset.score;
    console.log(groupIndex, score);
    var groups = that.data.gradeGroups;
    groups[groupIndex].userGrade = score;
    that.setData({
      gradeGroups: groups
    });
    console.log("gradeGroups-C1:", groups);
    console.log("gradeGroups-C2:", that.data.gradeGroups);
  },

  /**
   * 自定义函数
   * 获取需要打分的组以及成绩
   */
  getGradeGroupsByController:function(){
    var app=getApp();
    var that=this;
    wx.request({
      url: app.data._preUrl + '/seminar/' + that.data.seminarId +'/gradegroup/mygroup/'+that.data.groupId,
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success:function(res){
        console.log("getGradeGroups",res);
        if(res.statusCode==200){
          var groups=res.data;
          for(var i=0;i<groups.length;i++){
            if(groups[i].userGrade<0){
              groups[i].userGrade = 0;
            }else{
              that.setData({
                showView:false
              });
            }
          }
          that.setData({ gradeGroups: groups});
        }
      }
    })
  },

  /**
   * 自定义函数
   * 提交打分的button事件
   */
  submit: function () {
    var app = getApp();
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要打分吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({ showView: false, })
          var i;
          for (i = 0; i < that.data.gradeGroups.length; i++) {
            var topiciiid
            wx.request({
              url: app.data._preUrl + '/group/' + that.data.gradeGroups[i].groupId + '/grade/presentation/' + app.data._userId,
              method: 'PUT',
              data: {
                topicId: that.data.gradeGroups[i].topic.id,
                grade: that.data.gradeGroups[i].userGrade
              },
              header:
              {
                "content-type": "application/json",
                "Authorization": 'Bearer ' + app.data._jwt,
              },
              success: function (res) {
                console.log(res);
              }
            })
          }
        }
      }
    })
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
          that.getGradeGroupsByController();//获取需要打分的小组的信息＊＊＊
        }
        // }else if(res.statusCode=404){
        //   wx.showModal({
        //     title: '提示',
        //     content: '未找到小组或未找到讨论课',
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
});

