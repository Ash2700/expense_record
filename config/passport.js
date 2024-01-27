const passport = require('passport')
const LocalStrategy = require('passport-local')
const db = require('../models')
const User = db.Users
const bcrypt = require('bcryptjs')
passport.use(new LocalStrategy({ usernameField: 'email' },
    async (username, password, done) => {
        try {
            const user = await User.findOne({
                attributes: ['id', 'name', 'email', 'password'],
                where: { email: username },
                raw: true
            })
            if (!user) {
                return done(null, false, { message: 'email錯誤' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return done(null, false, { message: '密碼錯誤' })
            }
            return done(null, user)
        } catch (error) {
            error.errorMessage = '登入失敗'
        }
    }))
//存取user資料在passport
passport.serializeUser((user, done) => {
    const { id, name, email } = user
    return done(null, { id, name, email })
})

passport.deserializeUser((user, done) => {
    done(null, { id: user.id })
})

module.exports = passport