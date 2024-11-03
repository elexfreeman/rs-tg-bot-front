import axios from 'axios'

export const apiRequset = () => {
  let auth = process.env.REACT_APP_DEV_AUTH;
  const out = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
    timeout: 1000,
    headers: {
      _auth: auth,
    },
  })

  return out
}
