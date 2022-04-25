const {fields, config} = require('../settings')
const Helper = require('../../../helpers')
module.exports = (sequelize, DataTypes) => {
    const CommonModel = require('./../../../core/schemas/CommonSchema')(sequelize, DataTypes)
    const data = Helper.createSchemas(fields, DataTypes)
    const Pages = sequelize.define(config.mainDb, {
            ...CommonModel,
            ...data
        },
        {
            tableName: config.mainDb,
            timestamps: false
        })
    return Pages
}