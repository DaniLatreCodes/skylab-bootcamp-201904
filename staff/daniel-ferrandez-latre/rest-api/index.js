const express = require('express')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')

const jsonParser = bodyParser.json()

const { argv: [, , port = 8000] } = process

const app = express()


app.post('/user', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req
    
    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.json({ message: 'Ok, user registered. '}))
            .catch(({ message }) => {
                res.status(400).json({ error: message})
            })
    } catch ({ message }) {
        res.status(400).json({ error: message})
    }
})

app.post('/auth', jsonParser, (req, res)=>{

    const {body: {email, password}} = req
    
    try {
        logic.authenticateUser(email, password)
            .then(token => {
                // debugger
                res.json(token)})
            .catch(({ message }) => {
                res.status(400).json({ error: message})
            })
    } catch ({ message }) {
        res.status(400).json({ error: message})
    }
})

app.get('/user', jsonParser, (req, res)=>{

    const { headers: {authorization} } = req
    const token = authorization.split(' ')[1]
    try {
        logic.retrieveUser(token)
            .then(user => {
                res.json(user)})
            .catch(({ message }) => {
                res.status(400).json({ error: message})
            })
    } catch ({ message }) {
        res.status(400).json({ error: message})
    }
})

app.get('/ducks/:query', jsonParser, (req, res)=>{
    

})

// TODO other routes

app.use(function (req, res, next) {
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))