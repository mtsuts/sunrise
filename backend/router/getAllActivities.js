const express = require('express')
const router = express.Router()
const stravaAuth = require('../middleware/stravaAuth')
const { createClient } = require('@supabase/supabase-js')


const supabaseKey = process.env.SUPABASE_KEY
const supabaseUrl = process.env.SUPABASE_URL
const supabase = createClient(supabaseUrl, supabaseKey)

router.get('/get-all-activities', stravaAuth, async (req, res) => {
  const accessToken = req.session.accessToken
  const userID = req.session.athleteID
  try {
    const { data, error } = await supabase
      .from('activities')
      .select()
      .eq('athleteID', userID)

    res.send({ data: data, accessToken })
  } catch (e) {
    res.status(500).send(e.message)
  }
})



module.exports = router