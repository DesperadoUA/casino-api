const PageModel = require('./models')
const PostModel = require('./../../core/models/Post')
const CardBuilder =  require('./CardBuilder')
const CasinoCardBuilder = require('../../app/casino/CardBuilder')
const BaseService =  require('../../core/BaseService')
const store = require('../../store')
const NUMBER_CASINO_MAIN_PAGE = 15
const NUMBER_GAME_MAIN_PAGE = 15
const NUMBER_BONUS_MAIN_PAGE = 10

class Service extends BaseService {
    static async getPublicPostByUrl(url) {
        const response = {
            confirm: 'error',
            body: []
        }
        const {confirm, data} = await PageModel.showPublic(url)
        if(data.length !== 0 && confirm === 'ok') {
            const err = []
            response.body = CardBuilder.show(data[0])
            let supportData = {}
            if(url === 'main') {
                const {body, confirm} = await this.dataMainPages(data[0]) 
                err.push(confirm) 
                supportData = body
            }
            response.body = Object.assign({}, response.body, supportData)
            response.confirm = err.includes('error') ? 'error' : 'ok'
        }
        return response
    } 
    static async index(settings) {
        const response = {
            confirm: 'ok',
            body: []
        }
        
        const {confirm, data} = await PageModel.allPublic(settings)
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
        const createData = await PageModel.bulkCreate(posts)
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
        
        const {confirm, data} = await PageModel.all(settings)
        response.body = data
        err.push(confirm)

        const countData = await PageModel.count(settings.lang)
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
        const {confirm, data} = await PageModel.getById(id)
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
        const dataUpdate = await PageModel.update(dataResult, data.id)
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
        const {confirm} = await PageModel.destroy()
        err.push(confirm)
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
    static dataValidateMetaSave(data) {
        let newData = {}
        newData.faq = data.faq ? JSON.stringify(data.faq) : JSON.stringify([])
        return newData
    } 
    static async dataMainPages(data) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []

        const CasinoModel = new PostModel('CASINO')
        const casinoSettingsQuery = {limit: NUMBER_CASINO_MAIN_PAGE, orderKey: 'rating', lang: data.lang}
        const casinos = await CasinoModel.allPublic(casinoSettingsQuery)
        err.push(casinos.confirm) 
        response.body.casinos = await CasinoCardBuilder.mainCard(casinos.data)

        const GameModel = new PostModel('GAME')
        const gameSettingsQuery = {limit: NUMBER_GAME_MAIN_PAGE, orderKey: 'rating', lang: data.lang}
        const games = await GameModel.allPublic(gameSettingsQuery)
        err.push(games.confirm) 
        response.body.games = games.data

        const BonusModel = new PostModel('BONUS')
        const bonusSettingsQuery = {limit: NUMBER_BONUS_MAIN_PAGE, lang: data.lang}
        const bonuses = await BonusModel.allPublic(bonusSettingsQuery)
        err.push(bonuses.confirm) 
        response.body.bonuses = bonuses.data
        
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
}
module.exports = Service