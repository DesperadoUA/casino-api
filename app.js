require('./config')
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')
const HelperApp = require('./helpers/app')

const app = express()
app.use(express.json({limit: '25mb'}))
app.use(bodyParser.json())
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
function startApp(){
    try{
       app.listen(_PORT, () => {
         console.log(`SERVER START ON PORT ${_PORT} ENV ${_NODE_ENV}`)
        } 
       )
    }
    catch(e){
      console.log(e)
    }
}
if(_NODE_ENV !== 'test') startApp()
module.exports = app