const {fields, config} = require('../settings')
const Helper = require('../../../helpers')
module.exports = (sequelize, DataTypes) => {
    const data = Helper.createSchemas(fields, DataTypes)
    const Model = sequelize.define(config.mainDb, {
            ...data,
            role: {
                type: DataTypes.ENUM(['admin', 'editor', 'guest']),
                defaultValue: 'editor'
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("NOW()")
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("NOW()")
            }
        },
        {
            tableName: config.mainDb,
            timestamps: false
        })
    return Model
}