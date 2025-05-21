// pages/scenic/detail/detail.js
Page({
  data: {
    scenic: null
  },

  onLoad: function (options) {
    const id = options.id;
    this.loadScenicDetail(id);
  },

  loadScenicDetail: function(id) {
    const that = this;
    wx.showLoading({
      title: '加载中...',
    });
    
    wx.cloud.callFunction({
      name: 'getScenicDetail',
      data: { id },
      success: function(res) {
        wx.hideLoading();
        if (res.result && res.result.data) {
          that.setData({
            scenic: res.result.data
          });
        } else {
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          });
        }
      },
      fail: function(err) {
        wx.hideLoading();
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        });
        console.error('获取风景详情失败:', err);
      }
    });
  }
})
