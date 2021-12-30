import questionRequest from '@/common/questionRequest'
import store from "@/store";
import { getStorage } from '@/utils'

export const getCategories = async () => {
  const res = await questionRequest('getCategories')
  store.commit('article/setCategories', res.data) // 类别常用到，保存到vuex里面
  return res.data
}

export const addArticle = async (params) => {
  const res = await questionRequest('addArticle', params)
  return res
}

export const getQuestionList = async (params) => {
  const res = await questionRequest('getQuestionList', params)
  return res
}

export const getQuestionDetail = async (params) => {
  const token = getStorage('token')
  params.token = token
  const res = await questionRequest('getQuestionDetail', params)
  return res.data
}

export const getMyQuestionList = async (params) => {
  const token = getStorage('token')
  params.token = token
  const res = await questionRequest('getMyQuestionList', params)
  return res
}

export const favoriteQuestion = async (params) => {
  const token = getStorage('token')
  params.token = token
  const res = await questionRequest('favoriteQuestion', params)
  return res
}

export const thumbQuestion = async (params) => {
  const token = getStorage('token')
  params.token = token
  const res = await questionRequest('thumbQuestion', params)
  return res
}

export const viewQuestion = async (params) => {
  const token = getStorage('token')
  params.token = token
  const res = await questionRequest('viewQuestion', params)
  return res
}


export const updateArticle = async (params) => {
  const res = await questionRequest('updateArticle', params)
  return res
}

export const deleteQuestion = async (params) => {
  const res = await questionRequest('deleteQuestion', params)
  return res
}

export const getCollectQuestionList = async () => {
  const token = getStorage('token')
  const res = await questionRequest('getCollectQuestionList', {token: token})
  return res.data
}

export const getHotQuestionList = async () => {
  const res = await questionRequest('getHotQuestionList')
  return res
}