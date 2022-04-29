const PageModel = require('./../../app/pages/models')
const PostModel = require('./../../core/models/Post')
const CategoryModel = require('./../../core/models/Category')
const tables = require('../../tables')
const LIMIT = 10000

class Service {
    static async index(lang) {
        const response = {
            confirm: 'ok',
            body: []
        }
        const err = []
        const data = []
        const allPages = await PageModel.allPublic({lang: lang, limit: LIMIT})
        err.push(allPages.confirm)

        allPages.data.forEach(item => {
            data.push({
                url: item.permalink === 'main' ? '/' : `/${item.permalink}`,
                lastmod: item.updated_at.toLocaleString(),
                changefreq: 'daily',
                priority: item.permalink === 'main' ? 1 : 0.9
            })
        })

        const arrPostDb = []
        for(let key in tables) {
            if(tables[key].inSitemap) arrPostDb.push(key)
        } 
        //--------- Posts ----------------------------//
        for (let db of arrPostDb) {
            const postModel = new PostModel(db)
            const allPosts = await postModel.allPublic({lang: lang, limit: LIMIT})
            err.push(allPosts.confirm)
            allPosts.data.forEach(post => {
                data.push({
                    url: `${_SLUG_LANG[post.lang]}/${post.slug}/${post.permalink}`,
                    lastmod: post.updated_at.toLocaleString(),
                    changefreq: 'daily',
                    priority: 0.8
                })
            })
        }
        //---------- Category -----------------------//
        for (let db of arrPostDb) {
            const postModel = new CategoryModel(db)
            const allPosts = await postModel.allPublic({lang: lang, limit: LIMIT})
            err.push(allPosts.confirm)
            allPosts.data.forEach(post => {
                data.push({
                    url: `${_SLUG_LANG[post.lang]}/${post.slug}/${post.permalink}`,
                    lastmod: post.updated_at.toLocaleString(),
                    changefreq: 'daily',
                    priority: 0.8
                })
            })
        }
        response.confirm = err.includes('error') ? 'error' : 'ok'
        response.body = data
        return response
    }
}
module.exports = Service