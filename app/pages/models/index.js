const db = require('../../../core/schemas')
const MainModel = db.pages
const LIMIT = 8
const OFFSET = 0
const ORDER_BY = 'DESC'
const ORDER_KEY = 'created_at'
const LANG = 1
class Model {
   static async showPublic(permalink) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      response.data = await MainModel.findAll({
         where: {
            permalink: permalink,
            status: 'public'
         }
       })
      return response
     }
     catch (error) {
      console.log(error)
      response.confirm = 'error'
      return response
    }
   } 
   static async getById(id) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      response.data = await MainModel.findAll({
         where: {id: id}
       })
      return response
     }
     catch (error) {
      console.log(error)
      response.confirm = 'error'
      return response
    }
   } 
   static async bulkCreate(posts) {
      const response = {
         confirm: 'ok',
         data: []
     }
     try {
      await MainModel.bulkCreate(posts)
      return response
     }
     catch (error) {
      console.log(error)
      response.confirm = 'error'
      return response
    }
   } 
   static async allPublic(settings) {
      const limit = settings.limit || LIMIT
      const offset = settings.offset || OFFSET
      const orderBy = settings.orderBy || ORDER_BY
      const orderKey = settings.orderKey || ORDER_KEY
      const lang = settings.lang || LANG
      const response = {
          confirm: 'ok',
          data: []
      }
      try {
          response.data = await MainModel.findAll({
             where: {
                lang: lang,
                status: 'public'
               },
               order: [[orderKey, orderBy]],
               offset: offset,
               limit: limit
            })
          return response
      }
      catch (error) {
          console.log(error)
          response.confirm = 'error'
          return response
      }
   } 
   static async all(settings) {
      const limit = settings.limit || LIMIT
      const offset = settings.offset || OFFSET
      const orderBy = settings.orderBy || ORDER_BY
      const orderKey = settings.orderKey || ORDER_KEY
      const lang = settings.lang || LANG
      const response = {
          confirm: 'ok',
          data: []
      }
      try {
          response.data = await MainModel.findAll({
             where: {
                lang: lang,
               },
               order: [[orderKey, orderBy]],
               offset: offset,
               limit: limit
            })
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
   static async count(lang) {
      const language = lang || LANG
      const response = {
          confirm: 'ok',
          data: 0
      }
      try {
          const data =  await MainModel.findAll({
            where: {lang: language}
           })
          response.data = data.length 
          return response
      }
      catch (error) {
          console.log(error)
          response.confirm = 'error'
          return response
      }
  } 
  static async destroy() {
   const response = {
      confirm: 'ok',
      data: 0
  }
   try {
         await MainModel.destroy({
            where: {},
            truncate: true
         })
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