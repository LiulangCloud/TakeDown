const fs = require('fs')

fs.readFile('./成绩.txt', 'utf-8', function (err, dataStr) {
    if (err) return console.log("读取失败" + err);

    const arrOld = dataStr.split(" ");
    const arrNew = []
    arrOld.forEach(item => {
        arrNew.push(item.replace("=", ":"))
    })
    const newStr = arrNew.join("\r\n")
    fs.writeFile('./成绩-ok.txt', newStr, function (err) {
        if (err) return console.log("成绩写入失败" + err);
        return console.log('成绩写入成功');
    })
})