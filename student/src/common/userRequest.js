const userRequest = async (action, params) => {
  const {result} = await uniCloud.callFunction({
    name: 'user-center',
	  data: {
      action,
      params
    },
  })
  console.log(result)
	if(result.code === 0) {
    return result
  } else {
    uni.showToast({
      title: result.message,
      duration: 1500,
      icon: "none"
    });
    throw Error(result.errMsg)
  }
}

export default userRequest