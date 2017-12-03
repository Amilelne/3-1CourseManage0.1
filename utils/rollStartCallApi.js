const classdata = [{
  id: "1",
  title: "班级一",
  num:40,
  rollcall:{
    groupType:'随机分组',
    calledNum:0,
    endCall:true
  },
  call: {
    status: "start",
    btnStatusText: "开始签到"
  },
},{
    id: "2",
    title: "班级二",
    num: 40,
    rollcall: {
      groupType: '固定分组',
      calledNum: 3,
      endCall: true
    },
    call: {
      status: "start",
      btnStatusText: "开始签到"
    },
}]
export default {
  getClassById() {
    return classdata[1];
  },
}