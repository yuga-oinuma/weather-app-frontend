import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ApiDailySummary } from "../../types/api/summary";
import { ApiTempHourly } from "../../types/api/timeSeries";
import Loading from "../common/Loading";
import Message from "../common/Message";
import SummaryTable from "../dataDisplay/SummaryTable";
import TimeSeriesChart from "../dataDisplay/TimeSeriesChart";
import ContentBlock from "./ContentBlock";
import {
  CITY_COLOR_MAP,
  CITY_NAME_MAP,
  CITIES,
} from "../../constants/location";
import WeatherIcon from "../dataDisplay/WeatherIcon";
import { TableIndicator } from "../../types/view/indicator";
import DateSelector from "../common/DateSelector";
import { API } from "../../constants/api";
import { fetcher } from "../../utils/fetcher";

const ReportDaily: React.FC = () => {
  const [summaryList, setSummaryList] = useState<ApiDailySummary[]>([]);
  const [hourlyList, setHourlyList] = useState<ApiTempHourly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(yesterday);
  const hasData = summaryList.length > 0 || hourlyList.length > 0;
  const indicators: TableIndicator<ApiDailySummary>[] = [
    {
      key: "weather_id",
      label: "天気",
      render: (value) =>
        typeof value === "number" ? (
          <WeatherIcon weatherId={value} size="sm" />
        ) : (
          "-"
        ),
    },
    { key: "temp_avg", label: "平均気温 (°C)" },
    { key: "temp_max", label: "最高気温 (°C)" },
    { key: "temp_min", label: "最低気温 (°C)" },
    { key: "temp_diff", label: "気温差 (°C)" },
    { key: "humidity_avg", label: "平均湿度 (%)" },
  ];

  useEffect(() => {
    if (!selectedDate) return;
    const formatted = format(selectedDate, "yyyy-MM-dd");

    const fetchSummary = async () => {
      setLoading(true);
      setError(false);
      setSummaryList([]);
      setHourlyList([]);

      try {
        const [summaryData, tempHourly] = await Promise.all([
          fetcher<ApiDailySummary[]>(API.WEATHER_SUMMARY_DAILY(formatted)),
          fetcher<ApiTempHourly[]>(API.WEATHER_TIMESERIES_DAILY(formatted)),
        ]);
        setSummaryList(summaryData);
        setHourlyList(tempHourly);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [selectedDate]);

  return (
    <div>
      <DateSelector
        selected={selectedDate}
        onChange={setSelectedDate}
        mode="daily"
      />
      {loading && <Loading />}
      {error && <Message message="レポートの取得に失敗しました。" />}
      {!loading &&
        !error &&
        (hasData ? (
          <>
            {hourlyList.length > 0 && (
              <ContentBlock title="1日の気温変化">
                <TimeSeriesChart
                  data={hourlyList}
                  dataKeys={CITIES}
                  labelMap={CITY_NAME_MAP}
                  colorMap={CITY_COLOR_MAP}
                  datakey="time"
                  yUnit="℃"
                />
              </ContentBlock>
            )}
            {summaryList.length > 0 && (
              <ContentBlock title="気象データサマリー">
                <SummaryTable
                  data={summaryList}
                  labelMap={CITY_NAME_MAP}
                  indicators={indicators}
                />
              </ContentBlock>
            )}
          </>
        ) : (
          <Message message="データがありません。" />
        ))}
    </div>
  );
};

export default ReportDaily;
