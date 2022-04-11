const db = require('./../../core/schemas')
const {QueryTypes} = require('sequelize')
const tables = require('./tableName')
class Post {
    constructor(name) {
        this.name = name
        this.tables = tables
        this.limit = 8
        this.offset = 0
        this.orderBy = 'DESC'
        this.orderKey = 'created_at'
        this.lang = 1
    }
    async showPublic(permalink){
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            response.data = await db.sequelize.query(`Select * from ${this.tables[this.name].main} 
                                               LEFT JOIN ${this.tables[this.name].meta}
                                               ON ${this.tables[this.name].main}.id = ${this.tables[this.name].meta}.post_id
                                               WHERE permalink = :permalink AND status = 'public'
                                               `,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    permalink: permalink
                }
            })
            return response
        }
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
    async getById(id){
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            response.data = await db.sequelize.query(`Select * from ${this.tables[this.name].main} 
            LEFT JOIN ${this.tables[this.name].meta}
            ON ${this.tables[this.name].main}.id = ${this.tables[this.name].meta}.post_id
            WHERE ${this.tables[this.name].main}.id = ${id}`,
            {
                type: QueryTypes.SELECT
            })
            return response
        }
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
    async getByTitles(titles, lang) {
        const response = {
            confirm: 'ok',
            data: []
        }
        if(titles.length === 0) return response
        try {
            const strTitles = titles.map(item => `'${item}'`).join(',')
            response.data = await db.sequelize.query(`Select * from ${this.tables[this.name].main} 
                                               WHERE ${this.tables[this.name].main}.title  In(${strTitles}) AND lang = ${lang}`,
            {
                type: QueryTypes.SELECT
            })
            return response
        }
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
    async publicPostsByArrId(arr, settings = {}) {
        const response = {
            confirm: 'ok',
            data: []
        }
        if(arr.length == 0) return response
        const orderKey = settings.orderKey || this.orderKey
        const orderBy = settings.orderBy || this.orderBy
        if(arr.length === 0) return response
        try {
            response.data = await db.sequelize.query(`Select * from ${this.tables[this.name].main} 
            LEFT JOIN ${this.tables[this.name].meta}
            ON ${this.tables[this.name].main}.id = ${this.tables[this.name].meta}.post_id
            WHERE ${this.tables[this.name].main}.id In(${arr.join(',')}) AND status = 'public'
            ORDER BY ${orderKey} ${orderBy}`,
            {
            type: QueryTypes.SELECT
            })
            return response
        }
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
    async postsByArrId(arr) {
        const response = {
            confirm: 'ok',
            data: []
        }
        if(arr.length === 0) return response
        try {
            response.data = await db.sequelize.query(`Select * from ${this.tables[this.name].main} 
            LEFT JOIN ${this.tables[this.name].meta}
            ON ${this.tables[this.name].main}.id = ${this.tables[this.name].meta}.post_id
            WHERE ${this.tables[this.name].main}.id In(${arr.join(',')})`,
            {
            type: QueryTypes.SELECT
            })
            return response
        }
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    }
    async show(permalink){
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
        response.data = await db.sequelize.query(`Select * from ${this.tables[this.name].main} 
                                               LEFT JOIN ${this.tables[this.name].meta}
                                               ON ${this.tables[this.name].main}.id = ${this.tables[this.name].meta}.post_id
                                               WHERE permalink = :permalink`,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    permalink: permalink
                }
            })
            return response
        } 
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
    async all(settings) {
        const limit = settings.limit || this.limit
        const offset = settings.offset || this.offset
        const orderBy = settings.orderBy || this.orderBy
        const orderKey = settings.orderKey || this.orderKey
        const lang = settings.lang || this.lang
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            response.data = await db.sequelize.query(`Select * from ${this.tables[this.name].main} 
            LEFT JOIN ${this.tables[this.name].meta}
            ON ${this.tables[this.name].main}.id = ${this.tables[this.name].meta}.post_id
            WHERE ${this.tables[this.name].main}.lang = ${lang}
            ORDER BY ${orderKey} ${orderBy}
            LIMIT ${limit}
            OFFSET ${offset}
            `,
           {type: QueryTypes.SELECT})
           return response
        }
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
    async allPublic(settings) {
        const limit = settings.limit || this.limit
        const offset = settings.offset || this.offset
        const orderBy = settings.orderBy || this.orderBy
        const orderKey = settings.orderKey || this.orderKey
        const lang = settings.lang || this.lang
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            response.data = await db.sequelize.query(`Select * from ${this.tables[this.name].main} 
            LEFT JOIN ${this.tables[this.name].meta}
            ON ${this.tables[this.name].main}.id = ${this.tables[this.name].meta}.post_id
            WHERE ${this.tables[this.name].main}.lang = ${lang} AND status = 'public'
            ORDER BY ${orderKey} ${orderBy}
            LIMIT ${limit}
            OFFSET ${offset}
            `,
           {type: QueryTypes.SELECT})
           return response
        }
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    }
    async count(lang) {
        const language = lang || this.lang
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            const data = await db.sequelize.query(`SELECT COUNT(id)
                                               FROM ${this.tables[this.name].main}
                                               WHERE lang = :lang`,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    lang: language
                }
            })
            response.data = data[0]['COUNT(id)'] 
            return response
        }
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
    static async adminSearch(lang, table, searchWord) {
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            response.data = await db.sequelize.query(`Select * from ${table} 
            WHERE lang = ${lang} 
            AND title LIKE '%${searchWord}%' `,
            {
            type: QueryTypes.SELECT
            })
            return response
        }
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
    static async search(lang, table, searchWord) {
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            response.data = await db.sequelize.query(`Select * from ${table} 
            WHERE lang = ${lang} 
            AND status = 'public'
            AND title LIKE '%${searchWord}%' `,
            {
            type: QueryTypes.SELECT
            })
            return response
        } catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
}
module.exports = Post