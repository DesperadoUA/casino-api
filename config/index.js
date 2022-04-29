require('dotenv').config()
_API_URL = 'http://127.0.0.1:5000'
_PORT = process.env.PORT || 5000
_NODE_ENV = process.env.NODE_ENV || 'development'
_APP_DIR = './app'
_CASH = {}
_LANG = {1: 'ru', 2: 'ua'}
_LANG_ID = {'ru': 1, 'ua': 2}
_SLUG_LANG = {1: '', 2: '/ua'}
_CONFIG_EDITOR = {
    TEXT_DECODE: ['image', 'input', 'rich_text'],
    JSON_DECODE: ['two_input_image', 'input_text', 'multiple_menu', 'multiple_bonus']
   }
_THUMBNAIL = 'http://127.0.0.1:5000/img/default.png' 