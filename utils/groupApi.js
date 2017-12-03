const notLeaderData = {
    "id": 28,
    // "leader": {
    //     "id": 8888,
    //     "name": "张三"
    // },
    "members": [
        {
            id: 8888,
            name: '张三'
        },
        {
            "id": 5324,
            "name": "李四"
        },
        {
            "id": 5678,
            "name": "王五"
        }
    ],
    // "topics": [
    //     {
    //         "id": 257,
    //         "name": "领域模型与模块"
    //     },
    //     {
    //         "id": 252,
    //         "name": "hei, you get me"
    //     }
    // ],
    "report": ""
};

const leaderData = {
    "id": 28,
    "leader": {
        "id": 8888,
        "name": "张三"
    },
    "members": [
        {
            "id": 5324,
            "name": "李四"
        },
        {
            "id": 5678,
            "name": "王五"
        }
    ],
    // "topics": [
    //     {
    //         "id": 257,
    //         "name": "领域模型与模块"
    //     }
    // ],
    "report": ""
}

let isLeader = false;

function getGroupInfo(seminarId, cb) {
    // todo replace fake data
    // GET /seminar/{seminarId}/group?include={studentId}
    // GET /group/{groupId}?embedTopics=true

    cb(isLeader ? leaderData : notLeaderData);
}

function amILeader() {
    //todo compare group info with studentId
    return isLeader;
}

function becomeLeader(cb) {
//    队长辞职/成为队长：PUT /group/{groupID}
// 请求数据：包含修改的信息（队长id）
// {
//     "leader": {
//         "id": 5678
//     },
//     "members": [
//         {
//             "id": 8888
//         },
//         {
//             "id": 5324
//         }
//     ]
// }
    isLeader = true;
    cb(true);
}


function quitLeader(cb) {
    isLeader = false;
    cb(true);
}

export default {getGroupInfo, amILeader, becomeLeader, quitLeader}