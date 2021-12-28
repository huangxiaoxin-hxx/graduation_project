import { setStorage } from '@/utils'
import { getStorage } from '@/utils/index.js'
import store from "@/store";

const userRequest = async (action, params) => {
  const token = getStorage('token')
  const {result} = await uniCloud.callFunction({
    name: 'user-center',
	  data: {
      action,
      params,
      token
    },
  })
  console.log(result)
	if(result.code === 0) {
    if(action === 'login') { // 登录后保存token和userinfo
      setStorage('token', result.token)
      store.commit('user/setUserInfo', result.userInfo)
    }
    if(action === 'getUserInfo') {
      store.commit('user/setUserInfo', result.userInfo)
    }
    return result
  } else if(result.code === 30203) {
    uni.reLaunch({
      url: '/pages/login/index'
    })
  } else {
    console.log(result)
    uni.showToast({
      title: result.errMsg,
      duration: 1500,
      icon: "none"
    });
    throw Error(result)
  }
}

export default userRequest