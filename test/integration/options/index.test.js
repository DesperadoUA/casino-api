const request = require('supertest')
const app = require('../../../app')
const store = require('../../../core/store')

describe('Options', () => {

    let session = ''
    let currentUserId = 0

    beforeAll( async()=> {
        const {user} = store
        const response = await request(app).post('/api/admin/login').send({
            password: user.password,
            login: user.name
        })
        session = response.body.body.session
        currentUserId = response.body.body.id
    })
 
    it('DTO destroy', async()=>{
        const response = await request(app).get('/api/options/destroy')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it('DTO seeds', async()=>{
        const response = await request(app).get('/api/options/seeds')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it('DTO index', async()=>{
        const response = await request(app).get('/api/options')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body).toHaveProperty('body')
        expect(Array.isArray(response.body.body)).toBe(true)
    })
    it('DTO admin index ru', async()=>{
        const response = await request(app).post('/api/admin/options').send({
            id: currentUserId,
            lang: 1,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(Array.isArray(response.body.body)).toBe(true)
    })
    it('DTO admin update', async()=>{
        const response = await request(app).post('/api/admin/options/update').send({
             data: {
                editor: store.options.logo.editor,
                id: 1,
                key_id: store.options.logo.key_id,
                title: store.options.logo.title,
                value: store.options.logo.updateValue
            },
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it('DTO options id=1', async()=>{
        const response = await request(app).post('/api/admin/options/1').send({
            id: currentUserId,
            session: session,
            url: 1
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body.body.editor).toBe(store.options.logo.editor)
        expect(response.body.body.id).toBe(1)
        expect(response.body.body.key_id).toBe(store.options.logo.key_id)
        expect(response.body.body.title).toBe(store.options.logo.title)
        expect(response.body.body.value).toBe(store.options.logo.updateValue)
    })
})
describe('Options fail auth', () => {
    let session = 'error'
    let currentUserId = 0
    it('Admin index', async()=>{
        const response = await request(app).post('/api/admin/options').send({
            id: currentUserId,
            lang: 1,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it('Admin update', async()=>{
        const response = await request(app).post('/api/admin/options/update').send({
            data: {
                editor: store.options.logo.editor,
                id: 1,
                key_id: store.options.logo.key_id,
                title: store.options.logo.title,
                value: store.options.logo.updateValue
            },
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it('Admin options id=1', async()=>{
        const response = await request(app).post('/api/admin/options/1').send({
            id: currentUserId,
            session: session,
            url: 1
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
})

