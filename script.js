// Vars for Current Weather info
var currentCity = $("#city");
var currentTemp = $("#temp");
var currentHumid = $("#humid");
var currentWind = $("#wind");
var currentUV = $("#uv");
var currentIcon = $("#icon");
var currentDay = moment().format('MM/DD/YYYY');
var currentCard = $("#currentCard");
// 5 day forecast container
var forecastCard = $("#forecastCard");
// User city search input
var formBox = $("#userInput");
// dates for 5 day forecast
var days = [
    $("#date1"),
    $("#date2"),
    $("#date3"),
    $("#date4"),
    $("#date5"),
];
// weather icon for 5 day forecast
var icons = [
    $("#icon1"),
    $("#icon2"),
    $("#icon3"),
    $("#icon4"),
    $("#icon5"),
];
// temp for 5 day forecast
var temps = [
    $("#temp1"),
    $("#temp2"),
    $("#temp3"),
    $("#temp4"),
    $("#temp5"),
];
// humidity for 5 day forecast
var humids = [
    $("#humid1"),
    $("#humid2"),
    $("#humid3"),
    $("#humid4"),
    $("#humid5"),
];
// saved user searched cities 
var saved = [
    $("#city1"),
    $("#city2"),
    $("#city3"),
    $("#city4"),
    $("#city5"),
    $("#city6"),
    $("#city7"),
    $("#city8"),
];
// form sumbit function to grab user input
$("#search").submit(function weatherSearch(event){
    event.preventDefault();
    var city = formBox.val();
    var userCity = formBox.val();
    $("#search").trigger("reset");
    userCity = userCity.replace(/\s+/g, '+').toLowerCase();
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ 
    userCity + "&units=imperial&appid=080f42673958d9248cf81c7911a0770a";
    // fetch request for current weather data
    fetch(requestUrl)
    .then(function (weatherInfo) {
    console.log(weatherInfo);
    if (weatherInfo.status === 200) {
        weatherInfo.json()
        .then(data => {
            // appends data for current weather
            console.log(data);
            var weather = data.weather[0].icon;
            var icon = "https://openweathermap.org/img/wn/" + weather + "@2x.png";
            var temp = data.main.temp;
            var humid = data.main.humidity;
            var wind = data.wind.speed;
            currentIcon.attr("src", icon);
            currentCity.html(city +" "+ currentDay);
            currentTemp.html("Temperature: " + temp + " °F");
            currentHumid.html("Humidity: " + humid + " %");
            currentWind.html("Wind Speed: " + wind + " MPH");

            var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat="+ 
            data.coord.lat + "&lon=" + data.coord.lon+ 
            "&exclude=current,minutely,alerts,hourly&units=imperial&appid=080f42673958d9248cf81c7911a0770a";
            // fetch for 5 day weather forecast data
            fetch(fiveDay)
            .then(function(forecast){
                console.log(forecast);
                forecast.json()
                .then(data => {
                    // appends data for 5day forecast to each container
                    for (i=0; i<5; i+=1) {
                        console.log(data.daily)
                        var symbol = "https://openweathermap.org/img/wn/" + data.daily[i+1].weather[0].icon + "@2x.png";
                        days[i].html(moment.unix(data.daily[i+1].dt).format('MM/DD/YYYY'));
                        icons[i].attr("src", symbol);
                        temps[i].html("Temp: " + data.daily[i+1].temp.day + " °F");
                        humids[i].html("Humidity: " + data.daily[i+1].humidity + " %");
                    };
                });
            });
            
            var uvURL ="https://api.openweathermap.org/data/2.5/uvi?lat="+ 
            data.coord.lat+ "&lon=" +data.coord.lon+ "&appid=080f42673958d9248cf81c7911a0770a";
            // fetch for UV index data
            fetch(uvURL)
            .then(function(uvInfo){
                console.log(uvInfo);
                uvInfo.json()
                .then(data => {
                    // displays all the weather info
                    console.log(data.value);
                    currentUV.html("UV Index: " + data.value);
                    $(currentCard).css("display", "block");
                    $(forecastCard).css("display", "block");
                });
            });
        });
        // store user searched cities 
        window.localStorage.setItem(city, city);
        window.localStorage.getItem(city);
        storedCities();
        formBox.attr("placeholder", "City Name");
    }
    else {
        // notify user when city search failed
        formBox.attr("placeholder", "Invalid City");
        return;
    };   
  });
});
// displays searched cities for user to use again
function storedCities() {
    var citySaved = window.localStorage;
    console.log(citySaved.length)
    for (i=0; i < citySaved.length; i+=1) {
        if(citySaved.length > 8) {
            $(saved[0]).html(window.localStorage.key(i));
        }
        $(saved[i]).html(window.localStorage.key(i));
        $(saved[i]).css("display", "block");
    };
};
$(document).ready(function() {
    storedCities();
});
// runs fuction again using saved cities
$(".customBtn").click(function() {
    var button = formBox.val($(this).text());
    console.log(button);
});
// clear button for clearing saved cities
$("#clear").click(function() {
    window.localStorage.clear();
    location.reload();
});