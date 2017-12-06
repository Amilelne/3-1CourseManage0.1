// pages/TeacherClass/CallInRoll/GroupInfoUI.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groups: [{ id: "1031A1", topic: "A", name: "1A1", list: [{ id: "001", name: "杨XX" }, { id: "002", name: "周XX" }, { id: "003", name: "孙XX" }, { id: "004", name: "王XX" }, { id: "005", name: "李XX" }] }, { id: "1031A2", topic: "A", name: "1A2", list: [{ id: "006", name: "杨XX" }, { id: "007", name: "周XX" }, { id: "008", name: "唐XX" }, { id: "009", name: "王XX" }, { id: "010", name: "李XX" }] }, { id: "1031B1", topic: "B", name: "1B1", list: [{ id: "011", name: "杨XX" }, { id: "012", name: "周XX" }, { id: "013", name: "孙XX" }, { id: "014", name: "王XX" }, { id: "015", name: "李XX" }] }, { id: "1031B2", topic: "B", name: "1B2", list: [{ id: "016", name: "杨XX" }, { id: "017", name: "周XX" }, { id: "018", name: "孙XX" }, { id: "019", name: "王XX" }, { id: "020", name: "李XX" }] }],
    roster: { id: 132, calling: 0, classid: 23, attend: { num: 0, list: [] }, late: { num: 0, list: [{ id: "021", name: "王XX" }, { id: "022", name: "钱XX" }, { id: "023", name: "林XX" }] } },
    groupingMethod: "random",
    status: "calling",
    
    curgroup: 0,

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
    this.data.groups.forEach(function (item) {
      item.toggle = false;
      item.add=false;
    });
    this.data.groups.forEach(function (item) {
      item.list.forEach(function(item){
        item.islate=false;
      });
    });
    this.data.roster.late.list.forEach(function (item) {
      item.grouped = false;
    });
    this.setData({
      groupingMethod: options.groupingMethod,
      status: options.status,
    });
    console.log("Teacher enters the GroupInfoUI page under a " + this.data.groupingMethod + " method with " + this.data.status + " status");
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