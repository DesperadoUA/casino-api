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
        const CasinoLicenseRelativeModel = new RelativeModel('CASINO', 'license')
        const LicenseModel = new PostModel('LICENSE')
        for (const post of posts) {
            const licenseId = await CasinoLicenseRelativeModel.getRelatives(post.id)
            const licensePost = await LicenseModel.publicPostsByArrId(licenseId.data)
            newData.push({
                title: post.title,
                permalink: `${_SLUG_LANG[post.lang]}/${post.slug}/${post.permalink}`,
                thumbnail: post.thumbnail,
                welcome_bonus: post.welcome_bonus,
                freespins: post.freespins,
                year: post.year,
                min_deposit: post.min_deposit,
                min_payments: post.min_payments,
                rating: post.rating,
                close: post.close,
                number_games: post.number_games,
                withdrawal: post.	withdrawal,
                license: licensePost.data.length > 0 ? licensePost.data[0].title : ''
            })
        }
        return newData
    }
}
module.exports = CasinoCardBuilder