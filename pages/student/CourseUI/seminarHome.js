Page({
    data: {
      courseName:'',
      seminarName:'',
      seminarId:'',
      groupingMethod:''
    },

    signup:function(){
      wx.navigateTo({
        url: './signup?seminarId='+this.data.seminarId,
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
          seminarId:seminarId,
          groupingMethod:groupingMethod,
          courseName:courseName,
          seminarName:seminarName
        });
    },

});

