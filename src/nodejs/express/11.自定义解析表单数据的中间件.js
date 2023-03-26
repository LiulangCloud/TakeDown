//导入 express
const express = require('express')

//创建express服务器实例
const app = express()

//
const customBodyParser = require('./12.custom-body-parser')

//这是解析表单数据的中间件
app.use(customBodyParser)

app.post('/user', (req, res) => {
    res.send(req.body)
})


//启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})