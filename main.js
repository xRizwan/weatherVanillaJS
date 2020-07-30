// Cache DOM
let submit = document.getElementById("submitBtn");
let city = document.getElementById("city");
let loadingText = document.getElementById("load");
let loader = document.querySelector(".loader");
let locationText = document.getElementById("location");
let container = document.getElementById("weatherContainer");
let weatherText = document.getElementById("weather");
let icon = document.getElementById("weatherIcon")
let today = document.getElementById("today");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let temperature = document.getElementById("temperature")
let descriptionText = document.getElementById("weatherDescription");
let fahBtn = document.getElementById("fahrenheit");
let celBtn = document.getElementById("celsius");
let tempInK;

// getting current day
let day = new Date().getDay();
let result = '';

// array to get the current day
let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

/*
get user data i.e ipaddress and location
fetch("https://freegeoip.app/json/", {mode : 'cors'})
.then( result => result.json() )
.then( result => userData=result );
*/

submit.addEventListener("click", (event) => {
    event.preventDefault();
    container.style.display = "none";

    container.classList.add("animate__animated");
    container.classList.add("animate__zoomIn");

    loadingText.textContent = "Loading...";
    loader.style.display = "block";

    fahBtn.disabled = false;
    celBtn.disabled = true;

    let promise1 = callAPI(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=fb0ac98cb14fb4c6ee0450300df8e507`)

    promise1
    .then(resolve => {
        result = resolve;
        if (result.cod === "404"){
            loadingText.textContent = "Failed... No Such Country/City was Found";
            loader.style.display = "none";
            throw new Error("City not Found")
        }
        loadingText.textContent = "";
        loader.style.display = "none";
        container.style.display = "block";
    })
    .then(() => {
        locationText.textContent = `${result.name}`;
        today.textContent = weekday[day];
        weatherText.textContent = result.weather[0].main;
        descriptionText.textContent = result.weather[0].description;
        let tempInC = Math.round(result.main.temp - 273.15);
        temperature.innerHTML = `${tempInC}&degC`;
        tempInK = result.main.temp;
        humidity.textContent = result.main.humidity;
        pressure.textContent = result.main.pressure;
        icon.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`
    })
})

// convert to fahrenheit
fahBtn.addEventListener("click", (e) => {
    temperature.classList.remove("animate__shakeY")
    temperature.classList.remove("animate__animated")
    fahBtn.disabled = true;
    celBtn.disabled = false;
    let tempInF = Math.round(((tempInK - 273.15) * 9 / 5 + 32))
    temperature.innerHTML = `${tempInF}&degF`;
    temperature.classList.add("animate__shakeY")
    temperature.classList.add("animate__animated")
})

// convert to celsius
celBtn.addEventListener("click", (e) => {
    temperature.classList.remove("animate__shakeY")
    temperature.classList.remove("animate__animated")
    fahBtn.disabled = false;
    celBtn.disabled = true;
    let tempInC = Math.round(tempInK - 273.15);
    temperature.innerHTML = `${tempInC}&degC`;
    temperature.classList.add("animate__shakeY")
    temperature.classList.add("animate__animated")
})

// async function to get data from the API and format it to json
async function callAPI(url, variable) {
    let response = await fetch(url, {mode : 'cors'})
    let formatted = await response.json();
    return formatted;
}

/*
promise based
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=fb0ac98cb14fb4c6ee0450300df8e507`, {mode : 'cors'})
    .then(response => {
        return response.json()
    })
    .then(response => {
        result = response;
    });
*/