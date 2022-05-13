const PageModel = require('./models')
const PostModel = require('./../../core/models/Post')
const CardBuilder =  require('./CardBuilder')
const CasinoCardBuilder = require('../../app/casino/CardBuilder')
const GameCardBuilder = require('../../app/game/CardBuilder')
const BonusCardBuilder = require('../../app/bonus/CardBuilder')
const ArticleCardBuilder = require('../../app/article/CardBuilder')
const PaymentCardBuilder = require('../../app/payment/CardBuilder')
const LicenseCardBuilder = require('../../app/license/CardBuilder')
const VendorCardBuilder = require('../../app/vendor/CardBuilder')
const BaseService =  require('../../core/BaseService')
const store = require('../../store')
const NUMBER_CASINO_MAIN_PAGE = 15
const NUMBER_GAME_MAIN_PAGE = 15
const NUMBER_BONUS_MAIN_PAGE = 10
const NUMBER_POST_CASINO_PAGE = 2000
const NUMBER_POST_BONUS_PAGE = 2000
const NUMBER_POST_GAME_PAGE = 2000
const NUMBER_POST_ARTICLE_PAGE = 2000
const NUMBER_POST_PAYMENT_PAGE = 2000
const NUMBER_POST_LICENSE_PAGE = 2000
const NUMBER_POST_VENDOR_PAGE = 2000

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
            else if(url === 'casino') {
                const {body, confirm} = await this.dataCasinoPages(data[0]) 
                err.push(confirm) 
                supportData = body
            }
            else if(url === 'bonus') {
                const {body, confirm} = await this.dataBonusPages(data[0]) 
                err.push(confirm) 
                supportData = body
            }
            else if(url === 'game') {
                const {body, confirm} = await this.dataGamePages(data[0]) 
                err.push(confirm) 
                supportData = body
            }
            else if(url === 'article') {
                const {body, confirm} = await this.dataArticlePages(data[0]) 
                err.push(confirm) 
                supportData = body
            }
            else if(url === 'payment') {
                const {body, confirm} = await this.dataPaymentPages(data[0]) 
                err.push(confirm) 
                supportData = body
            }
            else if(url === 'license') {
                const {body, confirm} = await this.dataLicensePages(data[0]) 
                err.push(confirm) 
                supportData = body
            }
            else if(url === 'vendor') {
                const {body, confirm} = await this.dataVendorPages(data[0]) 
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
        response.body.games = await GameCardBuilder.mainCard(games.data)

        const BonusModel = new PostModel('BONUS')
        const bonusSettingsQuery = {limit: NUMBER_BONUS_MAIN_PAGE, lang: data.lang}
        const bonuses = await BonusModel.allPublic(bonusSettingsQuery)
        err.push(bonuses.confirm) 
        response.body.bonuses = await BonusCardBuilder.mainCard(bonuses.data)
        
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
    static async dataCasinoPages(data) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []

        const CasinoModel = new PostModel('CASINO')
        const casinoSettingsQuery = {limit: NUMBER_POST_CASINO_PAGE, orderKey: 'rating', lang: data.lang}
        const casinos = await CasinoModel.allPublic(casinoSettingsQuery)
        err.push(casinos.confirm) 
        response.body.casinos = await CasinoCardBuilder.mainCard(casinos.data)

        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
    static async dataBonusPages(data) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []

        const BonusModel = new PostModel('BONUS')
        const bonusSettingsQuery = {limit: NUMBER_POST_BONUS_PAGE, lang: data.lang}
        const bonuses = await BonusModel.allPublic(bonusSettingsQuery)
        err.push(bonuses.confirm) 
        response.body.bonuses = await BonusCardBuilder.mainCard(bonuses.data)

        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
    static async dataGamePages(data) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []

        const GameModel = new PostModel('GAME')
        const gameSettingsQuery = {limit: NUMBER_POST_GAME_PAGE, orderKey: 'rating', lang: data.lang}
        const games = await GameModel.allPublic(gameSettingsQuery)
        err.push(games.confirm) 
        response.body.games = await GameCardBuilder.mainCard(games.data)

        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
    static async dataArticlePages(data) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []

        const ArticleModel = new PostModel('ARTICLE')
        const articleSettingsQuery = {limit: NUMBER_POST_ARTICLE_PAGE, lang: data.lang}
        const articles = await ArticleModel.allPublic(articleSettingsQuery)
        err.push(articles.confirm) 
        response.body.articles = await ArticleCardBuilder.mainCard(articles.data)

        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
    static async dataPaymentPages(data) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []

        const PaymentModel = new PostModel('PAYMENT')
        const paymentSettingsQuery = {limit: NUMBER_POST_PAYMENT_PAGE, lang: data.lang}
        const payments = await PaymentModel.allPublic(paymentSettingsQuery)
        err.push(payments.confirm) 
        response.body.payments = await PaymentCardBuilder.mainCard(payments.data)

        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
    static async dataLicensePages(data) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []

        const LicenseModel = new PostModel('LICENSE')
        const licenseSettingsQuery = {limit: NUMBER_POST_LICENSE_PAGE, lang: data.lang}
        const licenses = await LicenseModel.allPublic(licenseSettingsQuery)
        err.push(licenses.confirm) 
        response.body.licenses = await LicenseCardBuilder.mainCard(licenses.data)

        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
    static async dataVendorPages(data) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []

        const VendorModel = new PostModel('VENDOR')
        const vendorSettingsQuery = {limit: NUMBER_POST_VENDOR_PAGE, lang: data.lang}
        const vendors = await VendorModel.allPublic(vendorSettingsQuery)
        err.push(vendors.confirm) 
        response.body.vendors = await VendorCardBuilder.mainCard(vendors.data)

        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
}
module.exports = Service