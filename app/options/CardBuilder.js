const BaseCardBuilder =  require('./../../core/BaseCardBuilder')
class CardBuilder extends BaseCardBuilder {
    static fetch(arr) {
        const data = arr.map(item => this.libDecodeSpecialChars(item))
        return data
    }
    static adminFetch(arr) {
        const data = []
        arr.forEach(item => {
            const obj = {
                id: item.id,
                title: item.title,
                slug: item.slug
            }
            data.push(obj)
        })
        return data
    }
    static show(post) {
        return this.libDecode(post)
    }
    static update(post) {
        return this.libValidateSave(post)
    }
}
module.exports = CardBuilder