const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const PORT = process.env.PORT || 5000
const mongoURI = config.get('mongoURI')
const app = express()


async function start() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to database...')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
    app.use('/api/users', require('./routes/api/users'))
    app.use('/api/profile', require('./routes/api/profile'))
    app.use('/api/posts', require('./routes/api/posts'))
    app.use('/api/auth', require('./routes/api/auth'))

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}
start()