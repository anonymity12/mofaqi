// pages/dangerous/detail/detail.js
Page({
  data: {
    dangerInfo: null
  },

  onLoad: function (options) {
    const markerId = options.id;
    this.loadDangerDetail(markerId);
  },

  // 开始导航
  startNavigation: function() {
    const { location } = this.data.dangerInfo;
    wx.openLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      name: this.data.dangerInfo.type,
      address: '危险路段'
    });
  },

  loadDangerDetail: function(markerId) {
    wx.showLoading({
      title: '加载中...',
    });
    
    wx.cloud.callFunction({
      name: 'getDangerDetail',
      data: { markerId },
      success: res => {
        wx.hideLoading();
        if (res.result && res.result.success) {
          this.setData({
            dangerInfo: res.result.data
          });
        } else {
            console.error('加载危险路段详情失败:', res);
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        });
        console.error('获取危险路段详情失败:', err);
      }
    });
  }
})
