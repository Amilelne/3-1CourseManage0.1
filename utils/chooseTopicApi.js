function getTopics(seminarId, cb) {
//     获得所有话题 GET /seminar/{seminarId}/topic
// 请求数据：无
// 响应数据：包含所有话题的信息的JSON
// [
//     {
//         "id": 257,
//         "name": "领域模型与模块",
//         "description": "Domain model与模块划分",
//         "groupLimit": 5,
//         "groupLeft": 2
//     }
// ]
    cb([
        {
            "id": 257,
            "name": "领域模型与模块",
            "description": "Domain model与模块划分",
            "groupLimit": 5,
            "groupLeft": 2
        },
        {
            "id": 27,
            "name": "领域模型与模块",
            "description": "Domain model与模块划分",
            "groupLimit": 5,
            "groupLeft": 2
        },
        {
            "id": 2,
            "name": "领域模型与模块",
            "description": "Domain model与模块划分",
            "groupLimit": 5,
            "groupLeft": 2
        }
    ])
}

export default {getTopics};
// async function () {
//     var x = await add
//     var x = await add
//     var x = await add
//     var x = await add
//     var x = await add
// }