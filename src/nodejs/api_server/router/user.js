//导入 express
const express = require('express')
const router = express.Router()

//导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

//导入验证表单数据的中间件
const expressjoi = require('@escook/express-joi')

//导入需要验证规则对象
const { reg_login_schema } = require('../schema/user')

//注册新用户
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
router.post('/reguser', expressjoi(reg_login_schema), user_handler.regUser)

//登录
router.post('/login', expressjoi(reg_login_schema), user_handler.regLogin)

module.exports = router