const {Router} = require('express')
const router = Router()
const Service = require('./service')
const auth = require('./../../middleware/auth')

router.get('/search', async (req, res) => {
    const {lang, searchWord} = req.body
    const response = await Service.search(lang, searchWord)
    res.status(200).json(response)
})

router.post('/admin/search', auth, async (req, res) => {
    const {lang, postType, searchWord} = req.body
    const response = await Service.adminSearch(lang, postType, searchWord)
    res.status(200).json(response)
})
module.exports = router