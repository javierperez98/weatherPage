var currentCity = document.getElementById("city");
var currentTemp = document.getElementById("temp");
var currentHumid = document.getElementById("humid");
var currentWind = document.getElementById("wind");
var currentUV = document.getElementById("uv");
var currentIcon = document.getElementById("icon");
var currentCard = document.getElementById("currentCard");
var currentDay = moment().format('MM/DD/YYYY');
var forecastCard = document.getElementById("forecastCard");
var formBox = $("#userInput");

var days = [
    document.getElementById("date1"),
    document.getElementById("date2"),
    document.getElementById("date3"),
    document.getElementById("date4"),
    document.getElementById("date5"),
];
var icons = [
    document.getElementById("icon1"),
    document.getElementById("icon2"),
    document.getElementById("icon3"),
    document.getElementById("icon4"),
    document.getElementById("icon5"),
];
var temps = [
    document.getElementById("temp1"),
    document.getElementById("temp2"),
    document.getElementById("temp3"),
    document.getElementById("temp4"),
    document.getElementById("temp5"),
];
var humids = [
    document.getElementById("humid1"),
    document.getElementById("humid2"),
    document.getElementById("humid3"),
    document.getElementById("humid4"),
    document.getElementById("humid5"),
];

$("#search").submit(function(event){
    event.preventDefault();
    var city = formBox.val();
    var userCity = formBox.val();
    document.getElementById("search").reset();
    userCity = userCity.replace(/\s+/g, '+').toLowerCase();
    var requestUrl = "HTTPS://api.openweathermap.org/data/2.5/weather?q="+ 
    userCity + "&units=imperial&appid=080f42673958d9248cf81c7911a0770a";

    fetch(requestUrl)
    .then(function (weatherInfo) {
    console.log(weatherInfo);
    if (weatherInfo.status === 200) {
        weatherInfo.json()
        .then(data => {
            console.log(data);
            var weather = data.weather[0].icon;
            var icon = "HTTPS://openweathermap.org/img/wn/" + weather + "@2x.png";
            var temp = data.main.temp;
            var humid = data.main.humidity;
            var wind = data.wind.speed;
            currentIcon.setAttribute("src", icon);
            currentCity.innerHTML = city +" "+ currentDay;
            currentTemp.innerHTML = "Temperature: " + temp + " °F";
            currentHumid.innerHTML = "Humidity: " + humid + " %";
            currentWind.innerHTML = "Wind Speed: " + wind + " MPH";

            var fiveDay = "HTTPS://api.openweathermap.org/data/2.5/onecall?lat="+ 
            data.coord.lat + "&lon=" + data.coord.lon+ 
            "&exclude=current,minutely,alerts,hourly&units=imperial&appid=080f42673958d9248cf81c7911a0770a";

            fetch(fiveDay)
            .then(function(forecast){
                console.log(forecast);
                forecast.json()
                .then(data => {
                    for (i=0; i<5; i+=1) {
                        console.log(data.daily)
                        var symbol = "HTTPS://openweathermap.org/img/wn/" + data.daily[i+1].weather[0].icon + "@2x.png";
                        days[i].innerHTML = moment.unix(data.daily[i+1].dt).format('MM/DD/YYYY');
                        icons[i].setAttribute("src", symbol);
                        temps[i].innerHTML = "Temperature: " + data.daily[i+1].temp.day + " °F";
                        humids[i].innerHTML = "Humidity: " + data.daily[i+1].humidity + " %";
                    };
                });
            });
            
            var uvURL ="HTTPS://api.openweathermap.org/data/2.5/uvi?lat="+ 
            data.coord.lat+ "&lon=" +data.coord.lon+ "&appid=080f42673958d9248cf81c7911a0770a";
            
            fetch(uvURL)
            .then(function(uvInfo){
                console.log(uvInfo);
                uvInfo.json()
                .then(data => {
                    console.log(data.value);
                    currentUV.innerHTML = "UV Index: " + data.value;
                    currentCard.style.display = "block";
                    forecastCard.style.display = "block";
                });
            });
        });

        window.localStorage.setItem(city, city);
        console.log(window.localStorage.getItem(city));
    }
    else {
        alert("City not Available or does not exist. Please try again.");
        return;
    };   
  });
});