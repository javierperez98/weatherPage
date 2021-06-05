const searchForm = document.querySelector(".search-city");
const cityName = document.querySelector(".city-name");
const key = "&appid=080f42673958d9248cf81c7911a0770a";
const dayUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=";
const dayUrl2 = "&units=imperial" + key;
const fiveUrl1 = "https://api.openweathermap.org/data/2.5/onecall?lat=";
const fiveUrl2 = "&exclude=current,minutely,alerts,hourly&units=imperial" + key;

search = async (e) => {
	e.preventDefault();
	const city = cityName.value;
	searchForm.reset();
	const searchCity = city.replace(/\s+/g, "+").toLowerCase();
	const req = dayUrl1 + searchCity + dayUrl2;
	const data = await findCity(req);
	const fiveUrl =
		fiveUrl1 + data.coord.lat + "&lon=" + data.coord.lon + fiveUrl2;
	const fiveDay = await findCity(fiveUrl);
	const weather = [{ city: data.name, date: formatDate(data.dt) }];
	console.log(weather);
	console.log(data);
	console.log(fiveDay);
};

findCity = async (req) => {
	const res = await fetch(req);
	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}
	const data = await res.json();
	return data;
};

formatDate = (unix) => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const date = new Date(unix * 1000);
	const year = date.getFullYear().toString().substr(-2);
	const month = months[date.getMonth()];
	const day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
	return [day, month, year].join("/");
};

searchForm.addEventListener("submit", search);

window.addEventListener("DOMContentLoaded", () => {
	const sidebarToggle = document.body.querySelector("#sidebarToggle");
	if (sidebarToggle) {
		sidebarToggle.addEventListener("click", (event) => {
			event.preventDefault();
			document.body.classList.toggle("sb-sidenav-toggled");
			localStorage.setItem(
				"sb|sidebar-toggle",
				document.body.classList.contains("sb-sidenav-toggled")
			);
		});
	}
});

// {
//   "weather": [
//       {
//           "id": 801,
//           "main": "Clouds",
//           "description": "few clouds",
//           "icon": "02d"
//       }
//   ],
//   "base": "stations",
//   "main": {
//       "temp": 71.74,
//       "feels_like": 71.87,
//       "temp_min": 61.75,
//       "temp_max": 86.58,
//       "pressure": 1013,
//       "humidity": 69
//   },
//   "wind": {
//       "speed": 5.75,
//       "deg": 0
//   },
//   "clouds": {
//       "all": 20
//   },
//   "dt": 1622850558,
//   "sys": {
//       "type": 1,
//       "id": 5771,
//       "country": "US",
//       "sunrise": 1622810462,
//       "sunset": 1622861600
//   },
//   "timezone": -25200,
//   "id": 5391811,
//   "name": "San Diego",
//   "cod": 200
// }

