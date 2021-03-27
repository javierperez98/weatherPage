var currentCity = document.getElementById("city");
var currentTemp = document.getElementById("temp");
var currentHumid = document.getElementById("humid");
var currentWind = document.getElementById("wind");
var currentUV = document.getElementById("uv");
var currentIcon = document.getElementById("icon");
var currentCard = document.getElementById("currentCard");
var currentDay = moment().format('MM/DD/YYYY');
var forecastCard = document.getElementById("forecastCard");

var day1Date = document.getElementById("date1");
var day1Icon = document.getElementById("icon1");
var day1Temp = document.getElementById("temp1");
var day1Humid = document.getElementById("humid1");

var day2Date = document.getElementById("date2");
var day2Icon = document.getElementById("icon2");
var day2Temp = document.getElementById("temp2");
var day2Humid = document.getElementById("humid2");

var day3Date = document.getElementById("date3");
var day3Icon = document.getElementById("icon3");
var day3Temp = document.getElementById("temp3");
var day3Humid = document.getElementById("humid3");

var day4Date = document.getElementById("date4");
var day4Icon = document.getElementById("icon4");
var day4Temp = document.getElementById("temp4");
var day4Humid = document.getElementById("humid4");

var day5Date = document.getElementById("date5");
var day5Icon = document.getElementById("icon5");
var day5Temp = document.getElementById("temp5");
var day5Humid = document.getElementById("humid5");

$("#search").submit(function(event){
    event.preventDefault();
    var city = $("#userInput").val();
    var userCity = $("#userInput").val();
    document.getElementById("search").reset();
    userCity = userCity.replace(/\s+/g, '+').toLowerCase();
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

            var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat="+ 
            data.coord.lat + "&lon=" + data.coord.lon+ 
            "&exclude=current,minutely,alerts,hourly&units=imperial&appid=080f42673958d9248cf81c7911a0770a";

            fetch(fiveDay)
            .then(function(forecast){
                console.log(forecast);
                forecast.json()
                .then(data => {
                    console.log(data.daily)
                    var iconDay1 = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png";
                    day1Date.innerHTML = moment.unix(data.daily[1].dt).format('MM/DD/YYYY');
                    day1Icon.setAttribute("src", iconDay1);
                    day1Temp.innerHTML = "Temperature: " + data.daily[1].temp.day + " °F";
                    day1Humid.innerHTML = "Humidity: " + data.daily[1].humidity + " %";
                })
            })
            
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