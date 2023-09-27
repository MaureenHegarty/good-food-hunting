// i want to connect to the database
// connect to the db
// get all the records

const pg = require('pg')

const client = new pg.Client({
    database: 'stocks_app',

})

client.connect()

client.query("SELECT * FROM stocks WHERE ticker = 'tsla';", (err, result) =>  {
    if (err)  {
        console.log(err)
    }
    console.log(result.rows)
    client.end()
})