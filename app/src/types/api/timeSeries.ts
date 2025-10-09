export type ApiTempHourly = {
  time: string;
  [city: string]: string | number;
};

export type ApiTempDaily = {
  date: string;
  [city: string]: string | number;
};
