const db = require('../db')

function setCurrentUser(req, res, next)   {

    res.locals.userId = req.session.userId


    if (!req.session.userId) {
        return next()
    } 
// all we have is just the id - we need to fetch from the database
const sql = `SELECT * FROM users WHERE id = $1;`
db.query(sql, [req.session.userId], (err, dbRes) => {
    if (err) {
    console.log(err)
    process.exit(1)    // stop the prcess
  
    } else {
        // making it easier to access user everywhere
        const user = dbRes.rows[0]
        res.locals.user = user
    }
    next()

})

}

module.exports = setCurrentUser
