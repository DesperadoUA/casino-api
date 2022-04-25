function seeds(req, res, next) {
    const response = {confirm: 'error'}
    if(_NODE_ENV === 'production') res.status(200).json(response)
    else next()
}
module.exports = seeds