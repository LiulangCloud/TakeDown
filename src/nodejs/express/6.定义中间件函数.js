const express = require('express')
const app = express()

//常量 mw 所指向的就是一个中间件函数

const mw = function (req, res, next) {
    console.log('这是一个最简单的中间件函数');
    //注意：在当前中间件的业务处理完毕后，必须调用next()函数
    //表示把流转关系转交给下一个中间件或路由

    const time= new Date()
    req.startTime = time
    next()
}

//全局生效的中间件
app.use(mw)

app.get('/',(req,res)=>{
    console.log('调用了 / 这个路由');
    res.send('Home page.' + req.startTime)
})

app.get('/user',(req,res)=>{
    console.log('调用了 /user 这个路由');
    res.send('User page.' + req.startTime)
})

app.listen(80,()=>{
    console.log('http://127.0.0.1');
})