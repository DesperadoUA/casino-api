const tableName = require('../../core/models/tableName')
const table = 'VENDOR'
const config = {
    postType: 'vendor',
    postTypeSlug: 'vendor',
    postTypeCategory: 'vendor/category',
    postTypeCategorySlug: 'vendors',
    orderKey: ['created_at', 'updated_at'], /* Key for sort */
    keySort: 'created_at',
    table: table, /* For config tableName */
    mainDb: tableName[table].main,           // key in core db
    metaDb: tableName[table].meta,
    categoryDb: tableName[table].category,
    relativeDB: tableName[table].relative.category,
    relatives: {}
}
const fields = {
    year: {
        default: '',
        dataType: 'STRING',
        schemas: {
            type: 'STRING'
        }
    },
    number_games: {
        default: '',
        dataType: 'STRING',
        schemas: {
            type: 'STRING'
        }
    }
}
module.exports = {
    config,
    fields
}