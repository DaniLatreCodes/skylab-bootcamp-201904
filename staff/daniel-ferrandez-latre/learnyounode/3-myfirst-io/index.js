const fs = require('fs')

const { argv: [, , path] } = process

debugger


const content = fs.readFileSync(path, 'utf8')

const lines = content.match(/\n/g).length

console.log(lines)