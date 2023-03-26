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