const request = require('supertest')
const app = require('../../../app')
const store = require('../../../core/store')

describe('Settings', () => {
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
        const response = await request(app).get('/api/settings/destroy')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it('DTO seeds', async()=>{
        const response = await request(app).get('/api/settings/seeds')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it('DTO index', async()=>{
        const response = await request(app).get('/api/settings')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body).toHaveProperty('body')
        expect(Array.isArray(response.body.body)).toBe(true)
    })
    it('DTO admin index ru', async()=>{
        const response = await request(app).post('/api/admin/settings').send({
            id: currentUserId,
            lang: 1,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(Array.isArray(response.body.body)).toBe(true)
    })
    it('DTO admin index ua', async()=>{
        const response = await request(app).post('/api/admin/settings').send({
            id: currentUserId,
            lang: 2,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(Array.isArray(response.body.body)).toBe(true)
    })
    it('DTO admin update', async()=>{
        const response = await request(app).post('/api/admin/settings/update').send({
            data: {
                editor: 'input',
                id: 1,
                key_id: 'text',
                title: 'Текстовый редактор Input',
                value: store.settings.text.updateValue
            },
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it('DTO settings id=1', async()=>{
        const response = await request(app).post('/api/admin/settings/1').send({
            id: currentUserId,
            session: session,
            url: 1
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body.body.editor).toBe(store.settings.text.editor)
        expect(response.body.body.id).toBe(1)
        expect(response.body.body.key_id).toBe(store.settings.text.key_id)
        expect(response.body.body.title).toBe(store.settings.text.title)
        expect(response.body.body.value).toBe(store.settings.text.updateValue)
    })
})
describe('Settings fail auth', () => {
    let session = 'error'
    let currentUserId = 0
    it('Admin index', async()=>{
        const response = await request(app).post('/api/admin/settings').send({
            id: currentUserId,
            lang: 1,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it('Admin update', async()=>{
        const response = await request(app).post('/api/admin/settings/update').send({
            data: {
                editor: 'input',
                id: 1,
                key_id: 'text',
                title: 'Текстовый редактор Input',
                value: store.settings.text.updateValue
            },
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it('Admin settings id=1', async()=>{
        const response = await request(app).post('/api/admin/settings/1').send({
            id: currentUserId,
            session: session,
            url: 1
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
})
