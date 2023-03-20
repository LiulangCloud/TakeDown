[TOC]

## 1.fs（文件系统）

文件 I/O 是对标准 POSIX 函数的简单封装。 通过 require('fs') 使用该模块。 所有的方法都有异步和同步的形式。

### fs.readFile((path[, options], callback)

异步读取一个文件的全部内容.

```js
//1.导入文件系统
const fs =  require('fs')
//2.读取文件内容
//参数1：文件名
//参数2：字符编码
//参数3：回调函数
fs.readFile("./1.txt",'utf8',function(err,dataStr){
    console.log(err); //读取失败
    console.log('-----'); 
    console.log(dataStr); //读取成功
    //注：失败dataStr为undefile,成功err为null
})
```

### fs.writeFile(file, data[, options], callback)

异步地写入数据到文件，如果文件已经存在，则替代文件.

```js
//1.导入文件系统
const fs = require('fs')
//2.写入文件内容
//参数1：文件名
//参数2：写入内容
//参数3：回调函数
fs.writeFile('r/2.txt','abcd',function(err){
    if (err) return console.log('写入失败' + err.message);
    return console.log('写入成功');
})
```

## 2.path（路径）

### path.basename(path[, ext])

返回一个path的最后一部分.

```js
//导入path模块
const path = require('path')
//参数1：文件路径
//参数2：文件扩展名
path.basename('/a/b/c/index.html')
//返回：index.html
path.basename('/a/b/c/index.html','.html')
//返回：index
```

### path.extname(path)

返回path的扩展名.

```js
const path = require('path')
//extname 获取扩展名
path.extname('/a/b/c/index.html')
//返回：.html
```

### path.join([...paths])

使用平台特定的分隔符把全部给定的 `path` 片段连接到一起，并规范化生成的路径.

```js
const path = require('path')
//path.join 路径拼接
path.join('/a', '/b/c', '../../', './d', 'e')
//返回：\a\d\e
```

## 3.modules（模块）

### module.exports和exports

#### module.exports返回的是一个对象

例子，假设创建了一个名为 `a.js` 的模块：

```js
const user = {
    "name": "张三",
    "age": 18
}
module.exports.username = 'zs'
module.exports.sayHello = function () {
    console.log('hello');
}
module.exports.user = user
/*返回：
{
  username: 'zs',
  sayHello: [Function (anonymous)],
  user: { name: '张三', age: 18 }
}
*/

//让module.exports指向一个全新的对象
module.exports = {
    name:'ls',
    age:30,
    sayHi:()=>{
        console.log('hi!!');
    }
}
/*
返回：
{ name: 'ls', age: 30, sayHi: [Function: sayHi] }
*/
```

然后，在另一个文件中可以这么做：

```js
const m = require('./自定义模块')
console.log(m);
//当module.exports指向一个新对象时，会覆盖之前对象内容。
```

注意，对 `module.exports` 的赋值必须立即完成。 不能在任何回调中完成。

#### exports 快捷方式

`exports` 变量是在模块的文件级别作用域内有效的，它在模块被执行前被赋予 `module.exports` 的值。

它有一个快捷方式，以便 `module.exports.f = ...` 可以被更简洁地写成 `exports.f = ...`。 注意，就像任何变量，如果一个新的值被赋值给 `exports`，它就不再绑定到 `module.exports`。

```js
//exports 和 module.exports指向同一个对象
console.log(exports === module.exports);//true
```

当 `module.exports` 属性被一个新的对象完全替代时，也会重新赋值 `exports`，例如：

```js
module.exports.username = 'ww'
exports = {
    username:'zs',
    age:33
}
//返回：{ username: 'ww' }
//最后返回的是module.exports赋值的数据，所以使用exports时最好不要用module.exports.
```

## 4.HTTP

### 创建基本的web服务器

```js
//1.导入http
const http = require("http")
//2.创建web服务器实例
const server = http.createServer()
//3.为服务器实例绑定request事件，监听客户端的请求
server.on('request', function (req, res) {
    // console.log('Someone visit our web server.');
    const url = req.url
    const method = req.method
    const str = `Your rquest ${method} ${url},阿巴阿巴阿巴`
    console.log(str);
    //设置响应头解决中文乱码
    res.setHeader('Content-Type','text/html; charset=utf-8')
    //将内容提交客户端
    res.end(str)
})
//4.启动服务器
server.listen(80, function () {
    console.log('server running at http://127.0.0.1');
})
```

