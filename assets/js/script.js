var citySearchEL=document.querySelector("#city");
var pastSearchEL=document.querySelector("#pastSearchButton");
var apiKey = "2ca49c5afa747846009dbc9516263b08";
var temp=$("#temp");
var wind=$("#wind");
var humidity=$("#humidity");
var uvi=$("#uvi");

document.getElementById("search").addEventListener("click", function(event){
    event.preventDefault();
    var citySelect = document.getElementById('city').value;
    console.log(citySelect);
    console.log("search button clicked");
});

document.addEventListener("DOMContentLoaded", function(event) { 
   getLatLong("Atlanta");
  });

  function getLatLong (city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + apiKey;
    fetch(queryURL)
    .then(function(response){
        
        
        response.json().then(function(data) {
        console.log(data);
        var lat=data.coord.lat;
        var long=data.coord.lon;  
        getWeatherData(lat,long);
        })
    })
}

function getWeatherData(lat, long) {
var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+ long+"&exclude=hourly,minutely&units=imperial&appid="+ apiKey;

fetch(queryURL)
.then(function(response){
    response.json().then(function(data) {
        console.log(data);
    $(date).html(currentDate);
    $(temp).html(data.current.temp); 
    $(wind).html(data.current.wind_speed); 
    $(humidity).html(data.current.humidity); 
    $(uvi).html(data.current.uvi); 
    for (i=0; i<5; i++){
        var dayData = data.daily[i];
        var currentDate = new Date(dayData.dt*1000).toLocaleDateString();
        var icon = "https://openweathermap.org/img/wn/" + dayData.weather[0].icon + ".png";
        $("#date"+i).html(currentDate);
        $("#icon"+i).html("<img src=" + icon + ">");
        $("#temp"+i).html(dayData.temp.day);
        $("#wind"+i).html(dayData.wind_speed) + "mph";
        $("#humidity"+i).html(dayData.humidity);

    }
    
    })
})}