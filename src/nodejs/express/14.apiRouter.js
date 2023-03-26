const express = require('express')
const apiRouter = express.Router()

//在这里挂载对应路由
//定义 GET 接口
apiRouter.get('/get', (req, res) => {
    // 通过req.query获取客户端通过查询字符串，发送到服务器的数据
    const query = req.query
    //通过res.send()方法，向客户端响应处理的结果
    res.send({
        status: 0,// 0表示处理成功 1表示处理失败
        msg: 'GET 请求成功',// 状态描述
        data: query //需要响应给客户端的数据
    })
})

//定义 POST 接口
apiRouter.post('/post',(req,res)=>{
    //通过 req.body 获取请求体中包含的url-encoded 格式数据
    const body = req.body
    //调用 res.send() 方法，向客户端响应处理结果
    res.send({
        status: 0,// 0表示处理成功 1表示处理失败
        msg: 'POST 请求成功',// 状态描述
        data: body //需要响应给客户端的数据
    })
})

module.exports = apiRouter