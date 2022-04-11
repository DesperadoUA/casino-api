const request = require('supertest')
const app = require('../../../app')
const store = require('../../../core/store')

describe('Search', () => {
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
    it('DTO front', async()=>{
        const response = await request(app).post('/api/search').send({
            lang: 1,
            searchWord: 'post'
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body).toHaveProperty('body')
        expect(Array.isArray(response.body.body)).toBe(true)
        if(response.body.body.length !== 0) {
            expect(response.body.body[0]).toHaveProperty('id')
            expect(response.body.body[0]).toHaveProperty('permalink')
            expect(response.body.body[0]).toHaveProperty('title')
            expect(response.body.body[0]).toHaveProperty('thumbnail')
        }
        
    })
    it('DTO admin', async()=>{
        const response = await request(app).post('/api/admin/search').send(
            {
                id: currentUserId,
                lang: 1,
                postType: 'games',
                searchWord: 'post',
                session: session
            }
        )
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body).toHaveProperty('body')
        expect(Array.isArray(response.body.body)).toBe(true)
        if(response.body.body.length !== 0) {
            expect(response.body.body[0]).toHaveProperty('permalink')
            expect(response.body.body[0]).toHaveProperty('title')
        }
    })
})
