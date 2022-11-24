const express = require('express')
const router = express.Router()

const Article = require('../models/Article')

function createLinkHeader({ page, limit, totalCount, query }) {
    const last = Math.ceil(totalCount / limit)
    const next = page < last ? page + 1 : null
    const previous = page > 1 ? page - 1 : null

    const linkHeader = new Array()

    const selfLinkURL = new URLSearchParams(query);
    linkHeader.push(`/${selfLinkURL}; rel=self`)

    const lastLinkQuery = { ...query }
    lastLinkQuery.page = last
    const lastLinkURL = new URLSearchParams(lastLinkQuery);
    linkHeader.push(`/${lastLinkURL}; rel=last`)

    if (next) {
        const nextLinkQuery = { ...query }
        nextLinkQuery.page = next
        const nextLinkURL = new URLSearchParams(nextLinkQuery);
        linkHeader.push(`, /${nextLinkURL}; rel=next`)
    }

    if (previous) {
        const previousLinkQuery = { ...query }
        previousLinkQuery.page = previous
        const previousLinkURL = new URLSearchParams(previousLinkQuery);
        linkHeader.push(`, /?${previousLinkURL}; rel=previous`)
    }

    return linkHeader.join(", ")
}

//GET categories (& navbar)
//Login
//Image upload etc..
//User settings and profile (GET & UPDATE)
//Place orders??

// (filter)
router.get('/', async (req, res) => {
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    const order = req.query.order ? req.query.order : -1

    console.log(req.query.filter)

    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10
    const skipIndex = (page - 1) * limit;

    const articles = await Article.find(req.query.filter)
        .sort({ [sortBy]: order })
        .limit(limit)
        .skip(skipIndex)
        .catch(err => res.status(500).send({ "message": err.message }))


    const totalCount = await Article.find()
        .count()
        .catch(err => res.status(500).send({ "message": err.message }))

    const linkHeader = createLinkHeader({ page, limit, totalCount, query: req.query })


    res.set('X-Total-Count', `${totalCount}`)
    res.set('link', linkHeader)
    res.json(articles)
})

    .get('/:id', async (req, res) => {
        const articles = await Article.findById(req.params.id)
            .catch(err => res.status(500).send({ "message": err.message }))

        res.json(articles)
    })

    .post('/', (req, res) => {
        res.send('Articles POST')
    })

    .patch('/:id', (req, res) => {
        res.send('Articles PATCH')
    })

    .delete('/:id', (req, res) => {
        res.send('Articles DELETE')
    })

module.exports = router