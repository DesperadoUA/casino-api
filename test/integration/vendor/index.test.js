const request = require('supertest')
const app = require('../../../app')
const store = require('../../../store')
const {fields, config} = require('../../../app/vendor/settings')
const commonFields = require('../../../core/BaseFields')

const postSlug = config.postTypeSlug
const categorySlug = config.postTypeCategorySlug

describe(postSlug, () => {
    let session = ''
    let currentUserId = 0
    let insertPostId = 0
    let insertCategoryId = 0

    beforeAll( async()=> {
        const {user} = store
        const response = await request(app).post('/api/admin/login').send({
            password: user.password,
            login: user.name
        })
        session = response.body.body.session
        currentUserId = response.body.body.id
    })
    it(`DTO ${postSlug} post seeds`, async()=>{
        const response = await request(app).get(`/api/${postSlug}/seeds`)
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it(`DTO ${postSlug} post index`, async()=>{
        const response = await request(app).get(`/api/${postSlug}`)
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body).toHaveProperty('body')
        expect(Array.isArray(response.body.body)).toBe(true)
        for(const key in commonFields) {
            expect(response.body.body[0]).toHaveProperty(key)
        }
        for(const key in fields) {
            expect(response.body.body[0]).toHaveProperty(key)
        }
    })
    it(`DTO ${postSlug} post url post-0`, async()=>{
        const response = await request(app).get(`/api/${postSlug}/post-0`)
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        for(const key in commonFields) {
            expect(response.body.body).toHaveProperty(key)
        }
        for(const key in fields) {
            expect(response.body.body).toHaveProperty(key)
        }
    })
    it(`DTO ${postSlug} category seeds`, async()=>{
        const response = await request(app).get(`/api/${categorySlug}/seeds`)
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it(`DTO ${postSlug} category index`, async()=>{
        const response = await request(app).get(`/api/${categorySlug}`)
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body).toHaveProperty('body')
        expect(Array.isArray(response.body.body)).toBe(true)
        if(response.body.body.length !== 0) {
            expect(response.body.body[0]).toHaveProperty('parent_id')
            expect(Array.isArray(response.body.body[0].faq)).toBe(true)
            for(const key in commonFields) {
                expect(response.body.body[0]).toHaveProperty(key)
            }
        }
    })
    it(`DTO ${postSlug} category url category-0`, async()=>{
        const response = await request(app).get(`/api/${categorySlug}/category-0`)
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        for(const key in commonFields) {
            expect(response.body.body).toHaveProperty(key)
        }
        expect(Array.isArray(response.body.body.posts)).toBe(true)
        expect(response.body.body).toHaveProperty('parent_id')
    })
    it(`DTO ${postSlug} admin posts index`, async()=>{
        const response = await request(app).post(`/api/admin/${categorySlug}`).send({
            id: currentUserId,
            lang: 1,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(Array.isArray(response.body.body)).toBe(true)
    })
    it(`DTO ${postSlug} post update`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/update`).send({
            data: Object.assign({}, store.posts.defaultUpdate, store.posts[postSlug].update),
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it(`DTO ${postSlug} post id=1`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/1`).send({
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        for(let key in store.posts.defaultUpdate) {
            if(key === 'category') {
                expect(response.body.body.category).toHaveProperty('all_value')
                expect(Array.isArray(response.body.body.category.all_value)).toBe(true)
                expect(Array.isArray(response.body.body.category.current_value)).toBe(true)
                expect(response.body.body.category.current_value).toEqual(store.posts.defaultUpdate[key])
            }
            else {
                expect(response.body.body).toHaveProperty(key, store.posts.defaultUpdate[key])
            }
        }
        for(let key in store.posts[postSlug].update) {
            expect(response.body.body).toHaveProperty(key)
        }
    })
    it(`DTO ${postSlug} post store`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/store`).send({
            data: Object.assign({}, store.posts.dafault, {lang: 'ru'}),
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body).toHaveProperty('insert_id')
        insertPostId = response.body.insert_id
    })
    it(`DTO ${postSlug} post delete`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/delete`).send({
            data: insertPostId,
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    }) 
    it(`DTO ${postSlug} admin category index`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/category`).send({
            id: currentUserId,
            lang: 1,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(Array.isArray(response.body.body)).toBe(true)
    }) 
    it(`DTO ${postSlug} admin category update`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/category/update`).send({
            data: Object.assign({}, store.posts.defaultUpdate, {parent_id: ['Title category-1']}),
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
    it(`DTO ${postSlug} admin category id=1`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/category/1`).send({
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        for(let key in store.posts.defaultUpdate) {
            if(key !== 'category') {
                expect(response.body.body).toHaveProperty(key, store.posts.defaultUpdate[key])
            }
        }
        expect(response.body.body.relative_category).toHaveProperty('all_value')
        expect(response.body.body.relative_category).toHaveProperty('current_value')
        expect(Array.isArray(response.body.body.relative_category.all_value)).toBe(true)
        expect(Array.isArray(response.body.body.relative_category.current_value)).toBe(true)
        expect(response.body.body.relative_category.current_value).toEqual(store.posts.defaultUpdate.category)
    })
    it(`DTO ${postSlug} admin category store`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/category/store`).send({
            data: Object.assign({}, store.posts.dafault, {lang: 'ru', parent_id: 0}),
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
        expect(response.body).toHaveProperty('insert_id')
        insertCategoryId = response.body.insert_id
    }) 
    it(`DTO ${postSlug} admin category delete`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/category/delete`).send({
            data: insertCategoryId,
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('ok')
    })
})

describe(`${postSlug} fail auth`, () => {
    let currentUserId = 1
    let session = 'error'
    let insertPostId = 0
    let insertCategoryId = 0
    it(`DTO ${postSlug} admin posts index`, async()=>{
        const response = await request(app).post(`/api/admin/${categorySlug}`).send({
            lang: 1,
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it(`DTO ${postSlug} post update`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/update`).send({
            data: {},
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it(`DTO ${postSlug} post id=1`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/1`).send({
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it(`DTO ${postSlug} post store`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/store`).send({
            data: {},
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it(`DTO ${postSlug} post delete`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/delete`).send({
            data: insertPostId,
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    }) 
    it(`DTO ${postSlug} admin category index`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/category`).send({
            id: currentUserId,
            lang: 1,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    }) 
    it(`DTO ${postSlug} admin category update`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/category/update`).send({
            data: {},
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it(`DTO ${postSlug} admin category id=1`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/category/1`).send({
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
    it(`DTO ${postSlug} admin category store`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/category/store`).send({
            data: {},
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    }) 
    it(`DTO ${postSlug} admin category delete`, async()=>{
        const response = await request(app).post(`/api/admin/${postSlug}/category/delete`).send({
            data: insertCategoryId,
            id: currentUserId,
            session: session
        })
        expect(response.status).toBe(200)
        expect(response.body.confirm).toBe('error')
    })
})