const tableName = require('../../core/models/tableName')
const table = 'LICENSE'
const config = {
    postSlug: 'license',
    categorySlug: 'licenses',
    postType: 'license',
    postTypeSlug: 'license',
    postTypeCategory: 'license/category',
    postTypeCategorySlug: 'licenses',
    orderKey: ['created_at', 'updated_at'], /* Key for sort */

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