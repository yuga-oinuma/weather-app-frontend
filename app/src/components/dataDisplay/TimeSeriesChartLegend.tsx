import React from "react";

type Props = {
  dataKeys: string[];
  labelMap: { [key: string]: string };
  colorMap: { [key: string]: string };
};

const TimeSeriesChartLegend: React.FC<Props> = ({
  dataKeys,
  labelMap,
  colorMap,
}) => {
  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 0,
      }}
    >
      {dataKeys.map((key) => (
        <li
          key={key}
          style={{
            margin: "0 8px",
            color: colorMap[key],
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="14" height="14" style={{ marginRight: 4 }}>
            <rect width="14" height="14" fill={colorMap[key]} />
          </svg>
          {labelMap[key] ?? key}
        </li>
      ))}
    </ul>
  );
};

export default TimeSeriesChartLegend;
