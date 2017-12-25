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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //****************获得各个seminar，以及获得上面的标题 
    var courseName;
    var app=getApp()
    const that=this;
    /*貌似/course/courseid出现了问题
    wx.request({
      url: app.data._preUrl+'/course/'+options.courseID,
      method:'GET',
      success:function(res)
      {
        console.log(res.data.name)
        that.setData({
          courseName: res.data.name,
          });
      }
    })*/
    var $i;
    wx.request({
      url: app.data._preUrl + '/course/' + options.courseID+'/seminar',
      data: {
        embedGrade: true
      },
      type: "GET",
      /*header:{
        'Authorization': 'Bearer '+app._jwt,
      },*/
      success: function (res) {
        console.log(res.data);
        for ($i = 0; $i < res.data.length; $i++) {
          that.data.seminar_list.push({ "id": res.data[$i].id, "name": res.data[$i].name, "groupingMethod": res.data[$i].groupingMethod, "startTime": res.data[$i].startTime, "endTime": res.data[$i].endTime})
        }

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

  },
  enterSeminar: function (e) {
    var $state = e.currentTarget.dataset.state;
    console.info($state);
    if ($state == 1) {
      wx: wx.navigateTo({ url: './seminarHome' });
    }


  }
})

