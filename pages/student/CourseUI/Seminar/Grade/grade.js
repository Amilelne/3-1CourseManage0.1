// pages/StudentClass/CourseUI/Seminar/Grade/grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groups: [{ id: 0, name: 'A1', score: 0 },
    { id: 1, name: 'A2', score: 0 },
    { id: 2, name: 'A3', score: 0 },
    { id: 3, name: 'A4', score: 0 },
    { id: 4, name: 'A5', score: 0 }],

    heart_chosen: "heart_chosen.png",
    heart_empty: "heart_empty.png",
    key: 0, //评分
    groupId: 0 //第一组
  },
  //selectHeart事件处理函数
  selectHeart: function (e) {
    // const key = parseInt(e.target.dataset.key);
    // const groupId = parseInt(e.curentTarget.groupId);
    // console.log(e.target.dataset.key);
    // console.log(e.curentTarget.groupId);
    // this.setData({
    //     key: key,
    //     groupId: groupId
    // });

    const groupIndex = e.currentTarget.id;
    const score = e.target.dataset.score;
    console.log(groupIndex, score);
    const groups = this.data.groups;
    groups[groupIndex].score = score;
    this.setData({
      groups: groups
    });
  },
  //提交
  submit:function(){
    wx.navigateTo({
      url: '../seminarHome',
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