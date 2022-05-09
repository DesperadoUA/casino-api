const {decode} = require('html-entities')
const Helper = require('../helpers')
class CardBuilder {
    static category(posts) {
        const data = []
        posts.forEach(item => {
            data.push(Object.assign(this.commonDecode(item), 
                     {faq: JSON.parse(item.faq)},
                     {parent_id: item.parent_id}, 
                     {content: this.textDecode(item.content)}))
        })
        return data
    }
    static singleAdminCategory(post) {
        return Object.assign(this.commonAdminDecode(post), this.categoryMetaDecode(post), {content: post.content})
    }
    static singleCategory(post) {
        return Object.assign(this.commonDecode(post),
                            {faq: JSON.parse(post.faq)},                    
                            {parent_id: post.parent_id}, 
                            {content: this.textDecode(post.content)})
    }
    static commonDecode(post) {
       const data = {
           id: post.id,
           permalink: `${_SLUG_LANG[post.lang]}/${post.slug}/${post.permalink}`,
           title: post.title,
           status: post.status,
           thumbnail: post.thumbnail,
           short_desc: post.short_desc,
           h1: post.h1,
           meta_title: post.meta_title,
           description: post.description,
           keywords: post.keywords,
           lang: post.lang,
           updated_at: post.updated_at,
           created_at: post.created_at,
       }
       return data
    }
    static commonAdminDecode(post) {
        const data = Object.assign(this.commonDecode(post), 
        {
            permalink: post.permalink,
            content: post.content
        })
        return data
     }
    static categoryMetaDecode(post) {
        const data = {
            faq: JSON.parse(post.faq)
        }
        return data
    }
    static searchAdminCard(arr) {
        if(arr.length === 0) return []
        const posts = []
        arr.forEach(item => posts.push({
            title: item.title,
            permalink: `/admin/${item.post_type}/${item.id}`
        }))
        return posts
    }
    static searchCard(arr) {
        if(arr.length === 0) return []
        const posts = []
        arr.forEach(item => posts.push({
            id: item.id,
            permalink: `/${item.slug}/${item.permalink}`,
            title: item.title,
            thumbnail: item.thumbnail
        }))
        return posts
    }
    static libDecode(post) {
        const newData = {
            id: post.id,
            title: post.title,
            editor: post.editor,
            key_id: post.key_id
        }
        if(_CONFIG_EDITOR.TEXT_DECODE.includes(post.editor)) {
            newData.value = this.textValidate(post.value)
        }
        else if(_CONFIG_EDITOR.JSON_DECODE.includes(post.editor)) {
            newData.value = post.value === '' ? {} : JSON.parse(post.value)
        } 
        return newData
    }
    static libDecodeSpecialChars(post) {
        const newData = {
            id: post.id,
            title: post.title,
            editor: post.editor,
            key_id: post.key_id
        }
        if(_CONFIG_EDITOR.TEXT_DECODE.includes(post.editor)) {
            newData.value = this.textDecode(post.value)
        }
        else if(_CONFIG_EDITOR.JSON_DECODE.includes(post.editor)) {
            newData.value = post.value === '' ? {} : JSON.parse(post.value)
        } 
        return newData
    }
    static textValidate(text) {
        let newData = text.replace(/<p><\/p>/g, '').trim()
        return newData
    }
    static textDecode(text) {
        let newData = text.replace(/<p><\/p>/g, '').trim()
        newData = newData.replace(/<pre class="ql-syntax" spellcheck="false">/g, '')
        newData = newData.replace(/<\/pre>/g, '')
        newData = decode(newData)
        return Helper.replaceHeadings(newData)
    }
    static libValidateSave(post) {
        const newData = {
            id: post.id
        }
        if(_CONFIG_EDITOR.TEXT_DECODE.includes(post.editor)) {
            newData.value = this.textValidate(post.value)
        }
        else if(_CONFIG_EDITOR.JSON_DECODE.includes(post.editor)) {
            newData.value = post.value === '' ? JSON.stringify({}) : JSON.stringify(post.value)
        }
        return newData
    }
    static getTitles(arr) {
        if(arr.length === 0) return []
        const newData = []
        arr.forEach(item => newData.push(item.title))
        return newData
    }
}
module.exports = CardBuilder