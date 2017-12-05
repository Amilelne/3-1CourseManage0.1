// pages/StudentClass/CourseUI/Seminar/ChooseTopic/ChooseTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    showTopicB:false,
    showTopicC:false
  },
  //buttonShow事件处理函数
  buttonShow:function(){
    this.setData({
      show:(!this.data.show)
    })
  },
  clickTopicB: function () {
    this.setData({
      showTopicB: (!this.data.showTopicB)
    })
  },
  clickTopicC: function () {
    this.setData({
      showTopicC: (!this.data.showTopicC)
    })
  },
  //showMessage事件处理函数
  showMessage:function(){
    wx.showModal({
      title: '提示',
      content:'确定选择此话题吗(一旦选择，不可修改)?',
      success:function(res){
        if(res.confirm){
          console.log('choose')
        }
      }
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