async function updateCurrentWeatherInformation() {
    const apiKey = '484cfaaba61ce8bb4b2ac5a123577382';

    try {
        const username = sessionStorage.getItem('username');
        const cityResponse = await fetch(`/api/${username}/city`);
        const city = await cityResponse.text();

        const geoEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geoEndpoint);
        const geoData = await geoResponse.json();

        const { lon, lat } = geoData[0];

        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const weatherResponse = await fetch(weatherEndpoint);
        const weatherData = await weatherResponse.json();

        const temperature = weatherData.main.temp;

        const temperatureElement = document.getElementById('temperature');
        temperatureElement.textContent = `Current Temperature in ${city}: ${temperature} °C`;

        const weather_img = document.getElementById("weather-img")
        switch (weatherData.weather[0].main.toLowerCase()) {
            case "clouds":
                weather_img.innerHTML = "<img src='/weather-pictures/cloudy.png'>";
                break;
            case "rain":
                weather_img.innerHTML = "<img src='/weather-pictures/Rainy.png'>";
                break;
            case "snow":
                weather_img.innerHTML = "<img src='/weather-pictures/Snowy.png'>";
                break;
            case "thunderstorm":
                weather_img.innerHTML = "<img src='/weather-pictures/Thunderstorm.png'>";
                break;
            case "clear":
                weather_img.innerHTML = "<img src='/weather-pictures/Clear.png'>";
                break;
        }
    } catch (error) {
        console.error('Error fetching weather information:', error);
    }
}