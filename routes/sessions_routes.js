const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const db = require('../db')


router.get('/login', (req, res) => {
    let message = 'Please log in';
    let loggedIn = req.session.userId ? true : false;
    res.render('login',{ message: message, loggedIn: loggedIn });
})

router.post('/login', (req, res) => {
// receives email & password from the usr within the req.body.password
// hashed digested password in the database - dbRes.rows[0].password_digest
    sql = `
        SELECT * FROM users WHERE email = $1;

            `
    values = [req.body.email]

    db.query(sql, values, (err, dbRes) => {
        if (err) {
          console.log(err);
        }
    
        if (dbRes.rows.length === 0) {
            return res.render('login')
        }

        // its time to check your password
        // password from user form submission
        // hashed / digested password in the database - dbRes.rows[0].password_digest
        const userInputPassword = req.body.password 
        const hashedPasswordFromDb = dbRes.rows[0].password_digest

        bcrypt.compare(userInputPassword, hashedPasswordFromDb, (err, result) => {
            // yay - allow them in
            // req.session = {}
            req.session.userId = dbRes.rows[0].id
            if (result) {
                return res.redirect('/')
            } else {
                return res.render('login')
            }
        })

})

})

router.delete('/logout', (req, res) => {
    req.session.userId = null
    res.redirect('/login')

})

module.exports = router