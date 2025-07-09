// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { 
    dangerType,
    latitude,
    longitude,
    markerId,
    description = '' // 可选的描述信息
  } = event

  console.log('接收到的参数:', event);
  
  try {
    const result = await db.collection('dangerous_roads').add({
      data: {
        type: dangerType,
        location: {
          latitude,
          longitude
        },
        description,
        createdAt: db.serverDate(),
        createdBy: event.userInfo.openId,
        markerId: markerId,
        submitters: Array.isArray(event.submitters) ? event.submitters : [{ wxid: event.userInfo.openId, avatarUrl: '', time: Date.now() }]
      }
    })
    return {
      success: true,
      data: result
    }
  } catch (err) {
    return {
      success: false,
      error: err
    }
  }
}