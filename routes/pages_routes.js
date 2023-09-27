const express = require('express')
const router = express.Router()
const db = require('../db')



router.get('/', (req, res) => {
    console.log(req.session.userId)
    db.query('SELECT * FROM dishes order by title;', (err, dbRes) => {
        let dishes = dbRes.rows
        res.render('home', { dishes: dishes})
    })
})

router.get('/about', (req, res) => {
    res.render('new_form')
})

module.exports = router