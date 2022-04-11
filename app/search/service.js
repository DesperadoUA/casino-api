const CardBuilder =  require('../../core/BaseCardBuilder')
const PostModel = require('../../core/models/Post')
class Service {
    static async search(lang, searchWord) {
        const response = {
            confirm: 'ok',
            body: []
        }
        const err = []
        const posts = []
        const dataSearchCasino = await PostModel.search(lang, 'casinos', searchWord)
        err.push(dataSearchCasino.confirm)
        const result = posts.concat(dataSearchCasino.data)

        response.confirm = err.includes('error') ? 'error' : 'ok'
        response.body = CardBuilder.searchCard(result)
        return response
    }
    static async adminSearch(lang, table, searchWord) {
        const dataSearch = await PostModel.adminSearch(lang, table, searchWord)
        const response = {
            confirm: dataSearch.confirm,
            body: CardBuilder.searchAdminCard(dataSearch.data)
        }
        return response
    }
}
module.exports = Service