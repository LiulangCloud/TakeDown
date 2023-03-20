const path = require('path')

const fpath = '/a/b/c/index.html'

//extname 获取扩展名
const ext = path.extname(fpath)
console.log(ext);