export type ApiCurrentWeather = {
  weather: { id: number }[];
  main: { temp: number; humidity: number };
  dt: number;
};
