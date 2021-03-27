$("#search").submit(function(event){
    event.preventDefault();
    var city = $("#userInput").val()
    document.getElementById("search").reset();
    city = city.replace(/\s+/g, '-').toLowerCase();
    var requestUrl = "api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=080f42673958d9248cf81c7911a0770a";
    console.log(requestUrl);
});