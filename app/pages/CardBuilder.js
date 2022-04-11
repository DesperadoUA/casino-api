const CardBuilder =  require('../../core/BaseCardBuilder')
class PageCardBuilder extends CardBuilder {
    static show(post) {
        return Object.assign(this.commonDecode(post), 
                             this.metaDecode(post), 
                             {content: this.textDecode(post.content)},
                             {permalink: `/${post.permalink}`}
                             )
    }
    static metaDecode(post) {
        const data = {
            faq: JSON.parse(post.faq)
        }
        return data
    }
    static showAdmin(post) {
        return Object.assign(this.commonAdminDecode(post), this.metaDecode(post))
    }
    static fetch(posts) {
        const data = []
        posts.forEach(item => {
            data.push(Object.assign(this.commonDecode(item), 
                                    this.metaDecode(item), 
                                    {content: this.textDecode(item.content)},
                                    {permalink: `/${item.permalink}`}
                                    ))
        })
        return data
    }
}
module.exports = PageCardBuilder