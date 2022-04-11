const request = require('supertest')
const app = require('../../../app')

describe('Sitemap', () => {
    it('DTO index', async()=>{
        const response = await request(app).get('/api/sitemap')
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body).toHaveProperty('body')
        expect(Array.isArray(response.body.body)).toBe(true)
        if(response.body.body.length !== 0) {
            expect(response.body.body[0]).toHaveProperty('url')
            expect(response.body.body[0]).toHaveProperty('lastmod')
            expect(response.body.body[0]).toHaveProperty('changefreq')
            expect(response.body.body[0]).toHaveProperty('priority')
        }
    })
})

