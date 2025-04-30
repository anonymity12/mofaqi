// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  
  try {
    // 从请求中获取风景点信息
    const { title, description, location, imageUrl } = event
    
    // 添加到数据库
    const result = await db.collection('scenic_spots').add({
      data: {
        title,
        description,
        location,
        imageUrl: imageUrl || '/images/default-scenic.jpg', // 使用上传的图片或默认图片
        _openid: wxContext.OPENID,  // 记录创建者的openid
        timestamp: new Date(),      // 记录创建时间
        likes: 0,                   // 初始点赞数
        views: 0                    // 初始查看数
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
