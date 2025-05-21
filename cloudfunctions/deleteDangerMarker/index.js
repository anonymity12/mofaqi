// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { markerId } = event
  
  try {
    const result = await db.collection('dangerous_roads')
      .where({
        markerId: Number(markerId)
      })
      .remove()
    
    return {
      success: true,
      data: result
    }
  } catch (err) {
    console.error('删除失败:', err)
    return {
      success: false,
      error: err
    }
  }
}
