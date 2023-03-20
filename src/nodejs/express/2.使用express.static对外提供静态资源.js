const express = require('express')

const app = express()

//调用 express.static()方法，快速的对外提供静态资源
//需要托管多个静态资源目录时，请多次调用express.static()函数
//挂载路径前缀
app.use('/file',express.static('./file'))
app.use('/clock',express.static('./clock'))

app.listen(80,()=>{
    console.log("http://127.0.0.1");
})