const PostModel = require('./models')
const CardBuilder =  require('./CardBuilder')
const BaseService =  require('../../core/BaseService')
const store = require('../../store')
const tables = require('../../tables')

class Service extends BaseService {
    static async getPublicPostByUrl(url) {
        const response = {
            confirm: 'error',
            body: []
        }
        const {confirm, data} = await PostModel.showPublic(url)
        if(data.length !== 0 && confirm === 'ok') {
            response.confirm = 'ok'
            response.body = CardBuilder.show(data[0])
            //response.body.test = this.dataMainPages(data[0])
        }
        return response
    } 
    static async index(settings) {
        const response = {
            confirm: 'ok',
            body: []
        }
        
        const {confirm, data} = await PostModel.allPublic(settings)
        response.confirm = confirm
        response.body = CardBuilder.fetch(data)
        return response
    } 
    static async seeds() {
        const response = {
            confirm: 'ok',
            template: 'Page seeds'
        }
        const err = []
        const posts = []
        const faq = store.faq
        posts.push(Object.assign(store.pages.main.ru, {faq: JSON.stringify(faq)}))
        posts.push(Object.assign(store.pages.main.ua, {faq: JSON.stringify(faq)}))
        const createData = await PostModel.bulkCreate(posts)
        err.push(createData.confirm)
        
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    } 
    static async indexAdmin(settings) {
        const response = {
            confirm: 'error',
            body: [],
            total: 0,
            lang: _LANG[settings.lang]
        }
        const err = []
        
        const {confirm, data} = await PostModel.all(settings)
        response.body = data
        err.push(confirm)

        const countData = await PostModel.count(settings.lang)
        response.total = countData.data
        err.push(countData.confirm)

        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    } 
    static async getById(id) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const {confirm, data} = await PostModel.getById(id)
        if(data.length !== 0 && confirm === 'ok') {
            response.confirm = 'ok'
            response.body = CardBuilder.showAdmin(data[0])
        }
        return response
    } 
    static async update(data) {
        const response = {
            body: [],
            confirm: 'ok'
        }
        const err = []
        const dataSave = this.dataValidate(data)
        const dataMeta = this.dataValidateMetaSave(data)
        const dataResult = Object.assign(dataSave, dataMeta)
        const dataUpdate = await PostModel.update(dataResult, data.id)
        err.push(dataUpdate.confirm)
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    } 
    static async destroy(){
        const response = {
            body: [],
            confirm: 'ok'
        }
        const err = []
        const {confirm} = await PostModel.destroy()
        err.push(confirm)
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
    static dataValidateMetaSave(data) {
        let newData = {}
        newData.faq = data.faq ? JSON.stringify(data.faq) : JSON.stringify([])
        return newData
    } 
    static dataMainPages(data) {
        const CASINO_TABLE = ''
        const MainModel = new PostModel(TABLE)
        return {test: 'test object', lang: data.lang}
    }
}
module.exports = Service