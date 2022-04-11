class CardBuilder {
    static user(user) {
        const data = {
            id: user.id,
            session: user.remember_token,
            role: user.role
        }
        return data
    }
}
module.exports = CardBuilder