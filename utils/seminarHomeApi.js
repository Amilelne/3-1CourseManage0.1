import oneCourseApi from './oneCourseApi';

function getSeminarInfo(args, cb) {
    //todo replacing fake data
    console.log("get group info");
    const courseName = 'ooad'; //todo get course name by seminar id or parse in to that page as parameter;

    cb({
        "id": 2,
        "name": "界面原型设计",
        "description": "界面原型设计",
        "groupingMethod": "no fixed",
        "startTime": "2017-09-25",
        "endTime": "2017-12-09",
        courseName: courseName
    });
}

export default {getSeminarInfo}