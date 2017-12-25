Page({
  data: {
    userID: '',
    userName: '',
    userSchool: "",
    first:0
  },
  inputUserID: function (e) {
    this.userID = e.detail.value
  },
  inputUserName: function (e) {
    this.userName = e.detail.value
  },
  ConfirmButton: function () {
    //设置全局变量
    const that=this
    var app = getApp()
    if(app.data._hasSetName==false)
    {
      app.data._hasSetName=true
      app.data._userName=that.userName
    }
    if (app.data._hasSetID==false)
    {
      app.data._hasSetID=true
      app.data._userID = that.userID
    }
    if (app.data._hasSetSchool==false)
    {
      app.data._hasSetSchool=true
      app.data._userSchool=that.userSchool
    }
    var userInfo = {
      ID: this.userID,
      Name: this.userName,
      School: this.userSchool
    }
    wx.setStorage({  //传递相应的参数
      key: 'info',
      data: userInfo,
    })
    //***********************************将个人信息存储到数据库
    wx.request({
      url: app.data._preUrl+'/me',
      data: {

      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
      }
    })
    //导航到下一页
    wx.redirectTo({
      url: '../TeacherMainUI/TeacherMainUI',
    })
  },
    chooseSchool: function() {
      const that=this
      var app = getApp()
      if (app.data._hasSetName==false) {
        app.data._hasSetName = true;
        app.data._userName = that.userName
      }
      if (app.data._hasSetID==false) {
        app.data._hasSetID = true;
        app.data._userID = that.userID
      }
      wx.setStorage({
        key: 'student_or_teacher',
        data: '2',
      })
    wx.redirectTo({
      url: 'ChooseSchool1',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = {
      ID: this.userID,
      Name: this.userName,
      School: this.userSchool
    }
    wx.setStorage({  //传递相应的参数
      key: 'info',
      data: userInfo,
    })
    const that = this
    wx.getStorage({
      key: 'school',
      success: function(res) {
        that.setData({
          userSchool:res.data
        })
      },
    }),
    wx.getStorage({
      key: 'userID',
      success: function (res) {
        that.setData({
          userID: res.data
        })
      },
    }),
    wx.getStorage({
      key: 'userName',
      success: function (res) {
        that.setData({
          userName: res.data
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
  wx.setStorage({
    key: 'userID',
    data: this.userID,
  })
  wx.setStorage({
    key: 'userName',
    data: this.userName,
  })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setStorage({
      key: 'userID',
      data: this.userID,
    })
    wx.setStorage({
      key: 'userName',
      data: this.userName,
    })
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