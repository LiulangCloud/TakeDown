## 安装

```
npm install itheima-tools

```
## 导入

```js

const itheima = require('itheima-tools')

```

## 格式化时间

```js

//调用 dateFormat 对时间进行格式化

const dtStr = itheima.dateFormat(new Date())

//结果 2020-04-03 11:20:30

console.log(dtStr)

```
## 转义 HTML 中的特殊字符

```js

//待转换的 HTML 字符串

const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'

//调用htmlEscape方法进行转换

const str = ith.htmlEscape(htmlStr)

//转换结果：&lt;h1 title=&quot;abc&quot;&gt;这是h1标签&lt;span&gt;123&amp;nbsp;&lt;/span&gt;&lt;/h1&gt;

console.log(str);

```

## 还原 HTML 中的特殊字符

```js

//待还原的 HTML 字符串,调用htmlEscape方法进行转换

const str2 = ith.htmlEscape(str)

//转换结果：<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>

console.log(str2);

```

## 开源协议
ISC