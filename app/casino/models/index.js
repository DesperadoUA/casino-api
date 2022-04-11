const db = require('../../../core/schemas')
const PostModel = require('../../../core/models/Post')
const settings = require('../settings')
const MainModel = db[settings.config.mainDb]
const MetaModel = db[settings.config.metaDb]
class Model extends PostModel {
   constructor(name) {
      super(name)
   }
   static async bulkCreate(posts) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      const totalPosts = await MainModel.findAll({})
      if(totalPosts.length === 0) await MainModel.bulkCreate(posts)
      else for(let i = 1; i<11; i++) await this.update(posts[i-1], i)
      return response
     }
     catch (error) {
      console.log(error)
      response.confirm = 'error'
      return response
    }
   }
   static async bulkCreateMeta(posts) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      const totalPosts = await MetaModel.findAll({})
      if(totalPosts.length === 0) await MetaModel.bulkCreate(posts)
      else for(let i = 1; i<11; i++) await this.updateMeta(posts[i-1], i)
      return response
     }
     catch (error) {
      console.log(error)
      response.confirm = 'error'
      return response
    }
   }
   static async create(data) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      response.data = await MainModel.create(data)
      return response
     } 
     catch (error) {
      console.log(error)
      response.confirm = 'error'
      return response
    }
   } 
   static async createMeta(data) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      response.data = await MetaModel.create(data)
      return response
     } 
     catch (error) {
      console.log(error)
      response.confirm = 'error'
      return response
    }
   } 
   static async update(data, id) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      await MainModel.update(data, {where: {id: id} })
      return response
     } 
     catch(error) {
      console.log(error)
      response.confirm = 'error'
      return response
     }
   } 
   static async updateMeta(data, postId) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      await MetaModel.update(data, {where: {post_id: postId} })
      return response
     }
     catch(error) {
      console.log(error)
      response.confirm = 'error'
      return response
     }
   } 
   static async delete(id) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      await MainModel.destroy({where: {id: id}})
      return response
     }
     catch(error) {
      console.log(error)
      response.confirm = 'error'
      return response
     }
   } 
}
module.exports = Model