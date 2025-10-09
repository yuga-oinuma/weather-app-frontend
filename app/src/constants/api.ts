const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API = {
  WEATHER_CURRENT: (city: string) =>
    `${BASE_URL}/api/weather/current?city=${city}`,
  WEATHER_SUMMARY_DAILY: (date: string) =>
    `${BASE_URL}/api/weather/summary/daily?date=${date}`,
  WEATHER_TIMESERIES_DAILY: (date: string) =>
    `${BASE_URL}/api/weather/timeseries/daily?date=${date}`,
  WEATHER_SUMMARY_WEEKLY: (date: string) =>
    `${BASE_URL}/api/weather/summary/weekly?date=${date}`,
  WEATHER_TIMESERIES_WEEKLY: (date: string) =>
    `${BASE_URL}/api/weather/timeseries/weekly?date=${date}`,
};
