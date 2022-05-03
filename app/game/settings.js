const tableName = require('../../tables')
const table = 'GAME'
const config = {
    postType: 'game',
    postTypeSlug: 'game',
    postTypeCategory: 'game/category',
    postTypeCategorySlug: 'games',
    orderKey: ['created_at', 'updated_at'], /* Key for sort */
    keySort: 'rating',
    table: table, /* For config tableName */
    mainDb: tableName[table].main,           // Naming for Shemas (core shemas)
    metaDb: tableName[table].meta,
    categoryDb: tableName[table].category,
    relativeDB: tableName[table].relative.category,
    relatives: {
        casino: {
            relativePostType: 'CASINO',
            key: 'casino', 
            responseKey: 'game_casino',
            table: tableName[table].relative.casino,
            mainDb: tableName[table].main,
            relativeDb: tableName.CASINO.main
        },
        vendor: {
            relativePostType: 'VENDOR',
            key: 'vendor', 
            responseKey: 'game_vendor',
            table: tableName[table].relative.vendor,
            mainDb: tableName[table].main,
            relativeDb: tableName.VENDOR.main
        }
    }
}
const fields = {
    iframe: {
        default: '',
        dataType: 'STRING',
        schemas: {
            type: 'TEXT'
        }
    },
    rating: {
        default: 0,
        dataType: 'INTEGER',
        schemas: {
            type: 'INTEGER',
            defaultValue: 0
        }
    },
    details: {
        default: [],
        dataType: 'JSON',
        schemas: {
            type: 'TEXT'
        }
    },
    characters: {
        default: [],
        dataType: 'JSON',
        schemas: {
            type: 'TEXT'
        }
    },
    galery: {
        default: [],
        dataType: 'JSON',
        schemas: {
            type: 'TEXT'
        }
    },
    rtp: {
        default: '0',
        dataType: 'STRING',
        schemas: {
            type: 'STRING',
            defaultValue: '0'
        }
    },
    volatility: {
        default: '',
        dataType: 'STRING',
        schemas: {
            type: 'STRING',
            defaultValue: ''
        }
    },
    min_rate: {
        default: '',
        dataType: 'STRING',
        schemas: {
            type: 'STRING',
            defaultValue: ''
        }
    }
}
module.exports = {
    config,
    fields
}