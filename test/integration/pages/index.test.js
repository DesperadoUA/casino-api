const request = require('supertest')
const app = require('../../../app')
const store = require('../../../store')

describe('Static pages', () => {
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

    it('DTO pages destroy', async()=>{
        const response = await request(app).post('/api/pages/destroy')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    }) 
    it('DTO page seeds', async()=>{
        const response = await request(app).get('/api/pages/seeds')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    }) 
    it('DTO page main', async()=>{
        const response = await request(app).get('/api/pages/main')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body.body).toHaveProperty('permalink', '/main')
        expect(response.body.body).toHaveProperty('title')
        expect(response.body.body).toHaveProperty('thumbnail')
        expect(response.body.body).toHaveProperty('short_desc')
        expect(response.body.body).toHaveProperty('h1')
        expect(response.body.body).toHaveProperty('meta_title')
        expect(response.body.body).toHaveProperty('description')
        expect(response.body.body).toHaveProperty('keywords')
        expect(response.body.body).toHaveProperty('lang', 1)
        expect(response.body.body).toHaveProperty('updated_at')
        expect(response.body.body).toHaveProperty('created_at')
        expect(response.body.body).toHaveProperty('faq')
        expect(response.body.body).toHaveProperty('content')
    }) 
    it('DTO pages index', async()=>{
        const response = await request(app).get('/api/pages')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(Array.isArray(response.body.body)).toBe(true)
    })
    it('DTO admin pages index ru', async()=>{
        const response = await request(app).post('/api/admin/pages').send({
            id: currentUserId,
            lang: 1,
            limit: 8,
            offset: 0,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(Array.isArray(response.body.body)).toBe(true)
    })
    it('DTO admin pages index ua', async()=>{
        const response = await request(app).post('/api/admin/pages').send({
            id: currentUserId,
            lang: 2,
            limit: 8,
            offset: 0,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(Array.isArray(response.body.body)).toBe(true)
    }) 
    it('DTO admin pages update', async()=>{
        const response = await request(app).post('/api/admin/pages/update').send({
            id: currentUserId,
            session: session,
            data: Object.assign(store.pages.main.update, {faq: store.faqUpdate})
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it('DTO admin pages id=1', async()=>{
        const response = await request(app).post('/api/admin/pages/1').send({
            id: currentUserId,
            session: session,
            url: 1
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body.body).toHaveProperty('content', store.pages.main.update.content)
        expect(response.body.body).toHaveProperty('description', store.pages.main.update.description)
        expect(response.body.body).toHaveProperty('updated_at', store.pages.main.update.updated_at)
        expect(response.body.body).toHaveProperty('created_at', store.pages.main.update.created_at)
        expect(response.body.body).toHaveProperty('h1', store.pages.main.update.h1)
        expect(response.body.body).toHaveProperty('id', 1)
        expect(response.body.body).toHaveProperty('keywords', store.pages.main.update.keywords)
        expect(response.body.body).toHaveProperty('meta_title', store.pages.main.update.meta_title)
        expect(response.body.body).toHaveProperty('short_desc', store.pages.main.update.short_desc)
        expect(response.body.body).toHaveProperty('status')
        expect(response.body.body).toHaveProperty('thumbnail', store.pages.main.update.thumbnail)
        expect(response.body.body).toHaveProperty('title', store.pages.main.update.title)
        expect(response.body.body.faq).toEqual(store.faqUpdate)
    }) 
})
describe('Static pages fail auth', () => {
    let session = 'error'
    let currentUserId = 0
    it('Admin pages index ru', async()=>{
        const response = await request(app).post('/api/admin/pages').send({
            id: currentUserId,
            lang: 1,
            limit: 8,
            offset: 0,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it('Admin pages update', async()=>{
        const response = await request(app).post('/api/admin/pages/update').send({
            id: currentUserId,
            session: session,
            data: {}
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it('DTO admin pages id=1', async()=>{
        const response = await request(app).post('/api/admin/pages/1').send({
            id: currentUserId,
            session: session,
            url: 1
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    }) 
})
