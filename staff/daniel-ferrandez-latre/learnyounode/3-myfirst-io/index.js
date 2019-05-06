const [,,rute] = process.argv
let fs = require('fs')

let arr = fs.readFileSync(rute)

arr = arr.toString().split('\n')

console.log(arr.length - 1)