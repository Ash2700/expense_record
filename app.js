const express =require('express')
const { engine } = require('express-handlebars')
const app = express()
const router= require('./routes')




app.engine('hbs',engine({extname:('.hbs')}))
app.set('view engine','.hbs')
app.set('views','./views')

app.use(router)