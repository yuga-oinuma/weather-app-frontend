import React from "react";
import Message from "../common/Message";
import ChartTooltip from "./TimeSeriesChartTooltip";
import ChartLegend from "./TimeSeriesChartLegend";
import ScrollHint from "./ScrollHint";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  data: any[];
  dataKeys: string[];
  labelMap: { [key: string]: string };
  colorMap: { [key: string]: string };
  datakey?: string;
  yUnit?: string;
  title?: string;
};

export const TimeSeriesChart: React.FC<Props> = ({
  data,
  dataKeys,
  labelMap,
  colorMap,
  datakey,
  yUnit,
  title,
}) => {
  if (data.length === 0)
    return <Message message="時系列データがありません。" />;

  return (
    <div
      style={{
        textAlign: "center",
        margin: "0 auto",
        marginBottom: "1rem",
      }}
    >
      <p>{title}</p>
      <div className="w-full overflow-x-auto mb-1 relative overflow-x-auto max-w-full">
        <ScrollHint showMs={2000} fadeMs={500} />
        <LineChart
          data={data}
          width={768}
          height={300}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey={datakey} />
          <YAxis unit={yUnit} />
          <Tooltip
            content={<ChartTooltip dataKeys={dataKeys} labelMap={labelMap} />}
          />
          {dataKeys.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colorMap[key] || "#000"}
              dot={false}
            />
          ))}
        </LineChart>
      </div>
      <ChartLegend
        dataKeys={dataKeys}
        labelMap={labelMap}
        colorMap={colorMap}
      />
    </div>
  );
};

export default TimeSeriesChart;
