const config = {
    mainDb: 'users',
}
const fields = {
    name: {
        dataType: 'STRING',
        schemas: {
            type: 'STRING',
            unique: true
        }
    },
    email: {
        dataType: 'STRING',
        schemas: {
            type: 'STRING',
            unique: true
        }
    },
    password: {
        dataType: 'STRING',
        schemas: {
            type: 'STRING'
        }
    },
    remember_token: {
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