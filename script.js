const apiKey = '0233c4b95a7d758a355aece642f909d9';
cidade
function getData() {
  initLoading ();
  const cityInput = document.getElementById('cityInput');
  const city = encodeURIComponent(cityInput.value);
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const futureWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=32&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Unable to obtain data. Check the city name and try again.');
      }
      return response.json();
    })
    .then(data => displayResults(data))
    .catch(error => console.error('Unable to obtain data. Check the city name and try again.', error.message));

  fetch(futureWeatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Unable to obtain data. Check the city name and try again.');
      }
      return response.json();
    })
    .then(data => futureWeather(data))
    .catch(error => console.error('Unable to obtain data. Check the city name and try again.', error.message));
}

  
    function currentWeather(weather) {
      const leftContainer = document.querySelector('.leftContainer');
      const rightContainer = document.querySelector('.rightContainer');
      const topLeft = document.querySelector('.topLeft');
      const bottomLeft = document.querySelector('.bottomLeft');
      const bottomRight = document.querySelector('.bottomRight');
      const weatherInfo = document.querySelector('.weatherInfo');
  
      if (weather.cod === 200) {
          const currentDate = new Date(weather.dt * 1000);
          const dayOfWeek = currentDate.toLocaleDateString('en', { weekday: 'long' });
          const cityName = weather.name;
          const country = weather.sys.country;
  
          const weatherIcon = weather.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;
          const temp = weather.main.temp.toFixed(1);
          const weatherDescription = weather.weather[0].description;
  
          const pressure = weather.main.pressure;
          const humidity = weather.main.humidity;
          const temp_min = weather.main.temp_min.toFixed(1);
          const temp_max = weather.main.temp_max.toFixed(1);
          const wind_speed = weather.wind.speed;
  
          const topLeftContent = `<h1>${dayOfWeek}</h1>
                                  <h3>${currentDate.toLocaleDateString()}</h3>
                                  <h2><i class="fa-solid fa-location-dot"></i> ${cityName}, ${country}</h2>`;
  
          const bottomLeftContent = `<img src="${iconUrl}" alt="Weather Icon">
                                     <h1>${temp} °C</h1>
                                     <h2>${weatherDescription}</h2>`;
  
          const bottomRightContent = `<h3>Temp. Max:<br>${temp_max} °C</h3>
                                      <h3>Temp. Min:<br>${temp_min} °C</h3>`;
  
          const weatherInfoContent = `<h2>Pressão: ${pressure} hPa</h2>
                                      <h2>Umidade: ${humidity} %</h2>
                                      <h2>Velocity do Vento: ${wind_speed} m/s</h2>`;
  
          topLeft.innerHTML = topLeftContent;
          bottomLeft.innerHTML = bottomLeftContent;
          bottomRight.innerHTML = bottomRightContent;
          weatherInfo.innerHTML = weatherInfoContent;
  
      } 
        else {
          rightContainer.innerHTML = '<p>ERROR<br>404</p>';
          leftContainer.innerHTML = '<p>Unable to obtain data. Check the city name and try again.</p>';
      }
    }

      function futureWeather(data) {
        const resultadosDiv = document.querySelector('.futureWeather');
      
        if (data.cod === '200') {
          const indicesDesejados = [7, 15, 23, 31];
          const futureData = indicesDesejados.map(index => data.list[index]);
      
          const forecastHtml = futureData.map(item => {
            const date = new Date(item.dt * 1000);
            const dayOfWeek = date.toLocaleDateString('en', { weekday: 'long' });
            const weatherIcon = item.weather[0].icon;
            const temp = item.main.temp.toFixed(1);
            const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;
      
            return `<div>
                      <img src="${iconUrl}" alt="Weather Icon">
                      <br>
                      <h3>${dayOfWeek}</h3>
                      <h3>Temp: ${temp} °C</h3>
                    </div>`;
          }).join('');
      
          resultadosDiv.innerHTML = forecastHtml;
        } else {
          resultadosDiv.innerHTML = '<p>Unable to obtain data. Check the city name and try again.</p>';
        }
      }

      function initLoading (){
        const loading =  document.querySelector('.loading');
        const dataContainer = document.querySelector('.dataContainer');

        loading.style.display = 'flex';
        dataContainer.style.display = 'none';
      }

      function endLoading (){
        const loading =  document.querySelector('.loading');
        const dataContainer = document.querySelector('.dataContainer');

        loading.style.display = 'none';
        dataContainer.style.display = 'flex';
      }
      
      function displayResults(weather) {
        currentWeather(weather);
        futureWeather(weather);
        endLoading ();
      }

      function addAnimationButton() {
        const botao = document.querySelector('.locationButton i');
        botao.classList.add('fa-bounce');
    }

    function removeAnimationButton() {
        const botao = document.querySelector('.locationButton i');
        botao.classList.remove('fa-bounce');
    }
