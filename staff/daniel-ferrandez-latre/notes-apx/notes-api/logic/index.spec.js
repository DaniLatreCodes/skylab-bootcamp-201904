require('dotenv').config()
const logic = require('.')
const { LogicError, RequirementError, ValueError, FormatError } = require('../common/errors')
require('../common/utils/object-matches.polyfill')
require('../common/utils/array-random.polyfill')
const mongoose = require('mongoose')
const {UserData} = require('../models')


const  { MONGO_URL_LOGIC_TEST : url }  = process.env

describe('logic', () => {
    
    beforeAll(async () => {
        console.log(url)
        try{
            debugger
            await mongoose.connect(url, { useNewUrlParser: true })
            debugger
        }catch(err){
            console.log('Error de conexión')
        }
    })
    
    const name = 'Manuel'
    const surname = 'Barzi'
    let email
    const password = '123'
    let age
    let notes = [1,1,1,1]

    beforeEach(async () => {
        await UserData.deleteMany()

        email = `manuelbarzi-${Math.random()}@gmail.com`
        age = Math.floor( Math.random() * 100)
    })

    describe('users', () => {
        describe('register user', () => {
            it('should succeed on correct user data', async () => {
                const res = await logic.registerUser(name, surname, email, password, age)

                expect(res).toBeDefined()

                const userDb = await UserData.find({email })

                expect(userDb).toBeDefined()
                // expect(userDb).toHaveLength(1)
            })

            describe('on already existing user', () => {
                beforeEach(() => UserData.create({ name, surname, email, password }))

                it('should fail on retrying to register', async () => {
                    try {
                        await logic.registerUser(name, surname, email, password)

                        throw Error('should not reach this point')
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)

                        expect(error.message).toBe(`user with email "${email}" already exists`)
                    }
                })
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

            // TODO password fail cases
        })

        describe('authenticate user', () => {
            beforeEach(() =>
            
                UserData.registerUser({ name, surname, email, password })
            )

            it('should succeed on correct user credential', async () => {
                const id = await logic.authenticateUser(email, password)
                debugger
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)
            })

            it('should fail on non-existing user', async () => {
                try {
                    await logic.authenticateUser(email = 'unexisting-user@mail.com', password)

                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)

                    expect(error.message).toBe(`user with email "${email}" does not exist`)
                }
            })
        })

        describe('retrieve user', () => {
            let id

            beforeEach(async () => {
                await userData.create({ name, surname, email, password })

                const users = await userData.find(user => user.email === email)

                id = users[0]._id.toString()
            })

            it('should succeed on correct user id from existing user', async () => {
                const user = await logic.retrieveUser(id)

                expect(user.id).toBeUndefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.password).toBeUndefined()
            })

            it('should fail on unexisting user id', async () => {
                id = '01234567890123456789abcd'

                try {
                    await logic.retrieveUser(id)

                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()

                    expect(error).toBeInstanceOf(LogicError)

                    expect(error.message).toBe(`user with id "${id}" does not exist`)
                }
            })
        })



    afterAll(() => client.close(true))
})

})