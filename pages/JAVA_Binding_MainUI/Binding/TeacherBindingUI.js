Page({
  data: {
    userID: '',
    userName: '',
    userSchool: "厦门大学"
  },
  inputUserID: function (e) {
    this.userID = e.detail.value
  },
  inputUserName: function (e) {
    this.userName = e.detail.value
  },
  ConfirmButton: function () {
    var userInfo = {
      ID: this.userID,
      Name: this.userName,
      School: this.userSchool
    }
    wx.setStorage({  //传递相应的参数
      key: 'info',
      data: userInfo,
    })
    wx.redirectTo({
      url: '../TeacherMainUI/TeacherMainUI',
    })
  },
  chooseSchool:function(){
    wx.redirectTo({
      url: 'ChooseSchool1',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("TeacherBindingNow")
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