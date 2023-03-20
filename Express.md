[TOC]

## Express

Express是基于Node.js平台，快速、开发、极简的Web开发框架。（通俗讲是专门用来创建Web服务器的）

Express的本质：就是一个npm上的第三方包，提供了快速创建Web服务器的便捷方法。



### Express创建基本Web服务器

```js
//导入 express
const express = require('express')

//创建web服务器
const app = express()

//启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})
```



### Express监听客户端的GET和POST请求，并向客户端响应具体的内容

```js
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

//启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})
```



### Express监听客户端的GET和POST请求，获取url参数和动态参数

```js
//导入 express
const express = require('express')

//创建web服务器
const app = express()

//监听客户端的GET和POST请求，获取url参数和动态参数
app.get('/?name=zs&age=12,(req,res)=>{
    //req.query url参数，默认是空对象
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
```



### Express快速的对外提供静态资源方法

```js
const express = require('express')

const app = express()

//调用 express.static()方法，快速的对外提供静态资源
//需要托管多个静态资源目录时，请多次调用express.static()函数
app.use(express.static('./file'))
//挂载路径前缀
app.use('/clock',express.static('./clock'))

app.listen(80,()=>{
    console.log("http://127.0.0.1");
})
```



### Express中的路由

在express中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

路由分为三部分组成：分别为``请求的类型``、``请求的URL地址``、``处理函数``

```js
1 app.METHOD(PATH, HANDLER)
```

#### 路由使用

```js
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
```

