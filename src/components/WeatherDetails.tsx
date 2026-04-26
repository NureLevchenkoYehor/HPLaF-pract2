import CompressIcon from '@mui/icons-material/Compress';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CloudIcon from '@mui/icons-material/Cloud';
import { Card, Divider, Stack, Typography } from "@mui/material";

interface WeatherDetailsProps {
  pressure: number,
  humidity: number,
  cloduness: number,
}

function WeatherDetails({ pressure, humidity, cloduness }: WeatherDetailsProps) {
  return (
    <Card sx={{ p: 2, minWidth: 250, alignContent: "center", justifyContent: "center" }}>
      <Stack spacing={1.5} divider={<Divider orientation="horizontal" flexItem />}>
        <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Stack spacing={0.5} direction={"row"}>
            <CompressIcon fontSize="small" color="primary" />
            <Typography align="left">
              Pressure:
            </Typography>
          </Stack>
          <Typography align="right">
            {pressure} hPa
          </Typography>
        </Stack>
        <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Stack spacing={0.5} direction={"row"}>
            <WaterDropIcon fontSize="small" color="primary" />
            <Typography align="left">
              Humidity:
            </Typography>
          </Stack>
          <Typography align="right">
            {humidity}%
          </Typography>
        </Stack>
        <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Stack spacing={0.5} direction={"row"}>
            <CloudIcon fontSize="small" color="primary" />
            <Typography align="left">
              Cloudness:
            </Typography>
          </Stack>
          <Typography align="right">
            {cloduness}%
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

export default WeatherDetails