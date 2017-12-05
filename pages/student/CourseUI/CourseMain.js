// pages/index/CourseUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seminar_list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var $i;
    wx.request({
      url: "http://120.77.173.98:8301/course/1/seminar",
      data: {
        embedGrade: true
      },
      type: "GET",
      success: function (res) {
        console.log(res);
        for ($i = 0; $i < res.data.length; $i++) {
          var s1 = "seminar_list[" + $i + "].property";
          var s2 = "seminar_list[" + $i + "].state";
          self.setData({
            [s1]: res.data[$i],
            [s2]: 1
          });
        }

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

  },
  enterSeminar: function (e) {
    var $state = e.currentTarget.dataset.state;
    console.info($state);
    if ($state == 1) {
      wx: wx.navigateTo({ url: './seminarHome' });
    }


  }
})

