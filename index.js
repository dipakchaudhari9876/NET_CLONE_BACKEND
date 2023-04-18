const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8000
const UserRouter = require('./src/Router/UserRouter')
require('./src/db/conn')
app.use(express.json())

app.use(cors())

app.use('/api/user',UserRouter)

app.listen(PORT,()=>{
    console.log(`Application is running on PORT ${PORT}`)
})
