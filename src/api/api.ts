import axios from 'axios';
import { getTelegram } from 'src/telegram';

export const apiRequset = async <T>(url: string, data: T) => {
  let auth = process.env.REACT_APP_DEV_AUTH;
  if (process.env.REACT_APP_STEND === 'prod') {
    auth = getTelegram().WebApp.initData || '';
  }

  const out = await axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
    timeout: 1000,
    headers: {
      _auth: auth,
    },
  })({
    method: 'post',
    url,
    data: {
      auth,
      ...data,
    },
  });
  return out.data;
};
