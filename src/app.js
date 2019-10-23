const express =  require('express');
const morgan = require('morgan')
const mysql =  require('mysql')
const pool = require('./database')
const app = express()


app.set('port', 4000)
app.use(morgan('dev'))
app.use(express.json())
app.use('/data', require('./router/index'))
app.listen(app.get('port'),()=>{
    console.log("server estart on port: ",app.get('port'));
    
})
