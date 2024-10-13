const weather=document.querySelector(".weather");
const city=document.querySelector(".city");
const one=document.querySelector(".one");
const apikey="c3b60484d09b48ba5c7122d260776ad5";

weather.addEventListener("submit", async event =>{
    event.preventDefault();
    const cityname=city.value;

    if(cityname){
        try{
            const weatherData= await getweatherData(cityname);
            displayweatherinfo(weatherData);
        }
        catch(error){
            displayerror(error);
        }

    }
    else{
        displayerror("Please enter a city");
    }
});

async function getweatherData(cityname){
    const ApiURL=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}`;
    const response=await fetch(ApiURL);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayweatherinfo(data){

    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;

    one.textContent = ""; 
    one.style.display = "flex";

    const cityname = document.createElement("h1");
    const tempname = document.createElement("p");
    const humid = document.createElement("p");
    const typeweather = document.createElement("p");
    const emoji = document.createElement("p");

    cityname.textContent = city;  
    tempname.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
    humid.textContent = `Humidity: ${humidity}%`;
    typeweather.textContent = `Weather: ${description}`;
    emoji.textContent = getWeatherEmoji(id);

    cityname.classList.add("cityname");
    tempname.classList.add("tempname");
    humid.classList.add("humid");
    typeweather.classList.add("typeweather");
    emoji.classList.add("emoji");

    one.appendChild(cityname);
    one.appendChild(tempname);
    one.appendChild(humid);
    one.appendChild(typeweather);
    one.appendChild(emoji);
}


function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}
function displayerror(message){

    const error = document.createElement("p");
    error.textContent = message;
    error.classList.add("error");

    one.textContent = "";
    one.style.display = "flex";
    one.appendChild(error);
}

 
