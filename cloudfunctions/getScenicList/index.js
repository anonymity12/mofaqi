// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  
  try {
    // 获取风景点列表，按照时间倒序排列
    const result = await db.collection('scenic_spots')
      .orderBy('timestamp', 'desc')
      .get()
    
    return {
      success: true,
      data: result.data.map(item => {
        // 格式化日期
        const date = new Date(item.timestamp)
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        
        return {
          id: item._id,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          location: item.location,
          timestamp: formattedDate,
          likes: item.likes || 0,
          views: item.views || 0
        }
      })
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}
