// utils/location.js - 位置权限处理工具

/**
 * 检查并申请位置权限
 * @param {boolean} needFuzzy 是否仅需要模糊位置，默认true
 * @param {Function} successCallback 成功回调
 * @param {Function} failCallback 失败回调
 */
function checkAndRequestLocation(needFuzzy = true, successCallback, failCallback) {
  // 获取当前设置
  wx.getSetting({
    success(res) {
      // 如果已经授权
      if (res.authSetting['scope.userLocation']) {
        handleLocationRequest(needFuzzy, successCallback, failCallback);
      } 
      // 如果未授权
      else {
        // 主动请求授权
        wx.authorize({
          scope: 'scope.userLocation',
          success() {
            // 用户已授权
            handleLocationRequest(needFuzzy, successCallback, failCallback);
          },
          fail(error) {
            // 用户拒绝授权，引导用户去设置页授权
            showLocationSettingsGuide(needFuzzy, successCallback, failCallback);
          }
        });
      }
    },
    fail(error) {
      console.error('获取设置失败', error);
      if (failCallback) failCallback(error);
    }
  });
}

/**
 * 处理位置请求
 */
function handleLocationRequest(needFuzzy, successCallback, failCallback) {
  if (needFuzzy) {
    // 使用模糊位置
    wx.getFuzzyLocation({
      type: 'wgs84',
      success(res) {
        if (successCallback) successCallback(res);
      },
      fail(error) {
        console.error('获取模糊位置失败', error);
        if (failCallback) failCallback(error);
      }
    });
  }
}

/**
 * 引导用户去设置页授权
 */
function showLocationSettingsGuide(needFuzzy, successCallback, failCallback) {
  wx.showModal({
    title: '需要位置权限',
    content: '您需要授权位置权限才能使用此功能，是否去设置页开启？',
    confirmText: '去设置',
    cancelText: '取消',
    success(res) {
      if (res.confirm) {
        // 打开设置页
        wx.openSetting({
          success(settingRes) {
            // 用户在设置页授权了
            if (settingRes.authSetting['scope.userLocation']) {
              handleLocationRequest(needFuzzy, successCallback, failCallback);
            } else {
              // 用户在设置页仍然拒绝授权
              wx.showToast({
                title: '未获得位置权限',
                icon: 'none',
                duration: 2000
              });
              if (failCallback) failCallback({errMsg: '用户拒绝授权位置信息'});
            }
          },
          fail(error) {
            console.error('打开设置页失败', error);
            if (failCallback) failCallback(error);
          }
        });
      } else {
        // 用户点击取消
        wx.showToast({
          title: '未获得位置权限',
          icon: 'none',
          duration: 2000
        });
        if (failCallback) failCallback({errMsg: '用户取消授权位置信息'});
      }
    }
  });
}

/**
 * 打开位置选择器
 */
function openLocationChooser(successCallback, failCallback) {
  wx.chooseLocation({
    success(res) {
      if (successCallback) successCallback(res);
    },
    fail(error) {
      console.error('选择位置失败', error);
      // 判断是否是权限问题
      if (error.errMsg.indexOf('auth deny') > -1) {
        // 显示权限向导
        showLocationSettingsGuide(false, () => {
          // 再次尝试打开选择器
          openLocationChooser(successCallback, failCallback);
        }, failCallback);
      } else {
        if (failCallback) failCallback(error);
      }
    }
  });
}

module.exports = {
  checkAndRequestLocation,
  openLocationChooser
};
