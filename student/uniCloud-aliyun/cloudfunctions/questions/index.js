'use strict';
const db = uniCloud.database()
const categories = db.collection('opendb-news-categories')
const article = db.collection('opendb-news-articles')
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
				res = await article.add(params)
				const category = await categories.where({
					_id: params.category_id
				}).get()
				const count = category.data[0].article_count + 1
				console.log(categories.doc(params.category_id))
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
