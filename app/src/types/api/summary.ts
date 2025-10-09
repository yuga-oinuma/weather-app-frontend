export type ApiDailySummary = {
  city: string;
  date: string;
  temp_avg: number;
  temp_max: number;
  temp_min: number;
  temp_diff: number;
  humidity_avg: number;
  weather_id: number;
};

export type ApiWeeklySummary = {
  city: string;
  temp_avg: number;
  temp_max: number;
  temp_min: number;
  temp_diff: number;
  humidity_avg: number;
};
