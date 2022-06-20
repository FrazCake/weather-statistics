import axios from 'axios';

const baseUrl = 'https://thingproxy.freeboard.io/fetch/https://api.open-meteo.com/v1';
const forecastUrl = `${baseUrl}/forecast`;

const getForecast = async (longitude: number, latitude: number, hourly: string, pastDays = 0) => {
  return (await axios.get(forecastUrl, { params: { latitude, longitude, hourly, past_days: pastDays } })).data;
};

const getTemperatures = async (longitude: number, latitude: number, pastDays: number) => {
  const forecast = await getForecast(longitude, latitude, 'temperature_2m', pastDays);
  return { data: forecast.hourly.precipitation, time: forecast.hourly.time };
};

const getPrecipitations = async (longitude: number, latitude: number, pastDays: number) => {
  const forecast = await getForecast(longitude, latitude, 'precipitation', pastDays);
  return { data: forecast.hourly.precipitation, time: forecast.hourly.time };
};

// Workaround because by using a cors proxy it seems that queristring splitted by comma are broken
const getWeatherInfo = async (longitude: number, latitude: number, pastDays: number) => {
  const temperatureDataPromise = getTemperatures(longitude, latitude, pastDays);
  const precipitationDataPromise = getPrecipitations(longitude, latitude, pastDays);
  const weatherPromises = [temperatureDataPromise, precipitationDataPromise];
  const [temperatureData, precipitationData] = await Promise.all(weatherPromises);
  return { temperatureData, precipitationData };
};

export default {
  getForecast,
  getTemperatures,
  getPrecipitations,
  getWeatherInfo,
};
