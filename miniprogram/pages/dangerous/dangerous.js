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
    dangerTypes: ['路面湿滑', '路面坑洼', '落石', '急转弯', '视线不佳', '其他'],
    tempMarker: null  // 用于存储临时标记点
  },

  onLoad: function (options) {
    // 获取用户当前位置
    this.getUserLocation();
    // 从云数据库加载危险路段标记
    this.loadDangerousMarkers();
  },

  loadDangerousMarkers: function() {
    const that = this;
    wx.showLoading({
      title: '加载中...',
    });
    
    wx.cloud.callFunction({
      name: 'getDangerousList',
      success: function(res) {
        wx.hideLoading();
        if (res.result && res.result.success) {
          const markers = res.result.data.map(item => ({
            id: item._id,
            latitude: item.location.latitude,
            longitude: item.location.longitude,
            title: item.type,
            iconPath: '/images/danger_marker.png',
            width: 30,
            height: 30,
            callout: {
              content: item.type,
              color: '#FF0000',
              fontSize: 12,
              borderRadius: 5,
              bgColor: '#FFFFFF',
              padding: 5,
              display: 'BYCLICK'
            }
          }));
          that.setData({ markers });
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
        console.error('加载危险路段失败:', err);
      }
    });
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

  // 点击地图事件
  mapTap: function(e) {
    const { latitude, longitude } = e.detail;
    // 设置临时标记
    const tempMarker = {
      id: -1,  // 使用-1作为临时标记的ID
      latitude,
      longitude,
      iconPath: '/images/danger_marker.png',
      width: 30,
      height: 30,
      callout: {
        content: '点击"添加"按钮\n在此处标记危险路段',
        color: '#FF0000',
        fontSize: 12,
        borderRadius: 5,
        bgColor: '#FFFFFF',
        padding: 5,
        display: 'ALWAYS'
      }
    };

    this.setData({
      tempMarker,
      markers: [...this.data.markers.filter(m => m.id !== -1), tempMarker]
    });
  },

  // 点击标记点
  markerTap: function(e) {
    const markerId = e.markerId;
    console.log('点击了标记:', markerId);
  },

  // 添加危险路段
  addDangerousRoad: function() {
    const that = this;
    const { tempMarker } = this.data;
    
    // 如果没有选择位置，使用当前位置
    if (!tempMarker) {
      wx.getLocation({
        type: 'gcj02',
        success: function(locationRes) {
          that.showDangerTypeSelector(locationRes.latitude, locationRes.longitude);
        },
        fail: function() {
          wx.showToast({
            title: '获取位置失败',
            icon: 'none'
          });
        }
      });
      return;
    }

    // 使用已选择的位置
    this.showDangerTypeSelector(tempMarker.latitude, tempMarker.longitude);
  },

  // 显示危险类型选择器
  showDangerTypeSelector: function(latitude, longitude) {
    const that = this;
    wx.showActionSheet({
      itemList: this.data.dangerTypes,
      success: (res) => {
        if (!res.cancel) {
          const dangerType = this.data.dangerTypes[res.tapIndex];
          wx.showLoading({
            title: '正在提交...',
          });
          
          // 调用云函数
          wx.cloud.callFunction({
            name: 'addDangerousRoad',
            data: {
              dangerType: dangerType,
              latitude: latitude,
              longitude: longitude
            },
            success: function(res) {
              wx.hideLoading();
              if (res.result && res.result.success) {
                wx.showToast({
                  title: '添加成功',
                  icon: 'success'
                });
                // 添加新标记到地图
                const newMarker = {
                  id: new Date().getTime(),
                  latitude: latitude,
                  longitude: longitude,
                  title: dangerType,
                  iconPath: '/images/danger_marker.png',
                  width: 30,
                  height: 30,
                  callout: {
                    content: dangerType,
                    color: '#FF0000',
                    fontSize: 12,
                    borderRadius: 5,
                    bgColor: '#FFFFFF',
                    padding: 5,
                    display: 'BYCLICK'
                  }
                };
                // 移除临时标记，添加新标记
                const markers = that.data.markers
                  .filter(m => m.id !== -1)
                  .concat(newMarker);
                that.setData({ 
                  markers,
                  tempMarker: null
                });
              } else {
                wx.showToast({
                  title: '添加失败',
                  icon: 'none'
                });
              }
            },
            fail: function(err) {
              wx.hideLoading();
              wx.showToast({
                title: '提交失败',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  },

  // 清除临时标记
  clearTempMarker: function() {
    if (this.data.tempMarker) {
      this.setData({
        tempMarker: null,
        markers: this.data.markers.filter(m => m.id !== -1)
      });
    }
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
