const CardBuilder =  require('./CardBuilder')
const Model = require('./models')
const store = require('./../../core/store')
class Service {
    static async index() {
        const response = {
            confirm: 'ok',
            body: []
        }
        const {confirm, data} = await Model.all()
        response.confirm = confirm
        response.body = CardBuilder.fetch(data)
        return response
    }
    static async seeds() {
        const response = {
            confirm: 'ok',
            body: []
        }
        const posts = [
            store.options.logo
        ]
        const {confirm} = await Model.bulkCreate(posts)
        response.confirm = confirm
        return response
    }
    static async indexAdmin() {
        const response = {
            confirm: 'ok',
            body: [],
        }
        const {confirm, data} = await Model.all()
        response.confirm = confirm
        response.body = CardBuilder.adminFetch(data)
        return response
    }
    static async update(data) {
        const response = {
            confirm: 'ok',
            body: []
        }
        const {confirm} = await Model.update(CardBuilder.update(data), data.id)
        response.confirm = confirm
        return response
    }
    static async show(id) {
        const response = {
            confirm: 'ok',
            body: []
        }
        const {confirm, data} = await Model.show(id)
        if(data.length === 0 || confirm === 'error') response.confirm = 'error'
        else response.body = CardBuilder.show(data[0])
        return response
    }
    static async destroy(){
        const response = {
            body: [],
            confirm: 'ok'
        }
        const err = []
        const {confirm} = await Model.destroy()
        err.push(confirm)
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
}
module.exports = Service