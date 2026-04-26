import { Box, Card, Stack, Typography } from "@mui/material"

interface WeatherMainInfoProps {
  weatherIconUri: string,
  weatherDescription: string,
  temp: number,
  feelsLike: number
}

function WeatherMainInfo({ weatherIconUri, weatherDescription, temp, feelsLike }: WeatherMainInfoProps) {
  return (
    <Card sx={{ p: 2 }}>
      <Stack direction={"row"} sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        <Stack sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          <Box
            component="img"
            src={weatherIconUri}
            alt="weather-icon"
          />
          <Typography variant="body1" align="left" >
            {startWithCapital(weatherDescription)}
          </Typography>
        </Stack>
        <Stack sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          <Typography variant="h3">
            {temp}℃
          </Typography>
          <Typography variant="body1">
            feels like: {feelsLike}℃
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

function startWithCapital(str: string): string {
  const letters = str.split('');
  letters[0] = letters[0].toUpperCase();
  return letters.join('');
}

export default WeatherMainInfo