// pages/StudentClass/CourseUI/Seminar/FixedGroup/UnChooseTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group:[{"name":"吴双",studentId:24320152202778},
      { "name": "马飞宇", studentId: 24320152202779 },
      { "name": "林萧", studentId: 24320152202782 },
      { "name": "易中天", studentId: 24320152202783 },
      { "name": "轩辕朗", studentId: 24320152202788 }],
    showLeader:false
  },

  //BeLeader的事件函数
  BeLeader:function(){
    this.setData({
      showLeader:true
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