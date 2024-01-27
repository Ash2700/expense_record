if(process.env.NODE_ENV=== 'development'){
    require('dotenv').config()
}
const express =require('express')
const { engine } = require('express-handlebars')
const flash = require('connect-flash')
const session= require('express-session')
const passport= require('./config/passport')
const app = express()
const messageHandler= require('./middleware/message-handler')
const errorHandler = require('./middleware/errorMessage-handle')
const router= require('./routes')
const port= 3000


app.engine('hbs',engine({extname:('.hbs')}))
app.set('view engine','.hbs')
app.set('views','./views')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
console.log('1')

app.use(messageHandler)
app.use(router)
app.use(errorHandler)


app.listen(port,(()=>{
    console.log(`express server is running on http://localhost:${port}`)
}))