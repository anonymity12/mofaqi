// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { markerId, begin_hour, end_hour } = event
  if (typeof markerId === 'undefined') {
    return { success: false, message: 'markerId required' }
  }
  try {
    const res = await db.collection('dangerousRoads').where({ markerId }).update({
      data: {
        begin_hour,
        end_hour
      }
    })
    if (res.stats && res.stats.updated > 0) {
      return { success: true }
    } else {
      return { success: false, message: 'No record updated' }
    }
  } catch (e) {
    return { success: false, message: e.message }
  }
}
