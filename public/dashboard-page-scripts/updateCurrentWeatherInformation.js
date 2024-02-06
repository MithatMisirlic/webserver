async function updateCurrentWeatherInformation() {
    const apiKey = '484cfaaba61ce8bb4b2ac5a123577382';
    const city = 'Berlin';

    const geoEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
        const geoResponse = await fetch(geoEndpoint);
        const geoData = await geoResponse.json();

        const { lon, lat } = geoData[0];
        console.log('Coordinates:', lon, lat);

        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;

        try {
            const weatherResponse = await fetch(weatherEndpoint);
            const weatherData = await weatherResponse.json();

            const temperature = weatherData.main.temp;
            console.log('Temperature:', temperature);

            const temperatureElement = document.getElementById('temperature');
            temperatureElement.textContent = `Current Temperature: ${temperature} °C`;

            const weather_img = document.getElementById("weather-img")
            switch (weatherData.weather[0].main) {
                case "Clouds":
                    weather_img.innerHTML="<img src='/weather-pictures/cloudy.png'>"
                    break
                case "Rainy":
                    weather_img.innerHTML="<img src='/weather-pictures/Rainy.png'>"
                    break
                case "Snowy":
                    weather_img.innerHTML="<img src='/weather-pictures/Snowy.png'>"
                    break
                case "Thunderstorm":
                    weather_img.innerHTML="<img src='/weather-pictures/Thunderstorm.png'>"
                    break
                case "Clear":
                    weather_img.innerHTML="<img src='/weather-pictures/Clear.png'>"
                    break
            }
        } catch (error) {
            console.error('Error fetching current weather:', error);
        }
    } catch (error) {
        console.error('Error fetching city coordinates:', error);
    }
}

