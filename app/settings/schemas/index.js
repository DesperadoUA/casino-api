const {fields, config} = require('../settings')
const Helper = require('../../../helpers')
module.exports = (sequelize, DataTypes) => {
    const data = Helper.createSchemas(fields, DataTypes)
    const Post = sequelize.define(config.mainDb, data,
        {
            tableName: config.mainDb,
            timestamps:false
        })
    return Post
}