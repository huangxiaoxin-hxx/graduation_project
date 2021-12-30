'use strict';
const db = uniCloud.database()
const categories = db.collection('opendb-news-categories')
const article = db.collection('opendb-news-articles')
const uniID = require('uni-id')
const favorite = db.collection('opendb-news-favorite')
const like = db.collection('opendb-news-like')
const view = db.collection('opendb-news-view')
const comments = db.collection('opendb-news-comments')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {action, params} = event
	let res = {}
	switch (action){
		case 'getCategories':
			try{
				res = await categories.get()
				res.code = 0
			}catch(e){
				//TODO handle the exception
				res = e
			}
			break;
		case 'addArticle': {
			try{
				params.publish_date = new Date().getTime()
				params.like_count = 0
				params.comment_count = 0
				params.view_count = 0
				params.like_count = 0
				res = await article.add(params)
				const category = await categories.where({
					_id: params.category_id
				}).get()
				const count = category.data[0].article_count + 1
				await categories.doc(params.category_id).update({
					article_count: count
				})
				res.code = 0
			}catch(e){
				//TODO handle the exception
				res = e
			}
			break;
		}
		case 'getQuestionList': {
			const { limit = 10, page = 1, category_id, searchVal = '' } = params
			const skip = (page - 1) * limit
			try{
				res = await article.where({
					category_id: category_id,
					title: new RegExp(searchVal, 'g')
				}).limit(limit).skip(skip).get()
				const count = await article.where({
					category_id: category_id,
					title: new RegExp(searchVal, 'g')
				}).count()
				res.code = 0
				res.total = count.total
			}catch(e){
				//TODO handle the exception
				res = e
			}
			break;
		}
		case 'getMyQuestionList': {
			const { limit = 10, page = 1, token, searchVal = '' } = params
			const payload = await uniID.checkToken(token)
			if (payload.code) {
			    return payload
			}
			const skip = (page - 1) * limit
			try{
				res = await article.where({
					user_id: payload.uid,
					title: new RegExp(searchVal, 'g')
				}).limit(limit).skip(skip).get()
				const count = await article.where({
					user_id: payload.uid,
					title: new RegExp(searchVal, 'g')
				}).count()
				res.code = 0
				res.total = count.total
			}catch(e){
				//TODO handle the exception
				res = e
			}
			break;
		}
		case 'getCollectQuestionList': {
			const { limit = 10, page = 1, token, searchVal = '' } = params
			const payload = await uniID.checkToken(token)
			if (payload.code) {
			    return payload
			}
			const skip = (page - 1) * limit
			try{
				let data = await favorite.aggregate().lookup({
					from: 'opendb-news-articles',
					localField: 'article_id',
					foreignField: '_id',
					as: 'article_id'
				})
				.match({
					user_id: payload.uid
				})
				.project({
					"article_id": true,
					quantity: true
				}).end()
				res.data = data
				res.code = 0
				// res.total = count.total
			}catch(e){
				//TODO handle the exception
				res = e
			}
			break
		}
		case 'getQuestionDetail': {
			const {token} = params
			const payload = await uniID.checkToken(token)
			if (payload.code) {
			    return payload
			}
			const { id } = params
			const favoriteParams = {
				user_id: payload.uid,
				article_id: id
			}
			const favoriteList = await favorite.where(favoriteParams).get()
			const isFavorite = favoriteList.data.length === 0 ? false : true
			const thumbList = await like.where(favoriteParams).get()
			const isThumb = thumbList.data.length === 0 ? false : true
			try {
					res = await article.where({
						_id: id
					}).get()
					res.code = 0
					res.data = res.data[0]
					res.data.favorite = isFavorite
					res.data.thumb = isThumb
			} catch(e){
				//TODO handle the exception
				res = e
			}
			break;
		}
		case 'favoriteQuestion': {
			const {token, add} = params
			delete params.token
			delete params.add
			const payload = await uniID.checkToken(token)
			if (payload.code) {
			    return payload
			}
			params.user_id = payload.uid
			if(add) {
				params.create_date = new Date().getTime()
				res = await favorite.add(params)
			} else {
				const data = await favorite.where(params).get()
				res = await favorite.doc(data.data[0]._id).remove()
			}
			res.code = 0
			break;
		}
		case 'thumbQuestion': {
			const {token, thumb} = params
			delete params.token
			delete params.thumb
			const payload = await uniID.checkToken(token)
			if (payload.code) {
			    return payload
			}
			const likeCount = await like.where({article_id: params.article_id}).count()
			params.user_id = payload.uid
			if(thumb) {
				params.create_date = new Date().getTime()
				res = await like.add(params)
				await article.doc(params.article_id).update({like_count: likeCount.total + 1})
			} else {
				const data = await like.where(params).get()
				res = await like.doc(data.data[0]._id).remove()
				await article.doc(params.article_id).update({like_count: likeCount.total - 1})
			}
			res.code = 0
			break;
		}
		case 'viewQuestion': {
			const {token} = params
			delete params.token
			const payload = await uniID.checkToken(token)
			if (payload.code) {
			    return payload
			}
			const viewData = await view.where({article_id: params.article_id, user_id: payload.uid}).get()
			const curData = viewData.data[0]
			const count = await view.where({article_id: params.article_id}).count()
			const isView = viewData.data.length === 0 ? false : true
			if(isView) {
				res = await view.doc(curData._id).update({
					create_date: new Date().getTime()
				})
			} else {
				res = await view.add({
					article_id: params.article_id,
					user_id: payload.uid,
					create_date: new Date().getTime()
				})
				await article.doc(params.article_id).update({
					view_count: count.total + 1
				})
			}
			res.code = 0
			break;
		}
		case 'updateArticle': {
			const { _id } = params
			delete params._id
			try{
				res = await article.doc(_id).update(params)
				res.code = 0
			}catch(e){
				//TODO handle the exception
				res = e
			}
			break;
		}
		case 'deleteQuestion': {
			const {article_id} = params
			try{
				const data = await article.doc(article_id).get()
				res = await article.doc(article_id).remove()
				const categoriesData = await categories.doc(data.data[0].category_id).get()
				const count = categoriesData.data[0].article_count
				await categories.doc(data.data[0].category_id).update({article_count: count - 1})
				await favorite.where({article_id: article_id}).remove()
				await like.where({article_id: article_id}).remove()
				await view.where({article_id: article_id}).remove()
				await comments.where({article_id: article_id}).remove()
				res.code = 0
			}catch(e){
				//TODO handle the exception
				res = e
			}
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
