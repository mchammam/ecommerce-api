const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    "imageURL": String,
    "thumbnail": String
})
const articleSchema = mongoose.Schema({
        "brand": String,
        "title": String,
        "description": String,
        "price": Number,
        "originalPrice": Number,
        "images": [imageSchema]
})

module.exports = mongoose.model("Article", articleSchema)