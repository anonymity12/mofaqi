// pages/scenic/scenic.js
Page({
  data: {
    scenicList: [
      {
        id: 1,
        title: '山顶盘山公路',
        description: '绵延的山路，风景秀丽，适合周末骑行',
        imageUrl: '/images/scenic1.jpg',
        location: '北京怀柔',
        timestamp: '2025-04-15'
      },
      {
        id: 2,
        title: '海滨公路',
        description: '沿海公路，清风拂面，视野开阔',
        imageUrl: '/images/scenic2.jpg',
        location: '青岛',
        timestamp: '2025-04-10'
      },
      {
        id: 3,
        title: '森林小路',
        description: '穿越森林的小径，树荫遮挡阳光，凉爽宜人',
        imageUrl: '/images/scenic3.jpg',
        location: '浙江临安',
        timestamp: '2025-04-05'
      }
    ],
    newScenic: {
      title: '',
      description: '',
      location: ''
    },
    showAddForm: false
  },

  onLoad: function (options) {
    // 页面加载时执行
  },

  onShow: function () {
    // 页面显示时执行
  },

  // 点击卡片查看详情
  viewDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    // 可以跳转到详情页
    // wx.navigateTo({
    //   url: '/pages/scenic/detail/detail?id=' + id
    // })
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },
  
  // 添加新的风景点
  addNewScenic: function() {
    this.setData({
      showAddForm: true
    });
  },
  
  // 取消添加
  cancelAdd: function() {
    this.setData({
      showAddForm: false,
      newScenic: {
        title: '',
        description: '',
        location: ''
      }
    });
  },
  
  // 输入框内容变化
  onInputChange: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    const newData = {};
    newData[`newScenic.${field}`] = value;
    this.setData(newData);
  },
  
  // 提交表单
  submitForm: function() {
    const that = this;
    const { title, description, location } = this.data.newScenic;
    
    if (!title || !description || !location) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '保存中...',
    });
    
    // 调用云函数添加风景点信息
    wx.cloud.callFunction({
      name: 'addScenic',
      data: {
        title,
        description,
        location
      }
    }).then(res => {
      wx.hideLoading();
      const result = res.result;
      
      if (result.success) {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        });
        
        // 重置表单并刷新列表
        that.setData({
          showAddForm: false,
          newScenic: {
            title: '',
            description: '',
            location: ''
          }
        });
        
        // 刷新风景点列表
        that.loadScenicList();
      } else {
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        });
        console.error('[添加风景点] 失败：', result.error);
      }
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '系统错误',
        icon: 'none'
      });
      console.error('[调用云函数] 失败：', err);
    });
  },
  
  // 加载风景点列表
  loadScenicList: function() {
    const that = this;
    wx.showLoading({
      title: '加载中...',
    });
    
    // 从数据库获取风景点列表
    wx.cloud.callFunction({
      name: 'getScenicList'
    }).then(res => {
      wx.hideLoading();
      if (res.result && res.result.data) {
        that.setData({
          scenicList: res.result.data
        });
      }
    }).catch(err => {
      wx.hideLoading();
      console.error('[获取风景点列表] 失败：', err);
    });
  },
  
  onLoad: function (options) {
    // 初始化云环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,
      });
      
      // 加载风景点列表
      // 注释掉以保留静态数据，等后续功能完善后再启用
      // this.loadScenicList();
    }
  }
})
