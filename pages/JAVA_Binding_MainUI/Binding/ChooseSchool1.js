// pages/index/ChooseSchool.js
Page(
  {
  /**
   * 页面的初始数据
   */
  data:{
    province:{id : 'province',text:'省份'},
    city: { id: 'city', text: '州市' },
    school:'学校',
    state:'none',
    city_list_displayed:[],
    school_list_displayed:[],
    provinces_list:[],
    city_list:[],
    school_list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this
    var $i,$j,$k
    var app=getApp()
      wx.request({
        url: app.data._preUrl+'/school/province',
        header: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + app.data._jwt,
        },
        method: 'GET',
        success:function(res)
        {
          console.log("get:"+res.data); 
            for($i=0;$i<res.data.length;$i++)
            {
              var pro={}
              pro.province=res.data[$i]
              that.data.provinces_list.push(pro)
            }
            console.log(that.data.provinces_list)
            that.setData({
              provinces_list: that.data.provinces_list
            })
        },
        fail:function(res)
        {
          console.log("获得省份列表失败！")
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
  chooseBack: function (e) {
    var $i,$j;
    var $button = e.currentTarget.dataset.info;
    var $buttonID = $button.id;
    var $current_location = $button.text;

    if (this.data.state != 'none' )
    {
      if (this.data.state == 'province_chosen')
      {
          if ($buttonID == 'province') 
          {
            this.setData({
            province: { id: 'province', text: '省份' },
            city: { id: 'city', text: '州市' },
            city_list_displayed: {},
            school_list_displayed: {},
            state: "none"
          });
          }
      }
      else if (this.data.state == 'city_chosen')
      {
          if ($buttonID == 'province') 
          {
            this.setData({
            province: { id: 'province', text: '省份' },
            city: { id: 'city', text: '州市' },
            city_list_displayed: {},
            school_list_displayed: {},
            state: "none"
            });
          }
          else if ($buttonID == 'city') 
          {
            this.setData({
            city: { id: 'city', text: '州市' },
            city_list_displayed: {},
            school_list_displayed: {},
            state: "province_chosen"
            });
            for ($i = 0; $i < this.data.city_list.length; $i++) {
              if (this.data.city_list[$i][0].province == this.data.province.text) 
              {
                for ($j = 0; $j < this.data.city_list[$i].length; $j++) {
                  var that = this;
                  var up = "city_list_displayed[" + $j + "].city";
                  that.setData({ [up]: this.data.city_list[$i][$j].city })
                }
                break;
              }
            }

          }
      }
      
    }
  },

  chooseItem: function (e) {
    var app=getApp()
    if(this.data.state=='none')
    {
      var $i,$j;
      var $current_province = e.currentTarget.dataset.province;
      app.data._schoolProvince = e.currentTarget.dataset.province;
      this.setData({
        province: {id : 'province', text: $current_province},
        state: "province_chosen"
      });
      const that=this
      //**********************
               wx.request({
                url: app.data._preUrl + '/school/city',
                header: {
                  "content-type": "application/json",
                  "Authorization": 'Bearer ' + app.data._jwt,
                },
                method: 'GET',
                data:
                {
                  'province': $current_province
                },
                success: function (res) {
                  for ($j = 0; $j < res.data.length; $j++) {
                    var cit = {city:''}
                    cit.city = res.data[$j]
                    that.setData({
                      city_list_displayed: []
                    }),
                    that.data.city_list_displayed.push(cit)
                  }
                  that.setData({
                    city_list_displayed: that.data.city_list_displayed
                  })
                },
                fail: function (res) {
                  console.log("获得城市列表失败！")
                }
              })    
    }
    else if (this.data.state == 'province_chosen')
    {
      var $i,$j
      const that=this
      var $current_city = e.currentTarget.dataset.city;
      app.data._schoolCity = e.currentTarget.dataset.city;
      this.setData({
        city: { id: 'city', text: $current_city },
        state: "city_chosen"
      });
      wx.request({
        url: app.data._preUrl + '/school',
        header: {
          "content-type": "application/json",
          "Authorization": 'Bearer ' + app.data._jwt,
        },
        method: 'GET',
        data:
        {
          'city': $current_city
        },
        success: function (res) {
          for ($j = 0; $j < res.data.length; $j++) {
            var shl = {school: '' }
            shl.school = res.data[$j].name
            that.setData({
              school_list_displayed: []
            }),
            that.data.school_list_displayed.push(shl)
          }
          that.setData({
            school_list_displayed: that.data.school_list_displayed
          })
        },
        fail: function (res) {
          console.log("获得学校列表失败！")
        }
      })
    }
    else if (this.data.state == 'city_chosen')
    {
      var $current_school = e.currentTarget.dataset.school;
      app.data._userSchool = e.currentTarget.dataset.school;
      wx.setStorage({
        key: 'school',
        data: e.currentTarget.dataset.school,
      })
      wx.getStorage({
        key: 'student_or_teacher',
        success: function(res) {
          if(res.data==1)
          wx.navigateTo({ url: './StudentBindingUI', })
          else
            wx.navigateTo({ url: './TeacherBindingUI', })
        },
      })
      
    }
  },
  AddSchool: function (e){
   
    wx.setStorage({
      key:'city',
      data:this.data.city.text,
    })
    wx.setStorage({
      key: 'province',
      data:this.data.province.text,
    })
     wx.redirectTo({ url: './CreateSchoolUI' })
  }
})