Page({
    data: {
      courseName:'',
      seminarName:'',
      classId:'',
      seminarId:'',
      groupingMethod:''
    },

    signup:function(){
      wx.navigateTo({
        url: './signup?classId='+this.data.classId+'&seminarId='+this.data.seminarId,
      })
    },

    group: function () {
      wx.navigateTo({
        url: './UnChooseTopic?seminarId=' + this.data.seminarId + '&groupingMethod=' + this.data.groupingMethod+'&seminarName='+this.data.seminarName,
      })
    },

    score: function () {
      wx.navigateTo({
        url: './grade?seminarId=' + this.data.seminarId,
      })
    },

    onLoad: function (options) {
        console.log(options);
        var seminarId = options.seminarId;
        var groupingMethod = options.groupingMethod;
        var courseName=options.courseName;
        var seminarName=options.seminarName;
        this.setData({
          classId:options.classId,
          seminarId:seminarId,
          groupingMethod:groupingMethod,
          courseName:courseName,
          seminarName:seminarName
        });

        var app = getApp();
        var that = this;
        //可以避免session-key过期的情况
        // wx.getUserInfo({
        //   success: function (res) {
        //     console.log(res);
        //     wx.request({
        //       url: app.data._preUrl + '/auth/refresh',
        //       header: {
        //         "content-type": "application/json",
        //         "Authorization": 'Bearer ' + app.data._jwt,
        //       },
        //       method: 'GET',
        //       success: function (res) {
        //         console.log('更新成功', res);
        //         if (res.statusCode == 200) {
        //           app.data._jwt = res.data;
        //         }
        //         console.log(app.data._jwt);
        //       },
        //       fail: function (res) {
        //         console.log('用户拒绝', res.data);
        //       }
        //     })
        //   }
        // })
        // if (app.globalData.userInfo) {
        //   this.setData({
        //     userInfo: app.globalData.userInfo,
        //     hasUserInfo: true
        //   })
        // } else if (this.data.canIUse) {
        //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //   // 所以此处加入 callback 以防止这种情况
        //   app.userInfoReadyCallback = res => {
        //     this.setData({
        //       userInfo: res.userInfo,
        //       hasUserInfo: true
        //     })
        //   }
        // } else {
        //   // 在没有 open-type=getUserInfo 版本的兼容处理
        //   wx.getUserInfo({
        //     success: res => {
        //       app.globalData.userInfo = res.userInfo
        //       this.setData({
        //         userInfo: res.userInfo,
        //         hasUserInfo: true
        //       })
        //     }
        //   })
        // }
    },

});

