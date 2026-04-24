const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast');
const forecastContainer = document.getElementById('forecast-container');
const apiKey = 'YOUR_API_KEY_HERE';

searchButton.addEventListener('click', async () => {
    const city = searchInput.value.trim();
    if (city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            const weatherIcon = document.getElementById('weather-icon');
            const temperature = document.getElementById('temperature');
            const humidity = document.getElementById('humidity');
            const windSpeed = document.getElementById('wind-speed');

            weatherIcon.innerHTML = `<i class="fa fa-${getWeatherIcon(data.weather[0].id)}"></i>`;
            temperature.innerText = `Temperature: ${data.main.temp}°C`;
            humidity.innerText = `Humidity: ${data.main.humidity}%`;
            windSpeed.innerText = `Wind Speed: ${data.wind.speed} m/s`;

            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
            const forecastData = await forecastResponse.json();
            forecastContainer.innerHTML = '';
            forecastData.list.forEach((forecast) => {
                const forecastCard = document.createElement('div');
                forecastCard.classList.add('forecast-card');
                forecastCard.innerHTML = `
                    <h3>${forecast.dt_txt}</h3>
                    <p>Temperature: ${forecast.main.temp}°C</p>
                    <p>Humidity: ${forecast.main.humidity}%</p>
                    <p>Wind Speed: ${forecast.wind.speed} m/s</p>
                `;
                forecastContainer.appendChild(forecastCard);
            });
        } catch (error) {
            console.error(error);
        }
    }
});

function getWeatherIcon(id) {
    if (id >= 200 && id <= 232) {
        return 'cloud-bolt';
    } else if (id >= 300 && id <= 321) {
        return 'cloud-rain';
    } else if (id >= 500 && id <= 531) {
        return 'cloud-showers-heavy';
    } else if (id >= 600 && id <= 622) {
        return 'snowflake';
    } else if (id >= 701 && id <= 781) {
        return 'cloud-fog';
    } else if (id >= 800 && id <= 804) {
        return 'sun';
    }
}
