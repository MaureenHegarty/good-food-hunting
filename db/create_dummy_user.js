// we want t create a dummy user so we can biuld the login functionality

// async functions when u are waiting for external data (acessing movie details from OMDB)
// has nothing to do with server.js (ui web app)
// we run it by manually running the script in the terminal using node

// "stateles" horizontal scaling on servers are easier can be slow - from the beginnning
// better to SAVE session 

const pg = require('pg')
const bcrypt = require('bcrypt')

const db = new pg.Pool({
    database: 'goodfoodhunting'
})

const email = 'dt@.co'
const password = 'pudding'
const saltRounds = 10;


const sql = `
    INSERT INTO users (email, password_digest)
    VALUES ($1, $2);
    
`

//  1. generate some salt
bcrypt.genSalt(saltRounds, function(err, salt) {

    // 2. hash the password
    bcrypt.hash(password, salt, function(err, hash) {

// 3. insert user into database
        db.query(sql, [email, hash], (err, dbRes) => {
            if (err)  {
                console.log(err);

            }  else {
                console.log('user created')
            }


        })
    });
});




