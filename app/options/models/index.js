const db = require('./../../../core/schemas')
const Model = db.options
class OptionsModel {
    static async all(){
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            const posts = await Model.findAll({})
            response.data = posts
            return response
        }
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    }
    static async show(id) {
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            const posts = await Model.findAll({
                where: {
                    id: id
                }
            })
            response.data = posts
            return response
        }
        catch(error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    }
    static async update(data, id) {
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
            await Model.update(data, {where: {id: id} })
            return response
        } catch(error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    }
    static async bulkCreate(posts) {
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
          await Model.bulkCreate(posts)
          return response
        } 
        catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    }
    static async destroy() {
        const response = {
           confirm: 'ok',
           data: 0
       }
        try {
              await Model.destroy({
                 where: {},
                 truncate: true
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
module.exports = OptionsModel