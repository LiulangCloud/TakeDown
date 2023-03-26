//导入 express
const express = require('express')

//创建express服务器实例
const app = express()

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

//必须在配置 cors 中间件之前配置 jsonp 的接口
app.get('/api/jsonp',(req,res)=>{
    //1.获取客户端发送过来的回调函数
    const funcName = req.query.callback
    //2.得到要通过 JSONP 形式发送给客户端的数据
    const data = {name:'zs',age:23}
    //3.根据前前两部得到的数据，拼接出一个函数调用的字符串
    const scriptStr =`${funcName}(${JSON.stringify(data)})`
    //4.把上一步拼接得到的字符串响应给客户端<script>标签进行解析执行
    res.send(scriptStr)
})

//一定要在路由之前，配置 cors 这个中间件，从而解决接口跨域的问题
const cors = require('cors')
app.use(cors())

//导入路由模块
const router = require('./14.apiRouter')

app.use('/api', router)

//启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})