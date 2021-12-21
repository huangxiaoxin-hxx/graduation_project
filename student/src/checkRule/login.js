export const loginRule = [
  {
    name: 'username', 
    checkType: "reg", 
    checkRule: "^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$", 
    errorMsg: "请输入正确的邮箱"
  },
  {
    name: 'password', checkType: "string", checkRule: "6,", errorMsg: "密码至少6个字符"
  }
]
