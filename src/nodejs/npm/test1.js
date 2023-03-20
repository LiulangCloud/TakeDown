const TIME = require('./dateFormat')

const dt = new Date()

const newDT = TIME.dateFormat(dt)

console.log(newDT);