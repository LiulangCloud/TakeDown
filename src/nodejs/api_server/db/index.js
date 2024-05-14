//导入 mysql 模块
const mysql = require('mysql')

//配置 mysql
const db = mysql.createPool({
    host: '127.0.0.1', //数据库的 IP 地址
    user: 'root', // 登录数据库的账号
    password: 'admin123', //登录数据库的密码
    database: 'my_db_01' //指定要操作哪个数据库
})

module.exports = db