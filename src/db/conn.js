const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MongoDb_URL,{
    useNewUrlParser:true
}).then(()=>{
    console.log('Connection Successfull')
}).catch(()=>{
    console.log("Connection Terminated")
})

module.exports = mongoose