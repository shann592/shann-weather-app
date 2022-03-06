//Script to fetch user current city name.
const fetchCityName = async (latitude, longitude) => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    const  response = await fetch(url);
    const data = await response.json();
    return data;
};


navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    fetchCityName(lat, long).
      then(data => {
          const cityName = data.localityInfo.administrative[2].name;
          if(cityName.includes(' ')) {
              const strArr = cityName.split(' ');
              updateCity(strArr[0]).
                then(data => updateUI(data)).
                catch(error => console.log(error));
          } else {
            updateCity(cityName).
            then(data => updateUI(data)).
            catch(error => console.log(error));
          }
      }).
      catch(error => console.log(error));
});



