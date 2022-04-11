module.exports = (tableName, sequelize, DataTypes) => {
    const Relatives = sequelize.define(tableName, {
            post_id: DataTypes.INTEGER,
            relative_id: DataTypes.INTEGER
        },
        {
            tableName: tableName,
            timestamps:false
        })
    return Relatives
}