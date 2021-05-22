// api creds

const apiKey = '7064e174c6cc600e64bb4f1f78229980'

// form submission

let form = document.querySelector('#testDataForm')
console.log(form)

// add event listener for form data

form.addEventListener('submit', (event) => {

    event.preventDefault();
    //let query_city = document.querySelector('#city').value 
    let query_zip = document.querySelector('#zip').value

    console.log(query_zip)

    apiData(query_zip);
})


// get data from API

const apiData = async (zip) => {

    let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`)
    console.log(response.data)
    return loadData(response.data)

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

const createTables = (data) => {

    var city = document.querySelector(".city td")
    city.innerHTML = `${data["name"]}`

    var temp = document.querySelector(".temp td")
    temp.innerHTML = `${data["temp"]}<span>&#176;</span>F`

    var high = document.querySelector(".high td")
    high.innerHTML = `${data["high"]}<span>&#176;</span>F`

    var low = document.querySelector(".low td")
    low.innerHTML = `${data["low"]}<span>&#176;</span>F`

    var feels = document.querySelector(".feels-like td")
    feels.innerHTML = `${data["feelsLike"]}<span>&#176;</span>F`

    var humidity = document.querySelector(".humidity td")
    humidity.innerHTML = `${data["humidity"]}<span>&#x25;</span>`

    var pressure = document.querySelector(".pressure td")
    pressure.innerHTML = `${data["pressure"]} inHg.`

    var weather = document.querySelector(".weather td")
    weather.innerHTML = `${data["weather"]}`

}