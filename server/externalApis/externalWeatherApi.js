const axios = require('axios');

//Using complete instead of compact because compact does not include dew point data
const url = 'https://api.met.no/weatherapi/locationforecast/2.0/complete';

const getCompleteWeatherData = (lat, lon) => {
    //TODO: Should i set custom user-agent header?
    return axios.get(url, { params: { lat, lon } });
}

/**
 * 
 * @param {*} lat 
 * @param {*} lon 
 * @returns {dewPointCelsius, relativeHumidity, airTemperature, cloudAreaFraction, cloudAreaFractionHigh, cloudAreaFractionMedium, cloudAreaFractionLow}
 */
const getEssentialWeatherData = (lat, lon) => {

    return getCompleteWeatherData(lat, lon)
        .then(resp => {
            return {
                dewPointCelsius: resp.data.properties.timeseries[0].data.instant.details.dew_point_temperature,
                relativeHumidity: resp.data.properties.timeseries[0].data.instant.details.relative_humidity,
                airTemperature: resp.data.properties.timeseries[0].data.instant.details.air_temperature,
                cloudAreaFraction: resp.data.properties.timeseries[0].data.instant.details.cloud_area_fraction,
                cloudAreaFractionHigh: resp.data.properties.timeseries[0].data.instant.details.cloud_area_fraction_high,
                cloudAreaFractionMedium: resp.data.properties.timeseries[0].data.instant.details.cloud_area_fraction_medium,
                cloudAreaFractionLow: resp.data.properties.timeseries[0].data.instant.details.cloud_area_fraction_low,
            }
        })
}


module.exports = {
    getCompleteWeatherData,
    getEssentialWeatherData
}