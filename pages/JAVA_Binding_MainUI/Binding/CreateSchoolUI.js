// JAVA_Binding_MainUI/Binding/CreateSchoolUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: '',
    city: '',
    schoolname: '',
  },
  schoolName: function (e) {
    this.data.schoolname=e.detail.value
  },
  confirm:function(e)
  {
    const that=this
    var app=getApp()
    app.data._userSchool=that.data.schoolname
    //*********向数据库中添加新的学校
    // console.log(that.data.schoolname)
    // console.log(that.data.province)
    // console.log(that.data.city)
    wx.request({
      url: app.data._preUrl + '/school',
      data: {
        name: that.data.schoolname,
        province: that.data.province,
        city: that.data.city
      },
      method: 'POST',
      header:
      {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + app.data._jwt,
      },
    })
    wx.setStorage({
      key: 'school',
      data: this.schoolname,
    })
    wx.getStorage({
      key: 'student_or_teacher',
      success: function(res) {
        if(res.data==1)
          wx.redirectTo({
            url: './TeacherBindingUI',
          })
          else
          wx.redirectTo({
            url: './StudentBindingUI',
          })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getStorage({
      key: 'province',
      success: function (res) {
        that.setData({
          province: res.data
        })
      },
    })
    wx.getStorage({
      key: 'city',
      success: function (res) {
        that.setData({
          city: res.data
        })
      },
    })
  },
})