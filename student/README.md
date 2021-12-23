# student

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

* src
  * api                           请求接口的封装
  * checkRule                     校验提交数据文件
    * graceChecker                校验方法
    * login                       login 校验规则
    * register                    注册 校验方法
    * article                     发布问题 校验方法
  * common                        公共的js
    * mixin                       一些公用的方法封装
    * *Request                    不同模块的请求方法
  * components                    公共的组件
  * pages                         页面
    * home                        tab 主页
    * question                    tab 问题分类
    * my                          tab 我的
    * login                       登录页面
    * register                    注册页面
  * static                        静态资源
  * store                         状态管理
  * utils                         工具包
  * uniCloud-aliyun               后端请求数据库代码