const Model = require('../app/users/models')
async function checkAuth(req, res, next) {
    const response = {confirm: 'error'}
    const {id, session} = req.body
    const candidate = await Model.checkSession(id, session)
    if(candidate.data.length !== 0 && candidate.confirm === 'ok') next()
    else res.status(200).json(response) 
}
module.exports = checkAuth