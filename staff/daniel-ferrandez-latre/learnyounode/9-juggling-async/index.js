const http = require('http')
const cs = require('concat-stream')
const after = require('after')
const { argv: [, , ...urls] } = process

let result = [null, null, null]
for (let i = 0; i < 3; i++) {
  http.get(urls[i], res => {
    res.pipe(cs(content => {
      debugger
      const url = urls[i];
      result[i] = content.toString();
      if (result.every(item => typeof item === 'string')) {
        result.forEach(item => console.log(item))
      }
    }))
  })
}
