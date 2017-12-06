// pages/TeacherClass/CallInRoll/RollCallUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classNode: { id: 23, name: '班级1', numStudent: 0, time: [{ week: 1, day: 1, lessons: [1, 2], site: '海韵201' }, { week: 0, day: 3, lessons: [3, 4], site: '公寓405' }], calling: true, roster: '/roster/周三12班.xlsx', proportions: { '3': 20, '4': 60, '5': 20, report: 50, presentation: 50 } },
    roster: { id: 132, calling: 0, classid: 23, attend: { num: 0, list: [] }, late: { num: 0, list: [] } },
    groupingMethod:"random",
    status:"calling",
    num:0,
    allnum:40
  },

  endModal: function () {
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定要结束点名？',
      cancelText: "否",
      confirmText: "是",
      confirmColor: "#6cf",
      success: function (res) {
        if (res.confirm) {
          console.log("Teacher confirm endRollCall");
          that.setData({ status: "called" });
          that.setData({
            num:40
          })
        } else {
          console.log("Teacher cancel endRollCall");
        }
      }
    })
  },

  smallbtn:function(){
    console.log("Teacher will go to the RollCallListUI page");
    wx.navigateTo({
      url: '../CallInRoll/RollCallListUI?groupingMethod=' + this.data.groupingMethod+'&status='+this.data.status,
    })
  },

  bigbtn1_1:function(){
    this.setData({status:"calling"});
    console.log("Teacher starts calling in roll");
  },

  /*
  bigbtn1_2: function () {
    this.setData({ status: "called" });
    console.log("Teacher ends calling in roll");
  },*/

  bigbtn1_3: function () {
    console.log("Teacher will go to the RollCallListUI page");
    wx.navigateTo({
      url: '../CallInRoll/RollCallListUI?groupingMethod=' + this.data.groupingMethod + '&status=' + this.data.status,
    })
  },

  bigbtn2: function () {
    console.log("Teacher will go to the GroupInfoUI page");
    wx.navigateTo({
      url: '../CallInRoll/GroupInfoUI?groupingMethod=' + this.data.groupingMethod + '&status=' + this.data.status,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      groupingMethod: options.groupingMethod,
      status: options.status,
    });
    console.log("Teacher enters the RollCall page under a "+this.data.groupingMethod+" method with "+this.data.status+" status");
    var that=this;
    wx.request({
      url: 'http://120.77.173.98:8301/class/1',
      method:"GET",
      success: function (res) {
        console.log(res.data);
        that.setData({ classNode: res.data });
      }
    });
    wx.request({
      url: 'http://120.77.173.98:8301//seminar/1/class/1/attendance',
      method: "GET",
      success: function (res) {
        console.log(res.data);
        var ros=that.data.roster;
        ros.attend.num = res.data.numPresent;
        that.setData({ roster: ros});
      }
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
  
  }
})