import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  GoodsInfo : {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({url:"goods/detail",data:{goods_id}});
    this.GoodsInfo = goodsObj;
    this.setData({
      goodsObj
    })
  },
  handlePrevewImage(e) {
    const urls = this.GoodsInfo.data.message.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current : current,
      urls: urls,
    })
  }
})