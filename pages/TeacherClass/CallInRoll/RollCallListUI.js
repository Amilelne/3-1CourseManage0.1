// pages/TeacherClass/CallInRoll/RollCallListUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classNode: '',
    groupingMethod:"random",
    status:"calling",
    className:'',
    presentList:'',
    attendanceNum:'0',
    numStudent:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    this.setData({
      groupingMethod:options.groupingMethod,
      status: options.status,
      className:options.className,
      numStudent:options.classNum,
    });
    console.log("Teacher enters the RollCallListUI page "+options.className+" under a "+options.groupingMethod+" method and a "+this.data.status+" status");
    var that = this;
    
    /**
     * 获取具体的签到信息
     */
    wx.request({
      url: app.data._preUrl + '/seminar/' + app.data._seminarID + '/class/' + app.data._classID + '/attendance/present',
      header: {
        'Authorization': 'Bearer ' + app.data._jwt
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          presentList: res.data,
          attendanceNum:res.data.length
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