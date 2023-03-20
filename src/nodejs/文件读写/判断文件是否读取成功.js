const fs = require('fs')


fs.readFile('./11.txt', 'utf-8', function (err, dataStr) {
    if (err) return console.log('失败' + err.message);
    return console.log('成功', + dataStr);
})