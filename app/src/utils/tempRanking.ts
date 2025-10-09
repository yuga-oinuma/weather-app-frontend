import { TempRankingItem } from "../types/view/ranking";
import { ApiTempDaily } from "../types/api/timeSeries";

export const getTopTemperatures = (
  data: ApiTempDaily[],
  limit = 3,
  isMin: boolean = false,
  labelMap: { [key: string]: string }
): TempRankingItem[] => {
  const flattened: TempRankingItem[] = [];
  data.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (key !== "date") {
        flattened.push({
          city: labelMap[key] ?? key,
          date: item.date,
          value: Number(value),
        });
      }
    });
  });

  return flattened
    .sort((a, b) => (isMin ? a.value - b.value : b.value - a.value))
    .slice(0, limit);
};
