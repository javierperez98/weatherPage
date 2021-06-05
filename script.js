const searchForm = document.querySelector(".search-city");
const cityName = document.querySelector(".city-name");
const cardsContainer = document.querySelector(".cards-container");
const key = "&appid=080f42673958d9248cf81c7911a0770a";
const dayUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=";
const dayUrl2 = "&units=imperial" + key;
const fiveUrl1 = "https://api.openweathermap.org/data/2.5/onecall?lat=";
const fiveUrl2 = "&exclude=current,minutely,alerts,hourly&units=imperial" + key;

function deleteChild() {
	document.querySelector(".weather-card-1").remove();
	document.querySelector(".weather-card-2").remove();
	document.querySelector(".weather-card-3").remove();
	document.querySelector(".weather-card-4").remove();
	document.querySelector(".weather-card-5").remove();
}

search = async (e) => {
	e.preventDefault();
	await deleteChild();
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
			style: "col-12 weather-card-1",
			city: data.name,
			date: formatDate(data.dt),
			icon: "",
			icon1: `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`,
			temp: data.main.temp,
			humid: data.main.humidity,
			wind: data.wind.speed,
			uv: fiveDay.daily[0].uvi,
		},
	];

	for (i = 1; i < 5; i += 1) {
		const day = {
			style: `col-xl-3 col-md-6 weather-card-${i + 1}`,
			city: "",
			date: formatDate(fiveDay.daily[i].dt),
			icon: `<img src="https://openweathermap.org/img/wn/${fiveDay.daily[i].weather[0].icon}@2x.png">`,
			icon1: "",
			temp: fiveDay.daily[i].temp.day,
			humid: fiveDay.daily[i].humidity,
			wind: fiveDay.daily[i].wind_speed,
			uv: fiveDay.daily[i].uvi,
		};
		forecast.push(day);
	}
	createCards(forecast);
};

createCards = (arr) => {
	arr.forEach((info) => {
		let markup = `<div class="${info.style}">
      <div class="card text-light bg-primary mb-3">
      <div class="card-body p-4">
      <h3 class="card-title">${info.city} ${info.date} ${info.icon1}</h3>
      <h3 class="card-title text-center">${info.icon}</h3>
      <p class="card-text">Temperature: ${info.temp} °F</p>
      <p class="card-text">Humidity: ${info.humid} %</p>
      <p class="card-text">Wind Speed: ${info.wind} MPH</p>
      <p class="card-text">UV Index: ${info.uv} %</p>
      </div>
      </div>
      </div>`;
		cardsContainer.insertAdjacentHTML("beforebegin", markup);
	});
};

findCity = async (req) => {
	const res = await fetch(req);
	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}
	return res.json();
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
	const year = date.getFullYear();
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

const demo = [
	{
		style: "weather-card-1 col-12",
		city: "San Diego",
		date: "04/Jun/2021",
		icon: "",
		icon1: '<img src="https://openweathermap.org/img/wn/04n@2x.png">',
		temp: 61.99,
		humid: 84,
		wind: 6.91,
		uv: 9.93,
	},
	{
		style: "weather-card-2 col-xl-3 col-md-6",
		city: "",
		date: "05/Jun/2021",
		icon: '<img src="https://openweathermap.org/img/wn/01d@2x.png">',
		icon1: "",
		temp: 68.25,
		humid: 61,
		wind: 6.91,
		uv: 9.93,
	},
	{
		style: "weather-card-3 col-xl-3 col-md-6",
		city: "",
		date: "06/Jun/2021",
		icon: '<img src="https://openweathermap.org/img/wn/03d@2x.png">',
		icon1: "",
		temp: 66.67,
		humid: 66,
		wind: 6.91,
		uv: 9.93,
	},
	{
		style: "weather-card-4 col-xl-3 col-md-6",
		city: "",
		date: "07/Jun/2021",
		icon: '<img src="https://openweathermap.org/img/wn/04d@2x.png">',
		icon1: "",
		temp: 63.52,
		humid: 65,
		wind: 6.91,
		uv: 9.93,
	},
	{
		style: "weather-card-5 col-xl-3 col-md-6",
		city: "",
		date: "08/Jun/2021",
		icon: '<img src="https://openweathermap.org/img/wn/03d@2x.png">',
		icon1: "",
		temp: 66.18,
		humid: 55,
		wind: 6.91,
		uv: 9.93,
	},
];

createCards(demo);
