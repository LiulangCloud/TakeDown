//路由模块

//导入express
const express = require('express') 

//创建路由对象
const router = express.Router() 

 
router.get('/user/list',function(req,res){
    res.send('Get user list.')
})

router.post('/user/add',function(req,res){
    res.send('Add new user.')
})

module.exports = router