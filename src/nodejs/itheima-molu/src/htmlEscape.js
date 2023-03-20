//定义转义 HTML 字符的函数
function htmlEscape(htmlStr) {
    return htmlStr?.replace(/<|>|"|&/g, math => {
        switch (math) {
            case '<':
                return "&lt;"
            case '>':
                return "&gt;"
            case '"':
                return '&quot;'
            case "&":
                return "&amp;"
        }
    })
}
//定义还原HTML方法
function htmlUnEscape(str) {
    return str?.replace(/&lt;|&gt;|&quot;|&amp;/g, math => {
        switch (math) {
            case '&lt;':
                return "<"
            case '&gt;':
                return ">"
            case '&quot;':
                return '"'
            case "&amp;":
                return "&"
        }
    })
}
module.exports = {
    htmlEscape,
    htmlUnEscape
}