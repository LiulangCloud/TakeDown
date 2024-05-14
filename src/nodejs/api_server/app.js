//导入 express
const express = require('express')

// 导入配置文件
const config = require('./config')


//创建express服务器实例
const app = express()

//解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 配置解析表单数据的中间件
//注意：需要在配置中间件前配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

//一定要在路由之前注册中间件
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

const joi = require('joi')

//导入并使用用户路由模块
const userRputer = require('./router/user')
app.use('/api', userRputer)

//导入用户信息路由模块
const userInfoRouter = require('./router/userinfo')
app.use('/my', userInfoRouter)

//导入文章分类路由模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())

// 错误中间件
app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知错误
    res.cc(err)
})

//启动web服务器
app.listen(6666, () => {
    console.log('http://127.0.0.1:6666');
})