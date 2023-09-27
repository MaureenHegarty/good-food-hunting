const pg = require('pg')

// use a library to hold our data by using .env

  const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL
  })

  module.exports = db