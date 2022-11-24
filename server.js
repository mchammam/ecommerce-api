require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('connected'))
    .catch(e => console.log(e));

const articles = require('./routes/aricles')
app.use('/articles', articles)

app.listen(process.env.PORT)