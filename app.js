const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

const mgDbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// DB CONNECTION
mongoose.connect(process.env.DB_CONNECT, mgDbOptions, () => {
    console.log('MongoDb connection ok')
})

// MIDDLEWARES
app.use(cors())
app.use(bodyParser.json())
app.use('/', (req, res, next) => {
    console.log('middlewares')
    next()
})

// ROUTES
const postRoutes = require('./routes/posts')

app.use('/posts', postRoutes)

// START SERVER
app.listen(3001)