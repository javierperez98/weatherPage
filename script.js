const searchForm = document.querySelector(".search-city");
const cityName = document.querySelector(".city-name");

search = (e) => {
	e.preventDefault();
	const city = cityName.value;
	console.log(city);
	searchForm.reset();
	const searchCity = city.replace(/\s+/g, "+").toLowerCase();
	console.log(searchCity);
	let requestUrl =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		searchCity +
		"&units=imperial&appid=080f42673958d9248cf81c7911a0770a";
	fetch(requestUrl).then(function (weatherInfo) {
		if (weatherInfo.status === 200) {
			weatherInfo.json().then((data) => {
				console.log(data);
			});
		}
	});
};

searchForm.addEventListener("submit", search);

window.addEventListener("DOMContentLoaded", (event) => {
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

// var fiveDay =
// 	"https://api.openweathermap.org/data/2.5/onecall?lat=" +
// 	data.coord.lat +
// 	"&lon=" +
// 	data.coord.lon +
// 	"&exclude=current,minutely,alerts,hourly&units=imperial&appid=080f42673958d9248cf81c7911a0770a";
// // fetch for 5 day weather forecast data
// fetch(fiveDay).then(function (forecast) {
// 	forecast.json().then((data) => {});
// });
