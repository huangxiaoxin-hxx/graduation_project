import homeRequest from '@/common/homeRequest'

export const getBanner = async () => {
  const res = await homeRequest('getBanner')
  return res.data
}