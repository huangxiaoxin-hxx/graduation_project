'use strict';
const db = uniCloud.database()
const comments = db.collection('opendb-news-comments')
const uniID = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {action, params} = event
	let res = {}
	switch (action){
		case 'getComments': {
			const { limit = 10, page = 1, article_id } = params
			const skip = (page - 1) * limit
			try{
				res = await comments.where({
					article_id: article_id,
					// comment_type: 1
				}).limit(limit).skip(skip).get()
				const count = await comments.where({
					article_id: article_id,
					// comment_type: 1
				}).count()
				res.total = count.total
				res.code = 0
			}catch(e){
				//TODO handle the exception
				res = e
			}
			break;
		}
		case 'addComment': {
			const { token } = params
			delete params.token
			const payload = await uniID.checkToken(token)
			if (payload.code) {
			    return payload
			}
			const data = await uniID.getUserInfo({
			    uid: payload.uid,
			})
			params.user_id = payload.uid
			params.userInfo = data.userInfo
			params.comment_date = new Date().getTime()
			res = await comments.add(params)
			res.code = 0
			break;
		}
		default:
			res = {
				code: 741,
				msg: '请求无效'
			}
			break;
	}
	//返回数据给客户端
	return res
};
