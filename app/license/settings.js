const tableName = require('../../tables')
const table = 'LICENSE'
const config = {
    postType: 'license',
    postTypeSlug: 'license',
    postTypeCategory: 'license/category',
    postTypeCategorySlug: 'licenses',
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
    faq: {
        default: [],
        dataType: 'JSON',
        schemas: {
            type: 'TEXT'
        }
    }
}
module.exports = {
    config,
    fields
}