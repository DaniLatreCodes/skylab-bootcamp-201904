const file = require('../../common/utils/file')
const path = require('path')
const uuid = require('uuid/v4')
const validate = require('../../common/validate')
const { ValueError } = require('../../common/errors')

const userData = {
    col: null, 

    async __load__() {

        if(this.__users__) 
        return this.__users__

        else{

        const content = await file.readFile(this.__file__, 'utf8')
        users = JSON.parse(content)
        
        return this.__users__ = users
        }
    },

    __save__() {
        return file.writeFile(this.__file__, JSON.stringify(this.__users__))
    },

    create(user) {
        validate.arguments([
            { name: 'user', value: user, type: 'object', optional: false }
        ])
        return (async ()=> { await this.col.insertOne(user) })()
    },

    list() {
        return this.__load__()

    },

    retrieve(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true, optional: false }
        ])

        return (async ()=> {
            const users = await this.__load__()
            return users.find(({ id: _id }) => _id === id)})()
    },

    find(criteria) {
        validate.arguments([
            { name: 'criteria', value: criteria, type: 'function', notEmpty: true, optional: false }
        ])

        return (async ()=> {
            const users = await this.__load__()
            return users.filter(criteria)})()
    },

    update(id, data, replace) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object' },
            { name: 'replace', value: replace, type: 'boolean', optional: true }
        ])

        if (data.id && id !== data.id) throw new ValueError('data id does not match criteria id')

        return (async () => {
            const users = await this.__load__()
            
                const user = users.find(({ id: _id }) => _id === id)

                if (replace)
                    for (const key in user)
                        if (key !== 'id') delete user[key]

                for (const key in data) user[key] = data[key]

                return await this.__save__()
        })()
    }
}

module.exports = userData