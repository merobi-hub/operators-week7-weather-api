// import { apiKey } from "../hidden/credentials.js";

//api creds

const apiKey = '7064e174c6cc600e64bb4f1f78229980'

// form submission

let form = document.querySelector('#testDataForm')
console.log(form)

// add event listener for form data

form.addEventListener('submit', (event) => {

    event.preventDefault();
    //let query_city = document.querySelector('#city').value 
    let query_loc = document.querySelector('#loc').value

    console.log(query_loc)

    apiData(query_loc);
})


// get data from API

const apiData = async (loc) => {

    // use regex to route input to correct API endpoint (zip if not alpha or name if alpha)

    var regex = /^[a-z A-Z]+$/;
    if(!loc.match(regex)){
        let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${loc},us&appid=${apiKey}`)
        console.log(response.data)
        return loadData(response.data)
    } else {
        let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`)
        console.log(response.data)
        return loadData(response.data)
    }
}

// process and organize data from API

const loadData = async (apiData) => {

    // convert temps from K to F and round to nearest whole number

    var tempF = ((`${apiData.main.temp}` - 273.15) * 9/5 + 32).toFixed() 
    var highF = ((`${apiData.main.temp_max}` - 273.15) * 9/5 + 32).toFixed() 
    var lowF = ((`${apiData.main.temp_min}` - 273.15) * 9/5 + 32).toFixed() 
    var feelsF = ((`${apiData.main.feels_like}` - 273.15) * 9/5 + 32).toFixed() 

    console.log(tempF, highF, lowF, feelsF)

    // collect data in array

    var weatherData = {
        "name": `${apiData.name}`,
        "temp": tempF,
        "high": highF,
        "low": lowF,
        "feelsLike": feelsF,
        "humidity": `${apiData.main.humidity}`,
        "pressure": `${apiData.main.pressure}`,
        "weather": `${apiData.weather[0].description}`
    }

    console.log(weatherData)

    return createTables(weatherData)
}

// Populate tables in index.html with data, adjusting text color based on temp

const createTables = (data) => {

    var city = document.querySelector(".city")
    city.innerHTML = `${data["name"]}`

    var temp = document.querySelector(".temp td")
    if (data["temp"] >= 85){
        temp.innerHTML = `<span style="color:red;">${data["temp"]}&#176;F</span>`
    } else if (data["temp"] >= 50){
        temp.innerHTML = `<span>${data["temp"]}&#176;F</span>`
    } else if (data["temp"] < 50){
        temp.innerHTML = `<span style="color:blue;">${data["temp"]}&#176;F</span>`
    }

    var high = document.querySelector(".high td")
    if (data["high"] >= 85){
        high.innerHTML = `<span style="color:red;">${data["high"]}&#176;F</span>`
    } else if (data["high"] >= 50){
        high.innerHTML = `<span>${data["high"]}&#176;F</span>`
    } else if (data["high"] < 50){
        high.innerHTML = `<span style="color:blue;">${data["high"]}&#176;F</span>`
    }

    var low = document.querySelector(".low td")
    if (data["low"] >= 85){
        low.innerHTML = `<span style="color:red;">${data["low"]}&#176;F</span>`
    } else if (data["low"] >= 50){
        low.innerHTML = `<span>${data["low"]}&#176;F</span>`
    } else if (data["low"] < 50){
        low.innerHTML = `<span style="color:blue;">${data["low"]}&#176;F</span>`
    }

    var feels = document.querySelector(".feels-like td")
    if (data["feelsLike"] >= 80){
        feels.innerHTML = `<span style="color:red;">${data["feelsLike"]}&#176;F</span>`
    } else if (data["feelsLike"] >= 50){
        feels.innerHTML = `<span>${data["feelsLike"]}&#176;F</span>`
    } else if (data["feelsLike"] < 50){
        feels.innerHTML = `<span style="color:blue;">${data["feelsLike"]}&#176;F</span>`
    }

    var humidity = document.querySelector(".humidity td")
    humidity.innerHTML = `${data["humidity"]}<span>&#x25;</span>`

    var pressure = document.querySelector(".pressure td")
    pressure.innerHTML = `${data["pressure"]} inHg.`

    var weather = document.querySelector(".weather td")
    weather.innerHTML = `${data["weather"]}`
}
