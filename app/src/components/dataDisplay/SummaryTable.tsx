import Message from "../common/Message";
import { TableIndicator } from "../../types/view/indicator";

type Props<T> = {
  data: T[];
  labelMap: Record<string, string>;
  indicators: TableIndicator<T>[];
  noDataMessage?: string;
  className?: string; // 任意: 追加でカスタムしたい時
};

// cityプロパティを必須にする
export function SummaryTable<T extends { city: string }>({
  data,
  labelMap,
  indicators,
  noDataMessage = "気象データがありません。",
  className = "",
}: Props<T>) {
  if (data.length === 0) return <Message message={noDataMessage} />;

  return (
    <div className={["mx-2", className].join(" ")}>
      <table
        className="
          w-full border border-gray-300 border-collapse
          text-center text-sm sm:text-base
        "
      >
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-3 py-2">指標</th>
            {data
              .filter((item) => labelMap[item.city])
              .map((item) => (
                <th
                  key={item.city}
                  className="border border-gray-300 px-3 py-2 whitespace-nowrap"
                >
                  {labelMap[item.city]}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {indicators.map((indicator) => (
            <tr
              key={String(indicator.key)}
              className="odd:bg-white even:bg-gray-50"
            >
              <td className="border border-gray-300 px-3 py-2 font-medium">
                {indicator.label}
              </td>
              {data
                .filter((item) => labelMap[item.city])
                .map((item) => {
                const rawValue = item[indicator.key];
                const rendered = indicator.render
                  ? indicator.render(rawValue)
                  : typeof rawValue === "number"
                  ? rawValue.toFixed(1)
                  : rawValue != null
                  ? String(rawValue)
                  : "-";

                return (
                  <td
                    key={item.city + String(indicator.key)}
                    className="border border-gray-300 px-3 py-2"
                  >
                    {rendered}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SummaryTable;
