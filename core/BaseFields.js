const fields = {
    id: {
        default: 0,
        dataType: 'INTEGER'
    },
    permalink: {
        default: '',
        dataType: 'STRING'
    },
    title: {
        default: '',
        dataType: 'STRING'
    },
    status: {
        default: 'public',
        dataType: 'STRING'
    },
    thumbnail: {
        default: 'http://127.0.0.1:5000/img/default.png',
        dataType: 'STRING'
    },
    short_desc: {
        default: 'public',
        dataType: 'STRING'
    },
    h1: {
        default: '',
        dataType: 'STRING'
    },
    content: {
        default: '',
        dataType: 'STRING'
    },
    meta_title: {
        default: '',
        dataType: 'STRING'
    },
    description: {
        default: '',
        dataType: 'STRING'
    },
    keywords: {
        default: '',
        dataType: 'STRING'
    },
    lang: {
        default: 1,
        dataType: 'INTEGER'
    },
    updated_at: {
        default: '',
        dataType: 'STRING'
    },
    created_at: {
        default: '',
        dataType: 'STRING'
    }
}
module.exports = fields