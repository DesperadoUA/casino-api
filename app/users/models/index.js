const db = require('./../../../core/schemas')
const UsersModel = db.users

class Model {
    static async checkLogin(login, password) {
        const response = {
            data: [],
            confirm: 'ok'
        }
        try {
            response.data = await UsersModel.findAll({
                where: {
                    name: login,
                    password: password
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
    static async setToken(id, token) {
        const response = {
            data: [],
            confirm: 'ok'
        }
        try {
            UsersModel.update({remember_token: token}, {
                where:{id: id}
            })
            return response
        } catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
    static async checkSession(id, session) {
        const response = {
            data: [],
            confirm: 'ok'
        }
        try {
            response.data = await UsersModel.findAll({
                where: {
                    id: id,
                    remember_token: session
                }
            })
            return response
        } catch (error) {
            console.log(error)
            response.confirm = 'error'
            return response
        }
    } 
    static async store(data) {
        const response = {
            confirm: 'ok',
            data: []
        }
        try {
         response.data = await UsersModel.create(data)
         return response
        } 
        catch (error) {
         console.log(error)
         response.confirm = 'error'
         return response
       }
    }
}
module.exports = Model