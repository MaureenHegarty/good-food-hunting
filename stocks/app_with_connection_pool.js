const pg = require('pg')

const pool = new pg.Pool({
    database: 'stocks_app',
})

pool.query('SELECT * FROM stocks;', (err, result) => {
    if (err)  {
        console.log(err);
        process.exit(1)
    }
    console.log(result.rows)
})
