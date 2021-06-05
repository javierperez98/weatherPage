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

	const forecast = [
		{
			city: data.name,
			date: formatDate(data.dt),
			weather: data.weather[0].icon,
			temp: data.main.temp,
			humid: data.main.humidity,
			wind: data.wind.speed,
			uv: fiveDay.daily[0].uvi,
		},
	];

	for (i = 1; i < 6; i += 1) {
		const day = {
			city: "",
			date: formatDate(fiveDay.daily[i].dt),
			weather: fiveDay.daily[i].weather[0].icon,
			temp: fiveDay.daily[i].temp.day,
			humid: fiveDay.daily[i].humidity,
			wind: "",
			uv: "",
		};
		forecast.push(day);
	}

	console.log(forecast);
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
	const day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
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
