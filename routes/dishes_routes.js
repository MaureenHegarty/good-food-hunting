const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensure_logged_in')


router.get('/new', ensureLoggedIn, (req, res) => {
        res.render('new_form')
})

router.post('/', ensureLoggedIn, (req, res) => {
    let title = req.body.title;
    let imageUrl = req.body.image_url;

    const sql = `INSERT INTO dishes (title, image_url, user_id) VALUES ($1, $2, $3)
    RETURNING *;
    `
    
    db.query(sql, [title, imageUrl, req.session.userId], (err, dbRes) => {
        if (err) {
            console.log(err);
        }

        res.redirect('/')
    })
})

// should the delete button be hidden?
router.delete('/:id', ensureLoggedIn, (req, res) => {

    if(req.session.userId === dish.user_id) {
        res.send.message('you must be logged in')
    }

    const sql = `DELETE FROM dishes WHERE id = ${req.params.id};`
    db.query(sql, (err, dbRes) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/')
    })
})




router.get('/:id', (req, res) => {
    // const sql = `SELECT * FROM dishes WHERE id = ${req.params.id};`
    const sql = `SELECT * FROM dishes WHERE id = $1`
    const values = [req.params.id]

       
    db.query(sql, values, (err, dbRes) => {
        if (err) {
            console.log(err);
            return;
        }

        let dish = dbRes.rows[0]
        res.render('show', { dish })
        console.log([dish])
    })
})

router.get('/:id/edit', ensureLoggedIn, (req, res) => {

    let dishId = req.params.id
    let sql = `SELECT * FROM dishes WHERE id = $1;`

    db.query(sql, [dishId], (err, dbRes) => {
        if (err)  {
            console.log (err);
            res.status(500).send('Database query error');
            return;
        }

        let dish = dbRes.rows[0]
        res.render('edit_form', { dish })
    })

    
})

router.put('/:id', ensureLoggedIn, (req, res) => {
    const sql = `
    UPDATE dishes
    SET title = $1, image_url = $2
    WHERE id = $3;
  `

  const values = [req.body.title, req.body.image_url, req.params.id]


  db.query(sql, values, (err, dbRes) => {
    if (err) {
      console.log(err);
    }

    res.redirect(`/dishes/${req.params.id}`) // redirects are get requests
})
})


module.exports = router