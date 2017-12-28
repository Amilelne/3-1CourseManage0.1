// pages/StudentClass/CourseUI/Seminar/FixedGroup/UnChooseTopic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*group:[{"name":"吴双",studentId:24320152202778},
      { "name": "马飞宇", studentId: 24320152202779 },
      { "name": "林萧", studentId: 24320152202782 },
      { "name": "易中天", studentId: 24320152202783 },
      { "name": "轩辕朗", studentId: 24320152202788 }],
    showLeader: false,*/
    isLeader: '',

    seminarName:'',
    groupingMethod:'',
    seminarId:'',

    myGroupVO:'',
  },

  //toBeLeader事件函数*****************************成为队长，存入数据库
  toBeLeader: function () {
    var app=getApp();
    if (this.data.isLeader) {
      //修改数据库-去队长
      wx.request({
        url: app.data._preUrl+'/group/' + this.data.myGroupVO.id + '/resign',
        data: {
          id:app.data._userId
        },
        header: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + app.data._jwt,
        },
        method:'PUT',
        success: function (res) {
          console.log(res);
        },
        fail:function(res){
          console.log(res);
        }
      });
      this.setData({
        isLeader: false
      })
    }
    else {
      //修改数据库-加队长
      wx.request({
        url: app.data._preUrl + '/group/' + this.data.myGroupVO.id + '/assign',
        data: {
          id: app.data._userId
        },
        header: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + app.data._jwt,
        },
        method: 'PUT',
        success: function (res) {
          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        }
      });
      this.setData({
        isLeader: true
      })
    }
  },

  //topic事件监听
  topic: function () {
    wx.redirectTo({
      url: './ChooseTopic?seminarId='+this.data.seminarId+'&groupId='+this.data.myGroupVO.id,
    })
  },

  //chooseTopic的事件函数
  chooseTopic: function () {
    wx.navigateTo({
      url: '../ChooseTopic/ChooseTopic',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      seminarName:options.seminarName,
      groupingMethod: options.groupingMethod,
      seminarId: options.seminarId,
    });
    var app=getApp();
    var that=this;
    //获取队伍信息
    wx.request({
      url: app.data._preUrl + '/seminar/' + this.data.seminarId+'/group/my',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('course相关数据', res.data);
        if(res.data.leader==null){
          that.setData({isLeader:false});//初始化界面标记量
        }
        that.setData({
          myGroupVO: res.data,
        });
      },
      fail: function (res) {
        console.log(res);
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