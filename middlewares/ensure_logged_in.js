

function ensureLoggedIn(req, res, next)  {
    if(req.session.userId) {
        //res.session.message = 'you must fill in the form first'
        return next()
    }

    res.redirect('/login')

}

module.exports = ensureLoggedIn