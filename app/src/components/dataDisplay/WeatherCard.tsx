import React from "react";
import WeatherIcon from "./WeatherIcon";
import { WeatherCardData } from "../../types/view/weather";
import { CITY_NAME_MAP } from "../../constants/location";

type Props = {
  data: WeatherCardData;
};

export const WeatherCard: React.FC<Props> = ({ data }) => {
  const updatedDate = new Date(data.timestamp * 1000);
  const formattedTime = updatedDate.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const displayCityName = CITY_NAME_MAP[data.city] ?? data.city;

  return (
    <div className="w-1/2 sm:w-1/3">
      <div
        className="
        bg-white border border-gray-300 rounded-lg shadow
        p-4 text-center mx-2 mb-4
      "
      >
        <h1 className="text-lg font-bold mb-1">{displayCityName}</h1>
        <div className="flex justify-center mb-2">
          <WeatherIcon weatherId={data.weather_id} size="lg" />
        </div>
        <p className="leading-tight">
          気温：{data.temp.toFixed(1)} °C
          <br />
          湿度：{data.humidity} %
        </p>
        <p className="mt-2 text-xs text-gray-500">
          最終更新
          <br />
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
