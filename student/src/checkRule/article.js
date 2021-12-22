export const submitArticleRule = [
  {
    name: 'title', checkType: "notnull", errorMsg: "请输入标题"
  },
  {
    name: 'category_id', checkType: "notnull", errorMsg: "请选择分类"
  },
  {
    name: 'content', checkType: "notnull", errorMsg: "请输入内容"
  },
  {
    name: 'comment_status', checkType: "notnull", errorMsg: "请选择是否开启评论"
  },
  {
    name: 'avatar', checkType: "notnull", errorMsg: "请上传一张封面图"
  }
]