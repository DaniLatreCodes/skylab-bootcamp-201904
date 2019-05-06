const [,,rute, extension] = process.argv
function myModule(url, extension, callback){

fs.readdir(url, (files) => {
  let result = files.filter((file)=> {
    return path.extname(file) === '.' + extension
  })
});
}

module.exports = myModule;