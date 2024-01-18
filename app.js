require('./config')
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const HelperApp = require('./helpers/app')

const app = express()
app.use(express.json({limit: '25mb'}))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/img', express.static(path.join(__dirname, 'img')))
app.use(cors())

function initControllers(){
  const arrDir = HelperApp.getAppDir()
  arrDir.forEach(dir => {
    const filePath = `${_APP_DIR}/${dir}/controller.js`
    if (fs.existsSync(filePath)) { 
      const Controller = require(filePath)
      app.use('/api', Controller)
    } 
  })
}
initControllers()
module.exports = app