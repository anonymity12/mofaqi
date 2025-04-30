// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 从数据库获取所有危险路段标记
    const { data } = await db.collection('dangerous_roads')
      .orderBy('createdAt', 'desc')
      .get()
    
    return {
      success: true,
      data: data
    }
  } catch (err) {
    return {
      success: false,
      error: err
    }
  }
}