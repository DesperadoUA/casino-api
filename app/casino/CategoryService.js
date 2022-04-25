const PostModel = require('../../core/models/Post')
const CategoryModel = require('./models/category')
const RelativeModel = require('../../core/models/Relative')
const CardBuilder =  require('./CardBuilder')
const BaseService =  require('../../core/BaseService')
const store = require('../../core/store')
const settings = require('./settings')

const TABLE = settings.config.table
const LIMIT_RELATIVE = 10000
class Service extends BaseService {
    static async getPublicPostByUrl(url) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []
        const categoryModel = new CategoryModel(TABLE)
        const {data, confirm} = await categoryModel.showPublic(url)
        err.push(confirm)
        if(data.length !== 0 && confirm === 'ok') {
            const relativeModel = new RelativeModel(TABLE)
            const postModel = new PostModel(TABLE)
            
            const relativeData = await relativeModel.getPosts(data[0].id)
            err.push(relativeData.confirm)
            const posts = await postModel.publicPostsByArrId(relativeData.data, {orderKey: settings.config.keySort})
            err.push(posts.confirm)
            
            response.confirm = err.includes('error') ? 'error' : 'ok'
            response.body = Object.assign(CardBuilder.singleCategory(data[0]), {posts: CardBuilder.fetch(posts.data)})
        }
        return response
    } 
    static async index(settings) {
        const categoryModel = new CategoryModel(TABLE)
        const {data, confirm} = await categoryModel.allPublic(settings)
        return {
            confirm: confirm,
            body: CardBuilder.category(data)
        }
    } 
    static async seeds(numberPosts =10) {
        const response = {
            confirm: 'ok',
            template: 'Category seeds'
        }
        const posts = []
        const faq = store.faq
        for(let i=0; i<numberPosts; i++) {
            posts.push(
                {
                    permalink: `category-${i}`,
                    title: `Title category-${i}`,
                    thumbnail: `Thumbnail category-${i}`,
                    short_desc: `Short desc category-${i}`,
                    h1: `H1 category-${i}`,
                    meta_title: `Meta title category-${i}`,
                    description: `Description category-${i}`,
                    keywords: `Keywords category-${i}`,
                    content: `Content category-${i}`,
                    faq: JSON.stringify(faq)
                }
            )
        }
        const {confirm} = await CategoryModel.bulkCreate(posts)
        response.confirm = confirm
        return response
    } 
    static async indexAdmin(settings) {
        const response = {
            confirm: 'ok',
            body: [],
            total: 0,
            lang: _LANG[settings.lang]
        }
        const err = []
        const categoryModel = new CategoryModel(TABLE)
        const categoryData = await categoryModel.all(settings)
        err.push(categoryData.confirm)
        response.body = categoryData.data
        const countData = await categoryModel.count(settings.lang)
        err.push(countData.confirm)
        response.total = countData.data
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    } 
    static async getById(id) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []
        const MainModel = new CategoryModel(TABLE)
        const {data, confirm} = await MainModel.getById(id)
        if(data.length !== 0 && confirm === 'ok') {
            err.push(confirm)
            response.body = CardBuilder.singleAdminCategory(data[0])
            const settings = {
                lang: data[0].lang,
                limit: LIMIT_RELATIVE
            }
            const allCategory = await MainModel.all(settings)
            err.push(allCategory.confirm)
            const relativeCategory = await MainModel.getById(data[0].parent_id)
            err.push(relativeCategory.confirm)
            
            response.body.relative_category = {
                all_value: CardBuilder.getTitles(allCategory.data),
                current_value: CardBuilder.getTitles(relativeCategory.data)
            }
            response.confirm = err.includes('error') ? 'error' : 'ok'
        }
        return response
    } 
    static async store(data, table) {
        const response = {
            body: [],
            confirm: 'ok'
        }
        const err = []
        const dataSave = await this.dataValidateInsertCategory(data, table)
        err.push(dataSave.confirm)
        const insertData = await CategoryModel.create(dataSave.data)
        err.push(insertData.confirm)
        response.insert_id = insertData.data.dataValues.id
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    } 
    static async update(data, table) {
        const response = {
            body: [],
            confirm: 'ok'
        }
        const err = []
        const dataSave = await this.dataValidateSaveCategory(data, table)
        err.push(dataSave.confirm)
        const dataUpdate = await CategoryModel.update(dataSave.data, data.id)
        err.push(dataUpdate.confirm)
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    } 
    static async delete(id) {
        const response = {
            confirm: 'ok',
            body: {}
        }
        const err = []
        const dataDelete = await CategoryModel.delete(id)
        err.push(dataDelete.confirm)
        const updateParentId = await CategoryModel.setParentIdDefault(id)
        err.push(updateParentId.confirm)
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    } 
}
module.exports = Service