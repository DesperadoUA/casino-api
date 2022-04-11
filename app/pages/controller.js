const {Router} = require('express')
const auth = require('../../middleware/auth') 
const seeds = require('../../middleware/seeds') 
const {cashData, cashDestroy} = require('../../middleware/cash')
const cash = require('../../helpers/cash')
const Service = require('./service')
const router = Router()

router.get('/pages', async (req, res) => {
    const settings = {}
    if(req.query.limit) {
        const param = Number(req.query.limit)
        if(Number.isInteger(param)) settings.limit = param
    } 
    if(req.query.offset) {
        const param = Number(req.query.offset)
        if(Number.isInteger(param)) settings.offset = param
    } 
    if(req.query.lang) {
        const param = Number(req.query.lang)
        if(Number.isInteger(param)) settings.lang = param
    } 
    if(req.query.orderBy) {
        if(req.query.orderBy === 'DESC' || req.query.orderBy === 'ASC') {
            req.query.orderBy === 'DESC'
        }
    } 
    if(req.query.orderKey) {
        if(ORDER_KEY.includes(req.query.orderKey)) settings.orderKey = req.query.orderKey
    } 
    const response = await Service.index(settings)
    res.status(200).json(response)
}) 
router.get('/pages/seeds', seeds, async (req, res) => {
    const response = await Service.seeds()
    res.status(200).json(response)
}) 
router.post('/pages/destroy', seeds, async (req, res)=>{
    const response = await Service.destroy()
    res.status(200).json(response)
}) 
router.get('/pages/:url', cashData, async (req, res) => {
    const response = await Service.getPublicPostByUrl(req.params.url)
    cash.setData(req.url, response)
    res.status(200).json(response)
}) 
router.post('/admin/pages', auth, async (req, res)=>{
    const {lang, limit, offset} = req.body
    const settings = {lang, limit, offset}
    const response = await Service.indexAdmin(settings)
    res.status(200).json(response)
}) 
router.post('/admin/pages/update', auth, cashDestroy, async (req, res)=>{
    const {data} = req.body
    const response = await Service.update(data)
    res.status(200).json(response)
}) 
router.post('/admin/pages/:id', auth, async (req, res)=>{
    const response = await Service.getById(req.params.id)
    res.status(200).json(response)
}) 

module.exports = router