// pages/StudentClass/CourseUI/Seminar/Grade/grade.js
Page({
  data: {
    groups: [{ id: 0, name: 'A1', score: 0 },
    { id: 1, name: 'A2', score: 0 },
    { id: 2, name: 'A3', score: 0 },
    { id: 3, name: 'A4', score: 0 },
    { id: 4, name: 'A5', score: 0 }],
    showView:true,
    heart_chosen: "../../images/heart_chosen.png",
    heart_empty: "../../images/heart_empty.png",
    key: 0, //评分
    groupId: 0 //第一组
  },
  selectHeart: function (e) {
    const groupIndex = e.currentTarget.id;
    const score = e.target.dataset.score;
    console.log(groupIndex, score);
    const groups = this.data.groups;
    groups[groupIndex].score = score;
    this.setData({
      groups: groups
    });
  },
  //*******************************提交打分表到数据库
  submit:function(){ 
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定要打分吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({showView:false,})
          var app = getApp()
          var $i;
          for ($i = 0; $i < that.data.groups.length; $i++) {
            var topiciiid/*
            wx.request({
              url:app.data._preUrl+'/group/'+that.data.groups[$i].id,
              method:"GET",
              header:{
                "content-type": "application/json",
                "Authorization": 'Bearer ' + app.data._jwt,
              },
              data:{
                embedTopics:true,
                embedGrade:true,
              },
              success:function(res)
              {
                topiciiid=res.data.topics.id
                //console.log(res.data)
              }
            })*/
            wx.request({
              url: app.data._preUrl + '/group/' + $i + '/grade/presentation/' + 1,
              method: 'PUT',
              data: {
                topicId:$i,
                grade: that.data.groups[$i].score
              },
              header:
              {
                "content-type": "application/json",
                "Authorization": 'Bearer ' + app.data._jwt,
              },
              success: function (res) 
              {
                console.log(res.data)
              }
            })
          }
        }
      }
    }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //*****************获得数据库中获得小组
    var app=getApp();
    options.seminarId=1
    const that=this
    wx.request({
      url:app.data._preUrl+'/seminar/'+options.seminarId+'/group',
      header: {
        'Authorization': 'Bearer ' + app.data._jwt
      },
      method:'GET',
      success:function(res)
      {
        that.data.group=res.data
        console.log(res.data)
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