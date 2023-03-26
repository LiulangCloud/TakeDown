[TOC]



## MySQL数据库

### 1. 数据库

​	数据库（database）是用来组织、存储和管理数据的仓库。

​	当今世界是一个充满着数据的互联网世界，充斥着大量的数据。数据的来源有很多，比如出行记录、消费记录、浏览的网页、发送的消息等等。除了文本类型的数据，图像、音乐、声音都是数据。

为了方便管理互联网世界中的数据，就有了数据库管理系统的概念（简称：数据库）。用户可以对数据库中的数据进行新增、查询、更新、删除等操作。

​	其中 **MySQL**  数据库是目前使用最广泛、流行度最高的开源免费数据库；MySQL 和 Oracle、SQL Server 属于**传统型数据库**（又叫做：关系型数据库 或 SQL 数据库），这三者的设计理念相同，用法比较类似。

​	而 Mongodb 属于**新型数据库**（又叫做：非关系型数据库 或 NoSQL 数据库），它在一定程度上弥补了传统型数据库的缺陷。

### 2. 传统型数据库的数据组织结构

​	在传统型数据库中，数据的组织结构分为**数据库(database)**、**数据表(table)**、**数据行(row)**、**字段(field)**这 4 大部分组成。

① 在实际项目开发中，一般情况下，每个项目都对应独立的数据库。

② 不同的数据，要存储到数据库的不同表中，例如：用户数据存储到 users 表中，图书数据存储到 books 表中。

③ 每个表中具体存储哪些信息，由字段来决定，例如：我们可以为 users 表设计 id、username、password 这 3 个字段。

④ 表中的行，代表每一条具体的数据。

### 3. SQL语句

#### 3.1 SELECT语句

​	SELECT 语句用于从表中查询数据。执行的结果被存储在一个结果表中（称为结果集）。

```sql
1 -- 从FROM 指定的 表 中查询出该表的所有数据。 * 表示所有列
2 SELECT * FROM 表名称
3 -- 从FROM 指定的[表]中查询出该表的指定[列名称(字段)]的数据。
4 SELECT 列名称(字段名) FROM 表名称
5 -- 多列之间用逗号隔开
6 SELECT 列名称(字段名),列名称(字段名) FROM 表名称
```

#### 3.2 INSERT INTO 语句

​	INSERT INTO 语句用于向数据表中插入新的数据行。

```sql
1 -- 注意：列和值要一一对应，多个列和多个值之间，使用英文逗号隔开
2 INSERT INTO table_name(列1,列2,...) VALUES(值1,值2,...) 
3 -- 示例：在user表中添加一行数据，其中username列的值为张三，password列的值为1234
4 INSERT INTO user(username,password) VALUES('周六','1234')
```

#### 3.3 UPDATE 语句

​	UPDATE 语句用于修改表中的数据。

```sql
1 UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
2 -- 示例：将 [user] 表中 [username] 为 [张三] 的 [password] 修改为 [666]
3 UPDATE user SET password='666' WHERE username = '张三'
4 -- 修改多列时用英文逗号隔开
5 UPDATE 表名称 SET 列名称 = 新值,列名称 = 新值 WHERE 列名称 = 某值
```

#### 3.4 DELETE 语句

​	DELETE 语句用于删除表中的行。

```sql
1 -- 从指定的表中，根据 WHERE 条件，删除对应的数据行
2 DELETE FROM 表名称 WHERE 列名称 = 某值
3 -- 示例：删除 user 表中 id等于2 的这行数据
4 DELETE FROM user WHERE id=2
```

#### 3.5 WHERE 语句

​	WHERE 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准。

```sql
1 -- 查询语句中的 WHERE 条件
2 SELECT 列名称(字段名) FROM 表名称 WHERE 列名称 运算符 值
3 -- 更新语句中的 WHERE 条件
4 UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 运算符 值
5 -- 删除语句中的 WHERE 条件
6 DELETE FROM 表名称 WHERE 列名称 运算符 值
```

​	**WHERE** 子句中使用的运算符

![](D:\TakeDown\src\image\WHERE运算符.png)

#### 3.6 AND / OR 运算符

AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来。

AND 表示必须同时满足多个条件，相当于 JavaScript 中的 && 运算符，例如 if (a !== 10 && a !== 20)

OR 表示只要满足任意一个条件即可，相当于 JavaScript 中的 || 运算符，例如 if(a !== 10 || a !== 20)

