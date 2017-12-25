// JAVA_Binding_MainUI/StudentMainUI/StudentMainUI.js
Page({
  data: {
    userID: '',
    userName: '',
    userSchool: '',
    courtea:[],
  },
  btnToCourse:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var coursename=this.data.courtea[index].course;
    wx.navigateTo({
      url: '../../student/CourseUI/CourseMain?courseID=' + this.data.courtea[index].id,
    })
    console.log(this.data.courtea[index].id)
  },
  CheckInfo: function () {
    const that = this
    wx.navigateTo({
      url: '../StudentMainUI/CheckStudentInfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
//初始化*****************随便写的
    var app=getApp()
    const that = this
    app._userID='24320152202700',
    console.log("StudentMain");
    /*       //需要获得courselist/根据波波的
    wx.request({
      url:app._preUrl+'/course',
      method: 'GET',
      success:function(res)
      {
        var $i;
        for($i=0;$i<res.data.length;$i++)
        {
          wx.request({
            url:app._preUrl+'/course/'+res.data[$i].id,
            method:'GET',
            succrss:function(res){
              that.data.courtea.push({ "course": res.data.name, "teacher": res.data.teacherName });
          }
        })
        }
      } 
    })*/
    that.data.courtea.push({"course":"OOAD","teacher":"邱明","id":1});
    //console.log(this.data.courtea)
    /*{ course: "OOAD", teacher: "邱明" }, { course: "操作系统", teacher: "吴清强" }, { course: "数据仓库", teacher: "王鸿吉" });*/
    
    var app = getApp()
    that.setData({
      userID: "学号:" + app.data._userID,
      userName: "姓名:" + app.data._userName,
      courtea:this.data.courtea,
    })
  }
})