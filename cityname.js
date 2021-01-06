let trigger;
let triggerDate = false;

// Language object
// setting languages in dropdown
lang = {
    'en': 'English',
    'ar': 'Arabic',
    'az': 'Azerbaijani',
    'be': 'Belarusian',
    'bg': 'Bulgarian',
    'bs': 'Bosnian',
    'ca': 'Catalan',
    'cz': 'Czech',
    'da': 'Danish',
    'de': 'German',
    'fi': 'Finnish',
    'fr': 'French',
    'el': 'Greek',
    'es': 'Spanish',
    'et': 'Estonian',
    'hr': 'Croation',
    'hu': 'Hungarian',
    'id': 'Indonesian',
    'it': 'Italian',
    'is': 'Icelandic',
    'iw': 'Hebrew',
    'kw': 'Cornish',
    'lt': 'Lithuanian',
    'nb': 'Norwegian Bokmål',
    'nl': 'Dutch',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'sr': 'Serbian',
    'sv': 'Swedish',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'zh': 'Chinese(Simplified)',
    'zh': 'tw - Chinese(Traditional)',
}
let str = '';
for (key in lang) {
    str += `<option value="${key}">${lang[key]}</option>`;
}
document.getElementById('language').innerHTML = str;

// Parameters
params = {
    'valid_date': 'Date the forecast is valid for in format YYYY- MM - DD',
    'ts': 'Forecast period start unix timestamp(UTC)',
    'datetime': '[DEPRECATED] Forecast valid date(YYYY - MM - DD)',
    'wind_gust_spd': 'Wind gust speed(Default m / s)',
    'wind_spd': 'Wind speed(Default m / s)',
    'wind_dir': 'Wind direction(degrees)',
    'wind_cdir': 'Abbreviated wind direction',
    'wind_cdir_full': 'Verbal wind direction',
    'temp': 'Average Temperature(default Celcius)',
    'max_temp': 'Maximum Temperature(default Celcius)',
    'min_temp': 'Minimum Temperature(default Celcius)',
    'high_temp': 'High Temperature - Calculated from 6AM to 6AM local time(default Celcius)',
    'low_temp': 'Low Temperature - Calculated from 6AM to 6AM local(default Celcius)',
    'app_max_temp': 'Apparent / "Feels Like" temperature at max_temp time(default Celcius)',
    'app_min_temp': 'Apparent / "Feels Like" temperature at min_temp time(default Celcius)',
    'pop': 'Probability of Precipitation(%)',
    'precip': 'Accumulated liquid equivalent precipitation(default mm)',
    'snow': 'Accumulated snowfall(default mm)',
    'snow_depth': 'Snow Depth(default mm)',
    'pres': 'Average pressure(mb)',
    'slp': 'Average sea level pressure(mb)',
    'dewpt': 'Average dew point(default Celcius)',
    'rh': 'Average relative humidity(%)',
    'pod': 'Part of the day (d = day / n = night)',
    'clouds_low': 'Low-level (~0-3km AGL) cloud coverage (%)',
    'clouds_mid': 'Mid-level (~3-5km AGL) cloud coverage (%)',
    'clouds_hi': 'High-level (>5km AGL) cloud coverage (%)',
    'clouds': 'Average total cloud coverage (%)',
    'vis': 'Visibility (default KM)',
    'max_dhi': '[DEPRECATED] Maximum direct component of solar radiation (W/m^2)',
    'uv': 'Maximum UV Index (0-11+)',
    'ozone': 'Average Ozone (Dobson units)',
    'moon_phase': 'Moon phase illumination fraction (0-1)',
    'moon_phase_lunation': 'Moon lunation fraction (0 = New moon, 0.50 = Full Moon, 0.75 = Last quartermoon)',
    'moonrise_ts': 'Moonrise time unix timestamp (UTC)',
    'moonset_ts': 'Moonset time unix timestamp (UTC)',
    'sunrise_ts': 'Sunrise time unix timestamp (UTC)',
    'sunset_ts': 'Sunset time unix timestamp (UTC)'
};
params2 = {
    'lat': 'Latitude (Degrees)',
    'lon': 'Longitude (Degrees)',
    'sunrise': 'Sunrise time (HH:MM)',
    'sunset': 'Sunset time (HH:MM)',
    'timezone': 'Local IANA Timezone',
    'station': 'Source station ID',
    'ob_time': 'Last observation time (YYYY-MM-DD HH:MM)',
    'datetime': 'Current cycle hour (YYYY-MM-DD:HH)',
    'ts': 'Last observation time (Unix timestamp)',
    'city_name': 'City name',
    'country_code': 'Country abbreviation',
    'state_code': 'State abbreviation/code',
    'pres': 'Pressure (mb)',
    'slp': 'Sea level pressure (mb)',
    'wind_spd': 'Wind speed (Default m/s)',
    'wind_dir': 'Wind direction (degrees)',
    'wind_cdir': 'Abbreviated wind direction',
    'wind_cdir_full': 'Verbal wind direction',
    'temp': 'Temperature (default Celcius)',
    'app_temp': 'Apparent/"Feels Like" temperature (default Celcius)',
    'rh': 'Relative humidity (%)',
    'dewpt': 'Dew point (default Celcius)',
    'clouds': 'Cloud coverage (%)',
    'pod': 'Part of the day (d = day / n = night)',
    'vis': 'Visibility (default KM)',
    'precip': 'Liquid equivalent precipitation rate (default mm/hr)',
    'snow': 'Snowfall (default mm/hr)',
    'uv': 'UV Index (0-11+)',
    'aqi': 'Air Quality Index [US - EPA standard 0 - +500]',
    'dhi': 'Diffuse horizontal solar irradiance (W/m^2) [Clear Sky]',
    'dni': 'Direct normal solar irradiance (W/m^2) [Clear Sky]',
    'ghi': 'Global horizontal solar irradiance (W/m^2) [Clear Sky]',
    'solar_rad': 'Estimated Solar Radiation (W/m^2)',
    'elev_angle': 'Solar elevation angle (degrees)',
    'h_angle': 'Solar hour angle (degrees)',
};

