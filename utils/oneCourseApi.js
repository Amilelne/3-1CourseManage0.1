const couseInfo = [
    {name: "黑魔法防御课", teacher: "斯内普教授", id: '1'},
    {name: "草药学", teacher: "斯内普教授", id: '2'},
    {name: "魔药学", teacher: "斯内普教授", id: '3'},
    {name: "魔药学", teacher: "斯内普教授", id: '4'},
    {name: "魔药学", teacher: "斯内普教授", id: '5'}];

function getGroupByCourseId(args, cb) {
    // todo replace fake data
    if (cb) {
        cb({
            courseName: 'ooad', // todo get course name via function
            seminars: [
                {
                    "id": 1,
                    "name": "界面原型设计",
                    "description": "界面原型设计",
                    "groupingMethod": "fixed",
                    "startTime": "2017-09-25",
                    "endTime": "2017-10-09"
                },
                {
                    "id": 2,
                    "name": "概要设计",
                    "description": "模型层与数据库设计",
                    "groupingMethod": "fixed",
                    "startTime": "2017-10-10",
                    "endTime": "2017-10-24"
                }
            ]

        });
    }

}

export default {getSeminarInfoByCourseId: getGroupByCourseId}