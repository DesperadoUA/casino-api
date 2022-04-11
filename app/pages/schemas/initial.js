const {config} = require('./../settings')
function init(sequelize, DataTypes){
    const db = {}
    db[config.mainDb] = require('./index')(sequelize, DataTypes)
    return db
}
module.exports = init