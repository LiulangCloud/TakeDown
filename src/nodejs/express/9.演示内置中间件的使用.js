const express = require('express')

const app = express()

//注意：除了错误级别的中间件，其他的中间件必须在路由之前进行配置

//通过 express.json() 这个中间件，解析表单中的JSON格式的数据
app.use(express.json())

//通过 express.urlencoded() 这个中间件来解析表单中的url-encoded格式的数据

app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
    console.log(req.body);
    res.send('ok')
})

app.post('/book', (req, res) => {
    console.log(req.body);
    res.send('ok')
})

app.listen(80, () => {
    console.log("http://127.0.0.1");
})