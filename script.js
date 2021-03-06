let weather = {
    apiKey: "6bbf009c2806c69d20fc0d0ab8c6388e",
    fetchWeather(city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=' +
                city + 
                '&units=metric&appid=' +
                this.apiKey
                // q -> 城市名稱、州代碼和國家代碼
                // appid -> unique API key
                // units -> 測量單位，默認 standard 標準、metric 公制、imperial 英制
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
            
    },
    displayWeather(data) {
        // const data = { 
        //  {
        //    "name": "Taipei"
        //  },
        //  {
        //    "weather": [
        //      {
        //       "description": "clear sky"
        //       "icon": "01d"
        //      }
        //    ],
        //    "main": [
        //      {
        //        "temp": 282.55,
        //        "humidity": 100  
        //      }
        //    ],
        //    "wind": [
        //      {
        //        "speed": 1.5 
        //      }
        //    ]  
        //  }
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerText = 'Weather in ' + name;
        document.querySelector('.temp').innerText = temp + '°C';
        document.querySelector('.icon').src = 
            'https://openweathermap.org/img/wn/' + icon + '.png';
        document.querySelector('.description').innerText = description;
        document.querySelector('.humidity').innerText = '濕度： ' + humidity + '%';
        document.querySelector('.wind').innerText = '風速： ' + speed + 'km/h';
        document.body.style.backgroundImage = 
            'url("https://source.unsplash.com/1600x900/?city ' + name + '")';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
    },
    search() {
        this.fetchWeather(document.querySelector('.search-bar').value);
    },
};

document
    .querySelector('.search button')
    .addEventListener('click', function() {
    weather.search();
});

document
    .querySelector('.search-bar')
    .addEventListener('keyup', function(event) {
        if(event.key == 'Enter') {
            weather.search();
        }
});

weather.fetchWeather('Taipei');