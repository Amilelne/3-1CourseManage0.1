// pages/StudentClass/CourseUI/Seminar/FixedGroup/UnChooseTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*group:[{"name":"吴双",studentId:24320152202778},
      { "name": "马飞宇", studentId: 24320152202779 },
      { "name": "林萧", studentId: 24320152202782 },
      { "name": "易中天", studentId: 24320152202783 },
      { "name": "轩辕朗", studentId: 24320152202788 }],
    showLeader: false,*/
    isLeader: false
  },

  //toBeLeader事件函数*****************************成为队长，存入数据库
  toBeLeader: function () {
    var app=getApp()
    if (this.data.isLeader) {
        /*存入数据库
      wx.request({
        url: '/group/' + { groupId } + '/resign',
        data: {
          id:app.data._userID
      },
        success: function (res) {
          console.log(res.data)
        }
      })
    */
      this.setData({
        isLeader: false
      })
    }
    else {
      this.setData({
        isLeader: true
      })
  /*存入数据库 
      wx.request({
        url: '/group/' + { groupId } + '/assign',
        data: {
          id:app.data._userID
      },
        success: function (res) {
          console.log(res.data)
        }
      })
    */
    }
  },

  //topic事件监听
  topic: function () {
    wx.redirectTo({
      url: './ChooseTopic',
    })
  },

  /////////////////////
  //BeLeader的事件函数
  BeLeader: function () {
    this.setData({
      showLeader: true
    })
  },
  //Leave的事件函数
  Leave: function () {
    this.setData({
      showLeader: false
    })
  },
  //chooseTopic的事件函数
  chooseTopic: function () {
    wx.navigateTo({
      url: '../ChooseTopic/ChooseTopic',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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