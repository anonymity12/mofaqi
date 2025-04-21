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
    ]
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
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  }
})
