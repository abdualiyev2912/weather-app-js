var data = null;

window.onload = function () {
    getWeatherData('Jizzax');
};

async function translate() {
    const url = 'https://translate281.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '1f59d2cfc3msh33c4e331dd0a8d8p12f8c2jsn7aa007d006ff',
            'X-RapidAPI-Host': 'translate281.p.rapidapi.com'
        },
        body: new URLSearchParams({
            text: data.current.condition.text,
            from: 'auto',
            to: 'uz'
        })
    };
    fetch(url, options)
        .then(response => response.json())
        .then(d => {
            data.current.condition.text = d.response;
            showData();
        });
};

async function getWeatherData(place) {
    document.getElementById('place').value = '';
    let url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=' + place;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1f59d2cfc3msh33c4e331dd0a8d8p12f8c2jsn7aa007d006ff',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    fetch(url, options)
        .then(response => response.json())
        .then(d => {
            data = d;
            translate();
        });
};

function showData() {
    document.getElementById('content').innerHTML = `
        <div class="is-size-2 mb-5">
            ${data.location.name}, ${data.location.country}
        </div>
        <div class="columns">
            <div class="column">
                <figure class="image is-128x128">
                    <img src="https:${data.current.condition.icon}" alt="Icon">
                </figure>
            </div>
            <div class="column">
                <span class="is-size-3 has-text-weight-medium mr-3" id="temp">
                    ${data.current.temp_c}  
                </span>
                <sup>
                    <button class="button is-small has-text-weight-bold" onclick="temp(this)">°C</button>
                    <button class="button is-white is-small has-text-weight-bold" onclick="temp(this)">°F</button>
                </sup>
                <br>
                <span class="is-size-5">
                    ${data.current.condition.text}
                </span>
            </div>
            <div class="column has-text-left">
                <p class="is-size-5">Yog'ingarchilik: ${data.current.precip_mm} mm</p>
                <p class="is-size-5">Namlik: ${data.current.humidity} %</p>
                <p class="is-size-5">Shamol: ${data.current.wind_kph} km/h</p>
            </div>
        </div>`;
}

function temp(btn){
    if (btn.innerText == '°C'){
        btn.classList.remove('is-white')
        btn.nextElementSibling.classList.add('is-white')
        document.getElementById('temp').innerText = data.current.temp_c
    } else {
        btn.classList.remove('is-white')
        btn.previousElementSibling.classList.add('is-white')
        document.getElementById('temp').innerText = data.current.temp_f
    }
}
