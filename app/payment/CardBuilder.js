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
        for (const post of posts) {
            newData.push({
                title: post.title,
                permalink: `${_SLUG_LANG[post.lang]}/${post.slug}/${post.permalink}`,
                thumbnail: post.thumbnail,
                short_desc: post.short_desc
            })
        }
        return newData
    }
}
module.exports = CasinoCardBuilder