import userRequest from '@/common/userRequest'

export const getUserInfo = async () => {
  const res = await userRequest('getUserInfo')
  return res.data
}

export const setAvatar = async (params) => {
  const res = await userRequest('setAvatar', params)
  await getUserInfo()
  return res.data
}

export const setNickname = async (params) => {
  const res = await userRequest('setNickname', params)
  await getUserInfo()
  return res.data
}