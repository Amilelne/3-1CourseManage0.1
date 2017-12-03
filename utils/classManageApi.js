const course = {
    id:"1",
    title:"OOAD",
    currentSeminar:{
      title:"讨论课5",
      time:"11月6日-11月12日",
      grouptype:"随机分组"
    },
    classes:[
      {
        id:"101",
        name:"班级1"
      },
      {
        id:'102',
        name:"班级2"
      },
      {
        id:'103',
        name:"班级3"
      }
    ]
}
export default {
  getCourseById(){
    return course;
  }
}