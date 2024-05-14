[TOC]

## Express

Express是基于Node.js平台，快速、开发、极简的Web开发框架。（通俗讲是专门用来创建Web服务器的）

Express的本质：就是一个npm上的第三方包，提供了快速创建Web服务器的便捷方法。



### 安装

```tex
1 安装Express
2 npm install express
```



### 1. Express创建基本Web服务器

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



### 2. Express监听客户端的GET和POST请求，并向客户端响应具体的内容

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



### 3. Express监听客户端的GET和POST请求，获取url参数和动态参数

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



### 4. Express快速的对外提供静态资源方法

express 提供了一个 express.static()函数，通过它可以非常方便地创建一个静态资源服务器，通过如下代码就可以将 file 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了

```js
const express = require('express')

const app = express()

//调用 express.static()方法，快速的对外提供静态资源
//需要托管多个静态资源目录时，请多次调用express.static()函数
app.use(express.static('./file'))
app.use(express.static('./file2'))
//挂载路径前缀
app.use('/clock',express.static('./clock'))
//通过带有 /clock 前缀地址来访问 clock 目录中的文件了
//http://localhost:3000/clock/images/kitten.jpg

app.listen(80,()=>{
    console.log("http://127.0.0.1");
})
```



### 5. Express中的路由

在express中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

路由分为三部分组成：分别为``请求的类型``、``请求的URL地址``、``处理函数``

```js
1 app.METHOD(PATH, HANDLER)
```

#### 5.1 路由使用

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

#### 5.2 为路由模块添加前缀

```js
1 // 导入路由模块
2 const userRouter = require('./router/user.js')
3 //使用 app.use() 注册路由模块，并添加同意的访问前缀 /api
app.use('/api',userRouter)
```



### 6. 中间件

中间件（Middleware ），特指业务流程的中间处理环节。

作用：多个中间件之间，共享同一份req和res。基于这样的特性，我们可以在`上游`的中间件中，统一为`req`或`res`对象添加`自定义`的`属性`或者`方法`，供`下游`的中间件或路由进行使用.

![image-20230321121948093](D:\TakeDown\src\image\image-20230321121948093.png)

#### 6.1 定义一个简单的中间件函数

Express 的中间件，本质上就是一个 **function** 处理函数

```js
const express = require('express')
const app = express()

//常量 mw 所指向的就是一个中间件函数

const mw = function (req, res, next) {
    console.log('这是一个最简单的中间件函数');
    //注意：在当前中间件的业务处理完毕后，必须调用next()函数
    //表示把流转关系转交给下一个中间件或路由
    next()
}

//全局生效的中间件
app.use(mw)

app.get('/',(req,res)=>{
    res.send('Home page.')
})

app.listen(80,()=>{
    console.log('http://127.0.0.1');
})
```

#### 6.2全局生效的中间件

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。

通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件.

```js
const express = require('express')
const app = express()

//常量 mw 所指向的就是一个中间件函数

const mw = function (req, res, next) {
    console.log('这是一个最简单的中间件函数');
    //注意：在当前中间件的业务处理完毕后，必须调用next()函数
    //表示把流转关系转交给下一个中间件或路由
    next()
}

//全局生效的中间件
app.use(mw)

app.get('/',(req,res)=>{
    res.send('Home page.')
})

app.listen(80,()=>{
    console.log('http://127.0.0.1');
})
```

#### 6.3 局部生效的中间件

**不使用** app.use() 定义的中间件，叫做局部生效的中间件

```js
const express = require('express')
const app = express()

//常量 mw 所指向的就是一个中间件函数

const mw = function (req, res, next) {
    console.log('这是一个最简单的中间件函数');
    //注意：在当前中间件的业务处理完毕后，必须调用next()函数
    //表示把流转关系转交给下一个中间件或路由
    next()
}

//局部生效的中间件（不使用app.use的情况）
app.get('/user',mw,(req,res)=>{
    res.send('User page.')
})

//也可以定义多个局部中间件
//app.get('/',mw,mw2,(req,res)=>{ res.send('User page.') })
//app.get('/',[mw,mw2],(req,res)=>{ res.send('User page.') })

app.listen(80,()=>{
    console.log('http://127.0.0.1');
})
```

**注意:**

①一定要在路由之前注册中间件

②客户端发送过来的请求，可以连续调用多个中间件进行处理

③执行完中间件的业务代码之后，不要忘记调用 next() 函数

④为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码

⑤连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象

#### 6.4 Express内置的中间件

① express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

② express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```js
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
```

#### 6.5 自定义中间件

封装自定义中间件 **custom-body-parser**

