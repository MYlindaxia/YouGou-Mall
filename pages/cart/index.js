Page({
  data : {
    address : {},
    cart:[],
    allChecked : false,
    totalPrice : 0,
    totalNum : 0
  },
  onShow() {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];
    this.setData({address});
    this.setCart(cart);
  },
  handleChooseAddress() {
    wx.getSetting({
      success : (result) => {
        const scopeAddress = result.authSetting["scope.address"];
        if(scopeAddress === true || scopeAddress === undefined){
          wx.chooseAddress({
            success: (result1) => {
              wx.setStorageSync('address', result1);
            },
          })
        }else{
          wx.openSetting({
            success : (result2) => {

              wx.chooseAddress({
                success: (result3) => {
                  wx.setStorageSync('address', result1);
                },
              })
            }
          })
        }
      }
    })
  },
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
   this.setCart(cart);

  },

  setCart(cart) {
      
    wx.setStorageSync('cart', cart);

    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }else {
        allChecked = false;
      }
    })

    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync('cart', cart);
  },
  handleItemAllCheck() {
    let {cart,allChecked} = this.data;
    allChecked=!allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setData(cart);
  },
  handleItemNumEdit(e) {
    const {operation,id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id === id);

    if(cart[index].num === 1 && operation === -1){
      wx.showModal({
        title : "提示",
        content : "您是否要删除此商品",
        success : (res) => {
          if(res.confirm){
            cart.splice(index,1);
            this.setCart(cart);
          }else if(res.cancel){
            console.log("用户点击取消");
          }
        }
      })
    }
    cart[index].num += operation;
    this.setCart(cart);
  },
  handlePay() {
    const {address} = this.data;
    if(!address.userName){
      wx.showToast({
        title: '您还没有选择收获地址',
      })
      return;
    }
    if(totalNum===0){
      wx.showToast({
        title: '您还没有选购商品'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})