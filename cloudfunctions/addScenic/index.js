// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: process.env.TCB_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  
  try {
    // 从请求中获取风景点信息
    const { title, description, location } = event
    
    // 添加到数据库
    const result = await db.collection('scenic_spots').add({
      data: {
        title,
        description,
        location,
        _openid: wxContext.OPENID,  // 记录创建者的openid
        timestamp: new Date(),      // 记录创建时间
        likes: 0,                   // 初始点赞数
        views: 0,                   // 初始查看数
        imageUrl: '/images/default-scenic.jpg'  // 使用默认图片
      }
    })
    
    return {
      success: true,
      _id: result._id
    }
  } catch (error) {
    return {
      success: false,
      error: error
    }
  }
}
