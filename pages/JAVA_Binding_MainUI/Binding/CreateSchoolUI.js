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
    this.schoolname=e.detail.value
  },
  confirm:function(e)
  {
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