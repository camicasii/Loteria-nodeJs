if(process.env.NODE_ENV === 'production'){ 
    require('dotenv').config();
    }
const express =  require('express');
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.set('port',process.env.PORT|| 4000)
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/data', require('./router/index'))
app.listen(app.get('port'),()=>{
    console.log("server estart on port: ",app.get('port'));
    
})