//Hiding parameter div and responseDiv
document.getElementById('dropDowns').style.display = 'none';
document.getElementById('responseDiv').style.display = 'none';

// Event listeners for selectType buttons
let forecast = document.getElementById('forecast');
forecast.addEventListener('click', () => {
    document.getElementById('date').style.display = 'inline-block';
    document.getElementById('dropDowns').style.display = 'block';
    trigger = false;
    str = '';
    for (key in params) {
        console.log(key);
        str += `<option value="${key}">${params[key]}</option>`;
    }
    document.getElementById('parameter').innerHTML = str;
});

let current = document.getElementById('current')
current.addEventListener('click', () => {
    document.getElementById('date').style.display = 'none';
    document.getElementById('dropDowns').style.display = 'block';
    trigger = true;
    str = '';
    for (key in params2) {
        console.log(key);
        str += `<option value="${key}">${params2[key]}</option>`;
    }
    document.getElementById('parameter').innerHTML = str;
});

// Event listeners for continue and back buttons
let continue_ = document.getElementById('continue');
continue_.addEventListener('click', () => {
    document.getElementById('requestDiv').style.display = 'none';
    document.getElementById('responseDiv').style.display = 'block';

    let cityName = document.getElementById('cityName').value;
    let language = document.getElementById('language').value;
    let date = document.getElementById('date').value;
    let parameter = document.getElementById('parameter').value;
    let apiKey = 'a22987c2b7af40e5b8831cd7de6f2111';

    if (trigger == false) {

        let url = `https://api.weatherbit.io/v2.0/forecast/daily?&city=${cityName}}&lang=${language}&key=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then((obj) => {
                for (key in obj.data) {
                    // console.log(obj.data[key]['valid_date']);
                    if (obj.data[key]['valid_date'] == date) {
                        // console.log('__');
                        document.getElementById('response').value = params[parameter] + ' = ' + obj.data[key][parameter];
                        triggerDate = true;
                    }
                }
                if (triggerDate == false) {
                    document.getElementById('response').value = 'You have entered wrong date.';
                }
            });
    }
    else if (trigger == true) {

        let url = `https://api.weatherbit.io/v2.0/current?&city=${cityName}&lang=${language}&key=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then((obj) => {
                console.log(obj.data)
                for (key in obj.data) {
                    console.log(obj.data[key][parameter]);
                    document.getElementById('response').value = params2[parameter] + ' = ' + obj.data[key][parameter];
                }
            });
    }
});
let back = document.getElementById('back');
back.addEventListener('click', () => {
    document.getElementById('requestDiv').style.display = 'block';
    document.getElementById('responseDiv').style.display = 'none';
    document.getElementById('response').value = '';
    if (trigger == false) {
        str = '';
        for (key in params) {
            console.log(key);
            str += `<option value="${key}">${params[key]}</option>`;
        }
        document.getElementById('parameter').innerHTML = str;
    }
    else {
        str = '';
        for (key in params2) {
            console.log(key);
            str += `<option value="${key}">${params2[key]}</option>`;
        }
        document.getElementById('parameter').innerHTML = str;
    }
});
