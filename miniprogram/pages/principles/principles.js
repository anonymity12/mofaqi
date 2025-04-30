// pages/principles/principles.js
Page({
  data: {
    currentCategory: 'engine', // 默认选中发动机分类
    articles: [
      {
        id: 1,
        title: '四冲程发动机工作原理',
        description: '详解摩托车四冲程发动机的进气、压缩、做功、排气四个过程，以及各部件的协同工作机制。',
        coverImg: '/images/engine_four_stroke.jpg',
        category: 'engine',
        views: 1258,
        date: '2025-04-01'
      },
      {
        id: 2,
        title: '二冲程发动机与四冲程的区别',
        description: '探讨二冲程与四冲程发动机在结构、效率、噪音、排放等方面的区别，以及适用场景。',
        coverImg: '/images/engine_two_stroke.jpg',
        category: 'engine',
        views: 956,
        date: '2025-03-28'
      },
      {
        id: 3,
        title: '摩托车车架结构类型及特点',
        description: '介绍钢管车架、铝合金车架、钻石车架等不同类型车架的结构特点与优缺点。',
        coverImg: '/images/chassis_types.jpg',
        category: 'chassis',
        views: 845,
        date: '2025-03-25'
      },
      {
        id: 4,
        title: '现代摩托车制动系统详解',
        description: '解析碟刹与鼓刹的工作原理，以及ABS系统如何提高摩托车在紧急情况下的稳定性。',
        coverImg: '/images/brake_system.jpg',
        category: 'brake',
        views: 1032,
        date: '2025-03-20'
      },
      {
        id: 5,
        title: '摩托车点火系统原理',
        description: '详细介绍电子点火系统的工作原理，以及如何影响发动机的性能与油耗。',
        coverImg: '/images/electric_ignition.jpg',
        category: 'electric',
        views: 768,
        date: '2025-03-15'
      }
    ],
    filteredArticles: []
  },

  onLoad: function(options) {
    // 初始化时过滤显示默认分类的文章
    this.filterArticles(this.data.currentCategory);
  },

  // 切换分类
  switchCategory: function(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category
    });
    this.filterArticles(category);
  },

  // 根据分类过滤文章
  filterArticles: function(category) {
    const filteredArticles = this.data.articles.filter(article => article.category === category);
    this.setData({
      filteredArticles: filteredArticles
    });
  },

  // 查看文章详情
  viewArticle: function(e) {
    const id = e.currentTarget.dataset.id;
    // 这里可以跳转到文章详情页
    // wx.navigateTo({
    //   url: '/pages/principles/detail/detail?id=' + id
    // });
    
    // 暂时显示开发中提示
    wx.showToast({
      title: '文章内容开发中',
      icon: 'none'
    });
  }
})
