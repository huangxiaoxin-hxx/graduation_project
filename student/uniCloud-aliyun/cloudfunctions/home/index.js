'use strict';
const db = uniCloud.database()
const banner = db.collection('opendb-banner')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {action, params} = event
	let res = {}
	switch (action){
		case 'getBanner':
			try{
				res = await banner.limit(5).get()
				res.code = 0
			}catch(e){
				//TODO handle the exception
				res = {
					code: 501,
					errMsg: e
				}
			}
			break;
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
