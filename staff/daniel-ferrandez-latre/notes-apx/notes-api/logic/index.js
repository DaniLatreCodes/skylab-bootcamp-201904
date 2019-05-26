const validate = require('../common/validate')
const { LogicError, FormatError } = require('../common/errors')
const userData = require('../data/user-data')
const  {UserData}  = require('../models/index')

const logic = {
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
            // { name: 'age', value: age, type: 'number', notEmpty: true }
            // { name: 'notes', value: notes, type: 'array', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await UserData.find({email})

            if (users.length) throw new LogicError(`user with email "${email}" already exists`)

            try{
                const userCreated = await UserData.create({name, surname, email, password})
                return userCreated
            }
            catch(error){
                console.log('Create' + error)
            }
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await UserData.find({email})
            debugger
            if (!user) throw new LogicError(`user with email "${email}" does not exist`)

            // const [user] = users

            if (user.password !== password) throw new LogicError('wrong credentials')

            return user.id.toString()
        })()
    },

}

module.exports = logic