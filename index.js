const express = require('express')

const app = express()

app.use(express.json())

app.use('/api/mobiles', require('./routes/api/mobile'))

app.listen(3000, () => console.log("Server started on Port 3000"))