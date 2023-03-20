// import date from "./date.json"
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