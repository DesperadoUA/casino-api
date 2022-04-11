const {Router} = require('express')
const auth = require('./../../middleware/auth') 
const seeds = require('./../../middleware/seeds') 
const Service = require('./service')
const router = Router()

router.get('/options', async (req, res) => {
    const response = await Service.index()
    res.status(200).json(response)
})
router.get('/options/seeds', seeds, async (req, res) => {
    const response = await Service.seeds()
    res.status(200).json(response)
})
router.get('/options/destroy', seeds, async (req, res)=>{
    const response = await Service.destroy()
    res.status(200).json(response)
}) 
router.post('/admin/options', auth, async (req, res) => {
    const response = await Service.indexAdmin()
    res.status(200).json(response)
})
router.post('/admin/options/update', auth, async (req, res) => {
    const {data} = req.body
    const response = await Service.update(data)
    res.status(200).json(response)
})
router.post('/admin/options/:id', auth, async (req, res) => {
    const response = await Service.show(req.params.id)
    res.status(200).json(response)
})

module.exports = router