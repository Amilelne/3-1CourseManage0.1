// pages/TeacherClass/ClassManage/classManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: { id: 23, name: 'OOAD', description: '面向对象设计与分析' },
    courseName:'',
    seminar: { id: 29, name: '讨论课4', description: '界面原型设计', groupingMethod: 'random', startTime: '2017-10-09', endTime: '2017-10-24' },
    classes: [{ id: 23, name: '班级1' }, { id: 46, name: '班级2' }, { id: 47, name: '班级3' }],
    status:"tocall",
  },

  classbtn: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var classId = this.data.classes[index].id;
    console.log("class name=" + this.data.classes[index].name);
    /**
     * 获取classID
     */
    getApp().data._classID = this.data.classes[index].id;
    var text = this.data.seminar.groupingMethod;
    wx.navigateTo({
    url: '../CallInRoll/RollCallUI?classid=' + classId + '&groupingMethod='+text+'&status='+this.data.status+'&className='+this.data.classes[index].name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("Teacher enters the classManage page of one seminar");
    console.log(options)
    var that=this;
    var app = getApp();
    that.setData({
      courseName:options.courseName
    })
    wx.request({
      url: app.data._preUrl+'/course/'+app.data._courseID+'/class',
      method: "GET",
      header:{
        'Authorization': 'Bearer ' + app.data._jwt
      },
      success: function (res) {
        console.log(res);
        if(res.statusCode==200){
          that.setData({ classes: res.data });
        }else{
          wx.showModal({
            title: '提示',
            content: '信息获取失败',
            success: function (res) {
              if (res.confirm) {
                console.log('确定');
              } else if (res.cancel) {
                console.log('取消');
              }
            }
          });
        }
      },
      fail:function(res){
        wx.showModal({
          title: '提示',
          content: '信息获取失败',
          success: function (res) {
            if (res.confirm) {
              console.log('确定');
            } else if (res.cancel) {
              console.log('取消');
            }
          }
        });
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