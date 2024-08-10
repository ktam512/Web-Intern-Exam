document.getElementById('weather-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const city = document.getElementById('city-input').value;
    const weatherResult = document.getElementById('weather-result');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const weatherIcon = document.getElementById('weather-icon');
    const errorMessage = document.getElementById('error-message');

    const geocodingApiKey = '5be79046a269ab8b085907ff3be35c4a'; 
    const weatherApiKey = '5be79046a269ab8b085907ff3be35c4a'; 

    try {
        // Fetch geocoding data
        const geocodeResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${geocodingApiKey}`);
        
        if (!geocodeResponse.ok) {
            throw new Error('City not found');
        }

        const geocodeData = await geocodeResponse.json();
        console.log("Parsed Geocoding Data:", geocodeData);

        // Ensure we have data and it's in array form
        if (!geocodeData || geocodeData.length === 0) {
            throw new Error('City not found');
        }

        // Extract latitude and longitude
        const { lat, lon } = geocodeData[0];
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);



        // Fetch weather data from OpenWeatherMap API
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`);

         // Log the full weather response
         console.log("Weather API Response:", weatherResponse);

        if (!weatherResponse.ok) {
            throw new Error('Weather data not found');
        }

        const weatherData = await weatherResponse.json();
           // Log the parsed weather data
           console.log("Parsed Weather Data:", weatherData);

        // Update DOM with weather data
        cityName.textContent = `City: ${geocodeData[0].name}`;
        temperature.textContent = `Temperature: ${weatherData.main.temp}°C`;
        description.textContent = `Description: ${weatherData.weather[0].description}`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
        weatherIcon.alt = weatherData.weather[0].description;
        weatherIcon.style.display = 'block';
        errorMessage.textContent = ''; // Clear any previous error message
    } catch (error) {
         // Handle errors
         console.log("Error:", error.message); // Log the error message
        cityName.textContent = '';
        temperature.textContent = '';
        description.textContent = '';
        weatherIcon.src = '';
        errorMessage.textContent = error.message;
    }
});
