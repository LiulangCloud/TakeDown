//导入 express

const express = require('express')

//创建web服务器

const app = express()

//挂在路由
app.get('/',(req,res)=>{
    res.send('hello world.')
})

app.post('/',(req,res)=>{
    res.send('Post Request.')
})

//启动web服务器

app.listen(80, () => {
    console.log('http://127.0.0.1');
})