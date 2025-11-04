import React, { useEffect, useState } from "react";
import { ApiWeeklySummary } from "../../types/api/summary";
import { ApiTempDaily } from "../../types/api/timeSeries";
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
import { TableIndicator } from "../../types/view/indicator";
import DateSelector from "../common/DateSelector";
import { API } from "../../constants/api";
import { fetcher } from "../../utils/fetcher";
import { getTopTemperatures } from "../../utils/tempRanking";
import { startOfWeek, format, subDays } from "date-fns";
import { WeeklyTempRanking } from "../dataDisplay/WeeklyTempRanking";

const ReportWeekly: React.FC = () => {
  const [summaryList, setSummaryList] = useState<ApiWeeklySummary[]>([]);
  const [dailyList, setDailyList] = useState<ApiTempDaily[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(() =>
    subDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 7)
  );
  const startDate = startOfWeek(selectedDate ?? new Date(), {
    weekStartsOn: 1,
  });
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const hasData = summaryList.length > 0 || dailyList.length > 0;

  const indicators: TableIndicator<ApiWeeklySummary>[] = [
    { key: "temp_avg", label: "平均気温 (°C)" },
    { key: "temp_max", label: "最高気温 (°C)" },
    { key: "temp_min", label: "最低気温 (°C)" },
    { key: "temp_diff", label: "気温差 (°C)" },
    { key: "humidity_avg", label: "平均湿度 (%)" },
  ];

  useEffect(() => {
    if (!selectedDate) return;

    const formatted = format(startDate, "yyyy-MM-dd");

    const fetchSummary = async () => {
      setLoading(true);
      setError(false);
      setSummaryList([]);
      setDailyList([]);

      try {
        const [summaryData, tempDaily] = await Promise.all([
          fetcher<ApiWeeklySummary[]>(API.WEATHER_SUMMARY_WEEKLY(formatted)),
          fetcher<ApiTempDaily[]>(API.WEATHER_TIMESERIES_WEEKLY(formatted)),
        ]);
        setSummaryList(summaryData);
        setDailyList(tempDaily);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <div>
      <DateSelector
        selected={selectedDate}
        onChange={setSelectedDate}
        mode="weekly"
      />
      {loading && <Loading />}
      {error && <Message message="レポートの取得に失敗しました。" />}
      {!loading &&
        !error &&
        (hasData ? (
          <>
            {dailyList.length > 0 && (
              <>
                <ContentBlock title="1週間の気温変化">
                  <TimeSeriesChart
                    data={dailyList}
                    dataKeys={CITIES}
                    labelMap={CITY_NAME_MAP}
                    colorMap={CITY_COLOR_MAP}
                    datakey="date"
                    yUnit="℃"
                  />
                </ContentBlock>
                <ContentBlock title="週間気温ランキング">
                  <div className="flex flex-col md:flex-row gap-4">
                    <WeeklyTempRanking
                      data={getTopTemperatures(
                        dailyList,
                        5,
                        false,
                        CITY_NAME_MAP
                      )}
                      rankingType="high"
                      title="最高気温"
                    />
                    <WeeklyTempRanking
                      data={getTopTemperatures(
                        dailyList,
                        5,
                        true,
                        CITY_NAME_MAP
                      )}
                      rankingType="low"
                      title="最低気温"
                    />
                  </div>
                </ContentBlock>
              </>
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

export default ReportWeekly;
