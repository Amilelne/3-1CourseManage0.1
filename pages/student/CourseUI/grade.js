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
    groupId: 0, //第一组
    seminarId:'',
    myTopics:'',
    status:'',
    allTopics:'',
    gradeTopics:'',
    gradeGroups:''
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
            var topiciiid
            wx.request({
              url: app.data._preUrl + '/group/' + that.data.groups[$i].id + '/grade/presentation/' + app.data._userId,
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
    var that=this;
    var app=getApp();
    that.setData({
      seminarId:options.seminarId,
      status:options.status
    });
    //获取自己选择的topic
    wx.request({
      url: app.data._preUrl + '/seminar/' + this.data.seminarId + '/group/my',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log('自己组选择的topics', res.data.topics);
        that.setData({
          myTopics: res.data.topics,
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
    //获取所有topic
    wx.request({
      url: app.data._preUrl + '/seminar/' + options.seminarId + '/topic',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          allTopics: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    //计算自己需要打分的topic(先做差集再做交集)
    var gradeTopics;
    var k=0;
    for(var i=0;i<this.data.myTopics;i++){
      for(var j=0;j<this.data.allTopics;j++){
        if(this.data.allTopics[j].id!=this.data.myTopics[i].id){
          var l=0;
          for(l=0;l<k;l++){
            if (gradeTopics[l].id == this.data.allTopics[j].id)break;
          }
          if(l>=k){
            gradeTopics[k] = this.data.allTopics[j].id;
            k++;
          }
        }
      }
    }
    that.setData({
      gradeTopics:gradeTopics
    });
    //获取需要打分的组
    var gradeGroups;
    k=0;
    for(var i=0;i<gradeTopics.length;i++){
      wx.request({
        url: app.data._preUrl + '/topic/' + gradeTopics[i] + '/group',
        header: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + app.data._jwt,
        },
        method: 'GET',
        success: function (res) {
          console.log(res);
          for(var j=0;j<res.data.length;j++){
            for(var l=0;l<that.data.myTopics.length;l++){
              if (res.data[j].id != that.data.myTopics[j].id){
                gradeGroups[k] = res.data[j];
                k++;
              }
            }
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    

    if(options.status==0)
    {
      //*****************获得数据库中获得小组
      var app=getApp();
      options.seminarId=1
      const that=this;
      for(var i=0;i<5;i++)that.data.groups[i]
      wx.request({
        url:app.data._preUrl+'/seminar/'+options.seminarId+'/group',
        header: {
          'Authorization': 'Bearer ' + app.data._jwt
        },
        method:'GET',
        success:function(res)
        {
          that.setData({
            group:res.data
          })
          console.log(res.data)
        }
      })
    }
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