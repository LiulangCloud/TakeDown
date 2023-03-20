//1.导入
const fs =  require('fs')

// 参数1：文件名
// 参数2：读取格式
// 参数3：回调函数
fs.readFile("./1.txt",'utf8',function(err,dataStr){
    //失败
    console.log(err);
    console.log('-----');
    //成功
    console.log(dataStr);
    //注：失败dataStr为undefile,成功err为null
})