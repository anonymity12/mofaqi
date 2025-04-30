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
      },
      {
        id: 4,
        title: '雨天骑行装备指南',
        content: '雨天骑行需要准备防水外套、防滑手套和防雾镜片。建议携带备用衣物，并在鞋子上喷防水剂，确保视野清晰和行车安全。',
        author: '装备达人',
        avatar: '/images/avatar1.png',
        time: '2025-04-08',
        likes: 45,
        comments: 8
      },
      {
        id: 5,
        title: '摩托车日常保养要点',
        content: '每次行驶前检查轮胎气压、机油液位和链条状态。定期清洗车身，保持链条润滑，检查制动系统。每周至少进行一次详细检查。',
        author: '维修专家',
        avatar: '/images/avatar2.png',
        time: '2025-04-05',
        likes: 62,
        comments: 15
      },
      {
        id: 6,
        title: '新手入门必读技巧',
        content: '起步时轻柔操作离合和油门，保持匀速行驶。转弯时注意重心转移，不要紧抓车把。培养良好的观察习惯，预判路况变化。',
        author: '教练老王',
        avatar: '/images/avatar3.png',
        time: '2025-04-02',
        likes: 89,
        comments: 20
      }
    ],
    activeTab: 0,
    tabs: ['最新发布', '最多点赞', '热门讨论']
  },

  onLoad: function (options) {
    // 页面加载时执行
  },
})
