require('dotenv').config()
const express = require('express')
const app = express()

const articles = require('./routes/aricles')
app.use('/articles', articles)

app.listen (process.env.PORT)