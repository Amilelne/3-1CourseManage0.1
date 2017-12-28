// pages/StudentClass/CourseUI/Seminar/ChooseTopic/ChooseTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: '',

    show:-1,
    groupId:''
    //getTopicVOS:'',
  },
  //buttonShow事件处理函数
  buttonShow:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    this.setData({
      show:index
    })
  },
  //showMessage事件处理函数
  showMessage1:function(e){
    const that=this;
    var app=getApp();
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(that.data.topic[index]);
    if (that.data.topic[index].leftnum<=0){
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
    }else if (that.data.topic[index].mySelect==true){
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
    }else{
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
                newtopic[index].mySelect=true;
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp();
    const that=this;
    that.setData({
      groupId:options.groupId
    });
    //获取topics相关数据
    wx.request({
      url:app.data._preUrl+'/seminar/'+options.seminarId+'/topic',
      header:{
      "content-type": "application/json",
      "Authorization": 'Bearer ' + app.data._jwt,
      },
      method:'GET',
      success:function(res)
      {
        console.log(res);
        var getTopicVO=res.data;
        for(var i= 0;i<getTopicVO.length;i++){
          getTopicVO[i].leftnum = getTopicVO[i].groupLimit - getTopicVO[i].groupList.length;
          if (that.data.groupId in getTopicVO[i].groupList){
            getTopicVO[i].mySelect=true
          }
        }
        console.log("getTopicVO", getTopicVO);
        that.setData({
          topic: getTopicVO
        })
      },
      fail:function(res){
        console.log(res)
      }
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