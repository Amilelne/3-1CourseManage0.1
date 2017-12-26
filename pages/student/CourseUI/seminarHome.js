Page({
    data: {
      courseName:'',
      seminarName:'',
      seminarId:'',
      groupingMethod:''
    },

    signup:function(){
      wx.navigateTo({
        url: './signup?seminarId='+seminarId,
      })
    },

    group: function () {
      wx.navigateTo({
        url: './UnChooseTopic',
      })
    },

    score: function () {
      wx.navigateTo({
        url: './grade',
      })
    },

    onLoad: function (options) {
        console.log(options);
        var seminarId = options.seminarId;
        var groupingMethod = options.groupingMethod;
        var courseName=options.courseName;
        var seminarName=options.seminarName;
        this.setData({
          seminarId:seminarId,
          groupingMethod:groupingMethod,
          courseName:courseName,
          seminarName:seminarName
        });
    },

});

