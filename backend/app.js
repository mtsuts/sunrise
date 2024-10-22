const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const authRouter = require('./router/auth')
const getAthleteRouter = require('./router/getAthlete')
const logoutRouter = require('./router/logout')
const savedActivityRouter = require('./router/getAndSaveActivity')
const allActivitiesRouter = require('./router/getAllActivities')
require('dotenv').config()
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000


app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

const store = MongoStore.create({
  mongoUrl: 'mongodb://127.0.0.1:27017/session-store',
  collectionName: 'sessions',
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60 * 24
  },
}));


// strava authentication
app.use(authRouter)

// save data from strava into the database and get from the database
app.use(getAthleteRouter)

// logout from strava
app.use(logoutRouter)

// get and save chosen activity
app.use(savedActivityRouter)

// get all activities from DB
app.use(allActivitiesRouter)



app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})
