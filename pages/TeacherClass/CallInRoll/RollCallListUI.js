// pages/TeacherClass/CallInRoll/RollCallListUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classNode: { id: 23, name: '班级1', numStudent: 40, time: [{ week: 1, day: 1, lessons: [1, 2], site: '海韵201' }, { week: 0, day: 3, lessons: [3, 4], site: '公寓405' }], calling: true, roster: '/roster/周三12班.xlsx', proportions: { '3': 20, '4': 60, '5': 20, report: 50, presentation: 50 } },
    roster: { id: 132, calling: 0, classid: 23, attend: { num: 37, list: [{ id: "111", name: "杨xx" }, { id: "112", name: "周xx" }, { id: "113", name: "孙xx" }] }, late: { num: 0, list: [{ id: "111", name: "杨xx" }, { id: "112", name: "周xx" }, { id: "113", name: "孙xx" }] } },
    groupingMethod:"random",
    status:"calling",
    className:'',
    presentList:'',
    attendanceNum:'0',
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
    });
    console.log("Teacher enters the RollCallListUI page "+options.className+" under a "+options.groupingMethod+" method and a "+this.data.status+" status");
    var that = this;
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