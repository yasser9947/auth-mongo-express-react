const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firs_name : String,
    last_name : String , 
    email : {
        required : true , type: String
    },
    password : {
        required : true , type: String
    },
    games: [{type: Schema.Types.ObjectId, ref: 'game'}]



},{timestamps:true} )
const User = mongoose.model('user' , userSchema)
module.exports = User