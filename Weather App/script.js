let inputSearch = document.getElementById("input");
let btnSearch = document.getElementById("btnSearch");
let imgWeather = document.getElementById("imageWeather");
let tempory = document.getElementById("tempory");
let city = document.getElementById("city");
let humidity = document.getElementById("humidity");
let speed = document.getElementById("speed");


function displayWeather(data) {
    console.log(data)
    city.textContent = data.name;
    tempory.textContent = Math.round(data.main.temp) + "°c";
    humidity.textContent = data.main.humidity + "%";
    speed.textContent = Math.round(data.wind.speed *3.6) + "km/h";
    let weather = data.weather[0].main;
    switch (weather) {
        case "Clouds":
            imgWeather.src = "images/clouds.png";
            break;
        case "Clear":
            imgWeather.src = "images/clear.png";
            break;
        case "Drizzle":
            imgWeather.src = "images/drizzle.png";
            break;
        case "Mist":
            imgWeather.src = "images/mist.png";
            break;
        case "Rain":
            imgWeather.src = "images/rain.png";
            break;
        case "Snow":
            imgWeather.src = "images/snow.png";
            break;
        default:
            imgWeather.src = "images/clouds.png";
    }

}


function checkInput() {
    let value = inputSearch.value.trim();
    if (value === '') {
        alert("Error! Enter City Name");
        return null;
    }
    return value;
}

btnSearch.addEventListener("click", () => {
    let inputValue = checkInput();
    if (inputValue === null) return;
    getWeather(inputValue)
})

const apiKey = "9691fdc33bfc56756841a3273e8d87d8";
let baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric"

async function getWeather(city) {

    let url = (!city) ?
        baseURL + `&q=safi&appid=${apiKey}` : baseURL + `&q=${encodeURIComponent(city)}&appid=${apiKey}`;

    try {
        const Response = await fetch(url);
        if (!Response.ok) { throw new Error("City not found") };

        const data = await Response.json();
        displayWeather(data);
    } catch (error) {
        inputSearch.value = '';
        alert('Error! Enter The Correct City Name');
        console.error(error);
    }
    
}
getWeather()