const tableName = require('../../core/models/tableName')
const table = 'ARTICLE'
const config = {
    postSlug: 'article',
    categorySlug: 'articles',
    postType: 'article',
    postTypeSlug: 'article',
    postTypeCategory: 'article/category',
    postTypeCategorySlug: 'articles',
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