import React from "react";

type PayloadItem = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
  dataKeys: string[];
  labelMap: { [key: string]: string };
};

const TimeSeriesChartTooltip: React.FC<Props> = ({
  active,
  payload,
  label,
  dataKeys,
  labelMap,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  // payload を表示順に並び替える
  const sortedPayload = dataKeys
    .map((key) => payload.find((p) => p.name === key))
    .filter((item): item is PayloadItem => !!item);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    >
      <p>
        <strong>{label}</strong>
      </p>
      <ul style={{ paddingLeft: 0, margin: 0 }}>
        {sortedPayload.map((entry) => (
          <li
            key={entry.name}
            style={{ color: entry.color, listStyle: "none" }}
          >
            {labelMap[entry.name] ?? entry.name}: {entry.value.toFixed(1)} ℃
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSeriesChartTooltip;
