const apiKey = "13ea675147377870a9451cfa72db8be8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const WeatherIcon = document.querySelector(".weather-icon");

async function checkweather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "-- km/h";
        WeatherIcon.src = "assets/weather.png";
        document.querySelector(".weather").style.display = "block";
    } else {
        let data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            WeatherIcon.src = "assets/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            WeatherIcon.src = "assets/clear.png";
        } else if (data.weather[0].main == "Rain") {
            WeatherIcon.src = "assets/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            WeatherIcon.src = "assets/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            WeatherIcon.src = "assets/mist.png";
        } else {
            WeatherIcon.src = "assets/weather.png";
        }

        document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});

searchBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkweather(searchBox.value);
    }
});
