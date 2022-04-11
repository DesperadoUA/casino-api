module.exports = (sequelize, DataTypes) => {
    const Common = {
            status: {
                type: DataTypes.ENUM(['public', 'hide', 'basket']),
                defaultValue: 'public'
            },
            permalink: {
                type: DataTypes.STRING,
                unique: true
            },
            title: {
                type: DataTypes.STRING
            },
            thumbnail: {
                type: DataTypes.STRING
            },
            short_desc: {
                type: DataTypes.STRING
            },
            h1: {
                type: DataTypes.STRING
            },
            meta_title: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            keywords: {
                type: DataTypes.STRING
            },
            content: {
                type: DataTypes.TEXT
            },
            lang: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("NOW()")
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal("NOW()")
            }
        }
    return Common
}