// pages/dangerous/dangerous.js
// 引入位置权限工具
const locationUtils = require('../../utils/location.js');

const INIT_TIME= 250519231150; // 初始时间戳，用于计算markerId
// 添加日期格式化函数
const formatDate = (date) => {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return year + month + day + hours + minutes + seconds;
};

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
    dangerTypes: ['路面湿滑', '电子眼', '炮弹坑', '容易雾天', 'NPC', '其他'], // 危险类型列表
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
            id: item.markerId,
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
          console.log('加载危险路段成功:', markers);
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
    // 使用位置权限工具替代直接调用wx.getFuzzyLocation
    locationUtils.checkAndRequestLocation(true, function(res) {
      that.setData({
        latitude: res.latitude,
        longitude: res.longitude
      });
    }, function(error) {
      wx.showToast({
        title: '获取位置失败',
        icon: 'none'
      });
    });
  },

  // 点击地图事件
  mapTap: function(e) {
    const { latitude, longitude } = e.detail;
    // 设置临时标记
    const tempMarker = {
      id: 100,  // 使用-1作为临时标记的ID
      markerId: 100,  // 使用-1作为临时标记的ID
      latitude,
      longitude,
      iconPath: '/images/danger_marker.png',
      width: 40,
      height: 40,
      callout: {
        content: '点击"+"按钮\n在此处标记不良路段',
        color: '#FF0000',
        fontSize: 12,
        borderRadius: 5,
        bgColor: '#FFFFFF',
        padding: 5,
        display: 'ALWAYS'
      }
    };
    // 清除之前的临时标记
    if (this.data.tempMarker) {
      this.setData({
        markers: this.data.markers.filter(m => m.markerId !== 100)
      });
    }
    // 设置新的临时标记
    this.setData({
      tempMarker,
      markers: [...this.data.markers.filter(m => m.markerId !== 100), tempMarker]
    });
  },

  // 点击标记点
  markerTap: function(e) {
    const markerId = e.markerId;
    console.log('点击了标记:', markerId);
  },

  // 添加危险路段
  addDangerousRoad: function() {
    console.log('开始添加危险路段');
    const that = this;
    const { tempMarker } = this.data;
    
    // 如果没有选择位置，使用当前位置
    if (!tempMarker) {
      // 使用位置权限工具替代直接调用wx.getFuzzyLocation
      locationUtils.checkAndRequestLocation(true, function(locationRes) {
        that.showDangerTypeSelector(locationRes.latitude, locationRes.longitude);
      }, function(error) {
        wx.showToast({
          title: '获取位置失败',
          icon: 'none'
        });
      });
      return;
    }

    // 使用已选择的位置
    this.showDangerTypeSelector(tempMarker.latitude, tempMarker.longitude);
  },

  // 显示危险类型选择器
  showDangerTypeSelector: function(latitude, longitude) {
    console.log('开始选择危险类型:', latitude, longitude);
    const that = this;
    wx.showActionSheet({
      itemList: this.data.dangerTypes,
      success: (res) => {
        if (!res.cancel) {
          const dangerType = this.data.dangerTypes[res.tapIndex];
          wx.showLoading({
            title: '正在提交...',
          });
          const markerIdTmp = Number(formatDate(new Date())); // 使用formatDate函数
          console.log('markerIdTmp:', markerIdTmp);
          console.log('markerIdTmp subtract:', markerIdTmp - INIT_TIME);
          // 调用云函数
          wx.cloud.callFunction({
            name: 'addDangerousRoad',
            data: {
              markerId: markerIdTmp - INIT_TIME,
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
                  .filter(m => m.markerId !== 100)
                  .concat(newMarker);
                that.setData({ 
                  markers,
                  tempMarker: null
                });
              } else {
                console.error('添加危险路段失败:', res);
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
  clearTempMarker: function() { // 这个函数在wxml 被调用
    if (this.data.tempMarker) {
      this.setData({
        tempMarker: null,
        markers: this.data.markers.filter(m => m.markerId !== 100)
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
