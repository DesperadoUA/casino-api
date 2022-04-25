const Helper = require('../../../helpers')
const {fields} = require('../../../app/casino/settings')
const store = require('../../../store')
describe('Meta fields', () => {
    it(`Save empty`,() => {
        const result = Helper.metaSave({}, fields)
        for(const key in fields) {
            if(fields[key].dataType === 'JSON') {
                expect(result[key]).toEqual(JSON.stringify(fields[key].default))
            } else {
                expect(result[key]).toEqual(fields[key].default)
            }
        } 
    })
    it(`Save with data`,() => {
        const data = {
            faq: store.faq,
            reviews: store.reviews,
            ref: store.ref,
            close: 0,
            rating: 75,
            phone: 'phone',
            min_deposit: 'min_deposit',
            min_payments: 'min_payments',
            email: 'email',
            chat: 'chat',
            year: 'year',
            site: 'site',
            withdrawal: 'withdrawal',
            number_games: 'number_games',
            events: [],
            welcome_bonus: 'welcome_bonus 100$',
            freespins: 'freespins1'
        }
        const result = Helper.metaSave(data, fields)
        for(const key in fields) {
            if(fields[key].dataType === 'JSON') {
                expect(result[key]).toEqual(JSON.stringify(data[key]))
            } else {
                expect(result[key]).toEqual(data[key])
            }
        } 
    })
})