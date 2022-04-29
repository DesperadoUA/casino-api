const db = require('./../../core/schemas')
const {QueryTypes} = require('sequelize')
const tables = require('../../tables')
class Relative {
    constructor(name, relative = 'category') {
        this.name = name
        this.tables = tables
        this.relative = relative
    }
    async getPosts(relativeId) {
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            const data = await db.sequelize.query(`Select post_id from ${this.tables[this.name].relative[this.relative]}
            WHERE relative_id = :relativeId`,
            {
                type: QueryTypes.SELECT,
                replacements: {
                relativeId: relativeId
                }
            })
            const arr = []
            data.forEach(element => arr.push(element.post_id))
            response.data = arr
            return response
        } 
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    }
    async getRelatives(postId){
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            const data = await db.sequelize.query(`Select relative_id from ${this.tables[this.name].relative[this.relative]}
                                                WHERE post_id = :postId`,
                {
                    type: QueryTypes.SELECT,
                    replacements: {
                        postId: postId
                    }
                })
            const arr = []
            data.forEach(element => arr.push(element.relative_id))
            response.data = arr
            return response
       }
       catch (error) {
         console.log(error)
         response.confirm = 'error'
         return response
       }
    }
    async destroyByPostId(postId) {
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            await db.sequelize.query(`Delete from ${this.tables[this.name].relative[this.relative]}
                                                WHERE post_id = :postId`,
                {
                    type: QueryTypes.DELETE,
                    replacements: {
                        postId: postId
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
    async bulkCreate(arr) {
        const response = {
            confirm: 'ok',
            data: []
        }
        const strQuery = arr.map(item => `(${item.post_id}, ${item.relative_id})`).join(',')
        try {
            await db.sequelize.query(`INSERT INTO ${this.tables[this.name].relative[this.relative]}
                                    (post_id, relative_id) 
                                    VALUES  ${strQuery}`,
            {
                type: QueryTypes.INSERT,
            })
            return response
        } 
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    }
}
module.exports = Relative