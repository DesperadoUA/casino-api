const CardBuilder =  require('./CardBuilder')
const Model = require('./models')
const store = require('../../store')

class Service {
    static async index(lang) {
        const response = {
            confirm: 'ok',
            body: []
        }
        const {confirm, data} = await Model.all(lang)
        response.confirm = confirm
        response.body = CardBuilder.fetch(data)
        return response
    }
    static async seeds() {
        const response = {
            confirm: 'ok',
            body: []
        }
        const {faq, menu, multipleMenu} = store
        const posts = [
            store.settings.text,
            store.settings.rich_text,
            Object.assign(store.settings.multiple_menu, {value: JSON.stringify(multipleMenu)}),
            Object.assign(store.settings.two_input_image, {value: JSON.stringify(menu)}),
            Object.assign(store.settings.input_text, {value: JSON.stringify(faq)})
        ]
        const {confirm} = await Model.bulkCreate(posts)
        response.confirm = confirm
        return response
    }
    static async indexAdmin(lang) {
        const response = {
            confirm: 'ok',
            body: [],
            lang: _LANG[lang]
        }
        const {confirm, data} = await Model.all(lang)
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