const {Router} = require('express')
const auth = require('./../../middleware/auth') 
const seeds = require('../../middleware/seeds')
const Service = require('./service')
const router = Router()

router.get('/settings', async (req, res) => {
    let lang = 1
    if(req.query.lang) {
        const param = Number(req.query.lang)
        if(Number.isInteger(param)) lang = param
    } 
    const response = await Service.index(lang)
    res.status(200).json(response)
})
router.get('/settings/seeds', seeds, async (req, res) => {
    const response = await Service.seeds()
    res.status(200).json(response)
})
router.get('/settings/destroy', seeds, async (req, res)=>{
    const response = await Service.destroy()
    res.status(200).json(response)
}) 
router.post('/admin/settings', auth, async (req, res) => {
    const {lang} = req.body
    const response = await Service.indexAdmin(lang)
    res.status(200).json(response)
})
router.post('/admin/settings/update', auth, async (req, res) => {
    const {data} = req.body
    const response = await Service.update(data)
    res.status(200).json(response)
})
router.post('/admin/settings/:id', auth, async (req, res) => {
    const response = await Service.show(req.params.id)
    res.status(200).json(response)
})

module.exports = router