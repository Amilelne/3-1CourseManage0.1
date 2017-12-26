// pages/index/CourseUI.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    seminar_list: [],
    /*{id:29,name:"界面原型设计",description:"界面原型设计",groupingMethod:"fixed",startTime:"2017-09-25",state:1},
     { id:29, name:"界面原型设计", description:"界面原型设计", groupingMethod:"fixed", startTime:"2017-09-25",state:0},
    ]*/
    courseName:"",

    getCourseVO:'',
    listSeminarAndGradeVO:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //****************获得各个seminar，以及获得上面的标题 
    var courseName;
    var app=getApp()
    const that=this;
    console.log('courseId',options.courseID);
    //获取course的相关数据
    wx.request({
      url: app.data._preUrl+'/course/'+options.courseID,
      header:{
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method:'GET',
      success:function(res)
      {
        console.log('course相关数据',res.data)
        that.setData({
          getCourseVO: res.data,
        });
      }
    });
    //获取course下的seminars
    wx.request({
      url: app.data._preUrl + '/course/' + options.courseID+'student/seminar',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: "GET",
      success: function (res) {
        console.log('seminars相关数据',res.data);
        that.setData({listSeminarAndGradeVO:res.data});
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

  },
  enterSeminar: function (e) {
    var $state = e.currentTarget.dataset.state;
    console.info($state);
    if ($state == 1) {
      wx: wx.navigateTo({ url: './seminarHome' });
    }


  }
})

