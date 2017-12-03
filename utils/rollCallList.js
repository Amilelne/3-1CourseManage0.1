const attendance = {
  "numPresent": 4,
  "present": [
    {
      "id": 2357,
      "name": "张三"
    },
    {
      "id": 8232,
      "name": "李四"
    },
    {
      "id": 3422,
      "name": "王五"
    },
    {
      "id": 5214,
      "name": "王七九"
    }
  ],
  "late": [
    {
      "id": 3412,
      "name": "王五有"
    },
    {
      "id": 5234,
      "name": "王七请"
    }
  ],
  "absent": [
    {
      "id": 3214,
      "name": "张六"
    },
    {
      "id": 3412,
      "name": "王啊啊"
    },
    {
      "id": 5234,
      "name": "王前期"
    }
  ]
}
const classData = {
  "id": 23,
  "name": "周三1-2节",
  "numStudent": 120,
  "time": [
    {
      "week": 1,
      "day": 1,
      "lessons": [
        1,
        2
      ],
      "site": "海韵201"
    },
    {
      "week": 0,
      "day": 3,
      "lessons": [
        3,
        4
      ],
      "site": "公寓405"
    }
  ],
  "calling": true,
  "roster": "/roster/周三12班.xlsx",
  "proportions": {
    "3": 20,
    "4": 60,
    "5": 20,
    "report": 50,
    "presentation": 50
  }
}

export default{
  getAttenDanceById(){
    return attendance;
  },
  getClassDetailById(){
    return classData;
  }
}