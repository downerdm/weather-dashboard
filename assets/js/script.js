var citySearchEL=document.querySelector("#city");
var pastSearchEL=document.querySelector("#pastSearchButton");
var apiKey = "2ca49c5afa747846009dbc9516263b08";
var city;

document.getElementById("search").addEventListener("click", function(){
    window.location = document.getElementById('city').value;
    console.log(citySearchEL=document.querySelector("#city"));
    console.log="search button clicked"
});

getCurrentWeather = function(city) {

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)
.then(function(response){
    response.json().then(function(data) {
        showWeather(data, city);
    })
})
}



