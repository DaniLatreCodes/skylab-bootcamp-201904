const [,,rute, extension] = process.argv
let fs = require('fs')
let path = require('path');


fs.readdir(rute, (err, files) => {
  debugger
  let result = files.filter((file)=> {
    debugger
    return path.extname(file) === '.' + extension
  })
  result.forEach(name => console.log(name))
});







