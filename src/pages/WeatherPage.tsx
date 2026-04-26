import { useQuery } from "react-query";
import type { Coord } from "../types/WeatherResponse";
import WeatherDashboard from "../components/WeatherDashboard";

function WeatherPage() {
  const { data, isLoading, error } = useQuery<Coord>({
    queryKey: ['coord'],
    queryFn: fetchGeolocation
  });

  if (isLoading) {
    return <div>Grabbing your geoposition...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {(error as Error).message}
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <main>
      <WeatherDashboard coords={data} />
    </main>
  );
}

export default WeatherPage

async function fetchGeolocation(): Promise<Coord> {
  const res = await fetch("http://ip-api.com/json");
  if (!res.ok) {
    throw new Error();
  }

  const { lat, lon } = await res.json();
  return {
    lat,
    lon
  } as Coord
}