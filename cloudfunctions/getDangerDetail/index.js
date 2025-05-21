// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const { markerId } = event
  
  try {
    // 确保 markerId 是数值类型
    const markerId_num = Number(markerId);
    console.log('查询 markerId:', markerId_num, typeof markerId_num);
    
    // 根据markerId查询危险路段信息
    const result = await db.collection('dangerous_roads')
      .where({
        markerId: markerId_num
      })
      .get();
    
    console.log('查询结果:', result);
      
    if (result.data.length > 0) {
      return {
        success: true,
        data: result.data[0]
      }
    } else {
      return {
        success: false,
        error: 'Not found for' + markerId
      }
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: err
    }
  }
}
