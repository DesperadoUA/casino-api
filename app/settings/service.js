const CardBuilder =  require('./CardBuilder')
const Model = require('./models')
const store = require('../../store')

class Service {
    static async index(lang) {
        const response = {
            confirm: 'ok',
            body: []
        }
        const {confirm, data} = await Model.all(lang)
        response.confirm = confirm
        response.body = CardBuilder.fetch(data)
        return response
    }
    static async seeds() {
        const response = {
            confirm: 'ok',
            body: []
        }
        const posts = [
            {
                key_id: 'header_menu_main',
                value: '[]',
                title: 'Главное меню хедера',
                editor: 'two_input_image',
                updateValue: []
            },
            {
                key_id: 'header_menu_1',
                value: '[]',
                title: 'Меню хедера 1',
                editor: 'two_input_image',
                updateValue: []
            },
            {
                key_id: 'header_menu_2',
                value: '[]',
                title: 'Меню хедера 2',
                editor: 'two_input_image',
                updateValue: []
            },
            {
                key_id: 'header_menu_3',
                value: '[]',
                title: 'Меню хедера 3',
                editor: 'two_input_image',
                updateValue: []
            },
            {
                key_id: 'bonus_main_page',
                value: '[]',
                title: 'Бонусы на главной странице',
                editor: 'multiple_bonus',
                updateValue: []
            },
            {
                key_id: 'footer_menu',
                value: '[]',
                title: 'Меню хедера',
                editor: 'two_input_image',
                updateValue: []
            },
            {
                key_id: 'footer_text',
                value: '',
                title: 'Текст в футере',
                editor: 'input',
                updateValue: ''
            },
            {
                key_id: 'main_page_casino_text',
                value: '',
                title: 'Описание казино на главной странице ру',
                editor: 'rich_text',
                updateValue: ''
            },
            {
                key_id: 'main_page_game_text',
                value: '',
                title: 'Описание игр на главной странице ру',
                editor: 'rich_text',
                updateValue: ''
            },
            {
                key_id: 'main_page_bonus_text',
                value: '',
                title: 'Описание бонусов на главной странице ру',
                editor: 'rich_text',
                updateValue: ''
            }
        ]
        const {confirm} = await Model.bulkCreate(posts)
        response.confirm = confirm
        return response
    }
    static async indexAdmin(lang) {
        const response = {
            confirm: 'ok',
            body: [],
            lang: _LANG[lang]
        }
        const {confirm, data} = await Model.all(lang)
        response.confirm = confirm
        response.body = CardBuilder.adminFetch(data)
        return response
    }
    static async update(data) {
        const response = {
            confirm: 'ok',
            body: []
        }
        const {confirm} = await Model.update(CardBuilder.update(data), data.id)
        response.confirm = confirm
        return response
    }
    static async show(id) {
        const response = {
            confirm: 'ok',
            body: []
        }
        const {confirm, data} = await Model.show(id)
        if(data.length === 0 || confirm === 'error') response.confirm = 'error'
        else response.body = CardBuilder.show(data[0])
        return response
    }
    static async destroy(){
        const response = {
            body: [],
            confirm: 'ok'
        }
        const err = []
        const {confirm} = await Model.destroy()
        err.push(confirm)
        response.confirm = err.includes('error') ? 'error' : 'ok'
        return response
    }
}
module.exports = Service