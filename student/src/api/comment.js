import commentRequest from '@/common/commentRequest.js'
import { getStorage } from '@/utils'

export const getComments = async (params) => {
  const res = await commentRequest('getComments', params)
  return res
}

export const addComment = async (params) => {
  params.token = getStorage('token')
  const res = await commentRequest('addComment', params)
  return res
}