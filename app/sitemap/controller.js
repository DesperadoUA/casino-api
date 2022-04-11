const {Router} = require('express')
const router = Router()
const Service = require('./service')

router.get('/sitemap', async (req, res) => {
    let lang = 1
    if(req.query.lang) {
        const param = Number(req.query.lang)
        if(Number.isInteger(param)) lang = param
    } 
    const response = await Service.index(lang)
    res.status(200).json(response)
})

module.exports = router