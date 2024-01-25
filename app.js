const express =require('express')
const { engine } = require('express-handlebars')
const app = express()
const router= require('./routes')
const port= 3000



app.engine('hbs',engine({extname:('.hbs')}))
app.set('view engine','.hbs')
app.set('views','./views')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

app.use(router)



app.listen(port,(()=>{
    console.log(`express server is running on http://localhost:${port}`)
}))