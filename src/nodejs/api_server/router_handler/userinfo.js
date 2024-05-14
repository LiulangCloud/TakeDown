//导入数据库模块
const db = require('../db/index')

//导入 bcrypt 加密模块
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {
    const userInfo = req.query
    //定义查询用户信息sql语句
    const userInfoSql = 'select id,username,nickname,email,user_pic from ev_user where id = ?'
    db.query(userInfoSql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败')
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}

exports.updateUserInfo = (req, res) => {
    const userinfo = req.body
    //定义更新用户信息的sql
    //注意：只能更新当前用户信息
    const updateUserInfo = 'update ev_user set ? where id = ?'
    db.query(updateUserInfo, [userinfo, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        //执行 sql 语句成功，但影响行数不为1
        if (results.affectedRows !== 1) return res.cc('更新用户失败!')
        res.send({
            status: 0,
            message: '更新成功!'
        })
    })
}

exports.resetPassword = (req, res) => {
    // 定义查询用户sql
    const userSql = 'select * from ev_user where id = ?'
    db.query(userSql, req.user.id, (err, results) => {

        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('用户不存在')

        // 判断新密码是否和原密码一致
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        // 一致时抛出错误
        if (!compareResult) return res.cc('原密码错误,请重新输入!')
        // 定义更新密码 sql 语句
        const updatePassword = 'update ev_user set password = ? where id = ?'
        // 对新密码进行加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(updatePassword, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败!')
            res.cc('更新密码成功!', 0)
        })
    })

}

exports.updateAvatar = (req, res) => {
    //定义更新用户头像的 sql 语句
    const updateAvatarSql = 'update ev_user set user_pic = ? where id = ?'
    db.query(updateAvatarSql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户头像失败!')
        return res.cc('更新用户头像成功!', 0)
    })
}