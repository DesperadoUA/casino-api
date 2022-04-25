const PostModel = require('./models/Post')
const CategoryModel = require('./models/Category')
const RelativeModel = require('./models/Relative')
const CardBuilder =  require('./BaseCardBuilder')
const Helper = require('./../helpers/')
const LIMIT_RELATIVE = 10000
class BaseService {
    static async dataValidateInsert(data, table) {
      const response = {
        data: {},
        confirm: 'ok'
      }
       const newData = this.dataValidate(data)
       newData.lang = _LANG_ID[data.lang] ? _LANG_ID[data.lang] : _LANG_ID.ru
       newData.permalink = Helper.transliterateUrl(data.title)

       const postModel = new PostModel(table)
       const candidate = await postModel.show(newData.permalink)
       response.confirm = candidate.confirm
       if(candidate.data.length !== 0) {
         let counter = 0
         do {
            counter++
            let newPermalink = newData.permalink
            newPermalink = `${newPermalink}-${counter}`
            const newCandidate = await postModel.show(newPermalink)
            if(newCandidate.data.length === 0) {
                newData.permalink = newPermalink
                break
            }
        } while (true)
       } 
      response.data = newData
      return response
    }
    static async dataValidateSave(data, table) {
      const response = {
        data: {},
        confirm: 'ok'
      }
      const newData =  this.dataValidate(data)
      newData.permalink = Helper.transliterateUrl(data.permalink)

      const postModel = new PostModel(table)
      const candidate = await postModel.show(newData.permalink)
      response.confirm = candidate.confirm
      if(candidate.data.length !== 0 && candidate.data[0].id !== data.id) {
        let counter = 0
        do {
           counter++
           let newPermalink = newData.permalink
           newPermalink = `${newPermalink}-${counter}`
           const newCandidate = await postModel.show(newPermalink)
           if(newCandidate.data.length === 0) {
               newData.permalink = newPermalink
               break
           }
        } while (true)
      }
      response.data = newData
      return response
    }
    static async dataValidateInsertCategory(data, table) {
      const response = {
        data: {},
        confirm: 'ok'
      }
      const newData =  Object.assign(this.dataValidate(data), {faq: JSON.stringify([])})
      newData.lang = _LANG_ID[data.lang] ? _LANG_ID[data.lang] : _LANG_ID.ru
      newData.permalink = Helper.transliterateUrl(data.title)
      
      const categoryModel = new CategoryModel(table)
      const candidate = await categoryModel.show(newData.permalink)
      response.confirm = candidate.confirm
      if(candidate.data.length !== 0) {
         let counter = 0
         do {
            counter++
            let newPermalink = newData.permalink
            newPermalink = `${newPermalink}-${counter}`
            const newCandidate = await categoryModel.show(newPermalink)
            if(newCandidate.data.length === 0) {
                newData.permalink = newPermalink
                break
            }
        } while (true)
      }
      response.data = newData
      return response
    }
    static async dataValidateSaveCategory(data, table) {
      const response = {
        data: {},
        confirm: 'ok'
      }
      const err = []
      const categoryModel = new CategoryModel(table)

      const newData =  this.dataValidate(data)
      newData.permalink = Helper.transliterateUrl(data.permalink)
      newData.faq = JSON.stringify(data.faq)
      if(data.parent_id.length !== 0) {
          const parentPost = await categoryModel.getByTitles(data.parent_id.splice(0, 1), data.lang)
          err.push(parentPost.confirm)
          newData.parent_id = parentPost.data[0].id
      } else {
        newData.parent_id = 0
      }
      
      const candidate = await categoryModel.show(newData.permalink)
      err.push = candidate.confirm
      if(candidate.data.length !== 0 && candidate.data[0].id !== data.id) {
        let counter = 0
        do {
           counter++
           let newPermalink = newData.permalink
           newPermalink = `${newPermalink}-${counter}`
           const newCandidate = await categoryModel.show(newPermalink)
           if(newCandidate.data.length === 0) {
               newData.permalink = newPermalink
               break
           }
        } while (true)
      }
      response.data = newData
      response.confirm = err.includes('error') ? 'error' : 'ok'
      return response
    }
    static dataValidate(data) {
      const newData = {}
      newData.title = data.title || ''
      newData.status = data.status || 'hide'
      if(data.created_at) newData.created_at = data.created_at
      if(data.updated_at) newData.updated_at = data.updated_at
      newData.content = data.content || ''  
      newData.description = data.description || ''
      newData.h1 = data.h1 || ''
      newData.keywords = data.keywords || ''
      newData.meta_title = data.meta_title || ''
      newData.short_desc = data.short_desc || ''
      newData.thumbnail = data.thumbnail || _THUMBNAIL
      if(data.post_type) newData.post_type = data.post_type
      if(data.slug) newData.slug = data.slug
      return newData
    }
    static async updateSingleRelative(data, postType, postTypeRelative, relative, key) {
      const response = {
          confirm: 'error',
          data: {}
      }
      const err = []

      const relativeModel = new RelativeModel(postType, relative)
      const postModel = new PostModel(postTypeRelative)
      
      const destroyOldRelative = await relativeModel.destroyByPostId(data.id)
      err.push(destroyOldRelative.confirm)

      const arrPosts = await postModel.getByTitles(data[key], data.lang)
      err.push(arrPosts.confirm)
      const arrPostId = []
      arrPosts.data.forEach(item => arrPostId.push(item.id))
      if(arrPostId.length !== 0) {
          const arr =  []
          arrPostId.forEach(item => arr.push({post_id: data.id, relative_id: item}))
          const insertRelatives = await relativeModel.bulkCreate(arr)
          err.push(insertRelatives.confirm)
      }
     
      response.confirm = err.includes('error') ? 'error' : 'ok'
      return response
    }
    static async updateCategory(data, postType) {
      const response = {
          confirm: 'error',
          data: {}
      }
      const err = []
      
      const relativeModel = new RelativeModel(postType)
      const destroyOldRelative = await relativeModel.destroyByPostId(data.id)
      err.push(destroyOldRelative.confirm)
      const categoryModel = new CategoryModel(postType)
      const arrCategory = await categoryModel.getByTitles(data.category, data.lang)
      err.push(arrCategory.confirm)
      const arrCategoryId = []
      arrCategory.data.forEach(item => arrCategoryId.push(item.id))
      if(arrCategoryId.length !== 0) {
          const arr =  []
          arrCategoryId.forEach(item => arr.push({post_id: data.id, relative_id: item}))
          const insertRelatives = await relativeModel.bulkCreate(arr)
          err.push(insertRelatives.confirm)
      }
      
      response.confirm = err.includes('error') ? 'error' : 'ok'
      return response
    }
    static async getSingleRelativeAdmin(data, postType, postTypeRelative, relative) {
      const response = {
          confirm: 'error',
          data: {}
      }
      const settings = {
          lang: data.lang,
          limit: LIMIT_RELATIVE
      }
      const err = []

      const relativeModel = new RelativeModel(postType, relative)
      const postModel = new PostModel(postTypeRelative)
      
      const allPosts = await postModel.all(settings)
      err.push(allPosts.confirm)

      const relativePostId = await relativeModel.getRelatives(data.id)
      err.push(relativePostId.confirm)

      const relativePosts = await postModel.postsByArrId(relativePostId.data)
      err.push(relativePosts.confirm)
      response.data = {
          all_value: CardBuilder.getTitles(allPosts.data),
          current_value: CardBuilder.getTitles(relativePosts.data)
      }
     
      response.confirm = err.includes('error') ? 'error' : 'ok'
      return response
    }
    static async getCategoryAdmin(data, postType) {
      const response = {
        confirm: 'error',
        data: {}
      }
      const err = []
     
      const relativeModel = new RelativeModel(postType)
      const categoryModel = new CategoryModel(postType)

      const settings = {
          lang: data.lang,
          limit: LIMIT_RELATIVE
      }
      const allCategory = await categoryModel.all(settings)
      err.push(allCategory.confirm)

      const relativeCategoryId = await relativeModel.getRelatives(data.id)
      err.push(relativeCategoryId.confirm)

      const relativeCategory = await categoryModel.postsByArrId(relativeCategoryId.data)
      err.push(relativeCategory.confirm)

      response.data = {
          all_value: CardBuilder.getTitles(allCategory.data),
          current_value: CardBuilder.getTitles(relativeCategory.data)
      }
      response.confirm = err.includes('error') ? 'error' : 'ok'
      return response
    }
    static async getSingleRelative(data, postType, postTypeRelative, relative, sort = {}) {
      const response = {
        confirm: 'error',
        data: []
      }
 
      const err = []

      const relativeModel = new RelativeModel(postType, relative)
      const postModel = new PostModel(postTypeRelative)

      const arrId = await relativeModel.getRelatives(data.id)
      err.push(arrId.confirm)

      const posts = await postModel.publicPostsByArrId(arrId.data, sort)
      err.push(posts.confirm)

      response.data = posts.data
      response.confirm = err.includes('error') ? 'error' : 'ok'
      
      return response
    }

}
module.exports = BaseService