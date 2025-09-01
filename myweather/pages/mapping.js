export function mapOpenMeteoToOpenWeather(data, cityName, countryCode) {
	return {
		name: cityName,
		sys: { country: countryCode },
		dt: data.current.time,
		timezone: data.timezone,
		main: {
			temp: data.current.temperature_2m,
			feels_like: data.current.apparent_temperature,
			humidity: data.current.relative_humidity_2m,
		},
		weather: [
			{
				description: mapWeatherCodeToDescription(data.current.weather_code),
				icon: mapWeatherCodeToIcon(data.current.weather_code),
			},
		],
		wind: {
			speed: data.current.wind_speed_10m,
			deg: data.current.wind_direction_10m,
		},
		daily: {
			sunrise: data.daily.sunrise[0],
			sunset: data.daily.sunset[0],
		},
	};
}

function mapWeatherCodeToDescription(code) {
	const codes = {
		0: "Clear sky",
		1: "Mainly clear",
		2: "Partly cloudy",
		3: "Overcast",
		45: "Fog",
		48: "Depositing rime fog",
		51: "Drizzle: Light",
		53: "Drizzle: Moderate",
		55: "Drizzle: Dense",
		56: "Freezing Drizzle: Light",
		57: "Freezing Drizzle: Dense",
		61: "Rain: Slight",
		63: "Rain: Moderate",
		65: "Rain: Heavy",
		66: "Freezing Rain: Light",
		67: "Freezing Rain: Heavy",
		71: "Snow fall: Slight",
		73: "Snow fall: Moderate",
		75: "Snow fall: Heavy",
		77: "Snow grains",
		80: "Rain showers: Slight",
		81: "Rain showers: Moderate",
		82: "Rain showers: Violent",
		85: "Snow showers: Slight",
		86: "Snow showers: Heavy",
		95: "Thunderstorm: Slight or moderate",
		96: "Thunderstorm with slight hail",
		99: "Thunderstorm with heavy hail",
	};
	return codes[code] || "Unknown";
}

const mapWeatherCodeToIcon = (code) => {
	if (code === 0) return "01d"; // clear sky
	if ([1, 2, 3].includes(code)) return "02d"; // mainly clear / partly cloudy / overcast
	if ([45, 48].includes(code)) return "50d"; // fog
	if ([51, 53, 55].includes(code)) return "09d"; // drizzle
	if ([56, 57].includes(code)) return "13d"; // freezing drizzle as snow icon
	if ([61, 63, 65].includes(code)) return "10d"; // rain
	if ([66, 67].includes(code)) return "13d"; // freezing rain as snow icon
	if ([71, 73, 75].includes(code)) return "13d"; // snow fall
	if (code === 77) return "13d"; // snow grains
	if ([80, 81, 82].includes(code)) return "09d"; // rain showers
	if ([85, 86].includes(code)) return "13d"; // snow showers
	if ([95, 96, 99].includes(code)) return "11d"; // thunderstorm
	return "01d"; // default to clear sky
};
