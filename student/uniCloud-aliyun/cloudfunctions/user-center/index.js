'use strict';
// 将用户请求放在user-center中管理，只需引入一次 uni-id
const uniID = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let res = {}
	switch (event.action){
		case 'register':{
			const {username,password} = event.params
			res = await uniID.register({username, password})
			break;
		}
		case 'login':{
			const {username,password} = event.params
			res = await uniID.login({username, password})
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
