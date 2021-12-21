'use strict';
const uniID = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res = {}
	const params = event.params
	switch (event.action){
		case 'getRole':{
			res = await uniID.getRoleList({
				limit: 10,
				offset: 1 // 偏移一位，把超级权限管理员过滤
			})
			break;
		}
	}
	//返回数据给客户端
	return res
};
