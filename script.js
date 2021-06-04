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
	const current = await findCity(req);
	console.log(current);
	const fiveUrl =
		fiveUrl1 + current.coord.lat + "&lon=" + current.coord.lon + fiveUrl2;
	const fiveDay = await findCity(fiveUrl);
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

formatDate = (date) => {
	var d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear().toString();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;

	return [month, day, year].join("/");
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
