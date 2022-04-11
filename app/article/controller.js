const {Router} = require('express')
const auth = require('./../../middleware/auth')
const seeds = require('./../../middleware/seeds')
const queryParams = require('./../../middleware/queryParams') 
const {cashData, cashDestroy} = require('./../../middleware/cash')
const Service = require('./service')
const CategoryService = require('./CategoryService')
const cash = require('./../../helpers/cash')
const settings = require('./settings')

const TABLE = settings.config.table
const ORDER_KEY = settings.config.orderKey
const postSlug = settings.config.postSlug
const categorySlug = settings.config.categorySlug
const router = Router()

router.get(`/${postSlug}`, queryParams, async (req, res) => {
    const settings = {}
    if('queryParams' in req) {
        for(key in req.queryParams) settings[key] = req.queryParams[key]
    }
    if(req.query.orderKey) {
        if(ORDER_KEY.includes(req.query.orderKey)) settings.orderKey = req.query.orderKey
    } 
    const response = await Service.index(settings)
    res.status(200).json(response)
})
router.get(`/${postSlug}/seeds`, seeds, async (req, res) => {
    const response = await Service.seeds(10)
    res.status(200).json(response)
})
router.get(`/${postSlug}/:url`, cashData, async (req, res) => {
    const response = await Service.getPublicPostByUrl(req.params.url)
    cash.setData(req.url, response)
    res.status(200).json(response)
})
router.get(`/${categorySlug}`, queryParams, async (req, res) => {
    const settings = {}
    if('queryParams' in req) {
        for(key in req.queryParams) settings[key] = req.queryParams[key]
    }
    if(req.query.orderKey) {
        if(ORDER_KEY.includes(req.query.orderKey)) settings.orderKey = req.query.orderKey
    } 
    const response = await CategoryService.index(settings)
    res.status(200).json(response)
})
router.get(`/${categorySlug}/seeds`, seeds, async (req, res) => {
    const response = await CategoryService.seeds(10)
    res.status(200).json(response)
})
router.get(`/${categorySlug}/:url`, cashData, async (req, res) => {
    const response = await CategoryService.getPublicPostByUrl(req.params.url)
    cash.setData(req.url, response)
    res.status(200).json(response)
})

router.post(`/admin/${categorySlug}`, auth, async (req, res)=>{
    const {lang, limit, offset} = req.body
    const settings = {lang, limit, offset}
    const response = await Service.indexAdmin(settings)
    res.status(200).json(response)
})
router.post(`/admin/${postSlug}/update`, auth, cashDestroy, async (req, res)=>{
    const {data} = req.body
    const response = await Service.update(data, TABLE)
    res.status(200).json(response)
})
router.post(`/admin/${postSlug}/delete`, auth, cashDestroy, async (req, res)=>{
    const {data} = req.body
    const response = await Service.delete(data)
    res.status(200).json(response)
})
router.post(`/admin/${postSlug}/store`, auth, cashDestroy, async (req, res) => {
    const {data} = req.body
    const response = await Service.store(data, TABLE)
    res.status(200).json(response)
})

router.post(`/admin/${postSlug}/category`, auth, async (req, res)=>{
    const {lang, limit, offset} = req.body
    const settings = {lang, limit, offset}
    const response = await CategoryService.indexAdmin(settings)
    res.status(200).json(response)
})
router.post(`/admin/${postSlug}/category/update`, auth, cashDestroy, async (req, res)=>{
    const {data} = req.body
    const response = await CategoryService.update(data, TABLE)
    res.status(200).json(response)
})
router.post(`/admin/${postSlug}/category/delete`, auth, cashDestroy, async (req, res)=>{
    const {data} = req.body
    const response = await CategoryService.delete(data)
    res.status(200).json(response)
})
router.post(`/admin/${postSlug}/category/store`, auth, cashDestroy, async (req, res)=>{
    const {data} = req.body
    const response = await CategoryService.store(data, TABLE)
    res.status(200).json(response)
})

router.post(`/admin/${postSlug}/category/:id`, auth, async (req, res)=>{
    const response = await CategoryService.getById(req.params.id)
    res.status(200).json(response)
})
router.post(`/admin/${postSlug}/:id`, auth, async (req, res)=>{
    const response = await Service.getById(req.params.id)
    res.status(200).json(response)
})

module.exports = router