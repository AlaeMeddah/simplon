import { mapOpenMeteoToOpenWeather } from "../mapping";

export default async function handler(req, res) {
  const { cityInput } = req.body;

  // find coordinates for citiy
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}`
  );
  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) {
    return res.status(404).json({ message: "City not found, try again!" });
  }
  const { latitude, longitude, name, country_code } = geoData.results[0];

  // call to open-meteo
  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset&models=meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,weather_code&timezone=auto&forecast_days=1`
  );
  const data = await getWeatherData.json();

  //mapp output to mimic openweather 
  const WeatherData = mapOpenMeteoToOpenWeather(data, name, country_code);

  res.status(200).json(WeatherData);
}
