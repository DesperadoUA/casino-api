const request = require('supertest')
const app = require('../../../app')
const store = require('../../../store')

describe('Upload', () => {
    let session = ''
    let currentUserId = 0
    let newSrc = ''

    beforeAll( async()=> {
        const {user} = store
        const response = await request(app).post('/api/admin/login').send({
            password: user.password,
            login: user.name
        })
        session = response.body.body.session
        currentUserId = response.body.body.id
    })
    it('DTO uploads', async()=>{
        const response = await request(app).post('/api/admin/uploads').send({
            id: currentUserId,
            session: session,
            file: {
                name: "default.png",
                base64: store.base64
            }
        })
        newSrc = response.body.src
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body).toHaveProperty('src')
    })
    it('DTO media', async()=>{
        const response = await request(app).post('/api/admin/media').send({
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body.body.includes(newSrc)).toBe(true)
    })
    it('DTO delete file', async()=>{
        const response = await request(app).post('/api/admin/delete-media').send({
            file: newSrc,
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
})
describe('Upload fail auth', () => {
    let session = 'error'
    let currentUserId = 0
    it('Path uploads', async()=>{
        const response = await request(app).post('/api/admin/uploads').send({
            id: currentUserId,
            session: session,
            file: {
                name: "default.png",
                base64: store.base64
            }
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it('Path media', async()=>{
        const response = await request(app).post('/api/admin/media').send({
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it('Path delete', async()=>{
        const response = await request(app).post('/api/admin/delete-media').send({
            file: '',
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
})