const fs = require('fs')
const path = require('path')

const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname, "/index.html"), 'utf-8', function (err, dataStr) {

    if (err) return console.log('读取HTML文件失败：' + err.message);

    resolveCss(dataStr)
    resolveJs(dataStr)
    resolveHtml(dataStr)
})

function resolveCss(htmlStr) {
    const r1 = regStyle.exec(htmlStr)
    const newCss = r1[0].replace('<style>', '').replace('</style>', '')
    fs.writeFile(path.join(__dirname, './index.css'), newCss, function (err) {
        if (err) return console.log('写入CSS失败:' + err.message);
        return console.log('写入CSS成功');
    })
    // console.log(newCss);
}

function resolveJs(htmlStr) {
    const r2 = regScript.exec(htmlStr)
    const newJs = r2[0].replace('<script>', '').replace('</script>', '')
    fs.writeFile(path.join(__dirname, "./index.js"), newJs, function (err) {
        if (err) return console.log('写入Js脚本失败:' + err.message);
        return console.log('写入Js脚本成功');
    })
}

function resolveHtml(htmlStr) {
    const newHtml = htmlStr.replace(regStyle, ' <link rel="stylesheet" href="./index.css">').replace(regScript, ' <script src="./index.js"></script>')
    fs.writeFile(path.join(__dirname,"./index.html"),newHtml,function(err){
        if (err) return console.log('写入Html失败:' + err.message);
        return console.log('写入Html成功');
    })
}