module.exports = (config, sequelize, DataTypes) => {
    const CommonModel = require('./CommonSchema')(sequelize, DataTypes)
    const Category = sequelize.define(config.categoryDb, {
            ...CommonModel,
            parent_id: {
                type: DataTypes.INTEGER, 
                defaultValue: 0
            },
            post_type: {
                type: DataTypes.STRING,
                defaultValue: config.postTypeCategory
            },
            slug: {
                type: DataTypes.STRING,
                defaultValue: config.postTypeCategorySlug
            },
            faq: {
                type: DataTypes.TEXT
            }
        },
        {
            tableName: config.categoryDb,
            timestamps:false
        })
    return Category
}