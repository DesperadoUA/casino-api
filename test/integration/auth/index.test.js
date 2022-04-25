const request = require('supertest')
const crypto = require("crypto")
const app = require('../../../app')
const store = require('../../../store')

describe('Auth', () => {
    const {user} = store
    let session = ''
    let currentUserId = 0
    it('DTO page create-user', async()=>{
        const data = {
            name: user.name,
            email: user.email,
            role: user.role,
            password: crypto.createHash('md5').update(user.password).digest('hex')
        }
        const response = await request(app)
                         .post('/api/admin/create-user')
                         .send(data)
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    }) 
    it('DTO page login true', async()=>{
        const {user} = store
        const response = await request(app).post('/api/admin/login').send({
            password: user.password,
            login: user.name
        })
        session = response.body.body.session
        currentUserId = response.body.body.id
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body.body).toHaveProperty('id')
        expect(response.body.body).toHaveProperty('session')
        expect(response.body.body).toHaveProperty('role', 'admin')
    }) 
    it('DTO page check-user', async()=>{
        const response = await request(app).post('/api/admin/check-user').send({
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    }) 
    it('DTO page logout', async()=>{
        const response = await request(app).post('/api/admin/logout').send({
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
})
describe('Auth fail', () => {
    let session = 'error'
    let currentUserId = 0
    it('Page login', async()=>{
        const {user} = store
        const response = await request(app).post('/api/admin/login').send({
            password: user.password+'error',
            login: user.name
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    }) 
    it('Page check-user', async()=>{
        const response = await request(app).post('/api/admin/check-user').send({
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it('DTO page logout', async()=>{
        const response = await request(app).post('/api/admin/logout').send({
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })  
})