```js
//导入 querystring 模块
const qs = require('querystring')

const bodyParser = (req, res, next) => {
    //定义中间件具体的业务逻辑
    //定义一个str字符串，用来存储客户端发送过来的请求数据
    let str = ''
    //监听 req 的 data 事件
    req.on('data', (chunk) => {
        str += chunk
    })
    //监听 req 的 end 事件
    req.on('end', () => {
        //在str中存放的是完整的请求体数据
        // console.log(str);
        //todo：把字符串格式的请求体数据，解析成对象格式

        //使用nodejs内置的 querysting 模块中提供的parse函数，可以将查询字符串解析成对象
        const body = qs.parse(str)
        req.body = body
        console.log(body);
        next()
    })

}

module.exports = bodyParser
```

使用自定义中间件

```js
//导入 express
const express = require('express')

//创建express服务器实例
const app = express()

//导入封装好的自定义中间件
const customBodyParser = require('./custom-body-parser')

//这是解析表单数据的中间件
app.use(customBodyParser)

app.post('/user', (req, res) => {
    res.send(req.body)
})

//启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})
```



### 7. 使用Express写接口

#### 7.1 创建服务器，导入 API 路由模块

```js
//导入 express
const express = require('express')

//创建express服务器实例
const app = express()

//导入路由模块
const router = require('./apiRouter')

app.use('/api', router)

//启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})
```

#### 7.2 创建 API 路由模块,定义 GET / POST 接口

```js
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
```

#### 7.3创建 HTML 页面测试接口

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.staticfile.org/jquery/3.6.4/jquery.min.js"></script>
</head>

<body>
    <button id="btnGET">GET</button>
    <button id="btnPOST">POST</button>
    <script>
        $(function () {
            //1. 测试 GET 接口
            $('#btnGET').on('click', () => {
                $.ajax({
                    type: 'GET',
                    url: 'http://127.0.0.1/api/get',
                    data: { name: 'zs', age: 23 },
                    success: (res) => {
                        console.log(res);
                    }
                })
            })
            //2. 测试 POST 接口
            $('#btnPOST').on('click', () => {
                $.ajax({
                    type: 'POST',
                    url: 'http://127.0.0.1/api/post',
                    data: { name: 'ls', age: 22 },
                    success: (res) => {
                        console.log(res);
                    }
                })
            })
        })
    </script>
</body>

</html>
```

### 8. 接口跨域问题

上面定义的 GET / POST 接口中存在接口跨域问题。

解决方案：

#### 8.1. CORS（主流的解决方案，推荐使用）

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。

```tex
1 ## 安装中间件
2 npm install cors
```

##### 8.1.1在创建的服务器中导入 cors 中间件。

```js
//导入 express
const express = require('express')

//创建express服务器实例
const app = express()

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

//一定要在路由之前，配置 cors 中间件，从而解决接口跨域的问题
const cors = require('cors')
app.use(cors())

//导入路由模块
const router = require('./apiRouter')

app.use('/api', router)

//启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})
```

*注意：一定要在路由之前，配置 cors 中间件*



#### 8.2. JSONP（有缺陷的解决方案：只支持 GET 请求）

浏览器端通过 <script> 标签的 src 属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做 JSONP。

##### 8.2.1 在服务器中创建 JSONP 接口

```js
//导入 express
const express = require('express')

//创建express服务器实例
const app = express()

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

//优先创建 JSONP 接口(这个接口不会被处理成 CORS 接口)
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

//再配置 CORS 中间件(后续所有接口都会处理成 CORS 接口)
const cors = require('cors')
app.use(cors())

//导入路由模块
const router = require('./apiRouter')

app.use('/api', router)

//启动web服务器
app.listen(80, () => {
    console.log('http://127.0.0.1');
})
```

*注意：如果项目中已经配置了 CORS 跨域资源共享，为了防止冲突，必须在配置 CORS 中间件之前声明 JSONP 的接口。否则 JSONP 接口会被处理成开启了 CORS 的接口。*

##### 8.2.2 发起 JSONP 请求

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.staticfile.org/jquery/3.6.4/jquery.min.js"></script>
</head>

<body>
    <button id="btnJSONP">JSONP</button>
    <script>
        $(function () {
            //测试 JSONP 请求
            $('#btnJSONP').on('click', () => {
                $.ajax({
                    type: 'GET',
                    url: 'http://127.0.0.1/api/JSONP',
                    dataType: 'jsonp',//表示要发起jsonp的请求
                    success: (res) => {
                        console.log(res);
                    }
                })
            })
        })
    </script>
</body>

</html>
```

