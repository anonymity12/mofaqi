// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { id } = event
  
  try {
    const result = await db.collection('scenic_spots').doc(id).get()
    return {
      success: true,
      data: result.data
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: err
    }
  }
}
