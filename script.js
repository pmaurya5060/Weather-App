const body=document.querySelector('body');
const details=document.querySelector('.details') ;

const city_name=document.querySelector('#city-name');
const country_name=document.querySelector('#country-name');
const location_svg=document.querySelector('#location-svg');

const day_text=document.querySelector('#day');
const date_text=document.querySelector('#date');

const clouds_svg=document.querySelector('#clouds-svg');

const temperature_value=document.querySelector('#temperature-value');
const weather_condition=document.querySelector('#weather-condition');

const wind_svg=document.querySelector('#wind-svg')
const wind_text=document.querySelector('#wind-text');
const wind_value=document.querySelector('#wind-value')

const humidity_svg=document.querySelector('#humidity-svg');
const humidity_text=document.querySelector('#humidity-text');
const humidity_value=document.querySelector('#humidity-value');

const forecast_container=document.querySelector('#forecast-container');

function getWeathername(id){
  //thunderstorm
  if(id>=200 && id<=232) return 'thunderstorm'
  //drizzle
  else if(id>=300 && id<=321) return 'rain'
  //rain
  else if(id>=500 && id<=531) return 'rain'
  //snow
  else if(id>=600 && id<=622) return 'snow'
  //dusty(atmosphere)
  else if(id>=701 && id<=781) return 'atmosphere'
  //clouds
  else if(id>=801 && id<=804) return 'clouds'
  //clear if(weather_id=800)
  else return 'clear'
}

function getWeather() {
  document.querySelector(".overlay").classList.remove("hidden");
  
    const city = document.getElementById('search').value.trim();
    document.getElementById("placeholder-img").classList.add("hidden");
    const resultDiv = document.getElementById('data');
  
    if (!city) {
      alert('Please enter a city name.');
      return;
    }
  
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=6f72861e6ef397d95011dc9d4052ac2e`)
      .then((response) => {
        return response.json()})
      .then(data => {
        document.getElementById("error-message").classList.add("hidden");
        let weather_id=data.list[0].weather[0].id;
        console.log(weather_id);
      
        location_svg.innerHTML=`<i class="fa-solid fa-location-dot"></i>`;
        const c=city.toUpperCase();
        city_name.textContent=`${c}`;
        country_name.textContent=`${data.city.country}`;

        const datetoday = new Date(data.list[0].dt_txt);
        const datenow = new Date();
        console.log(datetoday)
        const day = datetoday.toLocaleString('en-US', { weekday: 'short' });
        const date = datenow.toLocaleString('en-US',{ month: 'short', day: '2-digit' });
        day_text.textContent=`${day}, ${date}`;

        temperature_value.textContent=`${parseInt(data.list[0].main.temp)}°C`;
        weather_condition.textContent=`${data.list[0].weather[0].main}`

        humidity_svg.innerHTML=`<i class="fa-solid fa-droplet"></i>`;
        humidity_text.innerHTML=`<h3>Humidity</h3>`;
        humidity_value.innerHTML=`<h3>${data.list[0].main.humidity}%</h3>`;

        wind_svg.innerHTML=`<i id="wind-svg" class="fa-solid fa-wind"></i>`;
        wind_text.innerHTML=`<h3>WindSpeed</h3>`;
        wind_value.innerHTML=`<h3>${data.list[0].wind.speed}M/S</h3>`;

        
        clouds_svg.innerHTML=`<img src="assets/${getWeathername(weather_id)}.svg" alt="Clouds" id="weather-img"></img>`;
        body.style.background=`url(backgrounds/${getWeathername(weather_id)}.jpg)`;

        const weatherType = getWeathername(weather_id);
        

        forecast_container.innerHTML = '';
        
        for (let i = 0; i < 40; i=i+8) { 
          const dateText = new Date(data.list[i].dt_txt);
          const dayName = dateText.toLocaleString('en-US', { weekday: 'short' }); 
          const dateLabel = dateText.toLocaleString('en-US', { month: 'short', day: 'numeric' });
          const temp = (parseInt(data.list[i].main.temp));
          
          const id = data.list[i].weather[0].id;
          const forecastItem = document.createElement('div');
          forecastItem.classList.add('forecast-item');
          
          forecastItem.innerHTML = `
            <div>${dayName}, ${dateLabel}</div>
            <div><img src="assets/${getWeathername(id)}.svg" alt="Clouds" class="forecast-img"></img></div>
            <div>${temp}°C</div>
          `;
          
          forecast_container.appendChild(forecastItem);
        }
        
        
      })
      .catch(error => {
        // document.getElementById("placeholder-img").classList.remove("hidden");
        // forecast_container.innerHTML = '';
        // resultDiv.innerHTML = `<p>Error fetching weather data.</p>`;
        // resultDiv.classList.remove('hidden');
        document.getElementById("error-message").classList.remove("hidden");
        document.querySelector(".overlay").classList.add("hidden");
        console.error('Fetch error:', error);
      });
  }
  
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchbutt");

searchInput.addEventListener("keydown", function (event){
  if(event.key=== "Enter"){
    event.preventDefault();
    searchButton.click();
  }
});


  //To do 
  //1) once it shows error then after right value it gives error
  //2) 