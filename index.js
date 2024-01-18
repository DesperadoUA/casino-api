require('./config')
const app = require('./app')
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