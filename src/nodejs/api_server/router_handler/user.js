//导入数据库操作模块
const db = require('../db/index')
//导入生成 password 加密包
const bcrypt = require('bcryptjs')
//导入生成 token 包
const jwt = require('jsonwebtoken')
//导入全局的密钥
const config = require('../config')

exports.regUser = (req, res) => {
    //获取客户端提交到服务器的用户信息
    const userInfo = req.body
    if (!userInfo.username || !userInfo.password) {
        return res.cc('用户或密码不存在')
    }

    // 定义 SQL 语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_user where username = ? '
    db.query(sqlStr, userInfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            return res.cc('用户名已被占用,请重新输入用户名')
        }

        // 调用 bcrypt.hashSync() 对密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        //定义新增用户的 sql 语句
        const sqlInsert = 'insert into ev_user set ?'

        db.query(sqlInsert, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            // 新增用户失败
            if (err) return res.cc(err.message)
            // sql 语句执行成功，但影响行数不为1
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试!')
            }
            // 注册成功
            // res.send({ status: 0, message: '注册成功' })
            res.cc('注册成功', 0)

        })

    })

}

exports.regLogin = (req, res) => {

    //接收表单数据
    const userInfo = req.body
    //定义 SQL 语句
    const sqlStr = 'select * from ev_user where username = ? '
    db.query(sqlStr, userInfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户名或密码错误请重新输入!')
        //判断密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
        if (!compareResult) return res.cc('密码错误请从重新输入!')
        //在服务器端生成 Token 字符串
        const user = { ...results[0], password: '', user_pic: '' }
        //对用户的信息进行加密，生成 token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        // 调用 res.send 将 token 响应给客户端
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })
}