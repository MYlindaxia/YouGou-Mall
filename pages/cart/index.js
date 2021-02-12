Page({
  data : {
    address : {},
    cart:[],
    allChecked : false
  },
  onShow() {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];
    const allChecked = cart.length?cart.every(v => v.checked) : false;
    this.setData({
      address,
      cart,
      allChecked
    })
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
})