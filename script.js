$("#search").submit(function(event){
    event.preventDefault();
    var city = $("#userInput").val()
    document.getElementById("search").reset();
    city = city.replace(/\s+/g, ',').toLowerCase();
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&units=imperial&appid=080f42673958d9248cf81c7911a0770a";
    
    fetch(requestUrl)
    .then(function (response) {
    console.log(response);
    if (response.status === 200) {
        response.json()
        .then(data => {
            var icon = data.weather.icon;
            var temp = data.main.temp;
            var humid = data.main.humidity;
            var wind = data.wind.speed;
            
        });
    }
    else {
        return;
    }    
  });
});