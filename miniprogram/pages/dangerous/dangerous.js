// pages/dangerous/dangerous.js
Page({
  data: {
    latitude: 39.908823,  // 默认地图中心纬度
    longitude: 116.397470, // 默认地图中心经度
    markers: [
      {
        id: 1,
        latitude: 39.908823,
        longitude: 116.407470,
        title: '山路陡峭',
        iconPath: '/images/danger_marker.png',
        width: 30,
        height: 30,
        callout: {
          content: '山路陡峭\n雨天路滑，注意减速',
          color: '#FF0000',
          fontSize: 12,
          borderRadius: 5,
          bgColor: '#FFFFFF',
          padding: 5,
          display: 'BYCLICK'
        }
      },
      {
        id: 2,
        latitude: 39.915590,
        longitude: 116.403694,
        title: '道路泥泞',
        iconPath: '/images/danger_marker.png',
        width: 30,
        height: 30,
        callout: {
          content: '道路泥泞\n雨后路况差，易滑倒',
          color: '#FF0000',
          fontSize: 12,
          borderRadius: 5,
          bgColor: '#FFFFFF',
          padding: 5,
          display: 'BYCLICK'
        }
      },
      {
        id: 3,
        latitude: 39.895590,
        longitude: 116.417694,
        title: '落石区域',
        iconPath: '/images/danger_marker.png',
        width: 30,
        height: 30,
        callout: {
          content: '落石区域\n路过时请注意观察山体',
          color: '#FF0000',
          fontSize: 12,
          borderRadius: 5,
          bgColor: '#FFFFFF',
          padding: 5,
          display: 'BYCLICK'
        }
      }
    ],
    dangerTypes: ['路面湿滑', '路面坑洼', '落石', '急转弯', '视线不佳', '其他']
  },

  onLoad: function (options) {
    // 获取用户当前位置
    this.getUserLocation();
  },

  getUserLocation: function() {
    const that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
      fail: function() {
        wx.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
      }
    });
  },

  // 点击标记点
  markerTap: function(e) {
    const markerId = e.markerId;
    console.log('点击了标记:', markerId);
  },

  // 添加危险路段
  addDangerousRoad: function() {
    wx.showActionSheet({
      itemList: this.data.dangerTypes,
      success: (res) => {
        if (!res.cancel) {
          const dangerType = this.data.dangerTypes[res.tapIndex];
          wx.showToast({
            title: '您选择了：' + dangerType + '\n功能开发中',
            icon: 'none'
          });
          // 这里可以实现添加危险路段的逻辑
        }
      }
    });
  },

  // 移动到当前位置
  moveToLocation: function() {
    this.getUserLocation();
    this.mapCtx.moveToLocation();
  },

  onReady: function() {
    // 创建地图上下文
    this.mapCtx = wx.createMapContext('dangerMap');
  }
})
