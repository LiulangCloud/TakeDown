//导入mysql数据库
const mysql = require('mysql')

//建立mysql连接关系
const db = mysql.createPool({
    host: '127.0.0.1', //数据库的 IP 地址
    user: 'root', // 登录数据库的账号
    password: 'admin123', //登录数据库的密码
    database: 'my_db_01' //指定要操作哪个数据库
})

// 检测mysql模块能否正常工作
/* db.query('select 1', (err, res) => {
    if (err) return console.log(err.message);
    console.log(res);
}) */

// 查询 user 表中的所有用户
/* const sqlStr = 'select * from user'
db.query(sqlStr, (err, res) => {
    //查询数据失败
    if (err) return console.log(err.message);
    //查询成功
    //注意：如果执行select查询语句，则执行的结果是数组
    console.log(res);
})
 */

// 向user表中，新增一条数据
/* //其中 username 的值为 Spider-Man, password 的值为pcc123
const user = { username:'Spider-Man', password:'pcc123'}
//定义待执行的 sql 语句,其中英文的 ? 表示占位符
const sqlStr = "INSERT INTO user (username,password) VALUES (?,?)"
//执行 sql 语句，使用数组的形式，依次为 ? 占位符指定具体的值
db.query(sqlStr, [user.username, user.password], (err, res) => {
    //插入数据失败
    if (err) return console.log(err.message);
    //插入数据成功
    //注意：如果执行的是 insert into 插入语句，则res是一个对象
    //可以通过 affectedRows 属性来判断是否插入数据成功
    if (res.affectedRows === 1) console.log("插入数据成功!");
}) */

// 插入数据的便捷方式
/* const user = { username: 'Spider-Man2', password: 'pcc321' }
//定义待执行的 sql 语句,其中英文的 ? 表示占位符
const sqlStr = "INSERT INTO user SET ?"
//执行 sql 语句,将数据对象当作占位符的值
db.query(sqlStr, user, (err, res) => {
    //插入数据失败
    if (err) return console.log(err.message);
    //插入数据成功
    //可以通过 affectedRows 属性来判断是否插入数据成功
    if (res.affectedRows === 1) console.log("插入数据成功!");
}) */

// 更新数据
/* const user = { id: 7, username: 'aaa', password: '000' }
//要执行的 sql 语句
const sqlStr = 'update user set username=?,password=? where id=?'
//执行 sql 语句
db.query(sqlStr, [user.username, user.password, user.id], (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('更新数据成功');
})
 */

// 更新数据的便捷方式
/* const user = { id: 7, username: 'bbb', password: '111' }
//要执行的 sql 语句
const sqlStr = 'update user set ? where id=?'
//执行 sql 语句
db.query(sqlStr, [user, user.id], (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('更新数据成功');
}) */

//删除数据
/* //要执行的 sql 语句
const sqlStr = 'delete from user where id=?'
//执行 sql 语句
db.query(sqlStr, 7, (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('删除数据成功');
})  */

//标记删除
const sqlStr = 'update user set status= ? where id=?'
db.query(sqlStr, [1, 5], (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('标记删除成功');
})