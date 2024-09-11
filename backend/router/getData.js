const express = require('express')
const router = express.Router()
const axios = require('axios');
const session = require('express-session')
const MongoStore = require('connect-mongo')
require('../db/mongoose')
const cors = require('cors')


router.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));


router.use(session({
  secret: 'santaclause',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/session-store',
    collectionName: 'sessions',
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60 * 24
  },
}));


router.get('/get-data', async (req, res) => {
  const { AccessToken, athleteID } = req.session
  const { code } = req.query;

  async function getData(accessToken) {
    const url = `https://www.strava.com/api/v3/athlete/activities?per_page=30&page=4`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.json(response.data);
  }

  try {
    if (code && !AccessToken) {
      const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      });

      const { access_token, refresh_token, athlete } = tokenResponse.data;
      req.session.AccessToken = access_token
      req.session.athleteID = athlete.id

      getData(access_token)
    }
    if (AccessToken) {
      getData(AccessToken)
    }
  } catch (e) {
    res.status(500).send(e)
  }
})


module.exports = router