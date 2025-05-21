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

  deleteDanger: function() {
    const that = this;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个危险标记吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
          });
          
          wx.cloud.callFunction({
            name: 'deleteDangerMarker',
            data: {
              markerId: that.data.dangerInfo.markerId
            },
            success: res => {
              wx.hideLoading();
              if (res.result && res.result.success) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                });
                // 返回上一页并刷新列表
                const pages = getCurrentPages();
                const prevPage = pages[pages.length - 2];
                if (prevPage && prevPage.loadDangerousMarkers) {
                  prevPage.loadDangerousMarkers();
                }
                wx.navigateBack();
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                });
              }
            },
            fail: err => {
              wx.hideLoading();
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              });
              console.error('删除失败:', err);
            }
          });
        }
      }
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
