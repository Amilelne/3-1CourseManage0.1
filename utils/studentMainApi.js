const studentData = {
    "name": "可怜的Potter",
    "number": 11,
    "avator": "",
    "courses": [
        {name: "黑魔法防御课", teacher: "斯内普教授", id: '1'},
        {name: "草药学", teacher: "斯内普教授", id: '2'},
        {name: "魔药学", teacher: "斯内普教授", id: '3'},
        {name: "魔药学", teacher: "斯内普教授", id: '4'},
        {name: "魔药学", teacher: "斯内普教授", id: '5'}],
    "school": "霍格沃兹魔法学校格兰芬多学院"
};

// todo set class id into global variable
const api = {
    getAllCourse: function () {
        return studentData.courses;
    }
};

export default api;
