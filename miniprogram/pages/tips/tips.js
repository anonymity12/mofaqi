// pages/tips/tips.js
Page({
  data: {
    tipsList: [
      {
        id: 1,
        title: '湿滑路面驾驶技巧',
        content: '在湿滑路面行驶时，应减速慢行，避免急刹车，保持较大的跟车距离。转弯时要提前减速，保持车身稳定。',
        author: '老骑手',
        avatar: '/images/avatar1.png',
        time: '2025-04-18',
        likes: 42,
        comments: 5
      },
      {
        id: 2,
        title: '如何安全过弯',
        content: '过弯前减速，弯中匀速，弯后适当加速。视线要看向弯道出口，身体保持放松，与车身形成一定的倾斜角。',
        author: '山路飞客',
        avatar: '/images/avatar2.png',
        time: '2025-04-15',
        likes: 38,
        comments: 7
      },
      {
        id: 3,
        title: '长途骑行的注意事项',
        content: '长途骑行前要做好路线规划，检查车况，携带必要的补给和工具。每隔1-2小时休息一次，避免疲劳驾驶。',
        author: '远行者',
        avatar: '/images/avatar3.png',
        time: '2025-04-10',
        likes: 56,
        comments: 12
      }
    ],
    activeTab: 0,
    tabs: ['最新发布', '最多点赞', '热门讨论']
  },

  onLoad: function (options) {
    // 页面加载时执行
  },

  // 切换标签页
  changeTab: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeTab: index
    });
    
    // 根据不同的标签加载不同的内容
    let sortedList = [...this.data.tipsList];
    if (index === 0) {
      // 按时间排序
      sortedList.sort((a, b) => new Date(b.time) - new Date(a.time));
    } else if (index === 1) {
      // 按点赞数排序
      sortedList.sort((a, b) => b.likes - a.likes);
    } else if (index === 2) {
      // 按评论数排序
      sortedList.sort((a, b) => b.comments - a.comments);
    }
    
    this.setData({
      tipsList: sortedList
    });
  },

  // 点赞文章
  likeTip: function(e) {
    const id = e.currentTarget.dataset.id;
    const tipsList = [...this.data.tipsList];
    const index = tipsList.findIndex(item => item.id === id);
    
    if (index !== -1) {
      tipsList[index].likes += 1;
      this.setData({
        tipsList: tipsList
      });
      
      wx.showToast({
        title: '点赞成功',
        icon: 'success',
        duration: 1000
      });
    }
  },

  // 查看文章详情
  viewDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 发表新技巧
  addNewTip: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  }
})
