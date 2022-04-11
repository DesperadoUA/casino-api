const Helper = require('../../helpers')
module.exports = (settings, sequelize, DataTypes) => {
    const data = Helper.createSchemas(settings.fields, DataTypes)
    const PostMeta = sequelize.define(settings.config.metaDb, data,
        {
            tableName: settings.config.metaDb,
            timestamps: false
        })
    PostMeta.removeAttribute('id');
    return PostMeta 
}