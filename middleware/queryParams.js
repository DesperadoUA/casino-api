
function queryParams(req, res, next) {
    req.queryParams = {}
    if(req.query.limit) {
        const param = Number(req.query.limit)
        if(Number.isInteger(param)) req.queryParams.limit = param
    } 
    if(req.query.offset) {
        const param = Number(req.query.offset)
        if(Number.isInteger(param)) req.queryParams.offset = param
    } 
    if(req.query.lang) {
        const param = Number(req.query.lang)
        if(Number.isInteger(param)) req.queryParams.lang = param
    } 
    if(req.query.orderBy) {
        if(req.query.orderBy === 'DESC' || req.query.orderBy === 'ASC') {
            req.queryParams.orderBy === 'DESC'
        }
    } 
    next()
}

module.exports = queryParams