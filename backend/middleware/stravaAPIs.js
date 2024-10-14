const axios = require('axios')


const activities = async (accessToken) => {
  const activitiesURL = `https://www.strava.com/api/v3/athlete/activities?per_page=100&page=2`;
  const response = await axios.get(activitiesURL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response
}

const athletesStats = async (accessToken, athleteID) => {
  const athletesStatsURL = `https://www.strava.com/api/v3/athletes/${athleteID}/stats`
  const response = await axios.get(athletesStatsURL, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response.data
}

const stravaAthlete = async (accessToken) => {
  const athleteURL = `https://www.strava.com/api/v3/athlete`
  const response = await axios.get(athleteURL, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  return response
}

module.exports = { activities, athletesStats, stravaAthlete }