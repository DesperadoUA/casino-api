const config = {
    mainDb: 'pages',
}
const fields = {
    post_type: {
        default: 'static-pages',
        dataType: 'STRING',
        schemas: {
            type: 'STRING',
            defaultValue: 'static-pages'
        }
    },
    slug: {
        default: 'static-pages',
        dataType: 'STRING',
        schemas: {
            type: 'STRING',
            defaultValue: 'static-pages'
        }
    },
    faq: {
        dataType: 'TEXT',
        schemas: {
            type: 'TEXT'
        }
    }
}
module.exports = {
    config,
    fields
}