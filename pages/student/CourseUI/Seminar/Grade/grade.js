// pages/StudentClass/CourseUI/Seminar/Grade/grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groups: [{ name: 'A1', score: 0 },
     { name: 'A2', score: 0 },
     { name: 'A3', score: 0},
     { name: 'A4', score: 0 },
     { name: 'A5', score: 0 }],
    stars:[0,1,2,3,4],
    heart_chosen:"heart_chosen.png",
    heart_empty:"heart_empty.png",
    key:0 //提交
  },
  //selectHeart事件处理函数
  selectHeart:function(){
    this.setData({
      key:1
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