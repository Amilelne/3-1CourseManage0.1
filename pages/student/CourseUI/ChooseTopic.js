// pages/StudentClass/CourseUI/Seminar/ChooseTopic/ChooseTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*show:false,
    showTopicB:false,
    showTopicC:false,
    value1:2,
    value2:1,
    leftnumcolor1:'leftNumWhite',
    leftnumcolor2:'leftNumRed',
    topicView2:'blueTopicView',*/
    topic: [{id: 257,
      serial: 'A',
      name: "领域模型与模块",
      description: "Domain model与模块划分",
      groupLimit: 5,
      groupMemberLimit: 6,
      groupLeft: 0
    }, {
      id: 257,
      serial: 'B',
      name: "领域模型与模块",
      description: "Domain model与模块划分",
      groupLimit: 5,
      groupMemberLimit: 6,
      groupLeft: 1
    }],
  },
  //buttonShow事件处理函数
  buttonShow:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    this.setData({
      show:(!this.data.show)
    })
  },
  //showMessage事件处理函数
  showMessage1:function(){
    const that=this
    wx.showModal({
      title: '提示',
      content:'确定选择此话题吗(一旦选择，不可修改)?',
      success:function(res){
        if(res.confirm){
          console.log('choose')
        }
        that.setData({
          value1:1,
          leftnumcolor1:'leftNumRed',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp()
    const that=this
    app.data._seminarID=1,//赋值一个变量
    wx.request({
      url:app.data._preUrl+'/seminar/'+app.data._seminarID+'/topic',
      header:{
      "content-type": "application/json",
      "Authorization": 'Bearer ' + app.data._jwt,
      },
      method:'GET',
      success:function(res)
      {
        console.log(res.data)
        that.setData({
          topic:res.data
        })
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