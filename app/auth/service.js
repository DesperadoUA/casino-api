const CardBuilder =  require('../users/CardBuilder')
const UsersModel = require('../users/models')
const crypto = require("crypto")
class Service {
    static async login(login, password) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []
        const candidate = await UsersModel.checkLogin(login, password)
        if(candidate.data.length !== 0 && candidate.confirm === 'ok') {
            err.push(candidate.confirm)
            const token = crypto.randomBytes(16).toString("hex")
            const setToken = await UsersModel.setToken(candidate.data[0].id, token)
            err.push(setToken.confirm)
            candidate.data[0].remember_token = token
            response.body = CardBuilder.user(candidate.data[0])
            response.confirm = err.includes('error') ? 'error' : 'ok'
        }
        return response
    }
    static async logout(id, session) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []
        const candidate = await UsersModel.checkSession(id, session)
        if(candidate.data.length !== 0 && candidate.confirm === 'ok') {
            err.push(candidate.confirm)
            const setToken = await UsersModel.setToken(candidate.data[0].id, '')
            err.push(setToken.confirm)
            response.confirm = err.includes('error') ? 'error' : 'ok'
        }
        return response
    }
    static async checkUser(id, session) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const candidate = await UsersModel.checkSession(id, session)
        if(candidate.data.length !== 0 && candidate.confirm === 'ok') response.confirm = 'ok'
        return response
    }
    static async store(data) {
        const response = {
            confirm: 'error',
            body: {}
        }
        const err = []
        const candidate = await UsersModel.checkLogin(data.name, data.password)
        err.push(candidate.confirm)
        if(candidate.data.length === 0 && candidate.confirm === 'ok' && _NODE_ENV === 'test') {
            const {confirm} = await UsersModel.store(data)
            err.push(confirm)
            response.confirm = err.includes('error') ? 'error' : 'ok'
            return response
        } else {
            response.confirm =  err.includes('error') ? 'error' : 'ok'
            return response
        }
    }
}
module.exports = Service