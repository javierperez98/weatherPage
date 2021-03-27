var currentCity = document.getElementById("city");
var currentTemp = document.getElementById("temp");
var currentHumid = document.getElementById("humid");
var currentWind = document.getElementById("wind");
var currentUV = document.getElementById("uv");
var currentIcon = document.getElementById("icon")
var currentCard = document.getElementById("currentCard")
var forecastCard = document.getElementById("forecastCard")
var currentDay = moment().format('MM/DD/YYYY');

$("#search").submit(function(event){
    event.preventDefault();
    var city = $("#userInput").val();
    var userCity = $("#userInput").val();
    document.getElementById("search").reset();
    userCity = userCity.replace(/\s+/g, ',').toLowerCase();
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ 
    userCity + "&units=imperial&appid=080f42673958d9248cf81c7911a0770a";

    fetch(requestUrl)
    .then(function (weatherInfo) {
    console.log(weatherInfo);
    if (weatherInfo.status === 200) {
        weatherInfo.json()
        .then(data => {
            console.log(data);
            var weather = data.weather[0].icon;
            var icon = "http://openweathermap.org/img/wn/" + weather + "@2x.png";
            var temp = data.main.temp;
            var humid = data.main.humidity;
            var wind = data.wind.speed;
            currentIcon.setAttribute("src", icon);
            currentCity.innerHTML = city +" "+ currentDay;
            currentTemp.innerHTML = "Temperature: " + temp + " °F";
            currentHumid.innerHTML = "Humidity: " + humid + " %";
            currentWind.innerHTML = "Wind Speed: " + wind + " MPH";

            var uvURL ="http://api.openweathermap.org/data/2.5/uvi?lat="+ 
            data.coord.lat+ "&lon=" +data.coord.lon+ "&appid=080f42673958d9248cf81c7911a0770a";
            fetch(uvURL)
            .then(function(uvInfo){
                console.log(uvInfo);
                uvInfo.json()
                .then(data => {
                    console.log(data.value)
                    currentUV.innerHTML = "UV Index: " + data.value;
                    currentCard.style.display = "block";
                    forecastCard.style.display = "block";
                })
            })
        });
    }
    else {
        alert("City not Available or does not exist. Please try again.")
        return;
    }    
  });
});