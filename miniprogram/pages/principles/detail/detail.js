// pages/principles/detail/detail.js
Page({
  data: {
    article: null,
    loading: true,
    relatedArticles: []
  },

  onLoad: function(options) {
    const id = parseInt(options.id);
    // 模拟从服务器获取文章数据
    this.loadArticleData(id);
  },

  // 模拟加载文章数据
  loadArticleData: function(id) {
    // 文章数据（实际项目中应从服务器获取）
    const articlesData = [
      {
        id: 1,
        title: '四冲程发动机工作原理',
        description: '详解摩托车四冲程发动机的进气、压缩、做功、排气四个过程，以及各部件的协同工作机制。',
        coverImg: '/images/electric_ignition.jpg',
        category: 'engine',
        views: 1258,
        date: '2025-04-01',
        content: `四冲程发动机工作原理

基本概念

四冲程发动机是最常见的摩托车发动机类型，它通过四个行程（冲程）完成一个完整的工作循环：进气、压缩、做功和排气。

工作过程详解

1. 进气冲程

• 活塞从上止点向下止点运动
• 进气门打开，排气门关闭
• 气缸内产生负压，混合气被吸入气缸

2. 压缩冲程

• 活塞从下止点向上止点运动
• 进气门关闭，排气门关闭
• 混合气被压缩至原体积的1/8-1/12

3. 做功冲程

• 活塞接近上止点时，火花塞点火
• 混合气燃烧膨胀，推动活塞向下运动
• 这是唯一产生动力的冲程

4. 排气冲程

• 活塞从下止点向上止点运动
• 进气门关闭，排气门打开
• 废气被排出气缸

四冲程发动机的优势

1. 燃油经济性较好
2. 排放较低
3. 噪音较小
4. 寿命较长

关键部件

• 活塞组：将气体压力转化为机械运动
• 连杆：连接活塞和曲轴
• 曲轴：将往复运动转化为旋转运动
• 凸轮轴：控制气门开闭时机
• 气门系统：控制进排气
• 点火系统：在适当时机点燃混合气

四冲程发动机虽然结构较为复杂，但因其效率高、排放低的特点，已成为现代摩托车的主流动力来源。`,
        author: '机械专家',
        tags: ['发动机', '四冲程', '机械原理']
      },
      {
        id: 2,
        title: '二冲程发动机与四冲程的区别',
        description: '探讨二冲程与四冲程发动机在结构、效率、噪音、排放等方面的区别，以及适用场景。',
        coverImg: '/images/electric_ignition.jpg',
        category: 'engine',
        views: 956,
        date: '2025-03-28',
        content: `二冲程与四冲程发动机的区别

工作原理对比

二冲程发动机仅需曲轴旋转一周（活塞上下运动一次）即可完成一个工作循环，而四冲程发动机需要曲轴旋转两周（活塞上下运动两次）才能完成一个工作循环。

结构差异

二冲程发动机
• 结构简单，零部件少
• 没有复杂的气门机构
• 利用活塞和气缸壁上的进排气口控制气体流动
• 曲轴箱参与工作过程

四冲程发动机
• 结构相对复杂
• 有专门的气门系统
• 需要凸轮轴控制气门开闭
• 曲轴箱与燃烧室分离

性能对比

| 特性 | 二冲程 | 四冲程 |
|------|-------|-------|
| 功率重量比 | 较高 | 较低 |
| 燃油经济性 | 较差 | 较好 |
| 排放 | 较高 | 较低 |
| 噪音 | 较大 | 较小 |
| 维护 | 简单 | 复杂 |
| 寿命 | 较短 | 较长 |

应用场景

二冲程发动机适用于：
• 轻量化要求高的场合
• 对简单性要求高的应用
• 小排量工具类摩托车
• 某些越野摩托车

四冲程发动机适用于：
• 对燃油经济性有要求的场合
• 需要长寿命的应用
• 大多数公路摩托车
• 对排放有严格要求的地区

发展趋势

随着环保要求的提高，二冲程发动机在摩托车领域的应用逐渐减少，但在特定领域如小型工具、赛车等仍有其独特优势。四冲程发动机由于其环保性能好，已成为现代摩托车的主流动力源。`,
        author: '动力系统专家',
        tags: ['发动机', '二冲程', '四冲程', '比较']
      },
      {
        id: 3,
        title: '摩托车车架结构类型及特点',
        description: '介绍钢管车架、铝合金车架、钻石车架等不同类型车架的结构特点与优缺点。',
        coverImg: '/images/chassis_types.jpg',
        category: 'chassis',
        views: 845,
        date: '2025-03-25',
        content: `摩托车车架结构类型及特点

摩托车车架是整车的"骨架"，不仅支撑发动机和其他部件，还直接影响车辆的操控性和舒适性。本文介绍几种常见的车架类型及其特点。

常见车架类型

1. 管状车架（Tubular Frame）

单摇篮车架
• 结构：从车头至后轴形成单一环路
• 特点：结构简单，成本低
• 应用：常见于入门级摩托车和小排量车型

双摇篮车架
• 结构：从车头分为两根管道，分别从发动机两侧通过
• 特点：刚性好，稳定性高
• 应用：经典复古车型，如哈雷戴维森系列

2. 钻石车架（Diamond Frame）

• 结构：发动机作为承重结构的一部分
• 特点：轻量化，刚性好，散热佳
• 应用：多见于日系运动型摩托车

3. 三角车架（Trellis Frame）

• 结构：由多个短直钢管焊接成三角形网格结构
• 特点：极高的强度重量比，突出的操控性
• 应用：高性能摩托车，如杜卡迪系列

4. 铝合金车架（Aluminum Frame）

铸造铝合金车架
• 特点：可实现复杂形状，强度高
• 缺点：生产成本高

挤压铝合金车架
• 特点：重量轻，可调节刚性
• 应用：高端运动摩托车

5. 单边臂车架（Monocoque Frame）

• 结构：整体式结构，外壳即为承重部分
• 特点：极致轻量化，空气动力学优势
• 应用：顶级赛车和部分高端运动车型

材料对比

钢管优点：强度高，易加工，成本低
钢管缺点：重量大，易锈蚀

铝合金优点：重量轻，抗腐蚀
铝合金缺点：成本高，柔韧性较差

钛合金优点：强度极高，重量轻
钛合金缺点：极其昂贵，加工难度大

碳纤维优点：最轻，可定制刚性
碳纤维缺点：价格昂贵，受损难修复

选择建议

• 日常通勤：钢管车架经济实用
• 长途旅行：双摇篮或钻石车架稳定性好
• 运动骑行：三角车架或铝合金车架反应灵敏
• 赛道使用：轻量化单边臂或铝合金车架性能极限更高

车架选择应根据骑行风格、用途和预算综合考虑，没有绝对的最佳选择，只有最适合的选择。`,
        author: '车架设计师',
        tags: ['车架', '结构', '材料', '设计']
      },
      {
        id: 4,
        title: '现代摩托车制动系统详解',
        description: '解析碟刹与鼓刹的工作原理，以及ABS系统如何提高摩托车在紧急情况下的稳定性。',
        coverImg: '/images/electric_ignition.jpg',
        category: 'brake',
        views: 1032,
        date: '2025-03-20',
        content: `现代摩托车制动系统详解

摩托车制动系统概述

制动系统是摩托车最关键的安全系统之一，负责将车辆的动能转化为热能以降低速度或完全停止。现代摩托车制动系统主要分为鼓式制动系统和盘式制动系统，并且越来越多地配备了ABS等电子辅助系统。

鼓式刹车（鼓刹）

工作原理

鼓式制动器由制动鼓和制动蹄组成。当骑手操作制动踏板或手柄时：
1. 制动拉索或液压系统驱动制动蹄展开
2. 制动蹄的摩擦材料与制动鼓内壁接触
3. 产生的摩擦力减缓车轮转动

优缺点

优点：
• 成本低
• 密封性好，不易受环境影响
• 维护简单

缺点：
• 散热能力差，容易热衰减
• 制动力较弱
• 重量较大
• 摩擦力不稳定

盘式刹车（碟刹）

工作原理

盘式制动系统由制动盘、制动卡钳和制动片组成：
1. 制动盘固定在车轮上随之旋转
2. 液压系统驱动制动卡钳
3. 卡钳内的活塞推动制动片
4. 制动片与制动盘摩擦产生制动力

类型

• 单活塞浮动卡钳：常见于入门级摩托车
• 对向多活塞卡钳：用于高性能摩托车
• 径向安装卡钳：提供更精准的制动感受

优缺点

优点：
• 散热性能好
• 制动力强
• 线性度好，易于掌控
• 重量轻

缺点：
• 成本较高
• 暴露在外部环境中
• 维护要求较高

ABS制动系统

工作原理

防抱死制动系统(ABS)通过传感器监测车轮转速：
1. 当检测到车轮即将锁死时
2. 电子控制单元瞬间降低制动压力
3. 防止车轮完全锁死
4. 使骑手保持转向控制能力
5. 缩短制动距离

技术发展

• 基础ABS：仅防止车轮锁死
• 弯道ABS：考虑倾角的高级系统
• IMU辅助ABS：结合惯性测量单元的最新系统

联动制动系统（CBS）

将前后制动系统联动，使单一制动控制能同时作用于前后轮，提高制动平衡性和安全性。

制动系统维护

• 定期检查制动液位和质量
• 检查制动片/制动蹄磨损情况
• 确保制动盘无变形和开裂
• 适时排气以去除系统中的空气

结论

现代摩托车制动技术持续发展，从最基础的鼓刹到高科技的电子辅助系统，都为骑行安全提供了强有力的保障。选择和维护适合的制动系统对于安全骑行至关重要。`,
        author: '安全系统工程师',
        tags: ['制动系统', '碟刹', '鼓刹', 'ABS']
      },
      {
        id: 5,
        title: '摩托车点火系统原理',
        description: '详细介绍电子点火系统的工作原理，以及如何影响发动机的性能与油耗。',
        coverImg: '/images/electric_ignition.jpg',
        category: 'electric',
        views: 768,
        date: '2025-03-15',
        content: `摩托车点火系统原理

点火系统的作用

点火系统是摩托车发动机的核心系统之一，它的主要功能是在适当的时机产生高压电火花，点燃气缸内的混合气体，从而启动和维持发动机的工作。

点火系统的演变

1. 磁电机点火系统

早期摩托车使用的最基础点火系统，主要组成部分：
• 永久磁铁（飞轮上）
• 初级线圈和次级线圈
• 机械断电器（白金）
• 电容器
• 火花塞

工作原理：
1. 飞轮旋转产生交变磁场
2. 初级线圈中感应出电流
3. 白金断开时，初级电路突然断开
4. 次级线圈中感应出高压电
5. 高压电在火花塞电极间产生火花

缺点：
• 机械部件易磨损
• 点火时机调整困难
• 高速时点火精度下降

2. CDI点火系统（电容放电点火）

目前摩托车最常见的点火系统类型：

主要组件：
• 永久磁铁定子
• 触发器（拾波线圈）
• CDI单元（含电容、晶闸管等）
• 高压线圈
• 火花塞

工作原理：
1. 磁电机产生交流电
2. 电流被整流后为电容充电
3. 触发器在特定时机发出信号
4. 晶闸管导通，电容瞬间放电
5. 通过高压线圈升压
6. 产生强大火花点燃混合气

优点：
• 没有机械磨损部件
• 火花能量大
• 点火时机精确
• 可靠性高

3. TCI点火系统（晶体管控制点火）

高端摩托车常用的点火系统：

主要组件：
• 曲轴位置传感器
• ECU（电子控制单元）
• 点火线圈（内含高压线圈）
• 火花塞

工作原理：
1. 传感器检测曲轴位置
2. ECU根据发动机参数计算最佳点火时机
3. ECU控制晶体管开关通断
4. 断开时在高压线圈中产生高压
5. 火花塞产生火花

优点：
• 精确控制点火提前角
• 可根据转速、负荷等参数优化点火
• 与燃油喷射系统配合良好
• 能量更稳定

点火提前角

点火提前角是指在活塞到达上止点之前提前点火的角度：
• 转速越高，需要越大的提前角
• 负荷越大，需要较小的提前角

现代电子点火系统可根据多种参数动态调整点火提前角：
• 发动机转速
• 油门开度
• 进气温度
• 冷却液温度
• 大气压力

点火系统对性能的影响

动力输出
• 准确的点火时机使燃烧更加充分
• 动态调整提前角可在不同工况下优化动力

燃油经济性
• 合适的点火时机减少燃油浪费
• 精确控制可以降低油耗5-10%

废气排放
• 优化点火时机减少未燃烧的碳氢化合物
• 降低氮氧化物排放

常见故障及诊断

1. 无火花
   • 检查CDI单元
   • 检查高压线圈
   • 检查触发器
   
2. 火花微弱
   • 检查电源系统
   • 检查线圈绝缘
   
3. 点火时机不稳
   • 检查传感器
   • 检查ECU
   • 检查线束连接

结论

摩托车点火系统从简单的机械系统演变为复杂的电子控制系统，大大提升了发动机的性能、可靠性和经济性。了解点火系统的工作原理有助于正确维护和故障诊断，确保摩托车处于最佳工作状态。`,
        author: '电气工程师',
        tags: ['电气系统', '点火', 'CDI', '性能优化']
      }
    ];

    // 查找目标文章
    const article = articlesData.find(item => item.id === id);
    
    if (article) {
      // 查找相关文章（同类别但不是当前文章）
      const related = articlesData
        .filter(item => item.category === article.category && item.id !== id)
        .slice(0, 2); // 最多显示2篇相关文章
      
      this.setData({
        article: article,
        loading: false,
        relatedArticles: related
      });
      
      // 更新浏览量（实际项目中应该通过API请求更新）
      article.views += 1;
    } else {
      wx.showToast({
        title: '文章不存在',
        icon: 'error'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  // 预览图片
  previewImage: function(e) {
    const current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    });
  },

  // 查看相关文章
  viewRelatedArticle: function(e) {
    const id = e.currentTarget.dataset.id;
    // 刷新当前页面而不是打开新页面
    this.loadArticleData(id);
    // 更新页面历史，方便返回
    wx.redirectTo({
      url: `/pages/principles/detail/detail?id=${id}`
    });
  },

  // 返回列表页
  goBack: function() {
    wx.navigateBack();
  },

  // 分享文章
  onShareAppMessage: function() {
    const article = this.data.article;
    return {
      title: article ? article.title : '摩托车知识科普',
      path: `/pages/principles/detail/detail?id=${article ? article.id : 1}`
    };
  }
})
