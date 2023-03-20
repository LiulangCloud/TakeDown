//导入http fs path模块
const http = require('http')
const fs = require('fs')
const path = require('path')
const date = require('./date')
console.log(JSON.stringify(date));
//创建web服务器
const server = http.createServer()

server.on('request', (req, res) => {
    // const url = req.url
    // console.log(url);
    // let fpath = ''
    // if (url === '/') {
    //     fpath = path.join(__dirname, './clock/index.html')
    // } else {
    //     fpath = path.join(__dirname, `./clock${url}`)
    // }
    // fs.readFile(fpath, 'utf-8', (err, dataStr) => {
    //     if (err) return res.end('404 Not found')
    //     res.end(dataStr)
    // })
    res.setHeader('Content-Type','text/html; charset=utf-8')
    res.end(JSON.stringify(date))
})

server.listen(80, () => {
    console.log('http://127.0.0.1');
})

