//导入 express

const express = require('express')

//创建web服务器

const app = express()

//监听客户端的GET和POST请求，并向客户端响应具体的内容
app.get('/user',(req,res)=>{
    //调用express提供的res.send()方法，向客户端响应一个JSON对象
    res.send({name:'zs',age:12})
})

app.post('/user',(req,res)=>{
    //调用express提供的res.send()方法，向客户端响应一个文本
    res.send('请求成功')
})

app.get('/',(req,res)=>{
    //req.query默认是空对象
    console.log(req.query);
    res.send(req.query)
})

app.get('/user/:id',(req,res)=>{
    //req.params 是动态匹配到的url参数,默认是空对象
    console.log(req.params);
    res.send(req.params)
})
//启动web服务器

app.listen(80, () => {
    console.log('http://127.0.0.1');
})