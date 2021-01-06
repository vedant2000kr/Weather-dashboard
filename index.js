
// If user allows access to location show the local weather
document.getElementById('map').style.display = 'none';
if (window.navigator.geolocation) {
    // Geolocation available
    window.navigator.geolocation.getCurrentPosition(showData, failureData);
}
function showData(objloc) {
    // variables
    apiKey = 'a22987c2b7af40e5b8831cd7de6f2111';
    url = `https://api.weatherbit.io/v2.0/current?&lat=${objloc.coords.latitude}&lon=${objloc.coords.longitude}&key=${apiKey}`;
    // let str;
    document.getElementById('map').style.display = 'block';

    // Fetching weather data
    fetch(url)
        .then(response => response.json())
        .then((obj) => {
            console.log(obj.data[0]['aqi'])
            str = `<strong><p>Apparent Temperature: ${obj.data[0]['app_temp']} </p>
                    <p>Rainfall:${obj.data[0]['precip']}</p>
                    <p>Snowfall:${obj.data[0]['snow']}</p>
                    <p>Air Quality Index:${obj.data[0]['aqi']}</p>
                    <p>Sunrise:${obj.data[0]['sunrise']}</p></strong>
            `;

            // defining popup
            var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(str);

            // Adding marker to the map
            new mapboxgl.Marker({
                draggable: false,
                color: 'red'
            }).setLngLat([objloc.coords.longitude, objloc.coords.latitude])
                .setPopup(popup)
                .addTo(map);
        })

}
function failureData() {
    document.getElementById('map').style.display = 'none';
    let homeCity = document.getElementById('homeCity');
    homeCity.innerHTML = `
    <h1>Failed to show weather of your city</h1>
    <p>Allow location to view.</p>
    `;
}

