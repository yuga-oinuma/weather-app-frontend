import React from "react";

type Props = {
  weatherId: number;
  size?: "sm" | "md" | "lg"; // Tailwindでサイズ管理
};

const getColorClassByWeatherId = (id: number): string => {
  if (id >= 200 && id < 300) return "text-purple-600"; // 雷
  if (id >= 300 && id < 600) return "text-blue-500"; // 雨
  if (id >= 600 && id < 700) return "text-gray-400"; // 雪
  if (id >= 700 && id < 800) return "text-gray-600"; // 霧
  if (id === 800) return "text-yellow-500"; // 快晴
  if (id > 800 && id <= 804) return "text-gray-500"; // 曇り
  return "text-black"; // その他
};

const getSizeClass = (size?: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return "text-3xl";
    case "lg":
      return "text-5xl";
    default:
      return "text-4xl";
  }
};

export const WeatherIcon: React.FC<Props> = ({ weatherId, size = "md" }) => {
  const colorClass = getColorClassByWeatherId(weatherId);
  const sizeClass = getSizeClass(size);

  return <i className={`wi wi-owm-${weatherId} ${colorClass} ${sizeClass}`} />;
};

export default WeatherIcon;
