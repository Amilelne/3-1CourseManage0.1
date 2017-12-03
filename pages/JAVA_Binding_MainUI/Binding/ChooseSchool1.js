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

    provinces_list:[
      { province:'北京'},{ province:'天津'},
      { province:'黑龙江'},{ province:'吉林'},
      { province:'辽宁'},{ province:'河北'},
      { province:'内蒙古'},{ province:'河南'},
      { province:'山东'},{ province:'浙江'},
      { province:'江苏'},{ province:'福建'},
      { province: '江西' }, { province: '安徽' }, 
      { province: '广西' }, { province: '广东' },
      { province: '山西' }, { province: '陕西' },
      { province: '甘肃' }
    ],
    
    city_list:[
      [
        { province: '北京', city: '海淀区' }, { province: '北京', city: '朝阳区' }
      ],
      [
        { province: '福建', city: '福州' }, { province: '福建', city: '厦门' }, { province: '福建', city: '泉州' }, 
        { province: '福建', city: '漳州' }, { province: '福建',city: '莆田' }
      ]
    ],
    school_list: [
      [
        { city: '海淀区', school: '清华大学' }, { city: '海淀区', school: '北京大学' },
      ],
      [
        { city: '厦门', school: '诚毅学院' }, { city: '厦门', school: '华侨大学' },
        { city: '厦门', school: '华夏学院' }, { city: '厦门', school: '嘉庚学院' },
        { city: '厦门', school: '厦门大学' }, { city: '厦门',school: '厦门理工大学'}
      ]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    if(this.data.state=='none')
    {
      var $i,$j;
      var $current_province = e.currentTarget.dataset.province;

      this.setData({
        province: {id : 'province', text: $current_province},
        state: "province_chosen"
      });
      for($i=0;$i<this.data.city_list.length;$i++)
      {
        if (this.data.city_list[$i][0].province == $current_province)
        {
          for ($j = 0; $j < this.data.city_list[$i].length; $j++) 
          {
            var that = this;
            var up = "city_list_displayed[" + $j + "].city";
            that.setData({ [up]: this.data.city_list[$i][$j].city })
          }
        }
      }
    }
    else if (this.data.state == 'province_chosen')
    {
      var $i,$j
      var $current_city = e.currentTarget.dataset.city;
      this.setData({
        city: { id: 'city', text: $current_city },
        state: "city_chosen"
      });
      for ($i = 0; $i < this.data.school_list.length; $i++) {
        if (this.data.school_list[$i][0].city == $current_city) {
          for ($j = 0; $j < this.data.school_list[$i].length; $j++) {
            var that = this;
            var up = "school_list_displayed[" + $j + "].school";
            that.setData({ [up]: this.data.school_list[$i][$j].school })
          }
        }
      }
    }
    else if (this.data.state == 'city_chosen')
    {
      var $current_school = e.currentTarget.dataset.school;
      wx.setStorage({
        key: 'school',
        data: e.currentTarget.dataset.school,
      })
      wx.navigateTo({url: './TeacherBindingUI',});
    }
  },

  AddSchool: function (e){
    wx: wx.navigateTo({ url: './CreateSchoolUI'})
  }
})