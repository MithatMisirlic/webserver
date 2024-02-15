async function updateForecast() {
    const apiKey = '484cfaaba61ce8bb4b2ac5a123577382';
    const username = sessionStorage.getItem('username');

    const cityResponse = await fetch(`/api/${username}/city`);
    const city = await cityResponse.text();
    const geoEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoResponse = await fetch(geoEndpoint);
    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
        alert('City not found');
        return;
    }

    const { lat, lon } = geoData[0];

    const forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const forecastResponse = await fetch(forecastEndpoint);
    const forecastData = await forecastResponse.json();

    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    forecastData.list.forEach(forecast => {
        const dateTime = new Date(forecast.dt * 1000);
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(dateTime);
        const weatherDescription = forecast.weather[0].description;
        const temperature = Math.round(forecast.main.temp);

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <p>Date & Time: ${formattedDate}</p>
            <p>Description: ${weatherDescription}</p>
            <p>Temperature: ${temperature} °C</p>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}