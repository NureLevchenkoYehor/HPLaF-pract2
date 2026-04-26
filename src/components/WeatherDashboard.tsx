import { useQuery } from "react-query";
import type { Coord, WeatherResponse } from "../types/WeatherResponse";
import { Button, Container, Stack } from "@mui/material";
import WeatherDetails from "./WeatherDetails";
import WeatherMainInfo from "./WeatherMainInfo";

interface WeatherDashboardProps {
  coords: Coord
}


function WeatherDashboard({ coords }: WeatherDashboardProps) {
  const { data: weatherData, isLoading, error } = useQuery<WeatherResponse, Error>({
    queryKey: ['weatherData', coords],
    queryFn: () => fetchWeather(coords),
  });

  const handleDownload = () => {
    const fileName = "weather_data.json";
    const json = JSON.stringify(weatherData, null, 2);

    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {(error as Error).message}
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  if (!weatherData) return null;

  const { pressure, humidity, feels_like, temp } = weatherData.main;
  const cloudness = weatherData.clouds.all;
  const weather = weatherData.weather?.[0];
  const uri = `https://openweathermap.org/img/wn/${weather?.icon}@2x.png`;

  return (
    <>
      <Container>
        <Stack
          spacing={2}
          direction={"row"}
          sx={{
            justifyContent: "center",
            m: 2
          }}>
          <WeatherMainInfo feelsLike={feels_like} temp={temp} weatherIconUri={uri} weatherDescription={weather.description} />
          <WeatherDetails pressure={pressure} humidity={humidity} cloduness={cloudness} />
        </Stack>
      </Container>

      <Button
        variant="contained"
        onClick={handleDownload}
      >
        Export ✈ 🏦
      </Button>
    </>
  );
}

export default WeatherDashboard;

async function fetchWeather(coords: { lat: number; lon: number })
  : Promise<WeatherResponse> {
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.append("lat", coords.lat.toString());
  url.searchParams.append("lon", coords.lon.toString());
  url.searchParams.append("appid", import.meta.env.VITE_WEATHER_API_KEY);
  url.searchParams.append("units", "metric");
  url.searchParams.append("lang", getUserPreferenceCountryCode());

  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

function getUserPreferenceCountryCode() {
  return navigator.languages?.[0]?.split("-")[0] || "en";
}