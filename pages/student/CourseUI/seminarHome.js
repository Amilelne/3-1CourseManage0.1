Page({
    data: {
      courseName:'',
      seminarName:'',
      classId:'',
      seminarId:'',
      groupingMethod:'',
      status:''//0表示在打分，1表示结束，2表示未到打分时间
    },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        console.log(options);
        var seminarId = options.seminarId;
        var groupingMethod = options.groupingMethod;
        var courseName=options.courseName;
        var seminarName=options.seminarName;
        this.setData({
          classId:options.classId,
          seminarId:seminarId,
          groupingMethod:groupingMethod,
          courseName:courseName,
          seminarName:seminarName,
          status:options.status
        });
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

    /**
     * 自定义函数
     * 签到跳转的button事件
     */
    signup: function () {
      wx.navigateTo({
        url: './signup?classId=' + this.data.classId + '&seminarId=' + this.data.seminarId,
      })
    },

    /**
     * 自定义函数
     * 组队和选题跳转的button事件
     */
    group: function () {
      wx.navigateTo({
        url: './UnChooseTopic?seminarId=' + this.data.seminarId + '&groupingMethod=' + this.data.groupingMethod + '&seminarName=' + this.data.seminarName,
      })
    },

    /**
     * 自定义函数
     * 打分跳转的button事件
     */
    score: function () {
      if (this.data.status == 2) {
        wx.showModal({
          title: '提示',
          content: '未到打分时间',
          success: function (res) {
            if (res.confirm) {
              console.log('确定');
            } else if (res.cancel) {
              console.log('取消');
            }
          }
        });
      } else {
        wx.navigateTo({
          url: './grade?seminarId=' + this.data.seminarId + '&status=' + this.data.status,
        });
      }
    },
});

