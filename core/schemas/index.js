require('dotenv').config()
const dbConfig = require('./../../config/db')
const Sequilize = require("sequelize")
const {DataTypes} = Sequilize
const fs = require('fs')
const path = require('path')
const HelperApp = require('./../../helpers/app')

const sequelize = new Sequilize(dbConfig[process.env.NODE_ENV].DB, dbConfig[process.env.NODE_ENV].USER, dbConfig[process.env.NODE_ENV].PASSWORD, {
    dialect: dbConfig[process.env.NODE_ENV].DIALECT,
    host: dbConfig[process.env.NODE_ENV].HOST, 
    logging: false
})


sequelize.authenticate().then(() => {
    if(process.env.NODE_ENV !== 'test') console.log('Connection successfull')
}).catch((err) => {
    console.log('Error connecting to database!')
})

const db = {}
db.Sequilize = Sequilize
db.sequelize = sequelize

function initDb(){
    const arrDir = HelperApp.getAppDir()
    arrDir.forEach(dir => {
      const filePath =  path.resolve(__dirname, `./../.${process.env.APP_DIR}/${dir}/schemas/initial.js`)
      if (fs.existsSync(filePath)) {
        const Schemas = require(filePath)
        Object.assign(db, Schemas(sequelize, DataTypes))
      } 
    })
  }
initDb()

function initRelativeDb(){
  const arrDir = HelperApp.getAppDir()
  arrDir.forEach(dir => {
    const Relatives = HelperApp.getRelatives(dir)
    for(key in Relatives) {
      db[Relatives[key].table] = require('./../../core/schemas/CommonRelativeSchema')(Relatives[key].table, sequelize, DataTypes)
      db[Relatives[key].mainDb].belongsToMany(db[Relatives[key].relativeDb], {through: Relatives[key].table, foreignKey: 'post_id', onDelete: 'CASCADE'})
      db[Relatives[key].relativeDb].belongsToMany(db[Relatives[key].mainDb], {through: Relatives[key].table, foreignKey: 'relative_id', onDelete: 'CASCADE'}) 
    }
  })
}
initRelativeDb()

db.sequelize.sync({force:dbConfig[process.env.NODE_ENV].SYNC})
    .then(()=>{
        if(process.env.NODE_ENV !== 'test') console.log('Re-sync')
    }).catch((err) => {
        if(process.env.NODE_ENV !== 'test') console.log('Error Re-sync')
})

module.exports = db