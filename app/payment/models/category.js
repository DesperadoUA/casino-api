const db = require('../../../core/schemas')
const CategoryModel = require('../../../core/models/Category')
const settings = require('../settings')
const MainModel = db[settings.config.categoryDb]
class Model extends CategoryModel {
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
   static async update(data, id) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      response.data = await MainModel.update(data, {where: {id: id} })
      return response
     } 
     catch (error) {
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
   static async setParentIdDefault(parent_id){
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      response.data = await MainModel.update({parent_id: 0}, {where: {parent_id: parent_id} })
      return response
     } 
     catch (error) {
      console.log(error)
      response.confirm = 'error'
      return response
     }
   }
}
module.exports = Model