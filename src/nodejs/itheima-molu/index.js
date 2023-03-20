//包入口文件
const date = require('./src/dateFormat')
const escape = require('./src/htmlEscape')

//向外暴露成员
module.exports = { ...date, ...escape }
