'use strict';
// 将用户请求放在user-center中管理，只需引入一次 uni-id
const uniID = require('uni-id')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res = {}
	const {params, action, token} = event
	switch (action){
		case 'register':{
			const {username, password, role, code} = params
			console.log(username, code)
			res = await uniID.verifyCode({email: username, code: code, type: 'register'})
			if(res.code != 0) {
				return res
			}
			res = await uniID.register({username, password, role})
			break;
		}
		case 'login':{
			const {username, password} = params
			res = await uniID.login({username, password})
			break;
		}
		case 'sendRegisterCode': {
			const {username} = params
			const randomStr = '00000' + Math.floor(Math.random() * 1000000)
			const code = randomStr.substring(randomStr.length - 6)
			res = await uniID.setVerifyCode({
				email: username,
				code: code,
				expiresIn: 600,
				type: 'register'
			})
			res.data = {code: code}
			break;
		}
		case 'getUserInfo': {
			const payload = await uniID.checkToken(token)
			if (payload.code) {
			    return payload
			}
			res = await uniID.getUserInfo({
			    uid: payload.uid,
			})
			break
		}
		case 'setAvatar': {
			const { avatar } = params
			const payload = await uniID.checkToken(token)
			if(payload.code) {
				return payload
			}
			res = await uniID.setAvatar({
			    uid: payload.uid,
			    avatar
			})
			break;
		}
		case 'setNickname': {
			const { nickname } = params
			const payload = await uniID.checkToken(token)
			if(payload.code) {
				return payload
			}
			res = await uniID.updateUser({
				uid: payload.uid,
				nickname
			})
			break;
		}
		case 'setGender': {
			const { gender } = params
			const payload = await uniID.checkToken(token)
			if(payload.code) {
				return payload
			}
			res = await uniID.updateUser({
				uid: payload.uid,
				gender
			})
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
