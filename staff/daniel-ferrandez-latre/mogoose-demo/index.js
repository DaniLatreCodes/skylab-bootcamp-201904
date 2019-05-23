
// require('dotenv').config()

let mongoose = require('mongoose')
let validator = require('validator')
// const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
// const database = 'fcc-Mail';      // REPLACE WITH YOUR DB NAME

const { env: { PORT, MONGO_URL_MONGOOSE_TEST: url }, argv: [, , port = PORT || 8080], } = process;

class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(`mongodb://localhost/rest-api-mongoose-test`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

const db =  new Database()

let emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  }
})


let EmailModel = mongoose.model('Email', emailSchema)

const ranNum = Math.floor(Math.random() * 1000) 

let msg = new EmailModel({
  email: `ada.lovelace${ranNum}@gmail.com`
})



msg.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })


   EmailModel
  .find({
    email: 'ada.lovelace@gmail.com'   // search query
  })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })


  EmailModel
  .findOneAndUpdate(
    {
      email: 'theoutlander@live.com'  // search query
    }, 
    {
      email: 'theoutlaaaaaaaander@live.com'   // field:values to update
    },
    {
      new: true,                       // return updated doc
      runValidators: true              // validate before update
    })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })