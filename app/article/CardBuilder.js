const RelativeModel = require('../../core/models/Relative')
const CategoryModel = require('../../core/models/Category')
const CardBuilder =  require('./../../core/BaseCardBuilder')
const Helper = require('../../helpers')
const settings = require('./settings')
const MetaFields = settings.fields
class CasinoCardBuilder extends CardBuilder {
    static show(post) {
        return Object.assign(this.commonDecode(post), this.metaDecode(post), {content: this.textDecode(post.content)})
    }
    static metaDecode(post) {
        return Helper.metaDecode(post, MetaFields)
    }
    static showAdmin(post) {
        return Object.assign(this.commonAdminDecode(post), this.metaDecode(post))
    }
    static fetch(posts) {
        const data = []
        posts.forEach(item => {
            data.push(Object.assign(this.commonDecode(item), this.metaDecode(item), {content: this.textDecode(item.content)}))
        })
        return data
    }
    static async mainCard(posts) {
        const newData = []
        const CategoryRelativeModel = new RelativeModel('ARTICLE')
        const ArticleCategoryModel = new CategoryModel('ARTICLE')
        for (const post of posts) {
            const categoryId = await CategoryRelativeModel.getRelatives(post.id)
            const category = await ArticleCategoryModel.publicPostsByArrId(categoryId.data)
            const arrCategory = category.data.map(item => {
                return {
                    title: item.title,
                    permalink:  `${_SLUG_LANG[item.lang]}/${item.slug}/${item.permalink}`,
                }
            })
            newData.push({
                title: post.title,
                permalink: `${_SLUG_LANG[post.lang]}/${post.slug}/${post.permalink}`,
                thumbnail: post.thumbnail,
                short_desc: post.short_desc,
                category: arrCategory
            })
        }
        return newData
    }
}
module.exports = CasinoCardBuilder