const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    "imageURL": String,
    "thumbnail": String
})
const articleSchema = mongoose.Schema({
    "gender": {
        type: String,
        required: true,
        validate: {
            validator: v => v==="m" || v==="f",
            message: `Gender value must be "m" or "f"`
        }
    },
    "brand": String,
    "title": String,
    "description": String,
    "price": Number,
    "originalPrice": Number,
    "images": [imageSchema]
})

module.exports = mongoose.model("Article", articleSchema)