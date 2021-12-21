export const loginRule = [
  {
    name: 'username', 
    checkType: "reg", 
    checkRule: "^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$", 
    errorMsg: "请输入正确的邮箱"
  },
  {
    name: 'code',
    checkRule: "string",
    checkRule: "6",
    errorMsg: "验证码错误"
  },
  {
    name: 'password', checkType: "string", checkRule: "6,", errorMsg: "密码至少6个字符"
  },
  {
    name: 'confirmPassword', checkType: "samewith", checkRule: "password", errorMsg: "确认密码与原密码不一致"
  }
]
