const cityForm = document.querySelector('form');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const dayImg = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

//Getting city info and weather info.
const updateCity = async (city) => {

    const cityInfo = await getCity(city);
    const weatherInfo = await getWeather(cityInfo.Key);
    
    return {cityInfo, weatherInfo};

};

//updating the UI
const updateUI = (data) => {

    const {cityInfo, weatherInfo} = data;
    details.innerHTML = `
    <h5 class="my-3">${cityInfo.EnglishName}</h5>
            <div class="my-3">${weatherInfo.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weatherInfo.Temperature.Metric.Value}</span>
              <span>&deg;C</span>`;
    
    //Day and Night images
    let timeSrc = null;
    timeSrc = weatherInfo.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    
    dayImg.setAttribute('src', timeSrc);
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    //Weather icons
    const wIcon = `img/icons/${weatherInfo.WeatherIcon}.svg`;
    icon.setAttribute('src',wIcon);
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityForm.city.value.toLowerCase().trim();
    cityForm.reset();
    updateCity(city).
      then(data => updateUI(data)).
      catch(error => console.log(error));
});
