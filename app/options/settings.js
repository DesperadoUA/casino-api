const config = {
    mainDb: 'options',
}
const fields = {
    slug: {
        default: 'options',
        dataType: 'STRING',
        schemas: {
            type: 'STRING',
            defaultValue: 'options'
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
    }
}
module.exports = {
    config,
    fields
}