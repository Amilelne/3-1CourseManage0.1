// pages/TeacherClass/CallInRoll/GroupInfoUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groups: [{ id: "1031A1", topic: "A", name: "1A1", list: [{ id: "001", name: "学生1" }, { id: "002", name: "学生2" }, { id: "003", name: "学生3" }, { id: "004", name: "学生4" }, { id: "005", name: "学生5" }] }, { id: "1031A2", topic: "A", name: "1A2", list: [{ id: "006", name: "学生6" }, { id: "007", name: "学生7" }, { id: "008", name: "学生8" }, { id: "009", name: "学生9" }, { id: "010", name: "学生10" }] }, { id: "1031B1", topic: "B", name: "1B1", list: [{ id: "011", name: "学生11" }, { id: "012", name: "学生12" }, { id: "013", name: "学生13" }, { id: "014", name: "学生14" }, { id: "015", name: "学生15" }] }, { id: "1031B2", topic: "B", name: "1B2", list: [{ id: "016", name: "学生16" }, { id: "017", name: "学生17" }, { id: "018", name: "学生18" }, { id: "019", name: "学生19" }, { id: "020", name: "学生20" }] }],
    roster:[],
    groupingMethod: "random",
    status: "calling",
    groupLists:'',
    curgroup: 0,
    absentList:[],
    curselect:-1,

    showModal: false,
  },

  chooseToggle: function (e) {
    let index = e.currentTarget.dataset.index,
      nowToggle = this.data.groups[index].toggle;
    this.setData({
      ['groups[' + index + '].toggle']: !nowToggle
    })
  },

  changecurgroup:function(e){
    let index = e.currentTarget.dataset.index;
    this.setData({curgroup:index});
  },

  showmodalimg:function(){
    this.setData({
      showModal: true
    })
  },

  /**
     * 弹出框蒙层截断touchmove事件
     */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
    var datas = this.data;
    var index = datas.curselect;
    datas.roster.late.list[index].grouped = true;
    var obj = {
      islate: true,
      id: datas.roster.late.list[index].id,
      name: datas.roster.late.list[index].name,
    };
    datas.groups[datas.curgroup].list.push(obj);
    this.setData(datas);
    console.log("Teacher adds a late student to a group");
  },

  select:function(e){
    let index = e.currentTarget.dataset.index;
    this.setData({ curselect: index });
  },

  remove:function(e){
    let index = e.currentTarget.dataset.index;
    var datas = this.data;
    var deleteid = datas.groups[datas.curgroup].list[index].id;
    datas.groups[datas.curgroup].list.splice(index,1);
    for (let i = 0; i < datas.roster.late.list.length;i++){
      if (datas.roster.late.list[i].id==deleteid){
        datas.roster.late.list[i].grouped=false;
      }
    }
    this.setData(datas);
    console.log("Teacher removes a late student from a group");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var that = this; 
    var groupRoster = [];   
    wx.request({
      url: app.data._preUrl + '/seminar/' + app.data._seminarID + '/group',
      method: "GET",
      header: {
        'Authorization': 'Bearer ' + app.data._jwt
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ groups: res.data });
        for(var i=0;i<res.data.length;i++){
          var groupNum = res.data[i].groupName;
          wx.request({
            url: app.data._preUrl + '/group/' + res.data[i].groupName,
            method: "GET",
            header: {
              'Authorization': 'Bearer ' + app.data._jwt
            },
            success:function(res){
              if(res.data.members){
                wx.setStorage({
                  key: res.data.id,
                  data: res.data.members,
                })
                that.setData({
                  ['roster['+i+']']:res.data.members
                })
                console.log(that.data.roster[i])
              } 
            },
          })
        }
        
      }
    });
    wx.request({
      url: app.data._preUrl + '/seminar/' + app.data._seminarID + '/class/'+app.data._classID+'/attendance/absent',
      method: "GET",
      header: {
        'Authorization': 'Bearer ' + app.data._jwt
      },
      success: function (res) {
        if(res.data){
          that.setData({ absentList: res.data });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})