```sql
1 -- 使用 AND 来显示所有 status 为 0，并且 id 小于 1 的用户
2 SELECT * FROM user WHERE status=0 AND id>1
3 -- 使用 OR 来显示所有 status 为 1，或者 username 为 zs 的用户
4 SELECT * FROM user WHERE status=1 OR username='zs'
```

#### 3.7 ORDER BY 排序

ORDER BY 语句用于根据指定的列对结果集进行排序。

ORDER BY 语句**默认**按照升序对记录进行排序。

如果您希望按照**降序**对记录进行排序，可以使用 DESC 关键字。

```sql
1 -- ORDER BY 进行升序 ASC关键字代表升序
2 SELECT * FROM `user` ORDER BY status 
3 SELECT * FROM `user` ORDER BY status ASC
4 -- DESC 代表降序
5 SELECT * FROM `user` ORDER BY status DESC
6 -- 多重排序：先对status进行升序，再按照id数字进行降序 
7 SELECT * FROM `user` ORDER BY status ASC,id DESC
```

#### 3.8 COUNT(\*) 函数

COUNT(*) 函数用于返回查询结果的总数据条数

```sql
SELECT COUNT(*) FROM 表名称
```

#### 3.8 **AS** 为列设置别名

如果希望给查询出来的列名称设置别名，可以使用 AS 关键字。

```sql
1 -- 注意：使用 AS 设置的列名称为临时名称，不会修改原来的列名称
2 SELECT 列名称 AS 查询后的新列名 FROM 表名称
3 -- 示例：将查询出来的username和password列名称修改为name和pad
4 SELECT username AS name,password AS pad FROM `user`
```

### 4. 在项目中使用mysql模块

mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。

#### 4.1 安装mysql模块

```tex
1 npm install mysql
```

#### 4.2 配置mysql模块

```js
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
db.query('select 1', (err, res) => {
    if (err) return console.log(err.message);
    //打印的结果为[ RowDataPacket { '1':1 } ] 时，就证明数据库连接正常
    console.log(res);
})

```

#### 4.3 查询数据

```js
// 查询 user 表中的所有用户
const sqlStr = 'select * from user'
db.query(sqlStr, (err, res) => {
    //查询数据失败
    if (err) return console.log(err.message);
    //查询成功
    //注意：如果执行select查询语句，则执行的结果是数组
    console.log(res);
})
```

#### 4.4 新增数据

```js
// 向user表中，新增一条数据
//其中 username 的值为 Spider-Man, password 的值为pcc123
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
}) 
/*------------------------------------------------------------*/
// 插入数据的便捷方式
const user = { username: 'Spider-Man2', password: 'pcc321' }
//定义待执行的 sql 语句,其中英文的 ? 表示占位符
const sqlStr = "INSERT INTO user SET ?"
//执行 sql 语句,将数据对象当作占位符的值
db.query(sqlStr, user, (err, res) => {
    //插入数据失败
    if (err) return console.log(err.message);
    //插入数据成功
    //可以通过 affectedRows 属性来判断是否插入数据成功
    if (res.affectedRows === 1) console.log("插入数据成功!");
})
```

#### 4.5 更新数据

```js
// 更新数据
const user = { id: 7, username: 'aaa', password: '000' }
//要执行的 sql 语句
const sqlStr = 'update user set username=?,password=? where id=?'
//执行 sql 语句
db.query(sqlStr, [user.username, user.password, user.id], (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('更新数据成功');
})
/*-----------------------------------------------------*/
// 更新数据的便捷方式
const user = { id: 7, username: 'bbb', password: '111' }
//要执行的 sql 语句
const sqlStr = 'update user set ? where id=?'
//执行 sql 语句
db.query(sqlStr, [user, user.id], (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('更新数据成功');
})
```

#### 4.6 删除数据

```js
//删除数据
//要执行的 sql 语句
const sqlStr = 'delete from user where id=?'
//执行 sql 语句
db.query(sqlStr, 7, (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('删除数据成功');
})
```

#### 4.7 标记删除

使用 DELETE 语句，会把真正的把数据从表中删除掉。为了保险起见，**推荐使用**标记删除的形式，来**模拟删除的动作**。

所谓的标记删除，就是在表中设置类似于 **status** 这样的**状态字段**，来**标记**当前这条数据是否被删除。

当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，而是执行了 UPDATE 语句，将这条数据对应的 status 字段标记为删除即可。

```js
//标记删除
const sqlStr = 'update user set status= ? where id=?'
db.query(sqlStr, [1, 5], (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) console.log('标记删除成功');
})
```

