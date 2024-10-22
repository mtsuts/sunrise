import axios from 'axios'


export const GetAthlete = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  let url = `http://localhost:3000/get-athlete`
  try {
    if (code) {
      url += `?code=${code}`
    }
    const response = await axios.get(url, {
      withCredentials: true,
    })
    localStorage.setItem('token', response.data.accessToken)
    return response.data
  } catch (e) {
    console.log(e.message)
  }
}

export const GetAndSaveActivity = async (before, after, activityName) => {
  const url = `http://localhost:3000/get-activity?before=${before}&after=${after}&activityName=${activityName}`
  try {
    const response = await axios.get(url, {
      withCredentials: true
    })
    return response.data
  } catch (e) {
    console.log(e.message)
  }
}

export const GetAllActivities = async() => {
  const url = `http://localhost:3000/get-all-activities`
  try {
    const response = await axios.get(url, {
      withCredentials: true
    })
    return response.data
  } catch(e){
    console.log(e.message)
  }

}