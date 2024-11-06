import axios from 'axios'

export const getLang = async () => {
  const lang = await axios.get('/lang/ru.json');
  return lang;
}
