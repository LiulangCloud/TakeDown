//导入 express
const express = require('express')

//导入验证数据的中间件
const expressjoi = require('@escook/express-joi')

//导入文章分类路由处理函数对应的模块
const user_handler = require('../router_handler/artcate')

//导入文章分类的验证模块
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')

const router = express.Router()

//获取文章分类列表
router.get('/cates', user_handler.getArticleCates)

//新增文章分类
router.post('/addcates', expressjoi(add_cate_schema), user_handler.addArticleCates)

//删除文章分类
router.get('/deletecate/:id', expressjoi(delete_cate_schema), user_handler.deleteCateById)

//根据id获取文章分类数据
router.get('/cates/:id', expressjoi(get_cate_schema), user_handler.getArtCateById)

//根据id更新文章分类数据
router.post('/updatecate', expressjoi(update_cate_schema), user_handler.updateCateById)

module.exports = router