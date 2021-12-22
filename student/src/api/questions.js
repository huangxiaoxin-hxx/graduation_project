import questionRequest from '@/common/questionRequest'
import store from "@/store";

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