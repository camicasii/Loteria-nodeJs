if(process.env.NODE_ENV === 'production'){ 
    require('dotenv').config();
    }
const express =  require('express');
const morgan = require('morgan')
const app = express()

console.log(process.env.USER_R);

app.set('port', 4000)
app.use(morgan('dev'))
app.use(express.json())
app.use('/data', require('./router/index'))
app.listen(app.get('port'),()=>{
    console.log("server estart on port: ",app.get('port'));
    
})
