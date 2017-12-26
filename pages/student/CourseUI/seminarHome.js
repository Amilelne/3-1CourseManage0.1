Page({
    data: {
      courseName:'',
      seminarName:''
    },

    signup:function(){
      wx.navigateTo({
        url: './signup',
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
    },
    
});

