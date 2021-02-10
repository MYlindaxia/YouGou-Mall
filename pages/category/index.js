import {request} from "../../request/index.js";

Page({
  data : {
    leftMenuList : [],
    rightContent : [],
    currentIndex : 0,
    scrollTop : 0
  },
  Cates : [],
  onLoad : function(options) {
    const Cates = wx.getStorageSync('cates');

    if(!Cates){
      this.getCates();
    }else{
      if(Date.now()-Cates.time>1000*10){
        this.getCates();
      }else{
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  async getCates() {
    // request({
    //   url : "categories",
    // }).then(res => {
    //   this.Cates = res.data.message;

    //   wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})

    //   let leftMenuList = this.Cates.map(v=>v.cat_name);
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    // 使用es7的async同步来发送请求
    const res = await request({url:"categories"});
    this.Cates = res.data.message;
    wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  handleItemTap(e) {
    const index = e.currentTarget.dataset.index;

    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex : index,
      rightContent,
      scrollTop : 0
    })

  }
})