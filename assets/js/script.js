var citySearchEL=document.querySelector("#city");
var pastSearchEL=document.querySelector("#pastSearchButton");
var apiKey = "2ca49c5afa747846009dbc9516263b08";
var temp=$("#temp");
var wind=$("#wind");
var humidity=$("#humidity");
var uvi=$("#uvi");
let cityArray = [];
//searchWeather($("#recentsearches").val());

// Banner date
var today = moment();

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    var city = $("#userData").val();
    //get the textbox value
    if (city === "") {
        console.log("type in something");
    } else {
       console.log(city);
       getLatLong(city);
       }

})

  function getLatLong (city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + apiKey;
    fetch(queryURL)
    .then(function(response){
        response.json().then(function(data) {
            $("#displayCity").html(data.name+" ("+today.format("dddd, MMMM Do YYYY")+") "+
            "<img src=https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png>");
        console.log(data);
        var lat=data.coord.lat;
        var long=data.coord.lon;  
        getWeatherData(lat,long);
        saveCities(data.name);
        })
    })
}

function getWeatherData(lat, long) {
var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon="+ long+"&exclude=hourly,minutely&units=imperial&appid="+ apiKey;

fetch(queryURL)
.then(function(response){
    response.json().then(function(data) {
        console.log(data);
    //$(date).html(currentDate);
    $(temp).html(data.current.temp); 
    $(wind).html(data.current.wind_speed); 
    $(humidity).html(data.current.humidity); 
    $(uvi).html(data.current.uvi);
        if(data.current.uvi<=2){
            uvi.addClass('favorable');
        } else if(data.current.uvi>2 && data.current.uvi<8){
            uvi.addClass('moderate');
        } else if(data.current.uvi>8){
            uvi.addClass('severe');
        }
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

function saveCities(city) {
    var b = $("<button>");
    $(b).text(city);
    console.log($(b));
    $(".btn-group-vertical").prepend(b);
    var x = document.createElement("BUTTON");
    x.value=city;
    console.log(x);
    cityArray.unshift(city);
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
}


//block15.val(localStorage.getItem("block15"));