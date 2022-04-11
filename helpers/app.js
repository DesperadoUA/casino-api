require('dotenv').config()
const fs = require('fs')
const path = require('path')
class Helper {
    static getAppDir(){
        return fs.readdirSync(process.env.APP_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
    }
    static getRelatives(dir) {
      const filePath =  path.resolve(__dirname, `.${process.env.APP_DIR}/${dir}/settings.js`)
      if (fs.existsSync(filePath)) {
        const {config} = require(filePath)
        return 'relatives' in config ? config.relatives : {}
      } 
      return {}
    }
 }
 module.exports = Helper