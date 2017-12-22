import axios from 'axios'
const { REACT_APP_URL: url, REACT_APP_SECRET_CODE: apiKey } = process.env

export const sources = axios.get(`${url}/sources?language=en&apiKey=${apiKey}`).then(res => {
  return res.data
})
