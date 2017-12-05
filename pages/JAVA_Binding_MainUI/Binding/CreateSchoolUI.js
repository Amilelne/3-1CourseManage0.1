// JAVA_Binding_MainUI/Binding/CreateSchoolUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: '',
    city: '',
    schoolname: '',
  },
  schoolName: function (e) {
    this.setData({
      schoolname: e.detail.value,
    })
  },
  confirm:function(e)
  {
    wx.setStorage({
      key: 'school',
      data: this.schoolname,
    })
    wx.redirectTo({
      url: './TeacherBindingUI',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getStorage({
      key: 'province',
      success: function (res) {
        that.setData({
          province: res.data
        })
      },
    })
    wx.getStorage({
      key: 'city',
      success: function (res) {
        that.setData({
          city: res.data
        })
      },
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