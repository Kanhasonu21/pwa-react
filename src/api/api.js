import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "d43aecf362a9347c1eceb9a75d203ca4";

const fetchWeather = async (query) => {
  const response = await axios
    .get(URL, {
      params: {
        q: query,
        appid: API_KEY,
      },
    })
    .then((res) => {
      return res
    }).catch(err=> console.log(err))
  return response;
};
export default fetchWeather;
