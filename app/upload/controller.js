const {Router} = require('express')
const router = Router()
const auth = require('./../../middleware/auth')
const Service = require('./service')

router.post('/admin/uploads', auth, async (req, res) => {
    const {file} = req.body
    const response = await Service.upload(file.name, file.base64)
    res.status(200).json(response)
})
router.post('/admin/media', auth, (req, res) => {
    const response = Service.media()
    res.status(200).json(response)
})
router.post('/admin/delete-media', auth, (req, res) => {
    const {file} = req.body
    const response = Service.delete(file)
    res.status(200).json(response)
})
module.exports = router