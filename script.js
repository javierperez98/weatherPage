var currentCity = $("#city");
var currentTemp = $("#temp");
var currentHumid = $("#humid");
var currentWind = $("#wind");
var currentUV = $("#uv");
var currentIcon = $("#icon");
var currentDay = moment().format('MM/DD/YYYY');
var formBox = $("#userInput");
var currentCard = $("#currentCard");
var forecastCard = $("#forecastCard");

var days = [
    $("#date1"),
    $("#date2"),
    $("#date3"),
    $("#date4"),
    $("#date5"),
];
var icons = [
    $("#icon1"),
    $("#icon2"),
    $("#icon3"),
    $("#icon4"),
    $("#icon5"),
];
var temps = [
    $("#temp1"),
    $("#temp2"),
    $("#temp3"),
    $("#temp4"),
    $("#temp5"),
];
var humids = [
    $("#humid1"),
    $("#humid2"),
    $("#humid3"),
    $("#humid4"),
    $("#humid5"),
];

$("#search").submit(function(event){
    event.preventDefault();
    var city = formBox.val();
    var userCity = formBox.val();
    $("#search").trigger("reset");
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
            currentIcon.attr("src", icon);
            currentCity.html(city +" "+ currentDay);
            currentTemp.html("Temperature: " + temp + " °F");
            currentHumid.html("Humidity: " + humid + " %");
            currentWind.html("Wind Speed: " + wind + " MPH");

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
                        days[i].html(moment.unix(data.daily[i+1].dt).format('MM/DD/YYYY'));
                        icons[i].attr("src", symbol);
                        temps[i].html("Temperature: " + data.daily[i+1].temp.day + " °F");
                        humids[i].html("Humidity: " + data.daily[i+1].humidity + " %");
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
                    currentUV.html("UV Index: " + data.value);
                    $(currentCard).css("display", "block");
                    $(forecastCard).css("display", "block");
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