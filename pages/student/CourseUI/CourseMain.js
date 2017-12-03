// pages/index/CourseUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seminar_list: [
      { NO: 1, state: 0, start_year: 2017, start_month: 11, start_day: 1, end_year: 2017, end_month: 11, end_day: 12, group_type: '固定分组', grade: '未完成' },
      { NO: 2, state: 1, start_year: 2017, start_month: 11, start_day: 2, end_year: 2017, end_month: 11, end_day: 13, group_type: '固定分组', grade: '未完成' },
      { NO: 3, state: 0, start_year: 2017, start_month: 11, start_day: 3, end_year: 2017, end_month: 11, end_day: 14, group_type: '固定分组', grade: '未完成' },
      { NO: 4, state: 0, start_year: 2017, start_month: 11, start_day: 4, end_year: 2017, end_month: 11, end_day: 15, group_type: '固定分组', grade: '未完成' },
      { NO: 5, state: 0, start_year: 2017, start_month: 11, start_day: 5, end_year: 2017, end_month: 11, end_day: 16, group_type: '固定分组', grade: '未完成' },
      { NO: 6, state: 0, start_year: 2017, start_month: 11, start_day: 6, end_year: 2017, end_month: 11, end_day: 17, group_type: '固定分组', grade: '未完成' }
    ]

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

  },
  enterSeminar: function (e) {
    var $state = e.currentTarget.dataset.state;
    console.info($state);
    if ($state == 1) {
      wx: wx.navigateTo({ url: './Seminar/seminarHome' });
    }
  }
})