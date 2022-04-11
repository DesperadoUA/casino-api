const cash = require('./../helpers/cash')
function cashData(req, res, next) {
    if(cash.isCash(req.url)) res.status(200).json(cash.getData(req.url)) 
    else next()
}
function cashDestroy(req, res, next) {
    cash.destroy()
    next()
}
module.exports = {
    cashData,
    cashDestroy
}