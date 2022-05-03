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
        const GameVendorRelativeModel = new RelativeModel('GAME', 'vendor')
        const VendorModel = new PostModel('VENDOR')
        for (const post of posts) {
            const vendorId = await GameVendorRelativeModel.getRelatives(post.id)
            const vendorPost = await VendorModel.publicPostsByArrId(vendorId.data)
            newData.push({
                title: post.title,
                permalink: `${_SLUG_LANG[post.lang]}/${post.slug}/${post.permalink}`,
                thumbnail: post.thumbnail,
                vendor: vendorPost.data.length > 0 ? vendorPost.data[0].title : '',
                rating: post.rating,
                rtp: post.rtp,
                min_rate: post.min_rate,
                volatility: post.volatility
            })
        }
        return newData
    }
}
module.exports = CasinoCardBuilder