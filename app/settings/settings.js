const config = {
    mainDb: 'settings',
}
const fields = {
    slug: {
        default: 'settings',
        dataType: 'STRING',
        schemas: {
            type: 'STRING',
            defaultValue: 'settings'
        }
    },
    key_id: {
        dataType: 'STRING',
        schemas: {
            type: 'STRING',
            unique: true
        }
    },
    value: {
        dataType: 'TEXT',
        schemas: {
            type: 'TEXT'
        }
    },
    title: {
        dataType: 'STRING',
        schemas: {
            type: 'STRING'
        }
    },
    editor: {
        dataType: 'STRING',
        schemas: {
            type: 'STRING'
        }
    },
    lang: {
        dataType: 'INTEGER',
        schemas: {
            type: 'INTEGER',
            defaultValue: 1
        }
    } 
}
module.exports = {
    config,
    fields
}