const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/user' , {useUnifiedTopology: true , useNewUrlParser : true})
.then( res => console.log('mongoDB is connectd'))
.catch(err => console.log(err))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/users' , require('./route/user'))

app.listen(2550 , ()=> console.log('server is running ' + 2550))
