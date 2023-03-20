const path = require('path')
const fs = require('fs')

//path.join 路径拼接
const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')
console.log(pathStr);

fs.readFile(path.join(__dirname,'/1.txt'),'utf-8',function(err,dataStr){
    if(err)return console.log(err.message);
    return console.log(dataStr);
})
