const tableName = require('../../core/models/tableName')
const table = 'BONUS'
const config = {
    postSlug: 'bonus',
    categorySlug: 'bonuses',
    postType: 'bonus',
    postTypeSlug: 'bonus',
    postTypeCategory: 'bonus/category',
    postTypeCategorySlug: 'bonuses',
    orderKey: ['created_at', 'updated_at'], /* Key for sort */

    table: table, /* For config tableName */
    mainDb: tableName[table].main,           // key in core db
    metaDb: tableName[table].meta,
    categoryDb: tableName[table].category,
    relativeDB: tableName[table].relative.category,
    relatives: {}
}
const fields = {
    ref: {
        default: [],
        dataType: 'JSON',
        schemas: {
            type: 'TEXT'
        }
    },
    close: {
        default: 0,
        dataType: 'BOOLEAN',
        schemas: {
            type: 'BOOLEAN',
            defaultValue: false
        }
    },
    bonus_wager: {
        default: '',
        dataType: 'STRING',
        schemas: {
            type: 'STRING'
        }
    },
    value_bonus: {
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