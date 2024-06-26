//导入数据库模块
const db = require('../db/index')

// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {

    // 根据分类的状态，获取所有未被删除的分类列表数据
    // is_delete 为 0 表示没有被 标记为删除 的数据
    const selectSql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    db.query(selectSql, (err, results) => {
        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: '获取文章分类成功!',
            data: results
        })
    })
}

exports.addArticleCates = (req, res) => {

    // 定义查重 分类名称 与 分类别名 是否被占用的 SQL 语句
    const cnkiSql = `select * from ev_article_cate where name=? or alias=?`
    db.query(cnkiSql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        // 分类名称 和 分类别名 都被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        //定义新增文章分类sql语句
        const addArticleSql = 'insert into ev_article_cate set ?'
        db.query(addArticleSql, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')

            // 新增文章分类成功
            res.cc('新增文章分类成功！', 0)
        })
    })
}

exports.deleteCateById = (req, res) => {
    //定义删除文章分类接口
    const deleteCateSql = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(deleteCateSql, req.params.id, (err, results) => {
        console.log(req.params.id);
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败!')
        res.cc('删除文章分类成功!', 0)
    })

}

exports.getArtCateById = (req, res) => {
    //定义根据 Id 获取文章分类的 SQL 语句
    const getCateIdSql = 'select * from ev_article_cate where id = ?'
    db.query(getCateIdSql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("查询文章分类失败!")
        res.send({
            status: 0,
            message: '查询成功',
            data: results
        })
    })
}

exports.updateCateById = (req, res) => {
    //定义查重sql语句
    const cnkiSql = 'select * from ev_article_cate where Id != ? and (name=? or alias=?)'
    db.query(cnkiSql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 分类名称 和 分类别名 都被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        //定义更新文章分类sql
        const sql = 'update ev_article_cate set ? where id = ?'
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
            // 更新文章分类成功
            res.cc('更新文章分类成功！', 0)
        })

    })
}