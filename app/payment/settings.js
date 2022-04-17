const tableName = require('../../core/models/tableName')
const table = 'PAYMENT'
const config = {
    postType: 'payment',
    postTypeSlug: 'payment',
    postTypeCategory: 'payment/category',
    postTypeCategorySlug: 'payments',
    orderKey: ['created_at', 'updated_at'], /* Key for sort */

    table: table, /* For config tableName */
    mainDb: tableName[table].main,           // key in core db
    metaDb: tableName[table].meta,
    categoryDb: tableName[table].category,
    relativeDB: tableName[table].relative.category,
    relatives: {}
}
const fields = {
    site: {
        default: '',
        dataType: 'STRING',
        schemas: {
            type: 'STRING'
        }
    },
    withdrawal: {
        default: '',
        dataType: 'STRING',
        schemas: {
            type: 'STRING'
        }
    },
    commission: {
        default: '',
        dataType: 'STRING',
        schemas: {
            type: 'STRING'
        }
    },
    withdrawal_period: {
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