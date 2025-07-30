const apiKey = '4f787b96b4cd85ab72c52208154524a8'; 
const city = 'Timbuktu'; // Use a real city name
const units = 'imperial'; // Use 'metric' for Celsius
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

// Elements
const currentTemp = document.getElementById('current-temp');
const weatherDesc = document.getElementById('weather-desc');
const weatherIcon = document.getElementById('weather-icon');
const forecastList = document.getElementById('forecast-list');

// Fetch current weather
fetch(weatherURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Weather fetch failed: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    currentTemp.textContent = `${Math.round(data.main.temp)}°F`;
    weatherDesc.textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.setAttribute('src', iconURL);
    weatherIcon.setAttribute('alt', data.weather[0].description);
  })
  .catch((error) => console.error('Error fetching current weather:', error));

// Fetch 3-day forecast
fetch(forecastURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Forecast fetch failed: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const forecastData = data.list.filter(item => item.dt_txt.includes('12:00:00')); // Get data for midday

    forecastList.innerHTML = ''; // Clear list before inserting new items
    forecastData.slice(0, 3).forEach(day => {
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temp = Math.round(day.main.temp);
      const desc = day.weather[0].description;
      const icon = day.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${dayName}</strong>: ${temp}°F 
        <img src="${iconURL}" alt="${desc}" />
      `;
      forecastList.appendChild(li);
    });
  })
  .catch((error) => console.error('Error fetching forecast:', error));
