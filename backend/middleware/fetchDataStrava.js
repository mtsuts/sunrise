const axios = require('axios')
const { saveActivities, fetchActivitiesById, saveAthleteData, fetchAthletes } = require('../db/supabase')
const { fromMetersSecondToKmsHour, fromMetersToKms, dateFormatter, fromSecondsToMins } = require('../utils/metricsUpdates')
const geocode = require('../utils/geocoding')
const { activities, stravaAthlete } = require('./stravaAPIs')
const polyline = require('@mapbox/polyline')


// fetch and save authorized athlete data from strava
const fetchAthlete = async (req, res, next) => {
  try {
    const { code } = req.query
    const accessToken = req.session.accessToken
    
    if (!accessToken) {
      throw new Error('Access token missing!')
    }
    if (code) {
      const stravaAthleteData = await stravaAthlete(accessToken)

      const athleteData = [
        {
          athleteID: stravaAthleteData.data.id,
          name: `${stravaAthleteData.data?.firstname} ${stravaAthleteData.data?.lastname}` || '',
          city: stravaAthleteData.data?.city || '',
          country: stravaAthleteData.data.country || '',
          state: stravaAthleteData.data?.state || '',
          avatar: stravaAthleteData.data?.profile || ''
        }
      ]

      // fetch athletes from supabase database
      const athletesDB = await fetchAthletes()

      if (athletesDB.length === 0) {
        await saveAthleteData(athleteData);
      } else {
        const filtereduserAthletes = athleteData.filter((athlete) =>
          !athletesDB.some(d => Number(d.athleteID) === athlete.athleteID)
        );

        if (filtereduserAthletes.length > 0) {
          await saveAthleteData(filtereduserAthletes);
        }
      }
    }
    next()
  } catch (e) {
    res.status(500).send(e.message)
  }
}


// fetch and save authorized athlete activities from strava
const fetchActivities = async (req, res, next) => {
  const before = req.query.before
  const after = req.query.after
  
  try {
    const { code } = req.query
    const accessToken = req.session.accessToken
    if (!accessToken) {
      throw new Error('Access token missing!')
    }
      const activitiesResponse = await activities(accessToken, before, after)
      const userID = activitiesResponse?.data[0]?.athlete.id

      const userActivities = await Promise.all(activitiesResponse.data.map(async (d) => {
        return {
          name: d.name,
          type: d.type,
          athleteID: d.athlete.id,
          activityID: d.id,
          averageSpeed: fromMetersSecondToKmsHour(d.average_speed),
          distance: fromMetersToKms(d.distance),
          startDate: dateFormatter(d.start_date),
          polyline: polyline.decode(d.map.summary_polyline),
          startCoords: d.start_latlng,
          endCoords: d.end_latlng,
          elevatationGain: Math.floor(d.total_elevation_gain),
          sportType: d.sport_type,
          country: d.location_country,
          movingTime: fromSecondsToMins(d.moving_time),
          elevationHigh: Math.floor(d.elev_high),
          elevationLow: Math.floor(d.elev_low),
          city: await geocode(d.start_latlng[0], d.start_latlng[1])
        }
      }))

      const userDBActivities = await fetchActivitiesById(userID);

      if (userDBActivities.length === 0) {
        await saveActivities(userActivities);
      } else {
        const filtereduserActivities = userActivities.filter((activity) =>
          !userDBActivities.some(d => Number(d.activityID) === activity.activityID)
        );

        if (filtereduserActivities.length > 0) {
          await saveActivities(filtereduserActivities);
        }
      }
    next()
  } catch (e) {
    res.status(500).send(e.message)
  }
}


module.exports = { fetchAthlete, fetchActivities }