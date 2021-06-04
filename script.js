const searchForm = document.querySelector(".search-city");
const cityName = document.querySelector(".city-name");

search = async (e) => {
	e.preventDefault();
	const city = cityName.value;
	searchForm.reset();
	const searchCity = city.replace(/\s+/g, "+").toLowerCase();
	let req =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		searchCity +
		"&units=imperial&appid=080f42673958d9248cf81c7911a0770a";

	const data = await findCity(req);
	console.log(data);
};

findCity = async (req) => {
	const res = await fetch(req);
	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}
	const data = await res.json();
	return data;
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