// {
//   "daily": [
//       {
//           "dt": 1622833200,
//           "sunrise": 1622810462,
//           "sunset": 1622861600,
//           "moonrise": 1622799360,
//           "moonset": 1622843820,
//           "moon_phase": 0.83,
//           "temp": {
//               "day": 69.24,
//               "min": 61.21,
//               "max": 72,
//               "night": 63.9,
//               "eve": 71.04,
//               "morn": 61.21
//           },
//           "feels_like": {
//               "day": 68.83,
//               "night": 63.52,
//               "eve": 71.04,
//               "morn": 60.89
//           },
//           "pressure": 1014,
//           "humidity": 63,
//           "dew_point": 54.95,
//           "wind_speed": 10.29,
//           "wind_deg": 234,
//           "wind_gust": 9.46,
//           "weather": [
//               {
//                   "id": 800,
//                   "main": "Clear",
//                   "description": "clear sky",
//                   "icon": "01d"
//               }
//           ],
//           "clouds": 3,
//           "pop": 0,
//           "uvi": 9.93
//       },
//       {
//           "dt": 1622919600,
//           "sunrise": 1622896851,
//           "sunset": 1622948031,
//           "moonrise": 1622887380,
//           "moonset": 1622933460,
//           "moon_phase": 0.86,
//           "temp": {
//               "day": 69.06,
//               "min": 61.81,
//               "max": 70.72,
//               "night": 63.88,
//               "eve": 67.95,
//               "morn": 61.83
//           },
//           "feels_like": {
//               "day": 68.49,
//               "night": 63.39,
//               "eve": 67.32,
//               "morn": 61.52
//           },
//           "pressure": 1014,
//           "humidity": 60,
//           "dew_point": 53.38,
//           "wind_speed": 9.55,
//           "wind_deg": 236,
//           "wind_gust": 8.01,
//           "weather": [
//               {
//                   "id": 804,
//                   "main": "Clouds",
//                   "description": "overcast clouds",
//                   "icon": "04d"
//               }
//           ],
//           "clouds": 95,
//           "pop": 0,
//           "uvi": 9.72
//       },
//       {
//           "dt": 1623006000,
//           "sunrise": 1622983242,
//           "sunset": 1623034461,
//           "moonrise": 1622975460,
//           "moonset": 1623023160,
//           "moon_phase": 0.89,
//           "temp": {
//               "day": 67.42,
//               "min": 60.87,
//               "max": 67.68,
//               "night": 60.87,
//               "eve": 64.02,
//               "morn": 61.57
//           },
//           "feels_like": {
//               "day": 66.97,
//               "night": 60.1,
//               "eve": 63.37,
//               "morn": 61.23
//           },
//           "pressure": 1013,
//           "humidity": 66,
//           "dew_point": 54.64,
//           "wind_speed": 10.74,
//           "wind_deg": 231,
//           "wind_gust": 9.28,
//           "weather": [
//               {
//                   "id": 804,
//                   "main": "Clouds",
//                   "description": "overcast clouds",
//                   "icon": "04d"
//               }
//           ],
//           "clouds": 99,
//           "pop": 0,
//           "uvi": 9.56
//       },
//       {
//           "dt": 1623092400,
//           "sunrise": 1623069635,
//           "sunset": 1623120890,
//           "moonrise": 1623063540,
//           "moonset": 1623112920,
//           "moon_phase": 0.92,
//           "temp": {
//               "day": 63.77,
//               "min": 60.42,
//               "max": 65.28,
//               "night": 62.02,
//               "eve": 64.22,
//               "morn": 60.67
//           },
//           "feels_like": {
//               "day": 62.94,
//               "night": 61.07,
//               "eve": 63.3,
//               "morn": 59.92
//           },
//           "pressure": 1014,
//           "humidity": 66,
//           "dew_point": 51.53,
//           "wind_speed": 13,
//           "wind_deg": 225,
//           "wind_gust": 12.33,
//           "weather": [
//               {
//                   "id": 804,
//                   "main": "Clouds",
//                   "description": "overcast clouds",
//                   "icon": "04d"
//               }
//           ],
//           "clouds": 97,
//           "pop": 0,
//           "uvi": 8.14
//       },
//       {
//           "dt": 1623178800,
//           "sunrise": 1623156028,
//           "sunset": 1623207318,
//           "moonrise": 1623151800,
//           "moonset": 1623202680,
//           "moon_phase": 0.95,
//           "temp": {
//               "day": 65.75,
//               "min": 59.94,
//               "max": 68.59,
//               "night": 65.46,
//               "eve": 68.59,
//               "morn": 59.94
//           },
//           "feels_like": {
//               "day": 64.71,
//               "night": 64.96,
//               "eve": 67.73,
//               "morn": 58.93
//           },
//           "pressure": 1017,
//           "humidity": 57,
//           "dew_point": 49.23,
//           "wind_speed": 9.93,
//           "wind_deg": 298,
//           "wind_gust": 9.93,
//           "weather": [
//               {
//                   "id": 802,
//                   "main": "Clouds",
//                   "description": "scattered clouds",
//                   "icon": "03d"
//               }
//           ],
//           "clouds": 27,
//           "pop": 0,
//           "uvi": 10.69
//       },
//       {
//           "dt": 1623265200,
//           "sunrise": 1623242424,
//           "sunset": 1623293746,
//           "moonrise": 1623240360,
//           "moonset": 1623292500,
//           "moon_phase": 0.98,
//           "temp": {
//               "day": 69.51,
//               "min": 63.77,
//               "max": 71.62,
//               "night": 65.66,
//               "eve": 70.59,
//               "morn": 63.77
//           },
//           "feels_like": {
//               "day": 68.85,
//               "night": 64.94,
//               "eve": 69.84,
//               "morn": 63.23
//           },
//           "pressure": 1016,
//           "humidity": 57,
//           "dew_point": 52.68,
//           "wind_speed": 11.65,
//           "wind_deg": 287,
//           "wind_gust": 11.27,
//           "weather": [
//               {
//                   "id": 804,
//                   "main": "Clouds",
//                   "description": "overcast clouds",
//                   "icon": "04d"
//               }
//           ],
//           "clouds": 100,
//           "pop": 0,
//           "uvi": 11
//       },
//       {
//           "dt": 1623351600,
//           "sunrise": 1623328820,
//           "sunset": 1623380172,
//           "moonrise": 1623329160,
//           "moonset": 1623382200,
//           "moon_phase": 0,
//           "temp": {
//               "day": 68.92,
//               "min": 63.01,
//               "max": 70.05,
//               "night": 63.01,
//               "eve": 68.14,
//               "morn": 63.54
//           },
//           "feels_like": {
//               "day": 67.91,
//               "night": 62.02,
//               "eve": 67.06,
//               "morn": 62.74
//           },
//           "pressure": 1018,
//           "humidity": 51,
//           "dew_point": 48.47,
//           "wind_speed": 14.61,
//           "wind_deg": 281,
//           "wind_gust": 15.93,
//           "weather": [
//               {
//                   "id": 800,
//                   "main": "Clear",
//                   "description": "clear sky",
//                   "icon": "01d"
//               }
//           ],
//           "clouds": 2,
//           "pop": 0,
//           "uvi": 11
//       },
//       {
//           "dt": 1623438000,
//           "sunrise": 1623415219,
//           "sunset": 1623466596,
//           "moonrise": 1623418260,
//           "moonset": 1623471840,
//           "moon_phase": 0.04,
//           "temp": {
//               "day": 67.19,
//               "min": 60.28,
//               "max": 69.53,
//               "night": 63.9,
//               "eve": 69.08,
//               "morn": 60.28
//           },
//           "feels_like": {
//               "day": 66.15,
//               "night": 63,
//               "eve": 68.18,
//               "morn": 59.25
//           },
//           "pressure": 1014,
//           "humidity": 54,
//           "dew_point": 48.6,
//           "wind_speed": 11.61,
//           "wind_deg": 286,
//           "wind_gust": 10.71,
//           "weather": [
//               {
//                   "id": 800,
//                   "main": "Clear",
//                   "description": "clear sky",
//                   "icon": "01d"
//               }
//           ],
//           "clouds": 1,
//           "pop": 0,
//           "uvi": 11
//       }
//   ]
// }
