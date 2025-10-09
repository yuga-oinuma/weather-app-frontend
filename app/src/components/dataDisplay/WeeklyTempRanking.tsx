import React from "react";

type Props = {
  data: {
    city: string;
    date: string;
    value: number;
  }[];
  rankingType: "high" | "low"; // 最高 or 最低
  title: string;
};

export const WeeklyTempRanking: React.FC<Props> = ({
  data,
  rankingType,
  title,
}) => {
  // ランキング色設定
  const rankColors =
    rankingType === "high"
      ? ["bg-orange-200", "bg-orange-100", "bg-orange-50"]
      : ["bg-blue-200", "bg-blue-100", "bg-blue-50"];

  const valueColor =
    rankingType === "high" ? "text-orange-700" : "text-blue-900";

  return (
    <div className="flex-1 min-w-[300px] p-4 bg-slate-50 rounded-xl shadow-md mx-2">
      <h3 className="text-lg text-center mb-4">{title}</h3>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li
            key={`${item.city}-${item.date}`}
            className={`flex justify-between items-center px-4 py-3 rounded-lg shadow-sm ${
              index < 3 ? rankColors[index] : "bg-white"
            }`}
          >
            <span className="font-bold w-10 text-center">{`${
              index + 1
            }位`}</span>
            <span className="font-medium">{item.city}</span>
            <span className="text-gray-500 text-sm w-24 text-center">
              {item.date}
            </span>
            <span className={`font-bold text-base ${valueColor}`}>
              {item.value.toFixed(1)}℃
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyTempRanking;
