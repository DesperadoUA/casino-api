const settings = require('./../settings')
const config = settings.config
function init(sequelize, DataTypes){
    const db = {}
    db[config.mainDb] = require('../../../core/schemas/CommonPostSchema')(config, sequelize, DataTypes)
    db[config.metaDb] = require('../../../core/schemas/CommonMetaSchema')(settings, sequelize, DataTypes)
    db[config.categoryDb] = require('../../../core/schemas/CommonCategorySchema')(config, sequelize, DataTypes)
    db[config.relativeDB] = require('../../../core/schemas/CommonRelativeSchema')(config.relativeDB, sequelize, DataTypes)

    db[config.mainDb].hasOne(db[config.metaDb], {onDelete: 'CASCADE', foreignKey: 'post_id'})
    db[config.metaDb].belongsTo(db[config.mainDb], {foreignKey: 'post_id'})

    db[config.mainDb].belongsToMany(db[config.categoryDb], {through: config.relativeDB, foreignKey: 'post_id', onDelete: 'CASCADE'})
    db[config.categoryDb].belongsToMany(db[config.mainDb], {through: config.relativeDB, foreignKey: 'relative_id', onDelete: 'CASCADE'})
    return db
}

module.exports = init