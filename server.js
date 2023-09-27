//find the .env file and load the variables defined as enviroment variables
require('dotenv').config()
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const requestLogger = require('./middlewares/request_logger')
const setCurrentUser = require('./middlewares/set_current_user')
const reqBodyMethodOverride = require('./middlewares/req_body_method_override')
const session = require('express-session')
// const db = require('./db/index.js')
const dishesRoutes = require('./routes/dishes_routes')
const sessionsRoutes = require('./routes/sessions_routes')
const pagesRoutes = require('./routes/pages_routes')
const usersRoutes = require('./routes/users_routes')
const port = 9000


app.set('view engine', 'ejs');

// ========= middlewares =========================
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))   //body parser

app.use(reqBodyMethodOverride) // This should come before any routes are defined

// enable session as an object in req so we can write key values in it
// im going to give u a long piece of string which is unique - its called a cookie
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))

//   need another station to check the userId of whether a user is logged in
// create a user object by fethonh data record from the database and mke it easy for us to access everywhere

// ==== routes ======================================
app.use(setCurrentUser);
app.use(requestLogger);
app.use(expressLayouts)




app.use('/', pagesRoutes)
app.use('/', sessionsRoutes)
app.use('/dishes', dishesRoutes)
app.use('/', usersRoutes)




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
