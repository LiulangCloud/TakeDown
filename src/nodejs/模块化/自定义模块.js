const user = {
    "name": "张三",
    "age": 18
}

module.exports.username = 'zs'
module.exports.sayHello = function () {
    console.log('hello');
}
module.exports.user = user

// 让module.exports指向一个全新的对象
module.exports = {
    name:'ls',
    age:30,
    sayHi:()=>{
        console.log('hi!!');
    }
}