//这是获取用户信息路由模块

//导入用户信息处理函数模块
const userInfo_handler = require('../router_handler/userinfo')

//导入验证表单数据中间件
const expressjoi = require('@escook/express-joi')

//导入需要验证规则对象
const { update_userinfo_schema, reset_password_schema,update_avatar_schema } = require('../schema/user')

//导入 express
const express = require('express')

const router = express.Router()

//获取用户基本信息
router.get("/userinfo", userInfo_handler.getUserInfo)

//更新用户信息
router.post("/userinfo", expressjoi(update_userinfo_schema), userInfo_handler.updateUserInfo)

//重置用户密码
router.post("/resetpwd", expressjoi(reset_password_schema), userInfo_handler.resetPassword)

//更新用户头像
router.post('/update/avatar',expressjoi(update_avatar_schema), userInfo_handler.updateAvatar)

module.exports = router


