// pages/dangerous/detail/detail.js
Page({
  data: {
    dangerInfo: null,
    showNpcTimeDialog: false,
    npcBeginHour: 0,
    npcEndHour: 23
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
  },

  editNpcTime: function() {
    // 打开弹窗并初始化输入值
    const { dangerInfo } = this.data;
    this.setData({
      showNpcTimeDialog: true,
      npcBeginHour: dangerInfo.begin_hour !== undefined ? dangerInfo.begin_hour : 0,
      npcEndHour: dangerInfo.end_hour !== undefined ? dangerInfo.end_hour : 23
    });
  },

  onBeginHourInput: function(e) {
    this.setData({ npcBeginHour: Number(e.detail.value) });
  },

  onEndHourInput: function(e) {
    this.setData({ npcEndHour: Number(e.detail.value) });
  },

  cancelNpcTime: function() {
    this.setData({ showNpcTimeDialog: false });
  },

  confirmNpcTime: function() {
    const { npcBeginHour, npcEndHour, dangerInfo } = this.data;
    if (npcBeginHour < 0 || npcBeginHour > 23 || npcEndHour < 0 || npcEndHour > 23 || npcBeginHour > npcEndHour) {
      wx.showToast({ title: '时间输入有误', icon: 'none' });
      return;
    }
    wx.showLoading({ title: '提交中...' });
    wx.cloud.callFunction({
      name: 'updateDangerNpcTime',
      data: {
        markerId: dangerInfo.markerId,
        begin_hour: npcBeginHour,
        end_hour: npcEndHour
      },
      success: res => {
        wx.hideLoading();
        if (res.result && res.result.success) {
          wx.showToast({ title: '修改成功', icon: 'success' });
          // 更新本地数据
          this.setData({
            'dangerInfo.begin_hour': npcBeginHour,
            'dangerInfo.end_hour': npcEndHour,
            showNpcTimeDialog: false
          });
        } else {
          wx.showToast({ title: '修改失败1: ' + res});
          console.error('修改NPC时间失败1:', res);
        }
      },
      fail: err => {
        wx.hideLoading();
        wx.showToast({ title: '修改失败2: ' + (err && err.errMsg ? err.errMsg : '未知错误'), icon: 'none' });
        console.error('修改NPC时间失败2:', err);
      }
    });
  },
})
