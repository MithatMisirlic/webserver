async function searchCity() {
    const apiKey = '484cfaaba61ce8bb4b2ac5a123577382';
    const searchInput = document.getElementById('searchInput').value.trim();

    if (searchInput === '') {
        alert('Please enter a city name');
        return;
    }

    const geoEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`;

    try {
        const geoResponse = await fetch(geoEndpoint);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            alert('City not found');
            return;
        }

        const { name, country, lat, lon } = geoData[0];

        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const weatherResponse = await fetch(weatherEndpoint);
        const weatherData = await weatherResponse.json();

        const temperature = weatherData.main.temp;

        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = `
            <p>City: ${name}</p>
            <p>Country: ${country}</p>
            <p>Temperature: ${temperature} °C</p>
        `;
    } catch (error) {
        console.error('Error searching city:', error);
        alert('An error occurred while searching for the city. Please try again later.');
    }
}

document.getElementById('searchButton').addEventListener('click', searchCity);
