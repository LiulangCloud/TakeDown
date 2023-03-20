const fs = require('fs')

//参数1：文件名
//参数2：写入内容
//参数3：回调函数
fs.writeFile('r/2.txt','abcd',function(err){
    if (err) return console.log('失败' + err.message);
    return console.log('成功');
})