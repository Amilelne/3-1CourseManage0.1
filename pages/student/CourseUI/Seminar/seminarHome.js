Page({
    data: {},
    callBox:function(){
      wx.navigateTo({
        url: '../Seminar/SignUP/signup',
      })
    },
    groupBox: function () {
      wx.navigateTo({
        url: '../Seminar/FixedGroup/UnChooseTopic',
      })
    },
    scoreBox: function () {
      wx.navigateTo({
        url: '../Seminar/Grade/grade',
      })
    },
    onLoad: function (options) {
        /**
         * options{
         *  courseId: 1
         *   seminarId: 1
         * }
         */
        // todo get rid of this
        options = {
            seminarId: 1
        };

        console.log(options);
        const that = this;
        api.getSeminarInfo(options, function (seminar) {
            console.log(seminar);
            const started = isSeminarStarted(seminar);
            that.setData({
                seminar: seminar,
                started: started,
                courseName: seminar.courseName,
                seminarId: options.seminarId
            });
        });
    },

    callInRoll(e) {

        const targetUrl = utils.buildUrl({
            base: './rollCall/rollCall',
            seminarId: this.data.seminarId
        });

        console.log(targetUrl);
        wx.navigateTo({
            url: targetUrl
        });
    }

});

function isSeminarStarted(res) {
    const startTime = Date.parse(res.startTime);
    const endTime = Date.parse(res.endTime);
    const now = Date.now();
    let started = false;
    if (now >= startTime && now <= endTime) {
        started = true;
    }
    return started;
}
