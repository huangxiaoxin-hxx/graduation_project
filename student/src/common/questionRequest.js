const questionRequest = async (action, params = null) => {
  const {result} = await uniCloud.callFunction({
    name: 'questions',
	  data: {
      action,
      params
    },
  })
	if(result.code === 0) {
    return result
  } if(result.code === 30203) {
    uni.reLaunch({
      url: '/pages/login/index'
    })
  } else {
    uni.showToast({
      title: result.message,
      duration: 1500,
      icon: "none"
    });
    throw Error(result.errMsg)
  }
}

export default questionRequest