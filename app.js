if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const { engine } = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const serverStatic =require('serve-static')
const path= require('path')
const passport = require('./config/passport')
const messageHandler = require('./middleware/message-handler')
const errorHandler = require('./middleware/errorMessage-handle')
const router = require('./routes')
const handlebarsHelpers = require('./helpers/handlebarsHelpers')
const serveStatic = require('serve-static')
const app = express()
const port = 3000



app.engine('hbs', engine({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.static('public',{
  setHeaders:(res, path)=>{
    if(path.endsWith('.js')){
      res.setHeader('content-Type', 'application/javascript')
    }
  }
}))

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(messageHandler)
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
