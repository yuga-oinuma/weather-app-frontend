import React, { useEffect, useState } from "react";
import { WeatherCardData } from "../types/view/weather";
import WeatherCard from "../components/dataDisplay/WeatherCard";
import PageSection from "../components/layout/PageSection";
import PageTitle from "../components/layout/PageTitle";
import Loading from "../components/common/Loading";
import Message from "../components/common/Message";
import { CITIES } from "../constants/location";
import { API } from "../constants/api";
import { fetcher } from "../utils/fetcher";
import { ApiCurrentWeather } from "../types/api/weather";

const Home: React.FC = () => {
  const [weatherList, setWeatherList] = useState<WeatherCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const results = await Promise.all(
          CITIES.map(async (city) => {
            const url = API.WEATHER_CURRENT(city);
            const data = await fetcher<ApiCurrentWeather>(url);
            return {
              city: city,
              temp: data.main.temp,
              humidity: data.main.humidity,
              timestamp: data.dt,
              weather_id: data.weather[0].id,
            };
          })
        );
        setWeatherList(results);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <PageSection>
      <PageTitle title="現在の天気" />
      {loading && <Loading />}
      {error && <Message message="レポートの取得に失敗しました。" />}
      {!loading && !error && (
        <div
          className="
            flex flex-wrap justify-center
            w-full max-w-screen-lg mx-auto
          "
        >
          {weatherList.map((data) => (
            <WeatherCard key={data.city} data={data} />
          ))}
        </div>
      )}
    </PageSection>
  );
};

export default Home;
