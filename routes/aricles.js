const express = require('express')
const router = express.Router()

//GET categories (& navbar)
//Login
//Image upload etc..
//User settings and profile (GET & UPDATE)
//Place orders??

//articles  (:id) (filter & sort, pagination)
router.get('/', (req, res) => {
    res.send('Articles')
    console.log('articles')
})

module.exports = router