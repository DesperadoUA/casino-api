const CardBuilder =  require('./../../core/BaseCardBuilder')
const RelativeModel = require('../../core/models/Relative')
const PostModel = require('../../core/models/Post')
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
        const BonusCasinoRelativeModel = new RelativeModel('BONUS', 'casino')
        const CasinoModel = new PostModel('CASINO')
        for (const post of posts) {
            const casinoId = await BonusCasinoRelativeModel.getRelatives(post.id)
            const casinoPost = await CasinoModel.publicPostsByArrId(casinoId.data)
            newData.push({
                title: post.title,
                permalink: `${_SLUG_LANG[post.lang]}/${post.slug}/${post.permalink}`,
                thumbnail: post.thumbnail,
                casino: casinoPost.data.length > 0 ? casinoPost.data[0].title : '',
                casino_thumbnail: casinoPost.data.length > 0 ? casinoPost.data[0].thumbnail : post.thumbnail,
                casino_permalink: casinoPost.data.length > 0 
                                  ? `${_SLUG_LANG[casinoPost.data[0].lang]}/${casinoPost.data[0].slug}/${casinoPost.data[0].permalink}` 
                                  : `${_SLUG_LANG[post.lang]}/${post.slug}/${post.permalink}`,
                value_bonus: post.value_bonus,
                close: post.close,
                ref: JSON.parse(post.ref),
                short_desc: post.short_desc,
            })
        }
        return newData
    }
}
module.exports = CasinoCardBuilder